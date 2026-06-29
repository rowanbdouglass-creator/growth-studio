import { HeroDark } from "@/components/sections/HeroDark";
import { ManifestoPin } from "@/components/sections/ManifestoPin";
import { ServicesDark } from "@/components/sections/ServicesDark";
import { WorkTrionn } from "@/components/sections/WorkTrionn";
import { ProcessDark } from "@/components/sections/ProcessDark";
import { StatsDark } from "@/components/sections/StatsDark";
import { TestimonialDark } from "@/components/sections/TestimonialDark";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionEntry } from "@/components/fx/SectionEntry";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { BgParallax } from "@/components/fx/BgParallax";

/**
 * Home composition (v5):
 *  - BgParallax behind everything (calendar grid + warm bloom at
 *    0.3× / 0.15× page velocity — spatial-continuity thread)
 *  - Removed: DarkSpacer (was reading as empty filler between Work
 *    and Process), MarqueeStrip (dates were meaningless)
 *  - Services rebuilt as editorial poster spread (different motion
 *    from Process — no pinning, zig-zag asymmetric, parallax depth)
 *  - Process rebuilt as visual staircase (literal stair shape, each
 *    step offset right + up + connected by diagonal red line)
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

        <SectionEntry>
          <ProcessDark />
        </SectionEntry>

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
