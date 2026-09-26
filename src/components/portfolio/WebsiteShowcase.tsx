"use client";

import React from "react";
import { Globe, ArrowUpRight } from "lucide-react";

interface CompactWebsiteProject {
  id: string;
  name: string;
  image: string;
  liveUrl: string;
}

const WEBSITES: CompactWebsiteProject[] = [
  {
    id: "ideal-property",
    name: "Ideal Property",
    image: "/ideal-property.png",
    liveUrl: "https://www.idealproperty.in/",
  },
  {
    id: "aniket-tours-and-travels",
    name: "Aniket Tours & Travels",
    image: "/aniket-tours.png",
    liveUrl: "https://www.anikettoursandtravels.in/",
  },
  {
    id: "shree-ganesha-enterprises",
    name: "Shree Ganesha Enterprises",
    image: "/shree-ganesha.png",
    liveUrl: "https://shree-ganesha-enterprises.vercel.app/",
  },
];

export function WebsiteShowcase() {
  return (
    <section className="py-10 sm:py-14 bg-white font-sans w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-5 border-b border-slate-100 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Website Projects
            </h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            Live client web applications and high-conversion portals engineered by SmartlyGrow.
          </p>
        </div>

        {/* 3 Compact Cards Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {WEBSITES.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Website Preview / Screenshot */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-[16/10] w-full bg-slate-950 overflow-hidden cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={`${project.name} Website Preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Browser-like minimal top pill */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-900 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs border border-black/5">
                      Website
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-white text-slate-950 text-xs font-extrabold shadow-md flex items-center gap-1">
                      Visit Site <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </a>

                {/* Card Title & Label */}
                <div className="p-4 sm:p-5">
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                    Website
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h3>
                </div>
              </div>

              {/* View Website CTA Link */}
              <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 mt-1">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-blue-600 text-white text-xs font-extrabold tracking-wide transition-colors shadow-xs"
                >
                  View Website <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
