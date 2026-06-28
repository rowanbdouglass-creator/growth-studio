/**
 * Past appointments (case studies). Single source of truth — referenced
 * by the home page section, /work index, and each /work/[slug] page.
 */
export interface AppointmentStat {
  figure: string;
  label: string;
}

export interface AppointmentQuote {
  text: string;
  author: string;
  role: string;
  receivedAt: string;
  rebookedAt?: string;
}

export interface Appointment {
  slug: string;
  // Calendar entry
  dayOfWeek: string;
  day: string;
  monthYear: string;
  durationMeta: string[];
  // Card / index
  tag: string;
  client: string;
  headline: string;
  body: string;
  outcomeFigure: string;
  outcomeLabel: string;
  scheduled: string;
  next: string;
  // Detail page (long-form)
  intro: string;
  problem: string;
  approach: string;
  whatWeShipped: string[];
  outcomeBody: string;
  stats: AppointmentStat[];
  quote?: AppointmentQuote;
  status: "shipped" | "ongoing" | "retained" | "stabilised";
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
    status: "shipped",

    intro:
      "Nayim's Embroideries had grown beyond what spreadsheets and three separate SaaS tools could carry. We replaced the lot with a single custom operations platform — quoting, invoicing, production tracking, customer portal, designer collaboration — that runs the business end-to-end on systems they own.",

    problem:
      "Every job at Nayim's went through QuickBooks (invoicing), an Excel sheet (line-by-line stock), Trello (production status), and a shared Google Drive (designer files). Quotes took 4–6 hours to prepare because pricing rules lived in a salesperson's head. Roughly 8% of jobs slipped a delivery date because production status wasn't connected to the quote, and the customer portal didn't exist — clients chased updates by phone. The biggest constraint: every new customer was a manual onboarding through three systems.",

    approach:
      "Two operators, four discovery sessions, one written architecture document before any code. The platform was built on WordPress + Bedrock (because the team already used it) with a custom Sage theme, Vue panels for the staff hub, and Postgres replacing the spreadsheet. QuickBooks sync runs nightly via the QBO API. Mockup approval is gated — production cannot start until the customer signs off in the portal. Designer multi-placement (the trickiest part) was modelled after the way the team actually thought about logos on garments, not the way the previous tool forced them to think.",

    whatWeShipped: [
      "Quote-to-order pipeline with QuickBooks invoice generation",
      "Customer portal: quote review, mockup approval, order tracking, file uploads",
      "Production board with stock-per-line, designer assignment, status transitions",
      "Designer multi-placement editor (the demo moment — replaces three tools)",
      "Child invoice / adjustments flow (better than QB native)",
      "Email link pay flow (three-gate WC order-pay)",
      "Staff hub with role-based views (admin / designer / production)",
      "Ralawise supplier API integration for product catalogue mirroring",
    ],

    outcomeBody:
      "In the first 12 months of the new platform, £128,000 of revenue was tracked through flows that previously existed across three disconnected tools or in someone's head. Quote turnaround moved from 4–6 hours to under 30 minutes. Customer portal uptake was 94% of new orders within the first 90 days, eliminating most of the inbound \"where's my job?\" calls. The team's measured weekly admin overhead dropped from roughly 14 hours to 4. Most importantly, Nayim's now own the platform — there's no monthly per-seat tax and no risk of a SaaS vendor changing the rules.",

    stats: [
      { figure: "£128k", label: "REVENUE TRACKED · 12 MO" },
      { figure: "30 min", label: "QUOTE TURNAROUND, DOWN FROM 4–6 HRS" },
      { figure: "94%", label: "CUSTOMER PORTAL UPTAKE · 90 DAYS" },
      { figure: "10 hrs", label: "WEEKLY ADMIN RECOVERED" },
    ],

    quote: {
      text: "We knew Excel was killing us. What we didn't know was how much of the business was lived in our heads. They built something that knows what we know.",
      author: "Nayim",
      role: "Founder · Nayim's Embroideries",
      receivedAt: "received 22 Apr 2025",
      rebookedAt: "RE-BOOKED · Q3 2026 — AI CALLING AGENT",
    },
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
    status: "ongoing",

    intro:
      "JC Setton Opticians came in for a storefront rebuild. The audit flagged £42,000 in misallocated Meta ad spend before we'd written a line of code. We delivered both — the new storefront on Phase 1, the recovery on the same engagement.",

