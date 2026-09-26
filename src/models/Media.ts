import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMedia extends Document {
  publicId: string;
  secureUrl: string;
  resourceType: "image" | "video";
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  duration?: number;
  thumbnailUrl?: string;
  folder?: string;
  altText?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMedia>(
  {
    publicId: {
      type: String,
      required: [true, "Cloudinary publicId is required"],
      unique: true,
      index: true,
      trim: true,
    },
    secureUrl: {
      type: String,
      required: [true, "Cloudinary secureUrl is required"],
      trim: true,
    },
    resourceType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
      required: true,
      index: true,
    },
    format: {
      type: String,
      trim: true,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    bytes: {
      type: Number,
    },
    duration: {
      type: Number,
    },
    thumbnailUrl: {
      type: String,
      trim: true,
    },
    folder: {
      type: String,
      index: true,
      trim: true,
    },
    altText: {
      type: String,
      default: "",
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent overwrite in Next.js hot reload
export const Media: Model<IMedia> =
  mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema);

export default Media;
