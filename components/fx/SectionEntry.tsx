"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Variant =
  | "tilt-left" // enters tilted from upper-left
  | "tilt-right" // enters tilted from right with snap
  | "rise-stagger" // children rise from below with stagger
  | "scatter" // children fall in from random directions
  | "fade-up"; // simple fade and rise

interface Props {
  children: React.ReactNode;
  variant?: Variant;
  /** CSS selector for child elements that should be staggered (rise-stagger / scatter) */
  staggerSelector?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Wraps a section in a GSAP ScrollTrigger entry animation. Each variant
 * applies a different motion language so the page doesn't read as a
 * uniform linear scroll. Designed to be dropped around existing sections
 * without rewriting them.
 */
export function SectionEntry({
  children,
  variant = "fade-up",
  staggerSelector,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let tween: gsap.core.Tween | null = null;

    if (variant === "tilt-left") {
      gsap.set(el, {
        opacity: 0,
        x: -120,
        rotation: -2,
        transformOrigin: "left center",
      });
      tween = gsap.to(el, {
        opacity: 1,
        x: 0,
        rotation: 0,
        ease: "expo.out",
        duration: 1.4,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    } else if (variant === "tilt-right") {
      gsap.set(el, {
        opacity: 0,
        x: 200,
        rotation: 6,
        scale: 0.92,
        transformOrigin: "right center",
      });
      tween = gsap.to(el, {
        opacity: 1,
        x: 0,
        rotation: 0,
        scale: 1,
        ease: "back.out(1.6)",
        duration: 1.6,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    } else if (variant === "fade-up") {
      gsap.set(el, { opacity: 0, y: 60 });
      tween = gsap.to(el, {
        opacity: 1,
        y: 0,
        ease: "expo.out",
        duration: 1.2,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    } else if (variant === "rise-stagger" || variant === "scatter") {
      const selector = staggerSelector || ":scope > * > *";
      const children = el.querySelectorAll<HTMLElement>(selector);
      if (!children.length) return;

      if (variant === "rise-stagger") {
        gsap.set(children, { opacity: 0, y: 100 });
        tween = gsap.to(children, {
          opacity: 1,
          y: 0,
          ease: "expo.out",
          duration: 1.2,
          stagger: 0.12,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      } else {
        // scatter — each child enters from a different random-ish direction
        gsap.set(children, (i: number) => {
          const directions = [
            { x: -180, y: -120, rotation: -8 },
            { x: 0, y: 180, rotation: 5 },
            { x: 200, y: -80, rotation: -3 },
            { x: -120, y: 120, rotation: 8 },
          ];
          return { opacity: 0, ...directions[i % directions.length] };
        });
        tween = gsap.to(children, {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          ease: "expo.out",
          duration: 1.4,
          stagger: 0.18,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [variant, staggerSelector]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
