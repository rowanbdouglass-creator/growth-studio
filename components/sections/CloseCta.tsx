import Link from "next/link";
import { openSlotCount } from "@/lib/availability";

/**
 * CloseCta — the closing beat. One booking CTA, direct email, and the
 * real slot count from the availability ledger.
 * Replaces Section07Cta.
 */
export function CloseCta() {
  const open = openSlotCount();

  return (
    <section className="border-t border-hairline bg-surface-0">
      <div className="container mx-auto max-w-[1400px] px-6 py-28 md:px-10 lg:py-36">
        <h2 className="m-0 max-w-[14ch] text-6xl">
          Bring numbers. Leave with a plan.
        </h2>
        <p className="mt-6 max-w-[46ch] text-lg text-text-2">
          A thirty minute call. We tell you what we would do, in writing,
          before you pay anything.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-[999px] bg-accent px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-accent-hover"
          >
            Book a slot <span aria-hidden>&rarr;</span>
          </Link>
          <a
            href="mailto:hello@youlookbooked.com"
            className="border-b border-hairline-strong pb-1 font-mono text-xs uppercase tracking-[0.18em] text-text-2 transition-colors hover:text-text-1"
          >
            hello@youlookbooked.com
          </a>
        </div>

        <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-text">
          {open} slot{open === 1 ? "" : "s"} open this week
        </div>
      </div>
    </section>
  );
}
