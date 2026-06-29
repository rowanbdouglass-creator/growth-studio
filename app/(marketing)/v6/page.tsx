"use client";

import dynamic from "next/dynamic";

const KineticTypographyHero3D = dynamic(
  () =>
    import("@/components/sections/KineticTypographyHero3D").then(
      (m) => m.KineticTypographyHero3D
    ),
  { ssr: false }
);

/**
 * /v6 — real 3D kinetic typography via Three.js / R3F.
 *
 * Dynamic import + ssr:false because R3F renders to canvas and
 * needs the browser. Avoids hydration mismatch errors.
 */
export default function V6Page() {
  return (
    <main
      data-bg="dark"
      data-hide-site-header
      style={{ position: "relative", zIndex: 0, background: "#0E0D0B" }}
    >
      <KineticTypographyHero3D />
    </main>
  );
}
