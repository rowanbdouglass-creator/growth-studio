"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor + pen trail. Renders only for users on hover-capable
 * devices, who haven't requested reduced motion, and who are currently
 * driving with a pointer (not keyboard).
 *
 * Styles live in globals.css (#ylb-cursor and #ylb-trail). This
 * component only mounts the DOM elements and wires the behaviour.
 *
 * Cursor morph hints: add `data-cur="pen"`, `data-cur="hold"`, or
 * `data-cur="slot"` to any element to morph the cursor on hover.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hoverCapable = window.matchMedia("(hover: hover)").matches;
    if (reducedMotion || !hoverCapable) return;

    // Mark body so the CSS knows to hide the default cursor
    document.body.setAttribute("data-cursor-on", "");

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
    let onResize: (() => void) | null = null;
    let onTrailMove: ((e: PointerEvent) => void) | null = null;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const fit = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      fit();
      onResize = fit;
      window.addEventListener("resize", fit);

      type Pt = { x: number; y: number; life: number };
      let pts: Pt[] = [];

      onTrailMove = (e: PointerEvent) => {
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
        pts = pts.filter((pt) => pt.life > 0.04);
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
      if (mode) cursorRef.current.classList.add(mode);
    };
    const onPointerOut = (e: Event) => {
      const target = e.target as HTMLElement;
      const el = target.closest("[data-cur]") as HTMLElement | null;
      if (!el || !cursorRef.current) return;
      const mode = el.getAttribute("data-cur");
      if (mode) cursorRef.current.classList.remove(mode);
    };
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);

    // Hide custom cursor when keyboard is used; show default
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        document.body.removeAttribute("data-cursor-on");
        if (cursorRef.current) cursorRef.current.style.opacity = "0";
      }
    };
    const onPointerDown = () => {
      document.body.setAttribute("data-cursor-on", "");
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(trailRaf);
      window.removeEventListener("pointermove", onMove);
      if (onResize) window.removeEventListener("resize", onResize);
      if (onTrailMove) window.removeEventListener("pointermove", onTrailMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      document.body.removeAttribute("data-cursor-on");
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} id="ylb-cursor" aria-hidden="true" />
      <canvas ref={canvasRef} id="ylb-trail" aria-hidden="true" />
    </>
  );
}
