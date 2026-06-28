"use client";

import { ScrollWordReveal } from "@/components/fx/ScrollWordReveal";

/**
 * Pinned manifesto section. Big editorial sentence reveals word-by-word
 * as you scroll. Sets the tone before the services / work blocks.
 */
export function ManifestoPin() {
  return (
    <section
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        padding: "clamp(180px, 22vw, 320px) 0",
        background: "var(--color-night)",
        color: "var(--color-paper)",
        borderTop: "1px solid var(--color-hairline)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 72px)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--color-mute)",
            marginBottom: 48,
          }}
        >
          <span style={{ color: "var(--color-red)" }}>●</span>{" "}
          THE WORK
        </div>
        <ScrollWordReveal
          as="h2"
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 600,
            fontSize: "clamp(2.2rem, 4.6vw, 5.4rem)",
            lineHeight: 1.12,
            letterSpacing: "-0.025em",
            color: "var(--color-paper)",
          }}
          text="Most UK SMEs are operating beneath their potential. The website is slow. The operations are manual. The ad spend is misallocated. We rebuild *all three*. Then the calendar fills."
        />
      </div>
    </section>
  );
}
