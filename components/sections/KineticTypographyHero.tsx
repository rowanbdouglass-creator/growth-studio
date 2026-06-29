"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * KineticTypographyHero — overlap + real perspective.
 *
 * Each phrase lives in 3D space. Lifecycle:
 *   z = -2500 (far, small, dim)
 *   z =     0 (readable, full opacity)
 *   z =  +470 (close, ~17x apparent size, fading -> 0)
 *
 * With perspective: 500px, z=+470 makes the phrase appear ~17x its
 * base size — which is what fills the screen with letter fragments.
 *
 * Heavy overlap (stagger = 0.28 of timeline) so when panel N is at
 * z≈+400 (huge fragments, opacity ~0.25), panel N+1 is at z=0
 * (readable, opacity 1). That's the layered moment the reference
 * shows.
 *
 * No tags, no scroll cue, no extras. Just text.
 */

const PANELS = [
  ["BESPOKE", "SOFTWARE."],
  ["CUSTOM", "WEBSITES."],
  ["PAID", "TRAFFIC."],
  ["FOR AMBITIOUS", "UK SMES."],
];

const STAGGER = 0.28;

export function KineticTypographyHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;

    if (reduced) {
      gsap.set(".kt-final", { opacity: 1, y: 0 });
      gsap.set(".kt-panel", { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(".kt-panel", { z: -2500, opacity: 0 });
      gsap.set(".kt-final", { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=600%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      PANELS.forEach((_, i) => {
        const start = i * STAGGER;
        // Far -> readable: phrase approaches the camera plane
        tl.fromTo(
          `.kt-panel-${i}`,
          { z: -2500, opacity: 0 },
          { z: 0, opacity: 1, duration: 0.22, ease: "power2.out" },
          start
        );
        // Readable -> huge fragments -> gone
        tl.to(
          `.kt-panel-${i}`,
          { z: 470, opacity: 0, duration: 0.62, ease: "power2.in" },
          start + 0.22
        );
      });

      const finalStart = (PANELS.length - 1) * STAGGER + 0.92;
      tl.to(
        ".kt-final",
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
        finalStart
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        background: "#0E0D0B",
        overflow: "hidden",
        zIndex: 1,
        color: "var(--color-paper)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          perspective: "500px",
          perspectiveOrigin: "50% 50%",
          transformStyle: "preserve-3d",
        }}
      >
        {PANELS.map((lines, i) => (
          <div
            key={i}
            className={`kt-panel kt-panel-${i}`}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transformStyle: "preserve-3d",
              willChange: "transform, opacity",
              pointerEvents: "none",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "clamp(64px, 10vw, 180px)",
                lineHeight: 0.88,
                letterSpacing: "-0.055em",
                color: "var(--color-paper)",
                margin: 0,
                textAlign: "center",
              }}
            >
              {lines.map((line, idx) => (
                <span key={idx} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </h2>
          </div>
        ))}
      </div>

      <div
        className="kt-final"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 100,
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
        </div>
      </div>
    </section>
  );
}
