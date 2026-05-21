import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config.ts";

export const dynamic = "force-dynamic";

async function getCounts() {
  try {
    const payload = await getPayload({ config });
    const [contacts, companies, activities, notes] = await Promise.all([
      payload.count({ collection: "contacts" }),
      payload.count({ collection: "companies" }),
      payload.count({ collection: "activities" }),
      payload.count({ collection: "notes" }),
    ]);
    return {
      contacts: contacts.totalDocs,
      companies: companies.totalDocs,
      activities: activities.totalDocs,
      notes: notes.totalDocs,
    };
  } catch (err) {
    console.error("[platform] count failed", err);
    return { contacts: 0, companies: 0, activities: 0, notes: 0 };
  }
}

export default async function PlatformDashboard() {
  const counts = await getCounts();
  const tiles = [
    { label: "Contacts", value: counts.contacts, href: "/platform/contacts" },
    { label: "Companies", value: counts.companies, href: "/platform/companies" },
    { label: "Activities", value: counts.activities, href: "/platform/activity" },
    { label: "Notes", value: counts.notes, href: "#" },
  ];

  return (
    <div className="px-8 py-10 max-w-6xl">
      <div className="flex items-baseline justify-between mb-10">
        <h1 className="font-sans font-medium text-3xl tracking-tight text-ink">
          Overview
        </h1>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
          Phase 2 · Chunk 2A
        </span>
      </div>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {tiles.map((tile) => (
          <Link
            key={tile.label}
            href={tile.href}
            className="rounded-lg border border-border bg-canvas-2 p-5 hover:border-border-strong hover:bg-surface transition-colors"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute mb-3">
              {tile.label}
            </p>
            <p
              className="font-sans font-medium text-3xl text-ink leading-none tracking-tight"
              style={{ fontFeatureSettings: "'tnum'" }}
            >
              {tile.value.toLocaleString("en-GB")}
            </p>
          </Link>
        ))}
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="rounded-lg border border-border bg-canvas-2/50 p-6">
          <h2 className="font-sans font-medium text-lg text-ink mb-2">
            What this is
          </h2>
          <p className="text-sm text-ink-soft leading-relaxed">
            Internal agency CRM and operating console. Hidden from search
            engines. Will be gated by Clerk in Chunk 2E. Contacts, Companies,
            Notes, and Activities collections are now live in Payload at{" "}
            <Link href="/admin" className="text-accent hover:underline">
              /admin
            </Link>
            .
          </p>
        </div>
        <div className="rounded-lg border border-border bg-canvas-2/50 p-6">
          <h2 className="font-sans font-medium text-lg text-ink mb-2">
            Next chunks
          </h2>
          <ul className="text-sm text-ink-soft leading-relaxed space-y-1">
            <li>2B — Contact list filters + detail timeline + inline edit</li>
            <li>2C — Pipeline kanban</li>
            <li>2D — Full-text search, CSV import/export, @mentions</li>
            <li>2E — Clerk auth + multi-tenant scoping</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
