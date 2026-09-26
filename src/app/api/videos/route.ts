import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Video } from "@/models/Video";

export const dynamic = "force-dynamic";

/**
 * GET /api/videos
 * Returns list of published videos (safe metadata only, no raw MP4 download links)
 */
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const folder = searchParams.get("folder");
    const tag = searchParams.get("tag");

    const query: Record<string, any> = { isPublished: true };
    if (folder) query.folder = folder;
    if (tag) query.tags = tag;

    // Only return safe public metadata
    const videos = await Video.find(query)
      .select("title description duration width height thumbnailUrl folder isProtected tags createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: videos,
      count: videos.length,
    });
  } catch (error: any) {
    console.error("[Videos API] Error fetching videos:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve video catalog." },
      { status: 500 }
    );
  }
}
