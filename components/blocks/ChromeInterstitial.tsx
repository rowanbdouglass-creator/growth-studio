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
        const headDist = Math.abs(progress - 0.5);
        const headOpacity = Math.max(0.85, 1 - Math.pow(headDist * 2.0, 2));
        const headScale = 0.95 + eased * 0.08;
        const headY = (0.5 - eased) * 24;
        const eyebrowOpacity = Math.min(
          1,
          0.6 + Math.abs(0.5 - progress) * 0.8
        );

        return (
          <div className="relative w-full h-full">
            {/* Chrome blob — animation runs inside Three.js */}
            <HeroSceneLazy
              externalProgress={eased}
              baseScale={1.8}
              scaleFactor={0.9}
              cursorReactive={false}
              className="-z-10"
            />

            {/* Heavier vignette so type is readable over the city reflection */}
            <div
              aria-hidden
              className="absolute inset-0 -z-[5] pointer-events-none"
              style={{
                background:
                  "radial-gradient(70% 70% at 50% 50%, oklch(0.11 0.004 260 / 0.45) 0%, oklch(0.11 0.004 260 / 0.78) 60%, oklch(0.11 0.004 260 / 0.95) 100%)",
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

            {/* Headline — text-shadow halo for contrast over reflective surface */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h2
                className="font-sans font-medium text-ink leading-[1.08] tracking-[-0.04em] mb-6 max-w-5xl pb-1"
                style={{
                  fontSize: "clamp(2.5rem, 6.5vw, 7rem)",
                  opacity: headOpacity,
                  transform: `translateY(${headY.toFixed(2)}px) scale(${headScale.toFixed(3)})`,
                  transformOrigin: "center center",
                  textShadow:
                    "0 2px 30px oklch(0.08 0.005 260 / 0.85), 0 0 60px oklch(0.08 0.005 260 / 0.7)",
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
                style={{
                  opacity: Math.max(0.6, headOpacity - 0.15),
                  textShadow: "0 1px 20px oklch(0.08 0.005 260 / 0.9)",
                }}
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
