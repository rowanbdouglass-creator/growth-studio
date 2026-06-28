"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Number counter that animates from 0 to `to` when scrolled into view.
 * Supports prefix (e.g. £), suffix (e.g. hrs/mo), and "k" formatting
 * (£128,000 → £128k).
 *
 * Respects prefers-reduced-motion: shows final value immediately.
 */
interface CounterProps {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  format?: "default" | "k" | "comma";
  className?: string;
  style?: React.CSSProperties;
}

export function Counter({
  to,
  duration = 1400,
  prefix = "",
  suffix = "",
  format = "default",
  className = "",
  style,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setValue(to);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const step = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(to * eased));
              if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            io.unobserve(node);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [to, duration]);

  let display: string;
  if (format === "k" && value >= 1000) {
    display = `${(value / 1000).toFixed(0)}k`;
  } else if (format === "comma") {
    display = value.toLocaleString("en-GB");
  } else {
    display = value.toString();
  }

  return (
    <span
      ref={ref}
      className={className}
      style={{
        fontFeatureSettings: '"tnum"',
        fontVariantNumeric: "tabular-nums",
        ...style,
      }}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
