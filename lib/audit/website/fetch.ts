import type { FetchResult } from "./types";

const USER_AGENT =
  "GrowthStudioAudit/1.0 (+https://growth-studio-two.vercel.app/tools/website-audit)";

const MAX_BYTES = 4_000_000;
const FETCH_TIMEOUT_MS = 18_000;

export function normaliseUrl(input: string): string {
  const trimmed = (input ?? "").trim();
  if (!trimmed) return "";
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

export function hostnameFrom(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/.*/, "");
  }
}

export async function fetchPage(url: string): Promise<FetchResult> {
  const start = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": USER_AGENT,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-GB,en;q=0.9",
      },
      redirect: "follow",
      signal: controller.signal,
    });

    const ttfbMs = Date.now() - start;
    const headers: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });

    const reader = res.body?.getReader();
    let bytes = 0;
    let html = "";
    const decoder = new TextDecoder("utf-8", { fatal: false });

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > MAX_BYTES) {
          try {
            await reader.cancel();
          } catch {
            // ignore
          }
          break;
        }
        html += decoder.decode(value, { stream: true });
      }
      html += decoder.decode();
    } else {
      html = await res.text();
      bytes = html.length;
    }

    return {
      status: res.status,
      finalUrl: res.url,
      redirects: res.redirected ? 1 : 0,
      bytes,
      ttfbMs,
      totalMs: Date.now() - start,
      headers,
      html,
      contentType: headers["content-type"] ?? null,
    };
  } catch (err) {
    return {
      status: 0,
      finalUrl: url,
      redirects: 0,
      bytes: 0,
      ttfbMs: 0,
      totalMs: Date.now() - start,
      headers: {},
      html: "",
      contentType: null,
      error: err instanceof Error ? err.message : "fetch failed",
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchText(
  url: string,
  timeoutMs = 8000
): Promise<{ ok: boolean; status: number; text: string; error?: string }> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      signal: controller.signal,
    });
    const text = await res.text();
    return { ok: res.ok, status: res.status, text };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      text: "",
      error: err instanceof Error ? err.message : "fetch failed",
    };
  } finally {
    clearTimeout(t);
  }
}
