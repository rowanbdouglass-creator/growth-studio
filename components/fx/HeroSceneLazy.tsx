"use client";

import dynamic from "next/dynamic";

interface HeroSceneLazyProps {
  className?: string;
  externalProgress?: number;
  baseScale?: number;
  scaleFactor?: number;
  cursorReactive?: boolean;
}

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Lazy-loads the WebGL hero scene only on the client. Three.js +
 * R3F + Drei add ~600kb gzip, keeping it out of the initial chunk
 * means the rest of the site loads at full speed.
 */
export function HeroSceneLazy({
  className = "",
  externalProgress = 0,
  baseScale = 2.4,
  scaleFactor = 0,
  cursorReactive = true,
}: HeroSceneLazyProps) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ contain: "layout paint" }}
    >
      <HeroScene
        externalProgress={externalProgress}
        baseScale={baseScale}
        scaleFactor={scaleFactor}
        cursorReactive={cursorReactive}
      />
    </div>
  );
}
