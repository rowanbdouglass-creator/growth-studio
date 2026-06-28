"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * v4 signature object: massive "ylb" wordmark rendered as 3D-extruded
 * CSS text with multi-layer text-shadow depth and warm side-lighting.
 * Floats in fog, rotates subtly with mouse, scrubs scale + rotation
 * with scroll. Replaces the calendar grid as the brand's anchor visual.
 *
 * Pure CSS — no Three.js needed for v4 ship. Can be upgraded later.
 */
export function HeroMark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const mark = markRef.current;
    if (!wrap || !mark) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Mouse parallax tilt
    let tRx = 0, tRy = 0, rx = 0, ry = 0;
    let rafId = 0;
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      tRy = ((e.clientX - cx) / r.width) * 14;
      tRx = ((e.clientY - cy) / r.height) * -8;
    };
    const loop = () => {
      rx += (tRx - rx) * 0.06;
      ry += (tRy - ry) * 0.06;
      mark.style.transform = `perspective(1800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      rafId = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    // Scroll-scrub: scale down + fade as you scroll past the hero
    const scrub = gsap.to(mark, {
      scale: 0.78,
      opacity: 0.18,
      filter: "blur(8px)",
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: "bottom top",
        scrub: 0.4,
      },
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      scrub.scrollTrigger?.kill();
      scrub.kill();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        pointerEvents: "none",
        zIndex: 0,
        perspective: "1800px",
      }}
    >
      <span
        ref={markRef}
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 800,
          fontSize: "clamp(18rem, 32vw, 44rem)",
          letterSpacing: "-0.06em",
          lineHeight: 0.84,
          color: "transparent",
          background:
            "linear-gradient(180deg, rgba(243,239,230,0.92) 0%, rgba(243,239,230,0.32) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          textShadow: [
            "1px 1px 0 rgba(243,239,230,0.04)",
            "2px 2px 0 rgba(243,239,230,0.035)",
            "3px 3px 0 rgba(243,239,230,0.03)",
            "4px 4px 0 rgba(243,239,230,0.025)",
            "6px 6px 0 rgba(243,239,230,0.02)",
            "8px 8px 0 rgba(243,239,230,0.015)",
            "12px 12px 0 rgba(243,239,230,0.01)",
            "0 30px 60px rgba(0,0,0,0.55)",
          ].join(", "),
          willChange: "transform, opacity, filter",
          userSelect: "none",
          transformStyle: "preserve-3d",
        }}
      >
        ylb
      </span>
    </div>
  );
}
