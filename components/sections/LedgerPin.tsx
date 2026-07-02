"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORK_SCREENSHOTS } from "@/lib/workMedia";

/**
 * LedgerPin — pinned half-and-half case-study gallery.
 *
 * Desktop: the section is entries.length * 100dvh tall; a sticky frame
 * holds a single stage in the viewport while entry layers swap in
 * place on scroll (scrubbed GSAP timeline; progress ticks track the
 * active entry). Mobile and reduced motion: entries render as normal
 * stacked cards with no GSAP. Replaces LedgerStack.
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
  body: string;
  tag: string;
}

export function LedgerPin({ entries }: { entries: LedgerEntry[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastIdxRef = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const layers = gsap.utils.toArray<HTMLElement>(".entry-layer", section);
        if (layers.length < 2) return;

        gsap.set(layers, { autoAlpha: 0 });
        gsap.set(layers[0], { autoAlpha: 1 });

        const count = layers.length;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              const idx = Math.min(
                count - 1,
                Math.round(self.progress * (count - 1)),
              );
              if (idx !== lastIdxRef.current) {
                lastIdxRef.current = idx;
                setActiveIdx(idx);
              }
            },
          },
        });

        for (let i = 0; i < count - 1; i++) {
          tl.to(
            layers[i],
            { yPercent: -6, autoAlpha: 0, duration: 0.35 },
            i,
          ).fromTo(
            layers[i + 1],
            { yPercent: 10, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.45 },
            i + 0.15,
          );
        }
      },
    );

    return () => mm.revert();
  }, [entries.length]);

  return (
    <div
      ref={sectionRef}
      style={{ ["--stack-h" as string]: `${entries.length * 100}dvh` }}
      className="lg:h-[var(--stack-h)]"
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:items-center">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <div className="relative min-h-[560px] rounded-lg border border-hairline bg-surface-1 p-8 md:p-12">
            <div className="flex flex-col gap-10 lg:block">
              {entries.map((entry, i) => {
                const screenshot = WORK_SCREENSHOTS[entry.slug];
                return (
                  <div
                    key={entry.slug}
                    className={`entry-layer relative grid grid-cols-1 items-center gap-10 p-8 md:p-12 lg:absolute lg:inset-0 lg:grid-cols-12${
                      i > 0 ? " lg:invisible" : ""
                    }`}
                  >
                    {/* Media */}
                    <div className="relative lg:col-span-7">
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
                      <div
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-1/3 rounded-b-md bg-gradient-to-t from-black/70 to-transparent"
                      />
                      <div className="absolute bottom-5 left-5">
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-2">
                          {entry.tag}
                        </div>
                        <div className="font-display text-3xl font-bold text-text-1">
                          {entry.client}
                        </div>
                      </div>
                    </div>

                    {/* Entry copy */}
                    <div className="lg:col-span-5">
                      <div className="font-mono text-xs uppercase tracking-[0.2em] text-text-3">
                        {entry.dayOfWeek} &middot; {entry.monthYear}
                      </div>
                      <h3 className="m-0 mt-3 text-3xl">{entry.headline}</h3>
                      <p className="mt-4 text-base text-text-2">{entry.body}</p>
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
                  </div>
                );
              })}
            </div>

            {/* Progress ticks */}
            <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
              {entries.map((entry, i) => (
                <span
                  key={entry.slug}
                  className={`tick h-6 w-[2px] rounded-sm transition-colors duration-300 ${
                    i === activeIdx ? "bg-accent-text" : "bg-hairline-strong"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
