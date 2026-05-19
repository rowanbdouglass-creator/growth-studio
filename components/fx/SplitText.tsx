"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface SplitTextProps {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
}

/**
 * Splits a string into individual word spans and reveals them on
 * scroll via IntersectionObserver. Each word fades + slides up with
 * a small stagger. Respects prefers-reduced-motion.
 *
 * Children must be a plain string. For mixed content (italic spans)
 * use the manual stagger className `anim-hero-entry` instead.
 */
export function SplitText({
  children,
  as = "span",
  className = "",
  delay = 0,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      el.classList.add("is-shown");
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("is-shown");
            obs.unobserve(el);
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  const words = children.split(" ");

  return (
    <Tag ref={ref as never} className={`split-text ${className}`}>
      {words.map((w, i) => (
        <span key={i} className="split-text__word">
          <span
            className="split-text__inner"
            style={{ animationDelay: `${delay + i * 60}ms` }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
