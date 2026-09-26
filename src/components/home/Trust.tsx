
"use client";

import React from "react";

export function Trust() {
  const CLIENTS_ROW1 = [
    { name: "Ideal Property", style: "font-sans tracking-tight font-extrabold" },
    { name: "LC Fitness Club", style: "font-sans tracking-wider font-black text-blue-600/80" },
    { name: "Umed Care Center", style: "font-serif tracking-normal font-bold" },
    { name: "Acharya Gurukulam", style: "font-serif italic tracking-wide font-semibold" },
    { name: "ONE CARD", style: "font-sans tracking-[0.18em] font-light" },
    { name: "Blue Tokai", style: "font-sans tracking-widest font-bold" },
    { name: "Smilekraft Clinic", style: "font-sans tracking-normal font-medium" },
    { name: "XpressBees", style: "font-sans italic tracking-tighter font-extrabold" },
  ];

  const CLIENTS_ROW2 = [
    { name: "ONE CARD", style: "font-sans tracking-[0.2em] font-medium text-blue-600/70" },
    { name: "Ideal Property", style: "font-sans tracking-tight font-extrabold" },
    { name: "LC Fitness Club", style: "font-sans tracking-wide font-black" },
    { name: "Acharya Gurukulam", style: "font-serif italic tracking-wider font-bold" },
    { name: "Umed Care Center", style: "font-serif tracking-normal font-semibold" },
    { name: "VSPM Dental", style: "font-sans tracking-normal font-bold" },
    { name: "Talentica", style: "font-sans tracking-[0.2em] font-light" },
    { name: "Third Wave Coffee", style: "font-sans tracking-wider font-extrabold" },
  ];

  return (
    <section className="pt-4 sm:pt-6 pb-12 sm:pb-16 bg-transparent border-y border-slate-100 font-sans relative overflow-hidden w-full max-w-full">
      <style dangerouslySetInnerHTML={{
        __html: `
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
          animation: marquee-left 50s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 50s linear infinite;
        }
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="w-full">
        {/* Section Title */}
        <div className="text-center mb-10 max-w-3xl mx-auto px-4">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50/60 inline-block px-3 py-1 rounded-full mb-3">
            Our Client Network
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            Trusted by Prominent Brands in Pune, Nagpur & across India
          </h2>
        </div>


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
