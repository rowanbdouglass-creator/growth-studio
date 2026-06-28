"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroMark } from "@/components/fx/HeroMark";

/**
 * v4 hero — floating wordmark, single editorial headline overlaid,
 * meta strip top, scroll prompt bottom. Cinematic dark atmosphere.
 */
export function HeroDark() {
  const wrap = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headline.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const words = headline.current.querySelectorAll(".hd-word");
    gsap.fromTo(
      words,
      { y: 40, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.07,
        delay: 1.8,
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
        minHeight: "100vh",
        background: "var(--color-night)",
        color: "var(--color-paper)",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <HeroMark />

      {/* Top meta strip */}
      <div
        style={{
          position: "absolute",
          top: "min(120px, 18vh)",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          padding: "0 clamp(24px, 4vw, 72px)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--color-mute)",
          zIndex: 3,
        }}
      >
        <span>
          <span style={{ color: "var(--color-red)" }}>●</span>{" "}
          AVAILABLE FROM WEEK 28
        </span>
        <span>UK · EST. 2024</span>
      </div>

      {/* Headline overlay — centered, sits in front of wordmark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 clamp(24px, 4vw, 72px)",
          zIndex: 4,
          pointerEvents: "none",
        }}
      >
        <h1
          ref={headline}
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 600,
            fontSize: "clamp(2.2rem, 4.4vw, 4.4rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            textAlign: "center",
            maxWidth: "22ch",
            color: "var(--color-paper)",
            mixBlendMode: "screen",
          }}
        >
          {["We", "make", "UK", "SMEs"].map((w, i) => (
            <span
              key={i}
              className="hd-word"
              style={{ display: "inline-block", marginRight: "0.25em" }}
            >
              {w}
            </span>
          ))}
          <span
            className="hd-word"
            style={{ display: "inline-block", marginRight: "0.25em" }}
          >
            look
          </span>
          <span
            className="hd-word serif-italic"
            style={{
              display: "inline-block",
              fontSize: "1.15em",
              lineHeight: 0.9,
            }}
          >
            booked.
          </span>
        </h1>
        <p
          style={{
            marginTop: 32,
            maxWidth: "46ch",
            textAlign: "center",
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.4vw, 18px)",
            lineHeight: 1.5,
            color: "var(--color-mute)",
            opacity: 0,
            animation: "hd-fade 1.4s ease 2.8s forwards",
          }}
        >
          A studio for UK SMEs. We rebuild the website, the operations
          system, and the paid acquisition — and the calendar fills.
        </p>
      </div>

      {/* Scroll prompt bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--color-mute)",
          opacity: 0,
          animation: "hd-fade 1.6s ease 3.2s forwards",
          zIndex: 3,
        }}
      >
        <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          Scroll
          <span
            style={{
              display: "inline-block",
              width: 1,
              height: 36,
              background: "var(--color-paper)",
              opacity: 0.5,
              animation: "hd-line 2.2s ease-in-out infinite",
              transformOrigin: "top",
            }}
          />
        </span>
      </div>

      <style>{`
        @keyframes hd-fade { to { opacity: 1; } }
        @keyframes hd-line {
          0% { transform: scaleY(0); }
          50% { transform: scaleY(1); }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}
