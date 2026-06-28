"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { APPOINTMENTS } from "@/lib/content/appointments";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Trionn-style horizontal scroll work section.
 *
 * Layout: fixed left panel (title + view-all link) + horizontal track
 * of project cards on the right. Section pins while user scrolls
 * vertically; cards translate horizontally based on scroll progress.
 * Ends with a black panel CTA. Mobile fallback: native vertical stack.
 */
export function WorkHorizontal() {
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
      scrollAmount = track.scrollWidth - window.innerWidth + 200;
    };
    calculate();

    const tween = gsap.to(track, {
      x: () => -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollAmount}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
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

  // Mobile: native vertical stack
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
              <span style={{ color: "var(--color-red)" }}>●</span> SELECTED WORK
            </div>
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 600,
                fontSize: "clamp(2.4rem, 8vw, 4rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
                marginBottom: 32,
              }}
            >
              Selected work &amp;{" "}
              <span className="serif-italic">explorations.</span>
            </h2>
          </header>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {APPOINTMENTS.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/work/${a.slug}`}
                  data-cur="case"
                  style={{
                    display: "block",
                    background: "var(--color-night-soft)",
                    border: "1px solid var(--color-hairline)",
                    padding: 28,
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      color: "var(--color-red)",
                      textTransform: "uppercase",
                      marginBottom: 12,
                    }}
                  >
                    {a.tag}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 600,
                      fontSize: 24,
                      lineHeight: 1.1,
                      letterSpacing: "-0.022em",
                      marginBottom: 24,
                    }}
                  >
                    {a.headline}
                  </h3>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: 40,
                      color: "var(--color-red)",
                      lineHeight: 0.95,
                    }}
                  >
                    {a.outcomeFigure}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.16em",
                      color: "var(--color-dim)",
                      textTransform: "uppercase",
                      marginTop: 6,
                    }}
                  >
                    {a.outcomeLabel}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  // Desktop: pinned horizontal scroll
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
      }}
    >
      <div style={{ display: "flex", height: "100%" }}>
        {/* Fixed left panel */}
        <aside
          style={{
            width: "clamp(320px, 28vw, 480px)",
            padding: "clamp(72px, 9vw, 120px) clamp(32px, 4vw, 72px) clamp(40px, 5vw, 64px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexShrink: 0,
            background: "var(--color-night)",
            zIndex: 2,
            borderRight: "1px solid var(--color-hairline)",
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
              fontSize: "clamp(2.2rem, 3.6vw, 4.4rem)",
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
              marginBottom: 32,
              color: "var(--color-paper)",
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
          <div
            style={{
              marginTop: "auto",
              paddingTop: 24,
              borderTop: "1px solid var(--color-hairline)",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-dim)",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span>{APPOINTMENTS.length} PROJECTS · 2024–2026</span>
            <span>SCROLL ↓ TO PAN →</span>
          </div>
        </aside>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            paddingLeft: "clamp(40px, 5vw, 80px)",
            gap: "clamp(24px, 3vw, 48px)",
            willChange: "transform",
          }}
        >
          {APPOINTMENTS.map((a, i) => (
            <Link
              key={a.slug}
              href={`/work/${a.slug}`}
              data-cur="case"
              style={{
                flexShrink: 0,
                width: "clamp(360px, 32vw, 540px)",
                height: "clamp(440px, 60vh, 640px)",
                position: "relative",
                background: "var(--color-night-soft)",
                border: "1px solid var(--color-hairline)",
                color: "inherit",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                padding: "clamp(28px, 3vw, 44px)",
                transition: "background 0.4s ease, transform 0.4s ease",
                overflow: "hidden",
              }}
              className="wh-card"
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  color: "var(--color-red)",
                  textTransform: "uppercase",
                  marginBottom: 16,
                  fontWeight: 700,
                }}
              >
                {String(i + 1).padStart(2, "0")} / {APPOINTMENTS.length}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-mute)",
                  marginBottom: 14,
                }}
              >
                {a.tag} · {a.client}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 600,
                  fontSize: "clamp(22px, 2.2vw, 32px)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.022em",
                  marginBottom: "auto",
                  color: "var(--color-paper)",
                }}
              >
                {a.headline}
              </h3>
              <div
                style={{
                  marginTop: 24,
                  borderTop: "1px solid var(--color-hairline)",
                  paddingTop: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(36px, 4vw, 56px)",
                    color: "var(--color-red)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {a.outcomeFigure}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    color: "var(--color-dim)",
                    textTransform: "uppercase",
                    marginTop: 8,
                    lineHeight: 1.5,
                  }}
                >
                  {a.outcomeLabel}
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 18,
                  right: 22,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: "var(--color-paper-soft)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                EXPLORE <span style={{ fontSize: 14 }}>↗</span>
              </div>
            </Link>
          ))}

          {/* Black end-of-selection panel */}
          <div
            style={{
              flexShrink: 0,
              width: "clamp(420px, 38vw, 620px)",
              height: "clamp(440px, 60vh, 640px)",
              background: "var(--color-night)",
              border: "1px solid var(--color-hairline)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(40px, 5vw, 80px)",
              marginRight: "clamp(80px, 8vw, 160px)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "var(--color-mute)",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              END OF SELECTION
            </div>
            <h3
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 600,
                fontSize: "clamp(28px, 3vw, 44px)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                marginBottom: 32,
                color: "var(--color-paper)",
                maxWidth: "16ch",
              }}
            >
              Twelve done. Four{" "}
              <span className="serif-italic">worth showing.</span>
            </h3>
            <Link
              href="/work"
              data-cur="hold"
              data-magnetic=""
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 24px",
                background: "var(--color-red)",
                color: "var(--color-paper)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
                borderRadius: 999,
                textDecoration: "none",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-red-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-red)";
              }}
            >
              VIEW ALL WORK <span style={{ fontSize: 14 }}>→</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .wh-card:hover { background: #1B1A17; }
      `}</style>
    </section>
  );
}
