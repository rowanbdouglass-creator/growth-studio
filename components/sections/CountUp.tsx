"use client";

import { useEffect, useRef } from "react";

/**
 * CountUp — animates a figure from 0 to its target on first intersect.
 *
 * Parses "{prefix}{number}{suffix}" (commas allowed in the number) and
 * writes frames directly to textContent via requestAnimationFrame, no
 * per-frame state. Non-parseable values and reduced-motion render the
 * final value immediately.
 */

const DURATION = 900;

function parseValue(value: string) {
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  if (!match) return null;
  const target = Number(match[2].replace(/,/g, ""));
  if (!Number.isFinite(target)) return null;
  return {
    prefix: match[1],
    target,
    suffix: match[3],
    hasCommas: match[2].includes(","),
  };
}

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parsed = parseValue(value);
    if (!el || !parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const format = (n: number) =>
      `${parsed.prefix}${parsed.hasCommas ? n.toLocaleString("en-GB") : String(n)}${parsed.suffix}`;

    const observer = new IntersectionObserver(
      (observerEntries) => {
        if (!observerEntries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = format(Math.round(parsed.target * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        el.textContent = format(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className="font-display text-5xl font-bold tabular-nums">
      {value}
    </span>
  );
}
