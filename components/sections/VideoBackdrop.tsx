"use client";

import { useEffect, useRef } from "react";

/**
 * Page-wide atmospheric video backdrop.
 *
 * position: fixed, full viewport, behind everything (z-index: 0).
 * The hero is transparent so the backdrop shows fully. Sections
 * 02 and 03 have translucent dark veils so the lightning bleeds
 * through subtly. Section 04 onward is solid night, naturally
 * hiding the backdrop.
 *
 * Source: lime lightning Kling clip, watermark cropped, audio
 * stripped, faststart-encoded. Loops natively (not scroll-scrubbed
 * any more — lightning reads better at its native pace).
 *
 * prefers-reduced-motion: paused, shows the poster frame.
 */

const HERO_VIDEO = "/video/lime-lightning.mp4";

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
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
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
      {/* Subtle grain over the whole backdrop layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.3,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px",
        }}
      />
    </div>
  );
}
