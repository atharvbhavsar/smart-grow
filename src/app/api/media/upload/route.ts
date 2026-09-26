import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { uploadBufferToCloudinary, FOLDERS, CloudinaryFolder } from "@/lib/cloudinary";
import { Media } from "@/models/Media";

// 10MB for images, 100MB for videos
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

const ALLOWED_IMAGE_MIMES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
];

const ALLOWED_VIDEO_MIMES = [
  "video/mp4",
  "video/webm",
  "video/quicktime", // MOV
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const requestedFolder = formData.get("folder") as string | null;
    const altText = (formData.get("altText") as string) || "";
    const tagsRaw = formData.get("tags") as string | null;
    const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided for upload" },
        { status: 400 }
      );
    }

    const mimeType = file.type.toLowerCase();
    const isImage = ALLOWED_IMAGE_MIMES.includes(mimeType);
    const isVideo = ALLOWED_VIDEO_MIMES.includes(mimeType);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported file type: ${mimeType}. Allowed formats: JPG, PNG, WEBP, SVG, MP4, WEBM, MOV.`,
        },
        { status: 400 }
      );
    }

    // File size validation
    const maxAllowedSize = isImage ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE;
    if (file.size > maxAllowedSize) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds limit (${Math.round(maxAllowedSize / (1024 * 1024))}MB)`,
        },
        { status: 400 }
      );
    }

    // Resolve folder
    let targetFolder: CloudinaryFolder = isVideo ? FOLDERS.VIDEOS : FOLDERS.HERO;
    if (requestedFolder) {
      const folderKey = requestedFolder.toLowerCase().replace("smartlygrow/", "");
      if (folderKey.includes("team")) targetFolder = FOLDERS.TEAM;
      else if (folderKey.includes("portfolio") || folderKey.includes("project")) targetFolder = FOLDERS.PORTFOLIO;
      else if (folderKey.includes("blog")) targetFolder = FOLDERS.BLOGS;
      else if (folderKey.includes("service")) targetFolder = FOLDERS.SERVICES;
      else if (folderKey.includes("client") || folderKey.includes("trust")) targetFolder = FOLDERS.CLIENTS;
      else if (folderKey.includes("video") || folderKey.includes("reel")) targetFolder = FOLDERS.VIDEOS;
      else if (folderKey.includes("hero")) targetFolder = FOLDERS.HERO;
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult = await uploadBufferToCloudinary(buffer, {
      folder: targetFolder,
      resource_type: isVideo ? "video" : "image",
    });

    // Save metadata to MongoDB Atlas
    await connectToDatabase();

    const mediaDoc = await Media.create({
      publicId: uploadResult.public_id,
      secureUrl: uploadResult.secure_url,
      resourceType: uploadResult.resource_type === "video" ? "video" : "image",
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
      bytes: uploadResult.bytes,
      duration: uploadResult.duration,
      thumbnailUrl:
        uploadResult.resource_type === "video"
          ? uploadResult.secure_url.replace(/\.[^/.]+$/, ".jpg")
          : uploadResult.secure_url,
      folder: targetFolder,
      altText,
      tags,
    });

    return NextResponse.json(
      {
        success: true,
        id: mediaDoc._id,
        url: uploadResult.secure_url,
        secureUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        resourceType: mediaDoc.resourceType,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        bytes: uploadResult.bytes,
        duration: uploadResult.duration,
        thumbnailUrl: mediaDoc.thumbnailUrl,
        folder: targetFolder,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error("[Upload API Error]:", err.message);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process upload" },
      { status: 500 }
    );
  }
}
