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
      message: "Couldn't save that, try again in a moment.",
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
      PIPELINE_STAGES.find((s) => s.id === previousStage)?.label ?? "-";
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
      message: "Couldn't change stage, try again.",
    };
  }
}

// ------------------------------------------------------------------
// Move contact to stage (kanban drop). Same effect as changeStage
// but accepts direct args instead of FormData so client DnD code
// can call it without a form.
// ------------------------------------------------------------------

export async function moveContactToStage(
  contactId: string | number,
  newStage: PipelineStageId
): Promise<FormState> {
  if (!contactId) return { status: "error", message: "Missing contact." };
  if (!PIPELINE_STAGES.find((s) => s.id === newStage)) {
    return { status: "error", message: "Invalid stage." };
  }

  try {
    const p = await payload();
    const existing = await p.findByID({
      collection: "contacts",
      id: String(contactId),
    });
    const previousStage = existing?.stage as PipelineStageId | undefined;
    if (previousStage === newStage) {
      return { status: "success", message: "Stage unchanged." };
    }

    await p.update({
      collection: "contacts",
      id: String(contactId),
      data: { stage: newStage },
    });

    const prevLabel =
      PIPELINE_STAGES.find((s) => s.id === previousStage)?.label ?? "-";
    const nextLabel =
      PIPELINE_STAGES.find((s) => s.id === newStage)?.label ?? newStage;
    await recordActivity({
      contactId,
      type: "stage-changed",
      summary: `${prevLabel} → ${nextLabel}`,
      metadata: { previousStage, newStage, via: "kanban" },
    });

    pathsToRevalidate(contactId).forEach((p) => revalidatePath(p));
    revalidatePath("/platform/pipeline");
    return { status: "success", message: `→ ${nextLabel}` };
  } catch (err) {
    console.error("[crm.moveContactToStage] failed", err);
    return { status: "error", message: "Couldn't move that contact." };
  }
}

// ------------------------------------------------------------------
// CSV import, bulk create contacts. Skips rows missing required
// fields and dedupes on email.
// ------------------------------------------------------------------

export interface CsvContactRow {
  fullName?: string;
  email?: string;
  phone?: string;
  role?: string;
  companyName?: string;
  companyDomain?: string;
  stage?: PipelineStageId;
  source?: string;
  notes?: string;
}

export interface ImportResult {
  status: "success" | "error";
  imported: number;
  skippedDuplicate: number;
  skippedInvalid: number;
  errors: string[];
}

export async function importContactsCsv(
  rows: CsvContactRow[]
): Promise<ImportResult> {
  const result: ImportResult = {
    status: "success",
    imported: 0,
    skippedDuplicate: 0,
    skippedInvalid: 0,
    errors: [],
  };

  if (!rows || rows.length === 0) {
    return { ...result, status: "error", errors: ["No rows."] };
  }
  if (rows.length > 2000) {
    return {
      ...result,
      status: "error",
      errors: ["Maximum 2,000 rows per import, split the file."],
    };
  }

  try {
    const p = await payload();

    // Cache companies by name to avoid one find per row
    const companyCache = new Map<string, string | number>();

    for (const [i, row] of rows.entries()) {
      const fullName = row.fullName?.trim();
      const email = row.email?.trim().toLowerCase();

      if (!fullName && !email) {
        result.skippedInvalid++;
        continue;
      }

      // Dedupe on email
      if (email) {
        const exists = await p.find({
          collection: "contacts",
          where: { email: { equals: email } },
          limit: 1,
        });
        if (exists.docs.length > 0) {
          result.skippedDuplicate++;
          continue;
        }
      }

      // Resolve company by name (auto-create if missing)
      let companyId: string | number | undefined;
      const companyName = row.companyName?.trim();
      if (companyName) {
        if (companyCache.has(companyName)) {
          companyId = companyCache.get(companyName);
        } else {
          const existing = await p.find({
            collection: "companies",
            where: { name: { equals: companyName } },
            limit: 1,
          });
          if (existing.docs.length > 0) {
            companyId = existing.docs[0].id;
          } else {
            const created = await p.create({
              collection: "companies",
              data: {
                name: companyName,
                domain: row.companyDomain?.trim() || undefined,
              },
            });
            companyId = created.id;
          }
          if (companyId !== undefined) {
            companyCache.set(companyName, companyId);
          }
        }
      }

      try {
        await p.create({
          collection: "contacts",
          data: {
            fullName: fullName || email || "(unnamed)",
            email,
            phone: row.phone?.trim() || undefined,
            role: row.role?.trim() || undefined,
            company: companyId,
            stage:
              (row.stage as PipelineStageId) ||
              ("cold" as PipelineStageId),
            source: row.source || undefined,
          },
        });
        result.imported++;
      } catch (err) {
        result.skippedInvalid++;
        result.errors.push(
          `Row ${i + 2}: ${err instanceof Error ? err.message : "unknown"}`
        );
      }
    }

    revalidatePath("/platform");
    revalidatePath("/platform/contacts");
    revalidatePath("/platform/companies");

    return result;
  } catch (err) {
    console.error("[crm.importContactsCsv] failed", err);
    return {
      ...result,
      status: "error",
      errors: [err instanceof Error ? err.message : "Unknown error"],
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
      message: "Couldn't log that, try again.",
    };
  }
}
