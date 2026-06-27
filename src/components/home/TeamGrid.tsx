"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TEAM = [
  { name: "Aashish Jhumle", role: "Founder", image: "/photo/founder.png" },
  { name: "Janhavi", role: "Co-Founder", image: "/photo/cofunder.jpeg" },
  { name: "Sajan Bhoyar", role: "App Lead", image: "/photo/app lead.png" },
  { name: "Atharv Bhavsar", role: "Web Lead", image: "/photo/website lead.jpeg" },
  { name: "Hemant Bhoyar", role: "AI Lead", image: "/photo/ai  lead.png" },
];

export function TeamGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  return (
    <section className="py-10 sm:py-14 bg-white font-sans border-t border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200/60 text-xs font-extrabold uppercase tracking-widest text-slate-500">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 mt-4 tracking-tighter leading-[1.1]">
              Team Behind Wonders
            </h2>
          </div>

          {/* Arrow buttons — desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-all cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-all cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="flex-none w-[72vw] sm:w-[260px] lg:w-[calc(20%-14px)] snap-start"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group bg-slate-100 border border-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                {/* Bottom name panel */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-100/50 shadow-sm">
                  <h4 className="text-sm font-extrabold text-slate-950 uppercase tracking-wide truncate">
                    {member.name}
                  </h4>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-0.5">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile arrow row */}
        <div className="flex sm:hidden justify-center gap-3 mt-5">
          <button
            onClick={() => scroll("left")}
            className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
