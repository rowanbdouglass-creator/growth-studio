import { VideoBackdrop } from "@/components/sections/VideoBackdrop";
import { HeroFinal } from "@/components/sections/HeroFinal";
import { Section02Philosophy } from "@/components/sections/Section02Philosophy";
import { Section03OperatingModel } from "@/components/sections/Section03OperatingModel";
import { Section04Work } from "@/components/sections/Section04Work";
import { Section05Stats } from "@/components/sections/Section05Stats";
import { Section06Clients } from "@/components/sections/Section06Clients";
import { Section07Cta } from "@/components/sections/Section07Cta";

/**
 * Home — lime lightning backdrop bleeds through hero + sections
 * 02 + 03. Solid sections from 04 onward hide it. Architecture:
 *
 *   00 VideoBackdrop      fixed, full-viewport, behind everything
 *   01 HeroFinal          transparent — lightning shows fully
 *   02 Philosophy         translucent veil — lightning bleeds
 *   03 Operating model    translucent veil — lightning fades
 *   04 Selected work      solid night — lightning hidden
 *   05–07                 solid
 *
 * Previous home preserved at /v5.
 */
export default function Home() {
  return (
    <main
      data-bg="dark"
      style={{ position: "relative", zIndex: 0 }}
    >
      <VideoBackdrop />
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
