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
      {/* DEPTH LAYER 1 — faint calendar grid diagonal at low opacity.
          The brand metaphor as background depth — implies the hero
          sits on a planner page. Tilted -8°, drifts subtly with scroll. */}
      <div
        aria-hidden
        className="hd-grid"
        style={{
          position: "absolute",
          inset: "-20%",
          backgroundImage:
            "linear-gradient(rgba(243,239,230,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(243,239,230,0.045) 1px, transparent 1px)",
          backgroundSize: "120px 70px",
          transform: "rotate(-8deg) translateZ(0)",
          transformOrigin: "center center",
          pointerEvents: "none",
          zIndex: 0,
          willChange: "transform",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* DEPTH LAYER 2 — atmospheric lighting. Warm tungsten key from
          upper-left, cool electric rim from upper-right (suggests
          distant storm). Strong vignette frames the centre. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: [
            "radial-gradient(ellipse 50% 40% at 15% 10%, rgba(255,180,100,0.10) 0%, transparent 60%)",
            "radial-gradient(ellipse 35% 30% at 88% 8%, rgba(120,180,255,0.06) 0%, transparent 65%)",
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(196,71,46,0.08) 0%, transparent 65%)",
            "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(14,13,11,0.4) 100%)",
          ].join(", "),
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* DEPTH LAYER 3 — drifting dust particles in the warm light beam */}
      <div
        aria-hidden
        className="hd-dust"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.4,
          backgroundImage:
            "radial-gradient(circle at 12% 30%, rgba(255,220,180,0.5) 0.5px, transparent 1.5px), radial-gradient(circle at 28% 18%, rgba(255,220,180,0.4) 0.5px, transparent 1.5px), radial-gradient(circle at 22% 55%, rgba(255,220,180,0.6) 0.5px, transparent 2px), radial-gradient(circle at 18% 72%, rgba(255,220,180,0.35) 0.5px, transparent 1.5px), radial-gradient(circle at 32% 88%, rgba(255,220,180,0.5) 0.5px, transparent 1.5px)",
          backgroundSize: "600px 600px",
          animation: "hd-drift 30s linear infinite",
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
        {/* Left-aligned italic serif "you look" — enlarged secondary headline */}
        <span
          className="hd-eyebrow"
          style={{
            display: "block",
            textAlign: "left",
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(48px, 6vw, 112px)",
            color: "var(--color-paper-soft)",
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
            marginBottom: "clamp(8px, 1vw, 16px)",
            paddingLeft: "clamp(8px, 1.5vw, 32px)",
          }}
        >
          you look
        </span>

        {/* Massive BOOKED. — capped so it never overflows horizontal margins.
            14vw stays inside the container at every viewport from 1366 up;
            18rem cap keeps it from getting absurd on ultra-wide. */}
        <h1
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "clamp(3rem, 12vw, 15rem)",
            lineHeight: 1,
            letterSpacing: "-0.06em",
            color: "var(--color-paper)",
            margin: 0,
            textAlign: "center",
            whiteSpace: "nowrap",
            maxWidth: "100%",
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
            color: "var(--color-night)",
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
        @keyframes hd-drift {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-40px, 30px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hd-dust, .hd-grid { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
