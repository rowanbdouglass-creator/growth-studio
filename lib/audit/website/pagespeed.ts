import type { CrUXResult, PageSpeedResult } from "./types";

const PSI_ENDPOINT =
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const CRUX_ENDPOINT =
  "https://chromeuxreport.googleapis.com/v1/records:queryRecord";

const TIMEOUT_MS = 45_000;

function metric(
  audit: { numericValue?: number; score?: number | null } | undefined
): number | null {
  if (!audit) return null;
  return typeof audit.numericValue === "number" ? audit.numericValue : null;
}

function categoryScore(category: { score?: number | null } | undefined): number | null {
  if (!category || typeof category.score !== "number") return null;
  return Math.round(category.score * 100);
}

function categorise(metricName: string, value: number | null): string | null {
  if (value === null) return null;
  switch (metricName) {
    case "lcp":
      return value <= 2500 ? "good" : value <= 4000 ? "needs-improvement" : "poor";
    case "cls":
      return value <= 0.1 ? "good" : value <= 0.25 ? "needs-improvement" : "poor";
    case "inp":
      return value <= 200 ? "good" : value <= 500 ? "needs-improvement" : "poor";
    case "fcp":
      return value <= 1800 ? "good" : value <= 3000 ? "needs-improvement" : "poor";
    case "ttfb":
      return value <= 800 ? "good" : value <= 1800 ? "needs-improvement" : "poor";
    default:
      return null;
  }
}

export async function runPageSpeed(
  url: string,
  strategy: "mobile" | "desktop"
): Promise<PageSpeedResult> {
  const empty: PageSpeedResult = {
    available: false,
    performance: null,
    accessibility: null,
    bestPractices: null,
    seo: null,
    lcp: { value: null, category: null },
    cls: { value: null, category: null },
    inp: { value: null, category: null },
    fcp: { value: null, category: null },
    ttfb: { value: null, category: null },
    strategy,
  };

  const key = process.env.GOOGLE_API_KEY;
  if (!key) {
    return { ...empty, reason: "GOOGLE_API_KEY not configured" };
  }

  const params = new URLSearchParams({
    url,
    strategy,
    key,
  });
  for (const cat of ["performance", "accessibility", "best-practices", "seo"]) {
    params.append("category", cat);
  }

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${PSI_ENDPOINT}?${params.toString()}`, {
      signal: controller.signal,
    });
    if (!res.ok) {
      return {
        ...empty,
        reason: `PageSpeed API HTTP ${res.status}`,
      };
    }
    const body = await res.json();
    const lh = body.lighthouseResult ?? {};
    const audits = lh.audits ?? {};
    const categories = lh.categories ?? {};

    const lcp = metric(audits["largest-contentful-paint"]);
    const cls = metric(audits["cumulative-layout-shift"]);
    const inp = metric(audits["interaction-to-next-paint"]);
    const fcp = metric(audits["first-contentful-paint"]);
    const ttfb = metric(audits["server-response-time"]);

    return {
      available: true,
      performance: categoryScore(categories.performance),
      accessibility: categoryScore(categories.accessibility),
      bestPractices: categoryScore(categories["best-practices"]),
      seo: categoryScore(categories.seo),
      lcp: { value: lcp, category: categorise("lcp", lcp) },
      cls: { value: cls, category: categorise("cls", cls) },
      inp: { value: inp, category: categorise("inp", inp) },
      fcp: { value: fcp, category: categorise("fcp", fcp) },
      ttfb: { value: ttfb, category: categorise("ttfb", ttfb) },
      strategy,
    };
  } catch (err) {
    return {
      ...empty,
      reason: err instanceof Error ? err.message : "PageSpeed call failed",
    };
  } finally {
    clearTimeout(t);
  }
}

interface CruxMetric {
  histogram?: Array<{ start?: number; end?: number; density?: number }>;
  percentiles?: { p75?: number };
}

function p75(m: CruxMetric | undefined): number | null {
  if (!m) return null;
  if (typeof m.percentiles?.p75 === "number") return m.percentiles.p75;
  return null;
}

function goodPct(m: CruxMetric | undefined): number | null {
  if (!m?.histogram) return null;
  const good = m.histogram[0]?.density;
  return typeof good === "number" ? Math.round(good * 100) : null;
}

export async function runCrUX(url: string): Promise<CrUXResult> {
  const empty: CrUXResult = {
    available: false,
    lcp: { p75: null, goodPct: null },
    cls: { p75: null, goodPct: null },
    inp: { p75: null, goodPct: null },
    fcp: { p75: null, goodPct: null },
    ttfb: { p75: null, goodPct: null },
  };

  const key = process.env.GOOGLE_API_KEY;
  if (!key) {
    return { ...empty, reason: "GOOGLE_API_KEY not configured" };
  }

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 12_000);

  try {
    const res = await fetch(`${CRUX_ENDPOINT}?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
      signal: controller.signal,
    });
    if (!res.ok) {
      return {
        ...empty,
        reason:
          res.status === 404
            ? "Insufficient CrUX data for this URL"
            : `CrUX API HTTP ${res.status}`,
      };
    }
    const body = await res.json();
    const metrics = body.record?.metrics ?? {};
    return {
      available: true,
      lcp: {
        p75: p75(metrics.largest_contentful_paint),
        goodPct: goodPct(metrics.largest_contentful_paint),
      },
      cls: {
        p75: p75(metrics.cumulative_layout_shift),
        goodPct: goodPct(metrics.cumulative_layout_shift),
      },
      inp: {
        p75: p75(metrics.interaction_to_next_paint),
        goodPct: goodPct(metrics.interaction_to_next_paint),
      },
      fcp: {
        p75: p75(metrics.first_contentful_paint),
        goodPct: goodPct(metrics.first_contentful_paint),
      },
      ttfb: {
        p75: p75(metrics.experimental_time_to_first_byte),
        goodPct: goodPct(metrics.experimental_time_to_first_byte),
      },
    };
  } catch (err) {
    return {
      ...empty,
      reason: err instanceof Error ? err.message : "CrUX call failed",
    };
  } finally {
    clearTimeout(t);
  }
}
