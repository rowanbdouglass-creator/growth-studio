"use client";

import { useEffect, useRef, useState } from "react";
import { parseReport, type ParsedReport } from "@/lib/audit/website/parseReport";
import { recordAuditAnswers } from "@/lib/actions/audits";
import { PhaseTimeline, STEP_ORDER } from "./PhaseTimeline";
import { MetricsGrid } from "./MetricsGrid";
import { VisualReport } from "./VisualReport";
import { QAExperience, type QAAnswer } from "./QAExperience";
import { TailoredSummary } from "./TailoredSummary";
import type { LiveSignal, PhaseId, PhaseState, ScreenshotEntry } from "./types";

type Stage = "running" | "report" | "qa" | "tailored" | "error";

interface AuditEvent {
  kind: "phase" | "signal" | "report" | "done" | "error";
  label?: string;
  value?: string;
  text?: string;
  message?: string;
}

interface Props {
  url: string;
  contactId: string | number;
  onClose: () => void;
}

export function AuditExperience({ url, contactId, onClose }: Props) {
  const [stage, setStage] = useState<Stage>("running");
  const [error, setError] = useState<string | null>(null);
  const [phases, setPhases] = useState<PhaseState[]>(() =>
    STEP_ORDER.map((id) => ({ id: id as PhaseId, state: "idle" }))
  );
  const [signals, setSignals] = useState<LiveSignal[]>([]);
  const [screenshots, setScreenshots] = useState<ScreenshotEntry[]>([]);
  const [report, setReport] = useState<string>("");
  const [refinement, setRefinement] = useState<string>("");
  const [refining, setRefining] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const refineAbortRef = useRef<AbortController | null>(null);

  // Kick off the audit on mount
  useEffect(() => {
    void runAudit();
    return () => {
      abortRef.current?.abort();
      refineAbortRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Disable body scroll while open
  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
    };
  }, []);

  async function runAudit() {
    abortRef.current = new AbortController();
    try {
      const res = await fetch("/api/audit/website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        signal: abortRef.current.signal,
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let pending = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        pending += decoder.decode(value, { stream: true });
        const lines = pending.split("\n");
        pending = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          let evt: AuditEvent;
          try {
            evt = JSON.parse(line);
          } catch {
            continue;
          }
          handleEvent(evt);
        }
      }
      // Mark synthesise complete on stream close
      setPhases((prev) =>
        prev.map((p) => (p.state === "running" ? { ...p, state: "complete" } : p))
      );
      setStage((s) => (s === "running" ? "report" : s));
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError("Audit failed — try again, or email hello@youlookbooked.com.");
      setStage("error");
    }
  }

  function handleEvent(evt: AuditEvent) {
    if (evt.kind === "phase" && evt.label) {
      setPhases((prev) => mapPhase(prev, evt.label!));
    } else if (evt.kind === "signal" && evt.label && evt.value !== undefined) {
      const label = evt.label;
      const value = evt.value;
      if (label.startsWith("Screenshot · ")) {
        const category = label.replace("Screenshot · ", "");
        setScreenshots((prev) => {
          const status: ScreenshotEntry["status"] =
            value.startsWith("captured") ? "captured" : "failed";
          const existing = prev.find((s) => s.category === category);
          if (existing) {
            return prev.map((s) =>
              s.category === category ? { ...s, status, note: value } : s
            );
          }
          return [...prev, { category, status, note: value }];
        });
      } else {
        setSignals((prev) => {
          const existing = prev.findIndex((s) => s.label === label);
          if (existing !== -1) {
            const next = [...prev];
            next[existing] = { label, value, receivedAt: Date.now() };
            return next;
          }
          return [...prev, { label, value, receivedAt: Date.now() }];
        });
      }
    } else if (evt.kind === "report" && evt.text) {
      setReport((prev) => prev + evt.text!);
    } else if (evt.kind === "error" && evt.message) {
      setError(evt.message);
      setStage("error");
    }
  }

  function mapPhase(phases: PhaseState[], label: string): PhaseState[] {
    const lower = label.toLowerCase();
    const matchOrder: Array<{ key: PhaseId; match: RegExp }> = [
      { key: "fetch", match: /^fetching|^starting audit/ },
      { key: "parse", match: /parsing html/ },
      { key: "security", match: /security headers/ },
      { key: "fingerprint", match: /fingerprinting stack/ },
      { key: "analytics", match: /detecting analytics/ },
      { key: "index", match: /robots\.txt|sitemap/ },
      { key: "pagespeed", match: /pagespeed|lighthouse/ },
      { key: "adlibrary", match: /ad library/ },
      { key: "discover", match: /discovering key pages/ },
      { key: "screenshots", match: /capturing.*screenshot/ },
      { key: "synthesise", match: /synthesi[sz]ing/ },
    ];
    const matched = matchOrder.find((m) => m.match.test(lower))?.key;
    if (!matched) return phases;
    return phases.map((p, i) => {
      const allKeys = phases.map((q) => q.id);
      const targetIdx = allKeys.indexOf(matched);
      if (i < targetIdx) return p.state === "idle" ? { ...p, state: "complete" } : p;
      if (i === targetIdx) return { ...p, state: "running", note: label };
      return p;
    });
  }

  async function handleQAComplete(answers: QAAnswer[]) {
    setStage("tailored");
    setRefining(true);
    setRefinement("");

    // Persist to CRM in the background — don't await UI on it.
    void recordAuditAnswers(contactId, { url, answers });

    refineAbortRef.current = new AbortController();
    try {
      const res = await fetch("/api/audit/website/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          originalReport: report,
          answers,
        }),
        signal: refineAbortRef.current.signal,
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setRefinement((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError("Couldn't generate the tailored report.");
    } finally {
      setRefining(false);
    }
  }

  const parsed: ParsedReport = parseReport(report);
  const progress =
    stage === "running"
      ? Math.round(
          (phases.filter((p) => p.state === "complete").length / phases.length) *
            100
        )
      : 100;

  return (
    <div className="fixed inset-0 z-50 bg-canvas overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-canvas/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                stage === "running"
                  ? "bg-accent animate-pulse"
                  : stage === "error"
                    ? "bg-text-tertiary"
                    : "bg-accent"
              }`}
            />
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary">
                {stageLabel(stage)}
              </p>
              <p className="font-sans text-sm text-text-primary truncate">
                {url}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            {stage === "running" && (
              <div className="hidden sm:flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary tabular-nums">
                  {progress}%
                </span>
                <div className="w-24 h-1 rounded-full bg-canvas-2 overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Close audit"
            >
              ✕ Close
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        {stage === "error" && error && (
          <div className="rounded-xl border border-border-strong bg-canvas-2/40 p-8">
            <p className="font-serif text-2xl text-text-primary mb-3">
              We hit a snag.
            </p>
            <p className="text-text-secondary mb-5">{error}</p>
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-md border border-border-strong text-sm text-text-primary hover:bg-canvas-2 transition-colors"
            >
              Close
            </button>
          </div>
        )}

        {stage === "running" && (
          <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-12">
            <aside className="lg:sticky lg:top-24 self-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-4">
                Pipeline
              </p>
              <PhaseTimeline phases={phases} />
            </aside>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-4">
                Signals collected · live
              </p>
              <MetricsGrid signals={signals} screenshots={screenshots} />

              {report && (
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-3">
                    Synthesis · in flight
                  </p>
                  <VisualReport report={parsed} streaming />
                </div>
              )}
            </div>
          </div>
        )}

        {stage === "report" && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-3">
                Your audit
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-text-primary tracking-tight mb-4">
                Here&rsquo;s what we found
              </h1>
              <p className="text-[15px] text-text-secondary leading-relaxed max-w-2xl">
                A real read across performance, stack, visuals, and the
                capability gap vs typical players in your industry. Next
                we&rsquo;ll ask you {parsed.questions.length} questions to make
                this audit specific to your operation.
              </p>
            </div>
            <VisualReport report={parsed} streaming={false} />
            <div className="mt-10 flex items-center justify-between flex-wrap gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-11 px-4 text-sm text-text-tertiary hover:text-text-primary transition-colors"
              >
                Close — I&rsquo;ll come back
              </button>
              <button
                type="button"
                onClick={() => setStage("qa")}
                disabled={parsed.questions.length === 0}
                className="h-11 px-6 rounded-md bg-accent text-canvas text-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-50"
              >
                Answer {parsed.questions.length} questions →
              </button>
            </div>
          </div>
        )}

        {stage === "qa" && (
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-3">
                Bespoke follow-up
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-text-primary tracking-tight mb-3">
                A few questions
              </h1>
              <p className="text-[15px] text-text-secondary leading-relaxed">
                Your answers feed into a tailored report. Pick options,
                elaborate, or skip — whichever&rsquo;s fastest.
              </p>
            </div>
            <QAExperience
              questions={parsed.questions}
              onComplete={handleQAComplete}
            />
          </div>
        )}

        {stage === "tailored" && (
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-3">
                Personalised
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-text-primary tracking-tight mb-3">
                Built around your answers
              </h1>
              <p className="text-[15px] text-text-secondary leading-relaxed">
                We&rsquo;ve combined the audit findings with what you told us
                to suggest specific next moves.
              </p>
            </div>
            <TailoredSummary text={refinement} streaming={refining} />
          </div>
        )}
      </div>
    </div>
  );
}

function stageLabel(s: Stage): string {
  switch (s) {
    case "running":
      return "Auditing · live";
    case "report":
      return "Audit complete";
    case "qa":
      return "Bespoke questions";
    case "tailored":
      return "Tailored next steps";
    case "error":
      return "Error";
  }
}
