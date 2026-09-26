import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { Media } from "@/models/Media";
import mongoose from "mongoose";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const isMongoId = mongoose.Types.ObjectId.isValid(id);
    const media = isMongoId
      ? await Media.findById(id).lean()
      : await Media.findOne({ publicId: id }).lean();

    if (!media) {
      return NextResponse.json(
        { success: false, error: "Media item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: media });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const isMongoId = mongoose.Types.ObjectId.isValid(id);
    const media = isMongoId
      ? await Media.findById(id)
      : await Media.findOne({ publicId: id });

    if (!media) {
      return NextResponse.json(
        { success: false, error: "Media item not found" },
        { status: 404 }
      );
    }

    // 1. Delete from Cloudinary
    try {
      await deleteFromCloudinary(media.publicId, media.resourceType);
    } catch (cErr) {
      console.warn("[Cloudinary Delete Warning]:", (cErr as Error).message);
    }

    // 2. Delete from MongoDB
    await Media.findByIdAndDelete(media._id);

    return NextResponse.json({
      success: true,
      message: `Asset ${media.publicId} deleted successfully from Cloudinary and MongoDB`,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("[Media Delete Error]:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    await connectToDatabase();

    const isMongoId = mongoose.Types.ObjectId.isValid(id);
    const media = isMongoId
      ? await Media.findByIdAndUpdate(
          id,
          {
            $set: {
              ...(body.altText !== undefined && { altText: body.altText }),
              ...(body.tags !== undefined && { tags: body.tags }),
            },
          },
          { new: true }
        ).lean()
      : await Media.findOneAndUpdate(
          { publicId: id },
          {
            $set: {
              ...(body.altText !== undefined && { altText: body.altText }),
              ...(body.tags !== undefined && { tags: body.tags }),
            },
          },
          { new: true }
        ).lean();

    if (!media) {
      return NextResponse.json(
        { success: false, error: "Media item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: media });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
