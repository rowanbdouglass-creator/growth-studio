"use client";

import { useEffect, useState } from "react";

/**
 * A small "live activity" pill. Cycles through a small set of
 * realistic-feeling stats every few seconds. Pure client-side
 * theatre, no real data, but communicates "active studio"
 * better than a static byline.
 */
const SEED = [
  { label: "Last audit", value: "3 min ago" },
  { label: "Audits this week", value: "73" },
  { label: "Recovered Q3", value: "£128,420" },
  { label: "Active engagements", value: "12" },
  { label: "Avg ROAS lift", value: "1.7×" },
];

export function ActivityTicker() {
  const [idx, setIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % SEED.length), 3200);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  const item = SEED[idx];

  return (
    <div
      className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-border-strong bg-canvas-2/60 backdrop-blur-md"
      role="status"
      aria-live="polite"
    >
      <span className="relative flex w-1.5 h-1.5">
        <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />
        <span className="relative w-1.5 h-1.5 rounded-full bg-accent" />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
        Live ·
      </span>
      <span
        key={idx}
        className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft"
        style={{ animation: "fade-in 320ms var(--ease-out-quint)" }}
      >
        {item.label}
      </span>
      <span
        key={`v-${idx}`}
        className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink"
        style={{ animation: "fade-in 320ms var(--ease-out-quint)" }}
      >
        {item.value}
      </span>
    </div>
  );
}
