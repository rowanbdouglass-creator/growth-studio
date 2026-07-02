import { APPOINTMENTS } from "@/lib/content/appointments";
import { LedgerStack } from "./LedgerStack";

/**
 * LedgerWork — the work section as a sticky ledger stack.
 *
 * Server shell: heading block + plain-object entries handed to the
 * LedgerStack client component (GSAP pin + scale-away).
 * Replaces Section04Work.
 */
export function LedgerWork() {
  const entries = APPOINTMENTS.map((a) => ({
    slug: a.slug,
    dayOfWeek: a.dayOfWeek,
    day: a.day,
    monthYear: a.monthYear,
    client: a.client,
    headline: a.headline,
    outcomeFigure: a.outcomeFigure,
    outcomeLabel: a.outcomeLabel,
  }));

  return (
    <section id="ledger" className="bg-surface-0">
      <div className="container mx-auto max-w-[1400px] px-6 pb-10 pt-28 md:px-10 lg:pt-36">
        <h2 className="m-0 text-5xl">The ledger.</h2>
        <p className="mt-4 text-lg text-text-2">
          Four entries from the last twelve months.
        </p>
      </div>
      <LedgerStack entries={entries} />
    </section>
  );
}
