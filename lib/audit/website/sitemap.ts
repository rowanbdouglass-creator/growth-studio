import { fetchText } from "./fetch";
import type { RobotsResult, SitemapResult } from "./types";

export async function fetchRobots(origin: string): Promise<RobotsResult> {
  const res = await fetchText(`${origin}/robots.txt`, 6000);
  if (!res.ok) {
    return {
      found: false,
      disallowsAll: false,
      sitemapUrls: [],
      error: res.error ?? `HTTP ${res.status}`,
    };
  }
  const lines = res.text.split("\n").map((l) => l.trim());
  const sitemapUrls = lines
    .filter((l) => /^sitemap:/i.test(l))
    .map((l) => l.replace(/^sitemap:\s*/i, "").trim())
    .filter(Boolean);

  // Detect global disallow (User-agent: * + Disallow: /)
  let inStar = false;
  let disallowsAll = false;
  for (const line of lines) {
    if (/^user-agent:\s*\*/i.test(line)) inStar = true;
    else if (/^user-agent:/i.test(line)) inStar = false;
    else if (inStar && /^disallow:\s*\/\s*$/i.test(line)) disallowsAll = true;
  }

  return { found: true, disallowsAll, sitemapUrls };
}

export async function fetchSitemap(
  origin: string,
  fromRobots: string[]
): Promise<SitemapResult> {
  const candidates = [
    ...fromRobots,
    `${origin}/sitemap.xml`,
    `${origin}/sitemap_index.xml`,
    `${origin}/sitemap-index.xml`,
  ];

  for (const url of candidates) {
    const res = await fetchText(url, 7000);
    if (!res.ok || !res.text.trim().startsWith("<")) continue;
    const locs = [...res.text.matchAll(/<loc[^>]*>\s*([^<]+?)\s*<\/loc>/gi)].map(
      (m) => m[1]
    );
    if (locs.length === 0) {
      return { found: true, urlCount: 0, sampleUrls: [] };
    }
    return {
      found: true,
      urlCount: locs.length,
      sampleUrls: locs.slice(0, 5),
    };
  }

  return {
    found: false,
    urlCount: null,
    sampleUrls: [],
    error: "No sitemap found at robots.txt, /sitemap.xml, or common index paths",
  };
}
