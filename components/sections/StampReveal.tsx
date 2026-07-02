"use client";

import { useEffect, useRef, useState } from "react";

/**
 * StampReveal — a small stamp badge that plays the signature stamp-in
 * motion the first time it enters the viewport (threshold 0.6, once).
 * Reduced motion is handled in CSS (.stamp stays visible).
 */
export function StampReveal({
  label,
  delayMs = 0,
  className = "",
}: {
  label: string;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (observerEntries) => {
        if (observerEntries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`stamp inline-block rotate-[-5deg] rounded-sm border-2 border-accent-text bg-surface-0 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-accent-text ${
        inView ? "is-inview" : ""
      } ${className}`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {label}
    </span>
  );
}
