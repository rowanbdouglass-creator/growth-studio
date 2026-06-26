/**
 * Screenshot capture via microlink.io. Free, no auth required for basic
 * use (rate-limited to 50/day on free tier; sufficient for early v1).
 *
 * Returns a remote screenshot URL we pass to Claude vision.
 * If capture fails, the audit still proceeds without visual analysis.
 */

export interface ScreenshotResult {
  available: boolean;
  url: string | null;
  width: number | null;
  height: number | null;
  reason?: string;
}

const MICROLINK = "https://api.microlink.io";

export async function captureScreenshot(
  pageUrl: string,
  viewport: "desktop" | "mobile" = "desktop"
): Promise<ScreenshotResult> {
  const params = new URLSearchParams({
    url: pageUrl,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    "viewport.isMobile": viewport === "mobile" ? "true" : "false",
    "viewport.width": viewport === "mobile" ? "390" : "1440",
    "viewport.height": viewport === "mobile" ? "844" : "900",
    "viewport.deviceScaleFactor": "1",
    waitUntil: "networkidle0",
    overlay: "false",
  });

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 25_000);

  try {
    const res = await fetch(`${MICROLINK}/?${params.toString()}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!res.ok) {
      return {
        available: false,
        url: null,
        width: null,
        height: null,
        reason: `microlink HTTP ${res.status}`,
      };
    }
    const body = await res.json();
    const data = body?.data;
    const url = typeof data === "string" ? data : data?.url;
    if (!url) {
      return {
        available: false,
        url: null,
        width: null,
        height: null,
        reason: body?.message ?? "no screenshot URL in response",
      };
    }
    return {
      available: true,
      url,
      width: viewport === "mobile" ? 390 : 1440,
      height: viewport === "mobile" ? 844 : 900,
    };
  } catch (err) {
    return {
      available: false,
      url: null,
      width: null,
      height: null,
      reason: err instanceof Error ? err.message : "screenshot failed",
    };
  } finally {
    clearTimeout(t);
  }
}

/**
 * Download the screenshot bytes so we can send to Claude vision as a
 * base64 image. We need this because Claude's image API requires
 * either a base64 or a URL it can fetch, and microlink CDN URLs
 * sometimes 403 when called from Anthropic's servers.
 */
export async function downloadScreenshotBase64(
  url: string
): Promise<{ ok: boolean; mediaType: string; base64: string; reason?: string }> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      return {
        ok: false,
        mediaType: "image/png",
        base64: "",
        reason: `download HTTP ${res.status}`,
      };
    }
    const mediaType = res.headers.get("content-type") || "image/png";
    const buf = Buffer.from(await res.arrayBuffer());
    const MAX = 5 * 1024 * 1024;
    if (buf.byteLength > MAX) {
      return {
        ok: false,
        mediaType,
        base64: "",
        reason: `screenshot ${(buf.byteLength / 1024 / 1024).toFixed(2)}MB too large`,
      };
    }
    return { ok: true, mediaType, base64: buf.toString("base64") };
  } catch (err) {
    return {
      ok: false,
      mediaType: "image/png",
      base64: "",
      reason: err instanceof Error ? err.message : "download failed",
    };
  } finally {
    clearTimeout(t);
  }
}
