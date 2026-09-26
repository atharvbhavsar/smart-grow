"use client";

import React, { useState, useEffect, useRef } from "react";
import { REAL_ESTATE_DATA, RealEstateItem } from "@/data/portfolioData";
import { 
  Building2, 
  MapPin, 
  Globe, 
  Share2, 
  CheckCircle2, 
  ZoomIn, 
  ExternalLink, 
  Sparkles,
  X,
  PhoneCall,
  MessageCircle,
  TrendingUp,
  Award,
  Play
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function RealEstateReelCard({
  item,
  onOpen,
}: {
  item: RealEstateItem;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div
      onClick={onOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5"
    >
      {/* Video Preview Frame */}
      <div className="relative aspect-[9/14] bg-slate-950 overflow-hidden flex items-center justify-center">
        {item.videoUrl && (
          <video
            ref={videoRef}
            src={item.videoUrl}
            poster={item.thumbnailUrl}
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
          />
        )}

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

        {/* Floating Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider border border-white/10 shadow-xs">
            {item.client}
          </span>
          {item.duration && (
            <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold border border-white/10 shadow-xs">
              {item.duration}
            </span>
          )}
        </div>

        {/* Center Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`h-12 w-12 rounded-full bg-white/95 text-slate-950 flex items-center justify-center shadow-xl transition-all duration-300 ${
              isPlaying
                ? "opacity-0 scale-75"
                : "opacity-100 scale-100 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white"
            }`}
          >
            <Play className="h-5 w-5 fill-current ml-0.5 text-slate-950 group-hover:text-white" />
          </div>
        </div>

        {/* Bottom Title on Overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-10 text-white pointer-events-none">
          <h4 className="text-xs sm:text-sm font-bold leading-snug line-clamp-2 drop-shadow-md">
            {item.title}
          </h4>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between bg-white">
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:text-amber-700">
          <span>Watch Reel</span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
}

type RealEstateSubcategory = "google-business-profile" | "website" | "social-media";

export function RealEstateShowcase() {
  const [activeSubcategory, setActiveSubcategory] = useState<RealEstateSubcategory>("google-business-profile");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<RealEstateItem | null>(null);

  // Close modals on Escape key & lock body scroll
  useEffect(() => {
    if (!lightboxImage && !selectedVideo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImage(null);
        setSelectedVideo(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxImage, selectedVideo]);

  const subcategories: Array<{
    id: RealEstateSubcategory;
    label: string;
    icon: React.ElementType;
  }> = [
    {
      id: "google-business-profile",
      label: "Google Business Profile",
      icon: MapPin,
    },
    {
      id: "website",
      label: "Website",
      icon: Globe,
    },
    {
      id: "social-media",
      label: "Social Media Management",
      icon: Share2,
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-white font-sans text-slate-900 border-t border-slate-100 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-amber-700 mb-2.5 shadow-xs">
            <Building2 className="h-3.5 w-3.5 text-amber-600" />
            REAL ESTATE SOLUTIONS
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-[1.15]">
            Real Estate Growth & Digital Dominance
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal">
            Tailored digital systems engineered specifically for real estate developers, commercial brokers, and property agencies.
          </p>
        </div>

        {/* 3 Real Estate Sub-Navigation Tabs (Pill Style Matching Top Navigation) */}
        <div className="flex items-center justify-center mb-10 sm:mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 sm:p-2 bg-slate-100/90 rounded-2xl sm:rounded-full border border-slate-200/80 max-w-full">
            {subcategories.map((sub) => {
              const Icon = sub.icon;
              const isActive = activeSubcategory === sub.id;

              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubcategory(sub.id)}
                  className={`relative flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-slate-950 text-white shadow-md shadow-slate-950/20"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/70"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                  <span>{sub.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: GOOGLE BUSINESS PROFILE (Ideal Property Dedicated Showcase) */}
        {activeSubcategory === "google-business-profile" && (
          <div className="bg-slate-50/60 rounded-3xl border border-slate-200/90 p-5 sm:p-8 lg:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Phone Screenshot Frame */}
              <div className="lg:col-span-5 flex justify-center">
                <div
                  onClick={() => setLightboxImage("/ideal-property-gmb.png")}
                  className="group relative w-full max-w-[300px] sm:max-w-[320px] rounded-3xl overflow-hidden bg-white shadow-xl border-4 border-slate-900 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/ideal-property-gmb.png"
                    alt="Ideal Property - Google Business Profile #1 Ranking in Pune"
                    className="w-full h-auto object-cover"
                  />

                  {/* Hover Scrim */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-950 text-xs font-extrabold shadow-xl">
                      <ZoomIn className="h-4 w-4 text-amber-600" />
                      Expand Screenshot
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Case Study Data & Highlights */}
              <div className="lg:col-span-7 space-y-6">
                
                <div>
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-extrabold uppercase tracking-wider text-amber-700">
                      <MapPin className="h-3.5 w-3.5 text-amber-600" />
                      Ideal Property · Pune
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-snug">
                    Turning Google Maps into a consistent source of high-intent property enquiries.
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    We optimized Ideal Property’s local presence to improve visibility for commercial and industrial real-estate searches across Pune.
                  </p>
                </div>

                {/* Key Execution Highlights */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    What We Did
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-950 font-bold">Google Maps Visibility</strong> — Improved rankings for high-intent local searches.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-950 font-bold">Direct Enquiries</strong> — Connected Maps visitors directly to calls and WhatsApp.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-950 font-bold">Local Authority</strong> — Optimized business information, media, citations, and reviews.
                      </span>
                    </li>
                  </ul>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 2: WEBSITE (Ideal Property Dedicated Web Portal) */}
        {activeSubcategory === "website" && (
          <div className="bg-slate-50/60 rounded-3xl border border-slate-200/90 p-5 sm:p-8 lg:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Phone Screenshot Frame */}
              <div className="lg:col-span-5 flex justify-center">
                <div
                  onClick={() => setLightboxImage("/ideal-property-website.png")}
                  className="group relative w-full max-w-[300px] sm:max-w-[320px] rounded-3xl overflow-hidden bg-white shadow-xl border-4 border-slate-900 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/ideal-property-website.png"
                    alt="Ideal Property - Luxury Real Estate Web Experience (idealproperty.in)"
                    className="w-full h-auto object-cover"
                  />

                  {/* Hover Scrim */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-950 text-xs font-extrabold shadow-xl">
                      <ZoomIn className="h-4 w-4 text-amber-600" />
                      Expand Screenshot
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Case Study Data & Highlights */}
              <div className="lg:col-span-7 space-y-6">
                
                <div>
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-extrabold uppercase tracking-wider text-amber-700">
                      <Globe className="h-3.5 w-3.5 text-amber-600" />
                      Ideal Property · Pune
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-snug">
                    Discover Your Dream Home Today — High-Performance Real Estate Portal.
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    We engineered a custom, mobile-first web platform for Ideal Property featuring real-time location filtering, property categories, and instant inquiry capture.
                  </p>
                </div>

                {/* Key Execution Highlights */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    What We Built
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-950 font-bold">Mobile-First Search Engine</strong> — Instant search by location and property type for high-intent property buyers.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-950 font-bold">Direct Enquiries</strong> — Streamlined call and WhatsApp connection directly from mobile search results.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-950 font-bold">Luxury Real Estate Design</strong> — Ultra-clean typography and aesthetics engineered to build buyer confidence.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Live Website Link */}
                <div className="pt-2">
                  <a
                    href="https://www.idealproperty.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 text-white text-xs sm:text-sm font-bold shadow-md hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <span>Visit Live Website (idealproperty.in)</span>
                    <ExternalLink className="h-4 w-4 text-amber-400" />
                  </a>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 3: SOCIAL MEDIA (Ideal Property Social Reels) */}
        {activeSubcategory === "social-media" && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-extrabold uppercase tracking-wider text-amber-700 mb-2.5">
                <Share2 className="h-3.5 w-3.5 text-amber-600" />
                Ideal Property · Pune
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                High-Retention Social Media & Property Walkthrough Reels
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Engaging vertical video tours crafted to attract high-intent buyers, industrial investors, and commercial clients across social media feeds.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {REAL_ESTATE_DATA.socialMedia.map((item) => (
                <RealEstateReelCard
                  key={item.id}
                  item={item}
                  onOpen={() => setSelectedVideo(item)}
                />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Transparent Blurred Lightbox Modal (Website Visible in Background) */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md">
            
            {/* Backdrop Click Close */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setLightboxImage(null)}
            />

            {/* Top Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-md border border-white/20 shadow-lg cursor-pointer"
              aria-label="Close image modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Floating Image Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl bg-white border border-white/20 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightboxImage}
                alt="Ideal Property - Expanded View"
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
              />
            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* Clean Transparent Blurred Video Modal (Website Visible in Background) */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/60 backdrop-blur-md">
            
            {/* Backdrop Click Close */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setSelectedVideo(null)}
            />

            {/* Top Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-md border border-white/20 shadow-lg cursor-pointer"
              aria-label="Close video modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Floating Video Player Frame */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-sm sm:max-w-md max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/15 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar with Title */}
              <div className="px-4 py-3 bg-black/85 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-400/30">
                    {selectedVideo.client}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate max-w-[200px] sm:max-w-[260px]">
                    {selectedVideo.title}
                  </h4>
                </div>
              </div>

              {/* Video Player */}
              <div 
                className="relative bg-black flex items-center justify-center max-h-[75vh] overflow-hidden"
              >
                <video
                  src={selectedVideo.videoUrl}
                  poster={selectedVideo.thumbnailUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-auto max-h-[75vh] object-contain"
                />
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
