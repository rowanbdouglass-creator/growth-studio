"use client";

import { useActionState, useRef, useEffect } from "react";
import { addNote } from "@/lib/actions/crm";

const initial = { status: "idle" as const };

export function AddNoteForm({ contactId }: { contactId: string | number }) {
  const [state, formAction, pending] = useActionState(addNote, initial);
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
        Add note
      </p>
      <input
        name="subject"
        required
        placeholder="Subject…"
        className="w-full h-9 px-3 mb-2 bg-canvas border border-border rounded-md text-sm text-ink placeholder:text-ink-dim outline-none focus:border-accent transition-colors"
      />
      <textarea
        name="body"
        rows={3}
        placeholder="Body (optional)…"
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
          {pending ? "Saving…" : "Add note"}
        </button>
      </div>
    </form>
  );
}
