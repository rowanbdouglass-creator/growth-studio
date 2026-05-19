"use client";

import { PinnedZoom } from "@/components/fx/PinnedZoom";
import { HeroSceneLazy } from "@/components/fx/HeroSceneLazy";

interface ChromeInterstitialProps {
  /** The static line that holds while the visual takes over */
  headline?: string;
  emphasis?: string;
  caption?: string;
  number?: string;
  label?: string;
}

/**
 * A second flavour of pinned interstitial — instead of editorial type
 * dominating, the chrome WebGL element returns full-bleed, scales up,
 * and a sustained statement crosses the screen.
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
      {/* Chrome blob — scales up from 0.4 to 1.5 across the section */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          transform:
            "scale(calc(0.45 + var(--ease, 0) * 1.05)) translateY(calc(-10vh + var(--ease, 0) * 20vh))",
          opacity:
            "calc(0.45 + (1 - abs(2 * var(--progress, 0) - 1)) * 0.45)",
          filter: "blur(calc((1 - var(--ease, 0)) * 20px)) saturate(1.15)",
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

      {/* Index row */}
      <div className="absolute top-12 left-0 right-0 px-6 md:px-12">
        <div
          className="flex items-center gap-3 max-w-7xl mx-auto"
          style={{ opacity: "calc(1 - abs(2 * var(--progress, 0) - 1))" }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            {number} — {label}
          </span>
          <span className="flex-1 h-px bg-rule" />
        </div>
      </div>

      {/* Headline that sustains through the middle of the scroll */}
      <div className="relative text-center px-6 max-w-6xl">
        <h2
          className="font-sans font-medium text-ink leading-[0.98] tracking-[-0.04em] mb-6"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 8rem)",
            opacity:
              "calc(1 - clamp(0, abs(var(--progress, 0) - 0.5) / 0.35, 1))",
            transform:
              "translateY(calc((0.5 - var(--ease, 0)) * 40px)) scale(calc(0.92 + var(--ease, 0) * 0.16))",
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
          style={{
            opacity:
              "calc(1 - clamp(0, abs(var(--progress, 0) - 0.55) / 0.25, 1))",
          }}
        >
          {caption}
        </p>
      </div>
    </PinnedZoom>
  );
}
