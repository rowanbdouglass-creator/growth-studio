import Link from "next/link";
import { DiaryDate } from "./DiaryDate";
import { HeroWeekSpread } from "./HeroWeekSpread";

/**
 * HeroLedger — v5.1: the hero IS a ledger page.
 *
 * Ruled-paper world (CSS baselines + one margin rule), a diary-entry
 * header, a three-line headline that wipes in horizontally (X = the
 * week being written), and the floor: the current week as a full-bleed
 * seven-day spread where the open day IS the CTA. No pill button; one
 * primary intent sitewide: Book a slot.
 */
export function HeroLedger() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-between bg-surface-0 text-text-1">
      {/* Ruled-paper world layer */}
      <div aria-hidden className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0 55px, var(--color-hairline) 55px 56px)",
          }}
        />
        <div className="absolute left-[12%] top-0 h-full w-px bg-hairline-strong" />
      </div>

      {/* Diary header + headline */}
      <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-28 md:px-10">
        <div className="flex items-baseline justify-between gap-6">
          <DiaryDate />
          <Link
            href="/work"
            className="shrink-0 border-b border-hairline-strong pb-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-text-2 transition-colors hover:text-text-1"
          >
            See the ledger
          </Link>
        </div>

        <h1 className="m-0 mt-10 max-w-none font-display text-5xl font-black leading-[1.06] md:text-7xl lg:text-display">
          <span className="block overflow-hidden">
            <span className="wipe-line block" style={{ animationDelay: "0ms" }}>
              Most agencies
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="wipe-line block"
              style={{ animationDelay: "120ms" }}
            >
              sell decks.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="wipe-line block text-accent-text"
              style={{ animationDelay: "240ms" }}
            >
              We fill calendars.
            </span>
          </span>
        </h1>

        <p className="mt-8 max-w-[46ch] text-lg text-text-2">
          Bespoke software, high-converting sites and paid traffic for UK
          SMEs. Two operators, direct line.
        </p>
      </div>

      {/* The floor: this week, full bleed. The open day is the CTA. */}
      <div className="relative mt-16">
        <HeroWeekSpread />
      </div>
    </section>
  );
}
