"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/content/services";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Services — three asymmetric editorial "posters" in a zig-zag spread.
 * Each card is full-bleed visual with its own brand-coloured gradient,
 * massive service number, large display name, body, outcome figure,
 * and READ MORE link. Cards alternate alignment (left / right / left)
 * and have subtle parallax scroll depth — outer cards scroll slightly
 * slower than the page, creating layered movement without pinning.
 *
 * Distinctly different from the Process staircase: this is editorial
 * magazine layout, not a kinetic reveal.
 */
const VISUALS: Record<string, { bg: string; accent: string }> = {
  "custom-systems": {
    bg: "linear-gradient(135deg, #1A1816 0%, #2D2925 60%, #3D362E 100%)",
    accent: "#B4E813",
  },
  "website-design": {
    bg: "linear-gradient(135deg, #161812 0%, #1F2418 60%, #2A3220 100%)",
    accent: "#B4E813",
  },
  "paid-traffic": {
    bg: "linear-gradient(135deg, #1A1A16 0%, #2A2820 60%, #3A3624 100%)",
    accent: "#B4E813",
  },
};

const ALIGN = ["left", "right", "left"] as const;

export function ServicesDarkV5() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const cards = el.querySelectorAll<HTMLElement>(".sv-poster");

    // Entry: each poster rises + tilts slightly into view
    cards.forEach((card, i) => {
      const startRotate = i % 2 === 0 ? -1.5 : 1.5;
      gsap.set(card, { opacity: 0, y: 120, rotate: startRotate });
      gsap.to(card, {
        opacity: 1,
        y: 0,
        rotate: 0,
        ease: "expo.out",
        duration: 1.4,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    // Parallax: posters at different scroll depths for layered feel
    cards.forEach((card, i) => {
      const speed = i === 1 ? -30 : 30; // alternating direction
      gsap.to(card, {
        y: speed,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        const trigger = t.vars.trigger;
        if (trigger instanceof Element && el.contains(trigger)) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={ref}
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        padding: "clamp(96px, 12vw, 180px) 0",
        background: "var(--color-night)",
        color: "var(--color-paper)",
        borderBottom: "1px solid var(--color-hairline)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 72px)",
        }}
      >
        <header style={{ marginBottom: "clamp(72px, 9vw, 120px)", maxWidth: "18ch" }}>
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
            <span style={{ color: "var(--color-red)" }}>●</span> WHAT WE DO
          </div>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 600,
              fontSize: "clamp(2.6rem, 5.4vw, 6rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "var(--color-paper)",
            }}
          >
            Three things.<br />
            <span className="serif-italic">Done well.</span>
          </h2>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(64px, 8vw, 120px)" }}>
          {SERVICES.map((s, i) => {
            const v = VISUALS[s.slug] ?? VISUALS["custom-systems"];
            const align = ALIGN[i % ALIGN.length];
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                data-cur="case"
                className="sv-poster"
                style={{
                  display: "block",
                  position: "relative",
                  width: "min(820px, 88%)",
                  marginLeft: align === "left" ? 0 : "auto",
                  marginRight: align === "right" ? 0 : "auto",
                  aspectRatio: "16 / 10",
                  background: v.bg,
                  border: "1px solid var(--color-hairline)",
                  overflow: "hidden",
                  isolation: "isolate",
                  color: "inherit",
                  textDecoration: "none",
                  willChange: "transform, opacity",
                  transition: "border-color 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-red)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-hairline)";
                }}
              >
                {/* Noise texture */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.5,
                    mixBlendMode: "overlay",
                    pointerEvents: "none",
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
                    backgroundSize: "240px",
                  }}
                />

                {/* Bottom gradient for text legibility */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 50%, rgba(0,0,0,0.75) 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Top-left: massive service number */}
                <div
                  style={{
                    position: "absolute",
                    top: "clamp(24px, 3vw, 48px)",
                    left: "clamp(24px, 3vw, 48px)",
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      color: "var(--color-red)",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      marginBottom: 8,
                    }}
                  >
                    SERVICE {s.number}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(96px, 10vw, 180px)",
                      lineHeight: 0.84,
                      letterSpacing: "-0.04em",
                      color: "var(--color-paper)",
                      opacity: 0.95,
                    }}
                  >
                    {s.number}
                  </div>
                </div>

                {/* Top-right: outcome figure stamp */}
                <div
                  style={{
                    position: "absolute",
                    top: "clamp(24px, 3vw, 48px)",
                    right: "clamp(24px, 3vw, 48px)",
                    zIndex: 2,
                    textAlign: "right",
                    maxWidth: "40%",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      color: "var(--color-dim)",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    PROOF
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 700,
                      fontSize: "clamp(36px, 3.8vw, 60px)",
                      lineHeight: 0.9,
                      letterSpacing: "-0.03em",
                      color: "var(--color-red)",
                    }}
                  >
                    {s.proofFigure}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      letterSpacing: "0.16em",
                      color: "var(--color-mute)",
                      textTransform: "uppercase",
                      marginTop: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    {s.proofLabel}
                  </div>
                </div>

                {/* Bottom-left: service name + body + read more */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "clamp(24px, 3vw, 48px)",
                    left: "clamp(24px, 3vw, 48px)",
                    right: "clamp(24px, 3vw, 48px)",
                    zIndex: 2,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 600,
                      fontSize: "clamp(32px, 4vw, 64px)",
                      lineHeight: 0.96,
                      letterSpacing: "-0.035em",
                      color: "var(--color-paper)",
                      marginBottom: 14,
                      textShadow: "0 2px 30px rgba(0,0,0,0.6)",
                    }}
                  >
                    {s.shortName}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(13px, 1vw, 15px)",
                      lineHeight: 1.5,
                      color: "var(--color-paper-soft)",
                      maxWidth: "52ch",
                      marginBottom: 20,
                      textShadow: "0 1px 12px rgba(0,0,0,0.5)",
                    }}
                  >
                    {s.body}
                  </p>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--color-paper)",
                      fontWeight: 700,
                      borderBottom: "1px solid var(--color-paper)",
                      paddingBottom: 4,
                    }}
                  >
                    READ MORE <span style={{ fontSize: 14 }}>→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
