import { HeroDark } from "@/components/sections/HeroDark";
import { Section02Philosophy } from "@/components/sections/Section02Philosophy";

/**
 * Home — CLONE BUILD IN PROGRESS (portfolio references).
 *
 * Section 01 (Hero) shipped. Building 02–07 next, modelled on Ascend
 * Marketing + Code by Jesse + Tony Mak (NOT peachweb).
 *
 * Previous home preserved at /v5.
 */
export default function Home() {
  return (
    <main data-bg="dark" data-hide-site-header>
      <HeroDark />
      <Section02Philosophy />
    </main>
  );
}
