import Link from "next/link";
import { WeekStrip } from "./WeekStrip";

/**
 * HeroLedger — v5 hero.
 *
 * Asymmetric split: the signature claim on the left, the living
 * week-ledger on the right. No eyebrow, no scroll cue, no status
 * pill (the WeekStrip IS the availability, real and computed).
 * One primary CTA intent sitewide: Book a slot.
 */
export function HeroLedger() {
  return (
    <section className="relative flex min-h-[92dvh] items-center bg-surface-0 text-text-1">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-14 px-6 py-24 md:px-10 lg:grid-cols-12 lg:gap-10">
        {/* Claim */}
        <div className="anim-entry lg:col-span-7">
          <h1 className="m-0 max-w-[14ch] text-6xl md:text-7xl">
            Most agencies sell decks.{" "}
            <span className="text-accent-text">
              We sell calendars that&nbsp;fill.
            </span>
          </h1>

          <p className="mt-7 max-w-[44ch] text-lg text-text-2">
            Bespoke software, high-converting sites and paid traffic for UK
            SMEs. Two operators, direct line.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-[999px] bg-accent px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-accent-hover"
            >
              Book a slot <span aria-hidden>&rarr;</span>
            </Link>
            <Link
              href="/work"
              className="border-b border-hairline-strong pb-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-text-2 transition-colors hover:text-text-1"
            >
              See the ledger
            </Link>
          </div>
        </div>

        {/* Living ledger */}
        <div className="flex justify-start lg:col-span-5 lg:justify-end">
          <WeekStrip />
        </div>
      </div>
    </section>
  );
}
