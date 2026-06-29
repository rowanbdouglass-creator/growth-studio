"use client";

import { useEffect, useRef } from "react";

/**
 * Page-wide atmospheric video backdrop with SCROLL-SCRUBBED playback.
 *
 *   • Video time is driven by scroll position, not the wall clock.
 *   • Scroll down → frames advance. Scroll up → frames reverse.
 *   • The mapping ranges from scrollY = 0 (frame 0) to scrollY =
 *     [data-video-cutoff].offsetTop (last frame). Past the cutoff,
 *     scrolling does nothing — the video sits at its last frame
 *     under the solid-black sections below.
 *   • Updates are rAF-lerped toward the target time so fast scrolls
 *     ease in instead of snapping.
 *   • prefers-reduced-motion: pause, no scrubbing.
 *
 * The source mp4 is re-encoded with every-frame-keyframe for smooth
 * seeking (see /public/video pipeline).
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

    v.pause();

    let target = 0;
    let rafId = 0;
    let cutoff = 0;

    const recomputeCutoff = () => {
      const el = document.querySelector<HTMLElement>("[data-video-cutoff]");
      cutoff = el ? el.offsetTop : window.innerHeight * 3;
    };

    const tick = () => {
      if (!v.duration || !isFinite(v.duration)) {
        rafId = 0;
        return;
      }
      const cur = v.currentTime;
      const diff = target - cur;
      if (Math.abs(diff) < 0.008) {
        try {
          v.currentTime = target;
        } catch {
          /* noop */
        }
        rafId = 0;
        return;
      }
      try {
        v.currentTime = cur + diff * 0.22;
      } catch {
        /* noop */
      }
      rafId = requestAnimationFrame(tick);
    };

    const updateTarget = () => {
      if (!v.duration || !isFinite(v.duration) || cutoff <= 0) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / cutoff));
      target = progress * v.duration;
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => updateTarget();
    const onResize = () => {
      recomputeCutoff();
      updateTarget();
    };
    const onMeta = () => {
      recomputeCutoff();
      updateTarget();
    };

    if (v.readyState >= 1) onMeta();
    v.addEventListener("loadedmetadata", onMeta);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      v.removeEventListener("loadedmetadata", onMeta);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
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
