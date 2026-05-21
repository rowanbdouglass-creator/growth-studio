"use client";

import type { LiveSignal, ScreenshotEntry } from "./types";

export function MetricsGrid({
  signals,
  screenshots,
}: {
  signals: LiveSignal[];
  screenshots: ScreenshotEntry[];
}) {
  const byLabel = new Map<string, string>();
  for (const s of signals) byLabel.set(s.label, s.value);

  const http = byLabel.get("HTTP");
  const dom = byLabel.get("DOM");
  const seo = byLabel.get("SEO");
  const security = byLabel.get("Security headers");
  const stack = byLabel.get("Stack");
  const tracking = byLabel.get("Tracking");
  const indexCard = byLabel.get("Index");
  const psiMobile = byLabel.get("PSI mobile");
  const psiDesktop = byLabel.get("PSI desktop");
  const crux = byLabel.get("Real-user CWV");
  const adLib = byLabel.get("Meta Ad Library");

  return (
    <div className="space-y-4">
      <Row title="Network" cards={[mk("HTTP", http), mk("DOM", dom)]} />
      <Row
        title="Stack & integrations"
        cards={[mk("Detected stack", stack), mk("Tracking", tracking)]}
      />
      <Row
        title="SEO & indexation"
        cards={[mk("SEO basics", seo), mk("Index", indexCard)]}
      />
      <Row
        title="Performance"
        cards={[
          mk("Lighthouse mobile", psiMobile, "performance"),
          mk("Lighthouse desktop", psiDesktop, "performance"),
        ]}
      />
      <Row title="Real users" cards={[mk("Chrome UX p75", crux)]} />
      <Row title="Paid" cards={[mk("Meta Ad Library", adLib)]} />
      <Row
        title="Security"
        cards={[mk("Security headers", security, "security")]}
      />
      <ScreenshotRow screenshots={screenshots} />
    </div>
  );
}

function Row({
  title,
  cards,
}: {
  title: string;
  cards: Array<{ label: string; value: string | undefined; kind?: string }>;
}) {
  if (cards.every((c) => !c.value)) return null;
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-2">
        {title}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {cards.map((c, i) => (
          <Card key={i} {...c} />
        ))}
      </div>
    </div>
  );
}

function Card({
  label,
  value,
  kind,
}: {
  label: string;
  value: string | undefined;
  kind?: string;
}) {
  if (!value) {
    return (
      <div className="rounded-md border border-dashed border-border/60 bg-canvas-2/20 p-3 min-h-[58px] flex items-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary">
          {label} · waiting
        </p>
      </div>
    );
  }
  return (
    <div className="rounded-md border border-border bg-canvas-2/50 p-3 transition-all">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-1">
        {label}
      </p>
      <p
        className={`text-[13px] leading-snug ${kind === "performance" ? "font-mono tabular-nums" : ""} text-text-primary`}
      >
        {value}
      </p>
    </div>
  );
}

function mk(label: string, value: string | undefined, kind?: string) {
  return { label, value, kind };
}

function ScreenshotRow({ screenshots }: { screenshots: ScreenshotEntry[] }) {
  if (!screenshots.length) return null;
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-2">
        Screenshots
      </p>
      <div className="flex flex-wrap gap-2">
        {screenshots.map((s, i) => (
          <div
            key={i}
            className={`rounded-md border px-3 py-2 text-[11px] font-mono flex items-center gap-2 ${
              s.status === "captured"
                ? "border-accent/30 bg-canvas-2/50 text-text-primary"
                : s.status === "failed"
                  ? "border-border bg-canvas-2/30 text-text-tertiary line-through"
                  : "border-border bg-canvas-2/30 text-text-tertiary animate-pulse"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                s.status === "captured"
                  ? "bg-accent"
                  : s.status === "failed"
                    ? "bg-text-tertiary"
                    : "bg-accent/40"
              }`}
            />
            {s.category}
          </div>
        ))}
      </div>
    </div>
  );
}
