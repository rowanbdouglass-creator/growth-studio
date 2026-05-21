"use server";

import { revalidatePath } from "next/cache";
import { getPayload } from "payload";
import config from "@/payload.config.ts";
import type { PipelineStageId, ActivityType } from "@/config/pipeline";
import { PIPELINE_STAGES } from "@/config/pipeline";

type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

async function payload() {
  return getPayload({ config });
}

function pathsToRevalidate(contactId: string | number) {
  return [
    "/platform",
    "/platform/contacts",
    `/platform/contacts/${contactId}`,
  ];
}

async function recordActivity(args: {
  contactId: string | number;
  type: ActivityType;
  summary: string;
  detail?: string;
  metadata?: Record<string, unknown>;
}) {
  const p = await payload();
  await p.create({
    collection: "activities",
    data: {
      contact: args.contactId,
      type: args.type,
      summary: args.summary,
      detail: args.detail,
      metadata: args.metadata,
    },
  });
}

// ------------------------------------------------------------------
// Add note
// ------------------------------------------------------------------

export async function addNote(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const contactId = formData.get("contactId")?.toString().trim();
  const subject = formData.get("subject")?.toString().trim();
  const bodyText = formData.get("body")?.toString().trim();

  if (!contactId) return { status: "error", message: "Missing contact." };
  if (!subject) return { status: "error", message: "Subject is required." };

  try {
    const p = await payload();
    await p.create({
      collection: "notes",
      data: {
        contact: contactId,
        subject,
        body: bodyText
          ? {
              root: {
                type: "root",
                direction: null,
                format: "",
                indent: 0,
                version: 1,
                children: [
                  {
                    type: "paragraph",
                    direction: null,
                    format: "",
                    indent: 0,
                    version: 1,
                    children: [{ type: "text", text: bodyText, version: 1 }],
                  },
                ],
              },
            }
          : undefined,
      },
    });
    await recordActivity({
      contactId,
      type: "note",
      summary: subject,
      detail: bodyText || undefined,
    });

    pathsToRevalidate(contactId).forEach((p) => revalidatePath(p));
    return { status: "success", message: "Note added." };
  } catch (err) {
    console.error("[crm.addNote] failed", err);
    return {
      status: "error",
      message: "Couldn't save that — try again in a moment.",
    };
  }
}

// ------------------------------------------------------------------
// Change pipeline stage
// ------------------------------------------------------------------

export async function changeStage(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const contactId = formData.get("contactId")?.toString().trim();
  const newStage = formData.get("stage")?.toString().trim() as
    | PipelineStageId
    | undefined;

  if (!contactId) return { status: "error", message: "Missing contact." };
  if (!newStage || !PIPELINE_STAGES.find((s) => s.id === newStage)) {
    return { status: "error", message: "Invalid stage." };
  }

  try {
    const p = await payload();
    const existing = await p.findByID({
      collection: "contacts",
      id: contactId,
    });

    const previousStage = existing?.stage as PipelineStageId | undefined;
    if (previousStage === newStage) {
      return { status: "success", message: "Stage unchanged." };
    }

    await p.update({
      collection: "contacts",
      id: contactId,
      data: { stage: newStage },
    });

    const prevLabel =
      PIPELINE_STAGES.find((s) => s.id === previousStage)?.label ?? "—";
    const nextLabel =
      PIPELINE_STAGES.find((s) => s.id === newStage)?.label ?? newStage;

    await recordActivity({
      contactId,
      type: "stage-changed",
      summary: `${prevLabel} → ${nextLabel}`,
      metadata: { previousStage, newStage },
    });

    pathsToRevalidate(contactId).forEach((p) => revalidatePath(p));
    return { status: "success", message: `Stage → ${nextLabel}` };
  } catch (err) {
    console.error("[crm.changeStage] failed", err);
    return {
      status: "error",
      message: "Couldn't change stage — try again.",
    };
  }
}

// ------------------------------------------------------------------
// Log a quick activity (call, meeting, email, etc.)
// ------------------------------------------------------------------

export async function logActivity(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const contactId = formData.get("contactId")?.toString().trim();
  const type = formData.get("type")?.toString().trim() as
    | ActivityType
    | undefined;
  const summary = formData.get("summary")?.toString().trim();
  const detail = formData.get("detail")?.toString().trim() || undefined;

  if (!contactId) return { status: "error", message: "Missing contact." };
  if (!type) return { status: "error", message: "Pick a type." };
  if (!summary) return { status: "error", message: "Summary is required." };

  try {
    await recordActivity({ contactId, type, summary, detail });
    pathsToRevalidate(contactId).forEach((p) => revalidatePath(p));
    return { status: "success", message: "Logged." };
  } catch (err) {
    console.error("[crm.logActivity] failed", err);
    return {
      status: "error",
      message: "Couldn't log that — try again.",
    };
  }
}
