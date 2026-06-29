"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface ScrollWordRevealProps {
  /** The text — will be split into words, each fades from dim to paper as you scroll */
  text: string;
  /** Optional Tailwind class for sizing */
  className?: string;
  /** Optional style overrides */
  style?: React.CSSProperties;
  /** Pin the section while scrub runs (Monolog-style) */
  pin?: boolean;
  /** Inline render the dimmed/revealed text */
  as?: "p" | "h2" | "h3";
}

/**
 * Scroll-driven word-by-word reveal. Each word starts at low opacity and
 * resolves to full as you scroll past it. The reveal scrubs to scroll
 * position (no auto-play). Inspired by Monolog / Trionn / Mediashock.
 */
export function ScrollWordReveal({
  text,
  className,
  style,
  pin = false,
  as = "p",
}: ScrollWordRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const Tag = as;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const words = wrap.querySelectorAll<HTMLElement>(".swr-word");
    if (!words.length) return;

    gsap.set(words, { opacity: 0.22 });

    const tween = gsap.to(words, {
      opacity: 1,
      ease: "none",
      stagger: { each: 1, from: "start" },
      scrollTrigger: {
        trigger: wrap,
        start: "top 85%",
        end: "bottom 55%",
        scrub: 0.6,
        pin,
        pinSpacing: pin,
        anticipatePin: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [pin]);

  // Split text into words while preserving inline serif-italic emphasis markers (*word*).
  const parts = text.split(/(\*[^*]+\*)/g);

  return (
    <div ref={wrapRef} className={className} style={style}>
      <Tag style={{ display: "inline" }}>
        {parts.map((part, i) => {
          if (part.startsWith("*") && part.endsWith("*")) {
            const inner = part.slice(1, -1);
            return inner.split(/\s+/).map((w, j) => (
              <span
                key={`${i}-${j}`}
                className="swr-word serif-italic"
                style={{ display: "inline-block", marginRight: "0.18em" }}
              >
                {w}
              </span>
            ));
          }
          return part.split(/\s+/).map((w, j) =>
            w ? (
              <span
                key={`${i}-${j}`}
                className="swr-word"
                style={{ display: "inline-block", marginRight: "0.22em" }}
              >
                {w}
              </span>
            ) : null
          );
        })}
      </Tag>
    </div>
  );
}