    problem:
      "The existing site was a slow, dated Magento build that wasn't accessible, didn't rank, and barely converted. Booking enquiries arrived via a contact form that didn't link to a CRM. On the paid side, Meta was running with a £4k/mo budget against a single broad audience, and the conversion event was set to 'Page View' which was wildly inflating reported performance. Real new-customer attribution was unmeasured.",

    approach:
      "Phase 1: storefront on Salient + WooCommerce, accessibility-first (WCAG 2.2 AA), Core Web Vitals 95+. We migrated the booking enquiry flow to a CRM-backed form with proper UTM capture and offline conversion events. In parallel — and not in scope of the original brief — we audited Meta's account history, found the mis-set conversion event and the over-broad audience, and presented a recovery proposal alongside the build. The client approved both.",

    whatWeShipped: [
      "Salient + WooCommerce storefront, WCAG 2.2 AA, 95+ Core Web Vitals",
      "Booking enquiry CRM with UTM capture and offline conversion sync",
      "Meta conversion event corrected to actual qualified booking",
      "Audience restructure (cold / warm / retargeting with budget caps per layer)",
      "Creative refresh focused on the four highest-margin frame ranges",
      "Weekly performance dashboard exported to client's email",
    ],

    outcomeBody:
      "£42,180 of mis-targeted spend was clawed back across the first 90 days by restructuring the campaigns and fixing the conversion event. The new storefront converts 2.4× higher per session than the old Magento build. Bookings now arrive in the CRM with full attribution. Phase 2 — the staff hub for in-store consultation tracking — is in design now for a Sep 2026 ship.",

    stats: [
      { figure: "£42,180", label: "RECOVERED · 90 DAYS" },
      { figure: "2.4×", label: "CONVERSION LIFT · NEW STOREFRONT" },
      { figure: "95+", label: "CORE WEB VITALS · ALL PAGES" },
      { figure: "100%", label: "BOOKING ENQUIRIES IN CRM" },
    ],

    quote: {
      text: "They didn't pitch us. They booked a call, looked at the numbers, and found £42,000 we'd already written off. Then built the thing that stops it happening again. They're on next week's diary too.",
      author: "James Setton",
      role: "Director · JC Setton Opticians",
      receivedAt: "received 14 May 2025",
      rebookedAt: "RE-BOOKED · SEP 2026 — STAFF HUB",
    },
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
    status: "stabilised",

    intro:
      "Cape Kings called in an emergency. Their WordPress site had been compromised for 15 months and was generating spam posts, redirecting traffic, and serving phishing pages to customers. We stabilised within 72 hours, finished the cleanup in 11 days, and rebuilt the quoting flow alongside.",

    problem:
      "Forensic audit found four persistent backdoors, 109 attacker-added admin users, 4,127 spam posts (some indexed by Google), modified core files, and outbound traffic to a known C2. Customer-facing impact: SEO had collapsed, a quarter of organic traffic was being intercepted, and the brand was being used to host phishing aimed at the customer base. The site couldn't simply be reset — the customer database had been touched and there was 18 months of legitimate content that had to survive the cleanup.",

    approach:
      "Triage first, eradication second. Day 1: full site freeze, hosting credential rotation, all admin sessions invalidated, third-party integrations paused, traffic redirected to a holding page that maintained brand presence without exposing surface. Days 2–5: full forensic walk through core files, plugins, theme files, database, .htaccess, scheduled tasks, and uploaded content. Days 6–9: rebuild from clean backup of last known-good state (18 months prior), forward-port legitimate content from 18 months of work, force-rotate every credential, deploy new hosting on hardened infrastructure. Days 10–11: monitoring, indexed-spam-page de-indexing requests submitted to Google Search Console, customer comms.",

    whatWeShipped: [
      "Full forensic report (4 backdoors, 109 attacker admins, 4127 spam posts, file modification log)",
      "Site rebuild on hardened hosting (managed WordPress + WAF + 2FA enforced)",
      "Customer database scrubbed and re-secured (no records lost)",
      "18 months of legitimate content forward-ported with attribution preserved",
      "Quoting flow rebuilt: 11-day turnaround down to 1 day with the new system",
      "Recovery handover doc: quarterly health-check checklist included",
    ],

