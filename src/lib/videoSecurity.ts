import crypto from "crypto";
import { cloudinary, FOLDERS } from "./cloudinary";
import { validateServerEnv } from "./env";

export const VIDEO_FOLDERS = {
  ABOUT: "smartlygrow/videos/about",
  SERVICES: "smartlygrow/videos/services",
  PROJECTS: "smartlygrow/videos/projects",
  TESTIMONIALS: "smartlygrow/videos/testimonials",
  MARKETING: "smartlygrow/videos/marketing",
  TRAINING: "smartlygrow/videos/training",
  GENERAL: "smartlygrow/videos/general",
} as const;

export type VideoFolderType = (typeof VIDEO_FOLDERS)[keyof typeof VIDEO_FOLDERS];

export const ALLOWED_VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/quicktime", // .mov
  "video/webm",
  "video/x-matroska", // .mkv
];

export const MAX_VIDEO_SIZE_BYTES = 500 * 1024 * 1024; // 500MB

// Configurable playback token lifetime (defaults to 10 minutes = 600s)
export const DEFAULT_PLAYBACK_EXPIRY_SECONDS = 600;

export const MAX_CONCURRENT_SESSIONS_PER_USER = 2;

/**
 * Validate video file buffer / metadata before processing
 */
export function validateVideoFile(file: {
  mimetype: string;
  size: number;
  originalname?: string;
}): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: "No video file provided." };
  }

  if (!ALLOWED_VIDEO_MIME_TYPES.includes(file.mimetype.toLowerCase())) {
    return {
      valid: false,
      error: `Invalid video format: ${file.mimetype}. Allowed formats are MP4, MOV, WEBM.`,
    };
  }

  if (file.size > MAX_VIDEO_SIZE_BYTES) {
    return {
      valid: false,
      error: `Video size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds maximum allowed size of 500MB.`,
    };
  }

  return { valid: true };
}

/**
 * Generate a short-lived signed HLS adaptive streaming URL (.m3u8) using Cloudinary
 * Adaptive bitrate streaming: automatically provides multi-quality renditions (1080p, 720p, 480p, 360p)
 */
export function generateSignedHlsUrl(
  publicId: string,
  options: {
    expiresInSeconds?: number;
    resourceType?: "video";
    isProtected?: boolean;
    streamingProfile?: string;
  } = {}
): { playbackUrl: string; expiresAt: Date } {
  const env = validateServerEnv();
  const expirySec = options.expiresInSeconds || DEFAULT_PLAYBACK_EXPIRY_SECONDS;
  const expiresAtUnix = Math.floor(Date.now() / 1000) + expirySec;
  const expiresAt = new Date(expiresAtUnix * 1000);

  // Clean public ID from any extension
  const cleanPublicId = publicId.replace(/\.[^/.]+$/, "");

  // Generate signed adaptive HLS URL (.m3u8) with adaptive streaming profile
  const playbackUrl = cloudinary.url(cleanPublicId, {
    resource_type: "video",
    type: options.isProtected ? "upload" : "upload",
    format: "m3u8",
    streaming_profile: options.streamingProfile || "hd",
    sign_url: true,
    expires_at: expiresAtUnix,
    secure: true,
  });

  return { playbackUrl, expiresAt };
}

/**
 * Generate a signed video thumbnail poster URL
 */
export function generateSignedPosterUrl(
  publicId: string,
  options: { width?: number; height?: number } = {}
): string {
  const cleanPublicId = publicId.replace(/\.[^/.]+$/, "");
  return cloudinary.url(cleanPublicId, {
    resource_type: "video",
    format: "jpg",
    transformation: [
      { width: options.width || 1280, crop: "scale" },
      { quality: "auto" },
    ],
    secure: true,
  });
}

/**
 * Generate session ID and cryptographic session token
 */
export function generatePlaybackSessionId(): string {
  return crypto.randomUUID();
}

export function generateSessionToken(payload: {
  sessionId: string;
  userId: string;
  videoId: string;
  expiresAt: number;
}): string {
  const secret = process.env.CLOUDINARY_API_SECRET || "smartlygrow_video_salt";
  const data = `${payload.sessionId}:${payload.userId}:${payload.videoId}:${payload.expiresAt}`;
  const hmac = crypto.createHmac("sha256", secret).update(data).digest("hex");
  return `${Buffer.from(data).toString("base64url")}.${hmac}`;
}

export function verifySessionToken(token: string): {
  valid: boolean;
  sessionId?: string;
  userId?: string;
  videoId?: string;
  expiresAt?: number;
} {
  try {
    const [encodedData, signature] = token.split(".");
    if (!encodedData || !signature) return { valid: false };

    const data = Buffer.from(encodedData, "base64url").toString("utf8");
    const [sessionId, userId, videoId, expiresAtStr] = data.split(":");
    const expiresAt = parseInt(expiresAtStr, 10);

    const secret = process.env.CLOUDINARY_API_SECRET || "smartlygrow_video_salt";
    const expectedHmac = crypto.createHmac("sha256", secret).update(data).digest("hex");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature, "hex"),
        Buffer.from(expectedHmac, "hex")
      )
    ) {
      return { valid: false };
    }

    if (Date.now() / 1000 > expiresAt) {
      return { valid: false }; // Expired
    }

    return { valid: true, sessionId, userId, videoId, expiresAt };
  } catch {
    return { valid: false };
  }
}

/**
 * In-memory rate limiter for playback requests
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkPlaybackRateLimit(
  ipOrUser: string,
  limit: number = 30, // 30 requests
  windowMs: number = 60000 // per 1 minute
): { allowed: boolean; remaining: number; resetInMs: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ipOrUser);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ipOrUser, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetInMs: windowMs };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetInMs: Math.max(0, entry.resetAt - now),
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: limit - entry.count,
    resetInMs: Math.max(0, entry.resetAt - now),
  };
}
