import { SceneStack } from "@/components/fx/SceneStack";
import { MarginRule } from "@/components/fx/MarginRule";
import { HeroLedger } from "@/components/sections/HeroLedger";
import { ThePractice } from "@/components/sections/ThePractice";
import { LedgerWork } from "@/components/sections/LedgerWork";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { ReBooked } from "@/components/sections/ReBooked";
import { CloseCta } from "@/components/sections/CloseCta";

/**
 * Home — v5 "Ledger".
 *
 * Five scenes in a SceneStack: each pins while the next slides over
 * it (outgoing scene scales and dims). HeroLedger opens on the live
 * week, ThePractice states the audit-first model as a docket,
 * LedgerWork runs its own pinned in-place gallery (excluded from the
 * stack's pin via data-no-pin), ProofStrip + ReBooked share a scene
 * (tracked outcomes + repeat bookings), CloseCta closes on the real
 * slot count.
 */
export default function Home() {
  return (
    <main data-bg="dark" style={{ position: "relative", zIndex: 0 }}>
      <MarginRule />
      <SceneStack>
        <HeroLedger />
        <ThePractice />
        <LedgerWork />
        <div>
          <ProofStrip />
          <ReBooked />
        </div>
        <CloseCta />
      </SceneStack>
    </main>
  );
}
