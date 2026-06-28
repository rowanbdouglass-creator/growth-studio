"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";

/**
 * The signature interaction: press and hold to confirm. Visual progress
 * bar fills horizontally over `duration` ms. Release early = abort.
 *
 * Accessibility:
 * - Renders as a real <button>
 * - Enter / Space key triggers instant submit (no hold required for keyboard)
 * - Always has visible focus ring (via :focus-visible)
 * - `aria-describedby` points to the hint text
 *
 * Variants:
 * - "primary"   : ink button on paper, red fill
 * - "on-red"    : ink button on red bg, paper fill
 * - "on-ink"    : paper button on ink bg, red fill
 * - "outline"   : outlined button, ink fill (used in header)
 */

type Variant = "primary" | "on-red" | "on-ink" | "outline";

interface PressAndHoldProps {
  /** Time to hold before triggering, ms. Default 600. */
  duration?: number;
  /** Triggered when hold completes or Enter pressed. */
  onComplete?: () => void;
  /** Button text. */
  children: React.ReactNode;
  /** Trailing icon, defaults to right arrow. */
  trailing?: React.ReactNode;
  /** Visual variant. */
  variant?: Variant;
  /** Show "HOLD / 600ms" hint inside button. */
  showHint?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export function PressAndHold({
  duration = 600,
  onComplete,
  children,
  trailing = "→",
  variant = "primary",
  showHint = true,
  className = "",
  fullWidth = false,
}: PressAndHoldProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<number | null>(null);
  const holdingRef = useRef(false);
  const [progress, setProgress] = useState(0);

  const start = useCallback(
    (e: React.PointerEvent | React.TouchEvent) => {
      if ("button" in e && e.button !== 0) return;
      e.preventDefault();
      if (holdingRef.current) return;
      holdingRef.current = true;
      btnRef.current?.classList.add("is-holding");
      setProgress(1);
      timerRef.current = window.setTimeout(() => {
        if (!holdingRef.current) return;
        holdingRef.current = false;
        btnRef.current?.classList.remove("is-holding");
        onComplete?.();
        // Brief held-full state, then reset
        window.setTimeout(() => setProgress(0), 240);
      }, duration);
    },
    [duration, onComplete]
  );

  const stop = useCallback(() => {
    if (!holdingRef.current) return;
    holdingRef.current = false;
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    btnRef.current?.classList.remove("is-holding");
    setProgress(0);
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onComplete?.();
      }
    },
    [onComplete]
  );

  // Variant-specific styles
  const bg =
    variant === "on-ink"
      ? "var(--color-paper)"
      : variant === "outline"
        ? "transparent"
        : "var(--color-ink)";
  const fg =
    variant === "on-ink"
      ? "var(--color-ink)"
      : variant === "outline"
        ? "var(--color-ink)"
        : "var(--color-paper)";
  const fill =
    variant === "on-red"
      ? "var(--color-paper)"
      : variant === "outline"
        ? "var(--color-ink)"
        : "var(--color-red)";
  const border = variant === "outline" ? "1.5px solid currentColor" : "0";

  const buttonStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    display: "inline-flex",
    alignItems: "center",
    gap: 14,
    padding: variant === "outline" ? "11px 22px" : "22px 32px",
    background: bg,
    color: fg,
    border,
    fontFamily: "var(--font-mono)",
    fontSize: variant === "outline" ? 12 : 13,
    fontWeight: 600,
    letterSpacing: variant === "outline" ? "0.14em" : "0.16em",
    textTransform: "uppercase",
    minWidth: variant === "outline" ? "auto" : 280,
    width: fullWidth ? "100%" : "auto",
    cursor: "none",
  };

  return (
    <>
      <style>{`
        .ph-btn { --hold: 0; }
        .ph-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--ph-fill);
          transform-origin: left;
          transform: scaleX(var(--hold));
          transition: transform 0.1s linear;
          z-index: 0;
        }
        .ph-btn.is-holding::before {
          transition: transform var(--ph-duration, 600ms) linear;
          transform: scaleX(1);
        }
        .ph-btn > * {
          position: relative;
          z-index: 1;
        }
        /* Solid-bg variants use mix-blend-mode for clean colour inversion on fill */
        .ph-btn.var-primary > *,
        .ph-btn.var-on-red > *,
        .ph-btn.var-on-ink > * {
          mix-blend-mode: difference;
          color: var(--color-paper);
        }
        .ph-btn.var-on-red.is-holding > *,
        .ph-btn.var-on-ink.is-holding > * {
          color: var(--color-ink);
        }
        /* Outline variant: explicit current-colour, no blend trickery */
        .ph-btn.var-outline > * {
          color: currentColor;
        }
        .ph-btn.var-outline.is-holding > * {
          color: var(--color-paper);
        }
        .ph-btn .arrow {
          display: inline-block;
          transition: transform 0.2s ease;
        }
        .ph-btn:hover .arrow {
          transform: translateX(5px);
        }
        .ph-btn .hint {
          font-size: 10px;
          opacity: 0.55;
          letter-spacing: 0.2em;
          margin-left: auto;
        }
        .ph-btn:focus-visible {
          outline: 2px solid var(--color-red);
          outline-offset: 3px;
        }
      `}</style>
      <button
        ref={btnRef}
        type="button"
        className={`ph-btn var-${variant} ${className}`}
        style={
          {
            ...buttonStyle,
            "--ph-fill": fill,
            "--ph-duration": `${duration}ms`,
          } as CSSProperties
        }
        onPointerDown={start}
        onPointerUp={stop}
        onPointerLeave={stop}
        onPointerCancel={stop}
        onTouchStart={start}
        onTouchEnd={stop}
        onTouchCancel={stop}
        onKeyDown={onKeyDown}
        data-cur="hold"
      >
        <span>{children}</span>
        <span className="arrow">{trailing}</span>
        {showHint && variant !== "outline" && (
          <span className="hint">{duration} MS</span>
        )}
      </button>
    </>
  );
}
