"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center pt-28 sm:pt-36 pb-16 sm:pb-20 bg-white bg-grid-pattern overflow-hidden font-sans px-4">
      
      {/* Centered Founders / Team Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-[320px] sm:w-[440px] md:w-[520px] lg:w-[600px] aspect-[4/3] flex items-center justify-center z-10 mb-2 select-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/main-pic.png" 
          alt="SmartyGrow Founders" 
          className="object-contain w-full h-full max-h-[320px] sm:max-h-[440px]"
        />
      </motion.div>

      {/* Main Headline */}
      <motion.h1 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-[2.15rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-slate-950 leading-[1.08] max-w-4xl select-none z-10 px-2"
      >
        Scale your Business <br />
        with <span className="text-blue-600">SmartyGrow</span>
      </motion.h1>

      {/* Subtext description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-slate-400 text-[10px] sm:text-sm tracking-[0.18em] font-extrabold mt-4 max-w-xs sm:max-w-md px-4 leading-relaxed z-10 uppercase text-center"
      >
        AI-Powered Business Growth Agency
      </motion.p>
 
      {/* CTA buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col xs:flex-row gap-3 mt-8 z-10 w-full max-w-xs sm:max-w-none sm:w-auto justify-center"
      >
        <Link href="/services" className="w-full sm:w-auto">
          <Button className="bg-slate-950 text-white hover:bg-slate-900 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-6 rounded-full text-[13px] font-bold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer min-h-[44px]">
            Let&apos;s Explore
          </Button>
        </Link>
        <Link href="/contact" className="w-full sm:w-auto">
          <Button variant="outline" className="border-slate-200 bg-white hover:bg-slate-50 text-slate-800 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-6 rounded-full text-[13px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-2xs min-h-[44px]">
            Contact Us
          </Button>
        </Link>
      </motion.div>
 
      {/* Overlapping Small Trust Badge */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex items-center gap-2.5 mt-8 z-10 bg-slate-50/80 border border-slate-100/60 p-2 pr-4 rounded-full shadow-2xs"
      >
        <div className="flex -space-x-2 pl-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop" 
            alt="Indian startup founder" 
            className="h-7 w-7 rounded-full border-2 border-white object-cover shadow-2xs"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop" 
            alt="Indian tech founder" 
            className="h-7 w-7 rounded-full border-2 border-white object-cover shadow-2xs"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=120&auto=format&fit=crop" 
            alt="Indian business lead" 
            className="h-7 w-7 rounded-full border-2 border-white object-cover shadow-2xs"
          />
        </div>
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
          Trusted by <span className="text-blue-600">100+</span> Businesses
        </p>
      </motion.div>

    </section>
  );
}
