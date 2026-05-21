import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config.ts";
import {
  PIPELINE_STAGES,
  LEAD_SOURCES,
  ACTIVITY_TYPES,
  type PipelineStageId,
  type ActivityType,
} from "@/config/pipeline";
import { AddNoteForm } from "@/components/platform/AddNoteForm";
import { StageSelector } from "@/components/platform/StageSelector";
import { QuickLogActivity } from "@/components/platform/QuickLogActivity";

export const dynamic = "force-dynamic";

interface PopulatedContact {
  id: string | number;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  linkedin?: string;
  stage?: PipelineStageId;
  source?: string;
  tags?: { tag: string; id?: string }[];
  lastContactedAt?: string;
  nextActionAt?: string;
  doNotContact?: boolean;
  createdAt?: string;
  updatedAt?: string;
  company?: {
    id: string | number;
    name?: string;
    domain?: string;
    industry?: { name?: string } | null;
  } | null;
  owner?: { id: string | number; name?: string; email?: string } | null;
}

interface ActivityRecord {
  id: string | number;
  type: ActivityType;
  summary: string;
  detail?: string;
  createdAt: string;
  actor?: { id: string | number; name?: string } | null;
}

interface NoteRecord {
  id: string | number;
  subject: string;
  body?: unknown;
  pinned?: boolean;
  createdAt: string;
  author?: { id: string | number; name?: string } | null;
}

type TimelineItem =
  | { kind: "activity"; record: ActivityRecord }
  | { kind: "note"; record: NoteRecord };

async function getContactData(id: string) {
  try {
    const payload = await getPayload({ config });
    const [contact, activities, notes] = await Promise.all([
      payload.findByID({ collection: "contacts", id, depth: 2 }),
      payload.find({
        collection: "activities",
        where: { contact: { equals: id } },
        sort: "-createdAt",
        limit: 200,
        depth: 1,
      }),
      payload.find({
        collection: "notes",
        where: { contact: { equals: id } },
        sort: "-createdAt",
        limit: 100,
        depth: 1,
      }),
    ]);
    return {
      contact: contact as unknown as PopulatedContact,
      activities: activities.docs as unknown as ActivityRecord[],
      notes: notes.docs as unknown as NoteRecord[],
    };
  } catch {
    return null;
  }
}

function activityTypeLabel(type: ActivityType): string {
  return ACTIVITY_TYPES.find((t) => t.value === type)?.label ?? type;
}

function stageMeta(id?: string) {
  return PIPELINE_STAGES.find((s) => s.id === id);
}

function leadSourceLabel(value?: string) {
  return LEAD_SOURCES.find((s) => s.value === value)?.label ?? value ?? "—";
}

