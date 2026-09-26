"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, ZoomIn, X, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PerformanceMarketingShowcase() {
  const [activeLightbox, setActiveLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!activeLightbox) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveLightbox(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeLightbox]);

  return (
    <section className="py-12 sm:py-16 bg-white font-sans w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-slate-100 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
              Performance Marketing
            </h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-md">
            Data-backed customer acquisition campaigns built to reach the right audience, generate quality leads, and maximize ROI.
          </p>
        </div>

        {/* Card 1: Dual Screenshots Side-by-Side */}
        <div className="bg-slate-50/70 rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Dual Screenshots Side-by-Side in ONE Unified Frame */}
            <div className="lg:col-span-7">
              <div
                onClick={() => setActiveLightbox("dual")}
                className="group relative h-[420px] sm:h-[520px] lg:h-[560px] w-full rounded-2xl overflow-hidden bg-slate-100/90 bg-grid-pattern border border-slate-200 shadow-sm cursor-pointer p-4 sm:p-6 flex items-center justify-center"
              >
                {/* Top Pill Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-950 text-[11px] font-extrabold uppercase tracking-wider border border-black/5 shadow-xs flex items-center gap-1.5">
                    <TrendingUp className="h-3 w-3 text-emerald-600" />
                    Meta Ads Campaign Reports
                  </span>
                </div>

                {/* 2 Photos Side-by-Side in ONE Container */}
                <div className="relative w-full h-full flex items-center justify-center gap-3 sm:gap-5 z-10">
                  {/* Photo 1 (First) */}
                  <div className="relative h-full flex-1 flex items-center justify-center max-w-[48%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/performance/performance-report-1.png"
                      alt="Meta Ads Campaign Report 01"
                      className="max-h-full max-w-full object-contain rounded-xl shadow-md border border-slate-200/80 group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>

                  {/* Photo 2 (Second) */}
                  <div className="relative h-full flex-1 flex items-center justify-center max-w-[48%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/performance/performance-report-2.png"
                      alt="Meta Ads Campaign Report 02"
                      className="max-h-full max-w-full object-contain rounded-xl shadow-md border border-slate-200/80 group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Hover Overlay Hint */}
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-950 text-xs font-extrabold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="h-4 w-4 text-emerald-600" /> Click to Expand Reports
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Copy & Strategy Context */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Category Eyebrow */}
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 inline-block mb-3">
                  PERFORMANCE MARKETING
                </span>
                
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  Turn Ad Spend Into Predictable Growth
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
                  Strategic paid campaigns built across Meta Ads Manager to reach the right audience, generate qualified leads, and maximize marketing ROI through systematic testing.
                </p>
              </div>

              {/* Pill Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["Lead Generation", "Meta Ads", "Campaign Optimization", "High ROAS Targeting"].map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Strategic Execution Highlights */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Execution Highlights:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-950 font-bold">Reach the Right Customers</strong> — Target people based on location, verified interests, behaviour, and demographics.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-950 font-bold">Generate More Leads & Enquiries</strong> — Drive qualified customers to your WhatsApp, calls, forms, or website.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-950 font-bold">Grow Faster Than Organic Reach Alone</strong> — Put your offers in front of thousands of potential customers without waiting months to build reach.
                    </span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>

        {/* Card 2 (Down Below): Campaign Analytics & Tracking Report */}
        <div className="mt-8 sm:mt-10 bg-slate-50/70 rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Copy & Strategy Context */}
            <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 inline-block mb-3">
                  CAMPAIGN AUDIT & OPTIMIZATION
                </span>
                
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  Targeted Audience & Lead Tracking
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
                  Comprehensive performance analytics tracking impressions, CTR, conversion costs, and qualified inquiry pipelines to continuously refine ad spend efficiency.
                </p>
              </div>

              {/* Pill Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["Conversion Tracking", "Budget Scaling", "Funnel Analytics", "High Intent Leads"].map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Strategic Execution Highlights */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Capabilities:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-950 font-bold">Continuous Cost Optimization</strong> — Ongoing A/B testing on ad copies and audience segments to minimize acquisition costs.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-950 font-bold">End-to-End Pipeline Visibility</strong> — Real-time tracking from initial ad impression to qualified customer conversion.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Screenshot Display */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div
                onClick={() => setActiveLightbox("/performance/performance-report-3.png")}
                className="group relative h-[380px] sm:h-[480px] lg:h-[520px] w-full rounded-2xl overflow-hidden bg-slate-100/90 bg-grid-pattern border border-slate-200 shadow-sm cursor-pointer p-4 sm:p-6 flex items-center justify-center"
              >
                {/* Top Pill Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-950 text-[11px] font-extrabold uppercase tracking-wider border border-black/5 shadow-xs flex items-center gap-1.5">
                    <TrendingUp className="h-3 w-3 text-emerald-600" />
                    Analytics & Lead Tracking Report
                  </span>
                </div>

                {/* Screenshot Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/performance/performance-report-3.png"
                  alt="Targeted Audience and Lead Tracking Report"
                  className="max-h-full max-w-full object-contain rounded-xl shadow-md border border-slate-200/80 group-hover:scale-[1.02] transition-transform duration-300"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-950 text-xs font-extrabold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="h-4 w-4 text-emerald-600" /> Click to Expand Report
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
            {/* Backdrop click to close */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setActiveLightbox(null)}
            />

            {/* Top Close Button */}
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all backdrop-blur-md border border-white/20 shadow-lg cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative z-40 max-w-5xl w-full max-h-[90vh] flex items-center justify-center p-2 sm:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {activeLightbox === "dual" ? (
                <div className="flex items-center justify-center gap-3 sm:gap-6 max-h-[85vh] w-full">
                  <div className="relative flex-1 max-w-[450px] max-h-[82vh] flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/performance/performance-report-1.png"
                      alt="Expanded Meta Ads Report 01"
                      className="max-h-[82vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/15"
                    />
                  </div>
                  <div className="relative flex-1 max-w-[450px] max-h-[82vh] flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/performance/performance-report-2.png"
                      alt="Expanded Meta Ads Report 02"
                      className="max-h-[82vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/15"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative max-w-4xl max-h-[85vh] flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeLightbox}
                    alt="Expanded Performance Marketing Report"
                    className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/15"
                  />
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
