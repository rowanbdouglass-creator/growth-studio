"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  DndContext,
  useDraggable,
  useDroppable,
  type DragEndEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { PIPELINE_STAGES, type PipelineStageId } from "@/config/pipeline";
import { moveContactToStage } from "@/lib/actions/crm";

interface ContactCard {
  id: string | number;
  fullName?: string;
  email?: string;
  role?: string;
  companyName?: string;
}

interface KanbanBoardProps {
  initialColumns: Record<PipelineStageId, ContactCard[]>;
}

export function KanbanBoard({ initialColumns }: KanbanBoardProps) {
  const [columns, setColumns] = useState(initialColumns);
  const [, startTransition] = useTransition();
  const [moving, setMoving] = useState<string | number | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    kind: "ok" | "err";
  } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor)
  );

  function handleDragEnd(event: DragEndEvent) {
    const contactId = event.active.id as string | number;
    const targetStage = event.over?.id as PipelineStageId | undefined;
    if (!targetStage) return;

    // Find which column the contact is currently in
    let sourceStage: PipelineStageId | undefined;
    for (const [stage, cards] of Object.entries(columns)) {
      if (cards.some((c) => c.id === contactId)) {
        sourceStage = stage as PipelineStageId;
        break;
      }
    }
    if (!sourceStage || sourceStage === targetStage) return;

    // Optimistic UI: move the card immediately
    const card = columns[sourceStage].find((c) => c.id === contactId);
    if (!card) return;

    setMoving(contactId);
    setColumns((prev) => ({
      ...prev,
      [sourceStage!]: prev[sourceStage!].filter((c) => c.id !== contactId),
      [targetStage]: [card, ...prev[targetStage]],
    }));

    startTransition(async () => {
      const result = await moveContactToStage(contactId, targetStage);
      setMoving(null);
      if (result.status === "error") {
        // Revert
        setColumns(initialColumns);
        setToast({ message: result.message ?? "Move failed", kind: "err" });
      } else {
        setToast({ message: result.message ?? "Moved", kind: "ok" });
      }
      setTimeout(() => setToast(null), 2500);
    });
  }

  return (
    <div className="relative">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-fit">
            {PIPELINE_STAGES.map((stage) => (
              <Column
                key={stage.id}
                stage={stage.id}
                label={stage.label}
                description={stage.description}
                cards={columns[stage.id] ?? []}
                movingId={moving}
              />
            ))}
          </div>
        </div>
      </DndContext>

      {toast && (
        <div
          role="status"
          className={`fixed bottom-6 right-6 px-4 py-2 rounded-md border text-sm font-mono uppercase tracking-[0.16em] ${
            toast.kind === "ok"
              ? "bg-canvas-2 border-accent/40 text-accent"
              : "bg-canvas-2 border-border text-ink-mute"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

function Column({
  stage,
  label,
  description,
  cards,
  movingId,
}: {
  stage: PipelineStageId;
  label: string;
  description?: string;
  cards: ContactCard[];
  movingId: string | number | null;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col w-[260px] shrink-0 rounded-lg border bg-canvas-2/40 transition-colors ${
        isOver ? "border-accent" : "border-border"
      }`}
    >
      <div className="px-3 py-3 border-b border-border">
        <div className="flex items-center justify-between mb-0.5">
          <h3 className="font-sans font-medium text-sm text-ink">{label}</h3>
          <span className="font-mono text-[10px] text-ink-mute tabular-nums">
            {cards.length}
          </span>
        </div>
        {description && (
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-dim leading-snug">
            {description}
          </p>
        )}
      </div>

      <div className="flex-1 p-2 space-y-2 min-h-[200px]">
        {cards.length === 0 ? (
          <div className="text-center py-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
              Empty
            </p>
          </div>
        ) : (
          cards.map((card) => (
            <Card key={card.id} card={card} moving={movingId === card.id} />
          ))
        )}
      </div>
    </div>
  );
}

function Card({ card, moving }: { card: ContactCard; moving: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: card.id });

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging || moving ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`rounded-md border bg-canvas p-3 cursor-grab active:cursor-grabbing transition-colors ${
        isDragging
          ? "border-accent shadow-lg"
          : "border-border hover:border-border-strong"
      }`}
    >
      <Link
        href={`/platform/contacts/${card.id}`}
        onClick={(e) => {
          // Don't follow link while drag-init
          if (isDragging) e.preventDefault();
        }}
        className="block"
      >
        <p className="text-sm text-ink font-medium leading-snug">
          {card.fullName ?? "(unnamed)"}
        </p>
        {card.role && (
          <p className="text-xs text-ink-soft mt-0.5 leading-snug">
            {card.role}
            {card.companyName && (
              <>
                <span className="text-ink-dim mx-1">·</span>
                {card.companyName}
              </>
            )}
          </p>
        )}
        {!card.role && card.companyName && (
          <p className="text-xs text-ink-soft mt-0.5">{card.companyName}</p>
        )}
        {card.email && (
          <p className="font-mono text-[10px] text-ink-mute mt-1.5 truncate">
            {card.email}
          </p>
        )}
      </Link>
    </div>
  );
}
