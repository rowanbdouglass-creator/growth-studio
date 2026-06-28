"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed video hero. The section is pinned while the video's
 * currentTime is mapped to scroll progress. Four overlay scene captions
 * fade in/out at their corresponding scroll positions.
 *
 * SWAP: replace SOURCE_VIDEO with your stitched 24s 4-scene mp4 once
 * generated. Each scene caption fires at its scroll quartile.
 *
 * Mobile (no hover / iOS): scroll-scrubbing currentTime is unreliable
 * — falls back to autoplay loop with the captions cross-fading on a
 * timer. Same component, two render paths.
 */
const SOURCE_VIDEO =
  "https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_30fps.mp4";
const POSTER_IMAGE =
  "https://images.pexels.com/videos/3163534/free-video-3163534.jpg?auto=compress&cs=tinysrgb&w=1920";

const SCENES = [
  {
    eyebrow: "01 — DISCOVERY",
    line: "We meet, we listen, we read your numbers.",
  },
  {
    eyebrow: "02 — OPERATIONS",
    line: "We build the system your business actually runs on.",
  },
  {
    eyebrow: "03 — WEBSITE",
    line: "We ship the front that books the calendar.",
  },
  {
    eyebrow: "04 — TRAFFIC",
    line: "We run the ads that fill it.",
  },
  {
    eyebrow: "05 — RESULT",
    line: "Your business runs busy. And in control.",
  },
];

