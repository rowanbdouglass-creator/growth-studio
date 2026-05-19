/**
 * Seed script — populates Payload with placeholder marketing content.
 *
 * Usage:
 *   pnpm exec tsx --env-file=.env.local scripts/seed.ts
 *
 * Idempotent-ish: skips creation if a record with the same slug already exists.
 * Run multiple times safely.
 */

import { getPayload } from "payload";
import config from "../payload.config.ts";

// ------------------------------------------------------------------
// Lexical helpers
// ------------------------------------------------------------------

/** Convert plain-text paragraphs (split on \n\n) into Lexical-serialized rich text. */
function paragraphs(...parts: string[]) {
  return {
    root: {
      type: "root",
      direction: null,
      format: "",
      indent: 0,
      version: 1,
      children: parts.map((text) => ({
        type: "paragraph",
        direction: null,
        format: "",
        indent: 0,
        version: 1,
        children: [{ type: "text", text, version: 1 }],
      })),
    },
  };
}

// ------------------------------------------------------------------
// Seed
// ------------------------------------------------------------------

const seed = async () => {
  const payload = await getPayload({ config });

  console.log("\n→ Seeding Industries...");

  const industries = await Promise.all(
    [
      { name: "Embroidery & Apparel", slug: "embroidery-apparel" },
      { name: "Headwear & Custom Product", slug: "headwear" },
      { name: "Studio Bookings", slug: "studio-bookings" },
      { name: "Fashion E-commerce", slug: "fashion-ecommerce" },
      { name: "Healthcare & Opticians", slug: "opticians" },
    ].map(async (data) => {
      const existing = await payload.find({
        collection: "industries",
        where: { slug: { equals: data.slug } },
        limit: 1,
      });
      if (existing.docs.length) {
        console.log(`  ✓ skip ${data.slug} (exists)`);
        return existing.docs[0];
      }
      const doc = await payload.create({ collection: "industries", data });
      console.log(`  + create ${data.slug}`);
      return doc;
    })
  );

  const industryBySlug = (slug: string) =>
    industries.find((i: any) => i.slug === slug)?.id as number | undefined;

  console.log("\n→ Seeding Services...");

  const services = [
    {
      title: "Paid Growth",
      slug: "paid-growth",
      pillar: "paid-growth" as const,
      summary:
        "Cold outreach, paid social, and paid search that consistently fills the pipeline of established SMEs ready to scale.",
      description: paragraphs(
        "We run performance marketing as a system, not a campaign. Every test feeds the next quarter's plan.",
        "Meta and Google ads, LinkedIn outbound, multi-touch attribution, and creative iteration that respects your brand."
      ),
      capabilities: [
        { capability: "Meta and Google paid acquisition" },
        { capability: "Cold outbound (LinkedIn, email)" },
        { capability: "Performance creative production" },
        { capability: "Attribution and forecasting models" },
        { capability: "Weekly optimisation sprints" },
      ],
      idealClient:
        "Established businesses turning over £500k–£10m who have product-market fit and want to compound paid acquisition without flying blind.",
      pricing: "From £4k/month retainer · 3-month minimum",
      order: 1,
    },
    {
      title: "Custom Systems",
      slug: "custom-systems",
      pillar: "custom-systems" as const,
      summary:
        "Bespoke operational software that compounds — quoting, ordering, fulfilment, integrations, conversion systems.",
      description: paragraphs(
        "Most agencies hand you a Shopify theme and call it a day. We build the systems that earn you back hours per week, every week.",
        "From WooCommerce ops hubs to internal staff portals, multi-warehouse integrations, and AI-powered tooling — we engineer for the business, not the brochure."
      ),
      capabilities: [
        { capability: "WooCommerce and Shopify deep customisation" },
        { capability: "Quoting and order management flows" },
        { capability: "Carrier and accounting integrations (Diamond, QuickBooks, Xero)" },
        { capability: "Conversion-engineering on existing storefronts" },
        { capability: "Internal staff portals and tooling" },
      ],
      idealClient:
        "Operationally complex SMEs whose growth is bottlenecked by manual processes, spreadsheets, or off-the-shelf software that doesn't fit.",
      pricing: "From £12k for a defined build · ongoing retainer optional",
      order: 2,
    },
    {
      title: "Intelligence Layer",
      slug: "intelligence-layer",
      pillar: "intelligence-layer" as const,
      summary:
        "AI-powered audit tools and Discovery Hub experiences that make your paid and your systems smarter every quarter.",
      description: paragraphs(
        "We've built a private suite of audit tools that pressure-test campaigns, websites, and operational systems against vertical-specific playbooks.",
        "Clients get a Discovery Hub — a per-engagement portal with AI-transcribed strategy notes, proposal cards, and embedded Q&A. The thinking compounds; nothing is lost between sessions."
      ),
      capabilities: [
        { capability: "Ad audit tool (Meta + Google, 90-day analysis)" },
        { capability: "Website & systems audit (visual + heuristic)" },
        { capability: "Discovery Hub client portals" },
        { capability: "Vertical-specific growth playbooks" },
        { capability: "Custom internal AI tooling" },
      ],
      idealClient:
        "Teams who feel their agency or consultant is recycling generic advice. You want sharper, evidence-backed thinking that compounds.",
      pricing: "Included with Paid Growth or Custom Systems engagements",
      order: 3,
    },
  ];

  for (const data of services) {
    const existing = await payload.find({
      collection: "services",
      where: { slug: { equals: data.slug } },
      limit: 1,
    });
    if (existing.docs.length) {
      console.log(`  ✓ skip ${data.slug} (exists)`);
      continue;
    }
    await payload.create({ collection: "services", data });
    console.log(`  + create ${data.slug}`);
  }

  console.log("\n→ Seeding TeamMembers...");

  const teamMembers = [
    {
      name: "Michelangelo Placeholder",
      role: "Co-founder · Paid Growth",
      bio: paragraphs(
        "Ten years running paid traffic for DTC brands and B2B SaaS. Previously led growth at [placeholder agency].",
        "Bias for measurement and brutal honesty over polished decks."
      ),
      order: 1,
    },
    {
      name: "Rowan Douglass",
      role: "Co-founder · Custom Systems & Intelligence",
      bio: paragraphs(
        "Builds custom operational software and AI tooling for established SMEs. Background in WordPress, WooCommerce, and Next.js engineering.",
        "Believes most agency software is half-finished prototypes — and ours shouldn't be."
      ),
      order: 2,
    },
  ];

  for (const data of teamMembers) {
    const existing = await payload.find({
      collection: "team-members",
      where: { name: { equals: data.name } },
      limit: 1,
    });
    if (existing.docs.length) {
      console.log(`  ✓ skip ${data.name} (exists)`);
      continue;
    }
    await payload.create({ collection: "team-members", data });
    console.log(`  + create ${data.name}`);
  }

  console.log("\n→ Seeding CaseStudies...");

  const caseStudies = [
    {
      title: "Nayim's Embroideries — a custom operations hub built around how the business actually works",
      slug: "nayims-hub",
      client: "Nayim's Embroideries Ltd",
      industry: industryBySlug("embroidery-apparel"),
      summary:
        "We replaced a stack of spreadsheets and email chains with a single WooCommerce-backed operations hub for quoting, mockup approvals, production, packing, and delivery — bilingual and mobile-first.",
      problem: paragraphs(
        "Nayim's was running a high-volume embroidery and apparel business with quoting in spreadsheets, production handovers by WhatsApp, and three staff stations all chasing the same information.",
        "Off-the-shelf WooCommerce extensions had been tried and shed — none fit the actual workflow: estimate → digitised files → mockup approval → stock allocation → production → packing slip → Diamond Logistics dispatch."
      ),
      approach: paragraphs(
        "We engineered a custom operations hub directly inside their existing WooCommerce install. Drawer-based UX so anyone — owner, designer, packer — can move a job forward from the same screen on phone or desktop.",
        "Tamil/English UI toggle. QuickBooks invoice sync. Diamond Logistics dispatch booking. Three-gate payment flow for email-pay links. Method badges, mockup gating, parallel stock-and-artwork workflows."
      ),
      outcome: paragraphs(
        "The team works through jobs end-to-end without leaving the hub. Estimates convert to invoices in one click; mockups, stock, and artwork are tracked in parallel; packing slips and dispatch labels print without manual transcription.",
        "Average time to convert a quote dropped meaningfully and the owner stopped being a single point of operational failure."
      ),
      technologies: [
        { tech: "WordPress" },
        { tech: "WooCommerce" },
        { tech: "QuickBooks Online API" },
        { tech: "Diamond Logistics API" },
        { tech: "Custom PHP" },
      ],
      featured: true,
      publishedAt: new Date("2026-04-01").toISOString(),
      metrics: [
        { label: "Workflow stations", value: "1", context: "down from 4 disconnected tools" },
        { label: "Languages supported", value: "Tamil + English" },
        { label: "Integrations live", value: "QuickBooks, Diamond Logistics" },
      ],
    },
    {
      title: "T-SHOT — a dark-themed product configurator that respects the buyer's time",
      slug: "t-shot",
      client: "T-SHOT",
      industry: industryBySlug("headwear"),
      summary:
        "A wizard-style WooCommerce product configurator for customisable golf hats, with dynamic attribute steps and live variation imagery.",
      problem: paragraphs(
        "T-SHOT's customers needed to combine fabric, brim shape, logo placement, and embroidery options without being dumped into a sprawling variant grid.",
        "Their existing product page was abandoning visitors at the configuration step. Conversion was leaking before it ever reached checkout."
      ),
      approach: paragraphs(
        "We built a wizard-style configurator inside their WooCommerce theme — one decision per step, dynamic image swaps as variants are chosen, progressive disclosure of advanced options.",
        "Dark-themed UI to match their performance-product brand. Touch-first interactions for mobile shoppers."
      ),
      outcome: paragraphs(
        "Configuration completion meaningfully improved. Returns from misconfiguration dropped because the visual feedback at each step matched what the customer received."
      ),
      technologies: [
        { tech: "WordPress" },
        { tech: "WooCommerce" },
        { tech: "Custom JS configurator" },
      ],
      featured: false,
      publishedAt: new Date("2026-01-15").toISOString(),
    },
    {
      title: "Forum Studios — booking flows for a creative studio that values its time",
      slug: "forum-studios",
      client: "Forum Studios",
      industry: industryBySlug("studio-bookings"),
      summary:
        "A custom dark/gold WooCommerce Bookings implementation for studio time, with calendar logic that prevents back-to-back conflicts.",
      problem: paragraphs(
        "Forum Studios was juggling email bookings, manual deposits, and a calendar that overlapped photography and music sessions.",
        "They needed a self-service booking flow that respected room turnover, equipment availability, and deposit collection — without a generic SaaS look."
      ),
      approach: paragraphs(
        "We built on WooCommerce Bookings with a custom dark/gold theme, smart buffer logic between sessions, and Stripe deposit collection.",
        "The whole flow stays inside their brand world — the booking experience matches the studio experience."
      ),
      outcome: paragraphs(
        "Bookings move from email back-and-forth to a 90-second self-serve flow. The team gets ahead of double-booking and deposit collection is hands-off."
      ),
      technologies: [
        { tech: "WordPress" },
        { tech: "WooCommerce Bookings" },
        { tech: "Stripe" },
      ],
      featured: false,
      publishedAt: new Date("2025-11-12").toISOString(),
    },
    {
      title: "Cape Kings — hardening a fashion e-commerce site against bot traffic",
      slug: "cape-kings",
      client: "Cape Kings",
      industry: industryBySlug("fashion-ecommerce"),
      summary:
        "We took an e-commerce site under sustained credential-stuffing and checkout-fraud pressure and reduced bot noise to near zero with Cloudflare Turnstile and layered mitigation.",
      problem: paragraphs(
        "Cape Kings was being hit by credential-stuffing, fake checkouts, and abusive scraping — slowing the site and skewing every analytics signal they relied on.",
        "Generic plugins helped at the edges but the worst offenders kept getting through."
      ),
      approach: paragraphs(
        "Cloudflare Turnstile in front of checkout and account flows. Server-side rate limiting on sensitive endpoints. Behavioural challenges for known bad fingerprints.",
        "Analytics layered on top so the team could see exactly what was filtered and why."
      ),
      outcome: paragraphs(
        "Bot traffic to checkout endpoints dropped sharply. Analytics dashboards stopped lying about real demand. Site performance improved as a side effect of the noise being filtered upstream."
      ),
      technologies: [
        { tech: "WordPress" },
        { tech: "WooCommerce" },
        { tech: "Cloudflare Turnstile" },
        { tech: "Cloudflare Workers" },
      ],
      featured: false,
      publishedAt: new Date("2025-09-20").toISOString(),
    },
    {
      title: "JC Setton Opticians — e-commerce + bookings + a staff platform for a UK optician",
      slug: "jc-setton",
      client: "JC Setton Opticians",
      industry: industryBySlug("opticians"),
      summary:
        "A WordPress e-commerce and bookings platform with prescription saving, membership plans, and a Fluent Support ticketing layer for the back office.",
      problem: paragraphs(
        "JC Setton needed a single place for product sales, eye-test bookings, prescription records, membership management, and customer support — without a six-figure custom build.",
        "Their existing setup was three disconnected systems with the front-of-house staff acting as the integration layer."
      ),
      approach: paragraphs(
        "We built a WordPress + WooCommerce + Salient storefront, integrated booking flows, prescription saving against customer accounts, and a membership-plan tier system.",
        "Fluent Support gives the back office an inbox view of every customer interaction. Phase 2 will mirror the Nayim's Hub architecture for staff operations."
      ),
      outcome: paragraphs(
        "Phase 1 storefront is live. Customers now book, pay, and manage prescriptions in one place. The team has unified visibility on every customer touchpoint."
      ),
      technologies: [
        { tech: "WordPress" },
        { tech: "WooCommerce" },
        { tech: "Salient" },
        { tech: "Fluent Support" },
      ],
      featured: false,
      publishedAt: new Date("2026-02-01").toISOString(),
    },
  ];

  for (const data of caseStudies) {
    const existing = await payload.find({
      collection: "case-studies",
      where: { slug: { equals: data.slug } },
      limit: 1,
    });
    if (existing.docs.length) {
      console.log(`  ✓ skip ${data.slug} (exists)`);
      continue;
    }
    await payload.create({ collection: "case-studies", data });
    console.log(`  + create ${data.slug}`);
  }

  console.log("\n→ Seeding Testimonials...");

  const testimonials = [
    {
      quote:
        "They didn't ship a theme and run. They built the thing my team uses every day — and the second I asked for a change it was in their backlog the same hour.",
      author: "Placeholder Client",
      role: "Founder",
      company: "Nayim's Embroideries",
      featured: true,
    },
    {
      quote:
        "Every other agency would have sold us another Shopify theme. They sold us a system. The ROI was measurable inside a quarter.",
      author: "Placeholder Client",
      role: "Operations Director",
      company: "Confidential",
      featured: false,
    },
    {
      quote:
        "The audit alone was worth the engagement. They found three months of wasted ad spend in the first week and a path to compound the rest.",
      author: "Placeholder Client",
      role: "Head of Marketing",
      company: "Confidential",
      featured: false,
    },
  ];

  for (const data of testimonials) {
    const existing = await payload.find({
      collection: "testimonials",
      where: {
        and: [
          { author: { equals: data.author } },
          { company: { equals: data.company } },
        ],
      },
      limit: 1,
    });
    if (existing.docs.length) {
      console.log(`  ✓ skip ${data.author} @ ${data.company} (exists)`);
      continue;
    }
    await payload.create({ collection: "testimonials", data });
    console.log(`  + create testimonial from ${data.author}`);
  }

  console.log("\n→ Updating Globals (SiteSettings, Navigation)...");

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      brandName: "Growth Studio",
      tagline: "Paid traffic. Custom systems. Intelligence at the core.",
      contactEmail: "hello@youlookbooked.com",
      contactPhone: "+44 0000 000 000",
      footerCopy:
        "A two-person growth studio combining paid traffic, custom systems, and AI-powered intelligence for established businesses ready to scale.",
    },
  });
  console.log("  + site-settings updated");

  await payload.updateGlobal({
    slug: "navigation",
    data: {
      mainNav: [
        { label: "Services", href: "/services" },
        { label: "Work", href: "/work" },
        { label: "Tools", href: "/tools" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
      footerNav: [
        {
          heading: "Services",
          links: [
            { label: "Paid Growth", href: "/services/paid-growth" },
            { label: "Custom Systems", href: "/services/custom-systems" },
            {
              label: "Intelligence Layer",
              href: "/services/intelligence-layer",
            },
          ],
        },
        {
          heading: "Tools",
          links: [
            { label: "Ad Audit", href: "/tools/ad-audit" },
            { label: "Website Audit", href: "/tools/website-audit" },
            { label: "Discovery Hub", href: "/tools/discovery-hub" },
          ],
        },
        {
          heading: "Studio",
          links: [
            { label: "About", href: "/about" },
            { label: "Work", href: "/work" },
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" },
          ],
        },
      ],
    },
  });
  console.log("  + navigation updated");

  console.log("\n✓ Seed complete.\n");
  process.exit(0);
};

seed().catch((err) => {
  console.error("\n✗ Seed failed:", err);
  process.exit(1);
});
