"use client";

export interface ParsedRefinement {
  priorities: string[];
  stack: string | null;
  pitch: string | null;
}

export function parseRefinement(text: string): ParsedRefinement {
  const find = (marker: string, nextMarker?: string) => {
    const i = text.indexOf(marker);
    if (i === -1) return null;
    const start = i + marker.length;
    const end = nextMarker ? text.indexOf(nextMarker, start) : -1;
    return text.slice(start, end === -1 ? text.length : end).trim();
  };

  const prioritiesBlock = find("[PRIORITIES]", "[STACK]") ?? "";
  const stack = find("[STACK]", "[PITCH]");
  const pitch = find("[PITCH]");

  const priorities = prioritiesBlock
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^\d+\.\s/.test(l))
    .map((l) => l.replace(/^\d+\.\s*/, ""));

  return { priorities, stack, pitch };
}

export function TailoredSummary({
  text,
  streaming,
}: {
  text: string;
  streaming: boolean;
}) {
  const { priorities, stack, pitch } = parseRefinement(text);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-accent/40 bg-canvas-2/40 p-6 md:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-2">
          Your tailored next steps
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-text-primary tracking-tight mb-6">
          Top three moves
        </h2>

        {priorities.length === 0 && streaming && (
          <div className="flex items-center gap-2 text-text-tertiary text-[11px] font-mono uppercase tracking-[0.18em]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Personalising…
          </div>
        )}

        <ol className="space-y-4">
          {priorities.map((p, i) => (
            <li key={i} className="flex gap-4">
              <span className="font-serif text-2xl text-accent/60 tabular-nums shrink-0 leading-none mt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[15px] text-text-primary leading-relaxed">{p}</p>
            </li>
          ))}
        </ol>
      </div>

      {stack && (
        <div className="rounded-2xl border border-border bg-canvas-2/40 p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-2">
            Systems we'd recommend
          </p>
          <h3 className="font-serif text-xl text-text-primary tracking-tight mb-3">
            Stack to close the gaps
          </h3>
          <p className="text-[14px] text-text-secondary leading-relaxed">
            {stack}
          </p>
        </div>
      )}

      {pitch && (
        <div className="rounded-2xl border border-accent/40 bg-canvas-2/60 p-6 md:p-8">
          <p className="text-[15px] text-text-primary leading-relaxed mb-5">
            {pitch}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:hello@youlookbooked.com?subject=Discovery%20call%20after%20website%20audit"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-accent text-canvas text-sm font-medium hover:bg-accent-hover transition-colors"
            >
              Book discovery call →
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-md border border-border-strong text-sm text-text-primary hover:bg-canvas-2 transition-colors"
            >
              Send a message instead
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
