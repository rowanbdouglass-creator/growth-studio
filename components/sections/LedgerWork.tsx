import { APPOINTMENTS } from "@/lib/content/appointments";
import { LedgerPin } from "./LedgerPin";

/**
 * LedgerWork — the work section as a pinned in-place gallery.
 *
 * Server shell: heading block + plain-object entries handed to the
 * LedgerPin client component (sticky frame, layers swap on scroll).
 * The section root carries data-no-pin so SceneStack never pins or
 * scales this scene — its internal sticky gallery owns the scroll.
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
    body: a.body,
    tag: a.tag,
  }));

  return (
    <section id="ledger" data-no-pin className="bg-surface-0">
      <div className="container mx-auto max-w-[1400px] px-6 pb-10 pt-28 md:px-10 lg:pt-36">
        <h2 className="m-0 text-5xl">The ledger.</h2>
        <p className="mt-4 text-lg text-text-2">
          Four entries from the last twelve months.
        </p>
      </div>
      <LedgerPin entries={entries} />
    </section>
  );
}
