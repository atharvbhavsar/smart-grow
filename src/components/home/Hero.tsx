"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center pt-28 sm:pt-36 pb-6 sm:pb-8 bg-white bg-grid-pattern overflow-hidden font-sans px-4">
      
      {/* Centered Founders / Team Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-[280px] sm:w-[380px] md:w-[440px] lg:w-[480px] aspect-[1.07] flex items-center justify-center z-10 mb-2 select-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/main-pic.png" 
          alt="SmartlyGrow Founders" 
          className="object-contain w-full h-full"
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
        with <span className="text-blue-600">SmartlyGrow</span>
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
        <Link href="/portfolio" className="w-full sm:w-auto">
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
 
      {/* Overlapping Trust Badge (Matching Reference Screenshot 1) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex items-center gap-3.5 mt-9 z-10 py-2 px-3 rounded-full select-none"
      >
        <div className="flex -space-x-3.5 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/trust-1.jpg" 
            alt="Client founder 1" 
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border-[2.5px] border-slate-950 object-cover shadow-sm bg-slate-900"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/trust-2.jpg" 
            alt="Client founder 2" 
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border-[2.5px] border-slate-950 object-cover shadow-sm bg-slate-900"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/trust-3.jpg" 
            alt="Client founder 3" 
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border-[2.5px] border-slate-950 object-cover shadow-sm bg-slate-900"
          />
        </div>
        <p className="text-base sm:text-lg font-medium text-slate-800 tracking-tight">
          Trusted by <span className="font-extrabold text-blue-600">100+</span> Businesses
        </p>
      </motion.div>

    </section>
  );
}
