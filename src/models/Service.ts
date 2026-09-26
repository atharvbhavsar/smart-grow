import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  serviceId: string;
  title: string;
  category: "digital-products" | "ai-solutions" | "creative-services" | "growth-services";
  icon?: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  benefits: string[];
  technologies?: string[];
  imageUrl?: string;
  imagePublicId?: string;
  process?: Array<{ title: string; description: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  order?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    serviceId: {
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
      enum: ["digital-products", "ai-solutions", "creative-services", "growth-services"],
      required: true,
      index: true,
    },
    icon: {
      type: String,
      default: "Sparkles",
    },
    shortDesc: {
      type: String,
      required: true,
    },
    longDesc: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    imagePublicId: {
      type: String,
      trim: true,
    },
    process: [
      {
        title: String,
        description: String,
      },
    ],
    faqs: [
      {
        question: String,
        answer: String,
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

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
