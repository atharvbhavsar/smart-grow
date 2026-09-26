import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Media } from "@/models/Media";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const folder = searchParams.get("folder");
    const resourceType = searchParams.get("resourceType");
    const search = searchParams.get("search");
    const limit = Math.min(Number(searchParams.get("limit") || 50), 100);
    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {};

    if (folder) {
      query.folder = new RegExp(folder, "i");
    }

    if (resourceType && ["image", "video"].includes(resourceType)) {
      query.resourceType = resourceType;
    }

    if (search) {
      query.$or = [
        { publicId: new RegExp(search, "i") },
        { altText: new RegExp(search, "i") },
        { tags: new RegExp(search, "i") },
      ];
    }

    const [total, items] = await Promise.all([
      Media.countDocuments(query),
      Media.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    ]);

    return NextResponse.json({
      success: true,
      data: items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("[Media List API Error]:", err.message);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch media" },
      { status: 500 }
    );
  }
}
