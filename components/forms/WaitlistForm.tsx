"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  submitWaitlist,
  type WaitlistFormState,
  type WaitlistTool,
} from "@/lib/actions/waitlist";

const initial: WaitlistFormState = { status: "idle" };

interface WaitlistFormProps {
  tool: WaitlistTool;
  ctaLabel?: string;
}

export function WaitlistForm({
  tool,
  ctaLabel = "Join the waitlist",
}: WaitlistFormProps) {
  const [state, formAction, pending] = useActionState(submitWaitlist, initial);

  if (state.status === "success") {
    return (
      <div className="p-6 rounded-lg border border-success/30 bg-success/5">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-success mb-2">
          You're in
        </p>
        <p className="text-text-primary">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="tool" value={tool} />
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          name="name"
          type="text"
          placeholder="Name (optional)"
          aria-label="Your name"
        />
        <Input
          name="company"
          type="text"
          placeholder="Company (optional)"
          aria-label="Company name"
        />
      </div>
      <Input
        name="email"
        type="email"
        required
        placeholder="you@company.com"
        aria-label="Your email"
      />
      {state.status === "error" && (
        <p
          role="alert"
          className="font-mono text-xs uppercase tracking-[0.14em] text-accent"
        >
          {state.message}
        </p>
      )}
      <Button type="submit" variant="primary" size="md" disabled={pending}>
        {pending ? "Joining..." : ctaLabel}
      </Button>
    </form>
  );
}
