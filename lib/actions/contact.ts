"use server";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

/**
 * Contact form server action.
 *
 * Phase 3: logs to console + returns success.
 * Phase 4 will:
 *   - persist to a Payload collection (ContactSubmissions)
 *   - send notification email via Resend
 */
export async function submitContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const company = formData.get("company")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  if (!name) return { status: "error", message: "Name is required." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email." };
  }
  if (!message || message.length < 10) {
    return {
      status: "error",
      message: "Tell us a bit more, at least a sentence.",
    };
  }

  console.log("[contact] new submission", {
    name,
    email,
    company,
    message,
    receivedAt: new Date().toISOString(),
  });

  return {
    status: "success",
    message:
      "Thanks, we'll be in touch within one working day, usually faster.",
  };
}
