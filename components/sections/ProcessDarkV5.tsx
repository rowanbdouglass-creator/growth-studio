"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Process — visual STAIRCASE. Five step cards arranged in an
 * ascending zig-zag: each step shifts right by a fixed offset AND
 * up by a fixed offset, creating a literal stair pattern the visitor
 * "climbs" as they scroll. A red ascending line connects the steps
 * diagonally, drawn in as you scroll.
 *
 * No pinning. Each step rises into view with parallax + stagger.
 *
 * Mobile (<880px): vertical stack without the offset (visual stair
 * doesn't read on narrow screens).
 */
const STEPS = [
  { tag: "STEP 01 · MON", label: "Audit", body: "We open your ad accounts, your CRM, your back office. We read the numbers. By Friday you have a written audit of what we found." },
  { tag: "STEP 02 · TUE", label: "Discovery", body: "Two operators, your business, one room. We map the funnel and the back office end to end — and find what's leaking." },
  { tag: "STEP 03 · WED", label: "Quote", body: "Written scope, fixed price for build work, retainer for traffic. In writing, before you pay anything." },
  { tag: "STEP 04 · THU", label: "Decide", body: "You sit with it. You ask the awkward questions. We answer them in writing. No follow-up pressure." },
  { tag: "STEP 05 · FRI", label: "Build", body: "If we're a fit, we start. Sprint planning, Loom updates, weekly reports. Stuff ships. You see it ship." },
];

export function ProcessDarkV5() {
  const ref = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const cards = el.querySelectorAll<HTMLElement>(".pd-step");
    gsap.set(cards, { opacity: 0, y: 100 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      ease: "expo.out",
      duration: 1.1,
      stagger: 0.18,
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    // Draw the diagonal connecting line
    const line = lineRef.current;
    if (line) {
      const length = line.getTotalLength();
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.8,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === el) t.kill();
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
        padding: "clamp(96px, 12vw, 180px) 0 clamp(120px, 14vw, 200px)",
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
          position: "relative",
        }}
      >
        {/* Header */}
        <header style={{ marginBottom: "clamp(72px, 10vw, 140px)", maxWidth: "16ch" }}>
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
            <span style={{ color: "var(--color-red)" }}>●</span> HOW WE WORK
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
            5 steps.<br />
            <span className="serif-italic">No theatre.</span>
          </h2>
        </header>

        {/* Staircase */}
        <div
          className="pd-stair"
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {/* Connecting diagonal line — drawn SVG */}
          <svg
            aria-hidden
            className="pd-line"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
            }}
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <path
              ref={lineRef}
              d="M 5 95 L 25 75 L 45 55 L 65 35 L 85 15"
              stroke="var(--color-red)"
              strokeWidth="0.3"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>

          {STEPS.map((s, i) => (
            <div
              key={i}
              className="pd-step"
              style={{
                position: "relative",
                zIndex: 1,
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: "clamp(20px, 3vw, 56px)",
                alignItems: "start",
                padding: "clamp(20px, 2.4vw, 36px) clamp(24px, 3vw, 48px)",
                marginLeft: `clamp(0px, ${i * 6}vw, ${i * 100}px)`,
                marginTop: i === 0 ? 0 : "clamp(-32px, -2vw, -56px)",
                background: "var(--color-night-soft)",
                border: "1px solid var(--color-hairline)",
                width: "fit-content",
                maxWidth: "min(720px, calc(100% - clamp(0px, " + i * 6 + "vw, " + i * 100 + "px)))",
                willChange: "transform, opacity",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(72px, 8vw, 124px)",
                  color: "var(--color-paper)",
                  lineHeight: 0.84,
                  letterSpacing: "-0.04em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    color: "var(--color-red)",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {s.tag}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 600,
                    fontSize: "clamp(26px, 2.8vw, 40px)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.02,
                    marginBottom: 12,
                    color: "var(--color-paper)",
                  }}
                >
                  {s.label}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(14px, 1.1vw, 16px)",
                    lineHeight: 1.55,
                    color: "var(--color-paper-soft)",
                    maxWidth: "48ch",
                  }}
                >
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 880px) {
            .pd-step { margin-left: 0 !important; margin-top: 16px !important; max-width: 100% !important; }
            .pd-line { display: none; }
          }
        `}</style>
      </div>
    </section>
  );
}
