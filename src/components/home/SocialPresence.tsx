"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const VIDEOS = [
  { id: 1, src: "/video/video1.mp4", label: "EP - 4", title: "Road to\n7 Figure Agency" },
  { id: 2, src: "/video/video2.mp4", label: "EP - 5", title: "Learning\nto Earning" },
  { id: 3, src: "/video/video3.mp4", label: "EP - 6", title: "learning\nto\nearning" },
  { id: 4, src: "/video/video4.mp4", label: "EP - 7", title: "Our Growth\nJourney" },
];

export function SocialPresence() {
  const [current, setCurrent] = useState(1); // start at EP-5 like reference
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
            Trusted by  Many People
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
              className="relative overflow-hidden shadow-2xl border border-slate-200 bg-slate-100"
              style={{ width: 200, height: 340, borderRadius: 24 }}
            >
              <video
                src={VIDEOS[current].src}
                className="w-full h-full object-cover"
                muted loop playsInline autoPlay
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
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
    </section>
  );
}
