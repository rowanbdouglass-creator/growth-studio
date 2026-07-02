"use client";

import { useEffect, useState } from "react";
import {
  WEEK_AVAILABILITY,
  mondayOfCurrentWeek,
} from "@/lib/availability";

/**
 * HeroWeekSpread — the hero's floor: the current week as a full-bleed
 * seven-column diary spread. Availability reads from lib/availability;
 * dates and the Today marker are computed client-side after mount (the
 * grid itself renders immediately, so ink bars animate on load with no
 * layout shift). The open day IS the CTA: the whole cell links to
 * /contact.
 */

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function HeroWeekSpread() {
  const [week, setWeek] = useState<{ dates: string[]; todayIdx: number } | null>(
    null,
  );

  useEffect(() => {
    const now = new Date();
    const monday = mondayOfCurrentWeek(now);
    const dates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return String(d.getDate()).padStart(2, "0");
    });
    setWeek({ dates, todayIdx: (now.getDay() + 6) % 7 });
  }, []);

  return (
    <div
      aria-label="This week's availability"
      className="relative w-full border-t border-hairline-strong"
    >
      <div className="grid grid-cols-7 divide-x divide-hairline">
        {DAY_LABELS.map((label, i) => {
          const status = WEEK_AVAILABILITY[i];
          const isToday = week?.todayIdx === i;
          const date = week ? week.dates[i] : "--";

          const head = (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-x-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-3 lg:text-xs">
                  {label}
                </span>
                {isToday && (
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-3">
                    Today
                  </span>
                )}
              </div>
              <span className="mt-1 block font-display text-xl font-bold tabular-nums text-text-2 lg:text-2xl">
                {date}
              </span>
            </>
          );

          if (status === "open") {
            return (
              <a
                key={label}
                href="/contact"
                className="cell-breathe group flex min-h-[120px] flex-col border-t-2 border-accent bg-accent-soft p-2 transition-colors hover:bg-accent sm:p-4 lg:min-h-[150px] lg:p-6"
              >
                {head}
                <span className="mt-auto block pt-2">
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-accent-text transition-colors group-hover:text-white lg:text-[11px]">
                    Open
                  </span>
                  <span className="mt-0.5 block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-accent-text transition-colors group-hover:text-white lg:text-[11px]">
                    Book a slot <span aria-hidden>&rarr;</span>
                  </span>
                </span>
              </a>
            );
          }

          return (
            <div
              key={label}
              className="flex min-h-[120px] flex-col p-2 sm:p-4 lg:min-h-[150px] lg:p-6"
            >
              {head}
              {status === "booked" && (
                <span className="mt-auto block pt-2">
                  <span
                    aria-hidden
                    className="bar-in block h-2 w-full rounded-sm bg-surface-3 lg:h-2.5"
                    style={{ animationDelay: `${i * 90}ms` }}
                  />
                  <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.14em] text-text-3">
                    Booked
                  </span>
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
