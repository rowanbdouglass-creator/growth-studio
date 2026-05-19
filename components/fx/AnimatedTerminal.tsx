"use client";

import { useEffect, useState } from "react";

interface AnimatedTerminalProps {
  lines: { prompt?: string; text: string; output?: string }[];
}

/**
 * Animated terminal that types out a sequence of commands +
 * outputs. Loops. Designed to feel like a real automation running.
 */
export function AnimatedTerminal({ lines }: AnimatedTerminalProps) {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (step >= lines.length) {
      const t = setTimeout(() => {
        setStep(0);
        setTyped("");
        setShowOutput(false);
      }, 4000);
      return () => clearTimeout(t);
    }
    const line = lines[step];
    let i = 0;
    setTyped("");
    setShowOutput(false);
    const typeId = setInterval(() => {
      if (i >= line.text.length) {
        clearInterval(typeId);
        setShowOutput(true);
        const next = setTimeout(() => setStep((s) => s + 1), 1400);
        return () => clearTimeout(next);
      }
      setTyped(line.text.slice(0, ++i));
    }, 28);
    return () => clearInterval(typeId);
  }, [step, lines]);

  return (
    <div
      className="relative rounded-xl border border-border-strong overflow-hidden font-mono text-sm"
      style={{
        backgroundColor: "oklch(0.10 0.012 290 / 0.92)",
        boxShadow:
          "0 30px 80px -20px oklch(0 0 0 / 0.6), 0 0 0 1px oklch(1 0 0 / 0.03) inset",
      }}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-canvas-2/40">
        <span className="w-2.5 h-2.5 rounded-full bg-amber/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-indigo/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-magenta/70" />
        <span className="ml-3 text-[10px] uppercase tracking-[0.16em] text-ink-dim">
          growth.studio/cli
        </span>
      </div>
      <pre className="px-5 py-4 leading-relaxed text-ink-soft min-h-[200px] whitespace-pre-wrap break-words">
        {lines.slice(0, step).map((l, idx) => (
          <span key={idx}>
            <span className="text-amber">$ </span>
            <span className="text-ink">{l.text}</span>
            {"\n"}
            {l.output ? (
              <span className="text-ink-mute">{l.output}{"\n"}</span>
            ) : null}
          </span>
        ))}
        {step < lines.length && (
          <span>
            <span className="text-amber">$ </span>
            <span className="text-ink">{typed}</span>
            <span className="terminal-caret text-amber">▌</span>
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
