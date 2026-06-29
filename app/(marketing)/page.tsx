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

/**
 * Home composition. Each section wrapped in a SectionEntry with a
 * different motion variant so the scroll feels orchestrated, not
 * linear:
 *   - Manifesto enters tilted from upper-left
 *   - Services tiles scatter in from different corners
 *   - Work pins horizontally and fades to black into DarkSpacer
 *   - Process rises from below in stagger
 *   - Stats panel snaps in from right at angle
 *   - Testimonial fades up
 *   - Final CTA assembles from below
 *
 * Persistent: vertical red scroll-progress line on the left edge.
 */
export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main data-bg="dark">
        <HeroDark />

        <SectionEntry variant="tilt-left">
          <ManifestoPin />
        </SectionEntry>

        <SectionEntry variant="scatter" staggerSelector=".sv-card">
          <ServicesDark />
        </SectionEntry>

        <WorkTrionn />
        <DarkSpacer />

        <SectionEntry variant="rise-stagger" staggerSelector=".proc-row">
          <ProcessDark />
        </SectionEntry>

        <MarqueeStrip />

        <SectionEntry variant="tilt-right">
          <StatsDark />
        </SectionEntry>

        <SectionEntry variant="fade-up">
          <TestimonialDark />
        </SectionEntry>

        <FinalCTA />
      </main>
    </>
  );
}
