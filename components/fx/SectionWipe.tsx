"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Wraps a section so that on scroll-into-view, it reveals via a
 * clip-path wipe (from the bottom up, like turning a page). The first
 * 25% of the section being visible drives 0→100% clip reveal.
 *
 * Use to chain coloured sections so transitions feel like turning
 * pages of a calendar rather than stacked divs.
 */
export function SectionWipe({
  children,
  direction = "up",
  className,
  style,
  dataBg,
  dataSurface,
}: {
  children: React.ReactNode;
  /** which edge the wipe enters from */
  direction?: "up" | "down" | "left";
  className?: string;
  style?: React.CSSProperties;
  dataBg?: "light" | "dark" | "red" | "slip";
  dataSurface?: "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const startClip =
      direction === "down"
        ? "inset(0 0 100% 0)"
        : direction === "left"
          ? "inset(0 100% 0 0)"
          : "inset(100% 0 0 0)";

    gsap.set(el, { clipPath: startClip, willChange: "clip-path" });

    const tween = gsap.to(el, {
      clipPath: "inset(0 0 0 0)",
      ease: "expo.out",
      duration: 1.2,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        end: "top 35%",
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [direction]);

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      data-bg={dataBg}
      data-surface={dataSurface}
    >
      {children}
    </div>
  );
}
