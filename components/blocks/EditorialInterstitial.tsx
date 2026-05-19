"use client";

import { PinnedZoom } from "@/components/fx/PinnedZoom";

interface EditorialInterstitialProps {
  beats?: [string, string, string];
  number?: string;
  label?: string;
}

export function EditorialInterstitial({
  beats = ["Compound.", "Not campaigns.", "Engines."],
  number = "—",
  label = "Interlude",
}: EditorialInterstitialProps) {
  const peaks = [0.22, 0.5, 0.78];
  const halfWindow = 0.22;

  function beatState(idx: number, progress: number) {
    const peak = peaks[idx];
    const dist = Math.abs(progress - peak) / halfWindow;

    let opacity: number;
    if (idx === 0 && progress < peak) {
      opacity = 1;
    } else if (idx === 2 && progress > peak) {
      opacity = 1;
    } else {
      opacity = Math.max(0, 1 - Math.pow(dist, 1.6));
    }

    const scale = 1.0 + Math.max(-0.18, 0.12 - dist * 0.28);
    return { opacity, scale };
  }

  return (
    <PinnedZoom scrollHeight={220} className="bg-canvas">
      {({ progress, eased }) => {
        const eyebrowOpacity = Math.min(
          1,
          0.55 + Math.abs(0.5 - progress) * 0.9
        );
        const scrollCueOpacity = Math.max(0, 1 - progress * 3);

        return (
          <>
            {/* Ambient backdrop */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                background: `
                  radial-gradient(60% 50% at 50% 50%,
                    oklch(0.72 0.020 240 / ${(0.1 + eased * 0.22).toFixed(3)}),
                    transparent 70%),
                  radial-gradient(ellipse at center,
                    oklch(0.13 0.006 260),
                    oklch(0.11 0.004 260) 75%)
                `,
              }}
            />

            {/* Grid mask */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(oklch(1 0 0 / 0.45) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.45) 1px, transparent 1px)",
                backgroundSize: "120px 120px",
                opacity: (0.04 + eased * 0.04).toFixed(3),
                maskImage:
                  "radial-gradient(ellipse at center, black 20%, transparent 70%)",
              }}
            />

            {/* Eyebrow */}
            <div
              className="absolute top-12 left-0 right-0 px-6 md:px-12"
              style={{ opacity: eyebrowOpacity }}
            >
              <div className="flex items-center gap-3 max-w-7xl mx-auto">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                  {number} — {label}
                </span>
                <span className="flex-1 h-px bg-rule" />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                  Scroll to advance
                </span>
              </div>
            </div>

            {/* Beats — each wrapped in its own absolute-centered container */}
            {beats.map((beat, i) => {
              const { opacity, scale } = beatState(i, progress);
              return (
                <div
                  key={i}
                  className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
                  style={{
                    opacity,
                    transform: `scale(${scale.toFixed(3)})`,
                    transformOrigin: "center center",
                    willChange: "opacity, transform",
                  }}
                >
                  <h2
                    className="font-sans font-medium text-ink leading-[0.95] tracking-[-0.045em] text-center whitespace-nowrap"
                    style={{ fontSize: "clamp(3rem, 11vw, 11rem)" }}
                  >
                    {beat.endsWith(".") ? (
                      <>
                        <span>{beat.slice(0, -1)}</span>
                        <span className="text-accent">.</span>
                      </>
                    ) : (
                      <span>{beat}</span>
                    )}
                  </h2>
                </div>
              );
            })}

            {/* Scroll cue */}
            <div
              className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 text-ink-mute"
              style={{ opacity: scrollCueOpacity }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                Scroll
              </span>
              <span aria-hidden className="text-accent">
                ↓
              </span>
            </div>
          </>
        );
      }}
    </PinnedZoom>
  );
}
