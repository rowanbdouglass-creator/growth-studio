import { HeroLedger } from "@/components/sections/HeroLedger";
import { ThePractice } from "@/components/sections/ThePractice";
import { LedgerWork } from "@/components/sections/LedgerWork";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { ReBooked } from "@/components/sections/ReBooked";
import { CloseCta } from "@/components/sections/CloseCta";

/**
 * Home — v5 "Ledger".
 *
 * The appointment book is the site: HeroLedger opens on the live
 * week, ThePractice states the audit-first model as a docket,
 * LedgerWork sticky-stacks four case entries, ProofStrip counts the
 * tracked outcomes, ReBooked stamps the repeat bookings, CloseCta
 * closes on the real slot count.
 */
export default function Home() {
  return (
    <main data-bg="dark" style={{ position: "relative", zIndex: 0 }}>
      <HeroLedger />
      <ThePractice />
      <LedgerWork />
      <ProofStrip />
      <ReBooked />
      <CloseCta />
    </main>
  );
}
