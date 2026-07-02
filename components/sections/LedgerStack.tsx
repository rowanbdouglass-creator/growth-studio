"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORK_SCREENSHOTS } from "@/lib/workMedia";

/**
 * LedgerStack — sticky-stack case-study cards.
 *
 * Each card except the last pins at the top of the viewport while the
 * next one scrolls over it, scaling and fading the covered card away.
 * Reduced motion: no triggers, cards stack as normal flow.
 */

export interface LedgerEntry {
  slug: string;
  dayOfWeek: string;
  day: string;
  monthYear: string;
  client: string;
  headline: string;
  outcomeFigure: string;
  outcomeLabel: string;
}

export function LedgerStack({ entries }: { entries: LedgerEntry[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".ledger-card");
      if (cards.length < 2) return;
      const last = cards[cards.length - 1];

      cards.forEach((card, i) => {
        if (card === last) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: last,
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {entries.map((entry) => {
        const screenshot = WORK_SCREENSHOTS[entry.slug];
        return (
          <article
            key={entry.slug}
            className="ledger-card flex min-h-[100dvh] items-center bg-surface-0"
          >
            <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
              <div className="grid grid-cols-1 gap-10 rounded-lg border border-hairline bg-surface-1 p-8 md:p-12 lg:grid-cols-12 lg:items-center">
                {/* Date monolith + entry */}
                <div className="lg:col-span-5">
                  <div className="font-mono text-xs uppercase tracking-[0.2em] text-text-3">
                    {entry.dayOfWeek} &middot; {entry.monthYear}
                  </div>
                  <div className="font-display text-display font-black leading-none">
                    {entry.day}
                  </div>
                  <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-text">
                    {entry.client}
                  </div>
                  <h3 className="m-0 mt-2 text-3xl">{entry.headline}</h3>
                  <div className="mt-8">
                    <span className="block font-display text-6xl font-bold text-accent-text">
                      {entry.outcomeFigure}
                    </span>
                    <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.18em] text-text-3">
                      {entry.outcomeLabel}
                    </span>
                  </div>
                  <a
                    href={`/work/${entry.slug}`}
                    className="mt-8 inline-block border-b border-hairline-strong pb-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-text-2 hover:text-text-1"
                  >
                    Read the entry &rarr;
                  </a>
                </div>

                {/* Screenshot slot */}
                <div className="lg:col-span-7">
                  {typeof screenshot === "string" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={screenshot}
                      alt={`${entry.client} product screenshot`}
                      className="aspect-[16/10] w-full rounded-md border border-hairline object-cover object-top"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex aspect-[16/10] w-full items-center justify-center rounded-md border border-dashed border-hairline-strong bg-surface-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-3">
                        Product screenshot pending
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
