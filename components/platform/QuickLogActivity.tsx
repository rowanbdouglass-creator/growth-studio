"use client";

import { useActionState, useRef, useEffect } from "react";
import { logActivity } from "@/lib/actions/crm";
import { ACTIVITY_TYPES } from "@/config/pipeline";

const initial = { status: "idle" as const };

// Quick-log types people will actually pick — full list still available
// in Payload admin but cluttering the sidebar with all 12 is overkill.
const QUICK_TYPES = ACTIVITY_TYPES.filter((t) =>
  ["email-sent", "email-received", "call", "meeting", "proposal-sent"].includes(
    t.value
  )
);

export function QuickLogActivity({
  contactId,
}: {
  contactId: string | number;
}) {
  const [state, formAction, pending] = useActionState(logActivity, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-lg border border-border bg-canvas-2/40 p-4"
    >
      <input type="hidden" name="contactId" value={contactId} />
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute mb-3">
        Log activity
      </p>
      <div className="grid grid-cols-[1fr_2fr] gap-2 mb-2">
        <select
          name="type"
          required
          defaultValue="call"
          className="h-9 px-2 bg-canvas border border-border rounded-md text-sm text-ink outline-none focus:border-accent transition-colors"
        >
          {QUICK_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <input
          name="summary"
          required
          placeholder="One-line summary…"
          className="h-9 px-3 bg-canvas border border-border rounded-md text-sm text-ink placeholder:text-ink-dim outline-none focus:border-accent transition-colors"
        />
      </div>
      <textarea
        name="detail"
        rows={2}
        placeholder="Detail (optional)…"
        className="w-full px-3 py-2 mb-3 bg-canvas border border-border rounded-md text-sm text-ink placeholder:text-ink-dim outline-none focus:border-accent transition-colors resize-y"
      />
      <div className="flex items-center justify-between">
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
            state.status === "error" ? "text-accent" : "text-ink-mute"
          }`}
        >
          {state.message ?? " "}
        </span>
        <button
          type="submit"
          disabled={pending}
          className="h-8 px-4 rounded-md bg-accent text-canvas text-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Logging…" : "Log"}
        </button>
      </div>
    </form>
  );
}
