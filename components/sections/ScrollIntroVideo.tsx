"use client";

import { useEffect, useRef } from "react";

/**
 * ScrollIntroVideo — full-screen kinetic intro played scroll-scrubbed.
 *
 * The section is tall (≈250vh) and pins a sticky 100vh container
 * inside it. As the user scrolls through the section, the video's
 * currentTime maps to scroll progress. When the user has scrolled
 * past, the next section (HeroFinal) appears naturally.
 *
 * Source: /public/video/intro.mp4 — re-encoded with every-frame
 * keyframe so currentTime seeks are smooth (no buffering hitches).
 *
 * Reduced-motion: shows the last frame statically, skips scrubbing.
 */

const INTRO_VIDEO = "/video/intro.mp4";

export function ScrollIntroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    const section = sectionRef.current;
    if (!v || !section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      v.pause();
      // Jump to last frame so the section looks complete
      const seekLast = () => {
        if (v.duration && isFinite(v.duration)) v.currentTime = v.duration;
      };
      if (v.readyState >= 1) seekLast();
      else v.addEventListener("loadedmetadata", seekLast, { once: true });
      return;
    }

    v.pause();

    let target = 0;
    let rafId = 0;

    const tick = () => {
      if (!v.duration || !isFinite(v.duration)) {
        rafId = 0;
        return;
      }
      const cur = v.currentTime;
      const diff = target - cur;
      // Gentler lerp (0.14) — smoother visual interpolation. Slightly
      // higher settle threshold (0.02) so we don't burn rAF cycles
      // trying to hit exact frames.
      if (Math.abs(diff) < 0.02) {
        try { v.currentTime = target; } catch {}
        rafId = 0;
        return;
      }
      try {
        v.currentTime = cur + diff * 0.14;
      } catch {}
      rafId = requestAnimationFrame(tick);
    };

    const updateTarget = () => {
      if (!v.duration || !isFinite(v.duration)) return;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / Math.max(scrollable, 1));
      target = progress * v.duration;
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => updateTarget();
    const onResize = () => updateTarget();
    const onMeta = () => updateTarget();

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
    <section
      ref={sectionRef}
      data-bg="dark"
      data-hide-site-header
      style={{
        position: "relative",
        // 500vh gives ~4 viewport-heights of scroll for a 17s clip —
        // each scroll unit advances the video less = smoother playback
        height: "500vh",
        background: "#000000",
        zIndex: 2,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: "#000000",
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src={INTRO_VIDEO}
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </section>
  );
}
