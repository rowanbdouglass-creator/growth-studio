import { HeroDark } from "@/components/sections/HeroDark";
import { ManifestoPin } from "@/components/sections/ManifestoPin";
import { ServicesDark } from "@/components/sections/ServicesDark";
import { WorkDark } from "@/components/sections/WorkDark";
import { ProcessDark } from "@/components/sections/ProcessDark";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { StatsDark } from "@/components/sections/StatsDark";
import { TestimonialDark } from "@/components/sections/TestimonialDark";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * YLB v4 — dark cinematic editorial home.
 * Single scroll story: floating wordmark → manifesto → services →
 * selected work → process → marquee → stats → testimonial → final CTA.
 *
 * Each section is its own dark layer with hairline rules. The signature
 * floating wordmark anchors the hero; scroll handoff is direct (no
 * colour shifts), unified by atmospheric grain + warm vignette globals.
 */
export default function Home() {
  return (
    <main data-bg="dark">
      <HeroDark />
      <ManifestoPin />
      <ServicesDark />
      <WorkDark />
      <ProcessDark />
      <MarqueeStrip />
      <StatsDark />
      <TestimonialDark />
      <FinalCTA />
    </main>
  );
}
