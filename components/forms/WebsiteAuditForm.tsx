"use client";

import { useState, useTransition } from "react";
import { requestWebsiteAudit } from "@/lib/actions/audits";
import { AuditExperience } from "./website-audit/AuditExperience";

type Phase = "form" | "submitting" | "running" | "error";

export function WebsiteAuditForm() {
  const [phase, setPhase] = useState<Phase>("form");
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [activeAudit, setActiveAudit] = useState<{
    url: string;
    contactId: string | number;
  } | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phase === "submitting" || phase === "running") return;
    setError(null);

    startTransition(async () => {
      setPhase("submitting");
      const captured = await requestWebsiteAudit({
        fullName,
        email,
        url,
        companyName,
      });
      if (captured.status === "error" || !captured.contactId) {
        setError(captured.message ?? "Something went wrong.");
        setPhase("error");
        return;
      }

      setActiveAudit({ url, contactId: captured.contactId });
      setPhase("running");
    });
  }

  function closeExperience() {
    setActiveAudit(null);
    setPhase("form");
  }

  return (
    <>
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
          placeholder="Optional, inferred from domain"
        />

        {error && phase === "error" && (
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
          ~90 seconds · No card · Real data, no theatre
        </p>
      </form>

      {phase === "running" && activeAudit && (
        <AuditExperience
          url={activeAudit.url}
          contactId={activeAudit.contactId}
          onClose={closeExperience}
        />
      )}
    </>
  );
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
