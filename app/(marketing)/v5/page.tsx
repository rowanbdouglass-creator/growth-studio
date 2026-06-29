import { HeroDarkV5 } from "@/components/sections/HeroDarkV5";
import { ManifestoPinV5 } from "@/components/sections/ManifestoPinV5";
import { ServicesDarkV5 } from "@/components/sections/ServicesDarkV5";
import { WorkTrionnV5 } from "@/components/sections/WorkTrionnV5";
import { ProcessDarkV5 } from "@/components/sections/ProcessDarkV5";
import { StatsDarkV5 } from "@/components/sections/StatsDarkV5";
import { TestimonialDarkV5 } from "@/components/sections/TestimonialDarkV5";
import { FinalCTAV5 } from "@/components/sections/FinalCTAV5";
import { SectionEntry } from "@/components/fx/SectionEntry";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { BgParallax } from "@/components/fx/BgParallax";

/**
 * /v5 — snapshot of the previous home (lime/Bricolage/Newsreader dark
 * editorial + Process staircase + Services posters + Trionn carousel).
 * Preserved verbatim so we can revert or reference.
 *
 * Frozen at commit 1f3754f. Components suffixed V5 so changes to the
 * main home don't bleed into this snapshot.
 */
export default function V5Home() {
  return (
    <>
      <BgParallax />
      <ScrollProgress />
      <main data-bg="dark" style={{ position: "relative", zIndex: 1 }}>
        <HeroDarkV5 />

        <SectionEntry>
          <ManifestoPinV5 />
        </SectionEntry>

        <SectionEntry>
          <ServicesDarkV5 />
        </SectionEntry>

        <WorkTrionnV5 />

        <SectionEntry>
          <ProcessDarkV5 />
        </SectionEntry>

        <SectionEntry>
          <StatsDarkV5 />
        </SectionEntry>

        <SectionEntry>
          <TestimonialDarkV5 />
        </SectionEntry>

        <FinalCTAV5 />
      </main>
    </>
  );
}
