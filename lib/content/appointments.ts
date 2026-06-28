/**
 * Past appointments (case studies). Single source of truth — referenced
 * by the home page section and by /work + /work/[slug] pages.
 *
 * Each appointment is "scheduled" with a date, duration, attendees,
 * status — fitting the calendar/booking metaphor.
 */
export interface Appointment {
  slug: string;
  dayOfWeek: string;
  day: string;
  monthYear: string;
  durationMeta: string[];
  tag: string;
  client: string;
  headline: string;
  body: string;
  outcomeFigure: string;
  outcomeLabel: string;
  scheduled: string;
  next: string;
}

export const APPOINTMENTS: Appointment[] = [
  {
    slug: "nayims",
    dayOfWeek: "MON",
    day: "14",
    monthYear: "MAY · 2025",
    durationMeta: ["14 WEEKS", "SHIPPED", "3 ATTENDEES"],
    tag: "CUSTOM SYSTEMS",
    client: "NAYIM'S EMBROIDERIES",
    headline: "The quote-to-order hub that grew with Nayim's.",
    body: "Replaced QuickBooks + Excel + Trello with a custom ops platform: estimating, invoicing, stock per-line, mockup gating, customer portal, designer multi-placement, QB sync. WordPress + Sage + Vue.",
    outcomeFigure: "£128k",
    outcomeLabel: "TRACKED THROUGH NEW FLOW · 12 MO",
    scheduled: "Bi-weekly demos",
    next: "AI calling agent Q3",
  },
  {
    slug: "jc-setton",
    dayOfWeek: "WED",
    day: "22",
    monthYear: "JAN · 2025",
    durationMeta: ["6 WEEKS", "ONGOING", "2 ATTENDEES"],
    tag: "WEBSITE + PAID AUDIT",
    client: "JC SETTON OPTICIANS",
    headline:
      "Storefront rebuild + £42k recovered from misallocated Meta spend.",
    body: "Phase 1 storefront delivered on Salient + WooCommerce. Phase 2 staff hub in design. Discovered substantial misallocated Meta spend during the initial audit; restructured campaigns; built out booking CRM.",
    outcomeFigure: "£42,180",
    outcomeLabel: "RECOVERED FROM MISTRACKED SPEND",
    scheduled: "Phase 2 build",
    next: "Staff hub Sep 2026",
  },
  {
    slug: "cape-kings",
    dayOfWeek: "TUE",
    day: "20",
    monthYear: "MAY · 2025",
    durationMeta: ["11 DAYS", "STABILISED", "24/7"],
    tag: "SECURITY + RECOVERY",
    client: "CAPE KINGS",
    headline:
      "15-month compromise resolved in 11 days. Quote turnaround: 1 day.",
    body: "Discovered 4 backdoors, 109 attacker admins, 4k spam posts. Stabilised within 72 hours. Rebuilt quoting flow alongside — quotes that previously took 11 days now go out in 1.",
    outcomeFigure: "11 → 1",
    outcomeLabel: "DAYS TO QUOTE POST-RECOVERY",
    scheduled: "Quarterly health-check",
    next: "28 Jul 2026",
  },
  {
    slug: "forum-studios",
    dayOfWeek: "THU",
    day: "08",
    monthYear: "FEB · 2024",
    durationMeta: ["ONGOING", "RETAINED", "4 ATTENDEES"],
    tag: "SYSTEMS + AUTOMATION",
    client: "FORUM STUDIOS",
    headline: "Operations hub recovered 96 hours per month across the team.",
    body: "Replaced manual handoffs between four roles with an automated operations platform: project intake, asset routing, invoice generation, weekly reporting. Compounding time savings tracked monthly since launch.",
    outcomeFigure: "96 hrs / mo",
    outcomeLabel: "OPERATIONAL TIME RECOVERED",
    scheduled: "Monthly review",
    next: "03 Jul 2026",
  },
];
