import { HeroFinal } from "@/components/sections/HeroFinal";
import { Section02Philosophy } from "@/components/sections/Section02Philosophy";
import { Section03OperatingModel } from "@/components/sections/Section03OperatingModel";
import { Section04Work } from "@/components/sections/Section04Work";
import { Section05Stats } from "@/components/sections/Section05Stats";
import { Section06Clients } from "@/components/sections/Section06Clients";
import { Section07Cta } from "@/components/sections/Section07Cta";

/**
 * Home — clean HeroFinal (post Spatial-detour) plus the rest of
 * the home sections. VideoBackdrop removed since HeroFinal is
 * opaque and the previous video backdrop wasn't doing useful
 * work under it. Once the lime-lightning Kling clip is ready,
 * it'll plug back in here as a transparent-hero atmospheric
 * layer.
 *
 * Previous home preserved at /v5.
 */
export default function Home() {
  return (
    <main
      data-bg="dark"
      style={{ position: "relative", zIndex: 0 }}
    >
      <HeroFinal />
      <Section02Philosophy />
      <Section03OperatingModel />
      <Section04Work />
      <Section05Stats />
      <Section06Clients />
      <Section07Cta />
    </main>
  );
}
