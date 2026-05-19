"use client";

import { useEffect, useRef } from "react";

/**
 * Soft amber glow that tracks the cursor on pointer devices.
 * Disabled on touch and reduced-motion. Uses CSS variables +
 * transform: translate3d for buttery 60fps without re-rendering.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let rafId: number | null = null;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    function tick() {
      // Spring-like easing toward the target
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      if (el) {
        el.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
      }
      const dx = Math.abs(targetX - currentX);
      const dy = Math.abs(targetY - currentY);
      if (dx > 0.5 || dy > 0.5) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none -z-[5] mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle at center, oklch(0.78 0.17 60 / 0.18), oklch(0.78 0.17 60 / 0.04) 40%, transparent 70%)",
        filter: "blur(40px)",
        willChange: "transform",
      }}
    />
  );
}
