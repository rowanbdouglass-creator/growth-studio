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
 * Chrome blob takeover — second interstitial flavour. The WebGL
 * element scales up and unblurs as the visitor scrolls in, an
 * editorial line sustains through the middle, then the blob
 * gracefully shrinks/blurs back out.
 */
export function ChromeInterstitial({
  headline = "We build the engines",
  emphasis = "that earn back hours per week.",
  caption = "Custom systems · 8 yrs · WP, WC, Next.js",
  number = "—",
  label = "Manifesto",
}: ChromeInterstitialProps) {
  return (
    <PinnedZoom scrollHeight={240} className="bg-canvas">
      {({ progress, eased }) => {
        // Headline opacity: peaks at progress 0.5, fades at the edges
        const dist = Math.abs(progress - 0.5) / 0.35;
        const headOpacity = Math.max(0, 1 - dist * dist);
        const headScale = 0.92 + eased * 0.16;
        const headY = (0.5 - eased) * 40; // px

        // Edge opacity for the eyebrow + caption
        const edge = 1 - Math.abs(0.5 - progress) * 2;

        // Blob scale + blur + opacity
        const blobScale = 0.45 + eased * 1.05;
        const blobY = -10 + eased * 20; // vh
        const blobBlur = (1 - eased) * 18; // px
        const blobOpacity = 0.45 + edge * 0.45;

        return (
          <>
            {/* Chrome blob */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                transform: `scale(${blobScale.toFixed(3)}) translateY(${blobY.toFixed(2)}vh)`,
                opacity: blobOpacity.toFixed(3),
                filter: `blur(${blobBlur.toFixed(1)}px) saturate(1.15)`,
                willChange: "transform, opacity, filter",
              }}
            >
              <HeroSceneLazy />
            </div>

            {/* Soft vignette so the type stays legible over the blob */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, transparent 30%, oklch(0.11 0.004 260 / 0.85) 100%)",
              }}
            />

            {/* Eyebrow */}
            <div
              className="absolute top-12 left-0 right-0 px-6 md:px-12"
              style={{ opacity: Math.max(0, edge) }}
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
                  fontSize: "clamp(2.5rem, 7vw, 7.5rem)",
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
                style={{ opacity: Math.max(0, headOpacity - 0.2) }}
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
