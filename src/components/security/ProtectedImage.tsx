"use client";

import React from "react";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

export interface ProtectedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  watermark?: boolean;
  watermarkText?: string;
  onClick?: () => void;
}

export default function ProtectedImage({
  src,
  alt,
  width,
  height,
  className = "",
  watermark = false,
  watermarkText,
  onClick,
}: ProtectedImageProps) {
  // Use optimized Cloudinary delivery with f_auto, q_auto
  const optimizedSrc = getOptimizedImageUrl(src, { width, height });

  return (
    <div
      onClick={onClick}
      onContextMenu={(e) => e.preventDefault()}
      className={`relative inline-block overflow-hidden select-none protected-img ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        className="w-full h-full object-cover select-none pointer-events-auto"
        style={{
          WebkitUserDrag: "none",
          userSelect: "none",
        } as React.CSSProperties}
      />

      {/* Protective Transparent Overlay (Deters basic right-click -> save image as) */}
      <div
        onContextMenu={(e) => e.preventDefault()}
        className="absolute inset-0 z-10 bg-transparent pointer-events-none"
      />

      {/* Optional Subtle Image Watermark */}
      {watermark && (
        <div className="absolute bottom-2 right-2 z-20 pointer-events-none select-none text-[9px] font-mono font-bold text-white/40 bg-black/40 px-2 py-0.5 rounded backdrop-blur-[1px]">
          {watermarkText || "SmartlyGrow"}
        </div>
      )}
    </div>
  );
}
