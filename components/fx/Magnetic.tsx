"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Wraps a child so it subtly pulls toward the cursor when nearby.
 * Used on primary CTAs to add tactile polish. Disabled on touch
 * and prefers-reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    function onMove(e: PointerEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
    }

    function onLeave() {
      if (!el) return;
      el.style.transform = "translate3d(0, 0, 0)";
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        transition: "transform 200ms var(--ease-out-quint)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
