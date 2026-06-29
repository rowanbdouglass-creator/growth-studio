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
      v.removeAttribute("autoplay");
      return;
    }
    const play = v.play();
    if (play && typeof play.catch === "function") play.catch(() => {});
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
        autoPlay
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
