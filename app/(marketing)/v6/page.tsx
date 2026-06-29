import { KineticTypographyHero } from "@/components/sections/KineticTypographyHero";

/**
 * /v6 — just the kinetic hero. No other sections.
 * Stripped for fast load while we tune the hero animation.
 */
export default function V6Page() {
  return (
    <main
      data-bg="dark"
      data-hide-site-header
      style={{ position: "relative", zIndex: 0, background: "#000" }}
    >
      <KineticTypographyHero />
    </main>
  );
}
