"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Kinetic Typography Hero — Monolog-style.
 *
 * Three service panels. Each panel: massive Bricolage word(s) zoom
 * from scale 0.4 → 1 → 28, while a small descriptive sentence fades
 * in over the top, then out. Panels overlap by 30% of their duration
 * so two layers of type are always on screen — the previous panel's
 * big word is still scaling out as the next emerges. Pure type, no
 * imagery, no graphics. The drama is the impossible scale.
 *
 * Pinned section, GSAP ScrollTrigger scrub. Honours reduced motion
 * by skipping the timeline and settling on the final state.
 */

const PANELS = [
  {
    bigLines: ["BESPOKE", "SOFTWARE."],
    tag: "01 · Bespoke Software",
    desc: "Custom operations platforms — quote-to-invoice, stock-per-line, customer portals — built for ambitious UK SMEs.",
  },
  {
    bigLines: ["CUSTOM", "WEBSITES."],
    tag: "02 · Custom Websites",
    desc: "High-converting builds in WordPress and Next.js. Designed to pass the credibility check in 90 seconds.",
  },
  {
    bigLines: ["PAID", "TRAFFIC."],
    tag: "03 · Paid Traffic",
    desc: "Performance acquisition on Meta and Google. Run daily by the two operators who own the work — no account managers.",
  },
];

const PANEL_DURATION = 1.0;
const PANEL_OVERLAP = 0.3;
const PANEL_STRIDE = PANEL_DURATION - PANEL_OVERLAP; // 0.7

export function KineticTypographyHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;

    if (reduced) {
      gsap.set(".kt-final", { opacity: 1, y: 0 });
      gsap.set(".kt-big, .kt-small", { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(".kt-big", { scale: 0.4, opacity: 0 });
      gsap.set(".kt-small", { opacity: 0, y: 20 });
      gsap.set(".kt-final", { opacity: 0, y: 60 });
      gsap.set(".kt-scroll-cue", { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=620%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      tl.to(".kt-scroll-cue", { opacity: 0, duration: 0.08 }, 0);

      PANELS.forEach((_, i) => {
        const start = i * PANEL_STRIDE;

        // Big word: emerge
        tl.fromTo(
          `.kt-big-${i}`,
          { scale: 0.4, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.15, ease: "power2.out" },
          start
        );

        // Small descriptor: fade in just after the big word lands
        tl.fromTo(
          `.kt-small-${i}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" },
          start + 0.22
        );

        // Big word: massive zoom out
        tl.to(
          `.kt-big-${i}`,
          { scale: 28, opacity: 0, duration: 0.55, ease: "power2.in" },
          start + 0.35
        );

        // Small descriptor: fade out as the next panel approaches
        tl.to(
          `.kt-small-${i}`,
          { opacity: 0, duration: 0.18, ease: "power2.in" },
          start + 0.62
        );
      });

      // Final hero
      const finalStart = PANELS.length * PANEL_STRIDE + 0.05;
      tl.to(".kt-final", { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, finalStart);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-bg="dark"
      data-hide-site-header
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        background: "#000",
        overflow: "hidden",
        color: "var(--color-paper)",
        zIndex: 1,
      }}
    >
      {/* Top-left tag */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 32,
          zIndex: 30,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(243,239,230,0.6)",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 10,
          mixBlendMode: "difference",
        }}
      >
        <span
          aria-hidden
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--color-red)",
            boxShadow: "0 0 10px rgba(180,232,19,0.6)",
          }}
        />
        <span style={{ color: "var(--color-paper)", fontWeight: 700 }}>ylb</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span>v6 prototype</span>
      </div>

      {/* Top-right indicator */}
      <div
        style={{
          position: "absolute",
          top: 28,
          right: 32,
          zIndex: 30,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(243,239,230,0.45)",
          fontWeight: 600,
          mixBlendMode: "difference",
        }}
      >
        scroll · 01 → 03
      </div>

      {/* Big zooming words */}
      {PANELS.map((p, i) => (
        <div
          key={`big-${i}`}
          className={`kt-big kt-big-${i}`}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 4 + i,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            willChange: "transform, opacity",
            transformOrigin: "center center",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(72px, 13vw, 220px)",
              lineHeight: 0.9,
              letterSpacing: "-0.055em",
              color: "var(--color-paper)",
              margin: 0,
              textAlign: "center",
              textShadow: "0 0 80px rgba(243,239,230,0.06)",
            }}
          >
            {p.bigLines.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < p.bigLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>
      ))}

      {/* Small descriptors */}
      {PANELS.map((p, i) => (
        <div
          key={`small-${i}`}
          className={`kt-small kt-small-${i}`}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 clamp(24px, 4vw, 72px)",
            pointerEvents: "none",
            willChange: "opacity, transform",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--color-red)",
              fontWeight: 700,
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 32,
                height: 1,
                background: "var(--color-red)",
              }}
            />
            {p.tag}
            <span
              aria-hidden
              style={{
                width: 32,
                height: 1,
                background: "var(--color-red)",
              }}
            />
          </div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(17px, 1.6vw, 24px)",
              lineHeight: 1.45,
              color: "var(--color-paper)",
              maxWidth: "44ch",
              textAlign: "center",
              margin: 0,
              fontWeight: 400,
              textShadow: "0 2px 24px rgba(0,0,0,0.85)",
            }}
          >
            {p.desc}
          </p>
        </div>
      ))}

      {/* Scroll cue */}
      <div
        className="kt-scroll-cue"
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(243,239,230,0.6)",
          fontWeight: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          pointerEvents: "none",
        }}
      >
        Scroll
        <span
          aria-hidden
          style={{
            width: 1,
            height: 36,
            background: "var(--color-red)",
            opacity: 0.7,
            animation: "kt-line 1.8s ease-in-out infinite",
            transformOrigin: "top",
          }}
        />
      </div>

      {/* Final hero */}
      <div
        className="kt-final"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 clamp(24px, 4vw, 72px)",
          gap: 28,
          pointerEvents: "none",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 600,
            fontSize: "clamp(2.4rem, 5vw, 5.4rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "var(--color-paper)",
            margin: 0,
            maxWidth: "16ch",
          }}
        >
          Bespoke{" "}
          <span style={{ color: "var(--color-red)" }}>software.</span> Custom{" "}
          <span style={{ color: "var(--color-red)" }}>websites.</span> Paid{" "}
          <span style={{ color: "var(--color-red)" }}>traffic.</span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.4vw, 19px)",
            color: "rgba(243,239,230,0.7)",
            maxWidth: "48ch",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          A UK studio. Two operators. Direct line. Built for ambitious SMEs.
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
            pointerEvents: "auto",
          }}
        >
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
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
            }}
          >
            Book a slot <span>→</span>
          </Link>
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 28px",
              background: "rgba(243,239,230,0.06)",
              border: "1px solid rgba(243,239,230,0.18)",
              color: "var(--color-paper)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 700,
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            See the work
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes kt-line {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}
