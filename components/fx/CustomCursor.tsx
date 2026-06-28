"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor + pen trail. Renders only for users on hover-capable
 * devices, who haven't requested reduced motion, and who are currently
 * driving with a pointer (not keyboard). Keyboard users see the default
 * focus indicator via :focus-visible — never both.
 *
 * Cursor morph hints: add `data-cur="pen"`, `data-cur="hold"`, or
 * `data-cur="slot"` to any element to morph the cursor on hover.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hoverCapable = window.matchMedia("(hover: hover)").matches;
    if (reducedMotion || !hoverCapable) return;

    setEnabled(true);

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
    };

    const loop = () => {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    // Pen trail
    const canvas = canvasRef.current;
    let trailRaf = 0;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const fit = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      fit();
      window.addEventListener("resize", fit);

      type Pt = { x: number; y: number; life: number };
      let pts: Pt[] = [];

      const onTrailMove = (e: PointerEvent) => {
        pts.push({ x: e.clientX, y: e.clientY, life: 1 });
        if (pts.length > 120) pts.shift();
      };
      window.addEventListener("pointermove", onTrailMove, { passive: true });

      const paint = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < pts.length - 1; i++) {
          const p = pts[i];
          const q = pts[i + 1];
          p.life *= 0.96;
          if (p.life < 0.04) continue;
          ctx.strokeStyle = `rgba(196, 71, 46, ${p.life * 0.22})`;
          ctx.lineWidth = 1.4 * p.life;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
        pts = pts.filter((p) => p.life > 0.04);
        trailRaf = requestAnimationFrame(paint);
      };
      trailRaf = requestAnimationFrame(paint);
    }

    // Cursor morph on hover via [data-cur]
    const onPointerOver = (e: Event) => {
      const target = e.target as HTMLElement;
      const el = target.closest("[data-cur]") as HTMLElement | null;
      if (!el || !cursorRef.current) return;
      const mode = el.getAttribute("data-cur");
      cursorRef.current.classList.add(mode || "");
    };
    const onPointerOut = (e: Event) => {
      const target = e.target as HTMLElement;
      const el = target.closest("[data-cur]") as HTMLElement | null;
      if (!el || !cursorRef.current) return;
      const mode = el.getAttribute("data-cur");
      cursorRef.current.classList.remove(mode || "");
    };
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);

    // Hide custom cursor when keyboard is used; show default
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        document.body.style.cursor = "auto";
        if (cursorRef.current) cursorRef.current.style.opacity = "0";
      }
    };
    const onPointerDown = () => {
      document.body.style.cursor = "none";
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(trailRaf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        body { cursor: none; }
        @media (hover: none), (prefers-reduced-motion: reduce) {
          body { cursor: auto; }
        }
        #ylb-cursor {
          position: fixed;
          top: 0; left: 0;
          z-index: 9999;
          pointer-events: none;
          width: 14px; height: 14px;
          background: var(--color-red);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition:
            width 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            height 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            border-radius 0.3s ease,
            background 0.2s ease,
            border-color 0.2s ease;
          will-change: transform;
        }
        #ylb-cursor.pen {
          width: 24px; height: 24px;
          border-radius: 0;
          background: var(--color-ink);
          clip-path: polygon(0 0, 100% 50%, 0 100%);
        }
        #ylb-cursor.hold {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: transparent;
          border: 1.5px solid var(--color-red);
        }
        #ylb-cursor.hold::after {
          content: "HOLD";
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--color-red);
          font-weight: 700;
        }
        #ylb-cursor.slot {
          width: 80px; height: 24px;
          border-radius: 0;
          background: var(--color-red);
          opacity: 0.4;
        }
        #ylb-trail {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9998;
        }
      `}</style>
      <div ref={cursorRef} id="ylb-cursor" aria-hidden="true" />
      <canvas ref={canvasRef} id="ylb-trail" aria-hidden="true" />
    </>
  );
}
