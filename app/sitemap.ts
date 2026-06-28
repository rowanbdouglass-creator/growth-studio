import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { APPOINTMENTS } from "@/lib/content/appointments";
import { SERVICES } from "@/lib/content/services";

/**
 * Sitemap — sources from the local content modules (single source of truth)
 * rather than a CMS. Static so it builds at compile time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.url.replace(/\/$/, "");
  const now = new Date();

  const staticPaths: { p: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { p: "", priority: 1.0, freq: "weekly" },
    { p: "/work", priority: 0.9, freq: "weekly" },
    { p: "/services", priority: 0.9, freq: "weekly" },
    { p: "/about", priority: 0.7, freq: "monthly" },
    { p: "/contact", priority: 0.8, freq: "monthly" },
    { p: "/privacy", priority: 0.3, freq: "yearly" },
    { p: "/terms", priority: 0.3, freq: "yearly" },
    { p: "/accessibility", priority: 0.3, freq: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map(({ p, priority, freq }) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));

  const workEntries: MetadataRoute.Sitemap = APPOINTMENTS.map((a) => ({
    url: `${base}/work/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticEntries, ...workEntries, ...serviceEntries];
}