function lexicalToPlainText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as Record<string, unknown>;
  if (typeof n.text === "string") return n.text;
  if (Array.isArray(n.children)) {
    return (n.children as unknown[])
      .map((c) => lexicalToPlainText(c))
      .join(" ");
  }
  if (n.root) return lexicalToPlainText(n.root);
  return "";
}

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getContactData(id);
  if (!data) notFound();
  const { contact, activities, notes } = data;

  // Merge activities + notes into a single timeline, newest first
  const timeline: TimelineItem[] = [
    ...activities.map((a) => ({ kind: "activity" as const, record: a })),
    ...notes.map((n) => ({ kind: "note" as const, record: n })),
  ].sort(
    (a, b) =>
      new Date(b.record.createdAt).getTime() -
      new Date(a.record.createdAt).getTime()
  );

  return (
    <div className="px-8 py-10 max-w-6xl">
      {/* Back link */}
      <Link
        href="/platform/contacts"
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute hover:text-accent transition-colors inline-block mb-6"
      >
        ← All contacts
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-6 mb-10 pb-6 border-b border-border">
        <div>
          <h1 className="font-sans font-medium text-3xl text-ink mb-2 tracking-tight">
            {contact.fullName ?? "(unnamed)"}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            {contact.role && <span className="text-ink-soft">{contact.role}</span>}
            {contact.role && contact.company?.name && (
              <span className="text-ink-dim">·</span>
            )}
            {contact.company?.name && (
              <Link
                href={`/admin/collections/companies/${contact.company.id}`}
                className="text-ink-soft hover:text-accent transition-colors"
              >
                {contact.company.name}
              </Link>
            )}
            {contact.email && (
              <>
                <span className="text-ink-dim">·</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-mono text-[12px] text-ink-mute hover:text-accent transition-colors"
                >
                  {contact.email}
                </a>
              </>
            )}
            {contact.phone && (
              <>
                <span className="text-ink-dim">·</span>
                <a
                  href={`tel:${contact.phone}`}
                  className="font-mono text-[12px] text-ink-mute hover:text-accent transition-colors"
                >
                  {contact.phone}
                </a>
              </>
            )}
          </div>
        </div>
        <Link
          href={`/admin/collections/contacts/${contact.id}`}
          className="shrink-0 h-9 px-4 inline-flex items-center text-sm border border-border-strong rounded-md text-ink-soft hover:bg-canvas-2 hover:text-ink transition-colors"
        >
          Edit in Payload
        </Link>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-10">
        {/* LEFT — quick actions + timeline */}
        <div className="space-y-6 min-w-0">
          <div className="grid md:grid-cols-2 gap-4">
            <AddNoteForm contactId={contact.id} />
            <QuickLogActivity contactId={contact.id} />
          </div>

          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                Timeline
              </h2>
              <span className="flex-1 h-px bg-border" />
              <span className="font-mono text-[11px] text-ink-mute">
                {timeline.length}
              </span>
            </div>

            {timeline.length === 0 ? (
              <div className="rounded-lg border border-border bg-canvas-2/40 p-8 text-center text-sm text-ink-mute">
                No activity yet. Add a note or log a call to start the timeline.
              </div>
            ) : (
              <ol className="space-y-3">
                {timeline.map((item) => (
                  <li
                    key={`${item.kind}-${item.record.id}`}
                    className="rounded-lg border border-border bg-canvas-2/40 p-4"
                  >
                    {item.kind === "activity" ? (
                      <ActivityRow record={item.record} />
                    ) : (
                      <NoteRow record={item.record} />
                    )}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>

        {/* RIGHT — sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-6 lg:h-fit">
          <div className="rounded-lg border border-border bg-canvas-2/40 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute mb-3">
              Stage
            </p>
            <StageSelector
              contactId={contact.id}
              currentStage={contact.stage}
            />
          </div>

          <SidebarSection
            label="Source"
            value={leadSourceLabel(contact.source)}
          />
          <SidebarSection
            label="Owner"
            value={contact.owner?.name ?? contact.owner?.email ?? "—"}
          />
          <SidebarSection
            label="Last contacted"
            value={
              contact.lastContactedAt
                ? new Date(contact.lastContactedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "—"
            }
          />
          <SidebarSection
            label="Next action"
            value={
              contact.nextActionAt
                ? new Date(contact.nextActionAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "—"
            }
          />
          {contact.doNotContact && (
            <div className="rounded-lg border border-accent/40 bg-accent-soft p-3 text-xs text-ink">
              Do not contact · GDPR / manual unsubscribe
            </div>
          )}
          {contact.tags && contact.tags.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute mb-2">
                Tags
              </p>
              <div className="flex flex-wrap gap-1.5">
                {contact.tags.map((t, i) => (
                  <span
                    key={t.id ?? i}
                    className="px-2 py-0.5 rounded-sm font-mono text-[10px] uppercase tracking-wider bg-canvas border border-border text-ink-soft"
                  >
                    {t.tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="pt-4 border-t border-border text-[11px] font-mono text-ink-dim leading-relaxed">
            <p>
              Created{" "}
              {contact.createdAt &&
                new Date(contact.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
            </p>
            <p>
              Updated{" "}
              {contact.updatedAt &&
                new Date(contact.updatedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );

  function ActivityRow({ record }: { record: ActivityRecord }) {
    return (
      <div>
        <div className="flex items-baseline gap-3 mb-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            {activityTypeLabel(record.type)}
          </span>
          <span className="flex-1 h-px bg-border/50" />
          <span className="font-mono text-[10px] text-ink-dim">
            {new Date(record.createdAt).toLocaleString("en-GB", {
              day: "numeric",
              month: "short",
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
        </div>
        <p className="text-sm text-ink mb-1">{record.summary}</p>
        {record.detail && (
          <p className="text-sm text-ink-soft whitespace-pre-wrap leading-relaxed">
            {record.detail}
          </p>
        )}
        {record.actor?.name && (
          <p className="font-mono text-[10px] text-ink-dim mt-2">
            by {record.actor.name}
          </p>
        )}
      </div>
    );
  }

  function NoteRow({ record }: { record: NoteRecord }) {
    const bodyText = lexicalToPlainText(record.body).trim();
    return (
      <div>
        <div className="flex items-baseline gap-3 mb-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            {record.pinned ? "Pinned note" : "Note"}
          </span>
          <span className="flex-1 h-px bg-border/50" />
          <span className="font-mono text-[10px] text-ink-dim">
            {new Date(record.createdAt).toLocaleString("en-GB", {
              day: "numeric",
              month: "short",
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
        </div>
        <p className="text-sm text-ink mb-1 font-medium">{record.subject}</p>
        {bodyText && (
          <p className="text-sm text-ink-soft whitespace-pre-wrap leading-relaxed">
            {bodyText}
          </p>
        )}
      </div>
    );
  }
}

function SidebarSection({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute mb-1.5">
        {label}
      </p>
      <p className="text-sm text-ink-soft">{value}</p>
    </div>
  );
}
