import type { NextRequest } from "next/server";
import { refine, type AnsweredQuestion } from "@/lib/audit/website/refine";
import { hostnameFrom, normaliseUrl } from "@/lib/audit/website/fetch";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

interface Body {
  url?: string;
  originalReport?: string;
  answers?: AnsweredQuestion[];
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return new Response("Invalid request body.", { status: 400 });
  }
  const url = normaliseUrl(body.url ?? "");
  const originalReport = (body.originalReport ?? "").slice(0, 30_000);
  const answers = Array.isArray(body.answers) ? body.answers : [];

  if (!url || !originalReport || !answers.length) {
    return new Response("url, originalReport, answers required.", {
      status: 400,
    });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      function send(text: string) {
        controller.enqueue(encoder.encode(text));
      }
      try {
        await refine(
          {
            target: { url, host: hostnameFrom(url) },
            originalReport,
            answers,
          },
          { onChunk: send }
        );
        controller.close();
      } catch (err) {
        send(`\n[refinement error] ${err instanceof Error ? err.message : ""}`);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
