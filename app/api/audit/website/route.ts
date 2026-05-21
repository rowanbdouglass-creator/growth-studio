import type { NextRequest } from "next/server";
import { collectAudit } from "@/lib/audit/website/collect";
import { normaliseUrl } from "@/lib/audit/website/fetch";
import { synthesise } from "@/lib/audit/website/synthesise";

/**
 * Streaming Website Audit endpoint.
 *
 *   POST /api/audit/website  { url: string }
 *
 * Returns a newline-delimited JSON stream. Each line is one event:
 *   { kind: "phase", label: string }
 *   { kind: "signal", label: string, value: string }
 *   { kind: "report", section: "stream", text: string }
 *   { kind: "done" }
 *   { kind: "error", message: string }
 *
 * Node runtime required (Anthropic SDK pulls in node:fs / node:path).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  let url: string;
  try {
    const body = await req.json();
    url = normaliseUrl(String(body?.url ?? ""));
  } catch {
    return new Response("Invalid request body.", { status: 400 });
  }
  if (!url) return new Response("URL required.", { status: 400 });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      function send(obj: unknown) {
        controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));
      }

      try {
        send({ kind: "phase", label: `Starting audit of ${url}` });

        const findings = await collectAudit(url, (e) => {
          send(e);
        });

        send({ kind: "phase", label: "Synthesising audit with Claude" });

        await synthesise(findings, {
          onChunk: (text) => {
            send({ kind: "report", section: "stream", text });
          },
        });

        send({
          kind: "phase",
          label: `Audit complete · ${findings.durationMs}ms total`,
        });
        send({ kind: "done" });
        controller.close();
      } catch (err) {
        send({
          kind: "error",
          message: err instanceof Error ? err.message : "unknown error",
        });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
