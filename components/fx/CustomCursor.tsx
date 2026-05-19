"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "link" | "text" | "input" | "view";

/**
 * Adaptive cursor: a small silver dot that follows the pointer with
 * spring easing. Expands and changes label based on the element under
 * the cursor — "view" on cards, "→" on links, text-bar on inputs.
 *
 * Disabled entirely on touch and reduced-motion. The system cursor
 * is hidden via .has-custom-cursor class on <html>.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    let rafId: number | null = null;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: target.x, y: target.y };
    const dotPos = { x: target.x, y: target.y };

    function tick() {
      // Dot follows tightly, ring lags
      dotPos.x += (target.x - dotPos.x) * 0.6;
      dotPos.y += (target.y - dotPos.y) * 0.6;
      ringPos.x += (target.x - ringPos.x) * 0.15;
      ringPos.y += (target.y - ringPos.y) * 0.15;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.x - 3}px, ${dotPos.y - 3}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.x - 24}px, ${ringPos.y - 24}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    function onMove(e: PointerEvent) {
      target.x = e.clientX;
      target.y = e.clientY;
    }

    function evaluateMode(el: Element | null): { mode: CursorMode; label: string } {
      if (!el) return { mode: "default", label: "" };
      const interactive = el.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor-mode]'
      );
      if (!interactive) return { mode: "default", label: "" };
      const explicit = interactive.getAttribute("data-cursor-mode") as CursorMode | null;
      const explicitLabel = interactive.getAttribute("data-cursor-label") ?? "";
      if (explicit) return { mode: explicit, label: explicitLabel };
      const tag = interactive.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select")
        return { mode: "input", label: "" };
      if (tag === "a") return { mode: "link", label: "→" };
      if (tag === "button" || interactive.getAttribute("role") === "button")
        return { mode: "link", label: "" };
      return { mode: "default", label: "" };
    }

    function onOver(e: PointerEvent) {
      const next = evaluateMode(e.target as Element);
      setMode(next.mode);
      setLabel(next.label);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Ring scale / colour by mode
  const ringStyle: React.CSSProperties = (() => {
    const base = {
      width: 48,
      height: 48,
      borderRadius: "9999px",
      pointerEvents: "none" as const,
      position: "fixed" as const,
      top: 0,
      left: 0,
      zIndex: 9999,
      transition:
        "width 200ms var(--ease-out-quint), height 200ms var(--ease-out-quint), border-color 200ms",
      mixBlendMode: "difference" as const,
    };
    if (mode === "link")
      return {
        ...base,
        width: 64,
        height: 64,
        border: "1px solid oklch(0.86 0.012 245)",
        backgroundColor: "oklch(0.86 0.012 245 / 0.10)",
      };
    if (mode === "text" || mode === "input")
      return {
        ...base,
        width: 2,
        height: 24,
        borderRadius: 2,
        backgroundColor: "oklch(0.86 0.012 245)",
      };
    if (mode === "view")
      return {
        ...base,
        width: 80,
        height: 80,
        border: "1px solid oklch(0.86 0.012 245 / 0.5)",
        backgroundColor: "oklch(0.86 0.012 245 / 0.06)",
      };
    return {
      ...base,
      border: "1px solid oklch(0.86 0.012 245 / 0.4)",
    };
  })();

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        style={{
          ...ringStyle,
          willChange: "transform, width, height",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {label && mode === "link" && (
          <span
            className="font-mono text-[11px] tracking-[0.16em] uppercase"
            style={{ color: "oklch(0.86 0.012 245)" }}
          >
            {label}
          </span>
        )}
      </div>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "9999px",
          backgroundColor: "oklch(0.86 0.012 245)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
