"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface PinnedZoomProps {
  children: (state: { progress: number; eased: number }) => ReactNode;
  scrollHeight?: number;
  className?: string;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function PinnedZoom({
  children,
  scrollHeight = 220,
  className = "",
}: PinnedZoomProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

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
      style={{ height: `${scrollHeight}vh` }}
      data-pinned-zoom
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {children({ progress, eased })}
      </div>
    </section>
  );
}
