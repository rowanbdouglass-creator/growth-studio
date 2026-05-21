import type { ParsedDocument } from "./types";

/**
 * Regex-based HTML parser. Avoids pulling cheerio/jsdom into the audit
 * runtime — we only need a handful of structural signals, all of which
 * are cheap to extract from raw HTML.
 *
 * Trade-off: malformed or JS-rendered markup will give us less data than
 * a headless browser would. v2 can layer Browserless on top.
 */

const ATTR = (name: string) =>
  new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i");

function attr(tag: string, name: string): string | null {
  const m = tag.match(ATTR(name));
  if (!m) return null;
  return m[2] ?? m[3] ?? null;
}

function matchAll(html: string, re: RegExp): RegExpMatchArray[] {
  const out: RegExpMatchArray[] = [];
  for (const m of html.matchAll(re)) out.push(m);
  return out;
}

export function parseHtml(html: string): ParsedDocument {
  if (!html) {
    return emptyParsed();
  }

  const head = (html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? html).slice(
    0,
    300_000
  );

  const titleMatch = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decode(titleMatch[1].trim()) : null;

  const metaTags = matchAll(head, /<meta\b[^>]*>/gi).map((m) => m[0]);

  const findMeta = (key: "name" | "property", value: string): string | null => {
    for (const tag of metaTags) {
      const k = attr(tag, key);
      if (k && k.toLowerCase() === value.toLowerCase()) {
        return attr(tag, "content");
      }
    }
    return null;
  };

  const metaDescription = findMeta("name", "description");
  const robotsMeta = findMeta("name", "robots");
  const viewport = findMeta("name", "viewport");

  const charsetMeta = metaTags.find((t) => /charset\s*=/i.test(t));
  const charset = charsetMeta ? attr(charsetMeta, "charset") : null;

  const linkTags = matchAll(head, /<link\b[^>]*>/gi).map((m) => m[0]);
  const canonicalTag = linkTags.find(
    (t) => attr(t, "rel")?.toLowerCase() === "canonical"
  );
  const canonical = canonicalTag ? attr(canonicalTag, "href") : null;

  const htmlTagMatch = html.match(/<html\b[^>]*>/i);
  const langAttr = htmlTagMatch ? attr(htmlTagMatch[0], "lang") : null;

  const ogTags: Record<string, string> = {};
  const twitterTags: Record<string, string> = {};
  for (const tag of metaTags) {
    const prop = attr(tag, "property") ?? "";
    const name = attr(tag, "name") ?? "";
    const content = attr(tag, "content");
    if (content && prop.toLowerCase().startsWith("og:")) {
      ogTags[prop.toLowerCase()] = content;
    }
    if (content && name.toLowerCase().startsWith("twitter:")) {
      twitterTags[name.toLowerCase()] = content;
    }
  }

  const jsonLdCount = matchAll(
    html,
    /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>/gi
  ).length;

  const headings = matchAll(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi);
  const h1Count = headings.length;
  const h1First = headings[0]
    ? decode(headings[0][1].replace(/<[^>]+>/g, "").trim()).slice(0, 200)
    : null;

  const imgTags = matchAll(html, /<img\b[^>]*>/gi).map((m) => m[0]);
  const imgCount = imgTags.length;
  const imgWithoutAlt = imgTags.filter((t) => {
    const a = attr(t, "alt");
    return a === null || a === "";
  }).length;

  const scriptTags = matchAll(
    html,
    /<script\b([^>]*)>([\s\S]*?)<\/script>/gi
  );
  let externalScripts: string[] = [];
  let internalScripts = 0;
  let inlineScripts = 0;
  for (const m of scriptTags) {
    const open = m[1];
    const body = m[2];
    const src = attr(`<script ${open}>`, "src");
    if (src) {
      externalScripts.push(src);
    } else if (body.trim().length > 0) {
      inlineScripts++;
    } else {
      internalScripts++;
    }
  }
  externalScripts = externalScripts.slice(0, 80);

  const stylesheets = matchAll(
    html,
    /<link\b[^>]*rel\s*=\s*["']stylesheet["'][^>]*>/gi
  ).length;

  const inlineStyleBytes = matchAll(html, /<style\b[^>]*>([\s\S]*?)<\/style>/gi)
    .map((m) => m[1].length)
    .reduce((a, b) => a + b, 0);

  const formTags = matchAll(html, /<form\b([^>]*)>/gi).map((m) => m[1]);
  const formCount = formTags.length;
  const formWithoutMethod = formTags.filter(
    (t) => !attr(`<form ${t}>`, "method")
  ).length;

  const anchorTags = matchAll(html, /<a\b[^>]*>/gi).map((m) => m[0]);
  const anchorCount = anchorTags.length;
  const emailLinks = anchorTags.filter((t) =>
    /href\s*=\s*["']mailto:/i.test(t)
  ).length;
  const telLinks = anchorTags.filter((t) =>
    /href\s*=\s*["']tel:/i.test(t)
  ).length;

  return {
    title,
    metaDescription,
    canonical,
    robotsMeta,
    viewport,
    langAttr,
    charset,
    ogTags,
    twitterTags,
    jsonLdCount,
    h1Count,
    h1First,
    imgCount,
    imgWithoutAlt,
    externalScripts,
    internalScripts,
    inlineScripts,
    stylesheets,
    inlineStyleBytes,
    formCount,
    formWithoutMethod,
    anchorCount,
    emailLinks,
    telLinks,
  };
}

function emptyParsed(): ParsedDocument {
  return {
    title: null,
    metaDescription: null,
    canonical: null,
    robotsMeta: null,
    viewport: null,
    langAttr: null,
    charset: null,
    ogTags: {},
    twitterTags: {},
    jsonLdCount: 0,
    h1Count: 0,
    h1First: null,
    imgCount: 0,
    imgWithoutAlt: 0,
    externalScripts: [],
    internalScripts: 0,
    inlineScripts: 0,
    stylesheets: 0,
    inlineStyleBytes: 0,
    formCount: 0,
    formWithoutMethod: 0,
    anchorCount: 0,
    emailLinks: 0,
    telLinks: 0,
  };
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}
