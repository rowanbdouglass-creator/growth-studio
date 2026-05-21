import { getPayload } from "payload";
import config from "@/payload.config.ts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Row {
  id: string | number;
  fullName?: string;
  email?: string;
  phone?: string;
  role?: string;
  stage?: string;
  source?: string;
  lastContactedAt?: string;
  doNotContact?: boolean;
  createdAt?: string;
  updatedAt?: string;
  company?: { name?: string; domain?: string } | null;
}

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "contacts",
      limit: 5000,
      sort: "-updatedAt",
      depth: 1,
    });

    const rows = result.docs as unknown as Row[];

    const headers = [
      "id",
      "fullName",
      "email",
      "phone",
      "role",
      "companyName",
      "companyDomain",
      "stage",
      "source",
      "lastContactedAt",
      "doNotContact",
      "createdAt",
      "updatedAt",
    ];

    const lines = [headers.join(",")];
    for (const r of rows) {
      lines.push(
        [
          r.id,
          r.fullName,
          r.email,
          r.phone,
          r.role,
          r.company?.name,
          r.company?.domain,
          r.stage,
          r.source,
          r.lastContactedAt,
          r.doNotContact ? "true" : "false",
          r.createdAt,
          r.updatedAt,
        ]
          .map(csvEscape)
          .join(",")
      );
    }

    const body = lines.join("\n");
    const filename = `contacts-${new Date().toISOString().slice(0, 10)}.csv`;

    return new Response(body, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[platform.contacts.export] failed", err);
    return new Response("Export failed.", { status: 500 });
  }
}
