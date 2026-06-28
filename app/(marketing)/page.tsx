import { HeroScrollVideo } from "@/components/sections/HeroScrollVideo";
import { ManifestoPin } from "@/components/sections/ManifestoPin";
import { ServicesDark } from "@/components/sections/ServicesDark";
import { WorkDark } from "@/components/sections/WorkDark";
import { ProcessDark } from "@/components/sections/ProcessDark";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { StatsDark } from "@/components/sections/StatsDark";
import { TestimonialDark } from "@/components/sections/TestimonialDark";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * Home — PrismaHero (video background, top-centre pill nav, massive
 * "booked." headline, side body + CTA) as the hero, followed by the
 * editorial dark sections.
 *
 * NOTE: PrismaHero ships with its own top-centre navbar, so the global
 * site header is hidden on this route via the data-hide-site-header
 * attribute (Header.tsx watches for this).
 */
export default function Home() {
  return (
    <main data-bg="dark" data-hide-site-header>
      <HeroScrollVideo />
      <div id="process">
        <ManifestoPin />
        <ServicesDark />
        <WorkDark />
        <ProcessDark />
        <MarqueeStrip />
        <StatsDark />
        <TestimonialDark />
        <FinalCTA />
      </div>
    </main>
  );
}
