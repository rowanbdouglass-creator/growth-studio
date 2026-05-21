"use server";

import { getPayload } from "payload";
import config from "@/payload.config.ts";
import type { PipelineStageId } from "@/config/pipeline";

export interface RequestAdAuditInput {
  url: string;
  email: string;
  fullName: string;
  companyName?: string;
}

export interface RequestAdAuditResult {
  status: "success" | "error";
  message?: string;
  contactId?: string | number;
}

function normaliseUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

function hostnameFrom(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/.*/, "");
  }
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function requestAdAudit(
  input: RequestAdAuditInput
): Promise<RequestAdAuditResult> {
  const url = normaliseUrl(input.url ?? "");
  const email = (input.email ?? "").trim().toLowerCase();
  const fullName = (input.fullName ?? "").trim();
  const companyName = (input.companyName ?? "").trim() || undefined;

  if (!url) return { status: "error", message: "Website URL is required." };
  if (!email || !isEmail(email))
    return { status: "error", message: "A valid email is required." };
  if (!fullName)
    return { status: "error", message: "Your name is required." };

  try {
    const payload = await getPayload({ config });

    let companyId: string | number | undefined;
    const host = hostnameFrom(url);

    const resolvedCompanyName = companyName || host;

    const existingCompany = await payload.find({
      collection: "companies",
      where: {
        or: [
          { name: { equals: resolvedCompanyName } },
          { domain: { equals: host } },
        ],
      },
      limit: 1,
    });

    if (existingCompany.docs.length > 0) {
      companyId = existingCompany.docs[0].id;
    } else {
      const created = await payload.create({
        collection: "companies",
        data: {
          name: resolvedCompanyName,
          domain: host,
        },
      });
      companyId = created.id;
    }

    let contactId: string | number;
    const existingContact = await payload.find({
      collection: "contacts",
      where: { email: { equals: email } },
      limit: 1,
    });

    if (existingContact.docs.length > 0) {
      const found = existingContact.docs[0];
      contactId = found.id;
      await payload.update({
        collection: "contacts",
        id: String(contactId),
        data: {
          stage: "audit-run" as PipelineStageId,
          source: existingContact.docs[0].source || "ad-audit",
          company: companyId,
          lastContactedAt: new Date().toISOString(),
        },
      });
    } else {
      const created = await payload.create({
        collection: "contacts",
        data: {
          fullName,
          email,
          company: companyId,
          stage: "audit-run" as PipelineStageId,
          source: "ad-audit",
          lastContactedAt: new Date().toISOString(),
        },
      });
      contactId = created.id;
    }

    await payload.create({
      collection: "activities",
      data: {
        contact: contactId,
        company: companyId,
        type: "audit",
        summary: `Requested ad audit for ${host}`,
        detail: `Self-serve via /tools/ad-audit\nURL: ${url}\nName: ${fullName}\nEmail: ${email}`,
        metadata: { url, host, via: "tools/ad-audit", tool: "ad-audit" },
      },
    });

    return { status: "success", contactId };
  } catch (err) {
    console.error("[audits.requestAdAudit] failed", err);
    return {
      status: "error",
      message:
        "Couldn't kick off the audit — try again in a moment, or email hello@youlookbooked.com.",
    };
  }
}
