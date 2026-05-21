import type { AdLibraryResult, ParsedDocument } from "./types";

/**
 * Meta Ad Library lookup. Public surface — no auth required. We hit the
 * unofficial JSON endpoint backing the search page; it's stable enough
 * for a public-signal audit, but the absence of an ad library result is
 * never a hard claim that the brand isn't running ads — Meta only
 * exposes ads matching their issue-ad / page-name search filters.
 *
 * If this endpoint changes or returns garbage, we degrade gracefully.
 */

const SEARCH_ENDPOINT = "https://www.facebook.com/ads/library/async/search_ads/";

export async function lookupAdLibrary(
  brandQuery: string
): Promise<AdLibraryResult> {
  const query = brandQuery.trim();
  const empty: AdLibraryResult = {
    available: false,
    query,
    activeAds: null,
    sample: [],
  };

  if (!query) {
    return { ...empty, reason: "no brand query" };
  }

  const params = new URLSearchParams({
    q: query,
    count: "10",
    active_status: "active",
    ad_type: "all",
    country: "GB",
    media_type: "all",
    search_type: "keyword_unordered",
    source: "nav-header",
  });

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch(`${SEARCH_ENDPOINT}?${params.toString()}`, {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; GrowthStudioAuditBot/1.0; +https://growth-studio-two.vercel.app)",
        Accept: "*/*",
      },
      signal: controller.signal,
    });
    if (!res.ok) {
      return { ...empty, reason: `Ad Library HTTP ${res.status}` };
    }
    const text = await res.text();
    // The endpoint returns a "for (;;);" JSON-prefix-attack response.
    const jsonText = text.replace(/^for \(;;\);/, "");
    let body: unknown;
    try {
      body = JSON.parse(jsonText);
    } catch {
      return { ...empty, reason: "Ad Library response not JSON" };
    }
    if (!body || typeof body !== "object") {
      return { ...empty, reason: "Ad Library response empty" };
    }

    // The shape is internal and changes — extract what we can defensively.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = body as any;
    const results: unknown[] =
      payload?.payload?.results ??
      payload?.results ??
      payload?.payload?.ads ??
      [];

    if (!Array.isArray(results)) {
      return { ...empty, available: true, activeAds: 0, reason: "no results array" };
    }

    const sample = results
      .slice(0, 5)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((r: any) => ({
        snapshot: r?.snapshot_url ?? r?.snapshot?.url ?? undefined,
        runStart: r?.start_date ?? r?.created_time ?? undefined,
        pageName: r?.page_name ?? r?.page?.name ?? undefined,
      }))
      .filter((s) => s.snapshot || s.pageName);

    return {
      available: true,
      query,
      activeAds: results.length,
      sample,
    };
  } catch (err) {
    return {
      ...empty,
      reason: err instanceof Error ? err.message : "Ad Library lookup failed",
    };
  } finally {
    clearTimeout(t);
  }
}

export function brandQueryFromParsed(
  host: string,
  parsed: ParsedDocument | null
): string {
  if (parsed?.ogTags["og:site_name"]) return parsed.ogTags["og:site_name"];
  if (parsed?.title) {
    const t = parsed.title.split(/[|·–—-]/)[0]?.trim();
    if (t && t.length > 2) return t;
  }
  return host.split(".")[0];
}
