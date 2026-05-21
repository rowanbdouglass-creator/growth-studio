"use client";

import type { ParsedReport } from "@/lib/audit/website/parseReport";

export function VisualReport({
  report,
  streaming,
}: {
  report: ParsedReport;
  streaming: boolean;
}) {
  return (
    <div className="space-y-6">
      {report.industry && (
        <Section
          eyebrow="Industry context"
          title={report.industry.placement ?? "Inferring placement…"}
        >
          {report.industry.signals && (
            <p className="text-text-secondary leading-relaxed text-[14px] mb-4">
              {report.industry.signals}
            </p>
          )}
          {report.industry.typical.length > 0 && (
            <>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-2">
                Businesses in this space typically offer
              </p>
              <ul className="grid sm:grid-cols-2 gap-2">
                {report.industry.typical.map((t, i) => (
                  <li
                    key={i}
                    className="text-[13px] text-text-secondary leading-snug flex items-start gap-2"
                  >
                    <span className="text-accent shrink-0 mt-1.5">▸</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Section>
      )}

      {report.observed.length > 0 && (
        <Section eyebrow="What we measured" title="Observed signals">
          <dl className="grid sm:grid-cols-2 gap-3">
            {report.observed.map((row, i) => (
              <div
                key={i}
                className="rounded-md border border-border bg-canvas/40 p-3"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-1">
                  {row.label || "Observation"}
                </dt>
                <dd className="text-[13px] text-text-primary leading-snug font-mono tabular-nums">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {report.visual.length > 0 && (
        <Section
          eyebrow="Visual diagnosis"
          title="What the screenshots show"
        >
          <ul className="space-y-3">
            {report.visual.map((row, i) => (
              <li
                key={i}
                className="border-l-2 border-accent/40 pl-3 py-1"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-1">
                  {row.label}
                </p>
                <p className="text-[14px] text-text-primary leading-snug">
                  {row.value}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {report.gaps.length > 0 && (
        <Section
          eyebrow="Capability gaps"
          title="What's missing vs typical players"
        >
          <ul className="space-y-3">
            {report.gaps.map((gap, i) => (
              <li
                key={i}
                className="rounded-md border border-border bg-canvas/40 p-4"
              >
                <p className="font-sans font-medium text-[15px] text-text-primary mb-1">
                  {gap.title}
                </p>
                {gap.impact && (
                  <p className="text-[13px] text-text-secondary leading-relaxed">
                    {gap.impact}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {streaming && (
        <div className="flex items-center gap-2 text-text-tertiary text-[11px] font-mono uppercase tracking-[0.18em]">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Generating…
        </div>
      )}
    </div>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-canvas-2/40 p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-2">
        {eyebrow}
      </p>
      <h3 className="font-serif text-2xl text-text-primary mb-5 tracking-tight">
        {title}
      </h3>
      {children}
    </section>
  );
}
