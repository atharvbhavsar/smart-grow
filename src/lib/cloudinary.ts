import { v2 as cloudinary, UploadApiResponse, UploadApiOptions } from "cloudinary";
import { validateServerEnv } from "./env";

// Ensure environment variables are loaded and validated
const env = validateServerEnv();

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

export type CloudinaryFolder =
  | "smartlygrow/about"
  | "smartlygrow/team"
  | "smartlygrow/portfolio"
  | "smartlygrow/blogs"
  | "smartlygrow/services"
  | "smartlygrow/hero"
  | "smartlygrow/clients"
  | "smartlygrow/videos"
  | "smartlygrow/general";

export const FOLDERS = {
  ABOUT: "smartlygrow/about" as CloudinaryFolder,
  TEAM: "smartlygrow/team" as CloudinaryFolder,
  PORTFOLIO: "smartlygrow/portfolio" as CloudinaryFolder,
  BLOGS: "smartlygrow/blogs" as CloudinaryFolder,
  SERVICES: "smartlygrow/services" as CloudinaryFolder,
  HERO: "smartlygrow/hero" as CloudinaryFolder,
  CLIENTS: "smartlygrow/clients" as CloudinaryFolder,
  VIDEOS: "smartlygrow/videos" as CloudinaryFolder,
  GENERAL: "smartlygrow/general" as CloudinaryFolder,
};

/**
 * Upload a file buffer to Cloudinary (for server-side file uploads)
 */
export async function uploadBufferToCloudinary(
  buffer: Buffer,
  options: UploadApiOptions = {}
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: options.resource_type || "auto",
        folder: options.folder || FOLDERS.HERO,
        ...options,
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Upload failed to return a result"));
        }
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
}

/**
 * Upload a local file path to Cloudinary (used in migration scripts)
 */
export async function uploadLocalFileToCloudinary(
  filePath: string,
  options: UploadApiOptions = {}
): Promise<UploadApiResponse> {
  return cloudinary.uploader.upload(filePath, {
    resource_type: options.resource_type || "auto",
    folder: options.folder || FOLDERS.HERO,
    ...options,
  });
}

/**
 * Delete an asset from Cloudinary
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "video" = "image"
): Promise<{ result: string }> {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
    invalidate: true,
  });
}

/**
 * Generate an optimized Cloudinary delivery URL with f_auto, q_auto and dimensions.
 */
export function getOptimizedImageUrl(
  publicIdOrUrl: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
  } = {}
): string {
  if (!publicIdOrUrl) return "";

  // If already a full Cloudinary URL and contains res.cloudinary.com, we can extract publicId or transform
  if (publicIdOrUrl.startsWith("http")) {
    if (!publicIdOrUrl.includes("res.cloudinary.com")) {
      return publicIdOrUrl; // external or local URL
    }
    // Inject f_auto,q_auto if not present
    if (!publicIdOrUrl.includes("f_auto") && !publicIdOrUrl.includes("q_auto")) {
      return publicIdOrUrl.replace("/upload/", "/upload/f_auto,q_auto/");
    }
    return publicIdOrUrl;
  }

  // If a public_id is provided
  return cloudinary.url(publicIdOrUrl, {
    secure: true,
    fetch_format: options.format || "auto",
    quality: options.quality || "auto",
    width: options.width,
    height: options.height,
    crop: options.crop || (options.width && options.height ? "fill" : undefined),
  });
}

/**
 * Generate an optimized video URL or video thumbnail poster
 */
export function getVideoThumbnailUrl(
  publicId: string,
  options: { width?: number; height?: number } = {}
): string {
  return cloudinary.url(publicId, {
    secure: true,
    resource_type: "video",
    format: "jpg",
    transformation: [
      { width: options.width || 800, crop: "scale" },
      { quality: "auto" },
    ],
  });
}
