"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Sparkles, X, Eye, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface VideoProject {
  id: string;
  title: string;
  category: string;
  duration: string;
  videoUrl: string;
  description: string;
}

const VIDEO_PROJECTS: VideoProject[] = [
  {
    id: "video-01",
    title: "Commercial Brand Story",
    category: "Brand Campaign",
    duration: "0:35",
    videoUrl: "/video/video-01.mp4",
    description: "High-impact brand narrative engineered with cinematic color grading, dynamic sound design, and sharp pacing.",
  },
  {
    id: "video-02",
    title: "High-Retention Social Reel",
    category: "Social Media / Reels",
    duration: "0:30",
    videoUrl: "/video/video-02.mp4",
    description: "Fast-paced vertical reel format designed to capture attention in the first 3 seconds and maximize retention.",
  },
  {
    id: "video-03",
    title: "Product & Motion Visuals",
    category: "Commercial Showcase",
    duration: "0:45",
    videoUrl: "/video/video-03.mp4",
    description: "Seamless motion cuts and rhythmic editing highlighting product details and aesthetic features.",
  },
  {
    id: "video-04",
    title: "Cinematic Visual Story",
    category: "Cinematic Production",
    duration: "0:40",
    videoUrl: "/video/video-04.mp4",
    description: "Atmospheric visual pacing with professional sound mix, seamless transitions, and high emotional engagement.",
  },
];

export function VideoEditingShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);

  // Handle ESC key and body scroll lock
  useEffect(() => {
    if (!selectedVideo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVideo(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white font-sans text-slate-900 border-t border-slate-100 relative">
      <div className="mx-auto max-w-6xl px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-blue-600 mb-2.5 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            VIDEO EDITING
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-[1.15]">
            Visual Stories, Edited to Perform
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Professional video editing crafted for brands, businesses, creators, and social media.
          </p>
        </div>

        {/* Full-Width Horizontal Cards Grid (2x2 on Desktop, 1x4 on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {VIDEO_PROJECTS.map((project, idx) => (
            <HorizontalVideoCard
              key={project.id}
              project={project}
              index={idx}
              onOpen={() => setSelectedVideo(project)}
            />
          ))}
        </div>

      </div>

      {/* Clean Transparent Blurred Video Lightbox (Website Visible in Background) */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 md:p-10 bg-black/60 backdrop-blur-md">
            
            {/* Backdrop Click Close */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setSelectedVideo(null)}
            />

            {/* Top Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-3 right-3 sm:top-6 sm:right-6 z-50 p-2 sm:p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-md border border-white/20 shadow-lg cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Floating Video Player Frame */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/15 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar with Title */}
              <div className="px-4 py-2.5 sm:px-5 sm:py-3.5 bg-black/85 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded-md border border-blue-400/30">
                    {selectedVideo.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate max-w-[200px] sm:max-w-none">
                    {selectedVideo.title}
                  </h4>
                </div>
              </div>

              {/* Video Player */}
              <div 
                className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden"
              >
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full max-h-[75vh] object-contain"
                />
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function HorizontalVideoCard({
  project,
  index,
  onOpen,
}: {
  project: VideoProject;
  index: number;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col sm:flex-row relative"
    >
      {/* Video Preview Frame (Left side on sm+ screens) */}
      <div className="relative w-full sm:w-[48%] aspect-[16/10] sm:aspect-auto overflow-hidden bg-slate-950 shrink-0">
        {/* Subtle grid pattern behind thumbnail */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:1.25rem_1.25rem] opacity-20 pointer-events-none" />

        <video
          ref={videoRef}
          src={project.videoUrl}
          preload="metadata"
          muted
          playsInline
          loop
          controls={false}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none"
        />

        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
          <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-900 shadow-xs border border-white/60">
            {project.category}
          </span>
        </div>

        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10">
          <span className="px-2 py-0.5 rounded-full bg-slate-950/75 backdrop-blur-md text-[9px] sm:text-[10px] font-bold text-white shadow-xs">
            0{index + 1}
          </span>
        </div>

        {/* Center Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 transform group-hover:scale-110 transition-transform duration-300">
            <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-white translate-x-0.5" />
          </div>
        </div>

        {/* Bottom "Watch Video" hover pill on Desktop */}
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-md">
            <Eye className="h-3 w-3" /> Watch Video
          </span>
        </div>
      </div>

      {/* Card Details (Right side on sm+ screens) */}
      <div className="p-4 sm:p-5 md:p-6 flex flex-col justify-between flex-1 bg-white">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
              {project.category}
            </span>
            <span className="text-[10px] font-medium text-slate-400">
              {project.duration}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-slate-950 tracking-tight mt-1 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>

          <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2 sm:line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
          <span className="flex items-center gap-1 group-hover:underline">
            Watch Video <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="text-slate-400 font-normal text-[10px]">
            Full HD · Sound On
          </span>
        </div>
      </div>
    </div>
  );
}
