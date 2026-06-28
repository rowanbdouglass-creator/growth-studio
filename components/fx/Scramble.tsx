"use client";

import { useEffect, useRef, useState } from "react";

interface ScrambleProps {
  /** The text to land on */
  final: string;
  /** Characters to randomise through */
  pool?: string;
  /** ms between scramble bursts */
  intervalMs?: number;
  /** ms each scramble burst takes */
  durationMs?: number;
  /** If true, only scramble once on view; otherwise repeat */
  once?: boolean;
  /** Render inline (for use inside an h2 etc.) */
  inline?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Text that scrambles into place. Either one-shot (on view) or
 * periodically re-scrambles. Lo-tech: replaces chars with random
 * pool members and resolves char-by-char left to right.
 */
export function Scramble({
  final,
  pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*",
  intervalMs = 4000,
  durationMs = 500,
  once = false,
  inline = false,
  className,
  style,
}: ScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(final);

  useEffect(() => {
    if (!ref.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setText(final);
      return;
    }

    let frameId = 0;
    let intervalId = 0;
    let running = false;

    const scrambleOnce = () => {
      if (running) return;
      running = true;
      const start = performance.now();
      const tick = () => {
        const elapsed = performance.now() - start;
        const progress = Math.min(elapsed / durationMs, 1);
        const resolved = Math.floor(progress * final.length);
        let out = "";
        for (let i = 0; i < final.length; i++) {
          if (i < resolved) out += final[i];
          else if (final[i] === " ") out += " ";
          else out += pool[Math.floor(Math.random() * pool.length)];
        }
        setText(out);
        if (progress < 1) {
          frameId = requestAnimationFrame(tick);
        } else {
          setText(final);
          running = false;
        }
      };
      frameId = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        scrambleOnce();
        if (!once) {
          intervalId = window.setInterval(scrambleOnce, intervalMs);
        }
        io.disconnect();
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frameId);
      clearInterval(intervalId);
    };
  }, [final, pool, intervalMs, durationMs, once]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: inline ? "inline-block" : undefined,
        fontVariantNumeric: "tabular-nums",
        ...style,
      }}
    >
      {text}
    </span>
  );
}
