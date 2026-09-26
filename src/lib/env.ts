/**
 * Server-side Environment Validation
 * Validates required backend variables without leaking secrets.
 */

export interface ServerEnvConfig {
  MONGODB_URI: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
}

export function validateServerEnv(): ServerEnvConfig {
  if (typeof window !== "undefined") {
    throw new Error("Server environment validation cannot be executed in the browser.");
  }

  const missing: string[] = [];

  const MONGODB_URI = process.env.MONGODB_URI;
  const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
  const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

  if (!MONGODB_URI) missing.push("MONGODB_URI");
  if (!CLOUDINARY_CLOUD_NAME) missing.push("CLOUDINARY_CLOUD_NAME");
  if (!CLOUDINARY_API_KEY) missing.push("CLOUDINARY_API_KEY");
  if (!CLOUDINARY_API_SECRET) missing.push("CLOUDINARY_API_SECRET");

  if (missing.length > 0) {
    const errorMsg = `[Environment Error] Missing required server environment variable(s): ${missing.join(", ")}. Please configure them in .env.local or production platform settings.`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  return {
    MONGODB_URI: MONGODB_URI!,
    CLOUDINARY_CLOUD_NAME: CLOUDINARY_CLOUD_NAME!,
    CLOUDINARY_API_KEY: CLOUDINARY_API_KEY!,
    CLOUDINARY_API_SECRET: CLOUDINARY_API_SECRET!,
  };
}
