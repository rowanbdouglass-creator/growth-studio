import Anthropic from "@anthropic-ai/sdk";

/**
 * Refinement pass — takes the original audit transcript plus the
 * prospect's answers to the bespoke questions, and produces a tailored
 * "next steps" report. This is the second Claude call; the first
 * (synthesise.ts) generates the audit, this one personalises it.
 *
 * Output format is structured for the TailoredSummary card UI:
 *
 *   [PRIORITIES]
 *   {3 numbered items — top moves ranked by impact and effort}
 *
 *   [STACK]
 *   {1–2 lines on what systems they'd benefit from + integration paths}
 *
 *   [PITCH]
 *   {2–3 lines suggesting how Growth Studio could help, soft sell}
 */

const SYSTEM_PROMPT = `You are the Growth Studio audit refiner. The prospect has just completed a website audit and answered bespoke questions about their operations and gaps. Use ALL of that — the audit findings AND their answers — to produce a tailored "next steps" report.

Hard rules:
1. Use their actual answers verbatim where useful (e.g. "Since you mentioned you use Google Sheets for inventory, ...").
2. Anchor every claim to either the original audit data or their answers. No inventing.
3. Speak directly to the business owner, UK English, second person, plain language.
4. Be specific and concrete. Avoid platitudes like "improve conversion rates".

Output format — use these EXACT section markers verbatim, no preamble:

[PRIORITIES]
1. {Top priority — what to do, in plain language. 1–2 sentences. Reference a specific gap and one of their answers if relevant.}
2. {Second priority. Same format.}
3. {Third priority. Same format.}

[STACK]
{1–2 sentences on systems that would close the gaps you identified, given the ops setup they described. Mention specific tools where appropriate (e.g. "swap the spreadsheet for Airtable for inventory, then hook it to your Shopify via Zapier"). Be pragmatic.}

[PITCH]
{2–3 sentences. Suggest specifically how Growth Studio's Custom Systems offering could close the biggest gap, given what they told you. Soft sell — invitation to a discovery call, not a hard pitch.}

End after [PITCH]. No sign-off. No closing summary.`;

export interface RefinementCallbacks {
  onChunk: (text: string) => void;
}

export interface AnsweredQuestion {
  prompt: string;
  category: string;
  selectedOptions: string[];
  elaboration: string;
}

export async function refine(
  args: {
    target: { url: string; host: string };
    originalReport: string;
    answers: AnsweredQuestion[];
  },
  cb: RefinementCallbacks
): Promise<void> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    cb.onChunk(fallback(args));
    return;
  }

  const user = buildUserText(args);
  const client = new Anthropic({ apiKey });

  try {
    const stream = await client.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 1200,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: user }],
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
    console.error("[audit.refine] failed", err);
    cb.onChunk(`\n[refinement error]\n\n${fallback(args)}`);
  }
}

function buildUserText(args: {
  target: { url: string; host: string };
  originalReport: string;
  answers: AnsweredQuestion[];
}): string {
  const answers = args.answers
    .map((a, i) => {
      const picks = a.selectedOptions.length
        ? `Selected: ${a.selectedOptions.join(" | ")}`
        : "Selected: (none)";
      const elab = a.elaboration?.trim()
        ? `Elaborated: ${a.elaboration.trim()}`
        : "";
      return [`Q${i + 1} (${a.category}): ${a.prompt}`, picks, elab]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  return `Audit target: ${args.target.url}\nHost: ${args.target.host}\n\nORIGINAL AUDIT:\n${args.originalReport}\n\nPROSPECT ANSWERS:\n${answers}\n\nProduce the tailored next-steps report using the format described in the system prompt.`;
}

function fallback(args: {
  target: { url: string; host: string };
}): string {
  return [
    `[PRIORITIES]`,
    `1. Refinement requires ANTHROPIC_API_KEY in production env.`,
    `2. The audit findings are still valid — see the report above.`,
    `3. Book a discovery call to walk through them in detail.`,
    ``,
    `[STACK]`,
    `Set ANTHROPIC_API_KEY in your Vercel env to enable tailored stack recommendations.`,
    ``,
    `[PITCH]`,
    `Growth Studio builds custom operational systems for businesses like ${args.target.host}. Book a discovery call to get tailored advice.`,
  ].join("\n");
}
