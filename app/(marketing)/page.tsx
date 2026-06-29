import { HeroDark } from "@/components/sections/HeroDark";
import { ManifestoPin } from "@/components/sections/ManifestoPin";
import { ServicesDark } from "@/components/sections/ServicesDark";
import { WorkTrionn } from "@/components/sections/WorkTrionn";
import { DarkSpacer } from "@/components/sections/DarkSpacer";
import { ProcessDark } from "@/components/sections/ProcessDark";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { StatsDark } from "@/components/sections/StatsDark";
import { TestimonialDark } from "@/components/sections/TestimonialDark";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionEntry } from "@/components/fx/SectionEntry";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { BgParallax } from "@/components/fx/BgParallax";

/**
 * Home composition.
 *
 * Per audit findings:
 *  - BgParallax sits fixed behind everything → persistent atmospheric
 *    thread (calendar grid + warm bloom) that scrolls at 0.3× page
 *    speed. This is the spatial-continuity layer the ui-ux-pro-max
 *    audit identified as missing.
 *  - SectionEntry now uses ONE unified motion variant (fade-up) across
 *    every section, satisfying the motion-consistency rule.
 *  - WorkTrionn keeps its pin (deliberate hierarchical move) and fades
 *    to black into DarkSpacer for a seamless handoff.
 */
export default function Home() {
  return (
    <>
      <BgParallax />
      <ScrollProgress />
      <main data-bg="dark" style={{ position: "relative", zIndex: 1 }}>
        <HeroDark />

        <SectionEntry>
          <ManifestoPin />
        </SectionEntry>

        <SectionEntry>
          <ServicesDark />
        </SectionEntry>

        <WorkTrionn />
        <DarkSpacer />

        <SectionEntry>
          <ProcessDark />
        </SectionEntry>

        <MarqueeStrip />

        <SectionEntry>
          <StatsDark />
        </SectionEntry>

        <SectionEntry>
          <TestimonialDark />
        </SectionEntry>

        <FinalCTA />
      </main>
    </>
  );
}
