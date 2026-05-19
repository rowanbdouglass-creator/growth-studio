"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface PinnedZoomProps {
  children: ReactNode;
  /**
   * Total scroll distance the section consumes, expressed as vh.
   * Bigger = more "screen time". Default 220 (2.2 viewports of scroll).
   */
  scrollHeight?: number;
  className?: string;
}

/**
 * Cinematic scroll-pinned reveal. The wrapper is `scrollHeight` tall.
 * The inner content sticks to the viewport top while you scroll through
 * it, and animates based on a 0→1 progress signal derived from how
 * far the section has scrolled past.
 *
 * Children receive `--progress` (0..1) as a CSS variable on the inner
 * sticky element, which child components can use for any transform
 * they like. The wrapper also exposes `--ease` (a soft easeInOut of
 * progress) for content that should hold near 0 and 1.
 *
 * Why JS not animation-timeline: native scroll-driven CSS animations
 * are still flaky in Safari and the `cover` ranges don't behave
 * intuitively for sticky pinned layouts. A single rAF-driven scroll
 * handler is simpler and runs ~1ms per frame.
 */
export function PinnedZoom({
  children,
  scrollHeight = 220,
  className = "",
}: PinnedZoomProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    let rafId: number | null = null;
    let queued = false;

    function update() {
      queued = false;
      if (!wrapper || !inner) return;

      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      // Section enters when its top hits the bottom of viewport,
      // fully exits when its bottom hits the top.
      const total = rect.height - vh;
      const raw = (-rect.top) / Math.max(total, 1);
      const progress = Math.max(0, Math.min(1, raw));

      // easeInOutCubic — slow at the edges, fast in the middle
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      inner.style.setProperty("--progress", progress.toFixed(4));
      inner.style.setProperty("--ease", eased.toFixed(4));
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

  return (
    <section
      ref={wrapperRef}
      className={`relative ${className}`}
      style={{ height: reduced ? "auto" : `${scrollHeight}vh` }}
    >
      <div
        ref={innerRef}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={
          {
            "--progress": "0",
            "--ease": "0",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </section>
  );
}
