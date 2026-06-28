"use client";

import { Marquee } from "@/components/ui/marquee";

/**
 * Marquee strip — recently booked dates scrolling horizontally.
 * Sits between Process and Stats as the rhythm-shift moment.
 * Uses magicui Marquee primitive, animated by transform only (perf-safe).
 */
const ITEMS = [
  { label: "RECENTLY BOOKED", date: "MON 28 JUN" },
  { label: "DELIVERED", date: "TUE 22 JAN" },
  { label: "STABILISED", date: "TUE 20 MAY" },
  { label: "ONGOING", date: "THU 08 FEB" },
  { label: "DESIGN REVIEW", date: "FRI 04 JUL" },
  { label: "AUDIT", date: "MON 14 JUL" },
  { label: "BUILD SPRINT", date: "WED 23 JUL" },
  { label: "STRATEGY", date: "FRI 25 JUL" },
];

export function MarqueeStrip() {
  return (
    <section
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        padding: "clamp(48px, 6vw, 80px) 0",
        background: "var(--color-night-soft)",
        color: "var(--color-paper)",
        borderTop: "1px solid var(--color-hairline)",
        borderBottom: "1px solid var(--color-hairline)",
        overflow: "hidden",
      }}
    >
      <Marquee
        pauseOnHover
        className="[--duration:60s] [--gap:64px]"
        style={{ fontFamily: "var(--font-syne)", fontWeight: 600 }}
      >
        {ITEMS.map((it, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              gap: 20,
              padding: "0 32px",
              borderLeft: "1px solid var(--color-hairline)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "var(--color-red)",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              {it.label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(40px, 5vw, 76px)",
                color: "var(--color-paper)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {it.date}
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
