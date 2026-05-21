import Anthropic from "@anthropic-ai/sdk";
import type { AuditFindings } from "./types";

/**
 * Claude synthesis. Takes the structured findings + screenshots and
 * returns a streaming text response with five sections:
 *
 *   1. OBSERVED — what we actually measured (numbers in £, %, ms)
 *   2. VISUAL & UX — what the screenshots show (vision pass)
 *   3. INDUSTRY CONTEXT — inferred vertical + what businesses like
 *      theirs typically have
 *   4. CAPABILITY GAPS — what they don't have that competitors do
 *   5. BESPOKE QUESTIONS — 4–6 follow-up questions specific to the
 *      gaps detected, including ops/CRM/spreadsheet usage and
 *      integration paths
 *
 * Every claim must trace to a value we collected. Claude is told
 * explicitly not to invent figures.
 */

const SYSTEM_PROMPT = `You are the Growth Studio audit synthesiser. You receive structured signals about a real business website (HTML parse, security headers, analytics fingerprint, real Lighthouse + CrUX numbers if available, Meta Ad Library lookup, public sitemap stats) AND up to 4 page screenshots.

You write a comprehensive UK-English audit that will be rendered as a structured visual report. Hard rules:

1. NEVER invent numbers. Every figure (ms, %, score, £) must come from the data you were given. If a number wasn't measured, say "not measured" or omit it. Do not estimate ROAS or "recovered £" amounts — you don't have ad data for this audit.
2. Speak to the business owner directly, second person, plain UK English.
3. Use the screenshots to assess visual hierarchy, trust signals, conversion clarity, mobile-readiness, customer-facing capabilities (e.g. "online booking visible", "no checkout flow detected"). Cite what you SEE.
4. Infer the industry from the page copy, the title/headings, the stack (e.g. WooCommerce = e-comm; appointment booking copy = service business; opticians = healthcare retail), the visual cues in the screenshots.
5. Then surface CAPABILITY GAPS specific to that industry tailored to the real signals — for opticians: online prescription glasses sales, eye-test booking, prescription upload, virtual try-on. For physio: online booking with deposit, exercise prescription tool. For accountants: client portal, MTD-compliant invoicing.
6. End with 4–6 BESPOKE multiple-choice questions the business should answer to make the audit deeper. Each must include at least 3 plausible option chips AND allow elaboration. Include at least one about their operations software stack (CRM, spreadsheets, inventory, scheduling) and at least one about integration opportunities.

Output format — use these EXACT section markers verbatim, no markdown formatting, no preamble:

[OBSERVED]
4–7 short lines of measurable facts, one per line, starting with a metric label and a colon. Example:
HTTP: 200 · 312ms TTFB · 487KB
Lighthouse mobile: 64 perf, 92 a11y, 81 SEO
Real-user LCP p75: 3.2s (52% good)
Tracking: GA4, Meta Pixel, GTM detected
Security headers: 2 of 6 present (missing CSP, HSTS, XFO, Permissions-Policy)

[VISUAL]
4–6 lines, one per line, describing what you SEE in the captured screenshots. Each line should be a concrete observation:
Hero: cluttered, three competing CTAs, primary action below the fold
Trust signals: no review widget, no client logos visible
Mobile: viewport set, text overlaps logo on contact page
Checkout: no online checkout flow detected — phone number is the conversion path

[INDUSTRY]
Placement: {inferred industry — 2–4 words}
Signals: {1 line summarising the signals that placed them — copy you saw, stack detected, page categories present}
Typical capabilities in this industry:
- {capability 1}
- {capability 2}
- {capability 3}
- {capability 4}
- {capability 5}

[GAPS]
Each gap on its own line in the format: TITLE — IMPACT
Example:
Online prescription glasses sales — competitors capture £30–80 AOV from this channel; you currently push everything to in-store
Eye-test booking widget — manual phone bookings cost staff time and lose evening/weekend leads
3–5 gaps, only ones you have real evidence are missing.

[QUESTIONS_JSON]
A single JSON object on one line (no surrounding text, no markdown code fences) shaped exactly like:
{"questions":[{"id":"q1","prompt":"...","category":"ops|integration|industry|funnel|growth","options":["...","...","...","..."],"allowElaborate":true},...]}
- Provide 4–6 questions.
- prompt: phrase as "We noticed X — how do you currently handle Y?" (specific to detected gaps)
- options: 3–4 plausible answer chips covering common SME setups
- category labels are exactly one of: ops, integration, industry, funnel, growth
- Always set allowElaborate: true so the prospect can type a free-text answer
- Ensure valid JSON — no trailing commas, double quotes only

Do not add a closing summary. Do not write a sign-off. End after the JSON.`;

