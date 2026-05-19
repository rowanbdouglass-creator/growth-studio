"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedTerminalProps {
  lines: { prompt?: string; text: string; output?: string }[];
}

/**
 * Animated terminal: types each command + output. Triggers when
 * scrolled into view. Restarts on re-entry.
 */
export function AnimatedTerminal({ lines }: AnimatedTerminalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(true);
            if (reduced) setStep(lines.length); // skip animation
          } else {
            // reset so it can replay on re-entry
            setActive(false);
            setStep(0);
            setTyped("");
            setShowOutput(false);
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [lines.length]);

  useEffect(() => {
    if (!active) return;
    if (step >= lines.length) return;
    const line = lines[step];
    let i = 0;
    setTyped("");
    setShowOutput(false);
    const typeId = setInterval(() => {
      if (i >= line.text.length) {
        clearInterval(typeId);
        setShowOutput(true);
        const next = setTimeout(() => setStep((s) => s + 1), 1200);
        return () => clearTimeout(next);
      }
      setTyped(line.text.slice(0, ++i));
    }, 26);
    return () => clearInterval(typeId);
  }, [active, step, lines]);

  return (
    <div
      ref={ref}
      className="relative rounded-xl border border-border-strong overflow-hidden font-mono text-sm"
      style={{
        backgroundColor: "oklch(0.09 0.006 260 / 0.95)",
        boxShadow:
          "0 30px 80px -20px oklch(0 0 0 / 0.6), 0 0 0 1px oklch(1 0 0 / 0.03) inset",
      }}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-canvas-2/60">
        <span className="w-2 h-2 rounded-full bg-ink-mute/40" />
        <span className="w-2 h-2 rounded-full bg-ink-mute/40" />
        <span className="w-2 h-2 rounded-full bg-ink-mute/40" />
        <span className="ml-3 text-[10px] uppercase tracking-[0.18em] text-ink-dim">
          growth.studio/cli
        </span>
      </div>
      <pre className="px-5 py-5 leading-relaxed text-ink-soft min-h-[220px] whitespace-pre-wrap break-words">
        {lines.slice(0, step).map((l, idx) => (
          <span key={idx}>
            <span className="text-accent">$ </span>
            <span className="text-ink">{l.text}</span>
            {"\n"}
            {l.output ? (
              <span className="text-ink-mute">
                {l.output}
                {"\n"}
              </span>
            ) : null}
          </span>
        ))}
        {active && step < lines.length && (
          <span>
            <span className="text-accent">$ </span>
            <span className="text-ink">{typed}</span>
            <span className="terminal-caret text-accent">▌</span>
            {showOutput && lines[step].output ? (
              <>
                {"\n"}
                <span className="text-ink-mute">{lines[step].output}</span>
              </>
            ) : null}
          </span>
        )}
      </pre>
    </div>
  );
}