    outcomeBody:
      "Site was stabilised within 72 hours of the first call and fully clean by day 11. SEO recovery took longer (90 days for the spam pages to fully de-index) but organic traffic is now above pre-compromise baseline. The biggest unplanned win was the quoting workflow rebuild — Cape Kings had been operating with an 11-day average quote turnaround that we discovered during the rebuild was costing them roughly £18k/quarter in lost deals. The new quoting flow goes out in a day. They're on quarterly health-checks now.",

    stats: [
      { figure: "11 days", label: "FROM COMPROMISE DETECTED TO FULLY CLEAN" },
      { figure: "11 → 1", label: "DAYS TO QUOTE · NEW FLOW" },
      { figure: "100%", label: "CUSTOMER DATA INTEGRITY · NO RECORDS LOST" },
      { figure: "0", label: "RE-COMPROMISES · 13 MO POST-RECOVERY" },
    ],

    quote: {
      text: "We thought we were buying a clean-up. We came out the other side with a quoting system that paid for the whole engagement in the first quarter.",
      author: "Confidential",
      role: "Director · Cape Kings",
      receivedAt: "received 03 Jun 2025",
      rebookedAt: "RE-BOOKED · 28 JUL 2026 — QUARTERLY",
    },
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
    status: "retained",

    intro:
      "Forum Studios had four people doing the work of six, with the gap closed by overtime and Friday-night admin. We built the operations hub that closes the gap differently — by automating the bits that weren't worth a human's time in the first place.",

    problem:
      "Four roles (project lead, designer, finance, ops) all touched every job, in sequence. Each handoff was a Slack message, a manual file copy, an email, or a spreadsheet update. Project lead would intake → 14 minutes to brief the designer. Designer would finish → 8 minutes to route assets. Finance generated an invoice → 22 minutes to pull the right line items and dispatch. Weekly reports were a 3-hour Friday job. Across 25–30 jobs a month, the cumulative tax was over 100 hours of admin no one wanted to do. The team was working evenings to ship the real work.",

    approach:
      "We mapped every handoff for two weeks before designing anything. The pattern was clear: 80% of the steps were deterministic — they had no judgment in them. Project intake from a typed form could auto-brief the designer with the right template. Asset routing from a finished folder could auto-tag, generate the deliverable variants, and notify the right downstream role. Invoice generation could pull line items from the project record directly. Weekly reports could be one click. The platform was built as a Next.js app with Postgres, deployed on Vercel, integrated to their existing Stripe + Notion + Slack.",

    whatWeShipped: [
      "Project intake form → auto-brief generator with role-specific notifications",
      "Asset routing: deliverable variants, naming, tagging, downstream notify",
      "Invoice generation pulling directly from project line items (Stripe sync)",
      "Weekly reporting: one-click PDF + email to client, exec summary auto-drafted",
      "Capacity dashboard: pipeline view across all four roles, no double-booking",
      "Time-saving meter on the homepage of the hub (gamification, not analytics)",
    ],

    outcomeBody:
      "96 hours per month, measured against the pre-build Friday admin baseline. The team stopped working evenings within the first 6 weeks and have stayed that way for 28 months. Job count per month has climbed from ~27 average to ~38 with no headcount added. The biggest qualitative win: the project lead now spends Friday afternoons on new business instead of admin, which is the kind of compounding return that doesn't show up in a single quarter but has changed the trajectory of the business.",

    stats: [
      { figure: "96 hrs / mo", label: "OPERATIONAL TIME RECOVERED" },
      { figure: "41%", label: "JOB VOLUME UP · SAME HEADCOUNT" },
      { figure: "28 mo", label: "RETAINED · NO EVENING WORK" },
      { figure: "0", label: "MISSED HANDOFFS · LAUNCH TO DATE" },
    ],

    quote: {
      text: "We thought we needed to hire. We needed a system. The hub paid for itself in the first three months and the team got their Fridays back.",
      author: "Forum Studios",
      role: "Founders",
      receivedAt: "received 18 Jul 2024",
      rebookedAt: "RETAINED · MONTHLY REVIEW",
    },
  },
];

export function getAppointment(slug: string): Appointment | undefined {
  return APPOINTMENTS.find((a) => a.slug === slug);
}

export function getOtherAppointments(slug: string): Appointment[] {
  return APPOINTMENTS.filter((a) => a.slug !== slug);
}
