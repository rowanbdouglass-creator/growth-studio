"use client";

import { useEffect, useState } from "react";

/**
 * Subtle sound design via Web Audio API. No audio files — synthesised
 * oscillator ticks for clicks. Mute state persists in localStorage.
 *
 * Mounting this component:
 *   - Attaches a delegated `pointerdown` listener that plays a tick
 *     whenever a button, link, or [data-sound] element is interacted with
 *   - Renders a small fixed mute toggle in the bottom-right
 *   - Defaults to MUTED so we never blast audio on a returning visitor
 *     without consent
 */

const STORAGE_KEY = "gs-sound-on";

let audioCtx: AudioContext | null = null;
function getCtx() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
  }
  return audioCtx;
}

function playTick({
  freq = 1100,
  duration = 0.06,
  volume = 0.05,
}: {
  freq?: number;
  duration?: number;
  volume?: number;
} = {}) {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") void ctx.resume();
  const t = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.55, t + duration);

  gain.gain.setValueAtTime(volume, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

export function SoundFx() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Read persisted preference after mount (avoid hydration mismatch)
  useEffect(() => {
    setMounted(true);
    try {
      const v = window.localStorage.getItem(STORAGE_KEY);
      if (v === "1") setEnabled(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    function shouldSound(target: Element | null): boolean {
      if (!target) return false;
      return Boolean(
        target.closest(
          'button, a, [role="button"], [data-sound], input[type="submit"]'
        )
      );
    }

    function onDown(e: PointerEvent) {
      if (!shouldSound(e.target as Element)) return;
      // Slight variation so clicks don't sound robotic
      const variance = 0.85 + Math.random() * 0.3;
      playTick({ freq: 1100 * variance, volume: 0.04 });
    }

    function onHover(e: PointerEvent) {
      const t = e.target as Element | null;
      if (!t) return;
      const el = t.closest("a, button, [role=button]");
      if (!el) return;
      // Use a relatedTarget guard so hover-in only triggers when entering
      const previous = e.relatedTarget as Element | null;
      if (previous && el.contains(previous)) return;
      playTick({ freq: 1600, duration: 0.03, volume: 0.012 });
    }

    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerover", onHover);

    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerover", onHover);
    };
  }, [enabled]);

  function toggle() {
    setEnabled((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      if (next) {
        // Play an "on" cue so the user hears it work
        setTimeout(() => playTick({ freq: 1400, volume: 0.05 }), 30);
        setTimeout(() => playTick({ freq: 1900, volume: 0.04 }), 110);
      }
      return next;
    });
  }

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={enabled ? "Mute sound" : "Enable sound"}
      title={enabled ? "Sound on" : "Sound off"}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 h-9 px-3 rounded-full border border-border-strong bg-canvas/70 backdrop-blur-md text-ink-mute hover:text-ink hover:border-accent transition-colors font-mono text-[10px] uppercase tracking-[0.16em]"
      data-cursor-mode="link"
      data-cursor-label="·"
    >
      <span
        className="relative flex w-1.5 h-1.5"
        aria-hidden
      >
        {enabled && (
          <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />
        )}
        <span
          className={`relative w-1.5 h-1.5 rounded-full ${
            enabled ? "bg-accent" : "bg-ink-dim"
          }`}
        />
      </span>
      <span>{enabled ? "Sound" : "Muted"}</span>
    </button>
  );
}
