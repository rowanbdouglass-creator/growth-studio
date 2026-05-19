"use server";

import { getPayload } from "payload";
import config from "@/payload.config.ts";

export type WaitlistTool = "ad-audit" | "website-audit" | "discovery-hub";

export type WaitlistFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const VALID_TOOLS: WaitlistTool[] = [
  "ad-audit",
  "website-audit",
  "discovery-hub",
];

export async function submitWaitlist(
  _prev: WaitlistFormState,
  formData: FormData
): Promise<WaitlistFormState> {
  const email = formData.get("email")?.toString().trim() ?? "";
  const tool = formData.get("tool")?.toString().trim() ?? "";
  const name = formData.get("name")?.toString().trim() || undefined;
  const company = formData.get("company")?.toString().trim() || undefined;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email." };
  }
  if (!VALID_TOOLS.includes(tool as WaitlistTool)) {
    return { status: "error", message: "Pick a tool to join the waitlist." };
  }

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "waitlist-signups",
      data: {
        email,
        tool: tool as WaitlistTool,
        name,
        company,
      },
    });
    return {
      status: "success",
      message: "You're on the list. We'll be in touch when it opens.",
    };
  } catch (err) {
    // Likely a duplicate email; swallow specifics to avoid leaking data.
    console.error("[waitlist] create failed", err);
    return {
      status: "error",
      message:
        "Couldn't save that just now. Try again in a minute or drop us an email.",
    };
  }
}
