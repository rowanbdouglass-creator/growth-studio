import { KineticTypographyHero } from "@/components/sections/KineticTypographyHero";
import { Section02Philosophy } from "@/components/sections/Section02Philosophy";
import { Section03OperatingModel } from "@/components/sections/Section03OperatingModel";
import { Section04Work } from "@/components/sections/Section04Work";
import { Section05Stats } from "@/components/sections/Section05Stats";
import { Section06Clients } from "@/components/sections/Section06Clients";
import { Section07Cta } from "@/components/sections/Section07Cta";

/**
 * /v6 — Kinetic typography hero prototype.
 *
 * Pinned scroll-driven hero with three service words zooming up
 * through the viewport (BESPOKE SOFTWARE → CUSTOM WEBSITES →
 * PAID TRAFFIC), each backed by a lime-on-black live-UI graphic.
 *
 * Below the hero, the same below-the-fold sections from / are
 * reused so the prototype can be evaluated in real page context.
 *
 * Lives at /v6 so the production homepage stays untouched until
 * this lands.
 */
export default function V6Page() {
  return (
    <main
      data-bg="dark"
      data-hide-site-header
      style={{ position: "relative", zIndex: 0, background: "#000" }}
    >
      <KineticTypographyHero />
      <Section02Philosophy />
      <Section03OperatingModel />
      <Section04Work />
      <Section05Stats />
      <Section06Clients />
      <Section07Cta />
    </main>
  );
}
