import { getPayload } from "payload";
import config from "@/payload.config.ts";
import { PIPELINE_STAGES, type PipelineStageId } from "@/config/pipeline";
import { KanbanBoard } from "@/components/platform/KanbanBoard";

export const dynamic = "force-dynamic";

interface RawContact {
  id: string | number;
  fullName?: string;
  email?: string;
  role?: string;
  stage?: PipelineStageId;
  company?: { name?: string } | null;
}

async function getContactsByStage() {
  const empty = Object.fromEntries(
    PIPELINE_STAGES.map((s) => [s.id, []])
  ) as unknown as Record<PipelineStageId, RawContact[]>;

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "contacts",
      sort: "-updatedAt",
      limit: 500,
      depth: 1,
    });

    const byStage = { ...empty };
    for (const doc of result.docs as unknown as RawContact[]) {
      const stage = (doc.stage ?? "cold") as PipelineStageId;
      if (!byStage[stage]) byStage[stage] = [];
      byStage[stage].push(doc);
    }
    return byStage;
  } catch (err) {
    console.error("[platform.pipeline] fetch failed", err);
    return empty;
  }
}

export default async function PipelinePage() {
  const byStage = await getContactsByStage();
  const total = Object.values(byStage).reduce((sum, arr) => sum + arr.length, 0);

  // Map to the KanbanBoard's expected shape
  const columns = Object.fromEntries(
    PIPELINE_STAGES.map((s) => [
      s.id,
      (byStage[s.id] ?? []).map((c) => ({
        id: c.id,
        fullName: c.fullName,
        email: c.email,
        role: c.role,
        companyName: c.company?.name,
      })),
    ])
  ) as Parameters<typeof KanbanBoard>[0]["initialColumns"];

  return (
    <div className="px-8 py-10">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h1 className="font-sans font-medium text-3xl tracking-tight text-ink mb-1">
            Pipeline
          </h1>
          <p className="text-sm text-ink-mute">
            {total.toLocaleString("en-GB")} contacts across{" "}
            {PIPELINE_STAGES.length} stages, drag between columns to move
          </p>
        </div>
      </div>

      <KanbanBoard initialColumns={columns} />
    </div>
  );
}
