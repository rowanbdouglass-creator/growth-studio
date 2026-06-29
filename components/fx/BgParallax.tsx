"use client";

import { useEffect, useRef } from "react";

/**
 * Persistent atmospheric background layer — fixed behind every section,
 * scrolls at 0.3× page velocity. Provides the spatial-continuity thread
 * the audit identified as missing (sections felt like isolated islands
 * because there was no shared depth between them).
 *
 * Two layers:
 *  1. Faint diagonal calendar grid (brand metaphor as depth)
 *  2. Slow-drifting warm light bloom (atmosphere)
 *
 * Both fixed-position behind everything (z-index: 0), pointer-events
 * disabled. Uses transform: translateY only — GPU composited, no CLS.
 * Skipped entirely on prefers-reduced-motion.
 */
export function BgParallax() {
  const gridRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(0, ${y * 0.3}px, 0) rotate(-6deg)`;
      }
      if (bloomRef.current) {
        bloomRef.current.style.transform = `translate3d(0, ${y * 0.15}px, 0)`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Calendar grid drifting */}
      <div
        ref={gridRef}
        style={{
          position: "absolute",
          inset: "-40%",
          backgroundImage:
            "linear-gradient(rgba(243,239,230,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(243,239,230,0.035) 1px, transparent 1px)",
          backgroundSize: "140px 80px",
          willChange: "transform",
          maskImage:
            "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Warm tungsten bloom drifting at half speed of grid */}
      <div
        ref={bloomRef}
        style={{
          position: "absolute",
          inset: "-20%",
          background:
            "radial-gradient(ellipse 60% 50% at 25% 30%, rgba(255,170,90,0.04) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 75% 70%, rgba(196,71,46,0.05) 0%, transparent 60%)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
