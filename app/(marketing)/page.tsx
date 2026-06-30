import { ScrollIntroVideo } from "@/components/sections/ScrollIntroVideo";
import { VideoBackdrop } from "@/components/sections/VideoBackdrop";
import { HeroFinal } from "@/components/sections/HeroFinal";
import { Section02Philosophy } from "@/components/sections/Section02Philosophy";
import { Section03OperatingModel } from "@/components/sections/Section03OperatingModel";
import { Section04Work } from "@/components/sections/Section04Work";
import { Section05Stats } from "@/components/sections/Section05Stats";
import { Section06Clients } from "@/components/sections/Section06Clients";
import { Section07Cta } from "@/components/sections/Section07Cta";

/**
 * Home — full composition:
 *
 *   00 ScrollIntroVideo   sticky 100vh, scroll-scrubs the intro
 *                         ("Final Comp.mp4" — bespoke / custom / paid)
 *   01 VideoBackdrop      fixed lime-lightning behind the hero +
 *                         sections 02 / 03
 *   02 HeroFinal          settles in after the intro scrolls through
 *   03 Philosophy         translucent veil — lightning bleeds
 *   04 Operating model    translucent veil — lightning fades
 *   05 Selected work      solid night
 *   06 Stats              solid
 *   07 Clients            solid
 *   08 The brief          solid
 *
 * Previous home preserved at /v5.
 */
export default function Home() {
  return (
    <main
      data-bg="dark"
      style={{ position: "relative", zIndex: 0 }}
    >
      <ScrollIntroVideo />
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
