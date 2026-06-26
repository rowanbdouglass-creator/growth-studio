"use client";

import { useRef, useState, useTransition } from "react";
import { requestAdAudit } from "@/lib/actions/audits";

type Phase = "form" | "submitting" | "streaming" | "done" | "error";

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

export function AdAuditForm() {
  const [phase, setPhase] = useState<Phase>("form");
  const [error, setError] = useState<string | null>(null);
  const [buffer, setBuffer] = useState("");
  const [, startTransition] = useTransition();
  const outputRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [companyName, setCompanyName] = useState("");

  function reset() {
    abortRef.current?.abort();
    setPhase("form");
    setBuffer("");
    setError(null);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phase === "submitting" || phase === "streaming") return;
    setError(null);
    setBuffer("");

    startTransition(async () => {
      setPhase("submitting");
      const res = await requestAdAudit({ fullName, email, url, companyName });
      if (res.status === "error") {
        setError(res.message ?? "Something went wrong.");
        setPhase("error");
        return;
      }

      setPhase("streaming");
      abortRef.current = new AbortController();

      try {
        const stream = await fetch("/api/audit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
          signal: abortRef.current.signal,
        });
        if (!stream.ok || !stream.body) throw new Error(`HTTP ${stream.status}`);

        const reader = stream.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setBuffer((prev) => prev + chunk);
          requestAnimationFrame(() => {
            if (outputRef.current) {
              outputRef.current.scrollTop = outputRef.current.scrollHeight;
            }
          });
        }

        setPhase("done");
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError("Couldn't run the audit, try again.");
        setPhase("error");
      }
    });
  }

  if (phase === "form" || phase === "submitting") {
    return (
      <form onSubmit={onSubmit} className="space-y-5">
        <Field
          label="Your name"
          name="fullName"
          value={fullName}
          onChange={setFullName}
          placeholder="Jane Doe"
          required
        />
        <Field
          label="Work email"
          name="email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="jane@company.co.uk"
          required
        />
        <Field
          label="Company website"
          name="url"
          value={url}
          onChange={setUrl}
          placeholder="your-store.co.uk"
          required
        />
        <Field
          label="Company name"
          name="companyName"
          value={companyName}
          onChange={setCompanyName}
          placeholder="Optional, we'll infer from the domain"
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
          {phase === "submitting" ? "Starting audit…" : "Run my free audit"}
        </button>

        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary text-center pt-1">
          No card · ~30s · Report stays private
        </p>
      </form>
    );
  }

  const lines: RenderedLine[] = buffer
    .split("\n")
    .map((text) => ({ text, kind: classifyLine(text) }));

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-border bg-canvas overflow-hidden">
        <div className="px-3 py-2 border-b border-border bg-canvas-2/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">
              {phase === "streaming" ? "Auditing…" : "Audit complete"}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary">
            growth-studio · live
          </span>
        </div>
        <div
          ref={outputRef}
          className="h-[420px] overflow-y-auto p-4 font-mono text-[12px] leading-[1.65]"
        >
          {lines.map((line, i) => (
            <pre
              key={i}
              className={`whitespace-pre-wrap ${
                line.kind === "warn"
                  ? "text-accent"
                  : line.kind === "success"
                    ? "text-accent"
                    : line.kind === "result"
                      ? "text-text-primary font-medium"
                      : line.kind === "info"
                        ? "text-text-secondary"
                        : line.kind === "header"
                          ? "text-text-primary font-medium mt-2"
                          : line.kind === "spacer"
                            ? "h-2"
                            : "text-text-secondary"
              }`}
            >
              {line.text || " "}
            </pre>
          ))}
          {phase === "streaming" && (
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
            The auto-audit is a sketch. On a 30-min discovery call we walk
            through the full report, recovered spend, the rebuild plan, and
            whether we're a fit.
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

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
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
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full h-10 px-3 bg-canvas border border-border rounded-md text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
      />
    </label>
  );
}
