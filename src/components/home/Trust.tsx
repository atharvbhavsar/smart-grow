"use client";

import React from "react";

export function Trust() {
  const CLIENTS_ROW1 = [
    { name: "Lal Sweets", style: "font-serif tracking-tight" },
    { name: "KIRTILALS", style: "font-sans tracking-[0.2em] font-light" },
    { name: "Tradescribe", style: "font-sans tracking-tight font-extrabold" },
    { name: "MURZBAN", style: "font-serif tracking-[0.15em] font-medium" },
    { name: "greenfeels", style: "font-sans tracking-widest font-semibold" },
  ];

  const CLIENTS_ROW2 = [
    { name: "Momentz", style: "font-serif italic tracking-wide" },
    { name: "BITEBEE", style: "font-sans tracking-tighter font-black" },
    { name: "DOVESOFT", style: "font-sans tracking-[0.1em] font-bold" },
    { name: "AVEENA", style: "font-serif tracking-wider font-semibold" },
    { name: "SmartyGrow", style: "font-sans tracking-normal font-extrabold text-blue-600/70" },
  ];

  return (
    <section className="py-10 sm:py-14 bg-white border-y border-slate-100 bg-grid-pattern font-sans relative">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marquee-left 14s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 14s linear infinite;
        }
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="w-full">
        

        {/* Infinite Logo Marquees Container */}
        <div className="relative w-full overflow-hidden flex flex-col gap-6 sm:gap-8">
          {/* Left/Right fading gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          
          {/* Row 1: Left moving, BIG text */}
          <div className="animate-marquee-left gap-12 sm:gap-20 flex items-center">
            {[...CLIENTS_ROW1, ...CLIENTS_ROW1, ...CLIENTS_ROW1].map((client, idx) => (
              <div 
                key={`r1-${idx}`}
                className="flex items-center justify-center shrink-0 cursor-default transition-all duration-300 px-2"
              >
                <span className={`text-slate-800 text-2xl sm:text-3xl md:text-4xl select-none uppercase opacity-35 hover:opacity-95 hover:scale-105 transition-all ${client.style}`}>
                  {client.name}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2: Right moving, BIG text */}
          <div className="animate-marquee-right gap-12 sm:gap-20 flex items-center">
            {[...CLIENTS_ROW2, ...CLIENTS_ROW2, ...CLIENTS_ROW2].map((client, idx) => (
              <div 
                key={`r2-${idx}`}
                className="flex items-center justify-center shrink-0 cursor-default transition-all duration-300 px-2"
              >
                <span className={`text-slate-800 text-2xl sm:text-3xl md:text-4xl select-none uppercase opacity-35 hover:opacity-95 hover:scale-105 transition-all ${client.style}`}>
                  {client.name}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
