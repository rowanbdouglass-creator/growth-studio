import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { getCaseStudies, getServices } from "@/lib/payload/queries";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = brand.url.replace(/\/$/, "");
  const now = new Date();

  const staticPaths = [
    "",
    "/services",
    "/work",
    "/tools",
    "/tools/ad-audit",
    "/tools/website-audit",
    "/tools/discovery-hub",
    "/about",
    "/contact",
    "/blog",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1.0 : 0.7,
  }));

  let dynamicEntries: MetadataRoute.Sitemap = [];

  try {
    const [services, caseStudies] = await Promise.all([
      getServices(),
      getCaseStudies(100),
    ]);

    dynamicEntries = [
      ...services.map((s) => ({
        url: `${base}/services/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
      ...caseStudies.map((cs) => ({
        url: `${base}/work/${cs.slug}`,
        lastModified: cs.publishedAt ? new Date(cs.publishedAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    // If Payload is unreachable during sitemap generation, fall back to
    // static entries only rather than 500ing.
  }

  return [...staticEntries, ...dynamicEntries];
}
