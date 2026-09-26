import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Video } from "@/models/Video";

export const dynamic = "force-dynamic";

/**
 * GET /api/videos/[id]
 * Returns safe metadata for a specific video
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const video = await Video.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { cloudinaryPublicId: id }],
      isPublished: true,
    })
      .select("title description duration width height thumbnailUrl folder isProtected tags allowedRoles createdAt")
      .lean();

    if (!video) {
      return NextResponse.json(
        { success: false, error: "Video not found or access restricted." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: video,
    });
  } catch (error: any) {
    console.error("[Videos API] Error fetching video details:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch video details." },
      { status: 500 }
    );
  }
}
