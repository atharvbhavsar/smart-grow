import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  slug: string;
  title: string;
  category: "AI & Automation" | "Web Development" | "Growth & Marketing" | "Branding";
  summary: string;
  content: string;
  featuredImage: string;
  featuredImagePublicId?: string;
  date?: string;
  readTime?: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
    avatarPublicId?: string;
  };
  tags?: string[];
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["AI & Automation", "Web Development", "Growth & Marketing", "Branding"],
      required: true,
      index: true,
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    featuredImage: {
      type: String,
      required: true,
      trim: true,
    },
    featuredImagePublicId: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
    },
    readTime: {
      type: String,
      default: "5 min read",
    },
    author: {
      name: { type: String, required: true },
      role: { type: String, default: "SmartlyGrow Team" },
      avatar: String,
      avatarPublicId: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
