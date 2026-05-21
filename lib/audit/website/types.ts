/**
 * Real Website Audit — shared types.
 *
 * The audit pipeline collects observable signals from the target URL and
 * its public surface (sitemap, robots.txt, response headers), then hands
 * the structured findings to Claude for synthesis. Every number in the
 * final report must trace back to a value collected here.
 */

export interface FetchResult {
  status: number;
  finalUrl: string;
  redirects: number;
  bytes: number;
  ttfbMs: number;
  totalMs: number;
  headers: Record<string, string>;
  html: string;
  contentType: string | null;
  error?: string;
}

export interface ParsedDocument {
  title: string | null;
  metaDescription: string | null;
  canonical: string | null;
  robotsMeta: string | null;
  viewport: string | null;
  langAttr: string | null;
  charset: string | null;
  ogTags: Record<string, string>;
  twitterTags: Record<string, string>;
  jsonLdCount: number;
  h1Count: number;
  h1First: string | null;
  imgCount: number;
  imgWithoutAlt: number;
  externalScripts: string[];
  internalScripts: number;
  inlineScripts: number;
  stylesheets: number;
  inlineStyleBytes: number;
  formCount: number;
  formWithoutMethod: number;
  anchorCount: number;
  emailLinks: number;
  telLinks: number;
}

export interface SecurityHeaders {
  hsts: boolean;
  csp: boolean;
  xFrameOptions: boolean;
  xContentTypeOptions: boolean;
  referrerPolicy: boolean;
  permissionsPolicy: boolean;
}

export interface AnalyticsSignals {
  ga4: boolean;
  universalAnalytics: boolean;
  gtm: boolean;
  metaPixel: boolean;
  linkedinInsight: boolean;
  tiktokPixel: boolean;
  hotjar: boolean;
  clarity: boolean;
  plausible: boolean;
  fathom: boolean;
  amplitude: boolean;
  mixpanel: boolean;
  segment: boolean;
  cookieBanner: boolean;
  detected: string[];
}

export interface StackFingerprint {
  cms: string | null;
  framework: string | null;
  ecommerce: string | null;
  server: string | null;
  cdn: string | null;
  poweredBy: string | null;
  builder: string | null;
  hints: string[];
}

export interface SitemapResult {
  found: boolean;
  urlCount: number | null;
  sampleUrls: string[];
  error?: string;
}

export interface RobotsResult {
  found: boolean;
  disallowsAll: boolean;
  sitemapUrls: string[];
  error?: string;
}

export interface PageSpeedResult {
  available: boolean;
  reason?: string;
  performance: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  seo: number | null;
  lcp: { value: number | null; category: string | null };
  cls: { value: number | null; category: string | null };
  inp: { value: number | null; category: string | null };
  fcp: { value: number | null; category: string | null };
  ttfb: { value: number | null; category: string | null };
  strategy: "mobile" | "desktop";
}

export interface CrUXResult {
  available: boolean;
  reason?: string;
  lcp: { p75: number | null; goodPct: number | null };
  cls: { p75: number | null; goodPct: number | null };
  inp: { p75: number | null; goodPct: number | null };
  fcp: { p75: number | null; goodPct: number | null };
  ttfb: { p75: number | null; goodPct: number | null };
}

export interface AdLibraryResult {
  available: boolean;
  query: string;
  reason?: string;
  activeAds: number | null;
  sample: Array<{
    snapshot?: string;
    runStart?: string;
    pageName?: string;
  }>;
}

export interface DiscoveredPageCapture {
  url: string;
  category: string;
  reason: string;
  screenshotUrl: string | null;
  screenshotBase64: string | null;
  screenshotMediaType: string | null;
  screenshotReason?: string;
}

export interface AuditFindings {
  target: { url: string; host: string };
  fetch: FetchResult;
  parsed: ParsedDocument | null;
  security: SecurityHeaders;
  analytics: AnalyticsSignals;
  stack: StackFingerprint;
  sitemap: SitemapResult;
  robots: RobotsResult;
  pagespeedMobile: PageSpeedResult;
  pagespeedDesktop: PageSpeedResult;
  crux: CrUXResult;
  adLibrary: AdLibraryResult;
  pages: DiscoveredPageCapture[];
  collectedAt: string;
  durationMs: number;
}