export interface SynthesisCallbacks {
  onChunk: (text: string) => void;
}

export async function synthesise(
  findings: AuditFindings,
  cb: SynthesisCallbacks
): Promise<void> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    cb.onChunk(buildFallbackReport(findings));
    return;
  }

  const userContent = buildUserContent(findings);

  const client = new Anthropic({ apiKey });
  try {
    const stream = await client.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 2400,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: userContent }],
    });

    for await (const event of stream) {
      if (
        event.type === "content_block_delta" &&
        event.delta.type === "text_delta"
      ) {
        cb.onChunk(event.delta.text);
      }
    }
  } catch (err) {
    console.error("[audit.synthesise] failed", err);
    cb.onChunk(
      `\n[synthesis error — falling back to raw findings]\n\n${buildFallbackReport(findings)}`
    );
  }
}

function buildUserContent(
  findings: AuditFindings
): Anthropic.Messages.ContentBlockParam[] {
  const blocks: Anthropic.Messages.ContentBlockParam[] = [];

  blocks.push({
    type: "text",
    text:
      `Audit target: ${findings.target.url}\n` +
      `Host: ${findings.target.host}\n` +
      `Collected at: ${findings.collectedAt}\n\n` +
      `STRUCTURED FINDINGS:\n` +
      JSON.stringify(stripScreenshotsForPrompt(findings), null, 2),
  });

  for (const page of findings.pages) {
    if (!page.screenshotBase64 || !page.screenshotMediaType) continue;
    blocks.push({
      type: "text",
      text: `Screenshot below: ${page.category} page · ${page.url}`,
    });
    blocks.push({
      type: "image",
      source: {
        type: "base64",
        media_type: page.screenshotMediaType as
          | "image/png"
          | "image/jpeg"
          | "image/webp"
          | "image/gif",
        data: page.screenshotBase64,
      },
    });
  }

  blocks.push({
    type: "text",
    text: "Now produce the audit using the format described in the system prompt.",
  });

  return blocks;
}

function stripScreenshotsForPrompt(findings: AuditFindings) {
  return {
    ...findings,
    fetch: {
      ...findings.fetch,
      html: `${findings.fetch.html.length} chars (omitted)`,
    },
    pages: findings.pages.map((p) => ({
      url: p.url,
      category: p.category,
      reason: p.reason,
      screenshotCaptured: !!p.screenshotBase64,
      screenshotReason: p.screenshotReason,
    })),
  };
}

function buildFallbackReport(f: AuditFindings): string {
  const psi = f.pagespeedMobile.available ? f.pagespeedMobile : null;
  const stackParts = [f.stack.cms, f.stack.framework, f.stack.ecommerce, f.stack.builder]
    .filter(Boolean)
    .join(" + ");

  return [
    `[OBSERVED]`,
    `HTTP ${f.fetch.status} · TTFB ${f.fetch.ttfbMs}ms · ${(f.fetch.bytes / 1024).toFixed(0)}KB`,
    `Stack: ${stackParts || "not fingerprinted"}`,
    f.parsed
      ? `DOM: ${f.parsed.h1Count} h1, ${f.parsed.imgCount} img (${f.parsed.imgWithoutAlt} without alt), ${f.parsed.externalScripts.length} external scripts, ${f.parsed.formCount} forms`
      : `DOM: not parsed`,
    `Security headers: ${Object.values(f.security).filter(Boolean).length}/6 present`,
    `Tracking: ${f.analytics.detected.length ? f.analytics.detected.join(", ") : "none detected"}`,
    f.sitemap.found
      ? `Sitemap: ${f.sitemap.urlCount} URLs`
      : `Sitemap: not found`,
    psi
      ? `Lighthouse (mobile): perf ${psi.performance ?? "?"} · a11y ${psi.accessibility ?? "?"} · SEO ${psi.seo ?? "?"}`
      : `Lighthouse: not run (GOOGLE_API_KEY missing)`,
    ``,
    `[VISUAL]`,
    `Vision analysis requires ANTHROPIC_API_KEY. Captured ${f.pages.filter((p) => p.screenshotBase64).length} of ${f.pages.length} planned screenshots.`,
    ``,
    `[INDUSTRY]`,
    `Industry inference requires ANTHROPIC_API_KEY.`,
    ``,
    `[GAPS]`,
    `Gap analysis requires ANTHROPIC_API_KEY.`,
    ``,
    `[QUESTIONS]`,
    `1. Set ANTHROPIC_API_KEY in your Vercel env to get the full synthesis.`,
  ].join("\n");
}
