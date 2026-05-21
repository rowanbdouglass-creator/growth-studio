"use client";

import { useRef, useState, useTransition } from "react";
import { requestWebsiteAudit } from "@/lib/actions/audits";

type Phase = "form" | "submitting" | "running" | "done" | "error";

interface AuditEvent {
  kind: "phase" | "signal" | "report" | "done" | "error";
  label?: string;
  value?: string;
  text?: string;
  message?: string;
  section?: string;
}

interface Signal {
  label: string;
  value: string;
}

export function WebsiteAuditForm() {
  const [phase, setPhase] = useState<Phase>("form");
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [currentPhase, setCurrentPhase] = useState<string>("");
  const [signals, setSignals] = useState<Signal[]>([]);
  const [report, setReport] = useState<string>("");
  const abortRef = useRef<AbortController | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  function reset() {
    abortRef.current?.abort();
    setPhase("form");
    setError(null);
    setCurrentPhase("");
    setSignals([]);
    setReport("");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phase === "submitting" || phase === "running") return;
    setError(null);
    setCurrentPhase("");
    setSignals([]);
    setReport("");

    startTransition(async () => {
      setPhase("submitting");
      const captured = await requestWebsiteAudit({
        fullName,
        email,
        url,
        companyName,
      });
      if (captured.status === "error") {
        setError(captured.message ?? "Something went wrong.");
        setPhase("error");
        return;
      }

      setPhase("running");
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
        setPhase("done");
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError("Audit failed — try again, or email hello@youlookbooked.com.");
        setPhase("error");
      }
    });
  }

  function handleEvent(evt: AuditEvent) {
    if (evt.kind === "phase" && evt.label) {
      setCurrentPhase(evt.label);
    } else if (evt.kind === "signal" && evt.label && evt.value !== undefined) {
      setSignals((prev) => [...prev, { label: evt.label!, value: evt.value! }]);
    } else if (evt.kind === "report" && evt.text) {
      setReport((prev) => prev + evt.text!);
      requestAnimationFrame(() => {
        if (reportRef.current) {
          reportRef.current.scrollTop = reportRef.current.scrollHeight;
        }
      });
    } else if (evt.kind === "error" && evt.message) {
      setError(evt.message);
      setPhase("error");
    }
  }

  if (phase === "form" || phase === "submitting") {
    return (
      <form onSubmit={onSubmit} className="space-y-5">
        <Field
          label="Your name"
          value={fullName}
          onChange={setFullName}
          placeholder="Jane Doe"
          required
        />
        <Field
          label="Work email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="jane@company.co.uk"
          required
        />
        <Field
          label="Company website"
          value={url}
          onChange={setUrl}
          placeholder="your-store.co.uk"
          required
        />
        <Field
          label="Company name"
          value={companyName}
          onChange={setCompanyName}
          placeholder="Optional — inferred from domain"
        />

        {error && (
          <p className="text-sm text-accent" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={phase === "submitting"}
          className="w-full h-11 rounded-md bg-accent text-canvas text-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {phase === "submitting" ? "Starting…" : "Run my free audit"}
        </button>

        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary text-center pt-1">
          90 seconds · No card · Real data, no theatre
        </p>
      </form>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-border bg-canvas overflow-hidden">
        <div className="px-3 py-2 border-b border-border bg-canvas-2/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                phase === "running"
                  ? "bg-accent animate-pulse"
                  : phase === "done"
                    ? "bg-accent"
                    : "bg-text-tertiary"
              }`}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">
              {phase === "running"
                ? currentPhase || "Working"
                : phase === "done"
                  ? "Audit complete"
                  : "Stopped"}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary">
            growth-studio · live
          </span>
        </div>

        <div className="px-4 py-3 border-b border-border bg-canvas-2/20 max-h-[140px] overflow-y-auto">
          <ul className="space-y-1">
            {signals.map((s, i) => (
              <li
                key={i}
                className="font-mono text-[11px] leading-tight flex gap-3"
              >
                <span className="text-text-tertiary shrink-0 w-[140px]">
                  {s.label}
                </span>
                <span className="text-text-secondary truncate">{s.value}</span>
              </li>
            ))}
            {phase === "running" && (
              <li className="font-mono text-[11px] text-accent animate-pulse">
                ▸ {currentPhase}…
              </li>
            )}
          </ul>
        </div>

        <div
          ref={reportRef}
          className="h-[420px] overflow-y-auto px-4 py-3 font-mono text-[12px] leading-[1.65]"
        >
          {report ? (
            report.split("\n").map((line, i) => (
              <pre
                key={i}
                className={`whitespace-pre-wrap ${classifyLine(line)}`}
              >
                {line || " "}
              </pre>
            ))
          ) : (
            <p className="text-text-tertiary text-[11px]">
              Synthesis will appear here once data collection completes…
            </p>
          )}
          {phase === "running" && report && (
            <span className="inline-block w-[7px] h-[14px] bg-accent align-middle animate-pulse" />
          )}
        </div>
      </div>

      {phase === "done" && (
        <div className="rounded-lg border border-accent/40 bg-canvas-2/40 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-2">
            Want the deep-dive?
          </p>
          <p className="text-sm text-text-primary mb-4 leading-relaxed">
            The auto-audit is a starting point. On a 30-min discovery call we
            walk through the findings, answer the bespoke questions together,
            and map out the systems that would close the gaps.
          </p>
          <a
            href="mailto:hello@youlookbooked.com?subject=Book%20discovery%20call"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-accent text-canvas text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            Book discovery call →
          </a>
          <button
            type="button"
            onClick={reset}
            className="ml-3 h-10 px-3 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Run another
          </button>
        </div>
      )}

      {phase === "error" && error && (
        <div className="rounded-lg border border-border-strong bg-canvas-2/40 p-4">
          <p className="text-sm text-text-primary mb-3">{error}</p>
          <button
            type="button"
            onClick={reset}
            className="h-9 px-4 rounded-md border border-border-strong text-sm text-text-primary hover:bg-canvas-2 transition-colors"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

function classifyLine(line: string): string {
  if (/^\[OBSERVED\]|^\[VISUAL\]|^\[INDUSTRY\]|^\[GAPS\]|^\[QUESTIONS\]/.test(line))
    return "text-accent font-medium mt-3 mb-1";
  if (/^\d+\.\s/.test(line)) return "text-text-primary mt-1";
  if (line.startsWith("- ")) return "text-text-secondary";
  if (line.length === 0) return "h-2";
  return "text-text-secondary";
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-1.5 block">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full h-10 px-3 bg-canvas border border-border rounded-md text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
      />
    </label>
  );
}
