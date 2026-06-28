"use client";

import { BracketLabel } from "@/components/brand/BracketLabel";
import { PressAndHold } from "@/components/fx/PressAndHold";
import { Scramble } from "@/components/fx/Scramble";
import { MagneticButton } from "@/components/fx/MagneticButton";

/**
 * Final CTA — massive "find a slot." headline on red, press-and-hold to book.
 */
export function FindASlot() {
  return (
    <section
      data-bg="red"
      style={{
        padding: "clamp(96px, 11vw, 160px) 0",
        background: "var(--color-red)",
        color: "var(--color-paper)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .ylb-find-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: clamp(40px, 6vw, 100px);
          align-items: end;
        }
        @media (max-width: 880px) {
          .ylb-find-grid { grid-template-columns: 1fr; }
        }
        .ylb-find-grid h2 {
          font-family: var(--font-syne);
          font-weight: 800;
          font-size: clamp(72px, 15vw, 260px);
          line-height: 0.8;
          letter-spacing: -0.05em;
          color: var(--color-paper);
        }
        .ylb-find-grid h2 em {
          font-style: italic;
          color: var(--color-ink);
          font-family: var(--font-syne);
        }
        .ylb-find-side p {
          font-size: clamp(16px, 1.7vw, 22px);
          line-height: 1.42;
          max-width: 34ch;
          color: var(--color-paper);
          margin-bottom: 28px;
        }
        .ylb-find-side p b {
          color: var(--color-ink);
          font-weight: 600;
        }
        .ylb-find-foot {
          margin-top: 14px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-paper);
          opacity: 0.85;
        }
      `}</style>

      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 72px)",
        }}
      >
        <div style={{ marginBottom: 56 }}>
          <BracketLabel number="06" scheme="on-red">
            find a slot
          </BracketLabel>
        </div>

        <div className="ylb-find-grid">
          <h2>
            find a{" "}
            <em>
              <Scramble
                final="slot"
                pool="ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*"
                intervalMs={4200}
                durationMs={520}
                inline
              />
            </em>
            .
          </h2>
          <div className="ylb-find-side">
            <p>
              Bring your numbers. We&rsquo;ll tell you what&rsquo;s leaking and
              what we&rsquo;d do about it —{" "}
              <b>in writing, before you pay anything</b>.
            </p>
            <MagneticButton>
              <PressAndHold
                variant="on-red"
                duration={600}
                onComplete={() => {
                  window.location.href = "/contact";
                }}
              >
                Hold to book
              </PressAndHold>
            </MagneticButton>
            <div className="ylb-find-foot">
              30 min · no pitch · bring numbers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
