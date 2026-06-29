import { VideoBackdrop } from "@/components/sections/VideoBackdrop";
import { HeroDark } from "@/components/sections/HeroDark";
import { Section02Philosophy } from "@/components/sections/Section02Philosophy";
import { Section03OperatingModel } from "@/components/sections/Section03OperatingModel";
import { Section04Work } from "@/components/sections/Section04Work";
import { Section05Stats } from "@/components/sections/Section05Stats";
import { Section06Clients } from "@/components/sections/Section06Clients";
import { Section07Cta } from "@/components/sections/Section07Cta";

/**
 * Home — CLONE BUILD with persistent video backdrop.
 *
 *   00 VideoBackdrop      fixed, full-viewport, behind everything
 *   01 Hero               transparent — video shows fully
 *   02 Philosophy         dark veil (~78%) — video bleeds through
 *   03 Operating model    dark veil (~88%) — video almost gone
 *   04 Selected work      solid night — fully landed
 *   05 Stats              solid
 *   06 Clients            solid
 *   07 The brief          solid
 *
 * Previous home preserved at /v5.
 */
export default function Home() {
  return (
    <main
      data-bg="dark"
      data-hide-site-header
      style={{ position: "relative", zIndex: 0 }}
    >
      <VideoBackdrop />
      <HeroDark />
      <Section02Philosophy />
      <Section03OperatingModel />
      <Section04Work />
      <Section05Stats />
      <Section06Clients />
      <Section07Cta />
    </main>
  );
}
