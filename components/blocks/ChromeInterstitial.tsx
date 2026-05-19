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
 * Chrome blob takeover. The WebGL animation runs inside Three.js
 * (mesh.scale + material.distort interpolated in useFrame) instead
 * of being CSS-transformed — this is dramatically smoother because
 * the GPU doesn't have to re-rasterise the canvas every scroll frame.
 *
 * The only thing CSS-driven is the headline overlay.
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
        // Headline holds visible across the section, scales subtly
        const headDist = Math.abs(progress - 0.5);
        const headOpacity = Math.max(0.7, 1 - Math.pow(headDist * 2.0, 2));
        const headScale = 0.95 + eased * 0.10;
        const headY = (0.5 - eased) * 30;

        const eyebrowOpacity = Math.min(
          1,
          0.6 + Math.abs(0.5 - progress) * 0.8
        );

        return (
          <div className="relative w-full h-full">
            {/* Chrome blob — animation runs inside Three.js, canvas stays
                at constant transform so the GPU isn't re-rasterising it
                every scroll frame */}
            <HeroSceneLazy
              externalProgress={eased}
              baseScale={1.8}
              scaleFactor={0.9}
              cursorReactive={false}
              className="-z-10"
            />

            {/* Vignette so type stays legible over the blob */}
            <div
              aria-hidden
              className="absolute inset-0 -z-[5] pointer-events-none"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, transparent 30%, oklch(0.11 0.004 260 / 0.80) 100%)",
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
              </div>
            </div>

            {/* Headline */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h2
                className="font-sans font-medium text-ink leading-[0.98] tracking-[-0.04em] mb-6 max-w-5xl"
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
          </div>
        );
      }}
    </PinnedZoom>
  );
}
