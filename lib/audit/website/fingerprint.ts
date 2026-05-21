import type {
  AnalyticsSignals,
  FetchResult,
  ParsedDocument,
  StackFingerprint,
} from "./types";

/**
 * Fingerprint the target's tech stack and analytics setup from raw HTML
 * + response headers. Detection rules are heuristic but anchored to
 * stable string patterns we observe in production responses.
 */

interface Context {
  html: string;
  headers: Record<string, string>;
  scripts: string[];
}

function any(ctx: Context, patterns: (string | RegExp)[]): boolean {
  for (const p of patterns) {
    if (typeof p === "string") {
      if (ctx.html.includes(p)) return true;
      for (const s of ctx.scripts) if (s.includes(p)) return true;
    } else {
      if (p.test(ctx.html)) return true;
      for (const s of ctx.scripts) if (p.test(s)) return true;
    }
  }
  return false;
}

export function fingerprintStack(
  fetchResult: FetchResult,
  parsed: ParsedDocument | null
): StackFingerprint {
  const ctx: Context = {
    html: fetchResult.html,
    headers: fetchResult.headers,
    scripts: parsed?.externalScripts ?? [],
  };
  const h = fetchResult.headers;

  const hints: string[] = [];

  let cms: string | null = null;
  if (
    any(ctx, [
      "/wp-content/",
      "/wp-includes/",
      "wp-json",
      /<meta[^>]+name=["']generator["'][^>]+content=["']wordpress/i,
    ])
  ) {
    cms = "WordPress";
    hints.push("/wp-content/ paths detected");
  } else if (any(ctx, ["Drupal.settings", "drupal-settings-json"])) cms = "Drupal";
  else if (any(ctx, ["/sites/default/files/", "joomla"])) cms = "Joomla";
  else if (any(ctx, ["ghost-sdk", "/ghost/"])) cms = "Ghost";
  else if (any(ctx, ["squarespace.com/static", "Static.SQUARESPACE_CONTEXT"]))
    cms = "Squarespace";
  else if (any(ctx, ["wix.com", "static.parastorage.com"])) cms = "Wix";
  else if (any(ctx, ["webflow.com", "webflow.js", /<html[^>]+data-wf-page/i]))
    cms = "Webflow";
  else if (any(ctx, ["framer.com", "framerusercontent.com"])) cms = "Framer";
  else if (any(ctx, ["sanity.io/static", "sanity-studio"])) cms = "Sanity";
  else if (any(ctx, ["contentful.com"])) cms = "Contentful";
  else if (any(ctx, [/<meta[^>]+name=["']generator["'][^>]+content=["']HubSpot/i]))
    cms = "HubSpot CMS";

  let framework: string | null = null;
  if (
    any(ctx, [
      "/_next/static/",
      "__NEXT_DATA__",
      /<meta[^>]+name=["']next-head-count/i,
    ])
  )
    framework = "Next.js";
  else if (any(ctx, ["/_nuxt/", "__NUXT__"])) framework = "Nuxt";
  else if (any(ctx, ["sveltekit-", "__sveltekit"])) framework = "SvelteKit";
  else if (any(ctx, ["data-reactroot", "react-dom"])) framework = "React";
  else if (any(ctx, ["ng-version=", "/angular"])) framework = "Angular";
  else if (any(ctx, ["data-server-rendered=\"true\"", "vue-router"]))
    framework = "Vue";
  else if (any(ctx, ["/cdn-cgi/", "_astro/"])) framework = "Astro";
  else if (any(ctx, ["/_remix/"])) framework = "Remix";

  let ecommerce: string | null = null;
  if (
    any(ctx, [
      "cdn.shopify.com",
      "Shopify.theme",
      "shopify.com/checkouts",
      /<meta[^>]+content=["']Shopify/i,
    ])
  )
    ecommerce = "Shopify";
  else if (any(ctx, ["/checkout/onepage", "Magento", "/static/version"]))
    ecommerce = "Magento";
  else if (any(ctx, ["bigcommerce.com", "/checkout?items"]))
    ecommerce = "BigCommerce";
  else if (any(ctx, ["squarespace-commerce", "Static.SQUARESPACE_COMMERCE"]))
    ecommerce = "Squarespace Commerce";
  else if (any(ctx, ["woocommerce", "/wc-ajax/"])) ecommerce = "WooCommerce";

  const server = (h["server"] || null)?.split(",")[0]?.trim() ?? null;
  const cdn = detectCdn(h);
  const poweredBy = h["x-powered-by"] ?? null;

  let builder: string | null = null;
  if (any(ctx, ["elementor-", "data-elementor-"])) builder = "Elementor";
  else if (any(ctx, ["wpb-content-layout", "vc_row"])) builder = "WPBakery";
  else if (any(ctx, ["data-divi-", "et_pb_section"])) builder = "Divi";
  else if (any(ctx, ["beaver-builder"])) builder = "Beaver Builder";
  else if (any(ctx, ["bricks-builder", "data-brx"])) builder = "Bricks";

  if (server) hints.push(`server: ${server}`);
  if (cdn) hints.push(`cdn: ${cdn}`);
  if (poweredBy) hints.push(`x-powered-by: ${poweredBy}`);
  if (h["cf-ray"]) hints.push("cloudflare ray-id present");

  return { cms, framework, ecommerce, server, cdn, poweredBy, builder, hints };
}

function detectCdn(h: Record<string, string>): string | null {
  if (h["cf-ray"]) return "Cloudflare";
  if (/^vercel/i.test(h["server"] ?? "")) return "Vercel";
  if (h["x-vercel-id"]) return "Vercel";
  if (h["x-nf-request-id"]) return "Netlify";
  if (h["x-amz-cf-id"]) return "AWS CloudFront";
  if (h["x-cache"]?.toLowerCase().includes("fastly")) return "Fastly";
  if (h["x-served-by"]?.toLowerCase().includes("akamai")) return "Akamai";
  if (h["x-azure-ref"]) return "Azure CDN";
  return null;
}

export function detectAnalytics(
  fetchResult: FetchResult,
  parsed: ParsedDocument | null
): AnalyticsSignals {
  const ctx: Context = {
    html: fetchResult.html,
    headers: fetchResult.headers,
    scripts: parsed?.externalScripts ?? [],
  };

  const ga4 = any(ctx, [
    /gtag\(\s*['"]config['"]\s*,\s*['"]G-[A-Z0-9]+/i,
    /googletagmanager\.com\/gtag\/js\?id=G-/i,
  ]);
  const universalAnalytics = any(ctx, [
    /UA-[0-9]+-[0-9]+/i,
    "google-analytics.com/analytics.js",
  ]);
  const gtm = any(ctx, [
    /googletagmanager\.com\/gtm\.js\?id=GTM-/i,
    /GTM-[A-Z0-9]{4,}/i,
  ]);
  const metaPixel = any(ctx, [
    "connect.facebook.net/en_US/fbevents.js",
    "fbq('init'",
    "fbq(\"init\"",
  ]);
  const linkedinInsight = any(ctx, [
    "snap.licdn.com/li.lms-analytics",
    "_linkedin_partner_id",
  ]);
  const tiktokPixel = any(ctx, ["analytics.tiktok.com", "ttq.load("]);
  const hotjar = any(ctx, ["static.hotjar.com", "hjid:"]);
  const clarity = any(ctx, ["clarity.ms/tag/", "clarity('"]);
  const plausible = any(ctx, ["plausible.io/js"]);
  const fathom = any(ctx, ["cdn.usefathom.com"]);
  const amplitude = any(ctx, ["cdn.amplitude.com", "amplitude.getInstance"]);
  const mixpanel = any(ctx, ["cdn.mxpnl.com", "mixpanel.init"]);
  const segment = any(ctx, ["cdn.segment.com/analytics.js", "analytics.load("]);

  const cookieBanner = any(ctx, [
    "cookiebot",
    "onetrust",
    "cookieyes",
    "iubenda",
    "termly",
    "complianz",
    "cookie-consent",
  ]);

  const detected: string[] = [];
  if (ga4) detected.push("Google Analytics 4");
  if (universalAnalytics) detected.push("Universal Analytics (deprecated)");
  if (gtm) detected.push("Google Tag Manager");
  if (metaPixel) detected.push("Meta Pixel");
  if (linkedinInsight) detected.push("LinkedIn Insight");
  if (tiktokPixel) detected.push("TikTok Pixel");
  if (hotjar) detected.push("Hotjar");
  if (clarity) detected.push("Microsoft Clarity");
  if (plausible) detected.push("Plausible");
  if (fathom) detected.push("Fathom");
  if (amplitude) detected.push("Amplitude");
  if (mixpanel) detected.push("Mixpanel");
  if (segment) detected.push("Segment");

  return {
    ga4,
    universalAnalytics,
    gtm,
    metaPixel,
    linkedinInsight,
    tiktokPixel,
    hotjar,
    clarity,
    plausible,
    fathom,
    amplitude,
    mixpanel,
    segment,
    cookieBanner,
    detected,
  };
}
