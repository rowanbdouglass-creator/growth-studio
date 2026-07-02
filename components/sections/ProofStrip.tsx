import { CountUp } from "./CountUp";

/**
 * ProofStrip — four tracked outcomes in a bordered strip.
 * Carries the single allowed eyebrow on the page.
 * Replaces Section05Stats.
 */

const STATS: [string, string][] = [
  ["£128k", "Revenue tracked through one system, 12 months"],
  ["£42,180", "Ad spend recovered in 90 days"],
  ["96 hrs", "Recovered monthly for one client team"],
  ["11 to 1", "Days to quote, before and after"],
];

export function ProofStrip() {
  return (
    <section className="bg-surface-0">
      <div className="container mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <div className="mb-8 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-text-3">
          Tracked outcomes
        </div>
        <div className="grid grid-cols-2 divide-x divide-hairline border-y border-hairline-strong lg:grid-cols-4">
          {STATS.map(([figure, label]) => (
            <div key={label} className="p-8">
              <CountUp value={figure} />
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-text-3">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
