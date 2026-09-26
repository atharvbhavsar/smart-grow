"use client";

import React, { useEffect, createContext, useContext, useRef, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Lenis from "lenis";

const LenisContext = createContext<{
  lenis: Lenis | null;
  stop: () => void;
  start: () => void;
  scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => void;
}>({
  lenis: null,
  stop: () => {},
  start: () => {},
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

function ScrollManager({ lenis }: { lenis: Lenis | null }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          if (lenis) {
            lenis.scrollTo(target as HTMLElement, { offset: -80 });
          } else {
            target.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }
      }

      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    }
  }, [pathname, searchParams, lenis]);

  return null;
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Only run on client
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      autoResize: true,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const value = React.useMemo(() => ({
    lenis: lenisInstance,
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
    scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => {
      lenisRef.current?.scrollTo(target as unknown as HTMLElement, options as never);
    }
  }), [lenisInstance]);

  return (
    <LenisContext.Provider value={value}>
      <Suspense fallback={null}>
        <ScrollManager lenis={lenisInstance} />
      </Suspense>
      {children}
    </LenisContext.Provider>
  );
}
