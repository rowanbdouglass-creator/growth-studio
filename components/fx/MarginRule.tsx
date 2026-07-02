"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * MarginRule — the homepage's fixed margin rule at left 12% (the same
 * rhythm as the hero's ruled-paper rule). An accent line inside it
 * draws top-to-bottom (scaleY 0 to 1), scrubbed across the WHOLE
 * document, so the margin fills as the ledger page is read. Desktop +
 * motion only; the base hairline is static and the accent line stays
 * hidden otherwise. Fixed + pointer-events-none: zero layout impact.
 */
export function MarginRule() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const line = lineRef.current;
    if (!line) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-[12%] top-0 z-40 hidden h-[100dvh] w-px lg:block"
    >
      <div className="absolute inset-0 w-px bg-hairline" />
      <div
        ref={lineRef}
        className="absolute inset-0 w-px origin-top scale-y-0 bg-accent-text"
      />
    </div>
  );
}
