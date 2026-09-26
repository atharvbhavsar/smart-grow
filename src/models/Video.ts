import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVideo extends Document {
  title: string;
  description?: string;
  cloudinaryPublicId: string;
  cloudinaryAssetId?: string;
  resourceType: "video";
  format: string;
  duration?: number;
  width?: number;
  height?: number;
  bytes?: number;
  thumbnailUrl?: string;
  hlsUrl?: string;
  dashUrl?: string;
  folder: string;
  accessType: "public" | "authenticated" | "private";
  isProtected: boolean;
  isPublished: boolean;
  allowedRoles: string[];
  tags: string[];
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema: Schema<IVideo> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Video title is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    cloudinaryPublicId: {
      type: String,
      required: [true, "Cloudinary public ID is required"],
      unique: true,
      index: true,
    },
    cloudinaryAssetId: {
      type: String,
      trim: true,
    },
    resourceType: {
      type: String,
      default: "video",
    },
    format: {
      type: String,
      default: "mp4",
    },
    duration: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    bytes: {
      type: Number,
      default: 0,
    },
    thumbnailUrl: {
      type: String,
      trim: true,
    },
    hlsUrl: {
      type: String,
      trim: true,
    },
    dashUrl: {
      type: String,
      trim: true,
    },
    folder: {
      type: String,
      default: "smartlygrow/videos/general",
      index: true,
    },
    accessType: {
      type: String,
      enum: ["public", "authenticated", "private"],
      default: "authenticated",
      index: true,
    },
    isProtected: {
      type: Boolean,
      default: true,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    allowedRoles: {
      type: [String],
      default: ["admin", "client", "member"],
    },
    tags: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation of model during hot reload
export const Video: Model<IVideo> =
  mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);
