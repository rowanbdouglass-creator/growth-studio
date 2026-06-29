"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * KineticTypographyHero — Z-axis fly-through. Text only, nothing else.
 *
 * Four text layers at different translateZ depths. On scroll the
 * container slides forward in Z, the layers fly past the camera.
 * Final hero settles in once the chain finishes.
 */

const LAYERS = [
  { lines: ["BESPOKE", "SOFTWARE."], z: -4200 },
  { lines: ["CUSTOM", "WEBSITES."], z: -2800 },
  { lines: ["PAID", "TRAFFIC."], z: -1400 },
  { lines: ["FOR AMBITIOUS", "UK SMES."], z: 0 },
];

export function KineticTypographyHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;

    if (reduced) {
      gsap.set(".kt-stage", { z: 4200 });
      gsap.set(".kt-final", { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(".kt-stage", { z: 0 });
      gsap.set(".kt-final", { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      tl.to(".kt-stage", { z: 5200, duration: 0.85, ease: "none" }, 0);
      tl.to(
        ".kt-final",
        { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" },
        0.88
      );
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
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          className="kt-stage"
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {LAYERS.map((layer, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: `translateZ(${layer.z}px)`,
                transformStyle: "preserve-3d",
                pointerEvents: "none",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 800,
                  fontSize: "clamp(72px, 11vw, 200px)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.055em",
                  color:
                    i === LAYERS.length - 1
                      ? "var(--color-red)"
                      : "var(--color-paper)",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                {layer.lines.map((line, idx) => (
                  <span key={idx} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </h2>
            </div>
          ))}
        </div>
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
