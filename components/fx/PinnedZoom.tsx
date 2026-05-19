"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface PinnedZoomProps {
  /**
   * Render-prop children receive 0..1 progress (linear) and the
   * eased version. Use them directly in inline styles — no CSS
   * variable / calc() / abs() gymnastics needed.
   */
  children: (state: {
    progress: number;
    eased: number;
  }) => ReactNode;
  /**
   * Total scroll distance the section consumes, in vh.
   * Higher = the section gets more "screen time".
   */
  scrollHeight?: number;
  className?: string;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Cinematic scroll-pinned reveal. The wrapper is `scrollHeight` tall.
 * Inner content sticks to the viewport top while you scroll past it.
 * Each scroll event computes a 0..1 progress signal and passes both
 * the linear value and an easeInOutCubic version to the render-prop
 * child.
 */
export function PinnedZoom({
  children,
  scrollHeight = 240,
  className = "",
}: PinnedZoomProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReduced(isReduced);
    if (isReduced) {
      setProgress(0.5); // park at midpoint so content is fully visible
      return;
    }

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let rafId: number | null = null;
    let queued = false;

    function update() {
      queued = false;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(rect.height - vh, 1);
      const raw = -rect.top / total;
      setProgress(Math.max(0, Math.min(1, raw)));
    }

    function onScroll() {
      if (queued) return;
      queued = true;
      rafId = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const eased = easeInOutCubic(progress);

  return (
    <section
      ref={wrapperRef}
      className={`relative ${className}`}
      style={{ height: reduced ? "auto" : `${scrollHeight}vh` }}
    >
      <div
        className={`top-0 h-screen flex items-center justify-center overflow-hidden ${
          reduced ? "relative" : "sticky"
        }`}
      >
        {children({ progress, eased })}
      </div>
    </section>
  );
}
