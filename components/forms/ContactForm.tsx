"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { submitContact, type ContactFormState } from "@/lib/actions/contact";

const initial: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);

  if (state.status === "success") {
    return (
      <div className="p-8 rounded-lg border border-success/30 bg-success/5">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-success mb-3">
          Message sent
        </p>
        <p className="text-text-primary text-lg leading-relaxed">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block font-mono text-xs uppercase tracking-[0.14em] text-text-tertiary mb-2"
          >
            Your name
          </label>
          <Input id="contact-name" name="name" type="text" required />
        </div>
        <div>
          <label
            htmlFor="contact-company"
            className="block font-mono text-xs uppercase tracking-[0.14em] text-text-tertiary mb-2"
          >
            Company
          </label>
          <Input id="contact-company" name="company" type="text" />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block font-mono text-xs uppercase tracking-[0.14em] text-text-tertiary mb-2"
        >
          Email
        </label>
        <Input id="contact-email" name="email" type="email" required />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block font-mono text-xs uppercase tracking-[0.14em] text-text-tertiary mb-2"
        >
          What can we help with?
        </label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="A sentence or two about what you're trying to do and what's getting in the way."
        />
      </div>

      {state.status === "error" && (
        <p
          role="alert"
          className="font-mono text-xs uppercase tracking-[0.14em] text-accent"
        >
          {state.message}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" disabled={pending}>
        {pending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
