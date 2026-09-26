"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PortfolioHero, PortfolioCategory } from "./PortfolioHero";
import { WebsiteShowcase } from "./WebsiteShowcase";
import { SocialMediaShowcase } from "./SocialMediaShowcase";
import { PerformanceMarketingShowcase } from "./PerformanceMarketingShowcase";
import { VideoEditingShowcase } from "./VideoEditingShowcase";
import { RealEstateShowcase } from "./RealEstateShowcase";
import { BrandingCreativeShowcase } from "./BrandingCreativeShowcase";
import { FinalCta } from "@/components/home/FinalCta";
import { motion, AnimatePresence } from "framer-motion";

function PortfolioMainContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("website");

  useEffect(() => {
    if (catParam) {
      const normalized = catParam.toLowerCase().replace(/_/g, "-");
      if (
        normalized === "website" ||
        normalized === "social-media" ||
        normalized === "performance-marketing" ||
        normalized === "video-editing" ||
        normalized === "real-estate"
      ) {
        setActiveCategory(normalized as PortfolioCategory);
      }
    }
  }, [catParam]);

  const handleSelectCategory = (cat: PortfolioCategory) => {
    setActiveCategory(cat);
    // Smooth scroll to work container if needed
    const container = document.getElementById("portfolio-showcase-container");
    if (container) {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="flex-1 bg-white font-sans text-left min-h-screen">
      {/* Portfolio Hero with 5 Navigation Tabs */}
      <PortfolioHero
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Dynamic Portfolio Category Section */}
      <div id="portfolio-showcase-container" className="scroll-mt-24">
        <AnimatePresence mode="wait">
          {activeCategory === "website" && (
            <motion.div
              key="website"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <WebsiteShowcase />
            </motion.div>
          )}

          {activeCategory === "social-media" && (
            <motion.div
              key="social-media"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <SocialMediaShowcase />
            </motion.div>
          )}

          {activeCategory === "performance-marketing" && (
            <motion.div
              key="performance-marketing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <PerformanceMarketingShowcase />
            </motion.div>
          )}

          {activeCategory === "video-editing" && (
            <motion.div
              key="video-editing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <VideoEditingShowcase />
            </motion.div>
          )}

          {activeCategory === "real-estate" && (
            <motion.div
              key="real-estate"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <RealEstateShowcase />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section 6: Dedicated Branding / Creative Content Area */}
      <BrandingCreativeShowcase />

      {/* Final Commercial CTA */}
      <FinalCta />
    </main>
  );
}

export default function PortfolioClient() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-slate-400 font-sans">Loading SmartlyGrow portfolio...</div>}>
      <PortfolioMainContent />
    </Suspense>
  );
}
