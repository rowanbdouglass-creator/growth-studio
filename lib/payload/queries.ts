import "server-only";
import { cache } from "react";
import { getPayload } from "payload";
import config from "@/payload.config.ts";

/**
 * Lightweight type contracts used in marketing components.
 * We deliberately hand-write these instead of relying on
 * `payload generate:types` so the build doesn't need a DB
 * connection or generated-file gymnastics. Add fields here
 * only as components need them.
 */

export type Service = {
  id: number;
  title: string;
  slug: string;
  pillar: "paid-growth" | "custom-systems" | "intelligence-layer";
  summary: string;
  description?: unknown; // Lexical rich text
  capabilities?: { capability: string; id?: string }[];
  idealClient?: string;
  pricing?: string;
  order?: number;
  seo?: { title?: string; description?: string };
};

export type CaseStudy = {
  id: number;
  title: string;
  slug: string;
  client: string;
  summary: string;
  problem?: unknown; // Lexical
  approach?: unknown;
  outcome?: unknown;
  technologies?: { tech: string; id?: string }[];
  metrics?: { label: string; value: string; context?: string; id?: string }[];
  featured?: boolean;
  publishedAt?: string;
  seo?: { title?: string; description?: string };
};

export type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  featured?: boolean;
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio?: unknown;
  order?: number;
};

export type SiteSettings = {
  brandName?: string;
  tagline?: string;
  contactEmail?: string;
  contactPhone?: string;
  footerCopy?: string;
};

// ------------------------------------------------------------------
// Cache a single Payload instance per process. getPayload() is async
// and expensive; reuse across queries within a request.
// ------------------------------------------------------------------

let payloadPromise: ReturnType<typeof getPayload> | null = null;

function payload() {
  if (!payloadPromise) {
    payloadPromise = getPayload({ config });
  }
  return payloadPromise;
}

// ------------------------------------------------------------------
// Services
// ------------------------------------------------------------------

export const getServices = cache(async function getServices(): Promise<Service[]> {
  const p = await payload();
  const result = await p.find({
    collection: "services",
    sort: "order",
    limit: 10,
    depth: 0,
  });
  return result.docs as unknown as Service[];
});

export const getServiceBySlug = cache(async function getServiceBySlug(
  slug: string
): Promise<Service | null> {
  const p = await payload();
  const result = await p.find({
    collection: "services",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  });
  return (result.docs[0] as unknown as Service) ?? null;
});

// ------------------------------------------------------------------
// Case Studies
// ------------------------------------------------------------------

export const getFeaturedCaseStudy = cache(
  async function getFeaturedCaseStudy(): Promise<CaseStudy | null> {
    const p = await payload();
    const result = await p.find({
      collection: "case-studies",
      where: { featured: { equals: true } },
      limit: 1,
      depth: 0,
    });
    return (result.docs[0] as unknown as CaseStudy) ?? null;
  }
);

export const getCaseStudies = cache(async function getCaseStudies(
  limit = 50
): Promise<CaseStudy[]> {
  const p = await payload();
  const result = await p.find({
    collection: "case-studies",
    sort: "-publishedAt",
    limit,
    depth: 0,
  });
  return result.docs as unknown as CaseStudy[];
});

export const getCaseStudyBySlug = cache(async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  const p = await payload();
  const result = await p.find({
    collection: "case-studies",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  });
  return (result.docs[0] as unknown as CaseStudy) ?? null;
});

export const getCaseStudySlugs = cache(
  async function getCaseStudySlugs(): Promise<string[]> {
    const p = await payload();
    const result = await p.find({
      collection: "case-studies",
      limit: 100,
      depth: 0,
      select: { slug: true } as never,
    });
    return result.docs.map((d: { slug: string }) => d.slug);
  }
);

// ------------------------------------------------------------------
// Testimonials
// ------------------------------------------------------------------

export const getFeaturedTestimonial = cache(
  async function getFeaturedTestimonial(): Promise<Testimonial | null> {
    const p = await payload();
    const result = await p.find({
      collection: "testimonials",
      where: { featured: { equals: true } },
      limit: 1,
      depth: 0,
    });
    return (result.docs[0] as unknown as Testimonial) ?? null;
  }
);

export const getTestimonials = cache(async function getTestimonials(
  limit = 20
): Promise<Testimonial[]> {
  const p = await payload();
  const result = await p.find({
    collection: "testimonials",
    limit,
    depth: 0,
  });
  return result.docs as unknown as Testimonial[];
});

// ------------------------------------------------------------------
// Team Members
// ------------------------------------------------------------------

export const getTeamMembers = cache(
  async function getTeamMembers(): Promise<TeamMember[]> {
    const p = await payload();
    const result = await p.find({
      collection: "team-members",
      sort: "order",
      limit: 20,
      depth: 0,
    });
    return result.docs as unknown as TeamMember[];
  }
);

// ------------------------------------------------------------------
// Globals
// ------------------------------------------------------------------

export const getSiteSettings = cache(
  async function getSiteSettings(): Promise<SiteSettings> {
    const p = await payload();
    const result = await p.findGlobal({ slug: "site-settings", depth: 0 });
    return result as unknown as SiteSettings;
  }
);
