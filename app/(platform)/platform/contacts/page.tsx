import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config.ts";
import {
  PIPELINE_STAGES,
  LEAD_SOURCES,
  type PipelineStageId,
} from "@/config/pipeline";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

interface SearchParams {
  q?: string;
  stage?: string;
  source?: string;
  sort?: string;
  page?: string;
}

async function getContacts(searchParams: SearchParams) {
  const q = searchParams.q?.trim();
  const stage = searchParams.stage?.trim();
  const source = searchParams.source?.trim();
  const sort = searchParams.sort?.trim() || "-updatedAt";
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);

  try {
    const payload = await getPayload({ config });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (q) {
      where.or = [
        { fullName: { like: q } },
        { email: { like: q } },
        { role: { like: q } },
      ];
    }
    if (stage) where.stage = { equals: stage };
    if (source) where.source = { equals: source };

    const result = await payload.find({
      collection: "contacts",
      where,
      sort,
      limit: PAGE_SIZE,
      page,
      depth: 1,
    });

    return {
      docs: result.docs,
      total: result.totalDocs,
      page: result.page ?? page,
      totalPages: result.totalPages ?? 1,
    };
  } catch (err) {
    console.error("[platform.contacts] fetch failed", err);
    return { docs: [], total: 0, page: 1, totalPages: 1 };
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
  lastContactedAt?: string;
  company?: { id: string | number; name?: string } | null;
}

export default async function ContactsListPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { docs, total, page, totalPages } = await getContacts(params);
  const contacts = docs as unknown as PopulatedContact[];

  return (
    <div className="px-8 py-10">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h1 className="font-sans font-medium text-3xl tracking-tight text-ink mb-1">
            Contacts
          </h1>
          <p className="text-sm text-ink-mute">
            {total.toLocaleString("en-GB")}{" "}
            {total === 1 ? "record" : "records"}
            {(params.q || params.stage || params.source) && " · filtered"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/platform/contacts/import"
            className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border-strong text-sm text-ink hover:bg-canvas-2 transition-colors"
          >
            Import CSV
          </Link>
          <a
            href="/platform/contacts/export"
            className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border-strong text-sm text-ink hover:bg-canvas-2 transition-colors"
          >
            Export CSV
          </a>
          <Link
            href="/admin/collections/contacts/create"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-accent text-canvas text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            New contact
          </Link>
        </div>
      </div>

      {/* Filter / search bar */}
      <form
        method="GET"
        className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-lg border border-border bg-canvas-2/40"
      >
        <input
          type="search"
          name="q"
          defaultValue={params.q ?? ""}
          placeholder="Search name, email, role…"
          className="flex-1 min-w-[200px] h-9 px-3 bg-canvas border border-border rounded-md text-sm text-ink placeholder:text-ink-dim outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft transition-colors"
        />
        <select
          name="stage"
          defaultValue={params.stage ?? ""}
          className="h-9 px-2 bg-canvas border border-border rounded-md text-sm text-ink outline-none focus:border-accent transition-colors"
        >
          <option value="">All stages</option>
          {PIPELINE_STAGES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        <select
          name="source"
          defaultValue={params.source ?? ""}
          className="h-9 px-2 bg-canvas border border-border rounded-md text-sm text-ink outline-none focus:border-accent transition-colors"
        >
          <option value="">All sources</option>
          {LEAD_SOURCES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <select
          name="sort"
          defaultValue={params.sort ?? "-updatedAt"}
          className="h-9 px-2 bg-canvas border border-border rounded-md text-sm text-ink outline-none focus:border-accent transition-colors"
        >
          <option value="-updatedAt">Updated, newest first</option>
          <option value="-createdAt">Created, newest first</option>
          <option value="fullName">Name A→Z</option>
          <option value="-lastContactedAt">Last contacted, recent first</option>
        </select>
        <button
          type="submit"
          className="h-9 px-4 rounded-md bg-canvas border border-border-strong text-sm text-ink hover:bg-surface transition-colors"
        >
          Apply
        </button>
        {(params.q || params.stage || params.source) && (
          <Link
            href="/platform/contacts"
            className="h-9 px-3 inline-flex items-center text-sm text-ink-mute hover:text-ink transition-colors"
          >
            Reset
          </Link>
        )}
      </form>

      {contacts.length === 0 ? (
        <div className="rounded-lg border border-border bg-canvas-2/50 p-10 text-center">
          <p className="font-sans text-lg text-ink mb-2">
            {total === 0 && !params.q ? "No contacts yet" : "No matches"}
          </p>
          <p className="text-sm text-ink-soft mb-6 max-w-md mx-auto">
            {total === 0 && !params.q
              ? "Create your first contact in the Payload admin, or wait for the CSV import tool (Chunk 2D)."
              : "Try a different search or clear the filters."}
          </p>
        </div>
      ) : (
        <>
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
                          href={`/platform/contacts/${c.id}`}
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
                          <span className="text-ink-soft">
                            {c.company.name}
                          </span>
                        ) : (
                          <span className="text-ink-dim">-</span>
                        )}
                      </Td>
                      <Td>
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {sm?.label ?? c.stage ?? "-"}
                        </span>
                      </Td>
                      <Td className="text-ink-soft">{c.role ?? "-"}</Td>
                      <Td className="text-ink-mute font-mono text-[11px] uppercase tracking-wider">
                        {c.source ?? "-"}
                      </Td>
                      <Td className="text-right text-ink-mute font-mono text-[11px]">
                        {c.updatedAt
                          ? new Date(c.updatedAt).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                            })
                          : "-"}
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              searchParams={params}
            />
          )}
        </>
      )}
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  searchParams,
}: {
  page: number;
  totalPages: number;
  searchParams: SearchParams;
}) {
  function buildHref(targetPage: number) {
    const params = new URLSearchParams();
    if (searchParams.q) params.set("q", searchParams.q);
    if (searchParams.stage) params.set("stage", searchParams.stage);
    if (searchParams.source) params.set("source", searchParams.source);
    if (searchParams.sort) params.set("sort", searchParams.sort);
    params.set("page", String(targetPage));
    return `/platform/contacts?${params.toString()}`;
  }

  return (
    <div className="flex items-center justify-between mt-4">
      <p className="font-mono text-[11px] text-ink-mute uppercase tracking-wider">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        {page > 1 && (
          <Link
            href={buildHref(page - 1)}
            className="h-8 px-3 inline-flex items-center text-sm text-ink-soft border border-border rounded-md hover:bg-canvas-2 transition-colors"
          >
            ← Previous
          </Link>
        )}
        {page < totalPages && (
          <Link
            href={buildHref(page + 1)}
            className="h-8 px-3 inline-flex items-center text-sm text-ink-soft border border-border rounded-md hover:bg-canvas-2 transition-colors"
          >
            Next →
          </Link>
        )}
      </div>
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
