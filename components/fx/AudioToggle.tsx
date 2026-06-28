"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ambient audio toggle. Off by default. Loops a low-frequency synth /
 * paper-rustle drone when on. Persists choice in sessionStorage so
 * it doesn't restart on internal nav.
 *
 * Expects `/audio/ambient.mp3` to exist in `public/` — falls back to
 * silent toggle if missing (button still toggles state, just no sound).
 */
export function AudioToggle() {
  const [on, setOn] = useState(false);
  const [available, setAvailable] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("ylb-audio-on");
    if (stored === "1") setOn(true);
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio("/audio/ambient.mp3");
      a.loop = true;
      a.volume = 0.22;
      a.preload = "auto";
      a.addEventListener("error", () => setAvailable(false));
      audioRef.current = a;
    }
    if (on) {
      audioRef.current.play().catch(() => setAvailable(false));
      sessionStorage.setItem("ylb-audio-on", "1");
    } else {
      audioRef.current.pause();
      sessionStorage.setItem("ylb-audio-on", "0");
    }
  }, [on]);

  return (
    <button
      onClick={() => setOn((v) => !v)}
      data-magnetic=""
      aria-label={on ? "Mute ambient audio" : "Play ambient audio"}
      aria-pressed={on}
      title={available ? (on ? "Ambient audio on" : "Ambient audio off") : "Ambient audio unavailable"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px 8px 8px",
        background: "transparent",
        border: "1px solid var(--color-hairline-strong)",
        borderRadius: 999,
        color: "var(--color-paper)",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        fontWeight: 600,
        cursor: "pointer",
        transition: "border-color 0.3s ease, background 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-red)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-hairline-strong)";
      }}
    >
      <span
        aria-hidden
        style={{
          display: "inline-grid",
          placeItems: "center",
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: on ? "var(--color-red)" : "transparent",
          border: on ? "0" : "1px solid var(--color-hairline-strong)",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        {on ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              height: 10,
            }}
          >
            <i style={{ width: 1.5, height: 5, background: "var(--color-paper)", animation: "ylb-bar 0.9s ease-in-out infinite" }} />
            <i style={{ width: 1.5, height: 8, background: "var(--color-paper)", animation: "ylb-bar 0.7s ease-in-out infinite 0.12s" }} />
            <i style={{ width: 1.5, height: 4, background: "var(--color-paper)", animation: "ylb-bar 0.8s ease-in-out infinite 0.24s" }} />
          </span>
        ) : (
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--color-paper)",
              opacity: 0.4,
            }}
          />
        )}
      </span>
      <span>{on ? "Sound on" : "Sound"}</span>
      <style>{`@keyframes ylb-bar { 0%,100% { transform: scaleY(0.4) } 50% { transform: scaleY(1) } }`}</style>
    </button>
  );
}
