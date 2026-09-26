import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Video } from "@/models/Video";
import { PlaybackSession } from "@/models/PlaybackSession";
import { VideoAuditLog } from "@/models/VideoAuditLog";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/videos/[id]
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const video = await Video.findById(id).lean();
    if (!video) {
      return NextResponse.json(
        { success: false, error: "Video not found." },
        { status: 404 }
      );
    }

    const activeSessions = await PlaybackSession.find({
      videoId: id,
      status: "active",
      expiresAt: { $gt: new Date() },
    }).lean();

    return NextResponse.json({
      success: true,
      data: {
        ...video,
        activeSessions,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch video details." },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/videos/[id]
 * Update video metadata, publication status, protected status, or allowed roles
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();

    const allowedUpdates = [
      "title",
      "description",
      "folder",
      "isProtected",
      "isPublished",
      "allowedRoles",
      "tags",
    ];

    const updateData: Record<string, any> = {};
    for (const key of allowedUpdates) {
      if (body[key] !== undefined) {
        updateData[key] = body[key];
      }
    }

    const updatedVideo = await Video.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedVideo) {
      return NextResponse.json(
        { success: false, error: "Video not found." },
        { status: 404 }
      );
    }

    // If video was unpublished or made private, revoke any active sessions immediately
    if (body.isPublished === false || body.isProtected === true) {
      await PlaybackSession.updateMany(
        { videoId: id, status: "active" },
        { status: "revoked" }
      );
    }

    await VideoAuditLog.create({
      videoId: id,
      videoPublicId: updatedVideo.cloudinaryPublicId,
      videoTitle: updatedVideo.title,
      userRole: "admin",
      action: "video_updated",
      details: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Video updated successfully!",
      data: updatedVideo,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update video." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/videos/[id]
 * 1. Revoke active playback sessions
 * 2. Delete asset from Cloudinary
 * 3. Delete MongoDB document
 * 4. Write audit log
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const video = await Video.findById(id);
    if (!video) {
      return NextResponse.json(
        { success: false, error: "Video not found." },
        { status: 404 }
      );
    }

    // 1. Revoke all active playback sessions
    await PlaybackSession.updateMany(
      { videoId: id, status: "active" },
      { status: "revoked" }
    );

    // 2. Destroy video asset in Cloudinary
    if (video.cloudinaryPublicId) {
      try {
        await deleteFromCloudinary(video.cloudinaryPublicId, "video");
      } catch (cloudErr) {
        console.warn("[Cloudinary Delete Warning] Video destroy warning:", cloudErr);
      }
    }

    // 3. Delete from MongoDB
    await Video.findByIdAndDelete(id);

    // 4. Log Audit
    await VideoAuditLog.create({
      videoId: id,
      videoPublicId: video.cloudinaryPublicId,
      videoTitle: video.title,
      userRole: "admin",
      action: "video_deleted",
      details: {
        cloudinaryPublicId: video.cloudinaryPublicId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Video and associated sessions permanently removed.",
    });
  } catch (error: any) {
    console.error("[Admin Video Delete] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete video asset." },
      { status: 500 }
    );
  }
}
