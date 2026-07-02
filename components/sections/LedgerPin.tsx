"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORK_SCREENSHOTS } from "@/lib/workMedia";
import { Inview } from "@/components/fx/Inview";
import { CountUp } from "./CountUp";

/**
 * LedgerPin — pinned case-study gallery on a HORIZONTAL track.
 *
 * Desktop + motion: the section is entries.length * 100dvh tall; a
 * sticky stage holds the viewport while a flex track (n * 100% wide)
 * slides laterally, scrubbed by one GSAP tween (X = pages being
 * turned). Progress ticks follow the active index; each entry's
 * outcome figure recounts when its slide activates and Z-punches on
 * first view. The pin/track layout lives behind a
 * (min-width: 1024px) and (prefers-reduced-motion: no-preference)
 * media query in globals.css, so mobile and reduced motion get the
 * plain stacked flow with zero JS motion.
 *
 * Each entry's media wrapper carries viewTransitionName work-{slug},
 * pairing with the case-study page for the shared-element morph.
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
        const track = section.querySelector<HTMLElement>(".pin-track");
        const count = entries.length;
        if (!track || count < 2) return;

        gsap.to(track, {
          xPercent: -((count - 1) / count) * 100,
          ease: "none",
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
      },
    );

    return () => mm.revert();
  }, [entries.length]);

  return (
    <div
      ref={sectionRef}
      style={{
        ["--stack-h" as string]: `${entries.length * 100}dvh`,
        ["--pin-n" as string]: entries.length,
      }}
      className="pin-section"
    >
      <div className="pin-sticky">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <div className="pin-stage relative rounded-lg border border-hairline bg-surface-1">
            <div className="pin-track flex flex-col gap-10">
              {entries.map((entry, i) => {
                const screenshot = WORK_SCREENSHOTS[entry.slug];
                return (
                  <div
                    key={entry.slug}
                    className="entry-slide relative grid grid-cols-1 items-center gap-10 p-8 md:p-12 lg:grid-cols-12"
                  >
                    {/* Media */}
                    <div
                      className="relative lg:col-span-7"
                      style={{
                        ["viewTransitionName" as string]: `work-${entry.slug}`,
                      }}
                    >
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
                      <Inview className="mt-8" threshold={0.5}>
                        <span className="z-punch block">
                          <CountUp
                            key={`${entry.slug}-${activeIdx === i}`}
                            value={entry.outcomeFigure}
                            className="font-display text-6xl font-bold tabular-nums text-accent-text"
                          />
                        </span>
                        <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.18em] text-text-3">
                          {entry.outcomeLabel}
                        </span>
                      </Inview>
                      <Link
                        href={`/work/${entry.slug}`}
                        className="mt-8 inline-block border-b border-hairline-strong pb-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-text-2 hover:text-text-1"
                      >
                        Read the entry &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress ticks */}
            <div className="pin-ticks absolute right-4 top-1/2 -translate-y-1/2 flex-col gap-2">
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
