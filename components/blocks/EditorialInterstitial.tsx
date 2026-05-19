"use client";

import { PinnedZoom } from "@/components/fx/PinnedZoom";

interface EditorialInterstitialProps {
  /**
   * Three editorial beats. Each fades in at a specific window of the
   * sticky scroll progress. Tone: short, declarative, brand-defining.
   */
  beats?: [string, string, string];
  /** Index number shown in the eyebrow ("·  03 / Interlude") */
  number?: string;
  /** Label after the number */
  label?: string;
}

/**
 * Full-bleed scroll-pinned editorial moment. Three statements scale
 * up to cover the viewport in sequence as the visitor scrolls through.
 *
 * Sits between dense text sections to break the rhythm and give the
 * brand a cinematic beat. Used twice across the homepage with
 * different copy.
 */
export function EditorialInterstitial({
  beats = [
    "Compound.",
    "Not campaigns.",
    "Engines.",
  ],
  number = "—",
  label = "Interlude",
}: EditorialInterstitialProps) {
  return (
    <PinnedZoom scrollHeight={260} className="bg-canvas">
      {/* Ambient backdrop — silver halo that shifts with progress */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              60% 50% at 50% 50%,
              oklch(0.72 0.020 240 / calc(0.14 + var(--ease, 0) * 0.18)),
              transparent 70%
            ),
            radial-gradient(
              ellipse at center,
              oklch(0.13 0.006 260),
              oklch(0.11 0.004 260) 75%
            )
          `,
        }}
      />

      {/* Subtle grid mask — sharper as you scroll in, softer as you exit */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.5) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          opacity:
            "calc(0.05 * (1 - abs(2 * var(--progress, 0) - 1)))" /* peak mid */,
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 70%)",
        }}
      />

      {/* Index row at the top */}
      <div className="absolute top-12 left-0 right-0 px-6 md:px-12">
        <div
          className="flex items-center gap-3 max-w-7xl mx-auto"
          style={{
            opacity:
              "calc(1 - abs(2 * var(--progress, 0) - 1))" /* fade in/out */,
          }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            {number} — {label}
          </span>
          <span className="flex-1 h-px bg-rule" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute tabular-nums">
            Scroll to advance
          </span>
        </div>
      </div>

      {/* Three editorial beats — overlapping cross-fades */}
      <div className="relative text-center px-6 max-w-6xl">
        {beats.map((beat, i) => {
          // Each beat owns a window of progress, scales up through it
          const windowStart = i * 0.32;
          const windowEnd = windowStart + 0.42;
          // Visible from windowStart..windowEnd-0.05, peaking at midpoint
          return (
            <h2
              key={i}
              className="absolute inset-0 flex items-center justify-center font-sans font-medium text-ink leading-[0.95] tracking-[-0.045em]"
              style={
                {
                  fontSize: "clamp(4rem, 14vw, 16rem)",
                  // Opacity uses progress through that beat's window
                  opacity: `calc(
                    1 - clamp(0, abs(var(--progress, 0) - ${
                      (windowStart + windowEnd) / 2
                    }) / 0.18, 1)
                  )`,
                  // Scale: from 0.55 at window start → 1.0 at middle → 1.15 at end
                  transform: `scale(calc(
                    0.55 + (1 - clamp(0, abs(var(--progress, 0) - ${
                      (windowStart + windowEnd) / 2
                    }) / 0.18, 1)) * 0.6
                  ))`,
                  transformOrigin: "center center",
                  willChange: "opacity, transform",
                } as React.CSSProperties
              }
            >
              {beat.includes(".") && beat.endsWith(".") ? (
                <>
                  {beat.slice(0, -1)}
                  <span className="text-accent">.</span>
                </>
              ) : (
                beat
              )}
            </h2>
          );
        })}
      </div>

      {/* Scroll cue at the bottom — fades out as user progresses */}
      <div
        className="absolute bottom-10 left-0 right-0 px-6 flex flex-col items-center gap-2 text-ink-mute"
        style={{
          opacity: "calc(1 - var(--progress, 0) * 2)",
        }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
          Scroll
        </span>
        <span aria-hidden className="text-accent">↓</span>
      </div>
    </PinnedZoom>
  );
}
