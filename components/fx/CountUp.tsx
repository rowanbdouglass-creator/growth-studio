"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  format?: (n: number) => string;
}

/**
 * Counts from 0 to `value` when scrolled into view.
 * Uses requestAnimationFrame with easeOutQuint.
 * Respects prefers-reduced-motion (renders final value immediately).
 */
export function CountUp({
  value,
  duration = 1600,
  prefix = "",
  suffix = "",
  decimals = 0,
  format,
}: CountUpProps) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(value);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - start) / duration, 1);
              // easeOutQuint
              const eased = 1 - Math.pow(1 - t, 5);
              setCurrent(value * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setCurrent(value);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [value, duration]);

  const formatted = format
    ? format(current)
    : current.toLocaleString("en-GB", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

  return (
    <span ref={ref} style={{ fontFeatureSettings: "'tnum'" }}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
