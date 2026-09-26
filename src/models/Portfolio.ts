import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPortfolio extends Document {
  slug: string;
  title: string;
  category: "Business Growth" | "Creative Services" | "AI Solutions";
  categorySlug: "business-growth" | "creative-services" | "ai-solutions";
  companyName: string;
  industry?: string;
  tagline?: string;
  description: string;
  imageUrl: string;
  imagePublicId?: string;
  videoUrl?: string;
  videoPublicId?: string;
  liveUrl?: string;
  companyOverview?: {
    about?: string;
    requirements?: string[];
    challenges?: string[];
  };
  servicesBuilt?: string[];
  beforeAfterMetrics?: {
    before?: Record<string, string>;
    after?: Record<string, string>;
    growthPercentages?: Record<string, string>;
    visualMetrics?: Array<{
      label: string;
      beforeValue: number;
      afterValue: number;
      unit: string;
      percentage: string;
    }>;
  };
  timeline?: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  testimonial?: {
    name?: string;
    role?: string;
    company?: string;
    rating?: number;
    quote?: string;
    photo?: string;
    photoPublicId?: string;
  };
  isFeatured?: boolean;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
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
      enum: ["Business Growth", "Creative Services", "AI Solutions"],
      required: true,
      index: true,
    },
    categorySlug: {
      type: String,
      enum: ["business-growth", "creative-services", "ai-solutions"],
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      default: "",
    },
    tagline: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
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
    videoUrl: {
      type: String,
      trim: true,
    },
    videoPublicId: {
      type: String,
      trim: true,
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    companyOverview: {
      about: String,
      requirements: [String],
      challenges: [String],
    },
    servicesBuilt: [String],
    beforeAfterMetrics: {
      before: Schema.Types.Mixed,
      after: Schema.Types.Mixed,
      growthPercentages: Schema.Types.Mixed,
      visualMetrics: [
        {
          label: String,
          beforeValue: Number,
          afterValue: Number,
          unit: String,
          percentage: String,
        },
      ],
    },
    timeline: [
      {
        step: String,
        title: String,
        description: String,
      },
    ],
    testimonial: {
      name: String,
      role: String,
      company: String,
      rating: Number,
      quote: String,
      photo: String,
      photoPublicId: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Portfolio: Model<IPortfolio> =
  mongoose.models.Portfolio ||
  mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);

export default Portfolio;
