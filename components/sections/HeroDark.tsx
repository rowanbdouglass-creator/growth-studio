"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

/**
 * Hero v7 — transparent section that sits over the shared
 * <VideoBackdrop>. The backdrop persists across sections 01-03,
 * so this hero no longer renders its own video. Keeps the glass
 * nav + content + gradient veil for legibility.
 */

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
        zIndex: 1,
        minHeight: "100svh",
        background: "transparent",
        color: "var(--color-paper)",
        overflow: "hidden",
      }}
    >
      {/* Gradient — dim top for header legibility, gentle deepen at the
          bottom so it leads cleanly into section 02 WITHOUT killing the
          shared video backdrop (no full-black floor any more). */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(14,13,11,0.55) 0%, rgba(14,13,11,0.20) 28%, rgba(14,13,11,0.35) 65%, rgba(14,13,11,0.65) 100%)",
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

      {/* HERO CONTENT — left-aligned, vertically centered (matches reference) */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(140px, 16vh, 200px) clamp(24px, 4vw, 64px) clamp(48px, 8vh, 96px)",
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
