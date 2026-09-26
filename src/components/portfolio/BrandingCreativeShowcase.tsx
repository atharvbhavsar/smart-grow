"use client";

import React, { useState, useRef } from "react";
import { BRANDING_CREATIVE_DATA, VideoEditingItem } from "@/data/portfolioData";
import { MediaLightbox, LightboxMedia } from "./MediaLightbox";
import { Palette, Film, Image as ImageIcon, Play, ZoomIn, Clock } from "lucide-react";

function HoverVideoCard({
  video,
  onOpen,
}: {
  video: typeof BRANDING_CREATIVE_DATA.videos[0];
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
      className="group relative aspect-[9/15] w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1.5"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        poster={video.thumbnailUrl}
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

      {/* Top Floating Badges */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-xs">
          {video.type}
        </span>
        <span className="text-[10px] font-bold text-amber-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1 shadow-xs">
          <Clock className="h-2.5 w-2.5 text-amber-300" /> {video.duration}
        </span>
      </div>

      {/* Center Play Icon (fades when playing) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-12 h-12 rounded-full bg-white/95 text-slate-950 flex items-center justify-center shadow-2xl transition-all duration-300 ${
            isPlaying ? "opacity-0 scale-75" : "opacity-100 scale-100 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white"
          }`}
        >
          <Play className="h-5 w-5 fill-current ml-0.5" />
        </div>
      </div>

      {/* Bottom Floating Title & Client */}
      <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-1 pointer-events-none">
        <div className="text-[10px] font-extrabold text-purple-300 uppercase tracking-wider">
          {video.client}
        </div>
        <h3 className="text-sm sm:text-base font-bold text-white leading-snug drop-shadow-md line-clamp-2">
          {video.title}
        </h3>
      </div>
    </div>
  );
}

type CreativeTab = "branding" | "videos" | "posters";

export function BrandingCreativeShowcase() {
  const [activeTab, setActiveTab] = useState<CreativeTab>("branding");
  const [videoFilter, setVideoFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const videoCategories = [
    "All",
    "Model Videos",
    "Clips / One-Take Videos",
    "Broker Videos"
  ];

  const filteredVideos = videoFilter === "All"
    ? BRANDING_CREATIVE_DATA.videos
    : BRANDING_CREATIVE_DATA.videos.filter((v) => v.type === videoFilter);

  // Compile active media list for lightbox
  let currentMediaList: LightboxMedia[] = [];

  if (activeTab === "branding") {
    currentMediaList = BRANDING_CREATIVE_DATA.branding.map((b) => ({
      url: b.imageUrl,
      type: "image",
      title: b.title,
      client: b.client,
      category: "Brand Identity",
      description: b.description
    }));
  } else if (activeTab === "videos") {
    currentMediaList = filteredVideos.map((v) => ({
      url: v.videoUrl,
      type: "video",
      title: v.title,
      client: v.client,
      category: v.type,
      description: v.description
    }));
  } else {
    currentMediaList = BRANDING_CREATIVE_DATA.posters.map((p) => ({
      url: p.imageUrl,
      type: "image",
      title: p.title,
      client: p.client,
      category: "Commercial Poster",
      description: p.description
    }));
  }

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-extrabold uppercase tracking-widest mb-3">
            <Palette className="h-3.5 w-3.5" /> Creative & Studio Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Branding, Video Production & Posters
          </h2>
        </div>

        {/* Primary Sub-Tabs: Branding | Videos | Posters */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8">
          <button
            onClick={() => setActiveTab("branding")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "branding"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Palette className="h-4 w-4" /> Branding
          </button>

          <button
            onClick={() => setActiveTab("videos")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "videos"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Film className="h-4 w-4" /> Videos
          </button>

          <button
            onClick={() => setActiveTab("posters")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "posters"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <ImageIcon className="h-4 w-4" /> Posters
          </button>
        </div>

        {/* Video Sub-Filter (Model Videos, Broker Videos, Clips / One-Take) */}
        {activeTab === "videos" && (
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {videoCategories.map((vc) => {
              const active = videoFilter === vc;
              return (
                <button
                  key={vc}
                  onClick={() => setVideoFilter(vc)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {vc}
                </button>
              );
            })}
          </div>
        )}

        {/* TAB 1: BRANDING CONTENT (3 Clean Real Brand Assets) */}
        {activeTab === "branding" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {BRANDING_CREATIVE_DATA.branding.map((brand, idx) => (
              <div
                key={brand.id}
                onClick={() => setLightboxIndex(idx)}
                className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] w-full bg-slate-50 overflow-hidden flex items-center justify-center p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.imageUrl}
                    alt={brand.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-950 bg-white/95 px-2.5 py-1 rounded-full border border-slate-200/80 shadow-xs">
                      {brand.client}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-slate-950 text-xs font-extrabold shadow-xl">
                      <ZoomIn className="h-4 w-4 text-purple-600" />
                      Expand Image
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-950 group-hover:text-purple-600 transition-colors">
                    {brand.title}
                  </h3>
                  <ZoomIn className="h-4 w-4 text-purple-600 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: VIDEOS (Full Video Cards with Hover Autoplay) */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVideos.map((video, idx) => (
              <HoverVideoCard
                key={video.id}
                video={video}
                onOpen={() => setLightboxIndex(idx)}
              />
            ))}
          </div>
        )}

        {/* TAB 3: POSTERS (4 High-Impact Posters) */}
        {activeTab === "posters" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRANDING_CREATIVE_DATA.posters.map((poster, idx) => (
              <div
                key={poster.id}
                onClick={() => setLightboxIndex(idx)}
                className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="relative aspect-[3/4] w-full bg-slate-50 overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={poster.imageUrl}
                    alt={poster.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-950 bg-white/95 px-2.5 py-1 rounded-full border border-slate-200/80 shadow-xs">
                      {poster.client}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-slate-950 text-xs font-extrabold shadow-xl">
                      <ZoomIn className="h-4 w-4 text-purple-600" />
                      Expand Poster
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-950 group-hover:text-purple-600 transition-colors">
                    {poster.title}
                  </h3>
                  <ZoomIn className="h-4 w-4 text-purple-600 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Media Lightbox */}
      <MediaLightbox
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        mediaList={currentMediaList}
        currentIndex={lightboxIndex ?? 0}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
}
