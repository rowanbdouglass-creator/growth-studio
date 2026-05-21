"use client";

import type { PhaseState } from "./types";

const STEP_LABELS: Record<string, string> = {
  fetch: "Fetch page",
  parse: "Parse HTML",
  security: "Security headers",
  fingerprint: "Stack fingerprint",
  analytics: "Detect tracking",
  index: "Robots + sitemap",
  pagespeed: "Lighthouse + CrUX",
  adlibrary: "Meta Ad Library",
  discover: "Discover key pages",
  screenshots: "Capture screenshots",
  synthesise: "Synthesise audit",
};

export const STEP_ORDER = Object.keys(STEP_LABELS);

export function PhaseTimeline({ phases }: { phases: PhaseState[] }) {
  return (
    <ol className="space-y-2">
      {phases.map((p) => (
        <li
          key={p.id}
          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
            p.state === "running"
              ? "bg-canvas-2/70 border border-accent/30"
              : "border border-transparent"
          }`}
        >
          <StateIcon state={p.state} />
          <span
            className={`flex-1 text-sm ${
              p.state === "complete"
                ? "text-text-primary"
                : p.state === "running"
                  ? "text-text-primary"
                  : p.state === "error"
                    ? "text-text-secondary"
                    : "text-text-tertiary"
            }`}
          >
            {STEP_LABELS[p.id] ?? p.id}
          </span>
          {p.note && (
            <span className="font-mono text-[10px] text-text-tertiary truncate max-w-[180px]">
              {p.note}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function StateIcon({ state }: { state: PhaseState["state"] }) {
  if (state === "complete") {
    return (
      <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
        ✓
      </span>
    );
  }
  if (state === "running") {
    return (
      <span className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    );
  }
  if (state === "error") {
    return (
      <span className="w-5 h-5 rounded-full bg-canvas-2 flex items-center justify-center text-text-tertiary text-xs">
        ✗
      </span>
    );
  }
  return (
    <span className="w-5 h-5 rounded-full border border-border" />
  );
}
