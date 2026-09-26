import fs from "fs";
import path from "path";
import dns from "dns";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

// Configure DNS for SRV records on Windows networks
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch (e) {
  // ignore
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

// Load .env.local
const envLocalPath = path.join(ROOT_DIR, ".env.local");
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    }
  });
}

const {
  MONGODB_URI,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("Missing Cloudinary environment variables in .env.local");
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

// Schemas
const MediaSchema = new mongoose.Schema(
  {
    publicId: { type: String, required: true, unique: true },
    secureUrl: { type: String, required: true },
    resourceType: { type: String, enum: ["image", "video"], default: "image" },
    format: String,
    width: Number,
    height: Number,
    bytes: Number,
    duration: Number,
    thumbnailUrl: String,
    folder: String,
    altText: String,
    tags: [String],
  },
  { timestamps: true }
);

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    cloudinaryPublicId: { type: String, required: true, unique: true },
    cloudinaryAssetId: String,
    resourceType: { type: String, default: "video" },
    format: { type: String, default: "mp4" },
    duration: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    bytes: { type: Number, default: 0 },
    thumbnailUrl: String,
    hlsUrl: String,
    dashUrl: String,
    folder: { type: String, default: "smartlygrow/videos" },
    accessType: { type: String, default: "authenticated" },
    isProtected: { type: Boolean, default: true },
    isPublished: { type: Boolean, default: true },
    allowedRoles: { type: [String], default: ["admin", "client", "member"] },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Media = mongoose.models.Media || mongoose.model("Media", MediaSchema);
const Video = mongoose.models.Video || mongoose.model("Video", VideoSchema);

const VALID_IMAGE_EXTS = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".ico"];
const VALID_VIDEO_EXTS = [".mp4", ".mov", ".webm", ".m4v"];

