"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

/**
 * Hero v6 — video background + glass aesthetic, modelled on the
 * Creative Marketing Agency reference.
 *
 * Composition:
 *  - Full-bleed atmospheric stock video (Pexels CDN, loops, muted),
 *    fades to night at the bottom for a clean handoff to the next
 *    section.
 *  - Top glass nav rail floats over the video (backdrop-blur, subtle
 *    border, dark-tinted glass).
 *  - Left-aligned hero headline: 'you look booked.' as the entire
 *    statement — brand promise IS the hero, not the wordmark.
 *  - Below: short subhead + two CTAs (lime primary + glass secondary).
 *  - Scroll cue bottom-right.
 */

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_30fps.mp4";
const HERO_POSTER =
  "https://images.pexels.com/videos/3163534/free-video-3163534.jpg?auto=compress&cs=tinysrgb&w=1920";

export function HeroDark() {
  const headRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const head = headRef.current;
    if (!head) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const words = head.querySelectorAll(".hd-word");
    gsap.fromTo(
      words,
      { y: 60, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.07,
        delay: 0.4,
      }
    );
  }, []);

  return (
    <section
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        minHeight: "100svh",
        background: "var(--color-night)",
        color: "var(--color-paper)",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={HERO_POSTER}
        src={HERO_VIDEO}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Subtle noise grain overlay */}
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
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px",
        }}
      />

      {/* Gradient — dim top for header legibility, full black at bottom
          for the fade-into-next-section handoff */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(14,13,11,0.55) 0%, rgba(14,13,11,0.25) 25%, rgba(14,13,11,0.4) 55%, rgba(14,13,11,1) 100%)",
        }}
      />

      {/* GLASS HEADER NAV — floats over video */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          right: 16,
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
          background: "rgba(14,13,11,0.45)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(243,239,230,0.10)",
          borderRadius: 999,
        }}
      >
        <Link
          href="/"
          aria-label="YLB home"
          data-cur="pen"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "var(--color-paper)",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: 18,
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
              background: "var(--color-red)",
              boxShadow: "0 0 10px var(--color-red-glow)",
              animation: "ylb-pulse 2.4s ease-in-out infinite",
            }}
          />
        </Link>

        <nav
          aria-label="Main"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(16px, 2vw, 32px)",
          }}
        >
          {[
            { href: "/work", label: "Work" },
            { href: "/services", label: "Services" },
            { href: "/about", label: "About" },
          ].map((i) => (
            <Link
              key={i.href}
              href={i.href}
              data-cur="pen"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "rgba(243,239,230,0.85)",
                textDecoration: "none",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-paper)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(243,239,230,0.85)")}
            >
              {i.label}
            </Link>
          ))}
          <Link
            href="/contact"
            data-cur="hold"
            data-magnetic=""
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              background: "var(--color-red)",
              color: "var(--color-night)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
              borderRadius: 999,
              textDecoration: "none",
              transition: "background 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-red-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-red)";
            }}
          >
            Get started
            <span style={{ fontSize: 14 }}>↗</span>
          </Link>
        </nav>
      </div>

      {/* Top-right floating status pill (over video, glass) */}
      <div
        style={{
          position: "absolute",
          top: 90,
          right: 24,
          zIndex: 5,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          background: "rgba(14,13,11,0.5)",
          backdropFilter: "blur(14px) saturate(150%)",
          WebkitBackdropFilter: "blur(14px) saturate(150%)",
          border: "1px solid rgba(243,239,230,0.10)",
          borderRadius: 999,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-paper)",
          fontWeight: 600,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--color-red)",
            animation: "ylb-pulse 2.4s ease-in-out infinite",
          }}
        />
        Available Week 28
      </div>

      {/* HERO CONTENT — left-aligned, glass-tinted backing for legibility */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 clamp(24px, 4vw, 64px) clamp(48px, 8vh, 96px)",
          maxWidth: 1480,
          margin: "0 auto",
        }}
      >
        <h1
          ref={headRef}
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 600,
            fontSize: "clamp(3rem, 6vw, 7rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            margin: 0,
            marginBottom: 32,
            color: "var(--color-paper)",
            maxWidth: "18ch",
            textShadow: "0 2px 40px rgba(0,0,0,0.4)",
          }}
        >
          {["Elevate", "your", "business", "with"].map((w, i) => (
            <span
              key={i}
              className="hd-word"
              style={{ display: "inline-block", marginRight: "0.22em" }}
            >
              {w}
            </span>
          ))}
          <br />
          <span
            className="hd-word"
            style={{ display: "inline-block", marginRight: "0.22em" }}
          >
            custom
          </span>
          <span
            className="hd-word"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "1.08em",
            }}
          >
            systems.
          </span>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.5vw, 19px)",
            lineHeight: 1.5,
            color: "rgba(243,239,230,0.82)",
            maxWidth: "48ch",
            margin: 0,
            marginBottom: 36,
            textShadow: "0 1px 20px rgba(0,0,0,0.5)",
          }}
        >
          A UK studio building the operations software, websites and paid
          acquisition that grow ambitious SMEs.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Primary CTA — solid lime */}
          <Link
            href="/contact"
            data-cur="hold"
            data-magnetic=""
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 28px",
              background: "var(--color-red)",
              color: "var(--color-night)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 700,
              borderRadius: 999,
              textDecoration: "none",
              transition: "background 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-red-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-red)";
            }}
          >
            Book a slot
            <span style={{ fontSize: 16 }}>→</span>
          </Link>

          {/* Secondary CTA — glass */}
          <Link
            href="/work"
            data-cur="pen"
            data-magnetic=""
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 28px",
              background: "rgba(243,239,230,0.06)",
              backdropFilter: "blur(14px) saturate(150%)",
              WebkitBackdropFilter: "blur(14px) saturate(150%)",
              border: "1px solid rgba(243,239,230,0.18)",
              color: "var(--color-paper)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 700,
              borderRadius: 999,
              textDecoration: "none",
              transition: "background 0.25s ease, border-color 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(243,239,230,0.12)";
              e.currentTarget.style.borderColor = "rgba(243,239,230,0.28)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(243,239,230,0.06)";
              e.currentTarget.style.borderColor = "rgba(243,239,230,0.18)";
            }}
          >
            See the work
          </Link>
        </div>
      </div>

      {/* Bottom-right scroll cue */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 32,
          zIndex: 4,
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(243,239,230,0.7)",
        }}
      >
        Scroll
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: 1,
            height: 32,
            background: "var(--color-paper)",
            opacity: 0.5,
            animation: "hd-line 2.2s ease-in-out infinite",
            transformOrigin: "top",
          }}
        />
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
