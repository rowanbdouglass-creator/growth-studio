"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { APPOINTMENTS } from "@/lib/content/appointments";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * WorkTrionn — Trionn-pattern selected work section.
 *
 * Pinned 100vh section. Left ~35% fixed: title + view-all. Right ~65%
 * is a horizontal track of full-size visual cards that pan left as
 * the user scrolls vertically. Each card has a gradient/image hero
 * block with overlay typography (brand mark + subtitle TL, massive
 * project name BL) and a metadata strip below (h3 title, description,
 * EXPLORE PROJECT link).
 *
 * Visuals: rich gradient placeholders per project (swap to real
 * screenshots when available). Each gradient is brand-coloured to
 * the project's category so they're visually distinct.
 *
 * Mobile (<880px): native horizontal scroll, snap, no pinning.
 */

type Visual = {
  bg: string;
  brandMark: string;
  subtitle: string;
  bigOverlay: string;
};

const VISUALS: Record<string, Visual> = {
  nayims: {
    bg: "linear-gradient(135deg, #2A1810 0%, #5C2114 45%, #C4472E 100%)",
    brandMark: "NE",
    subtitle: "BUILD THE OPS THAT GREW THE BUSINESS",
    bigOverlay: "Nayim's Hub.",
  },
  "jc-setton": {
    bg: "linear-gradient(135deg, #14202E 0%, #25425E 45%, #4A7BA8 100%)",
    brandMark: "JC",
    subtitle: "RECOVER £42K FROM MISSPENT META BUDGET",
    bigOverlay: "JC Setton.",
  },
  "cape-kings": {
    bg: "linear-gradient(135deg, #0E0D0B 0%, #3A1F18 45%, #A93A24 100%)",
    brandMark: "CK",
    subtitle: "STABILISED IN 11 DAYS · ZERO REBREACH",
    bigOverlay: "Cape Kings.",
  },
  "forum-studios": {
    bg: "linear-gradient(135deg, #1A1D2D 0%, #34394F 45%, #6C7896 100%)",
    brandMark: "FS",
    subtitle: "96 HRS RECOVERED · EVERY MONTH",
    bigOverlay: "Forum Studios.",
  },
};

