"use client";

import React, { useState, useEffect } from "react";

export interface DynamicWatermarkProps {
  userEmail?: string;
  sessionId?: string;
  variant?: "roaming" | "pattern" | "corner";
  opacity?: number;
  className?: string;
  text?: string;
}

export default function DynamicWatermark({
  userEmail,
  sessionId,
  variant = "roaming",
  opacity = 0.28,
  className = "",
  text,
}: DynamicWatermarkProps) {
  const [coords, setCoords] = useState<{ top: string; left: string }>({
    top: "15%",
    left: "15%",
  });

  const displayUser = userEmail || "SmartlyGrow Authorized View";
  const displaySession = sessionId ? `#${sessionId.slice(0, 8)}` : `#SG-${new Date().toISOString().slice(0, 10)}`;
  const defaultText = text || `${displayUser} • SmartlyGrow Secure • ${displaySession}`;

  // Controlled Roaming Drift across coordinates
  useEffect(() => {
    if (variant !== "roaming") return;

    const positions = [
      { top: "12%", left: "10%" },
      { top: "12%", left: "62%" },
      { top: "76%", left: "12%" },
      { top: "76%", left: "58%" },
      { top: "45%", left: "32%" },
    ];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % positions.length;
      setCoords(positions[index]);
    }, 14000);

    return () => clearInterval(interval);
  }, [variant]);

  if (variant === "corner") {
    return (
      <div
        style={{ opacity }}
        className={`absolute bottom-3 right-3 z-30 pointer-events-none select-none font-mono text-[10px] sm:text-xs text-white bg-black/40 px-2 py-0.5 rounded backdrop-blur-[2px] border border-white/10 ${className}`}
      >
        {defaultText}
      </div>
    );
  }

  if (variant === "pattern") {
    return (
      <div
        style={{ opacity: opacity * 0.7 }}
        className={`absolute inset-0 z-20 pointer-events-none select-none overflow-hidden flex flex-wrap gap-12 p-6 items-center justify-around rotate-[-18deg] scale-125 ${className}`}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="font-mono text-[11px] font-bold text-white/30 whitespace-nowrap drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
          >
            {defaultText}
          </span>
        ))}
      </div>
    );
  }

  // Default: Roaming subtle watermark
  return (
    <div
      style={{
        top: coords.top,
        left: coords.left,
        opacity,
        transition: "top 3.5s ease-in-out, left 3.5s ease-in-out",
      }}
      className={`absolute z-30 pointer-events-none select-none font-mono text-[10px] sm:text-[11px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] bg-black/25 px-2.5 py-1 rounded backdrop-blur-[1px] border border-white/10 whitespace-nowrap ${className}`}
    >
      {defaultText}
    </div>
  );
}
