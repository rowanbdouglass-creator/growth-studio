import type { ParsedDocument, SitemapResult } from "./types";

/**
 * Page discovery — pick representative pages to screenshot + analyse,
 * so the audit covers more than just the home page.
 *
 * Categories we look for: home (always), product/service page, contact/about,
 * shop/checkout, booking, blog. We grab one URL per category at most.
 */

export interface DiscoveredPage {
  url: string;
  category:
    | "home"
    | "service"
    | "product"
    | "contact"
    | "about"
    | "shop"
    | "booking"
    | "pricing"
    | "blog";
  reason: string;
}

const CATEGORY_PATTERNS: Array<{
  cat: DiscoveredPage["category"];
  re: RegExp;
}> = [
  { cat: "service", re: /\/(services?|solutions?|what-we-do)(\/|$)/i },
  { cat: "product", re: /\/(products?|collections?|catalog)(\/|$)/i },
  { cat: "shop", re: /\/(shop|store|cart|checkout|buy-online|order)(\/|$)/i },
  {
    cat: "booking",
    re: /\/(book|booking|appointments?|schedule|reserve|consultation)(\/|$)/i,
  },
  { cat: "pricing", re: /\/(pricing|prices?|plans?|cost|fees)(\/|$)/i },
  { cat: "contact", re: /\/(contact|get-in-touch|enquir|reach-us)(\/|$)/i },
  { cat: "about", re: /\/(about|who-we-are|team|our-story|story)(\/|$)/i },
  { cat: "blog", re: /\/(blog|news|articles?|insights?|journal)(\/|$)/i },
];

export function discoverPages(
  homeUrl: string,
  parsed: ParsedDocument | null,
  sitemap: SitemapResult,
  homeHtml: string
): DiscoveredPage[] {
  const out: DiscoveredPage[] = [
    { url: homeUrl, category: "home", reason: "Landing page" },
  ];

  let origin: string;
  try {
    origin = new URL(homeUrl).origin;
  } catch {
    return out;
  }

  // Collect candidate URLs: from parsed anchors (raw HTML) + sitemap sample.
  const anchorHrefs = [
    ...homeHtml.matchAll(/<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi),
  ]
    .map((m) => m[1])
    .filter(Boolean);

  const candidates = new Set<string>();
  for (const href of anchorHrefs) {
    const abs = toAbsolute(href, origin);
    if (abs && abs.startsWith(origin)) candidates.add(abs);
  }
  for (const s of sitemap.sampleUrls ?? []) {
    if (s.startsWith(origin)) candidates.add(s);
  }

  // First URL matching each category wins
  const seenCats = new Set<DiscoveredPage["category"]>(["home"]);
  for (const cand of candidates) {
    if (seenCats.size >= 5) break;
    for (const { cat, re } of CATEGORY_PATTERNS) {
      if (seenCats.has(cat)) continue;
      const path = stripQuery(cand.replace(origin, ""));
      if (re.test(path)) {
        out.push({ url: cand, category: cat, reason: `path matches /${cat}` });
        seenCats.add(cat);
        break;
      }
    }
  }

  // Cap to home + 3 secondary pages
  return out.slice(0, 4);
}

function toAbsolute(href: string, origin: string): string | null {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:"))
    return null;
  try {
    return new URL(href, origin).toString();
  } catch {
    return null;
  }
}

function stripQuery(p: string): string {
  return p.split("?")[0].split("#")[0];
}