export function WorkTrionn() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsDesktop(window.matchMedia("(min-width: 880px)").matches);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || !isDesktop) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let scrollAmount = 0;
    const calculate = () => {
      // Move the track left by its scrollable distance — last card's right edge
      // ends near the right edge of the right panel
      const trackWidth = track.scrollWidth;
      const containerWidth = track.parentElement?.clientWidth || 0;
      scrollAmount = trackWidth - containerWidth;
    };
    calculate();

    const tween = gsap.to(track, {
      x: () => -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollAmount + window.innerHeight * 0.4}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    const onResize = () => {
      calculate();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isDesktop]);

  // Mobile: native horizontal scroll-snap
  if (!isDesktop) {
    return (
      <section
        data-bg="dark"
        data-surface="dark"
        style={{
          padding: "clamp(72px, 9vw, 140px) 0 clamp(48px, 6vw, 80px)",
          background: "var(--color-night)",
          color: "var(--color-paper)",
          borderBottom: "1px solid var(--color-hairline)",
        }}
      >
        <div
          style={{
            padding: "0 clamp(24px, 4vw, 72px)",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-mute)",
              marginBottom: 24,
            }}
          >
            <span style={{ color: "var(--color-red)" }}>●</span> SELECTED WORK
          </div>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 600,
              fontSize: "clamp(2.4rem, 8vw, 4rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
              marginBottom: 24,
            }}
          >
            Selected work &amp;{" "}
            <span className="serif-italic">explorations.</span>
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            padding: "0 clamp(24px, 4vw, 72px) 16px",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {APPOINTMENTS.map((a, i) => (
            <ProjectCard key={a.slug} appointment={a} index={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "var(--color-night)",
        color: "var(--color-paper)",
        display: "flex",
      }}
    >
      {/* Left half: title + view all — pinned, centered */}
      <aside
        style={{
          width: "35%",
          padding: "clamp(72px, 9vw, 120px) clamp(32px, 4vw, 72px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexShrink: 0,
          borderRight: "1px solid var(--color-hairline)",
          background: "var(--color-night)",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--color-mute)",
            marginBottom: 24,
          }}
        >
          <span style={{ color: "var(--color-red)" }}>●</span> SELECTED WORK
        </div>
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 600,
            fontSize: "clamp(2.2rem, 3.8vw, 4.4rem)",
            lineHeight: 0.96,
            letterSpacing: "-0.03em",
            marginBottom: 36,
            color: "var(--color-paper)",
            maxWidth: "14ch",
          }}
        >
          Selected work &amp;{" "}
          <span className="serif-italic">explorations.</span>
        </h2>
        <Link
          href="/work"
          data-cur="pen"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-paper)",
            fontWeight: 600,
            borderBottom: "1px solid var(--color-paper)",
            paddingBottom: 4,
            alignSelf: "flex-start",
            textDecoration: "none",
          }}
        >
          VIEW ALL PROJECTS →
        </Link>
      </aside>

      {/* Right half: horizontal carousel of full-size visual cards */}
      <div
        style={{
          width: "65%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            paddingLeft: "clamp(40px, 5vw, 80px)",
            paddingRight: "clamp(80px, 10vw, 160px)",
            gap: "clamp(24px, 3vw, 56px)",
            willChange: "transform",
          }}
        >
          {APPOINTMENTS.map((a, i) => (
            <ProjectCard key={a.slug} appointment={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Single project card ---------------- */

function ProjectCard({
  appointment: a,
  index,
}: {
  appointment: (typeof APPOINTMENTS)[number];
  index: number;
}) {
  const v = VISUALS[a.slug] ?? VISUALS.nayims;
  return (
    <Link
      href={`/work/${a.slug}`}
      data-cur="case"
      style={{
        flexShrink: 0,
        width: "clamp(420px, 38vw, 720px)",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        color: "inherit",
        textDecoration: "none",
        scrollSnapAlign: "start",
      }}
      className="wt-card"
    >
      {/* Hero image block */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 11",
          background: v.bg,
          overflow: "hidden",
          border: "1px solid var(--color-hairline)",
          isolation: "isolate",
        }}
      >
        {/* Subtle grain on the gradient so it doesn't read as a flat box */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.6,
            mixBlendMode: "overlay",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            backgroundSize: "240px",
          }}
        />

        {/* Dim gradient at top + bottom for text legibility */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 25%, transparent 55%, rgba(0,0,0,0.7) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Top-left: brand mark + subtitle */}
        <div
          style={{
            position: "absolute",
            top: "clamp(20px, 2.4vw, 36px)",
            left: "clamp(20px, 2.4vw, 36px)",
            right: "clamp(20px, 2.4vw, 36px)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(8px)",
              display: "grid",
              placeItems: "center",
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "-0.02em",
              color: "var(--color-paper)",
            }}
          >
            {v.brandMark}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-paper)",
              fontWeight: 600,
              maxWidth: "26ch",
              lineHeight: 1.4,
              textShadow: "0 1px 8px rgba(0,0,0,0.7)",
            }}
          >
            {v.subtitle}
          </div>
        </div>

        {/* Bottom-left: massive project nickname overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(16px, 2vw, 32px)",
            left: "clamp(20px, 2.4vw, 36px)",
            right: "clamp(20px, 2.4vw, 36px)",
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 600,
              fontSize: "clamp(36px, 4.2vw, 72px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "var(--color-paper)",
              textShadow: "0 2px 30px rgba(0,0,0,0.6)",
            }}
          >
            {v.bigOverlay}
          </div>
        </div>

        {/* Top-right: project index */}
        <div
          style={{
            position: "absolute",
            top: "clamp(20px, 2.4vw, 36px)",
            right: "clamp(20px, 2.4vw, 36px)",
            zIndex: 2,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--color-paper)",
            fontWeight: 700,
            opacity: 0.85,
          }}
        >
          {String(index + 1).padStart(2, "0")} / {APPOINTMENTS.length}
        </div>
      </div>

      {/* Metadata strip below the hero card */}
      <div style={{ padding: "0 4px" }}>
        <h3
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 600,
            fontSize: "clamp(20px, 1.9vw, 28px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--color-paper)",
            margin: 0,
            marginBottom: 10,
          }}
        >
          {a.client}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            lineHeight: 1.5,
            color: "var(--color-mute)",
            margin: 0,
            marginBottom: 18,
            maxWidth: "40ch",
          }}
        >
          {a.body}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingTop: 14,
            borderTop: "1px solid var(--color-hairline)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-paper)",
              fontWeight: 700,
            }}
          >
            EXPLORE PROJECT →
          </span>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: 22,
              color: "var(--color-red)",
              letterSpacing: "-0.01em",
            }}
          >
            {a.outcomeFigure}
          </span>
        </div>
      </div>
    </Link>
  );
}
