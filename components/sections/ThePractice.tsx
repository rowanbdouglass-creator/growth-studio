/**
 * ThePractice — how the studio works, told as a docket, not columns.
 *
 * Beat 1: the audit-first claim. Beat 2: a full-width ledger list of
 * the three practice areas, each row linking to its service page.
 * Replaces Section02Philosophy + Section03OperatingModel.
 */

const PRACTICE_ROWS = [
  {
    name: "Software",
    href: "/services/custom-systems",
    body: "Operations platforms that fit the shape of the business. End to end, owned by you, hosted where you want.",
  },
  {
    name: "Sites",
    href: "/services/website-design",
    body: "Marketing sites and storefronts that pass the credibility check in ninety seconds and turn referrals into booked calls.",
  },
  {
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
        <div className="mt-20 border-t border-hairline-strong">
          {PRACTICE_ROWS.map((row) => (
            <a
              key={row.href}
              href={row.href}
              className="anim-reveal group grid grid-cols-1 gap-3 border-b border-hairline px-2 py-8 transition-colors hover:bg-surface-1 md:grid-cols-12 md:items-center md:gap-6 md:px-4"
            >
              <div className="font-display text-3xl font-bold md:col-span-3">
                {row.name}
              </div>
              <p className="m-0 max-w-[58ch] text-base text-text-2 md:col-span-7">
                {row.body}
              </p>
              <div className="md:col-span-2 md:text-right">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-3 transition-colors group-hover:text-accent-text">
                  View &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
