"use client";

import { useState, useTransition } from "react";
import Papa from "papaparse";
import { importContactsCsv, type ImportResult } from "@/lib/actions/crm";

type ParsedRow = Record<string, string>;

const TEMPLATE_HEADERS = [
  "fullName",
  "email",
  "phone",
  "role",
  "companyName",
  "companyDomain",
  "stage",
  "source",
];

const TEMPLATE_EXAMPLE = `fullName,email,phone,role,companyName,companyDomain,stage,source
Jane Doe,jane@example.co.uk,07700 900100,Marketing Director,Example Ltd,example.co.uk,cold,referral
John Smith,john@acme.com,,Founder,Acme Inc,acme.com,engaged,ad-audit`;

export function CsvImporter() {
  const [rows, setRows] = useState<ParsedRow[] | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [pending, startTransition] = useTransition();

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setResult(null);
    Papa.parse<ParsedRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError(`Parse error: ${results.errors[0].message}`);
          return;
        }
        if (results.data.length === 0) {
          setError("No rows found in the CSV.");
          return;
        }
        setHeaders(Object.keys(results.data[0]));
        setRows(results.data);
      },
      error: (err) => setError(err.message),
    });
  }

  function doImport() {
    if (!rows) return;
    setError(null);
    setResult(null);
    startTransition(async () => {
      const res = await importContactsCsv(
        rows.map((r) => ({
          fullName: r.fullName,
          email: r.email,
          phone: r.phone,
          role: r.role,
          companyName: r.companyName,
          companyDomain: r.companyDomain,
          stage: r.stage as never,
          source: r.source,
        }))
      );
      setResult(res);
    });
  }

  function reset() {
    setRows(null);
    setHeaders([]);
    setError(null);
    setResult(null);
  }

  return (
    <div className="space-y-6">
      {!rows && !result && (
        <div className="rounded-lg border border-dashed border-border bg-canvas-2/30 p-10 text-center">
          <p className="font-sans text-lg text-ink mb-2">Drop a CSV here</p>
          <p className="text-sm text-ink-soft mb-6 max-w-md mx-auto">
            Header row required. Recognised columns:{" "}
            <code className="font-mono text-[12px] text-ink-mute">
              {TEMPLATE_HEADERS.join(", ")}
            </code>
            . Extra columns are ignored.
          </p>
          <label className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-accent text-canvas text-sm font-medium hover:bg-accent-hover transition-colors cursor-pointer">
            Choose file
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleFile}
              className="sr-only"
            />
          </label>
          <details className="mt-6 text-left max-w-2xl mx-auto">
            <summary className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute cursor-pointer hover:text-ink transition-colors">
              View template
            </summary>
            <pre className="mt-3 p-4 rounded-md bg-canvas border border-border font-mono text-[11px] text-ink-soft whitespace-pre overflow-x-auto">
              {TEMPLATE_EXAMPLE}
            </pre>
          </details>
        </div>
      )}

      {error && (
        <div className="rounded-md border border-accent/40 bg-canvas-2/40 px-4 py-3 text-sm text-ink">
          {error}
        </div>
      )}

      {rows && !result && (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-canvas-2/40 p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute mb-3">
              Preview · {rows.length.toLocaleString("en-GB")} rows
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {headers.slice(0, 6).map((h) => (
                      <th
                        key={h}
                        className="text-left px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute font-normal"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 5).map((row, i) => (
                    <tr key={i} className="border-b border-border/40">
                      {headers.slice(0, 6).map((h) => (
                        <td
                          key={h}
                          className="px-2 py-1.5 text-ink-soft truncate max-w-[160px]"
                        >
                          {row[h] ?? "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {rows.length > 5 && (
                <p className="font-mono text-[10px] text-ink-dim mt-2 px-2">
                  …and {rows.length - 5} more
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={doImport}
              disabled={pending}
              className="h-9 px-5 rounded-md bg-accent text-canvas text-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pending
                ? "Importing…"
                : `Import ${rows.length.toLocaleString("en-GB")} contacts`}
            </button>
            <button
              type="button"
              onClick={reset}
              disabled={pending}
              className="h-9 px-3 text-sm text-ink-mute hover:text-ink transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Imported" value={result.imported} />
            <Stat label="Duplicates skipped" value={result.skippedDuplicate} />
            <Stat label="Invalid skipped" value={result.skippedInvalid} />
          </div>
          {result.errors.length > 0 && (
            <details className="rounded-md border border-border bg-canvas-2/40 p-4">
              <summary className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute cursor-pointer">
                {result.errors.length} error
                {result.errors.length === 1 ? "" : "s"}
              </summary>
              <ul className="mt-3 space-y-1 font-mono text-[11px] text-ink-soft">
                {result.errors.slice(0, 20).map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </details>
          )}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="h-9 px-5 rounded-md border border-border-strong text-sm text-ink hover:bg-canvas-2 transition-colors"
            >
              Import another file
            </button>
            <a
              href="/platform/contacts"
              className="h-9 px-5 inline-flex items-center rounded-md bg-accent text-canvas text-sm font-medium hover:bg-accent-hover transition-colors"
            >
              View contacts
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-canvas-2/40 p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute mb-1.5">
        {label}
      </p>
      <p
        className="font-sans font-medium text-2xl text-ink leading-none tracking-tight"
        style={{ fontFeatureSettings: "'tnum'" }}
      >
        {value.toLocaleString("en-GB")}
      </p>
    </div>
  );
}
