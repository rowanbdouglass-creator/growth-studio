import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config.ts";
import { PIPELINE_STAGES, type PipelineStageId } from "@/config/pipeline";

export const dynamic = "force-dynamic";

async function getContacts() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "contacts",
      sort: "-updatedAt",
      limit: 100,
      depth: 1,
    });
    return result.docs;
  } catch (err) {
    console.error("[platform.contacts] fetch failed", err);
    return [];
  }
}

function stageMeta(id: string) {
  return PIPELINE_STAGES.find((s) => s.id === (id as PipelineStageId));
}

interface PopulatedContact {
  id: string | number;
  fullName?: string;
  email?: string;
  role?: string;
  stage?: PipelineStageId;
  source?: string;
  updatedAt?: string;
  company?: { id: string | number; name?: string } | null;
}

export default async function ContactsListPage() {
  const contacts = (await getContacts()) as unknown as PopulatedContact[];

  return (
    <div className="px-8 py-10">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h1 className="font-sans font-medium text-3xl tracking-tight text-ink mb-1">
            Contacts
          </h1>
          <p className="text-sm text-ink-mute">
            {contacts.length.toLocaleString("en-GB")}{" "}
            {contacts.length === 1 ? "record" : "records"}
          </p>
        </div>
        <Link
          href="/admin/collections/contacts/create"
          className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-accent text-canvas text-sm font-medium hover:bg-accent-hover transition-colors"
        >
          New contact
        </Link>
      </div>

      {contacts.length === 0 ? (
        <div className="rounded-lg border border-border bg-canvas-2/50 p-10 text-center">
          <p className="font-sans text-lg text-ink mb-2">No contacts yet</p>
          <p className="text-sm text-ink-soft mb-6 max-w-md mx-auto">
            Create your first contact in the Payload admin, or wait for the
            CSV import tool (Chunk 2D) to migrate an existing list.
          </p>
          <Link
            href="/admin/collections/contacts/create"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-accent text-canvas text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            Add a contact
          </Link>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-canvas-2/40 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-canvas-2/60">
                <Th>Name</Th>
                <Th>Company</Th>
                <Th>Stage</Th>
                <Th>Role</Th>
                <Th>Source</Th>
                <Th className="text-right">Updated</Th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => {
                const sm = stageMeta(c.stage ?? "cold");
                return (
                  <tr
                    key={c.id}
                    className="border-b border-border/60 hover:bg-canvas/40 transition-colors"
                  >
                    <Td>
                      <Link
                        href={`/admin/collections/contacts/${c.id}`}
                        className="text-ink hover:text-accent transition-colors font-medium"
                      >
                        {c.fullName ?? "(unnamed)"}
                      </Link>
                      {c.email && (
                        <div className="font-mono text-[11px] text-ink-mute mt-0.5">
                          {c.email}
                        </div>
                      )}
                    </Td>
                    <Td>
                      {c.company?.name ? (
                        <Link
                          href={`/admin/collections/companies/${c.company.id}`}
                          className="text-ink-soft hover:text-accent transition-colors"
                        >
                          {c.company.name}
                        </Link>
                      ) : (
                        <span className="text-ink-dim">—</span>
                      )}
                    </Td>
                    <Td>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {sm?.label ?? c.stage ?? "—"}
                      </span>
                    </Td>
                    <Td className="text-ink-soft">{c.role ?? "—"}</Td>
                    <Td className="text-ink-mute font-mono text-[11px] uppercase tracking-wider">
                      {c.source ?? "—"}
                    </Td>
                    <Td className="text-right text-ink-mute font-mono text-[11px]">
                      {c.updatedAt
                        ? new Date(c.updatedAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })
                        : "—"}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={`text-left px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute font-normal ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}
