import { PrismaHero } from "@/components/ui/prisma-hero";
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

/**
 * Home composition. PrismaHero (video bg + "you look BOOKED.") sits
 * above the simpler HeroDark as a backup option. Warp section removed
 * (didn't fit). Work uses the new 50/50 rise-up pattern followed by a
 * dark empty spacer.
 */
export default function Home() {
  return (
    <main data-bg="dark">
      <PrismaHero />
      <HeroDark />
      <ManifestoPin />
      <ServicesDark />
      <WorkTrionn />
      <DarkSpacer />
      <ProcessDark />
      <MarqueeStrip />
      <StatsDark />
      <TestimonialDark />
      <FinalCTA />
    </main>
  );
}
