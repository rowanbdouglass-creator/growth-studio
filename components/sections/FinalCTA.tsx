"use client";

import Link from "next/link";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";

/**
 * Final CTA — massive editorial close. Headline takes full width,
 * shimmer button below, next-open-slot card right with border-beam.
 */
export function FinalCTA() {
  return (
    <section
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        padding: "clamp(120px, 16vw, 240px) 0 clamp(96px, 12vw, 180px)",
        background: "var(--color-night)",
        color: "var(--color-paper)",
        borderBottom: "1px solid var(--color-hairline)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 72px)",
          position: "relative",
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
          BOOK A SLOT
        </div>

        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 700,
            fontSize: "clamp(4rem, 14vw, 16rem)",
            lineHeight: 0.84,
            letterSpacing: "-0.055em",
            marginBottom: "clamp(48px, 6vw, 80px)",
          }}
        >
          Find a{" "}
          <span className="serif-italic">slot.</span>
        </h2>

        <div
          className="fc-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "clamp(40px, 6vw, 100px)",
            alignItems: "end",
          }}
        >
          <style>{`@media (max-width: 880px) { .fc-grid { grid-template-columns: 1fr !important; } }`}</style>

          <div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(17px, 1.8vw, 22px)",
                lineHeight: 1.5,
                color: "var(--color-mute)",
                maxWidth: "48ch",
                marginBottom: 40,
              }}
            >
              30 minutes. No pitch. No slides. Bring your numbers — we&rsquo;ll
              tell you what we&rsquo;d do, in writing, before you pay anything.
            </p>
            <Link href="/contact" data-magnetic="" data-cur="hold">
              <ShimmerButton
                background="var(--color-red)"
                shimmerColor="#F3EFE6"
                shimmerDuration="3.4s"
                className="ylb-shimmer"
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "var(--color-paper)",
                    padding: "4px 8px",
                  }}
                >
                  HOLD TO BOOK →
                </span>
              </ShimmerButton>
            </Link>
            <div
              style={{
                marginTop: 20,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "var(--color-dim)",
                textTransform: "uppercase",
              }}
            >
              30 MIN · NO PITCH · BRING NUMBERS
            </div>
          </div>

          <div
            style={{
              position: "relative",
              padding: "clamp(28px, 3vw, 44px)",
              background: "var(--color-night-soft)",
              overflow: "hidden",
            }}
          >
            <BorderBeam
              size={180}
              duration={9}
              colorFrom="#C4472E"
              colorTo="#F3EFE6"
            />
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-red)",
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              ● NEXT OPEN SLOT
            </div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(40px, 5vw, 64px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "var(--color-paper)",
              }}
            >
              FRI · 14 JUL
              <br />
              14:00 BST
            </div>
            <div
              style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid var(--color-hairline)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "var(--color-mute)",
                textTransform: "uppercase",
                lineHeight: 1.8,
              }}
            >
              30 MIN · GOOGLE MEET
              <br />
              <span style={{ color: "var(--color-paper)" }}>£0 · UK</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
