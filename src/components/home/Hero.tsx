"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const SERVICES = [
  "🚀 AI-Powered Business Growth",
  "🌐 Professional Website Design & App Development",
  "📱 Social Media Management & Growth",
  "🤖 AI Automation & Smart Business Solutions",
  "📈 SEO, Google Business Profile & Local Ranking",
  "🎥 Professional Video Editing & UGC Content",
  "🎨 Brand Identity & Creative Design",
  "⚡ Fast Delivery • Transparent Communication • Dedicated Support"
];

export function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const currentString = SERVICES[textIndex];

    // Finished typing the sentence: pause 2 seconds then start deleting
    if (!isDeleting && subIndex === currentString.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    // Finished deleting: move to next sentence
    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % SERVICES.length);
      return;
    }

    // Typing speed: 80ms, Delete speed: 40ms
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, textIndex, mounted]);

  // SSR fallback to prevent hydration mismatch and ensure layout stability
  const displayedText = mounted
    ? SERVICES[textIndex].substring(0, subIndex)
    : SERVICES[0];

  return (
    <section className="relative min-h-[85vh] sm:min-h-[88vh] flex flex-col justify-center items-center text-center pt-24 sm:pt-32 pb-12 bg-white bg-grid-pattern overflow-hidden font-sans px-4">
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `
      }} />

      {/* Top Ambient Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-100/70 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-blue-600 mb-6 shadow-2xs z-10"
      >
        <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
        AI-Powered Business Growth Company
      </motion.div>

      {/* Main Headline */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-[2.25rem] sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-slate-950 leading-[1.05] max-w-5xl select-none z-10 px-2 text-center"
      >
        Scale your Business <br />
        with <span className="text-blue-600">SmartlyGrow</span>
      </motion.h1>

      {/* Animated Typing Showcase Box */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 mb-2 min-h-[64px] sm:min-h-[76px] flex items-center justify-center z-10 w-full max-w-3xl px-2"
      >
        <div className="inline-flex items-center justify-center px-5 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-slate-950/[0.03] border border-slate-200/80 backdrop-blur-sm shadow-xs w-full max-w-2xl mx-auto transition-all duration-300">
          <motion.div
            key={textIndex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight text-center flex items-center justify-center"
          >
            <span>{displayedText}</span>
            <span className="inline-block w-[2.5px] sm:w-[3px] h-[1.15em] bg-blue-600 ml-1.5 align-middle animate-[blink_1s_infinite]" />
          </motion.div>
        </div>
      </motion.div>

      {/* CTA buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col xs:flex-row gap-3.5 mt-8 z-10 w-full max-w-xs sm:max-w-none sm:w-auto justify-center"
      >
        <Link href="/portfolio" className="w-full sm:w-auto">
          <Button className="bg-slate-950 text-white hover:bg-slate-900 w-full sm:w-auto px-8 py-6 rounded-full text-[13px] font-extrabold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer min-h-[48px]">
            Let&apos;s Explore
          </Button>
        </Link>
        <Link href="/contact" className="w-full sm:w-auto">
          <Button variant="outline" className="border-slate-200 bg-white hover:bg-slate-50 text-slate-800 w-full sm:w-auto px-8 py-6 rounded-full text-[13px] font-extrabold tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-xs min-h-[48px]">
            Contact Us
          </Button>
        </Link>
      </motion.div>

      {/* Overlapping Trust Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex items-center gap-3.5 mt-10 z-10 py-2 px-3 rounded-full select-none"
      >
        <div className="flex -space-x-3.5 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/trust-1.jpg" 
            alt="Client founder 1" 
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border-[2.5px] border-white object-cover shadow-md bg-slate-900"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/trust-2.jpg" 
            alt="Client founder 2" 
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border-[2.5px] border-white object-cover shadow-md bg-slate-900"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/trust-3.jpg" 
            alt="Client founder 3" 
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border-[2.5px] border-white object-cover shadow-md bg-slate-900"
          />
        </div>
        <p className="text-base sm:text-lg font-medium text-slate-800 tracking-tight">
          Trusted by <span className="font-extrabold text-blue-600">100+</span> Businesses
        </p>
      </motion.div>

    </section>
  );
}
