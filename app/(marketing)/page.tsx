import { HeroDark } from "@/components/sections/HeroDark";
import { Section02Philosophy } from "@/components/sections/Section02Philosophy";
import { Section03OperatingModel } from "@/components/sections/Section03OperatingModel";
import { Section04Work } from "@/components/sections/Section04Work";
import { Section05Stats } from "@/components/sections/Section05Stats";
import { Section06Clients } from "@/components/sections/Section06Clients";
import { Section07Cta } from "@/components/sections/Section07Cta";

/**
 * Home — CLONE BUILD complete (portfolio-agency references).
 *
 *   01 Hero               video bg + glass nav + service statement
 *   02 Philosophy         "Most agencies sell decks. We sell calendars
 *                          that fill." + supporting body + anti-list
 *   03 Operating model    Systems / Sites / Traffic — 3 columns
 *   04 Selected work      4 case study cards in 2x2 grid
 *   05 Stats              4 proof figures (£128k / £42,180 / 96 mo / 11→1)
 *   06 Clients            Horizontal marquee of client names
 *   07 The brief          "The right brief finds the right studio." + CTA
 *
 * Previous home preserved at /v5.
 */
export default function Home() {
  return (
    <main data-bg="dark" data-hide-site-header>
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
