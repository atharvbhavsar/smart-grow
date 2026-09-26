"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface LeadershipMember {
  name: string;
  role: string;
  slug: string;
  image: string;
}

const LEADERS: LeadershipMember[] = [
  {
    name: "Ashish Jumle",
    role: "Founder",
    slug: "aashish-jhumle",
    image: "/photo/founder.png",
  },
  {
    name: "Janhavi",
    role: "Co-Founder",
    slug: "janhavi",
    image: "/photo/janhavi-new.jpg",
  },
];

export function TeamGrid() {
  return (
    <section className="py-10 sm:py-16 bg-white font-sans border-t border-slate-100 relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-slate-500 shadow-xs mb-2.5">
            Our Team
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
            Team Behind Wonders
          </h2>
        </div>

        {/* Compact 2-Column Grid (Shows Both on Mobile & Desktop) */}
        <div className="grid grid-cols-2 max-w-xs sm:max-w-md md:max-w-lg mx-auto gap-3 sm:gap-6 mb-8 sm:mb-10">
          {LEADERS.map((leader) => (
            <Link
              key={leader.slug}
              href={`/team/${leader.slug}`}
              className="group block w-full"
            >
              <div className="relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 bg-white border border-slate-200/80 cursor-pointer">
                {/* Profile Photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Role Badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                    {leader.role}
                  </span>
                </div>

                {/* Bottom Floating Name Panel */}
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 bg-white/95 backdrop-blur-md px-2.5 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-md">
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-950 uppercase tracking-wide truncate group-hover:text-blue-600 transition-colors">
                    {leader.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mt-0.5">
                    {leader.role}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View Our Full Team CTA */}
        <div className="text-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-slate-950 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-slate-950/10 hover:shadow-blue-500/25 transition-all duration-300 group cursor-pointer"
          >
            <span>View Our Full Team</span>
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
