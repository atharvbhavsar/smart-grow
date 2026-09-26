"use client";

import React, { useRef } from "react";
import { useContentProtection } from "@/hooks/useContentProtection";
import DynamicWatermark from "./DynamicWatermark";
import { Shield, EyeOff } from "lucide-react";

export interface ProtectedContentProps {
  children: React.ReactNode;
  preventCopy?: boolean;
  preventContextMenu?: boolean;
  preventDrag?: boolean;
  preventPrint?: boolean;
  watermark?: boolean;
  watermarkVariant?: "roaming" | "pattern" | "corner";
  sensitive?: boolean; // Show privacy shield on tab switch / window blur
  userEmail?: string;
  sessionId?: string;
  className?: string;
}

export default function ProtectedContent({
  children,
  preventCopy = true,
  preventContextMenu = true,
  preventDrag = true,
  preventPrint = true,
  watermark = false,
  watermarkVariant = "roaming",
  sensitive = false,
  userEmail,
  sessionId,
  className = "",
}: ProtectedContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { isShieldActive, sessionId: activeSessionId, handlers } = useContentProtection(
    containerRef,
    {
      preventCopy,
      preventContextMenu,
      preventDrag,
      sensitive,
      userEmail,
      sessionId,
    }
  );

  return (
    <div
      ref={containerRef}
      onContextMenu={handlers.onContextMenu}
      onCopy={handlers.onCopy}
      onCut={handlers.onCut}
      onDragStart={handlers.onDragStart}
      className={`relative protected-content ${preventCopy ? "select-none" : ""} ${className}`}
    >
      {/* Dynamic Watermark Overlay */}
      {watermark && (
        <DynamicWatermark
          userEmail={userEmail}
          sessionId={activeSessionId}
          variant={watermarkVariant}
        />
      )}

      {/* Privacy Shield (Visible when page loses focus on sensitive content) */}
      {isShieldActive && (
        <div className="absolute inset-0 z-40 bg-slate-950/95 backdrop-blur-lg flex flex-col items-center justify-center p-6 text-center select-none animate-fadeIn transition-opacity">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3 shadow-lg">
            <EyeOff className="w-6 h-6" />
          </div>
          <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
            Protected Content Shield
          </h4>
          <p className="text-xs text-slate-400 max-w-xs mt-1">
            Display paused while window is inactive. Return focus to resume view.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
            <Shield className="w-3 h-3" />
            <span>SmartlyGrow Security Layer</span>
          </div>
        </div>
      )}

      {/* Actual Protected Content */}
      <div className={isShieldActive ? "invisible" : "visible"}>
        {children}
      </div>

      {/* Print Notice (Displayed only when printed) */}
      {preventPrint && (
        <div className="print-protection-notice">
          <strong>SmartlyGrow Protected Material</strong>
          <p>This content is protected and is not authorized for printing. Visit https://smartlygrow.in</p>
        </div>
      )}
    </div>
  );
}
