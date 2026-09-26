import mongoose, { Schema, Document, Model } from "mongoose";

export type VideoAuditAction =
  | "playback_requested"
  | "playback_granted"
  | "playback_denied"
  | "heartbeat_received"
  | "session_expired"
  | "session_revoked"
  | "concurrent_limit_exceeded"
  | "video_created"
  | "video_updated"
  | "video_deleted";

export interface IVideoAuditLog extends Document {
  videoId?: string;
  videoPublicId?: string;
  videoTitle?: string;
  userId?: string;
  userEmail?: string;
  userRole?: string;
  action: VideoAuditAction;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

const VideoAuditLogSchema: Schema<IVideoAuditLog> = new Schema(
  {
    videoId: {
      type: String,
      index: true,
    },
    videoPublicId: {
      type: String,
      index: true,
    },
    videoTitle: {
      type: String,
    },
    userId: {
      type: String,
      index: true,
    },
    userEmail: {
      type: String,
      index: true,
    },
    userRole: {
      type: String,
    },
    action: {
      type: String,
      required: true,
      index: true,
    },
    details: {
      type: Schema.Types.Mixed,
      default: {},
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false,
  }
);

// Auto-expire logs after 90 days
VideoAuditLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 7776000 });

export const VideoAuditLog: Model<IVideoAuditLog> =
  mongoose.models.VideoAuditLog ||
  mongoose.model<IVideoAuditLog>("VideoAuditLog", VideoAuditLogSchema);
