"use client";

import { Marquee } from "@/components/ui/marquee";

/**
 * Section 06 — Clients.
 *
 * Modelled on Ascend's logo grid + Jesse's logo strip. We don't have
 * client logo files, so we render the client names as a horizontal
 * marquee in our display typeface. Reads as "trusted by these UK SMEs"
 * without the awkward placeholder-logo problem.
 */

const CLIENTS = [
  "Nayim's Embroideries",
  "JC Setton Opticians",
  "Cape Kings",
  "Forum Studios",
  "Selected confidential",
];

export function Section06Clients() {
  return (
    <section
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(96px, 12vw, 160px) 0",
        background: "var(--color-night-soft)",
        color: "var(--color-paper)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 72px)",
          marginBottom: "clamp(48px, 6vw, 80px)",
        }}
      >
        {/* Top eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--color-mute)",
            marginBottom: 24,
            fontWeight: 600,
          }}
        >
          <span
            style={{
              color: "var(--color-red)",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 28,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            06
          </span>
          <span
            style={{ width: 40, height: 1, background: "var(--color-hairline-strong)" }}
          />
          Trusted by
        </div>
      </div>

      {/* Client names marquee */}
      <Marquee
        pauseOnHover
        className="[--duration:50s] [--gap:80px]"
      >
        {CLIENTS.map((c, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              gap: 80,
              paddingRight: 80,
              borderLeft: "1px solid var(--color-hairline)",
              paddingLeft: 80,
              whiteSpace: "nowrap",
              fontFamily: "var(--font-syne)",
              fontWeight: 500,
              fontSize: "clamp(40px, 5vw, 76px)",
              color: "var(--color-paper-soft)",
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            {c}
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--color-red)",
                opacity: 0.6,
              }}
            />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
