import { hostnameFrom, fetchPage } from "./fetch";
import { parseHtml } from "./parse";
import { analyseSecurityHeaders } from "./headers";
import { fetchRobots, fetchSitemap } from "./sitemap";
import { detectAnalytics, fingerprintStack } from "./fingerprint";
import { runCrUX, runPageSpeed } from "./pagespeed";
import { brandQueryFromParsed, lookupAdLibrary } from "./adlibrary";
import { captureScreenshot, downloadScreenshotBase64 } from "./screenshot";
import { discoverPages } from "./discover";
import type { AuditFindings, DiscoveredPageCapture } from "./types";

export type ProgressEvent =
  | { kind: "phase"; label: string }
  | { kind: "signal"; label: string; value: string };

export type ProgressCb = (e: ProgressEvent) => void;

export async function collectAudit(
  url: string,
  progress: ProgressCb
): Promise<AuditFindings> {
  const start = Date.now();
  const host = hostnameFrom(url);
  const origin = `https://${host}`;

  progress({ kind: "phase", label: `Fetching ${host}` });
  const fetchResult = await fetchPage(url);

  if (fetchResult.status === 0 || fetchResult.error) {
    progress({
      kind: "signal",
      label: "Fetch failed",
      value: fetchResult.error ?? "unknown error",
    });
  } else {
    progress({
      kind: "signal",
      label: "HTTP",
      value: `${fetchResult.status} · ${fetchResult.ttfbMs}ms · ${formatBytes(fetchResult.bytes)}`,
    });
  }

  progress({ kind: "phase", label: "Parsing HTML" });
  const parsed = fetchResult.html ? parseHtml(fetchResult.html) : null;
  if (parsed) {
    progress({
      kind: "signal",
      label: "DOM",
      value: `${parsed.h1Count} h1 · ${parsed.imgCount} img (${parsed.imgWithoutAlt} no alt) · ${parsed.externalScripts.length} ext scripts · ${parsed.formCount} forms`,
    });
    progress({
      kind: "signal",
      label: "SEO",
      value: `title ${parsed.title ? "✓" : "✗"} · meta-desc ${parsed.metaDescription ? "✓" : "✗"} · canonical ${parsed.canonical ? "✓" : "✗"} · JSON-LD ×${parsed.jsonLdCount}`,
    });
  }

  progress({ kind: "phase", label: "Checking security headers" });
  const security = analyseSecurityHeaders(fetchResult);
  const secCount = Object.values(security).filter(Boolean).length;
  progress({
    kind: "signal",
    label: "Security headers",
    value: `${secCount}/6 present`,
  });

  progress({ kind: "phase", label: "Fingerprinting stack" });
  const stack = fingerprintStack(fetchResult, parsed);
  const stackParts = [stack.cms, stack.framework, stack.ecommerce, stack.builder].filter(
    Boolean
  ) as string[];
  progress({
    kind: "signal",
    label: "Stack",
    value: stackParts.length ? stackParts.join(" + ") : "no obvious CMS/framework",
  });

  progress({ kind: "phase", label: "Detecting analytics" });
  const analytics = detectAnalytics(fetchResult, parsed);
  progress({
    kind: "signal",
    label: "Tracking",
    value: analytics.detected.length
      ? analytics.detected.join(", ")
      : "nothing detected",
  });

  progress({ kind: "phase", label: "Reading robots.txt + sitemap" });
  const robots = await fetchRobots(origin);
  const sitemap = await fetchSitemap(origin, robots.sitemapUrls);
  progress({
    kind: "signal",
    label: "Index",
    value: `${robots.found ? "robots ✓" : "robots ✗"} · ${
      sitemap.found
        ? `sitemap ${sitemap.urlCount ?? "?"} URLs`
        : "sitemap ✗"
    }`,
  });

  progress({ kind: "phase", label: "Running PageSpeed Insights (mobile + desktop)" });
  const [psiMobile, psiDesktop, crux] = await Promise.all([
    runPageSpeed(url, "mobile"),
    runPageSpeed(url, "desktop"),
    runCrUX(url),
  ]);

  if (psiMobile.available) {
    progress({
      kind: "signal",
      label: "PSI mobile",
      value: `perf ${psiMobile.performance ?? "?"} · a11y ${psiMobile.accessibility ?? "?"} · SEO ${psiMobile.seo ?? "?"}`,
    });
  } else {
    progress({
      kind: "signal",
      label: "PSI mobile",
      value: psiMobile.reason ?? "skipped",
    });
  }
  if (psiDesktop.available) {
    progress({
      kind: "signal",
      label: "PSI desktop",
      value: `perf ${psiDesktop.performance ?? "?"} · LCP ${formatMs(psiDesktop.lcp.value)}`,
    });
  }
  if (crux.available) {
    progress({
      kind: "signal",
      label: "Real-user CWV",
      value: `LCP p75 ${formatMs(crux.lcp.p75)} (${crux.lcp.goodPct ?? "?"}% good) · CLS ${crux.cls.p75 ?? "?"} · INP ${formatMs(crux.inp.p75)}`,
    });
  } else {
    progress({ kind: "signal", label: "CrUX", value: crux.reason ?? "skipped" });
  }

  progress({ kind: "phase", label: "Looking up Meta Ad Library" });
  const brandQuery = brandQueryFromParsed(host, parsed);
  const adLibrary = await lookupAdLibrary(brandQuery);
  if (adLibrary.available) {
    progress({
      kind: "signal",
      label: "Meta Ad Library",
      value: `${adLibrary.activeAds ?? 0} active ad${adLibrary.activeAds === 1 ? "" : "s"} matching "${brandQuery}"`,
    });
  } else {
    progress({
      kind: "signal",
      label: "Meta Ad Library",
      value: adLibrary.reason ?? "skipped",
    });
  }

  progress({ kind: "phase", label: "Discovering key pages" });
  const discovered = discoverPages(url, parsed, sitemap, fetchResult.html);
  progress({
    kind: "signal",
    label: "Pages",
    value: discovered.map((p) => p.category).join(" + "),
  });

  progress({
    kind: "phase",
    label: `Capturing ${discovered.length} screenshot${discovered.length === 1 ? "" : "s"}`,
  });
  const pageCaptures: DiscoveredPageCapture[] = [];
  for (const p of discovered) {
    const shot = await captureScreenshot(p.url, "desktop");
    if (!shot.available || !shot.url) {
      pageCaptures.push({
        url: p.url,
        category: p.category,
        reason: p.reason,
        screenshotUrl: null,
        screenshotBase64: null,
        screenshotMediaType: null,
        screenshotReason: shot.reason,
      });
      progress({
        kind: "signal",
        label: `Screenshot · ${p.category}`,
        value: shot.reason ?? "failed",
      });
      continue;
    }
    const dl = await downloadScreenshotBase64(shot.url);
    if (!dl.ok) {
      pageCaptures.push({
        url: p.url,
        category: p.category,
        reason: p.reason,
        screenshotUrl: shot.url,
        screenshotBase64: null,
        screenshotMediaType: null,
        screenshotReason: dl.reason,
      });
      progress({
        kind: "signal",
        label: `Screenshot · ${p.category}`,
        value: dl.reason ?? "download failed",
      });
      continue;
    }
    pageCaptures.push({
      url: p.url,
      category: p.category,
      reason: p.reason,
      screenshotUrl: shot.url,
      screenshotBase64: dl.base64,
      screenshotMediaType: dl.mediaType,
    });
    progress({
      kind: "signal",
      label: `Screenshot · ${p.category}`,
      value: `captured · ${Math.round(dl.base64.length / 1024)}KB`,
    });
  }

  return {
    target: { url, host },
    fetch: fetchResult,
    parsed,
    security,
    analytics,
    stack,
    sitemap,
    robots,
    pagespeedMobile: psiMobile,
    pagespeedDesktop: psiDesktop,
    crux,
    adLibrary,
    pages: pageCaptures,
    collectedAt: new Date().toISOString(),
    durationMs: Date.now() - start,
  };
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n}B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}KB`;
  return `${(n / 1024 / 1024).toFixed(2)}MB`;
}

function formatMs(n: number | null): string {
  if (n === null) return "?";
  if (n < 1000) return `${Math.round(n)}ms`;
  return `${(n / 1000).toFixed(2)}s`;
}
