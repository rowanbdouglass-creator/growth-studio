"use client";

import { useActionState } from "react";
import { changeStage } from "@/lib/actions/crm";
import { PIPELINE_STAGES, type PipelineStageId } from "@/config/pipeline";

const initial = { status: "idle" as const };

export function StageSelector({
  contactId,
  currentStage,
}: {
  contactId: string | number;
  currentStage?: PipelineStageId;
}) {
  const [state, formAction, pending] = useActionState(changeStage, initial);

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="contactId" value={contactId} />
      <select
        name="stage"
        defaultValue={currentStage ?? "cold"}
        disabled={pending}
        onChange={(e) => {
          // Submit on change for fast UX
          e.currentTarget.form?.requestSubmit();
        }}
        className="w-full h-9 px-2 bg-canvas border border-border rounded-md text-sm text-ink outline-none focus:border-accent transition-colors disabled:opacity-50"
      >
        {PIPELINE_STAGES.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
      {state.message && state.status === "success" && (
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
          {state.message}
        </p>
      )}
      {state.message && state.status === "error" && (
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
          {state.message}
        </p>
      )}
    </form>
  );
}
