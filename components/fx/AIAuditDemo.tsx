"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "validating" | "streaming" | "done" | "error";

const PROMPT_PLACEHOLDERS = [
  "https://your-store.co.uk",
  "https://yourbrand.com",
  "https://yourservice.io",
];

interface RenderedLine {
  text: string;
  kind: "system" | "info" | "warn" | "success" | "result" | "header" | "spacer";
}

function classifyLine(text: string): RenderedLine["kind"] {
  if (text.startsWith("⚠")) return "warn";
  if (text.startsWith("✓")) return "success";
  if (text.startsWith("→")) return "result";
  if (text.startsWith("▸") || text.startsWith("  ")) return "info";
  if (/^[A-Z]/.test(text) && (text.endsWith(")") || text.includes("projection")))
    return "header";
  if (text.length === 0) return "spacer";
  return "system";
}

export function AIAuditDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [url, setUrl] = useState("");
  const [buffer, setBuffer] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (phase !== "idle") return;
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(
      () => setPlaceholderIdx((i) => (i + 1) % PROMPT_PLACEHOLDERS.length),
      3000
    );
    return () => clearInterval(id);
  }, [phase]);

  // Auto-scroll the output as new content arrives
  useEffect(() => {
    if (containerRef.current && phase === "streaming") {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [buffer, phase]);

  async function start() {
    if (!url.trim()) return;
    setPhase("validating");
    setBuffer("");

    // Brief validating beat for UX rhythm
    await new Promise((r) => setTimeout(r, 350));

    setPhase("streaming");

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setBuffer((b) => b + chunk);
      }

      setPhase("done");
    } catch (err) {
      console.error("[audit] failed", err);
      setPhase("error");
    }
  }

  function reset() {
    abortRef.current?.abort();
    setPhase("idle");
    setBuffer("");
    setUrl("");
  }

  const renderedLines: RenderedLine[] = buffer.split("\n").map((text) => ({
    text,
    kind: classifyLine(text),
  }));

  return (
    <div className="w-full max-w-xl">
      <div className="relative">
        {/* Soft glow halo (warm white) */}
        <div
          aria-hidden
          className="absolute -inset-10 rounded-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(50% 45% at 50% 50%, oklch(0.460 0.220 252 / 0.10), transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        <div
          className="relative rounded-xl border border-border-strong overflow-hidden bg-surface"
          style={{
            boxShadow:
              "0 24px 60px -18px oklch(0.20 0.020 60 / 0.18), 0 0 0 1px oklch(0.20 0.020 60 / 0.04) inset",
          }}
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-canvas-2/40">
            <div className="flex items-center gap-2.5">
              <span className="relative flex w-2 h-2">
                {(phase === "streaming" || phase === "validating") && (
                  <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />
                )}
                <span
                  className={`relative w-2 h-2 rounded-full ${
                    phase === "idle"
                      ? "bg-ink-mute"
                      : phase === "error"
                      ? "bg-ink-dim"
                      : "bg-accent"
                  }`}
                />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                {phase === "idle" && "Audit · ready"}
                {phase === "validating" && "Audit · validating url"}
                {phase === "streaming" && "Audit · running"}
                {phase === "done" && "Audit · complete"}
                {phase === "error" && "Audit · error"}
              </span>
            </div>
            <span className="font-mono text-[10px] text-ink-dim">
              growth.studio/audit
            </span>
          </div>

          {phase === "idle" && (
            <div className="p-5">
              <label
                htmlFor="audit-url"
                className="block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute mb-3"
              >
                Try it · paste your URL
              </label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-accent select-none">
                    →
                  </span>
                  <input
                    id="audit-url"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && start()}
                    placeholder={PROMPT_PLACEHOLDERS[placeholderIdx]}
                    autoComplete="off"
                    spellCheck={false}
                    className="w-full h-11 pl-9 pr-3 bg-canvas-2/70 border border-border rounded-md text-ink placeholder:text-ink-dim font-mono text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft transition-colors"
                  />
                </div>
                <button
                  type="button"
                  onClick={start}
                  disabled={!url.trim()}
                  className="h-11 px-5 rounded-md bg-accent text-canvas font-medium text-sm hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Run audit
                </button>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-dim mt-3">
                Free · ~30 seconds · no signup
              </p>
            </div>
          )}

          {phase !== "idle" && (
            <div
              ref={containerRef}
              className="px-5 py-4 max-h-[380px] overflow-y-auto font-mono text-xs leading-relaxed"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor:
                  "oklch(0.76 0.006 75) oklch(0.952 0.006 75)",
              }}
            >
              {renderedLines.map((l, i) => {
                if (l.kind === "spacer")
                  return <div key={i} className="h-3" aria-hidden />;
                const color =
                  l.kind === "system"
                    ? "text-ink"
                    : l.kind === "info"
                    ? "text-ink-mute"
                    : l.kind === "warn"
                    ? "text-ink-soft"
                    : l.kind === "success"
                    ? "text-accent"
                    : l.kind === "header"
                    ? "text-ink uppercase tracking-[0.16em] mt-1 mb-1 text-[10px]"
                    : "text-ink";
                return (
                  <div key={i} className={`whitespace-pre-wrap ${color}`}>
                    {l.text}
                    {i === renderedLines.length - 1 && phase === "streaming" && (
                      <span className="terminal-caret text-accent">▌</span>
                    )}
                  </div>
                );
              })}
              {phase === "error" && (
                <div className="mt-3 text-ink-mute">
                  Connection lost. Try again in a moment.
                </div>
              )}
              {(phase === "done" || phase === "error") && (
                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-3">
                  <a
                    href="/tools/website-audit"
                    className="inline-flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-[0.16em] hover:text-ink transition-colors"
                  >
                    <span>See full report</span>
                    <span aria-hidden>→</span>
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="text-ink-mute text-xs font-mono uppercase tracking-[0.16em] hover:text-ink transition-colors"
                  >
                    Run another
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
