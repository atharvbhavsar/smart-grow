"use client";

import React, { useState } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DarkVideoBanner() {
  const [isOpen, setIsOpen] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <section className="w-full bg-slate-950 py-12 sm:py-16 text-center px-4 relative overflow-hidden font-sans border-y border-slate-900">
      
      {/* Background Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-3xl -z-10" />

      {/* Grid Pattern inside dark section */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none -z-15" />

      <div className="mx-auto max-w-5xl">
        
        {/* Tag & Title */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
          Video Tour
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tighter leading-[1.1] max-w-2xl mx-auto">
          Streamline Business with our Flexible options
        </h2>

        {/* Video Mockup Container */}
        <div 
          onClick={() => setIsOpen(true)}
          className="relative rounded-3xl border border-white/10 shadow-2xl max-w-4xl mx-auto mt-6 sm:mt-8 aspect-video bg-slate-900 overflow-hidden cursor-pointer group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" 
            alt="SmartyGrow Operations Dashboard" 
            className="w-full h-full object-cover opacity-60 group-hover:scale-102 transition-transform duration-500"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-300" />

          {/* Centered Play Button with pulse effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Outer pulse rings */}
              <div className="absolute inset-0 rounded-full bg-white/20 scale-125 animate-ping opacity-75" />
              <div className="absolute inset-0 rounded-full bg-white/10 scale-150 animate-pulse" />
              
              {/* Main Play Circle */}
              <div className="relative h-16 w-16 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Play className="h-6 w-6 fill-current ml-1" />
              </div>
            </div>
          </div>

          {/* Bottom Bar Info overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white/60 text-[10px] font-extrabold uppercase tracking-widest">
            <span>Next.js Custom SaaS Systems</span>
            <span>3-Min Product Tour</span>
          </div>

        </div>

      </div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition-colors cursor-pointer z-10"
              >
                <X className="h-5 w-5" />
              </button>

              {/* YouTube Embed Player */}
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="SmartyGrow Product Video Tour"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
