"use client";

import React from "react";
import { Globe, Share2, TrendingUp, PlaySquare, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export type PortfolioCategory =
  | "website"
  | "social-media"
  | "performance-marketing"
  | "video-editing"
  | "real-estate";

interface PortfolioHeroProps {
  activeCategory: PortfolioCategory;
  onSelectCategory: (cat: PortfolioCategory) => void;
}

const CATEGORIES: Array<{
  id: PortfolioCategory;
  label: string;
  icon: React.ElementType;
  badge?: string;
}> = [
  { id: "website", label: "Website", icon: Globe },
  { id: "social-media", label: "Social Media Management / Growth", icon: Share2 },
  { id: "performance-marketing", label: "Performance Marketing", icon: TrendingUp },
  { id: "video-editing", label: "Video Editing", icon: PlaySquare, badge: "Video-First" },
  { id: "real-estate", label: "Real Estate", icon: Building2, badge: "Dedicated" },
];

export function PortfolioHero({
  activeCategory,
  onSelectCategory,
}: PortfolioHeroProps) {
  return (
    <section className="pt-28 pb-12 sm:pt-32 sm:pb-16 bg-white border-b border-slate-100 relative overflow-hidden font-sans">
      {/* Background Subtle Gradient & Grid Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Work That Speaks <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 bg-clip-text text-transparent">
            For Itself
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Explore actual websites, viral social media engines, performance ad campaigns, video edits, and real estate growth systems engineered by SmartlyGrow.
        </p>

        {/* The 5 Primary Category Navigation Tabs */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 sm:p-2 bg-slate-100/90 rounded-2xl sm:rounded-full border border-slate-200/80 max-w-full">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`relative flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-slate-950 text-white shadow-md shadow-slate-950/20"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/70"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                  <span>{cat.label}</span>

                  {cat.badge && (
                    <span
                      className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-blue-500/30 text-blue-200 border border-blue-400/30"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {cat.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
