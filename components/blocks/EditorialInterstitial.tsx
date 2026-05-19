"use client";

import { PinnedZoom } from "@/components/fx/PinnedZoom";

interface EditorialInterstitialProps {
  beats?: [string, string, string];
  number?: string;
  label?: string;
}

/**
 * Three editorial words / phrases that scale up to cover the
 * viewport in sequence as the visitor scrolls through a tall
 * pinned section.
 */
export function EditorialInterstitial({
  beats = ["Compound.", "Not campaigns.", "Engines."],
  number = "—",
  label = "Interlude",
}: EditorialInterstitialProps) {
  return (
    <PinnedZoom scrollHeight={260} className="bg-canvas">
      {({ progress, eased }) => {
        // Each beat owns a window of progress. We use overlapping
        // windows so they cross-fade rather than hard-cut.
        const windows: [number, number][] = [
          [0.0, 0.40],
          [0.30, 0.70],
          [0.60, 1.0],
        ];

        function beatStyle(window: [number, number]): React.CSSProperties {
          const [start, end] = window;
          const mid = (start + end) / 2;
          const halfWidth = (end - start) / 2;
          // Distance from the centre of this beat's window, normalised
          const dist = Math.abs(progress - mid) / halfWidth;
          const clamped = Math.max(0, Math.min(1, dist));
          // Opacity falls off cubically outside the window
          const opacity = 1 - Math.pow(clamped, 2);
          // Scale from 0.55 (far) to 1.0 (peak) to 1.15 (exiting)
          const directional =
            progress < mid ? -1 : 1; // entering vs exiting
          const scale = 0.55 + (1 - clamped) * 0.45 + clamped * directional * 0.1;
          return {
            opacity,
            transform: `scale(${scale.toFixed(3)})`,
            transformOrigin: "center center",
            willChange: "opacity, transform",
          };
        }

        // Edges fade in / out
        const edgeOpacity = 1 - Math.abs(0.5 - progress) * 2;

        return (
          <>
            {/* Ambient backdrop — halo intensity tracks eased progress */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                background: `
                  radial-gradient(60% 50% at 50% 50%,
                    oklch(0.72 0.020 240 / ${(0.10 + eased * 0.20).toFixed(3)}),
                    transparent 70%),
                  radial-gradient(ellipse at center,
                    oklch(0.13 0.006 260),
                    oklch(0.11 0.004 260) 75%)
                `,
              }}
            />

            {/* Faint grid — peaks at midpoint */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(oklch(1 0 0 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.5) 1px, transparent 1px)",
                backgroundSize: "120px 120px",
                opacity: (0.06 * edgeOpacity).toFixed(3),
                maskImage:
                  "radial-gradient(ellipse at center, black 20%, transparent 70%)",
              }}
            />

            {/* Eyebrow row */}
            <div
              className="absolute top-12 left-0 right-0 px-6 md:px-12"
              style={{ opacity: Math.max(0, edgeOpacity) }}
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

            {/* Three editorial beats */}
            <div className="relative w-full px-6 max-w-6xl mx-auto">
              {beats.map((beat, i) => (
                <h2
                  key={i}
                  className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex items-center justify-center font-sans font-medium text-ink leading-[0.95] tracking-[-0.045em] text-center"
                  style={{
                    fontSize: "clamp(4rem, 13vw, 14rem)",
                    ...beatStyle(windows[i]),
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
              ))}
            </div>

            {/* Scroll cue */}
            <div
              className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 text-ink-mute"
              style={{ opacity: Math.max(0, 1 - progress * 2.5) }}
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
