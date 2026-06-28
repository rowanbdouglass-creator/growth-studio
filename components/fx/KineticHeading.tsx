"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

interface KineticHeadingProps {
  children: React.ReactNode;
  /** ms delay before the animation starts */
  delay?: number;
  /** triggers on intersection by default; pass false to play immediately */
  triggerOnView?: boolean;
  /** entrance style — "fly" = random offset+rotation, "wipe" = mask up, "stamp" = scale-in */
  variant?: "fly" | "wipe" | "stamp";
  as?: "h1" | "h2" | "h3";
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Heading that animates char-by-char on entrance. Splits text into
 * spans via SplitType, then runs a GSAP timeline. Respects
 * prefers-reduced-motion (renders flat).
 */
export function KineticHeading({
  children,
  delay = 0,
  triggerOnView = true,
  variant = "fly",
  as = "h1",
  className,
  style,
}: KineticHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const split = new SplitType(el, { types: "chars", tagName: "span" });
    const chars = split.chars || [];
    if (!chars.length) return;

    chars.forEach((c) => {
      c.style.display = "inline-block";
      c.style.willChange = "transform, opacity, filter";
    });

    const animate = () => {
      if (variant === "fly") {
        gsap.set(chars, {
          y: () => gsap.utils.random(40, 120),
          x: () => gsap.utils.random(-30, 30),
          rotate: () => gsap.utils.random(-12, 12),
          opacity: 0,
          filter: "blur(8px)",
        });
        gsap.to(chars, {
          y: 0,
          x: 0,
          rotate: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.05,
          stagger: { each: 0.022, from: "random" },
          ease: "expo.out",
          delay: delay / 1000,
        });
      } else if (variant === "wipe") {
        gsap.set(chars, { y: "110%", opacity: 0 });
        gsap.to(chars, {
          y: "0%",
          opacity: 1,
          duration: 0.95,
          stagger: 0.018,
          ease: "expo.out",
          delay: delay / 1000,
        });
      } else if (variant === "stamp") {
        gsap.set(chars, { scale: 1.5, opacity: 0 });
        gsap.to(chars, {
          scale: 1,
          opacity: 1,
          duration: 0.55,
          stagger: 0.012,
          ease: "back.out(2.4)",
          delay: delay / 1000,
        });
      }
    };

    if (!triggerOnView) {
      animate();
      return () => {
        split.revert();
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate();
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      split.revert();
    };
  }, [delay, triggerOnView, variant]);

  const Tag = as;
  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className} style={style}>
      {children}
    </Tag>
  );
}
