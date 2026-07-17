"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Globe,
  Smartphone,
  Bot,
  TrendingUp,
  Film,
  Palette,
  Sparkles,
} from "lucide-react";

const SERVICES = [
  { icon: Rocket,     prefix: "",                    highlight: "AI-Powered",       suffix: " Business Growth Startup", iconColor: "text-blue-600" },
  { icon: Globe,      prefix: "Professional ",       highlight: "Website",          suffix: " & App Development",       iconColor: "text-indigo-500" },
  { icon: Smartphone, prefix: "Social Media ",        highlight: "Growth",           suffix: " & Management",            iconColor: "text-violet-500" },
  { icon: Palette,    prefix: "",                    highlight: "Brand Identity",   suffix: " & Creative Design",       iconColor: "text-amber-500" },
  { icon: Film,       prefix: "Professional ",       highlight: "Video Editing",    suffix: " & UGC Content",           iconColor: "text-rose-500" },
  { icon: Sparkles,   prefix: "Fast Delivery. ",     highlight: "Premium Results.", suffix: "",                         iconColor: "text-blue-600" },
];

const TYPING_SPEED = 3;   // Hyper-fast character typing (3ms)
const PAUSE_AFTER  = 650;  // Pause duration before sliding to next (650ms)

export function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [subIndex, setSubIndex]   = useState(0);
  const [mounted, setMounted]     = useState(false);
  const timeoutRef                = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fullText = SERVICES[textIndex].prefix + SERVICES[textIndex].highlight + SERVICES[textIndex].suffix;

    if (subIndex < fullText.length) {
      timeoutRef.current = setTimeout(() => setSubIndex(s => s + 1), TYPING_SPEED);
    } else {
      // Once fully typed, pause briefly then directly switch to next text via smooth slide
      timeoutRef.current = setTimeout(() => {
        setSubIndex(0);
        setTextIndex(i => (i + 1) % SERVICES.length);
      }, PAUSE_AFTER);
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [mounted, subIndex, textIndex]);

  const currentService = SERVICES[textIndex];
  const fullText       = currentService.prefix + currentService.highlight + currentService.suffix;
  const displayedText  = mounted ? fullText.substring(0, subIndex) : fullText;

  const prefixLen    = currentService.prefix.length;
  const highlightLen = currentService.highlight.length;

  const renderedPrefix    = displayedText.substring(0, Math.min(subIndex, prefixLen));
  const renderedHighlight = displayedText.substring(prefixLen, Math.min(subIndex, prefixLen + highlightLen));
  const renderedSuffix    = displayedText.substring(prefixLen + highlightLen);

  const Icon = currentService.icon;

  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] flex flex-col justify-center items-center text-center pt-24 sm:pt-32 pb-12 bg-white bg-grid-pattern overflow-hidden font-sans px-4">

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cursor-blink {
          0%, 45% { opacity: 1; }
          55%, 100% { opacity: 0; }
        }
        .hero-cursor {
          animation: cursor-blink 0.85s ease-in-out infinite;
        }
        @keyframes container-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
          50% { box-shadow: 0 0 18px 4px rgba(59,130,246,0.09); }
        }
        .typing-container {
          animation: container-glow 3s ease-in-out infinite;
        }
      ` }} />

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="text-[2.15rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-slate-950 leading-[1.06] max-w-5xl select-none z-10 px-2 text-center"
      >
        Scale your Business <br />
        with <span className="text-blue-600">SmartlyGrow</span>
      </motion.h1>

      {/* ─── Premium Animated Showcase Container ─── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.18 }}
        className="mt-8 mb-4 z-10 w-full max-w-2xl px-2 min-h-[84px] sm:min-h-[96px] flex items-center justify-center"
      >
        <div
          className="typing-container relative flex items-center gap-3 sm:gap-4 px-5 sm:px-8 py-4 sm:py-6 rounded-[20px] w-full mx-auto transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1.5px solid rgba(148,163,184,0.28)",
            boxShadow: "0 4px 32px rgba(15,23,42,0.06), 0 1px 4px rgba(15,23,42,0.04)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={textIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.14 }}
              className="flex items-center gap-3 sm:gap-4 w-full"
            >
              {/* Icon */}
              <div className={`shrink-0 ${currentService.iconColor}`}>
                <Icon size={24} strokeWidth={2.2} className="sm:w-7 sm:h-7" />
              </div>

              {/* Typed Text */}
              <div
                className="flex-1 text-left text-[1.3rem] sm:text-[1.75rem] md:text-[2.15rem] font-bold tracking-[-0.01em] leading-[1.2] text-slate-900"
                style={{ fontWeight: 800 }}
              >
                <span className="text-slate-700">{renderedPrefix}</span>
                <span className="text-blue-600">{renderedHighlight}</span>
                <span className="text-slate-700">{renderedSuffix}</span>
                <span className="hero-cursor inline-block w-[2.5px] sm:w-[3px] h-[0.9em] bg-blue-500 ml-[3px] align-middle rounded-full" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.3 }}
        className="flex flex-col xs:flex-row gap-3.5 mt-7 z-10 w-full max-w-xs sm:max-w-none sm:w-auto justify-center"
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

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.42 }}
        className="flex items-center gap-3.5 mt-10 z-10 py-2 px-3 rounded-full select-none"
      >
        <div className="flex -space-x-3.5 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/trust-1.jpg" alt="Client 1" className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border-[2.5px] border-white object-cover shadow-md bg-slate-900" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/trust-2.jpg" alt="Client 2" className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border-[2.5px] border-white object-cover shadow-md bg-slate-900" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/trust-3.jpg" alt="Client 3" className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border-[2.5px] border-white object-cover shadow-md bg-slate-900" />
        </div>
        <p className="text-base sm:text-lg font-medium text-slate-800 tracking-tight">
          Trusted by <span className="font-extrabold text-blue-600">20+</span> Businesses
        </p>
      </motion.div>

    </section>
  );
}
