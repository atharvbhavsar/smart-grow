import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITeamMember extends Document {
  slug: string;
  name: string;
  role: string;
  category?: string;
  bio?: string;
  imageUrl: string;
  imagePublicId?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    behance?: string;
    dribbble?: string;
    website?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
    location?: string;
  };
  skills?: Array<{
    name: string;
    level: number;
    category?: string;
  }>;
  order?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: "Leadership",
    },
    bio: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    imagePublicId: {
      type: String,
      trim: true,
    },
    socialLinks: {
      linkedin: String,
      github: String,
      twitter: String,
      behance: String,
      dribbble: String,
      website: String,
    },
    contact: {
      email: String,
      phone: String,
      location: String,
    },
    skills: [
      {
        name: String,
        level: Number,
        category: String,
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TeamMember: Model<ITeamMember> =
  mongoose.models.TeamMember ||
  mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);

export default TeamMember;
