"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/content/services";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Services — pinned scroll-driven 3-service reveal (mirrors the new
 * ProcessDark pattern). Section pins for 300vh; massive serif italic
 * service number morphs 01 → 02 → 03 on the left as the user scrolls,
 * matching service content swaps on the right in sync.
 *
 * Mobile (<880px): clean vertical card list, no pinning.
 */
export function ServicesDark() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const [active, setActive] = useState(0);

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
        const idx = Math.min(
          SERVICES.length - 1,
          Math.floor(self.progress * SERVICES.length * 0.999)
        );
        setActive(idx);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isDesktop]);

  // Mobile: vertical stack
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
              <span style={{ color: "var(--color-red)" }}>●</span> WHAT WE DO
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
              Three things.
              <br />
              <span className="serif-italic">Done well.</span>
            </h2>
          </header>
          {SERVICES.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              data-cur="case"
              style={{
                display: "grid",
                gridTemplateColumns: "70px 1fr",
                gap: 20,
                padding: "28px 0",
                borderTop: "1px solid var(--color-hairline)",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 56,
                  color: "var(--color-red)",
                  lineHeight: 0.84,
                }}
              >
                {s.number}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 600,
                    fontSize: 28,
                    marginBottom: 12,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {s.shortName}
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
            </Link>
          ))}
        </div>
      </section>
    );
  }

  // Desktop: pinned 300vh with cross-faded service swap
  const current = SERVICES[active];
  const progressPct = ((active + 1) / SERVICES.length) * 100;

  return (
    <section
      ref={sectionRef}
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        height: `${SERVICES.length * 100}vh`,
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
        {/* Top eyebrow */}
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
            <span style={{ color: "var(--color-red)" }}>●</span> WHAT WE DO
          </span>
          <span>
            {String(active + 1).padStart(2, "0")} / {SERVICES.length}
          </span>
        </div>

        {/* LEFT — massive morphing serif service number */}
        <div
          style={{
            position: "relative",
            display: "grid",
            placeItems: "center",
            height: "70vh",
          }}
        >
          {SERVICES.map((_, i) => (
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
                opacity: i === active ? 1 : 0,
                transform:
                  i === active
                    ? "translateY(0) scale(1)"
                    : i < active
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
          <div style={{ alignSelf: "center", maxWidth: 540 }}>
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
              Three things.
              <br />
              <span className="serif-italic">Done well.</span>
            </h2>

            {/* swap container */}
            <div style={{ position: "relative", minHeight: 260 }}>
              {SERVICES.map((s, i) => (
                <div
                  key={s.slug}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: i === active ? 1 : 0,
                    transform: `translateY(${i === active ? 0 : 16}px)`,
                    transition:
                      "opacity 0.55s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                    pointerEvents: i === active ? "auto" : "none",
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
                    SERVICE {s.number} · {s.fullName}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 600,
                      fontSize: "clamp(36px, 4vw, 56px)",
                      lineHeight: 0.98,
                      letterSpacing: "-0.035em",
                      marginBottom: 20,
                      color: "var(--color-paper)",
                    }}
                  >
                    {s.shortName}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(15px, 1.3vw, 18px)",
                      lineHeight: 1.6,
                      color: "var(--color-paper-soft)",
                      marginBottom: 28,
                      maxWidth: "48ch",
                    }}
                  >
                    {s.body}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: 24,
                      alignItems: "baseline",
                      paddingTop: 20,
                      borderTop: "1px solid var(--color-hairline)",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          letterSpacing: "0.18em",
                          color: "var(--color-dim)",
                          textTransform: "uppercase",
                          marginBottom: 6,
                        }}
                      >
                        PROOF
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontStyle: "italic",
                          fontSize: "clamp(28px, 2.8vw, 40px)",
                          color: "var(--color-red)",
                          lineHeight: 0.95,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {s.proofFigure}
                      </div>
                    </div>
                    <Link
                      href={`/services/${s.slug}`}
                      data-cur="case"
                      style={{
                        marginLeft: "auto",
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--color-paper)",
                        fontWeight: 700,
                        borderBottom: "1px solid var(--color-paper)",
                        paddingBottom: 4,
                        textDecoration: "none",
                        alignSelf: "end",
                      }}
                    >
                      READ MORE →
                    </Link>
                  </div>
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
          <span>SERVICE {current.number}</span>
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
          <span style={{ color: "var(--color-paper)" }}>
            {current.shortName.toUpperCase()}
          </span>
        </div>
      </div>
    </section>
  );
}
