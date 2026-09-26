"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Shield, EyeOff, Lock } from "lucide-react";

export default function GlobalContentProtection() {
  const [isShieldActive, setIsShieldActive] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize unique session identifier
  useEffect(() => {
    const id = `SG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setSessionId(id);
  }, []);

  const triggerShieldTemporary = useCallback((durationMs = 2500, reason = "Screenshot Attempt Detected") => {
    setIsShieldActive(true);
    setToastMessage(reason);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText("SmartlyGrow content is protected. Unauthorized screenshots/copies are restricted.");
      }
    } catch {
      // Clipboard write might be restricted by browser policy
    }
    setTimeout(() => {
      setToastMessage(null);
    }, durationMs);
  }, []);

  useEffect(() => {
    // 1. Window Blur & Visibility Change (Triggers on Snipping Tool Win+Shift+S, Alt+Tab, Screen Grabbers)
    const handleBlur = () => {
      setIsShieldActive(true);
    };

    const handleFocus = () => {
      // Small timeout to allow screen grabber to finish capturing empty shield before restoring
      setTimeout(() => {
        setIsShieldActive(false);
      }, 150);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setIsShieldActive(true);
      } else {
        setTimeout(() => {
          setIsShieldActive(false);
        }, 150);
      }
    };

    // 2. Keyboard Interceptions (PrtScn, Win+Shift+S, Cmd+Shift+3/4/5, Ctrl+P, Ctrl+S, Ctrl+U)
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen key
      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        e.preventDefault();
        triggerShieldTemporary(3000, "Screenshot capture blocked by security policy");
        return;
      }

      // Windows Snipping Tool (Win+Shift+S) or Mac Screenshot (Cmd+Shift+3 / 4 / 5)
      const isShift = e.shiftKey;
      const isMetaOrCtrl = e.metaKey || e.ctrlKey;

      if ((isMetaOrCtrl && isShift && (e.key === "S" || e.key === "s" || e.code === "KeyS")) ||
          (e.metaKey && isShift && ["3", "4", "5"].includes(e.key))) {
        setIsShieldActive(true);
        triggerShieldTemporary(3000, "Screenshot shortcut detected");
      }

      // Prevent Ctrl+P (Print), Ctrl+S (Save), Ctrl+U (Source)
      if (isMetaOrCtrl && ["p", "P", "s", "S", "u", "U"].includes(e.key)) {
        e.preventDefault();
        triggerShieldTemporary(2000, "Content export restricted");
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        triggerShieldTemporary(3000, "Screenshot capture blocked");
      }
    };

    // Helper: Verify if event is targeting an actual interactive form field
    const isInteractiveInput = (target: EventTarget | null): boolean => {
      if (!target || !(target instanceof HTMLElement)) return false;
      const tag = target.tagName.toLowerCase();
      return (
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        target.isContentEditable ||
        target.getAttribute("role") === "textbox"
      );
    };

    // 3. Global Context Menu (Right Click) Prevention
    const handleContextMenu = (e: MouseEvent) => {
      if (isInteractiveInput(e.target)) return;
      e.preventDefault();
    };

    // 4. Global Copy & Cut Prevention
    const handleCopy = (e: ClipboardEvent) => {
      if (isInteractiveInput(e.target)) return;
      e.preventDefault();
      try {
        e.clipboardData?.setData("text/plain", "SmartlyGrow Protected Content • https://smartlygrow.in");
      } catch {
        // ignore
      }
    };

    // 5. Global Drag Prevention
    const handleDragStart = (e: DragEvent) => {
      if (isInteractiveInput(e.target)) return;
      e.preventDefault();
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keyup", handleKeyUp, true);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCopy);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keyup", handleKeyUp, true);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCopy);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, [triggerShieldTemporary]);

  return (
    <>
      {/* Global Full-Viewport Anti-Screenshot Privacy Shield */}
      {isShieldActive && (
        <div className="fixed inset-0 z-[999999] bg-slate-950/98 backdrop-blur-3xl flex flex-col items-center justify-center p-6 text-center select-none animate-fadeIn transition-all duration-200">
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-2xl shadow-blue-500/30">
              <EyeOff className="w-8 h-8 animate-pulse" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1 rounded-full">
              <Lock className="w-3.5 h-3.5" />
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
            SmartlyGrow Protected Display
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mt-1.5 leading-relaxed">
            Content display is secured while window is inactive or screenshot tool is active. Click window to resume.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/50 px-3.5 py-1 rounded-full shadow-inner">
            <Shield className="w-3.5 h-3.5" />
            <span>SESSION: {sessionId || "SG-SECURE"} • ANTI-SCREENSHOT ACTIVE</span>
          </div>
        </div>
      )}

      {/* Alert Notification Toast for Screenshot Interception */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000000] bg-slate-900/95 text-white border border-blue-500/40 shadow-2xl px-4 py-2.5 rounded-xl flex items-center gap-2.5 text-xs font-semibold backdrop-blur-md animate-bounce">
          <Shield className="w-4 h-4 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
