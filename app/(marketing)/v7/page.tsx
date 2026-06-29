"use client";

import dynamic from "next/dynamic";

const KineticTypographyHeroV7 = dynamic(
  () =>
    import("@/components/sections/KineticTypographyHeroV7").then(
      (m) => m.KineticTypographyHeroV7
    ),
  { ssr: false }
);

/**
 * /v7 — text-cube technique. Each phrase is a 3D BoxGeometry
 * (the "cube") with flat text painted on the front face and all
 * other faces solid dark. Camera dollies through at an off-axis
 * angle so the cube side faces are visible as dark blocks.
 *
 * This is the actual technique the Spatial Festival reference
 * uses (text is 2D, container is 3D — the user spotted this).
 */
export default function V7Page() {
  return (
    <main
      data-bg="dark"
      data-hide-site-header
      style={{ position: "relative", zIndex: 0, background: "#0E0D0B" }}
    >
      <KineticTypographyHeroV7 />
    </main>
  );
}
