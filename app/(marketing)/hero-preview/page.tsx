import type { Metadata } from "next";
import { HeroCrowd } from "@/components/sections/HeroCrowd";

export const metadata: Metadata = {
  title: "Hero preview",
  robots: { index: false, follow: false },
};

/**
 * /hero-preview — scaffold for the YOU / eyes / BOOKED crowd hero.
 * Not linked from anywhere and noindexed; the live homepage hero
 * (HeroLedger) is untouched. The trailing placeholder section exists
 * so the pin release can be felt when scrolling past.
 */
export default function HeroPreviewPage() {
  return (
    <>
      <main style={{ backgroundColor: "#000" }}>
        <HeroCrowd />
      </main>
      <section className="flex h-[100dvh] items-center justify-center bg-surface-0">
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-text-3">
          Next section placeholder
        </p>
      </section>
    </>
  );
}