export function HeroScrollVideo() {
  const wrapRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsDesktop(window.matchMedia("(min-width: 880px)").matches);
  }, []);

  // Scroll-scrub the video + cross-fade captions
  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setupScrub = () => {
      // Pin + scrub the video for 4x viewport height (≈one viewport per scene)
      const scrub = ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (!video.duration || isNaN(video.duration)) return;
          video.currentTime = video.duration * self.progress;
        },
      });

      // Cross-fade captions at each quartile
      captionRefs.current.forEach((cap, i) => {
        if (!cap) return;
        gsap.set(cap, { opacity: 0, y: 30 });
        const start = i / SCENES.length;
        const end = (i + 1) / SCENES.length;
        ScrollTrigger.create({
          trigger: wrap,
          start: "top top",
          end: "+=500%",
          scrub: 0.4,
          onUpdate: (self) => {
            const p = self.progress;
            // Window where this caption is visible (fade in mid-quartile, out at end)
            const fadeIn = start + 0.04;
            const fadeOut = end - 0.04;
            let opacity = 0;
            let y = 30;
            if (p > start && p < fadeIn) {
              const t = (p - start) / (fadeIn - start);
              opacity = t;
              y = 30 - t * 30;
            } else if (p >= fadeIn && p <= fadeOut) {
              opacity = 1;
              y = 0;
            } else if (p > fadeOut && p < end) {
              const t = 1 - (p - fadeOut) / (end - fadeOut);
              opacity = t;
              y = -((1 - t) * 30);
            }
            cap.style.opacity = String(opacity);
            cap.style.transform = `translateY(${y}px)`;
          },
        });
      });

      return scrub;
    };

    const setupMobileAutoplay = () => {
      video.muted = true;
      video.loop = true;
      video.play().catch(() => {});
      // Cycle captions on a timer to match what desktop sees
      captionRefs.current.forEach((cap) => {
        if (cap) gsap.set(cap, { opacity: 0 });
      });
      const period = 4500;
      const cycle = (idx: number) => {
        captionRefs.current.forEach((cap, i) => {
          if (!cap) return;
          gsap.to(cap, {
            opacity: i === idx ? 1 : 0,
            duration: 0.8,
            ease: "expo.out",
          });
        });
      };
      let i = 0;
      cycle(i);
      const id = setInterval(() => {
        i = (i + 1) % SCENES.length;
        cycle(i);
      }, period);
      return () => clearInterval(id);
    };

    let cleanup: (() => void) | undefined;

    const start = () => {
      if (reduced || !isDesktop) {
        cleanup = setupMobileAutoplay();
      } else {
        // Pause autoplay; let scrub control playhead
        video.pause();
        const t = setupScrub();
        cleanup = () => {
          t.kill();
        };
      }
    };

    if (video.readyState >= 1) {
      start();
    } else {
      video.addEventListener("loadedmetadata", start, { once: true });
    }

    return () => {
      cleanup?.();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === wrap) t.kill();
      });
    };
  }, [isDesktop]);

  return (
    <section
      ref={wrapRef}
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "var(--color-night)",
        color: "#E1E0CC",
      }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        poster={POSTER_IMAGE}
        src={SOURCE_VIDEO}
        autoPlay={!isDesktop}
        loop={!isDesktop}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Noise grain overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          opacity: 0.5,
          mixBlendMode: "overlay",
          pointerEvents: "none",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px",
        }}
      />

      {/* Dark gradient — top dim for nav, bottom heavy for caption legibility */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 30%, rgba(0,0,0,0.20) 60%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Top wordmark + status */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "28px clamp(20px, 4vw, 48px)",
        }}
      >
        <a
          href="/"
          data-cur="pen"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "#E1E0CC",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            ylb
          </span>
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#C4472E",
              boxShadow: "0 0 8px rgba(196,71,46,0.7)",
              animation: "ylb-pulse 2.4s ease-in-out infinite",
            }}
          />
        </a>
        <nav
          style={{
            display: "flex",
            gap: "clamp(14px, 2.4vw, 32px)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {[
            { l: "Work", h: "/work" },
            { l: "Services", h: "/services" },
            { l: "About", h: "/about" },
            { l: "Contact", h: "/contact" },
          ].map((i) => (
            <a
              key={i.l}
              href={i.h}
              data-cur="pen"
              style={{ color: "rgba(225,224,204,0.78)", textDecoration: "none" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#E1E0CC")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(225,224,204,0.78)")
              }
            >
              {i.l}
            </a>
          ))}
        </nav>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "rgba(225,224,204,0.85)",
          }}
        >
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#C4472E",
              animation: "ylb-pulse 2.4s ease-in-out infinite",
            }}
          />
          Available · Week 28
        </span>
      </div>

      {/* Scene captions — only one visible at a time */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
          padding: "0 clamp(24px, 4vw, 72px)",
        }}
      >
        {SCENES.map((s, i) => (
          <div
            key={i}
            ref={(el) => {
              captionRefs.current[i] = el;
            }}
            style={{
              gridArea: "1 / 1",
              maxWidth: 1200,
              textAlign: "center",
              opacity: 0,
              willChange: "opacity, transform",
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#C4472E",
                marginBottom: 20,
              }}
            >
              {s.eyebrow}
            </span>
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 600,
                fontSize: "clamp(2.2rem, 6vw, 6.4rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
                color: "#E1E0CC",
                margin: 0,
                textShadow: "0 2px 30px rgba(0,0,0,0.6)",
              }}
            >
              {s.line}
            </h2>
          </div>
        ))}
      </div>

      {/* Bottom bar — scroll prompt + scene progress */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 4,
          padding: "0 clamp(20px, 4vw, 48px) 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          gap: 24,
        }}
      >
        <a
          href="/contact"
          data-cur="hold"
          data-magnetic=""
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 24px",
            background: "#E1E0CC",
            color: "#0E0D0B",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 700,
            borderRadius: 999,
            textDecoration: "none",
            transition: "background 0.3s ease, color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#C4472E";
            e.currentTarget.style.color = "#E1E0CC";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#E1E0CC";
            e.currentTarget.style.color = "#0E0D0B";
          }}
        >
          Book a slot
          <span style={{ fontSize: 14 }}>→</span>
        </a>

        <span
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(225,224,204,0.7)",
          }}
        >
          Scroll to play
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 1,
              height: 32,
              background: "#E1E0CC",
              opacity: 0.5,
              animation: "hd-line 2.2s ease-in-out infinite",
              transformOrigin: "top",
            }}
          />
        </span>

        <div
          aria-hidden
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
          }}
        >
          {SCENES.map((_, i) => (
            <span
              key={i}
              style={{
                width: 24,
                height: 2,
                background: "rgba(225,224,204,0.3)",
                display: "inline-block",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes hd-line {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}
