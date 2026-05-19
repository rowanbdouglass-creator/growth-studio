"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "validating" | "streaming" | "done" | "error";

interface Line {
  text: string;
  kind: "system" | "info" | "warn" | "success" | "result" | "header" | "spacer";
}

const PROMPT_PLACEHOLDERS = [
  "https://your-store.co.uk",
  "https://yourbrand.com",
  "https://yourservice.io",
];

/**
 * Generate a plausible audit transcript based on the URL. Used as a
 * client-side simulation so the demo works without an API key. When
 * an Anthropic key is configured server-side later, swap this for a
 * streaming server action.
 */
function generateAuditTranscript(url: string): Line[] {
  const cleanHost = (() => {
    try {
      return new URL(url.startsWith("http") ? url : `https://${url}`).host.replace(/^www\./, "");
    } catch {
      return url.replace(/^https?:\/\//, "").replace(/\/.*/, "");
    }
  })();

  return [
    { kind: "system", text: `Initialising growth audit for ${cleanHost}` },
    { kind: "info", text: "▸ Crawling site structure" },
    { kind: "info", text: "  47 pages indexed · response 312ms p50" },
    { kind: "info", text: "▸ Connecting to Meta + Google ad accounts" },
    { kind: "info", text: "  90d of spend, impressions, conversions pulled" },
    { kind: "info", text: "▸ Running vertical-specific playbook (e-commerce)" },
    { kind: "spacer", text: "" },
    { kind: "header", text: "Findings (4)" },
    { kind: "warn", text: "⚠ £1,840 / mo  Audience overlap across 4 campaigns" },
    { kind: "warn", text: "⚠ 11 campaigns  Broken UTM tags — attribution unreliable" },
    { kind: "warn", text: "⚠ £940 / mo  Dead creative — 3 ad sets, 14d no impressions" },
    { kind: "warn", text: "⚠ 23 %  Branded search bleed — bidding against own brand" },
    { kind: "spacer", text: "" },
    { kind: "header", text: "Quick wins (3)" },
    { kind: "success", text: "✓ Consolidate audiences → recover £1,840 / mo" },
    { kind: "success", text: "✓ Fix UTM template → full attribution restored" },
    { kind: "success", text: "✓ Pause dead creative → recover £940 / mo" },
    { kind: "spacer", text: "" },
    { kind: "header", text: "90-day projection" },
    { kind: "result", text: "→ ROAS lift  1.6×" },
    { kind: "result", text: "→ Recovered  £8,340" },
    { kind: "result", text: "→ Time to implement  5 working days" },
  ];
}

export function AIAuditDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [url, setUrl] = useState("");
  const [shown, setShown] = useState<{ text: string; kind: Line["kind"] }[]>([]);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotate placeholders so the input feels alive
  useEffect(() => {
    if (phase !== "idle") return;
    const id = setInterval(
      () => setPlaceholderIdx((i) => (i + 1) % PROMPT_PLACEHOLDERS.length),
      3000
    );
    return () => clearInterval(id);
  }, [phase]);

  function start() {
    if (!url.trim()) return;
    setPhase("validating");
    setShown([]);
    setTimeout(() => {
      setPhase("streaming");
      streamAudit(url);
    }, 500);
  }

  async function streamAudit(targetUrl: string) {
    const lines = generateAuditTranscript(targetUrl);
    for (const line of lines) {
      // Stream each character for system/info lines, full chunks for findings
      if (line.kind === "system" || line.kind === "info") {
        let current = "";
        for (let i = 0; i < line.text.length; i++) {
          current = line.text.slice(0, i + 1);
          await wait(8 + Math.random() * 12);
          setShown((s) => [
            ...s.slice(0, -1).filter((_, idx) => idx < s.length - 1),
            { text: current, kind: line.kind },
          ]);
          setShown((s) => {
            const isNew = s.length === 0 || s[s.length - 1].kind !== line.kind || s[s.length - 1].text !== current.slice(0, -1);
            if (isNew && i === 0) return [...s, { text: current, kind: line.kind }];
            const copy = [...s];
            copy[copy.length - 1] = { text: current, kind: line.kind };
            return copy;
          });
        }
        await wait(line.kind === "system" ? 350 : 120);
      } else if (line.kind === "spacer") {
        setShown((s) => [...s, { text: "", kind: "spacer" }]);
        await wait(120);
      } else {
        setShown((s) => [...s, { text: line.text, kind: line.kind }]);
        await wait(line.kind === "header" ? 220 : 140);
      }
      // Auto-scroll the panel
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      });
    }
    setPhase("done");
  }

  function reset() {
    setPhase("idle");
    setShown([]);
    setUrl("");
  }

  return (
    <div className="w-full max-w-xl">
      {/* Glow halo */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute -inset-10 rounded-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(50% 45% at 50% 50%, oklch(0.86 0.012 245 / 0.18), transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        <div
          className="relative rounded-xl border border-border-strong overflow-hidden backdrop-blur-md"
          style={{
            backgroundColor: "oklch(0.13 0.006 260 / 0.92)",
            boxShadow:
              "0 30px 80px -20px oklch(0 0 0 / 0.6), 0 0 0 1px oklch(1 0 0 / 0.04) inset",
          }}
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-canvas-2/60">
            <div className="flex items-center gap-2.5">
              <span className="relative flex w-2 h-2">
                {phase !== "idle" && (
                  <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-50" />
                )}
                <span
                  className={`relative w-2 h-2 rounded-full ${
                    phase === "idle"
                      ? "bg-ink-mute"
                      : phase === "done"
                      ? "bg-accent"
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

          {/* Input zone */}
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
                    className="w-full h-11 pl-9 pr-3 bg-canvas border border-border rounded-md text-ink placeholder:text-ink-dim font-mono text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft transition-colors"
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

          {/* Stream zone */}
          {phase !== "idle" && (
            <div
              ref={containerRef}
              className="px-5 py-4 max-h-[380px] overflow-y-auto font-mono text-xs leading-relaxed"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor:
                  "oklch(0.32 0.008 260) oklch(0.13 0.006 260)",
              }}
            >
              {shown.map((l, i) => {
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
                    {i === shown.length - 1 && phase === "streaming" && (
                      <span className="terminal-caret text-accent">▌</span>
                    )}
                  </div>
                );
              })}
              {phase === "done" && (
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

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
