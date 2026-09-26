import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPlaybackSession extends Document {
  sessionId: string;
  userId: string;
  userEmail: string;
  videoId: string;
  videoPublicId: string;
  ipAddress?: string;
  userAgent?: string;
  startedAt: Date;
  expiresAt: Date;
  lastHeartbeat: Date;
  status: "active" | "expired" | "revoked";
  createdAt: Date;
  updatedAt: Date;
}

const PlaybackSessionSchema: Schema<IPlaybackSession> = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    userEmail: {
      type: String,
      required: true,
      index: true,
    },
    videoId: {
      type: String,
      required: true,
      index: true,
    },
    videoPublicId: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    lastHeartbeat: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "expired", "revoked"],
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// TTL index to automatically purge old expired sessions after 24 hours
PlaybackSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 86400 });

export const PlaybackSession: Model<IPlaybackSession> =
  mongoose.models.PlaybackSession ||
  mongoose.model<IPlaybackSession>("PlaybackSession", PlaybackSessionSchema);
