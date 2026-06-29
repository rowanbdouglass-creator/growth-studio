"use client";

import { useEffect, useRef } from "react";

/**
 * Page-wide atmospheric video backdrop. Plays continuously behind the
 * first several sections so the brand atmosphere bleeds past the hero
 * (Tony Mak / Ascend pattern — the imagery IS the through-line).
 *
 * Sections control how much video shows by their own background veil
 * opacity. Sections from #04 onward are solid night and naturally
 * cover the backdrop.
 */

const HERO_VIDEO = "/video/hero-backdrop.mp4";

export function VideoBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      v.pause();
      return;
    }

    // Scroll-driven playback: video plays while the user is actively
    // scrolling and pauses 220ms after they stop. Cheap, predictable,
    // and matches the Tony Mak feel — the atmosphere moves with you.
    v.pause();

    let pauseTimer: number | null = null;
    let rafQueued = false;

    const onScroll = () => {
      if (!rafQueued) {
        rafQueued = true;
        requestAnimationFrame(() => {
          if (v.paused) {
            const p = v.play();
            if (p && typeof p.catch === "function") p.catch(() => {});
          }
          rafQueued = false;
        });
      }
      if (pauseTimer !== null) window.clearTimeout(pauseTimer);
      pauseTimer = window.setTimeout(() => v.pause(), 220);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (pauseTimer !== null) window.clearTimeout(pauseTimer);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background: "var(--color-night)",
      }}
    >
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="auto"
        src={HERO_VIDEO}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.35,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px",
        }}
      />
    </div>
  );
}
