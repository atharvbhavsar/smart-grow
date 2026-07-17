"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const VIDEOS = [
  { id: 1, src: "/video/reel1.mp4", label: "EP - 4", title: "Road to\n7 Figure Agency", reelId: "Dap0janNhiT" },
  { id: 2, src: "/video/reel2.mp4", label: "EP - 5", title: "Learning\nto Earning", reelId: "Daxg-UhNFZ4" },
  { id: 3, src: "/video/reel1.mp4", label: "EP - 6", title: "learning\nto\nearning", reelId: "Dap0janNhiT" },
  { id: 4, src: "/video/reel2.mp4", label: "EP - 7", title: "Our Growth\nJourney", reelId: "Daxg-UhNFZ4" },
];

export function SocialPresence() {
  const [current, setCurrent] = useState(1); // start at EP-5 like reference
  const [activeReelId, setActiveReelId] = useState<string | null>(null);
  const total = VIDEOS.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const leftIdx  = (current - 1 + total) % total;
  const rightIdx = (current + 1) % total;

  return (
    <section className="pt-6 pb-14 bg-white overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Badge + Heading */}
        <div className="text-center mb-10">
          <span className="inline-block border border-slate-200 text-slate-500 text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5">
            Social Presence
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Trusted by Many People
          </h2>
        </div>

        {/* Fan Cards */}
        <div className="relative flex items-end justify-center" style={{ height: 380 }}>

          {/* Left card */}
          <motion.div
            key={`left-${current}`}
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            onClick={prev}
            className="absolute cursor-pointer z-10 hidden sm:block"
            style={{
              left: "50%",
              marginLeft: -230,
              bottom: 0,
              transform: "rotate(-8deg)",
              transformOrigin: "bottom center",
            }}
          >
            <div className="w-[140px] sm:w-[160px] h-[240px] sm:h-[270px] rounded-[20px] overflow-hidden shadow-lg border border-slate-100 bg-slate-100">
              <video
                src={VIDEOS[leftIdx].src}
                className="w-full h-full object-cover"
                muted loop playsInline autoPlay
              />
            </div>
          </motion.div>

          {/* Center card — featured */}
          <motion.div
            key={`center-${current}`}
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="relative z-20"
            style={{ bottom: 0, position: "relative" }}
          >
            <div
              onClick={() => setActiveReelId(VIDEOS[current].reelId)}
              className="relative overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 cursor-pointer group"
              style={{ width: 200, height: 340, borderRadius: 24 }}
            >
              <video
                src={VIDEOS[current].src}
                className="w-full h-full object-cover"
                muted loop playsInline autoPlay
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <div className="bg-white p-3.5 rounded-full text-slate-900 shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Play className="h-6 w-6 fill-slate-900 stroke-slate-900 ml-0.5" />
                </div>
                <span className="text-[11px] font-semibold text-white tracking-wider uppercase drop-shadow-md">
                  Watch Reel
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right card */}
          <motion.div
            key={`right-${current}`}
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.35 }}
            onClick={next}
            className="absolute cursor-pointer z-10 hidden sm:block"
            style={{
              left: "50%",
              marginLeft: 90,
              bottom: 0,
              transform: "rotate(8deg)",
              transformOrigin: "bottom center",
            }}
          >
            <div className="w-[140px] sm:w-[160px] h-[240px] sm:h-[270px] rounded-[20px] overflow-hidden shadow-lg border border-slate-100 bg-slate-100">
              <video
                src={VIDEOS[rightIdx].src}
                className="w-full h-full object-cover"
                muted loop playsInline autoPlay
              />
            </div>
          </motion.div>

        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-all cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {VIDEOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-200 cursor-pointer ${
                  i === current
                    ? "w-6 h-2.5 bg-slate-800"
                    : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-all cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* Premium Video Modal */}
      <AnimatePresence>
        {activeReelId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveReelId(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[360px] max-h-[90vh] bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveReelId(null)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/15"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Instagram Reel Iframe Container */}
              <div className="w-full aspect-[9/16] bg-black flex items-center justify-center overflow-hidden">
                <iframe
                  src={`https://www.instagram.com/reel/${activeReelId}/embed/`}
                  className="w-full h-full border-0"
                  allowFullScreen
                  scrolling="no"
                  allow="encrypted-media"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
