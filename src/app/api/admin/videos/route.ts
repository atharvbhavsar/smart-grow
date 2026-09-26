import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Video } from "@/models/Video";
import { PlaybackSession } from "@/models/PlaybackSession";
import { VideoAuditLog } from "@/models/VideoAuditLog";
import { uploadBufferToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import {
  validateVideoFile,
  VIDEO_FOLDERS,
  generateSignedHlsUrl,
  generateSignedPosterUrl,
} from "@/lib/videoSecurity";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/videos
 * List all videos with protection stats and active sessions
 */
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const videos = await Video.find().sort({ createdAt: -1 }).lean();

    // Attach active session counts
    const enrichedVideos = await Promise.all(
      videos.map(async (v) => {
        const activeSessions = await PlaybackSession.countDocuments({
          videoId: v._id.toString(),
          status: "active",
          expiresAt: { $gt: new Date() },
        });
        return {
          ...v,
          activeSessions,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: enrichedVideos,
      count: enrichedVideos.length,
    });
  } catch (error: any) {
    console.error("[Admin Videos API] Error listing videos:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve admin video library." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/videos
 * Upload and encode a new video asset to Cloudinary, then store metadata in MongoDB
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim() || "";
    const folder = (formData.get("folder") as string) || VIDEO_FOLDERS.GENERAL;
    const isProtected = formData.get("isProtected") !== "false";
    const isPublished = formData.get("isPublished") !== "false";
    const allowedRolesRaw = formData.get("allowedRoles") as string;
    const tagsRaw = formData.get("tags") as string;

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "No video file was uploaded." },
        { status: 400 }
      );
    }

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Video title is required." },
        { status: 400 }
      );
    }

    // 1. Validate file format and size
    const validation = validateVideoFile({
      mimetype: file.type,
      size: file.size,
      originalname: file.name,
    });

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Upload to Cloudinary with eager adaptive HLS transformation
    const uploadResult = await uploadBufferToCloudinary(buffer, {
      resource_type: "video",
      folder: folder,
      eager: [
        {
          streaming_profile: "hd",
          format: "m3u8",
        },
      ],
      eager_async: false,
    });

    // 3. Connect and save to MongoDB
    await connectToDatabase();

    const allowedRoles = allowedRolesRaw
      ? allowedRolesRaw.split(",").map((r) => r.trim()).filter(Boolean)
      : ["admin", "client", "member"];

    const tags = tagsRaw
      ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const thumbnailUrl = generateSignedPosterUrl(uploadResult.public_id);
    const { playbackUrl: hlsUrl } = generateSignedHlsUrl(uploadResult.public_id, {
      isProtected,
      streamingProfile: "hd",
    });

    const videoDoc = await Video.create({
      title,
      description,
      cloudinaryPublicId: uploadResult.public_id,
      cloudinaryAssetId: uploadResult.asset_id,
      resourceType: "video",
      format: uploadResult.format || "mp4",
      duration: uploadResult.duration || 0,
      width: uploadResult.width || 0,
      height: uploadResult.height || 0,
      bytes: uploadResult.bytes || file.size,
      thumbnailUrl,
      hlsUrl,
      folder,
      accessType: isProtected ? "authenticated" : "public",
      isProtected,
      isPublished,
      allowedRoles,
      tags,
      createdBy: "admin",
    });

    // 4. Audit Log
    await VideoAuditLog.create({
      videoId: videoDoc._id.toString(),
      videoPublicId: uploadResult.public_id,
      videoTitle: title,
      userRole: "admin",
      action: "video_created",
      details: {
        bytes: uploadResult.bytes,
        duration: uploadResult.duration,
        format: uploadResult.format,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Video uploaded and processed successfully!",
      data: videoDoc,
    });
  } catch (error: any) {
    console.error("[Admin Videos API] Error uploading video:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to upload and encode video.",
      },
      { status: 500 }
    );
  }
}
