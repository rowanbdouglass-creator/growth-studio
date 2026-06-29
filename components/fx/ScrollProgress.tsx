"use client";

import { useEffect, useRef } from "react";

/**
 * Persistent vertical scroll progress bar fixed to the left edge of
 * the viewport. Fills red as the user scrolls the page. Subtle visual
 * frame that breaks up the linear scroll feel by giving spatial
 * orientation. No JS animation library — just transform: scaleY().
 */
export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${progress})`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 2,
        height: "100vh",
        zIndex: 60,
        background: "rgba(243,239,230,0.06)",
        pointerEvents: "none",
      }}
    >
      <div
        ref={fillRef}
        style={{
          width: "100%",
          height: "100%",
          background: "var(--color-red)",
          boxShadow: "0 0 12px var(--color-red-glow)",
          transform: "scaleY(0)",
          transformOrigin: "top center",
          willChange: "transform",
        }}
      />
    </div>
  );
}