async function uploadFile(localPath, folder, altText = "") {
  const ext = path.extname(localPath).toLowerCase();
  const isVideo = VALID_VIDEO_EXTS.includes(ext);
  const fileSize = fs.statSync(localPath).size;
  const cleanName = path.basename(localPath, ext).replace(/[^a-zA-Z0-9_-]/g, "_");

  // Cloudinary free tier enforces 100MB max per video file
  if (fileSize > 100 * 1024 * 1024) {
    console.log(`  -> [Skipping raw >100MB file] ${path.basename(localPath)} (${(fileSize / (1024 * 1024)).toFixed(2)} MB)`);
    return null;
  }

  console.log(`  -> [Uploading ${isVideo ? "VIDEO" : "IMAGE"}] ${path.basename(localPath)} (${(fileSize / (1024 * 1024)).toFixed(2)} MB)...`);

  const res = await new Promise((resolve, reject) => {
    const uploadOptions = {
      folder,
      public_id: cleanName,
      resource_type: isVideo ? "video" : "image",
      chunk_size: 6000000,
      overwrite: true,
    };

    if (isVideo) {
      cloudinary.uploader.upload_large(localPath, uploadOptions, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    } else {
      cloudinary.uploader.upload(localPath, uploadOptions, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    }
  });

  const secureUrl = res.secure_url || res.url || "";
  const thumbnailUrl = isVideo 
    ? (res.thumbnail_url || (secureUrl ? secureUrl.replace(/\.[^/.]+$/, ".jpg") : "")) 
    : secureUrl;

  const record = {
    publicId: res.public_id,
    secureUrl,
    resourceType: isVideo ? "video" : "image",
    format: res.format || ext.replace(".", ""),
    width: res.width || 0,
    height: res.height || 0,
    bytes: res.bytes || fs.statSync(localPath).size,
    duration: res.duration || 0,
    thumbnailUrl,
    folder,
    altText: altText || path.basename(localPath),
    tags: [folder.replace("smartlygrow/", "")],
  };

  return { res, record, isVideo };
}

async function scanAndUploadDir(dirPath, folder, allRecords, mongoConnected) {
  if (!fs.existsSync(dirPath)) return;
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    if (item.startsWith(".") || item === "node_modules" || item === ".next") continue;
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const subFolder = `${folder}/${item.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
      await scanAndUploadDir(fullPath, subFolder, allRecords, mongoConnected);
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if ([...VALID_IMAGE_EXTS, ...VALID_VIDEO_EXTS].includes(ext)) {
        try {
          const uploadResult = await uploadFile(fullPath, folder, item);
          if (!uploadResult) continue;
          const { res, record, isVideo } = uploadResult;
          allRecords.push(record);

          if (mongoConnected) {
            await Media.findOneAndUpdate({ publicId: record.publicId }, record, { upsert: true });

            if (isVideo) {
              const videoDoc = {
                title: item.replace(/\.[^/.]+$/, ""),
                description: `SmartlyGrow video asset: ${item}`,
                cloudinaryPublicId: record.publicId,
                cloudinaryAssetId: res.asset_id,
                resourceType: "video",
                format: record.format,
                duration: record.duration,
                width: record.width,
                height: record.height,
                bytes: record.bytes,
                thumbnailUrl: record.thumbnailUrl,
                hlsUrl: res.playback_url || res.secure_url,
                folder,
                accessType: "authenticated",
                isProtected: true,
                isPublished: true,
                allowedRoles: ["admin", "client", "member"],
                tags: record.tags,
              };
              await Video.findOneAndUpdate({ cloudinaryPublicId: record.publicId }, videoDoc, { upsert: true });
            }
          }
          console.log(`     ✓ Success: ${record.secureUrl}`);
        } catch (err) {
          console.error(`     ✗ Failed: ${item} (${err.message})`);
        }
      }
    }
  }
}

async function run() {
  console.log("==================================================");
  console.log("SMARTLYGROW COMPLETE CLOUDINARY & MONGODB UPLOADER");
  console.log("==================================================\n");

  let mongoConnected = false;
  if (MONGODB_URI) {
    console.log("Connecting to MongoDB Atlas...");
    try {
      await mongoose.connect(MONGODB_URI, {
        dbName: "smartlygrow",
        serverSelectionTimeoutMS: 8000,
      });
      mongoConnected = true;
      console.log("✓ MongoDB Atlas Connected successfully!\n");
    } catch (dbErr) {
      console.warn("⚠ MongoDB connection:", dbErr.message);
    }
  }

  const allRecords = [];

  // Target directories to upload
  const targetDirs = [
    { path: path.join(ROOT_DIR, "public"), folder: "smartlygrow/public" },
    { path: path.join(ROOT_DIR, "photo"), folder: "smartlygrow/photo" },
    { path: path.join(ROOT_DIR, "photot"), folder: "smartlygrow/photot" },
    { path: path.join(ROOT_DIR, "projects"), folder: "smartlygrow/projects" },
    { path: path.join(ROOT_DIR, "social media"), folder: "smartlygrow/social_media" },
    { path: path.join(ROOT_DIR, "thumbnail"), folder: "smartlygrow/thumbnail" },
    { path: path.join(ROOT_DIR, "vide edititng"), folder: "smartlygrow/video_editing" },
    { path: path.join(ROOT_DIR, "video"), folder: "smartlygrow/videos" },
    { path: path.join(ROOT_DIR, "scripts", "new photo now"), folder: "smartlygrow/team_circle" },
  ];

  for (const { path: dir, folder } of targetDirs) {
    if (fs.existsSync(dir)) {
      console.log(`\nScanning directory: ${path.relative(ROOT_DIR, dir) || "."} -> ${folder}`);
      await scanAndUploadDir(dir, folder, allRecords, mongoConnected);
    }
  }

  // Also scan individual media files in root directory
  console.log("\nScanning Root Directory for standalone videos and images...");
  const rootFiles = fs.readdirSync(ROOT_DIR);
  for (const item of rootFiles) {
    const fullPath = path.join(ROOT_DIR, item);
    if (fs.statSync(fullPath).isFile()) {
      const ext = path.extname(item).toLowerCase();
      if ([...VALID_IMAGE_EXTS, ...VALID_VIDEO_EXTS].includes(ext)) {
        try {
          const folder = VALID_VIDEO_EXTS.includes(ext) ? "smartlygrow/videos" : "smartlygrow/media";
          const uploadResult = await uploadFile(fullPath, folder, item);
          if (!uploadResult) continue;
          const { res, record, isVideo } = uploadResult;
          allRecords.push(record);
          if (mongoConnected) {
            await Media.findOneAndUpdate({ publicId: record.publicId }, record, { upsert: true });
            if (isVideo) {
              const videoDoc = {
                title: item.replace(/\.[^/.]+$/, ""),
                description: `SmartlyGrow root media: ${item}`,
                cloudinaryPublicId: record.publicId,
                cloudinaryAssetId: res.asset_id,
                resourceType: "video",
                format: record.format,
                duration: record.duration,
                width: record.width,
                height: record.height,
                bytes: record.bytes,
                thumbnailUrl: record.thumbnailUrl,
                hlsUrl: res.playback_url || res.secure_url,
                folder,
                accessType: "authenticated",
                isProtected: true,
                isPublished: true,
                allowedRoles: ["admin", "client", "member"],
                tags: record.tags,
              };
              await Video.findOneAndUpdate({ cloudinaryPublicId: record.publicId }, videoDoc, { upsert: true });
            }
          }
          console.log(`     ✓ Success: ${record.secureUrl}`);
        } catch (err) {
          console.error(`     ✗ Failed: ${item} (${err.message})`);
        }
      }
    }
  }

  // Save JSON manifest
  const manifestPath = path.join(ROOT_DIR, "src", "data", "cloudinary-manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(allRecords, null, 2), "utf-8");
  console.log(`\n✓ Saved Cloudinary Media Manifest to: src/data/cloudinary-manifest.json (${allRecords.length} records)`);

  if (mongoConnected) {
    const mediaCount = await Media.countDocuments();
    const videoCount = await Video.countDocuments();
    console.log(`✓ Total Media Records in MongoDB Atlas: ${mediaCount}`);
    console.log(`✓ Total Video Records in MongoDB Atlas: ${videoCount}`);
    await mongoose.disconnect();
  }

  console.log("\n==================================================");
  console.log(`UPLOAD TO CLOUDINARY & MONGODB COMPLETE! Processed ${allRecords.length} assets.`);
  console.log("==================================================");
}

run().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
