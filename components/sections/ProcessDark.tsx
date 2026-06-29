"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Process — pinned scroll-driven 5-step reveal.
 *
 * Section pins for 500vh. Left half: a single massive serif italic
 * number that morphs 01 → 02 → 03 → 04 → 05 as the user scrolls,
 * with a smooth cross-fade between adjacent numbers. Right half: the
 * matching step content swaps in sync — day label + name + body +
 * a thin progress bar at the bottom showing position in the sequence.
 *
 * Mobile fallback (<880px): native vertical stack, no scroll-pinning.
 */
const STEPS = [
  {
    day: "STEP 01 · MON",
    label: "Audit",
    body: "We open your ad accounts, your CRM, your back office. We read the numbers. By Friday you have a written audit of what we found.",
  },
  {
    day: "STEP 02 · TUE",
    label: "Discovery",
    body: "Two operators, your business, one room. We map the funnel and the back office end to end — and find what's leaking.",
  },
  {
    day: "STEP 03 · WED",
    label: "Quote",
    body: "Written scope, fixed price for build work, retainer for traffic. In writing, before you pay anything.",
  },
  {
    day: "STEP 04 · THU",
    label: "Decide",
    body: "You sit with it. You ask the awkward questions. We answer them in writing. No follow-up pressure.",
  },
  {
    day: "STEP 05 · FRI",
    label: "Build",
    body: "If we're a fit, we start. Sprint planning, Loom updates, weekly reports. Stuff ships. You see it ship.",
  },
];

export function ProcessDark() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsDesktop(window.matchMedia("(min-width: 880px)").matches);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !isDesktop) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Map progress 0 → 1 across the pinned region to a step index
        const idx = Math.min(
          STEPS.length - 1,
          Math.floor(self.progress * STEPS.length * 0.999)
        );
        setActiveStep(idx);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isDesktop]);

  // Mobile: clean vertical stack
  if (!isDesktop) {
    return (
      <section
        data-bg="dark"
        data-surface="dark"
        style={{
          padding: "clamp(72px, 9vw, 140px) 0",
          background: "var(--color-night)",
          color: "var(--color-paper)",
          borderBottom: "1px solid var(--color-hairline)",
        }}
      >
        <div
          style={{
            maxWidth: 1480,
            margin: "0 auto",
            padding: "0 clamp(24px, 4vw, 72px)",
          }}
        >
          <header style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
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
                fontSize: "clamp(2.4rem, 8vw, 4rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
              }}
            >
              5 steps.
              <br />
              <span className="serif-italic">No theatre.</span>
            </h2>
          </header>
          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {STEPS.map((s, i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "70px 1fr",
                  gap: 20,
                  padding: "28px 0",
                  borderTop: "1px solid var(--color-hairline)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: 56,
                    color: "var(--color-paper)",
                    lineHeight: 0.84,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.2em",
                      color: "var(--color-red)",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    {s.day}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 600,
                      fontSize: 28,
                      marginTop: 10,
                      marginBottom: 12,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {s.label}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "var(--color-paper-soft)",
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  // Desktop: pinned 500vh with cross-faded step swap
  const current = STEPS[activeStep];
  const progressPct = ((activeStep + 1) / STEPS.length) * 100;

  return (
    <section
      ref={sectionRef}
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        height: `${STEPS.length * 100}vh`,
        background: "var(--color-night)",
        color: "var(--color-paper)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          padding: "clamp(80px, 10vw, 140px) clamp(32px, 5vw, 96px)",
          gap: "clamp(40px, 6vw, 96px)",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Top eyebrow positioned absolutely so it sits above both columns */}
        <div
          style={{
            position: "absolute",
            top: "clamp(48px, 6vh, 80px)",
            left: "clamp(32px, 5vw, 96px)",
            right: "clamp(32px, 5vw, 96px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--color-mute)",
          }}
        >
          <span>
            <span style={{ color: "var(--color-red)" }}>●</span> HOW WE WORK
          </span>
          <span>
            {String(activeStep + 1).padStart(2, "0")} / {STEPS.length}
          </span>
        </div>

        {/* LEFT — massive morphing serif number */}
        <div
          style={{
            position: "relative",
            display: "grid",
            placeItems: "center",
            height: "70vh",
          }}
        >
          {STEPS.map((_, i) => (
            <span
              key={i}
              aria-hidden
              style={{
                gridArea: "1 / 1",
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(220px, 32vw, 520px)",
                lineHeight: 0.82,
                letterSpacing: "-0.05em",
                color: "var(--color-paper)",
                opacity: i === activeStep ? 1 : 0,
                transform:
                  i === activeStep
                    ? "translateY(0) scale(1)"
                    : i < activeStep
                      ? "translateY(-40px) scale(0.94)"
                      : "translateY(40px) scale(0.94)",
                transition:
                  "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform, opacity",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
        </div>

        {/* RIGHT — swapping content panel */}
        <div
          style={{
            position: "relative",
            height: "70vh",
            display: "grid",
            placeItems: "start",
          }}
        >
          <div style={{ alignSelf: "center", maxWidth: 520 }}>
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 600,
                fontSize: "clamp(2.6rem, 4.6vw, 5.6rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                marginBottom: 32,
                color: "var(--color-paper)",
              }}
            >
              5 steps.
              <br />
              <span className="serif-italic">No theatre.</span>
            </h2>

            {/* swap container — each step fades through this single block */}
            <div style={{ position: "relative", minHeight: 220 }}>
              {STEPS.map((s, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: i === activeStep ? 1 : 0,
                    transform: `translateY(${i === activeStep ? 0 : 16}px)`,
                    transition:
                      "opacity 0.55s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                    pointerEvents: i === activeStep ? "auto" : "none",
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
                      marginBottom: 14,
                    }}
                  >
                    {s.day}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 600,
                      fontSize: "clamp(40px, 4.8vw, 72px)",
                      lineHeight: 0.96,
                      letterSpacing: "-0.035em",
                      marginBottom: 24,
                      color: "var(--color-paper)",
                    }}
                  >
                    {s.label}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(15px, 1.3vw, 18px)",
                      lineHeight: 1.6,
                      color: "var(--color-paper-soft)",
                      maxWidth: "48ch",
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(48px, 6vh, 80px)",
            left: "clamp(32px, 5vw, 96px)",
            right: "clamp(32px, 5vw, 96px)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-mute)",
            fontWeight: 600,
          }}
        >
          <span>{current.day}</span>
          <span
            style={{
              flex: 1,
              position: "relative",
              height: 1,
              background: "var(--color-hairline)",
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: `${progressPct}%`,
                background: "var(--color-red)",
                transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </span>
          <span style={{ color: "var(--color-paper)" }}>{current.label.toUpperCase()}</span>
        </div>
      </div>
    </section>
  );
}
