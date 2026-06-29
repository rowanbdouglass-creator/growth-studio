"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Single unified section-entry pattern: gentle fade-up with subtle
 * y-offset, expo.out easing, triggered when the section enters the
 * viewport. Used uniformly across the home page to satisfy the
 * motion-consistency UX rule — every section enters the same way,
 * so direction stays meaningful (down = forward through the story).
 *
 * Reduced-motion: renders flat, no animation.
 */
export function SectionEntry({
  children,
  className,
  style,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.set(el, { opacity: 0, y: 48 });
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      ease: "expo.out",
      duration: 1.1,
      delay,
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
