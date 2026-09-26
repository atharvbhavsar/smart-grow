"use client";

import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface LightboxMedia {
  url: string;
  type: "image" | "video";
  title?: string;
  client?: string;
  category?: string;
  description?: string;
  metrics?: string;
  liveUrl?: string;
}

interface MediaLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  mediaList: LightboxMedia[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function MediaLightbox({
  isOpen,
  onClose,
  mediaList,
  currentIndex,
  onNavigate,
}: MediaLightboxProps) {
  const currentItem = mediaList[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < mediaList.length - 1) onNavigate(currentIndex + 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, currentIndex, mediaList.length, onClose, onNavigate]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md transition-all">
        {/* Backdrop Close */}
        <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

        {/* Top Controls */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-3">
          {currentItem.liveUrl && (
            <a
              href={currentItem.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-md transition-all border border-white/20 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              Live Link <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-md border border-white/20 shadow-lg cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Previous Button */}
        {mediaList.length > 1 && currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex - 1);
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-lg cursor-pointer"
            aria-label="Previous item"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Next Button */}
        {mediaList.length > 1 && currentIndex < mediaList.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex + 1);
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-lg cursor-pointer"
            aria-label="Next item"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative z-40 max-w-4xl w-full max-h-[90vh] flex flex-col bg-white rounded-3xl border border-white/30 overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Media Display Area */}
          <div className="relative w-full flex-1 min-h-[300px] sm:min-h-[420px] max-h-[70vh] bg-slate-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            {currentItem.type === "video" ? (
              <div 
                className="relative w-full h-full flex items-center justify-center select-none overflow-hidden"
                onContextMenu={(e) => e.preventDefault()}
              >
                <video
                  src={currentItem.url}
                  controls
                  autoPlay
                  playsInline
                  controlsList="nodownload noremoteplayback"
                  onContextMenu={(e) => e.preventDefault()}
                  className="max-h-[65vh] max-w-full rounded-2xl object-contain shadow-md select-none"
                />
              </div>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={currentItem.url}
                alt={currentItem.title || "Portfolio media"}
                className="max-h-[65vh] max-w-full rounded-2xl object-contain shadow-sm"
              />
            )}
          </div>

          {/* Media Info Footer */}
          {(currentItem.title || currentItem.description || currentItem.client) && (
            <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  {currentItem.client && (
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200/80 px-2.5 py-0.5 rounded-full">
                      {currentItem.client}
                    </span>
                  )}
                  {currentItem.category && (
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {currentItem.category}
                    </span>
                  )}
                  {currentItem.metrics && (
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {currentItem.metrics}
                    </span>
                  )}
                </div>
                {currentItem.title && (
                  <h3 className="text-sm sm:text-base font-bold text-slate-950 tracking-tight">
                    {currentItem.title}
                  </h3>
                )}
                {currentItem.description && (
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {currentItem.description}
                  </p>
                )}
              </div>

              {mediaList.length > 1 && (
                <div className="text-xs font-bold text-slate-400 shrink-0 self-end sm:self-center">
                  {currentIndex + 1} of {mediaList.length}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
