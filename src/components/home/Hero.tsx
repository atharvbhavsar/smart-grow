"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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

const TYPING_SPEED = 45;   // Industry-standard smooth typing speed (45ms/char)
const PAUSE_AFTER  = 2000;  // Industry-standard reading pause (2.0s)

function TypingShowcase() {
  const [textIndex, setTextIndex] = useState(0);
  const [subIndex, setSubIndex]   = useState(0);
  const [mounted, setMounted]     = useState(false);
  const timeoutRef                = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fullText = SERVICES[textIndex].prefix + SERVICES[textIndex].highlight + SERVICES[textIndex].suffix;

    if (subIndex < fullText.length) {
      timeoutRef.current = setTimeout(() => setSubIndex(s => s + 1), TYPING_SPEED);
    } else {
      timeoutRef.current = setTimeout(() => {
        setSubIndex(0);
        setTextIndex(i => (i + 1) % SERVICES.length);
      }, PAUSE_AFTER);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
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
    <div
      className="typing-container typing-box relative flex items-center justify-center gap-3 sm:gap-4 px-4 sm:px-8 py-4 sm:py-6 rounded-[20px] transition-all duration-300"
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
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex items-center gap-3 sm:gap-4 w-full min-w-0"
        >
          {/* Icon */}
          <div className={`shrink-0 ${currentService.iconColor} flex items-center justify-center`}>
            <Icon size={24} strokeWidth={2.2} className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          {/* Typed Text */}
          <div
            className="flex-1 min-w-0 text-left text-[clamp(1.15rem,3.4vw,2.15rem)] font-bold tracking-tight leading-[1.22] sm:leading-[1.25] text-slate-900"
            style={{
              fontWeight: 800,
              overflowWrap: "break-word",
              wordBreak: "normal",
            }}
          >
            <span className="text-slate-700">{renderedPrefix}</span>
            <span className="text-blue-600">{renderedHighlight}</span>
            <span className="text-slate-700">{renderedSuffix}</span>
            <span className="hero-cursor inline-block w-[2.5px] sm:w-[3px] h-[0.9em] bg-blue-500 ml-[3px] align-middle rounded-full shrink-0" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] flex flex-col justify-center items-center text-center pt-24 sm:pt-32 pb-12 bg-transparent overflow-hidden font-sans px-4 sm:px-5 lg:px-6 w-full max-w-full box-border">

      {/* Contained Background Grid */}
      <div
        className="absolute inset-0 w-full max-w-full bg-grid-pattern pointer-events-none"
        style={{ position: "absolute", inset: 0, width: "100%", maxWidth: "100%", pointerEvents: "none" }}
      />

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
        .typing-box {
          width: calc(100vw - 32px);
          max-width: 900px;
          min-height: 120px;
          margin-left: auto;
          margin-right: auto;
          box-sizing: border-box;
          overflow-wrap: break-word;
          word-break: normal;
        }
        @media (min-width: 640px) {
          .typing-box {
            width: calc(100vw - 40px);
            min-height: 140px;
          }
        }
        @media (min-width: 1024px) {
          .typing-box {
            width: min(900px, calc(100vw - 48px));
            max-width: 900px;
            min-height: 170px;
          }
        }
      ` }} />

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="text-[clamp(1.85rem,6vw,4.5rem)] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-slate-950 leading-[1.08] max-w-5xl select-none z-10 px-2 text-center break-words"
      >
        Scale your Business <br />
        with <span className="text-blue-600">SmartlyGrow</span>
      </motion.h1>

      {/* ─── Premium Animated Showcase Container ─── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.18 }}
        className="mt-8 mb-4 z-10 w-full flex items-center justify-center"
      >
        <TypingShowcase />
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-3.5 mt-7 z-10 w-full max-w-full justify-center items-center px-4"
      >
        <Link href="/portfolio" className="w-[min(100%,240px)] sm:w-auto">
          <Button className="bg-slate-950 text-white hover:bg-slate-900 w-full sm:w-auto px-8 py-6 rounded-full text-[13px] font-extrabold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer min-h-[48px]">
            Let&apos;s Explore
          </Button>
        </Link>
        <Link href="/contact" className="w-[min(100%,240px)] sm:w-auto">
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
          <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full border-[2.5px] border-white shadow-md bg-slate-900 overflow-hidden shrink-0">
            <Image
              src="/trust-1.png"
              alt="Client 1"
              width={48}
              height={48}
              quality={95}
              priority
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full border-[2.5px] border-white shadow-md bg-slate-900 overflow-hidden shrink-0">
            <Image
              src="/trust-2.png"
              alt="Client 2"
              width={48}
              height={48}
              quality={95}
              priority
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full border-[2.5px] border-white shadow-md bg-slate-900 overflow-hidden shrink-0">
            <Image
              src="/trust-3.png"
              alt="Client 3"
              width={48}
              height={48}
              quality={95}
              priority
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <p className="text-base sm:text-lg font-medium text-slate-800 tracking-tight">
          Trusted by <span className="font-extrabold text-blue-600">20+</span> Businesses
        </p>
      </motion.div>

    </section>
  );
}
