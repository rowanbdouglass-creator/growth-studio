"use client";

import { PinnedZoom } from "@/components/fx/PinnedZoom";
import { HeroSceneLazy } from "@/components/fx/HeroSceneLazy";

interface ChromeInterstitialProps {
  headline?: string;
  emphasis?: string;
  caption?: string;
  number?: string;
  label?: string;
}

/**
 * Chrome blob takeover. Always visible content (not invisible at
 * edges) — blob is at minimum 0.55 opacity throughout, headline at
 * minimum 0.7 opacity.
 */
export function ChromeInterstitial({
  headline = "We build the engines",
  emphasis = "that earn back hours per week.",
  caption = "Custom systems · 8 yrs · WP, WC, Next.js",
  number = "—",
  label = "Manifesto",
}: ChromeInterstitialProps) {
  return (
    <PinnedZoom scrollHeight={220} className="bg-canvas">
      {({ progress, eased }) => {
        // Headline scales/translates as you scroll, but stays visible across
        // the whole section (min 0.7 opacity)
        const headDist = Math.abs(progress - 0.5);
        const headOpacity = Math.max(0.65, 1 - Math.pow(headDist * 2.0, 2));
        const headScale = 0.95 + eased * 0.10;
        const headY = (0.5 - eased) * 30;

        // Blob: scales from 0.55 → 1.4 across, blur fades, always
        // somewhat visible (min 0.5)
        const blobScale = 0.55 + eased * 0.85;
        const blobBlur = (1 - eased) * 14;
        const blobOpacity = Math.max(0.5, 0.55 + eased * 0.35);

        // Eyebrow visible everywhere, dimmer mid-section
        const eyebrowOpacity = 0.6 + Math.abs(0.5 - progress) * 0.8;

        return (
          <>
            {/* Chrome blob */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                transform: `scale(${blobScale.toFixed(3)})`,
                opacity: blobOpacity.toFixed(3),
                filter: `blur(${blobBlur.toFixed(1)}px) saturate(1.15)`,
                willChange: "transform, opacity, filter",
              }}
            >
              <HeroSceneLazy />
            </div>

            {/* Vignette so type stays legible over the blob */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, transparent 30%, oklch(0.11 0.004 260 / 0.80) 100%)",
              }}
            />

            {/* Eyebrow */}
            <div
              className="absolute top-12 left-0 right-0 px-6 md:px-12"
              style={{ opacity: Math.min(1, eyebrowOpacity) }}
            >
              <div className="flex items-center gap-3 max-w-7xl mx-auto">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                  {number} — {label}
                </span>
                <span className="flex-1 h-px bg-rule" />
              </div>
            </div>

            {/* Headline */}
            <div className="relative text-center px-6 max-w-6xl">
              <h2
                className="font-sans font-medium text-ink leading-[0.98] tracking-[-0.04em] mb-6"
                style={{
                  fontSize: "clamp(2.5rem, 6.5vw, 7rem)",
                  opacity: headOpacity,
                  transform: `translateY(${headY.toFixed(2)}px) scale(${headScale.toFixed(3)})`,
                  transformOrigin: "center center",
                  willChange: "transform, opacity",
                }}
              >
                {headline}{" "}
                <span className="italic-editorial font-normal text-ink-soft">
                  {emphasis}
                </span>
              </h2>
              <p
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute"
                style={{ opacity: Math.max(0.4, headOpacity - 0.15) }}
              >
                {caption}
              </p>
            </div>
          </>
        );
      }}
    </PinnedZoom>
  );
}
