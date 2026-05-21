"use client";

import { useState } from "react";
import type { AuditQuestion } from "@/lib/audit/website/parseReport";

export interface QAAnswer {
  prompt: string;
  category: string;
  selectedOptions: string[];
  elaboration: string;
}

export function QAExperience({
  questions,
  onComplete,
}: {
  questions: AuditQuestion[];
  onComplete: (answers: QAAnswer[]) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<QAAnswer[]>(() =>
    questions.map((q) => ({
      prompt: q.prompt,
      category: q.category,
      selectedOptions: [],
      elaboration: "",
    }))
  );

  if (!questions.length) {
    return (
      <div className="rounded-xl border border-border bg-canvas-2/40 p-6">
        <p className="text-text-secondary">
          No follow-up questions generated for this audit.
        </p>
      </div>
    );
  }

  const current = questions[idx];
  const currentAnswer = answers[idx];

  function toggleOption(option: string) {
    setAnswers((prev) => {
      const next = [...prev];
      const sel = next[idx].selectedOptions;
      next[idx] = {
        ...next[idx],
        selectedOptions: sel.includes(option)
          ? sel.filter((o) => o !== option)
          : [...sel, option],
      };
      return next;
    });
  }

  function setElaboration(text: string) {
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], elaboration: text };
      return next;
    });
  }

  function next() {
    if (idx < questions.length - 1) {
      setIdx(idx + 1);
    } else {
      onComplete(answers);
    }
  }

  function back() {
    if (idx > 0) setIdx(idx - 1);
  }

  function skip() {
    next();
  }

  const hasAnswer =
    currentAnswer.selectedOptions.length > 0 ||
    currentAnswer.elaboration.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-1.5">
        {questions.map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < idx
                ? "bg-accent"
                : i === idx
                  ? "bg-accent/60"
                  : "bg-border"
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary">
        <span>
          Question {idx + 1} of {questions.length}
        </span>
        <span className="text-accent">{current.category}</span>
      </div>

      {/* Question */}
      <div className="rounded-2xl border border-border bg-canvas-2/40 p-6 md:p-8">
        <p className="font-serif text-2xl md:text-3xl text-text-primary leading-snug tracking-tight mb-6">
          {current.prompt}
        </p>

        {current.options.length > 0 && (
          <div className="space-y-2 mb-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-2">
              Pick what fits (can choose multiple)
            </p>
            <div className="flex flex-wrap gap-2">
              {current.options.map((opt) => {
                const selected = currentAnswer.selectedOptions.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleOption(opt)}
                    className={`h-10 px-4 rounded-full border text-sm transition-all ${
                      selected
                        ? "border-accent bg-accent/10 text-text-primary"
                        : "border-border bg-canvas hover:border-border-strong text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {selected && <span className="text-accent mr-2">✓</span>}
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {current.allowElaborate && (
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary">
              Or tell us more
            </p>
            <textarea
              value={currentAnswer.elaboration}
              onChange={(e) => setElaboration(e.target.value)}
              placeholder="Type your answer here…"
              rows={3}
              className="w-full px-3 py-2 bg-canvas border border-border rounded-md text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors resize-none leading-relaxed"
            />
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={back}
          disabled={idx === 0}
          className="h-10 px-4 text-sm text-text-secondary hover:text-text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
        <div className="flex items-center gap-3">
          {!hasAnswer && (
            <button
              type="button"
              onClick={skip}
              className="h-10 px-4 text-sm text-text-tertiary hover:text-text-primary transition-colors"
            >
              Skip
            </button>
          )}
          <button
            type="button"
            onClick={next}
            disabled={!hasAnswer}
            className="h-10 px-5 rounded-md bg-accent text-canvas text-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {idx === questions.length - 1 ? "Generate tailored report →" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
