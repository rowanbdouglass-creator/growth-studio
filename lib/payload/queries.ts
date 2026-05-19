import "server-only";
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
  capabilities?: { capability: string; id?: string }[];
  order?: number;
};

export type CaseStudy = {
  id: number;
  title: string;
  slug: string;
  client: string;
  summary: string;
  technologies?: { tech: string; id?: string }[];
  metrics?: { label: string; value: string; context?: string; id?: string }[];
  featured?: boolean;
  publishedAt?: string;
};

export type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  featured?: boolean;
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
// Queries
// ------------------------------------------------------------------

export async function getServices(): Promise<Service[]> {
  const p = await payload();
  const result = await p.find({
    collection: "services",
    sort: "order",
    limit: 10,
    depth: 0,
  });
  return result.docs as unknown as Service[];
}

export async function getFeaturedCaseStudy(): Promise<CaseStudy | null> {
  const p = await payload();
  const result = await p.find({
    collection: "case-studies",
    where: { featured: { equals: true } },
    limit: 1,
    depth: 0,
  });
  return (result.docs[0] as unknown as CaseStudy) ?? null;
}

export async function getCaseStudies(limit = 6): Promise<CaseStudy[]> {
  const p = await payload();
  const result = await p.find({
    collection: "case-studies",
    sort: "-publishedAt",
    limit,
    depth: 0,
  });
  return result.docs as unknown as CaseStudy[];
}

export async function getFeaturedTestimonial(): Promise<Testimonial | null> {
  const p = await payload();
  const result = await p.find({
    collection: "testimonials",
    where: { featured: { equals: true } },
    limit: 1,
    depth: 0,
  });
  return (result.docs[0] as unknown as Testimonial) ?? null;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const p = await payload();
  const result = await p.findGlobal({ slug: "site-settings", depth: 0 });
  return result as unknown as SiteSettings;
}
