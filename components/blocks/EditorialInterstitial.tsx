"use client";

import { PinnedZoom } from "@/components/fx/PinnedZoom";

interface EditorialInterstitialProps {
  beats?: [string, string, string];
}

export function EditorialInterstitial({
  beats = ["Real systems.", "Real numbers.", "Real follow-through."],
}: EditorialInterstitialProps) {
  const peaks = [0.22, 0.5, 0.78];
  const halfWindow = 0.22;

  function beatState(idx: number, progress: number) {
    const peak = peaks[idx];
    const dist = Math.abs(progress - peak) / halfWindow;
    let opacity: number;
    if (idx === 0 && progress < peak) opacity = 1;
    else if (idx === 2 && progress > peak) opacity = 1;
    else opacity = Math.max(0, 1 - Math.pow(dist, 1.6));
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

        return (
          <div className="relative w-full h-full">
            {/* Ambient backdrop */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
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

            {/* Hairline rule, no eyebrow */}
            <div
              className="absolute top-12 left-0 right-0 px-6 md:px-12"
              style={{ opacity: eyebrowOpacity }}
            >
              <div className="flex items-center gap-3 max-w-7xl mx-auto">
                <span className="flex-1 h-px bg-rule" />
              </div>
            </div>

            {/* Beats, each is a full-bleed centred flex container */}
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
                  }}
                >
                  <h2
                    className="font-sans font-medium text-ink leading-[0.95] tracking-[-0.045em] text-center"
                    style={{
                      fontSize: "clamp(3rem, 11vw, 11rem)",
                      whiteSpace: "nowrap",
                    }}
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
          </div>
        );
      }}
    </PinnedZoom>
  );
}
