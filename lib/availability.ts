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
