"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

/**
 * Infinite horizontal marquee. Doubles the content for seamless loop.
 * Honors prefers-reduced-motion (static).
 */

interface MarqueeProps {
  duration?: number;
  direction?: 1 | -1;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

export function Marquee({
  duration = 22,
  direction = -1,
  className = "",
  innerClassName = "",
  children,
}: MarqueeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      if (!trackRef.current) return;
      const half = trackRef.current.scrollWidth / 2;
      gsap.fromTo(
        trackRef.current,
        { x: direction > 0 ? 0 : -half },
        {
          x: direction > 0 ? -half : 0,
          duration,
          ease: "none",
          repeat: -1,
        }
      );
    },
    { scope: wrapRef, dependencies: [duration, direction] }
  );

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className={`inline-flex whitespace-nowrap ${innerClassName}`}>
        {children}
        {children}
      </div>
    </div>
  );
}
