"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Tilt3DProps {
  children: ReactNode;
  maxTilt?: number; // degrees
  scale?: number;
  className?: string;
}

/**
 * Cursor-driven 3D tilt wrapper. Children rotate on X/Y as the cursor
 * moves over the element. Layers can use `data-tilt-depth` to shift
 * different amounts (parallax effect).
 *
 * Disabled on touch devices and prefers-reduced-motion.
 */
export function Tilt3D({
  children,
  maxTilt = 8,
  scale = 1.02,
  className = "",
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let active = false;

    function onMove(e: PointerEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Normalised -1..1
      targetX = -((e.clientY - cy) / (rect.height / 2)) * maxTilt;
      targetY = ((e.clientX - cx) / (rect.width / 2)) * maxTilt;
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    function onEnter() {
      active = true;
    }

    function onLeave() {
      active = false;
      targetX = 0;
      targetY = 0;
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    function tick() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      const s = active ? scale : 1;
      if (el) {
        el.style.transform = `perspective(1000px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) scale(${s})`;
        // Distribute parallax to layers
        const layers = el.querySelectorAll<HTMLElement>("[data-tilt-depth]");
        layers.forEach((layer) => {
          const depth = parseFloat(layer.dataset.tiltDepth || "0");
          layer.style.transform = `translate3d(${(-currentY * depth).toFixed(2)}px, ${(-currentX * depth).toFixed(2)}px, 0)`;
        });
      }
      if (
        Math.abs(targetX - currentX) > 0.01 ||
        Math.abs(targetY - currentY) > 0.01
      ) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointermove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [maxTilt, scale]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "transform 200ms var(--ease-out-quint)",
      }}
    >
      {children}
    </div>
  );
}
