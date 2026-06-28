"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

/**
 * v4.1 hero — headline IS the primary element, not an overlay on the
 * wordmark. Trionn pattern: huge type top-left, supporting body bottom,
 * scroll prompt + clear CTA. Wordmark removed from hero entirely (it
 * lives in the header + footer, doesn't need to be the hero gesture).
 */
export function HeroDark() {
  const wrap = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!head.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const eyebrow = head.current.querySelectorAll(".hd-eyebrow");
    const words = head.current.querySelectorAll(".hd-word");
    gsap.fromTo(
      eyebrow,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: "expo.out", delay: 0.1 }
    );
    gsap.fromTo(
      words,
      { y: 80, opacity: 0, filter: "blur(12px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.6,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.35,
      }
    );
  }, []);

  return (
    <section
      ref={wrap}
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        minHeight: "100svh",
        background: "var(--color-night)",
        color: "var(--color-paper)",
        overflow: "hidden",
        isolation: "isolate",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        padding: "clamp(110px, 14vh, 160px) clamp(24px, 4vw, 72px) clamp(40px, 5vw, 64px)",
      }}
    >
      {/* Atmospheric glow behind content */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 80% 20%, rgba(196,71,46,0.10) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(243,239,230,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Headline block — left-aligned 'you look' eyebrow + massive BOOKED. */}
      <div
        ref={head}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          zIndex: 3,
          maxWidth: 1480,
          width: "100%",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Left-aligned italic serif "you look" eyebrow */}
        <span
          className="hd-eyebrow"
          style={{
            display: "block",
            textAlign: "left",
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(20px, 2vw, 32px)",
            color: "var(--color-paper-soft)",
            letterSpacing: "-0.01em",
            lineHeight: 1,
            marginBottom: "clamp(16px, 1.8vw, 32px)",
            paddingLeft: "clamp(8px, 1.5vw, 32px)",
          }}
        >
          you look
        </span>

        {/* Massive BOOKED. — single dominant word, scales to fit viewport.
            Vertical scaleY stretches glyphs taller without overflowing width. */}
        <h1
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "clamp(3.5rem, 12.5vw, 15rem)",
            lineHeight: 1,
            letterSpacing: "-0.06em",
            color: "var(--color-paper)",
            margin: 0,
            textAlign: "center",
            whiteSpace: "nowrap",
            transform: "scaleY(1.5)",
            transformOrigin: "center center",
            padding: "clamp(40px, 5vw, 80px) 0",
          }}
          className="hd-mega"
        >
          <span className="hd-word" style={{ display: "inline-block" }}>
            BOOKED
          </span>
          <span
            className="hd-word serif-italic"
            style={{
              display: "inline-block",
              fontSize: "1em",
              lineHeight: 1,
              marginLeft: "0.02em",
            }}
          >
            .
          </span>
        </h1>
      </div>

      {/* Bottom row: sub + CTA + scroll prompt */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr auto auto",
          gap: "clamp(24px, 4vw, 64px)",
          alignItems: "end",
          zIndex: 3,
          paddingTop: 40,
          borderTop: "1px solid var(--color-hairline)",
          maxWidth: 1480,
          width: "100%",
          margin: "0 auto",
        }}
        className="hd-foot"
      >
        <style>{`@media (max-width: 880px) { .hd-foot { grid-template-columns: 1fr !important; } }`}</style>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.5vw, 19px)",
            lineHeight: 1.5,
            color: "var(--color-paper-soft)",
            maxWidth: "52ch",
            margin: 0,
          }}
        >
          A studio for UK SMEs. We rebuild the{" "}
          <b style={{ color: "var(--color-paper)" }}>website</b>, the{" "}
          <b style={{ color: "var(--color-paper)" }}>operations system</b>, and
          the <b style={{ color: "var(--color-paper)" }}>paid acquisition</b>.
          Then the calendar fills.
        </p>

        <Link
          href="/contact"
          data-cur="hold"
          data-magnetic=""
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            padding: "16px 28px",
            background: "var(--color-red)",
            color: "var(--color-paper)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 700,
            borderRadius: 999,
            transition: "background 0.25s ease, transform 0.25s ease",
            whiteSpace: "nowrap",
            justifySelf: "start",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--color-red-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--color-red)";
          }}
        >
          BOOK A SLOT
          <span style={{ fontSize: 16 }}>→</span>
        </Link>

        <span
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--color-mute)",
            justifySelf: "end",
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
        </span>
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
