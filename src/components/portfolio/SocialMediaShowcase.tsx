"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Instagram, ZoomIn, X, Film, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SocialMediaClient {
  id: string;
  name: string;
  handle: string;
  category: string;
  profileImage: string;
  reelsImage: string;
  instagramUrl: string;
}

const SOCIAL_CLIENTS: SocialMediaClient[] = [
  {
    id: "ideal-property",
    name: "Ideal Property",
    handle: "@idealproperty_homes",
    category: "Real Estate Growth",
    profileImage: "/social/ideal-property-profile.png",
    reelsImage: "/social/ideal-property-reels.png",
    instagramUrl: "https://www.instagram.com/idealproperty_homes?stkn=MTdqYmxpZThueTZobA%3D%3D&utm_source=qr",
  },
  {
    id: "lc-fitness-club",
    name: "LC Fitness Club",
    handle: "@lc_fitness_club_pune",
    category: "Fitness & High-Energy Reels",
    profileImage: "/social/lc-fitness-profile.png",
    reelsImage: "/social/lc-fitness-reels.png",
    instagramUrl: "https://www.instagram.com/lc_fitness_club_pune?stkn=N3EwdXM4YjdmbDVr&utm_source=qr",
  },
  {
    id: "acharya-gurukulam",
    name: "Acharya Gurukulam",
    handle: "@acharya_gurukulam_official",
    category: "Campus & Cultural Reels",
    profileImage: "/social/acharya-profile.png",
    reelsImage: "/social/acharya-reels.png",
    instagramUrl: "https://www.instagram.com/acharya_gurukulam_official?stkn=MTI0ODNjMHJua3F5aA%3D%3D",
  },
  {
    id: "umed-care-center",
    name: "Umed Care Center",
    handle: "@umedcarecenter_pune",
    category: "Healthcare & Doctor Feeds",
    profileImage: "/social/umed-profile.png",
    reelsImage: "/social/umed-reels.png",
    instagramUrl: "https://www.instagram.com/umedcarecenter_pune?stkn=a2Z0Y3lydnNnbmdr",
  },
];

export function SocialMediaShowcase() {
  const [selectedClient, setSelectedClient] = useState<SocialMediaClient | null>(null);

  useEffect(() => {
    if (!selectedClient) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedClient(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedClient]);

  return (
    <section className="py-10 sm:py-14 bg-white font-sans w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-5 border-b border-slate-100 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Social Media Management & Growth
            </h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            Verified Instagram profile growth and active client brand management.
          </p>
        </div>

        {/* Compact 4-Column Cards Grid with Light Grid Background */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
          {SOCIAL_CLIENTS.map((client) => (
            <div
              key={client.id}
              className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-pink-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Light Grid Display Container (Click to Expand in High-Res Modal) */}
                <div
                  onClick={() => setSelectedClient(client)}
                  className="block relative h-[250px] sm:h-[270px] w-full bg-slate-50 bg-grid-pattern border-b border-slate-100 overflow-hidden cursor-pointer p-3 sm:p-4"
                >
                  {/* Dual Phone Screens Side-by-Side */}
                  <div className="relative w-full h-full flex items-center justify-center gap-2.5 z-10">
                    {/* Left: Profile Screen */}
                    <div className="relative h-full flex-1 max-w-[115px] flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={client.profileImage}
                        alt={`${client.name} Profile`}
                        className="max-h-full max-w-full object-contain rounded-lg shadow-md border border-slate-200/80 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Right: Video Reels Feed Screen */}
                    <div className="relative h-full flex-1 max-w-[115px] flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={client.reelsImage}
                        alt={`${client.name} Video Reels`}
                        className="max-h-full max-w-full object-contain rounded-lg shadow-md border border-slate-200/80 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Hover Overlay Hint to Expand */}
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                    <span className="px-3.5 py-1.5 rounded-full bg-white text-slate-950 text-[11px] font-extrabold shadow-md flex items-center gap-1">
                      <ZoomIn className="h-3.5 w-3.5 text-pink-600" /> Click to Expand
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 sm:p-5">
                  <div className="text-[10px] font-bold text-pink-600 uppercase tracking-wider mb-1">
                    {client.category}
                  </div>
                  <h3
                    onClick={() => setSelectedClient(client)}
                    className="text-base sm:text-lg font-extrabold text-slate-950 group-hover:text-pink-600 transition-colors line-clamp-1 cursor-pointer"
                  >
                    {client.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    {client.handle}
                  </p>
                </div>
              </div>

              {/* View Instagram Profile CTA */}
              <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 mt-1">
                <a
                  href={client.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-amber-600 text-white text-xs font-extrabold tracking-wide transition-all shadow-xs"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  <span>View Instagram</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* High-Resolution Expanded Photo Modal */}
      <AnimatePresence>
        {selectedClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md">
            {/* Backdrop click to close */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setSelectedClient(null)}
            />

            {/* Top Close Button & Live Instagram Link */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2.5">
              <a
                href={selectedClient.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-slate-950 text-xs font-bold shadow-lg hover:bg-slate-100 transition-all cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <Instagram className="h-3.5 w-3.5 text-pink-600" />
                <span>Visit Instagram</span>
                <ArrowUpRight className="h-3 w-3 text-slate-400" />
              </a>

              <button
                onClick={() => setSelectedClient(null)}
                className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-md border border-white/20 shadow-lg cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Dual Phone Screens High-Res Display (No intrusive background, clean display) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative z-40 max-w-4xl w-full max-h-[88vh] flex items-center justify-center p-2 sm:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center gap-3 sm:gap-8 max-h-[82vh] w-full">
                {/* Left: Full Profile Screen */}
                <div className="relative flex-1 max-w-[320px] max-h-[80vh] flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedClient.profileImage}
                    alt={`${selectedClient.name} Profile Screen`}
                    className="max-h-[80vh] max-w-full object-contain rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20"
                  />
                </div>

                {/* Right: Full Video Reels Feed Screen */}
                <div className="relative flex-1 max-w-[320px] max-h-[80vh] flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedClient.reelsImage}
                    alt={`${selectedClient.name} Video Reels Feed`}
                    className="max-h-[80vh] max-w-full object-contain rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
