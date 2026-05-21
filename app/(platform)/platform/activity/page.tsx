import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config.ts";
import { ACTIVITY_TYPES, type ActivityType } from "@/config/pipeline";

export const dynamic = "force-dynamic";

interface ActivityRow {
  id: string | number;
  type: ActivityType;
  summary: string;
  detail?: string;
  createdAt: string;
  contact?: { id: string | number; fullName?: string } | null;
  actor?: { id: string | number; name?: string } | null;
}

interface SearchParams {
  type?: string;
  page?: string;
}

const PAGE_SIZE = 50;

async function getActivities(searchParams: SearchParams) {
  const type = searchParams.type?.trim();
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);

  try {
    const payload = await getPayload({ config });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (type) where.type = { equals: type };

    const result = await payload.find({
      collection: "activities",
      where,
      sort: "-createdAt",
      limit: PAGE_SIZE,
      page,
      depth: 1,
    });

    return {
      docs: result.docs as unknown as ActivityRow[],
      total: result.totalDocs,
      page: result.page ?? page,
      totalPages: result.totalPages ?? 1,
    };
  } catch (err) {
    console.error("[platform.activity] fetch failed", err);
    return { docs: [], total: 0, page: 1, totalPages: 1 };
  }
}

function typeLabel(type: ActivityType): string {
  return ACTIVITY_TYPES.find((t) => t.value === type)?.label ?? type;
}

export default async function ActivityFeedPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { docs, total, page, totalPages } = await getActivities(params);

  return (
    <div className="px-8 py-10">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h1 className="font-sans font-medium text-3xl tracking-tight text-ink mb-1">
            Activity feed
          </h1>
          <p className="text-sm text-ink-mute">
            {total.toLocaleString("en-GB")} events
            {params.type && " · filtered"}
          </p>
        </div>
      </div>

      <form
        method="GET"
        className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-lg border border-border bg-canvas-2/40"
      >
        <select
          name="type"
          defaultValue={params.type ?? ""}
          className="h-9 px-2 bg-canvas border border-border rounded-md text-sm text-ink outline-none focus:border-accent transition-colors"
        >
          <option value="">All types</option>
          {ACTIVITY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="h-9 px-4 rounded-md bg-canvas border border-border-strong text-sm text-ink hover:bg-surface transition-colors"
        >
          Apply
        </button>
        {params.type && (
          <Link
            href="/platform/activity"
            className="h-9 px-3 inline-flex items-center text-sm text-ink-mute hover:text-ink transition-colors"
          >
            Reset
          </Link>
        )}
      </form>

      {docs.length === 0 ? (
        <div className="rounded-lg border border-border bg-canvas-2/50 p-10 text-center">
          <p className="font-sans text-lg text-ink mb-2">No activity yet</p>
          <p className="text-sm text-ink-soft max-w-md mx-auto">
            Activities are written automatically when you change a contact&rsquo;s
            stage, add a note, or log a call/email from a contact detail page.
          </p>
        </div>
      ) : (
        <>
          <ol className="space-y-2 mb-6">
            {docs.map((a) => (
              <li
                key={a.id}
                className="rounded-lg border border-border bg-canvas-2/40 p-4"
              >
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {typeLabel(a.type)}
                  </span>
                  {a.contact?.fullName && (
                    <Link
                      href={`/platform/contacts/${a.contact.id}`}
                      className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute hover:text-ink transition-colors"
                    >
                      {a.contact.fullName}
                    </Link>
                  )}
                  <span className="flex-1 h-px bg-border/50" />
                  <span className="font-mono text-[10px] text-ink-dim">
                    {new Date(a.createdAt).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "short",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm text-ink leading-snug">{a.summary}</p>
                {a.detail && (
                  <p className="text-sm text-ink-soft whitespace-pre-wrap leading-relaxed mt-1.5">
                    {a.detail}
                  </p>
                )}
              </li>
            ))}
          </ol>

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] text-ink-mute uppercase tracking-wider">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/platform/activity?${new URLSearchParams({
                      ...(params.type ? { type: params.type } : {}),
                      page: String(page - 1),
                    })}`}
                    className="h-8 px-3 inline-flex items-center text-sm text-ink-soft border border-border rounded-md hover:bg-canvas-2 transition-colors"
                  >
                    ← Previous
                  </Link>
                )}
                {page < totalPages && (
                  <Link
                    href={`/platform/activity?${new URLSearchParams({
                      ...(params.type ? { type: params.type } : {}),
                      page: String(page + 1),
                    })}`}
                    className="h-8 px-3 inline-flex items-center text-sm text-ink-soft border border-border rounded-md hover:bg-canvas-2 transition-colors"
                  >
                    Next →
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
