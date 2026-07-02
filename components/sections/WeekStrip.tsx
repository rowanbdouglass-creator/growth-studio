"use client";

import { useEffect, useState } from "react";
import { WEEK_AVAILABILITY, openSlotCount } from "@/lib/availability";

/**
 * WeekStrip — the hero's living proof object.
 *
 * Renders the CURRENT calendar week (real computed dates, real ISO
 * week number) as a vertical ledger. Availability comes from
 * lib/availability.ts. Entries stamp in one-by-one on load using the
 * signature stamp motion.
 *
 * Dates are computed client-side after mount to avoid hydration
 * mismatch; the frame renders at full size immediately so there is
 * zero layout shift.
 */

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function mondayOfCurrentWeek(now: Date): Date {
  const d = new Date(now);
  const day = (d.getDay() + 6) % 7; // Mon=0 ... Sun=6
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isoWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export function WeekStrip() {
  const [week, setWeek] = useState<{ dates: number[]; weekNo: number; todayIdx: number } | null>(null);
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    const now = new Date();
    const monday = mondayOfCurrentWeek(now);
    const dates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d.getDate();
    });
    setWeek({
      dates,
      weekNo: isoWeekNumber(now),
      todayIdx: (now.getDay() + 6) % 7,
    });
    const t = window.setTimeout(() => setStamped(true), 350);
    return () => window.clearTimeout(t);
  }, []);

  const open = openSlotCount();

  return (
    <div aria-label="This week's availability" className="w-full max-w-[420px]">
      {/* Ledger head */}
      <div className="flex items-baseline justify-between border-b border-hairline-strong pb-3">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-text-3">
          {week ? `Week ${week.weekNo}` : "This week"}
        </span>
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-text">
          {open} slot{open === 1 ? "" : "s"} open
        </span>
      </div>

      {/* Entries */}
      <ul className="m-0 list-none p-0">
        {DAY_LABELS.map((label, i) => {
          const status = WEEK_AVAILABILITY[i];
          const isToday = week?.todayIdx === i;
          return (
            <li
              key={label}
              className={`stamp flex items-center gap-4 border-b border-hairline py-3 ${
                stamped ? "is-inview" : ""
              }`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="w-10 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-text-3">
                {label}
              </span>
              <span className="w-8 font-display text-lg font-bold tabular-nums text-text-2">
                {week ? String(week.dates[i]).padStart(2, "0") : "--"}
              </span>

              {status === "booked" && (
                <span className="flex-1">
                  <span className="block h-6 rounded-sm bg-surface-3" aria-hidden />
                  <span className="sr-only">Booked</span>
                </span>
              )}
              {status === "open" && (
                <a
                  href="/contact"
                  className="flex h-9 flex-1 items-center justify-between rounded-sm border border-accent bg-accent-soft px-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-accent-text transition-colors hover:bg-accent hover:text-white"
                >
                  Open slot
                  <span aria-hidden>&rarr;</span>
                </a>
              )}
              {status === "off" && (
                <span className="flex-1 font-mono text-[11px] uppercase tracking-[0.18em] text-text-3/50">
                  &nbsp;
                </span>
              )}

              {isToday && (
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-text-3">
                  Today
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
