"use client";

import { Fragment, useEffect, useRef } from "react";

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
}

/**
 * Splits a string into individual word spans and reveals them on
 * scroll via IntersectionObserver. Each word fades + slides up with
 * a small stagger. Respects prefers-reduced-motion.
 *
 * Spaces live as TEXT NODES between the inline-block word wrappers,
 * not inside them. Inside an inline-block, trailing whitespace gets
 * collapsed by the browser — which is why earlier versions rendered
 * "Auditsthatfind" instead of "Audits that find".
 */
export function SplitText({
  children,
  className = "",
  delay = 0,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

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

  const words = children.split(" ");

  return (
    <span ref={ref} className={`split-text ${className}`}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="split-text__word">
            <span
              className="split-text__inner"
              style={{ animationDelay: `${delay + i * 60}ms` }}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}
