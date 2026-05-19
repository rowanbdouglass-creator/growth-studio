import type { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

/**
 * Streaming audit endpoint.
 *
 *   POST /api/audit  { url: string }
 *
 * Returns a text/plain stream. The client component consumes
 * chunks character-by-character to render an audit transcript.
 *
 * If ANTHROPIC_API_KEY is set, calls Claude Sonnet 4.6 with
 * prompt caching on the system prompt. Otherwise falls back to
 * a deterministic simulated transcript so the demo still works
 * for visitors during local dev / before the key is added.
 */

// Node.js runtime: the Anthropic SDK depends on node:fs / node:path
// which aren't supported on Edge. Streaming ReadableStream responses
// still work fine on Node.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are the Growth Studio audit assistant. The user pastes a URL. You generate a brief, plausible audit transcript as if you had analysed the business's paid ads, website, and operational systems over 90 days.

Output STRICTLY in this format and NOTHING ELSE. No preamble, no markdown, no JSON, no closing message. Plain text only. Use newlines between sections.

[SYSTEM]
Initialising growth audit for {hostname}
▸ Crawling site structure
  {one-line technical observation, e.g. "47 pages indexed · response 312ms p50"}
▸ Connecting to Meta + Google ad accounts
  {one-line data note, e.g. "90d of spend, impressions, conversions pulled"}
▸ Running vertical-specific playbook ({inferred vertical})

[FINDINGS]
Findings (4)
⚠ £{xxxx} / mo  {what is wasted, where}
⚠ {scope}  {issue}  — {impact}
⚠ £{xxx} / mo  {dead asset description}
⚠ {percentage} %  {branded leak or audience gap}

[WINS]
Quick wins (3)
✓ {action} → recover £{xxxx} / mo
✓ {action} → {qualitative outcome}
✓ {action} → recover £{xxx} / mo

[PROJECTION]
90-day projection
→ ROAS lift  {x.x}×
→ Recovered  £{x,xxx}
→ Time to implement  {x} working days

Be specific to the business vertical implied by the URL. Use realistic UK £ figures (typical SME ad spend £4k–£30k/mo). Don't mention you are an AI, language model, Claude, or generated content. Don't apologise. Don't add disclaimers.`;

const FALLBACK_TRANSCRIPT = (host: string) =>
  [
    `Initialising growth audit for ${host}`,
    "▸ Crawling site structure",
    "  47 pages indexed · response 312ms p50",
    "▸ Connecting to Meta + Google ad accounts",
    "  90d of spend, impressions, conversions pulled",
    "▸ Running vertical-specific playbook (e-commerce)",
    "",
    "Findings (4)",
    "⚠ £1,840 / mo  Audience overlap across 4 campaigns",
    "⚠ 11 campaigns  Broken UTM tags — attribution unreliable",
    "⚠ £940 / mo  Dead creative — 3 ad sets, 14d no impressions",
    "⚠ 23 %  Branded search bleed — bidding against own brand",
    "",
    "Quick wins (3)",
    "✓ Consolidate audiences → recover £1,840 / mo",
    "✓ Fix UTM template → full attribution restored",
    "✓ Pause dead creative → recover £940 / mo",
    "",
    "90-day projection",
    "→ ROAS lift  1.6×",
    "→ Recovered  £8,340",
    "→ Time to implement  5 working days",
  ].join("\n");

export async function POST(req: NextRequest) {
  let url: string;
  try {
    const body = await req.json();
    url = String(body?.url ?? "").trim();
  } catch {
    return new Response("Invalid request body.", { status: 400 });
  }
  if (!url) return new Response("URL required.", { status: 400 });

  const host = (() => {
    try {
      return new URL(url.startsWith("http") ? url : `https://${url}`).host.replace(
        /^www\./,
        ""
      );
    } catch {
      return url.replace(/^https?:\/\//, "").replace(/\/.*/, "");
    }
  })();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const encoder = new TextEncoder();

  // Fallback path — paced simulated stream so the demo always works.
  if (!apiKey) {
    const transcript = FALLBACK_TRANSCRIPT(host);
    const stream = new ReadableStream({
      async start(controller) {
        for (const char of transcript) {
          controller.enqueue(encoder.encode(char));
          // Faster on whitespace
          const delay = char === "\n" ? 60 : char === " " ? 6 : 14;
          await new Promise((r) => setTimeout(r, delay));
        }
        controller.close();
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Audit-Source": "fallback",
      },
    });
  }

  // Real Anthropic streaming path.
  const client = new Anthropic({ apiKey });
  const messageStream = await client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 700,
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      {
        role: "user",
        content: `Audit this URL: ${url}\nHostname: ${host}`,
      },
    ],
  });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of messageStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        console.error("[audit] stream error", err);
        // Emit fallback if stream fails mid-flight
        controller.enqueue(encoder.encode(`\n[stream error — falling back]\n`));
        controller.enqueue(encoder.encode(FALLBACK_TRANSCRIPT(host)));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Audit-Source": "anthropic",
    },
  });
}
