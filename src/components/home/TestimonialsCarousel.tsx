"use client";

import React, { useState, useRef } from "react";
import { Play, Volume2, Quote, Star, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIAL_VIDEOS = [
  {
    name: "Muktesh Narula",
    role: "CEO",
    company: "DOVESOFT",
    content: "SmartyGrow built our entire operational automation stack. Their expertise in custom Next.js configurations and AI-driven workflow engines decreased lead response time to seconds and directly grew our sales pipeline.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Shriya Sadneni",
    role: "Co-Founder",
    company: "MURZBAN",
    content: "Working with Aashish and the team was an absolute game changer. The UI design matches our premium positioning perfectly, and the backend infrastructure handles thousands of active visitors seamlessly.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Yash Goswami",
    role: "Founder",
    company: "BITEBEE",
    content: "We launched our customized SaaS platform 3 weeks ahead of schedule. The code quality, communication, and visual assets designed by SmartyGrow exceed anything you can find from typical agencies.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Ajay Agarwal",
    role: "Co-Founder",
    company: "AVEENA",
    content: "The level of engineering and aesthetic execution they delivered is phenomenal. Their support automation resolved 70%+ of customer tickets instantly, freeing up massive hours for our operations teams.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop"
  }
];

export function TestimonialsCarousel() {
  const [selectedVideo, setSelectedVideo] = useState<typeof TESTIMONIAL_VIDEOS[0] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  React.useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

  return (
    <section className="py-10 sm:py-14 bg-white font-sans overflow-hidden relative">

      {/* Ticker Marquee */}
      <div className="w-full border-y border-slate-900 bg-slate-950 py-4 sm:py-5 overflow-hidden select-none mb-8 sm:mb-12 relative">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-ticker {
            display: flex;
            width: max-content;
            animation: marquee 30s linear infinite;
          }
        `}} />
        <div className="animate-ticker flex items-center gap-16 whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16 text-white font-bold text-sm sm:text-base tracking-wide">
              <span>Develop it Once</span><span>&bull;</span>
              <span>Develop it from Best</span><span>&bull;</span>
              <span>Design with Premium Standards</span><span>&bull;</span>
              <span>Scale with AI</span><span>&bull;</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200/60 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
              Client Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 mt-4 tracking-tighter leading-[1.1]">
              Happy Clients Testimonials
            </h2>
          </div>
          {/* Desktop arrows */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <button onClick={() => scroll("left")} className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-all cursor-pointer">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => scroll("right")} className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-all cursor-pointer">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {TESTIMONIAL_VIDEOS.map((video, idx) => (
            <motion.div
              key={video.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setSelectedVideo(video)}
              className="flex-none w-[72vw] sm:w-[240px] lg:w-[calc(25%-12px)] snap-start"
            >
              <div className="relative aspect-[9/14] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all group bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={video.image}
                  alt={video.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-slate-950/20" />
                <div className="absolute top-4 left-4 h-9 w-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-slate-900 transition-all duration-300">
                  <Play className="h-4 w-4 fill-current ml-0.5" />
                </div>
                <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80">
                  <Volume2 className="h-4 w-4" />
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h4 className="text-sm font-extrabold uppercase tracking-wider">{video.name}</h4>
                  <p className="text-xs font-bold text-white/70 uppercase tracking-widest mt-0.5">
                    {video.role} &bull; <span className="text-blue-400 font-extrabold">{video.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile arrows */}
        <div className="flex sm:hidden justify-center gap-3 mt-5">
          <button onClick={() => scroll("left")} className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => scroll("right")} className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* Quote modal */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full shadow-2xl relative border border-slate-100 p-8"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex flex-col gap-5">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="h-10 w-10 text-blue-500/20 fill-blue-500/10" />
                <blockquote className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed italic">
                  &ldquo;{selectedVideo.content}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedVideo.image} alt={selectedVideo.name} className="h-11 w-11 rounded-full object-cover border-2 border-white shadow-xs flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">{selectedVideo.name}</h4>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                      {selectedVideo.role} &bull; <span className="text-blue-600">{selectedVideo.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
