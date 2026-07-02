/**
 * Live weekly availability — the single place to update it.
 *
 * Indexes 0-6 = Monday-Sunday of the CURRENT week (dates are computed,
 * never hardcoded). Set each day to:
 *   "booked" - slot taken (renders as a filled ledger entry)
 *   "open"   - slot available (renders highlighted, drives the
 *              "N SLOTS OPEN" caption and the CTA truthfully)
 *   "off"    - not a working day
 *
 * This replaces every hardcoded "Available Week 27" / fake-Calendly
 * string on the old site. Update it when the diary changes; everything
 * that displays availability reads from here.
 */
export type DayStatus = "booked" | "open" | "off";

export const WEEK_AVAILABILITY: DayStatus[] = [
  "booked", // Mon
  "booked", // Tue
  "booked", // Wed
  "open",   // Thu
  "booked", // Fri
  "off",    // Sat
  "off",    // Sun
];

export const openSlotCount = () =>
  WEEK_AVAILABILITY.filter((s) => s === "open").length;

/** ISO-8601 week number for a date (client-side date maths, no deps). */
export function isoWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

/** Monday (00:00 local) of the week containing `now`. */
export function mondayOfCurrentWeek(now: Date): Date {
  const d = new Date(now);
  const day = (d.getDay() + 6) % 7; // Mon=0 ... Sun=6
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}
