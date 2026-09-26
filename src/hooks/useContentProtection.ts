"use client";

import { useState, useEffect, useCallback, RefObject } from "react";

export interface UseContentProtectionOptions {
  preventCopy?: boolean;
  preventContextMenu?: boolean;
  preventDrag?: boolean;
  sensitive?: boolean; // Activate privacy shield on tab blur / window focus loss
  userEmail?: string;
  sessionId?: string;
}

export function useContentProtection(
  containerRef?: RefObject<HTMLElement | null>,
  options: UseContentProtectionOptions = {}
) {
  const {
    preventCopy = true,
    preventContextMenu = true,
    preventDrag = true,
    sensitive = false,
    userEmail,
    sessionId,
  } = options;

  const [isWindowFocused, setIsWindowFocused] = useState<boolean>(true);
  const [isTabVisible, setIsTabVisible] = useState<boolean>(true);
  const [activeSessionId, setActiveSessionId] = useState<string>(sessionId || "");

  // Generate or retain non-sensitive client session identifier for watermark tracking
  useEffect(() => {
    if (!activeSessionId) {
      const generated = `SG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setActiveSessionId(generated);
    }
  }, [activeSessionId]);

  // Tab visibility and Window blur/focus listeners (for sensitive content privacy shield)
  useEffect(() => {
    if (!sensitive) return;

    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };

    const handleFocus = () => setIsWindowFocused(true);
    const handleBlur = () => setIsWindowFocused(false);

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [sensitive]);

  // Event handlers checking that target is not a form input / textarea
  const isFormElement = useCallback((target: EventTarget | null): boolean => {
    if (!target || !(target instanceof HTMLElement)) return false;
    const tagName = target.tagName.toLowerCase();
    return (
      tagName === "input" ||
      tagName === "textarea" ||
      tagName === "select" ||
      target.isContentEditable
    );
  }, []);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      if (!preventContextMenu) return;
      if (isFormElement(e.target)) return;
      e.preventDefault();
    },
    [preventContextMenu, isFormElement]
  );

  const handleCopy = useCallback(
    (e: React.ClipboardEvent | ClipboardEvent) => {
      if (!preventCopy) return;
      if (isFormElement(e.target)) return;
      e.preventDefault();
    },
    [preventCopy, isFormElement]
  );

  const handleDragStart = useCallback(
    (e: React.DragEvent | DragEvent) => {
      if (!preventDrag) return;
      if (isFormElement(e.target)) return;
      e.preventDefault();
    },
    [preventDrag, isFormElement]
  );

  const isShieldActive = sensitive && (!isWindowFocused || !isTabVisible);

  return {
    isShieldActive,
    isTabVisible,
    isWindowFocused,
    sessionId: activeSessionId,
    userEmail: userEmail || "SmartlyGrow Authenticated Client",
    handlers: {
      onContextMenu: handleContextMenu,
      onCopy: handleCopy,
      onCut: handleCopy,
      onDragStart: handleDragStart,
    },
  };
}
