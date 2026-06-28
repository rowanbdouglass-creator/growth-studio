/**
 * Services — single source of truth for /services and /services/[slug].
 * Mirrors the appointments structure so the layouts can be near-symmetric.
 */
export interface ServiceDeliverable {
  title: string;
  body: string;
}

export interface Service {
  slug: string;
  number: string;
  shortName: string;
  fullName: string;
  cadence: string;
  scheduleNote: string;
  headline: string;
  body: string;
  intro: string;
  problem: string;
  whatYouGet: ServiceDeliverable[];
  proofFigure: string;
  proofLabel: string;
  proofCaseSlug: string;
  fitFor: string;
  notFitFor: string;
  status: "available" | "in-build";
}

export const SERVICES: Service[] = [
  {
    slug: "custom-systems",
    number: "01",
    shortName: "Custom Systems",
    fullName: "Custom operational software",
    cadence: "MON · WED · FRI / 09:00–17:00",
    scheduleNote: "24 HRS / WK · 4 ACTIVE",
    headline: "The software your business actually runs on.",
    body: "Quoting, invoicing, production, customer portals, internal hubs. End-to-end builds, owned by you, hosted where you want.",
    intro:
      "Operational software that fits the shape of your business, not the other way round. Quote-to-order systems, customer portals, staff hubs, production trackers, supplier integrations — built end-to-end and yours forever. No SaaS rent, no vendor lock-in, no per-seat tax.",
    problem:
      "Most SMEs run their actual business on a stack of disconnected SaaS tools: QuickBooks for invoices, Excel for stock, Trello for production, email for everything else. Each tool is fine. Together they're a tax — duplicated data entry, manual handoffs, and a real ceiling on how many jobs the team can handle without hiring more admin staff.",
    whatYouGet: [
      {
        title: "Discovery + architecture document",
        body: "Two operators, four sessions, written architecture before any code. You sign off on it before we build.",
      },
      {
        title: "End-to-end platform",
        body: "Whatever combination of quoting, invoicing, production, portals, hubs, and integrations your business actually needs. WordPress + custom panels, Next.js + Postgres, or hybrid — chosen for the job.",
      },
      {
        title: "Integrations to your existing stack",
        body: "QuickBooks, Stripe, WooCommerce, supplier APIs, Slack, Notion — whatever you already rely on, the platform talks to it.",
      },
      {
        title: "Staff training + handover documentation",
        body: "Written runbooks. Loom walkthroughs. Everyone on the team knows how to use it before launch.",
      },
      {
        title: "12 months post-launch support",
        body: "Bug fixes, refinements, new feature scope as your business grows. You're not on your own day-one-day-after.",
      },
    ],
    proofFigure: "£128k",
    proofLabel: "TRACKED THROUGH NAYIM'S HUB · 12 MO",
    proofCaseSlug: "nayims",
    fitFor:
      "Owner-operated UK SMEs doing £200k–£3m, running on a stack of disconnected SaaS, and ready to invest in software they actually own.",
    notFitFor:
      "Pre-revenue startups, businesses where workflow changes every six weeks, or anyone who needs a SaaS demo by Friday.",
    status: "available",
  },
  {
    slug: "website-design",
    number: "02",
    shortName: "Website Design",
    fullName: "Conversion-focused websites",
    cadence: "TUE · THU / 10:00–16:00",
    scheduleNote: "12 HRS / WK · 3 ACTIVE",
    headline: "Websites that load fast, look real, and book meetings.",
    body: "Storefronts, marketing sites, and lead-magnet builds. Next.js, WordPress or Shopify — chosen for the job, not the trend.",
    intro:
      "Marketing sites and storefronts that pass the credibility check in 90 seconds, load in under a second on mobile, and turn referrals into booked calls. Built on the right tech for the job — Next.js for marketing sites and editorial work, WordPress for content-heavy operations, Shopify for product-first storefronts.",
    problem:
      "Most SME websites are slow, dated, and don't convert. Often built years ago on whatever was trendy at the time and never properly looked after since. The result: prospects who arrive from word-of-mouth bounce because the site doesn't reassure them, paid traffic doesn't convert because the landing pages were never built for it, and the team can't update content without calling a developer.",
    whatYouGet: [
      {
        title: "Strategy + audit before any design",
        body: "We start with your numbers — what's converting, what's leaking, what your competitors are doing — and what the site actually needs to do.",
      },
      {
        title: "Design + build",
        body: "Editorial, type-led, conversion-focused. Fully responsive, accessible to WCAG 2.2 AA, Core Web Vitals 95+ across the board.",
      },
      {
        title: "CMS the team can actually use",
        body: "Payload, WordPress, or Sanity depending on what fits. Real editor experience — not a developer ticket every time you want to update a page.",
      },
      {
        title: "Conversion infrastructure",
        body: "Forms with proper CRM integration, UTM capture, offline conversion sync to Meta and Google, page-level analytics that doesn't require a cookie banner.",
      },
      {
        title: "Performance + accessibility audit",
        body: "Lighthouse 95+ on every page. axe-core clean. We don't ship sites that fail either bar.",
      },
    ],
    proofFigure: "£42,180",
    proofLabel: "RECOVERED FOR JC SETTON DURING THE BUILD",
    proofCaseSlug: "jc-setton",
    fitFor:
      "UK SMEs whose existing site is dated, slow, or doesn't convert — and who are getting traffic (paid or word-of-mouth) that's worth more than it's currently making them.",
    notFitFor:
      "Anyone looking for a Wix-style £500 template-and-go. We're not the cheapest option.",
    status: "available",
  },
  {
    slug: "paid-traffic",
    number: "03",
    shortName: "Paid Traffic",
    fullName: "AI-optimised paid acquisition",
    cadence: "DAILY / 08:00–10:00",
    scheduleNote: "DAILY OPS · 7 ACTIVE",
    headline: "Meta, Google and cold outreach — run by the people who read the numbers.",
    body: "AI-optimised creative and bidding, no account-manager layer, no junior strategists. Daily ops by the two operators who own the work.",
    intro:
      "Paid acquisition that lands qualified, attributable leads in your inbox. Run daily by the two operators who own the work — not handed to a junior strategist and an account manager. AI-optimised creative testing and bid management means we ship at agency scale without agency overhead.",
    problem:
      "Most paid traffic agencies layer account managers, strategists, and creative leads between the work and the client. Every meeting becomes a status update; every decision takes a week. Meanwhile the platforms reward the campaigns that iterate fastest. You end up paying retainer for slow iteration, ungeneralisable creative, and reporting decks instead of recovered spend.",
    whatYouGet: [
      {
        title: "Account audit + recovery plan",
        body: "Before we propose a retainer. Most accounts we audit have meaningful spend recoverable from misallocated budget, mis-set conversion events, or audience over-reach. You keep the audit findings either way.",
      },
      {
        title: "Daily ops, two operators",
        body: "No account manager layer. You speak to the people running the work. Daily 08:00–10:00 ops slot.",
      },
      {
        title: "AI-optimised creative testing",
        body: "We use AI for what AI is good at — rapid creative variation, copy testing, audience hypothesis generation — without pretending strategy is a model output.",
      },
      {
        title: "Meta + Google + cold outreach",
        body: "Run together, attributed together, scored on the same end-of-funnel metric. No siloed channel reporting.",
      },
      {
        title: "Weekly written report",
        body: "Plain numbers you can defend on a board call, sent on the same day each month. No decks.",
      },
    ],
    proofFigure: "3.4×",
    proofLabel: "BLENDED ROAS · 14 CLIENTS",
    proofCaseSlug: "jc-setton",
    fitFor:
      "UK SMEs with at least £4k/mo in current ad spend that's underperforming, or pre-launch budget ready to test a new acquisition channel properly.",
    notFitFor:
      "Anyone looking for £500/mo of ad management. Or anyone who wants a 60-slide quarterly review deck.",
    status: "available",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
