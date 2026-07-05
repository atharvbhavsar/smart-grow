"use client";

import React from "react";
import { usePathname } from "next/navigation";

export function MarqueeTicker() {
  const pathname = usePathname();

  // Hide ticker banner on the main home page ('/')
  if (pathname === "/") {
    return null;
  }

  return (
    <div className="w-full bg-slate-950 text-white py-3.5 my-8 sm:my-12 overflow-hidden relative border-y border-slate-900 shadow-sm z-30 font-sans">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes globalMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-global-marquee {
          display: flex;
          width: max-content;
          animation: globalMarquee 26s linear infinite;
        }
      `}} />
      <div className="animate-global-marquee flex items-center gap-10 whitespace-nowrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-10 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase">
            <span className="text-slate-100">Develop it Once</span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
            <span className="text-slate-100">Develop it from Best</span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
            <span className="text-slate-100">Design with Premium Standards</span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
            <span className="text-slate-100">Scale with Autonomous AI</span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
