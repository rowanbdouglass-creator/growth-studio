import { HeroDark } from "@/components/sections/HeroDark";
import { WarpSection } from "@/components/sections/WarpSection";
import { ManifestoPin } from "@/components/sections/ManifestoPin";
import { ServicesDark } from "@/components/sections/ServicesDark";
import { WorkHorizontal } from "@/components/sections/WorkHorizontal";
import { ProcessDark } from "@/components/sections/ProcessDark";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { StatsDark } from "@/components/sections/StatsDark";
import { TestimonialDark } from "@/components/sections/TestimonialDark";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main data-bg="dark">
      <HeroDark />
      <WarpSection />
      <ManifestoPin />
      <ServicesDark />
      <WorkHorizontal />
      <ProcessDark />
      <MarqueeStrip />
      <StatsDark />
      <TestimonialDark />
      <FinalCTA />
    </main>
  );
}
