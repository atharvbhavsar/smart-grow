"use client";

import React, { useState, useEffect } from "react";
import { WebsiteProject } from "@/data/portfolioData";
import { X, ExternalLink, CheckCircle2, Sparkles, TrendingUp, Laptop, Smartphone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface WebsiteDetailModalProps {
  project: WebsiteProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export function WebsiteDetailModal({
  project,
  isOpen,
  onClose,
}: WebsiteDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const currentScreenshot = project.screenshots[activeImageIndex] || {
    url: project.coverImage,
    caption: project.name,
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-xl overflow-y-auto">
        {/* Backdrop */}
        <div className="fixed inset-0 cursor-pointer" onClick={onClose} />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative z-50 w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100/50">
                {project.category}
              </span>
              <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
                {project.client} · {project.year}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
                >
                  Visit Live Website <ExternalLink className="h-3 w-3" />
                </a>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-slate-200/80 text-slate-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-8">
            
            {/* Title & Tagline */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                {project.name}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Main Visual Display (Device Frame / Screenshot Focus) */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-md">
                {/* Browser top-bar aesthetic */}
                <div className="h-8 bg-slate-900 px-4 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono tracking-tight truncate max-w-xs">
                    {project.liveUrl || `https://${project.slug}.com`}
                  </div>
                  <div className="w-8" />
                </div>

                {/* Screenshot */}
                <div className="relative min-h-[260px] sm:min-h-[420px] max-h-[500px] flex items-center justify-center bg-slate-900/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentScreenshot.url}
                    alt={currentScreenshot.caption || project.name}
                    className="w-full h-full object-cover max-h-[500px]"
                  />
                </div>

                {/* Caption Bar */}
                <div className="p-3 bg-slate-900/90 text-slate-300 text-xs font-medium border-t border-white/5 flex items-center justify-between">
                  <span>{currentScreenshot.caption}</span>
                  <span className="text-[11px] text-slate-400 font-bold">
                    {activeImageIndex + 1} of {project.screenshots.length}
                  </span>
                </div>
              </div>

              {/* Screenshot Thumbnails (Click to switch main view) */}
              {project.screenshots.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
                  {project.screenshots.map((s, idx) => {
                    const active = activeImageIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative rounded-xl overflow-hidden h-16 w-24 sm:h-20 sm:w-32 shrink-0 border-2 transition-all cursor-pointer ${
                          active ? "border-blue-600 scale-105 shadow-md" : "border-slate-200 opacity-60 hover:opacity-100"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={s.url}
                          alt={s.caption}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Metrics Grid (if present) */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-1"
                  >
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {m.label}
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
                      {m.value}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {m.sublabel}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Project Overview & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600" /> Project Brief & Architecture
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Engineered Features:
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Deliverables & Solutions:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.deliverables.map((del, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60"
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Technology Stack:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-extrabold text-blue-950 uppercase tracking-wider">
                      Need a similar high-impact website?
                    </h4>
                    <p className="text-xs text-blue-700 mt-0.5">
                      Get your custom strategy & live demo built in 7 days.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shrink-0 ml-2"
                  >
                    Get In Touch
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Bar */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
            <Link
              href={`/portfolio/website/${project.slug}`}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
            >
              View Full SEO Case Study <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
            >
              Close Showcase
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
