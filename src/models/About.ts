import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAbout extends Document {
  title: string;
  tagline: string;
  description: string;
  heroImage?: {
    url: string;
    publicId: string;
    altText?: string;
  };
  companyImages?: Array<{
    url: string;
    publicId: string;
    altText?: string;
  }>;
  values?: Array<{
    title: string;
    desc: string;
    icon?: string;
  }>;
  mission?: string;
  vision?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      default: "About SmartlyGrow",
      trim: true,
    },
    tagline: {
      type: String,
      default: "AI-Powered Growth Agency in Pune",
      trim: true,
    },
    description: {
      type: String,
      default:
        "We are a lean technology studio building high-performance Next.js websites, workflow automations, and custom AI agents.",
      trim: true,
    },
    heroImage: {
      url: { type: String, trim: true },
      publicId: { type: String, trim: true },
      altText: { type: String, default: "SmartlyGrow Hero Image" },
    },
    companyImages: [
      {
        url: { type: String, trim: true },
        publicId: { type: String, trim: true },
        altText: { type: String, default: "SmartlyGrow Office & Team" },
      },
    ],
    values: [
      {
        title: { type: String, trim: true },
        desc: { type: String, trim: true },
        icon: { type: String, trim: true },
      },
    ],
    mission: {
      type: String,
      default: "To build software and AI workflows that convert visitors into recurring enterprise revenue.",
      trim: true,
    },
    vision: {
      type: String,
      default: "Leading the transition into autonomous AI operational systems for global businesses.",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const About: Model<IAbout> =
  mongoose.models.About || mongoose.model<IAbout>("About", AboutSchema);

export default About;
