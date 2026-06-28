"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { APPOINTMENTS } from "@/lib/content/appointments";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * WorkRiseUp — pinned 50/50 split. Left panel fixed title + view-all.
 * Right panel is a stacking list of project cards that RISE UP from
 * nothing (opacity 0 + y +80px) as the user scrolls, joining the
 * visible stack one at a time. When the last card lands, pin releases
 * and the page falls through into a dark empty section.
 *
 * Mobile fallback (<880px): native vertical stack, no scroll-pinning.
 */
export function WorkRiseUp() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsDesktop(window.matchMedia("(min-width: 880px)").matches);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list || !isDesktop) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cards = list.querySelectorAll<HTMLElement>(".ru-card");
    if (!cards.length) return;

    if (reduced) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(cards, { opacity: 0, y: 100 });

    // Pin the section for (cards × 60vh) extra scroll, animating each
    // card up in sequence with scrub.
    const tween = gsap.to(cards, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      stagger: 1,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${cards.length * window.innerHeight * 0.65}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isDesktop]);

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

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {APPOINTMENTS.map((a) => (
              <li key={a.slug}>
                <Link href={`/work/${a.slug}`} data-cur="case" style={cardStyle}>
                  {renderCardContent(a)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  // Desktop: pinned 50/50 with rise-up cards
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
        display: "flex",
      }}
    >
      {/* Left half: title + view all, centered vertically */}
      <aside
        style={{
          width: "50%",
          padding: "clamp(72px, 9vw, 120px) clamp(32px, 4vw, 72px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexShrink: 0,
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
            fontSize: "clamp(2.4rem, 4.4vw, 5rem)",
            lineHeight: 0.96,
            letterSpacing: "-0.03em",
            marginBottom: 36,
            color: "var(--color-paper)",
            maxWidth: "14ch",
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
      </aside>

      {/* Right half: rising stack of cards */}
      <div
        style={{
          width: "50%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          padding: "clamp(40px, 5vw, 80px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 16,
        }}
        ref={listRef}
      >
        {APPOINTMENTS.map((a, i) => (
          <Link
            key={a.slug}
            href={`/work/${a.slug}`}
            data-cur="case"
            className="ru-card"
            style={{
              ...cardStyle,
              willChange: "transform, opacity",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "var(--color-red)",
                textTransform: "uppercase",
                marginBottom: 8,
                fontWeight: 700,
              }}
            >
              {String(i + 1).padStart(2, "0")} / {APPOINTMENTS.length}
            </div>
            {renderCardContent(a)}
          </Link>
        ))}
      </div>
    </section>
  );
}

const cardStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "center",
  gap: 24,
  padding: "clamp(20px, 2.2vw, 32px)",
  background: "var(--color-night-soft)",
  border: "1px solid var(--color-hairline)",
  color: "inherit",
  textDecoration: "none",
  transition: "background 0.4s ease",
};

type Appointment = (typeof APPOINTMENTS)[number];

function renderCardContent(a: Appointment) {
  return (
    <>
      <div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-mute)",
            marginBottom: 8,
          }}
        >
          {a.tag} · {a.client}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 600,
            fontSize: "clamp(18px, 1.6vw, 24px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--color-paper)",
            margin: 0,
          }}
        >
          {a.headline}
        </h3>
      </div>
      <div style={{ textAlign: "right", minWidth: 100 }}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(28px, 2.6vw, 40px)",
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
            fontSize: 9,
            letterSpacing: "0.16em",
            color: "var(--color-dim)",
            textTransform: "uppercase",
            marginTop: 4,
          }}
        >
          {a.outcomeLabel}
        </div>
      </div>
    </>
  );
}
