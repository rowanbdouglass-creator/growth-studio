"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor v2 — context-aware morph, magnetic pull on data-magnetic
 * elements, surface-aware tint. Renders only for hover-capable pointer
 * users without reduced-motion preference. Styles in globals.css.
 *
 * Hooks (on any element):
 *  - data-cur="pen|hold|cell|case"     morph cursor on hover
 *  - data-magnetic                     cursor pulls toward element centre,
 *                                       element shifts subtly toward cursor
 *  - data-surface="dark"               on a section: inverts default cursor
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const magneticRef = useRef<{ el: HTMLElement; bounds: DOMRect } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hoverCapable = window.matchMedia("(hover: hover)").matches;
    if (reducedMotion || !hoverCapable) return;

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
      // Magnetic pull — when over a magnetic target, ease cursor toward the centre
      if (magneticRef.current) {
        const { el, bounds } = magneticRef.current;
        const elCx = bounds.left + bounds.width / 2;
        const elCy = bounds.top + bounds.height / 2;
        // Cursor gets pulled 35% toward centre
        const pulledX = tx + (elCx - tx) * 0.35;
        const pulledY = ty + (elCy - ty) * 0.35;
        cx += (pulledX - cx) * 0.28;
        cy += (pulledY - cy) * 0.28;
        // Element drifts toward cursor by up to 12px
        const dx = (tx - elCx) * 0.18;
        const dy = (ty - elCy) * 0.18;
        const max = 16;
        const clampedX = Math.max(-max, Math.min(max, dx));
        const clampedY = Math.max(-max, Math.min(max, dy));
        el.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
      } else {
        cx += (tx - cx) * 0.22;
        cy += (ty - cy) * 0.22;
      }
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
        if (pts.length > 140) pts.shift();
      };
      window.addEventListener("pointermove", onTrailMove, { passive: true });

      const paint = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < pts.length - 1; i++) {
          const p = pts[i];
          const q = pts[i + 1];
          p.life *= 0.955;
          if (p.life < 0.04) continue;
          ctx.strokeStyle = `rgba(196, 71, 46, ${p.life * 0.28})`;
          ctx.lineWidth = 1.6 * p.life;
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

    // Morph cursor on hover via [data-cur]
    const onPointerOver = (e: Event) => {
      const target = e.target as HTMLElement;
      const morphEl = target.closest("[data-cur]") as HTMLElement | null;
      if (morphEl && cursorRef.current) {
        const mode = morphEl.getAttribute("data-cur");
        if (mode) {
          cursorRef.current.classList.remove("pen", "hold", "cell", "case");
          cursorRef.current.classList.add(mode);
        }
      }
      // Magnetic acquire
      const magEl = target.closest("[data-magnetic]") as HTMLElement | null;
      if (magEl) {
        magneticRef.current = { el: magEl, bounds: magEl.getBoundingClientRect() };
      }
      // Surface awareness
      const surfEl = target.closest("[data-surface]") as HTMLElement | null;
      if (surfEl) {
        const surf = surfEl.getAttribute("data-surface");
        if (surf) document.body.setAttribute("data-surface", surf);
      }
    };
    const onPointerOut = (e: Event) => {
      const target = e.target as HTMLElement;
      const morphEl = target.closest("[data-cur]") as HTMLElement | null;
      if (morphEl && cursorRef.current) {
        cursorRef.current.classList.remove("pen", "hold", "cell", "case");
      }
      // Magnetic release
      if (magneticRef.current) {
        magneticRef.current.el.style.transform = "";
        magneticRef.current = null;
      }
    };
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);

    // Detect which section we're scrolling over for surface awareness
    let surfaceCheckTimer = 0;
    const updateSurface = () => {
      const el = document.elementFromPoint(tx, ty);
      const surfEl = (el as HTMLElement | null)?.closest("[data-bg]");
      if (surfEl) {
        const bg = surfEl.getAttribute("data-bg");
        if (bg === "dark") document.body.setAttribute("data-surface", "dark");
        else document.body.removeAttribute("data-surface");
      }
    };
    const scheduleSurfaceCheck = () => {
      cancelAnimationFrame(surfaceCheckTimer);
      surfaceCheckTimer = requestAnimationFrame(updateSurface);
    };
    window.addEventListener("scroll", scheduleSurfaceCheck, { passive: true });
    window.addEventListener("pointermove", scheduleSurfaceCheck, { passive: true });

    // Hide on Tab; show on pointer
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
      cancelAnimationFrame(surfaceCheckTimer);
      window.removeEventListener("pointermove", onMove);
      if (onResize) window.removeEventListener("resize", onResize);
      if (onTrailMove) window.removeEventListener("pointermove", onTrailMove);
      window.removeEventListener("scroll", scheduleSurfaceCheck);
      window.removeEventListener("pointermove", scheduleSurfaceCheck);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      document.body.removeAttribute("data-cursor-on");
      document.body.removeAttribute("data-surface");
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} id="ylb-cursor" aria-hidden="true" />
      <canvas ref={canvasRef} id="ylb-trail" aria-hidden="true" />
    </>
  );
}
