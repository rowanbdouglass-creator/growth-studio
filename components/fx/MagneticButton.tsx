"use client";

import { useEffect, useRef } from "react";

/**
 * Wraps any child element with magnetic-pull behaviour. The cursor
 * morphs naturally via the CustomCursor's data-magnetic handler;
 * this wrapper additionally applies a subtle scale-up on hover for
 * affordance, and exposes data-magnetic on the wrapped element.
 */
export function MagneticButton({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const onEnter = () => {
      el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    };
    const onLeave = () => {
      el.style.transition = "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.transform = "";
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return (
    <span
      ref={ref}
      data-magnetic=""
      className={className}
      style={{ display: "inline-block", ...style }}
    >
      {children}
    </span>
  );
}
