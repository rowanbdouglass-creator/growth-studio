import { HeroFinal } from "@/components/sections/HeroFinal";
import { Section02Philosophy } from "@/components/sections/Section02Philosophy";
import { Section03OperatingModel } from "@/components/sections/Section03OperatingModel";
import { Section04Work } from "@/components/sections/Section04Work";
import { Section05Stats } from "@/components/sections/Section05Stats";
import { Section07Cta } from "@/components/sections/Section07Cta";

/**
 * Home — v5 "Ledger" rebuild in progress.
 *
 * Killed this pass: scroll-video intro, lime-lightning backdrop,
 * clients marquee. Remaining sections render on the new token
 * system (cobalt ink on cool night) and are being replaced
 * one-by-one with the Ledger sections.
 */
export default function Home() {
  return (
    <main data-bg="dark" style={{ position: "relative", zIndex: 0 }}>
      <HeroFinal />
      <Section02Philosophy />
      <Section03OperatingModel />
      <Section04Work />
      <Section05Stats />
      <Section07Cta />
    </main>
  );
}
