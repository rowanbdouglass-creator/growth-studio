"use client";

import dynamic from "next/dynamic";

/**
 * Lazy-loads the WebGL hero scene only on the client. Three.js +
 * R3F + Drei add ~600kb gzip — keeping it out of the initial chunk
 * means the rest of the site loads at full speed.
 */
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

interface HeroSceneLazyProps {
  className?: string;
}

export function HeroSceneLazy({ className = "" }: HeroSceneLazyProps) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ contain: "layout paint" }}
    >
      <HeroScene />
    </div>
  );
}
