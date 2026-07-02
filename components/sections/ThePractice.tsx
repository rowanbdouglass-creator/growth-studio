import { Inview } from "@/components/fx/Inview";
import { PracticePreview } from "@/components/fx/PracticePreview";

/**
 * ThePractice — how the studio works, told as a docket, not columns.
 *
 * Beat 1: the audit-first claim. Beat 2: a full-width ledger list of
 * the three practice areas, each row linking to its service page.
 * Each row's bottom rule DRAWS itself left-to-right (X = being
 * written) as the row enters view; hovering a row inks it over
 * left-to-right (same X grammar) and floats a cursor-follow preview
 * (desktop + motion only). Replaces Section02Philosophy +
 * Section03OperatingModel.
 */

// Temporary stock previews — the user will replace these with real
// product shots per practice area.
const PREVIEW_IMAGES: Record<string, string> = {
  software: "https://picsum.photos/seed/ylb-practice-software/640/400",
  sites: "https://picsum.photos/seed/ylb-practice-sites/640/400",
  traffic: "https://picsum.photos/seed/ylb-practice-traffic/640/400",
};

const PRACTICE_ROWS = [
  {
    key: "software",
    name: "Software",
    href: "/services/custom-systems",
    body: "Operations platforms that fit the shape of the business. End to end, owned by you, hosted where you want.",
  },
  {
    key: "sites",
    name: "Sites",
    href: "/services/website-design",
    body: "Marketing sites and storefronts that pass the credibility check in ninety seconds and turn referrals into booked calls.",
  },
  {
    key: "traffic",
    name: "Traffic",
    href: "/services/paid-traffic",
    body: "Paid acquisition run daily by the two operators who own the work. Qualified, attributable, no account managers.",
  },
];

export function ThePractice() {
  return (
    <section className="bg-surface-0 text-text-1">
      <div className="container mx-auto max-w-[1400px] px-6 py-28 md:px-10 lg:py-36">
        {/* Beat 1 */}
        <h2 className="m-0 max-w-[20ch] text-5xl">
          We open the numbers before we write a word.
        </h2>
        <p className="mt-6 max-w-[52ch] text-lg text-text-2">
          We don&rsquo;t pitch. We open your ad accounts, read the numbers and
          write the scope. The first invoice is for completed work, never for
          deferred promises.
        </p>

        {/* Beat 2 — the docket */}
        <PracticePreview
          images={PREVIEW_IMAGES}
          className="mt-20 border-t border-hairline-strong"
        >
          {PRACTICE_ROWS.map((row) => (
            <Inview key={row.href} className="relative" threshold={0.3}>
              <a
                href={row.href}
                data-preview={row.key}
                className="anim-reveal group relative grid grid-cols-1 gap-3 px-2 py-10 md:grid-cols-12 md:items-center md:gap-6 md:px-4 lg:py-14"
              >
                {/* Ink-fill layer: the row is written over on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-text-1 transition-transform duration-[450ms] ease-[var(--ease-out-quint)] group-hover:scale-x-100"
                />
                <div className="relative z-10 font-display text-5xl font-black transition-colors group-hover:text-surface-0 md:col-span-3 lg:text-6xl">
                  {row.name}
                </div>
                <p className="relative z-10 m-0 max-w-[58ch] text-base text-text-2 transition-colors group-hover:text-[rgba(10,11,13,0.7)] md:col-span-7">
                  {row.body}
                </p>
                <div className="relative z-10 md:col-span-2 md:text-right">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-3 transition-colors group-hover:font-bold group-hover:text-[var(--color-accent)]">
                    View &rarr;
                  </span>
                </div>
              </a>
              <span
                aria-hidden
                className="draw-x absolute inset-x-0 bottom-0 h-px bg-hairline"
              />
            </Inview>
          ))}
        </PracticePreview>
      </div>
    </section>
  );
}
