"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Inview — generic once-only viewport trigger.
 *
 * Renders a plain element and appends .is-inview the first time it
 * enters the viewport (IntersectionObserver, disconnects after firing).
 * CSS owns the actual motion (.stamp, .draw-x, .z-punch descendants),
 * so reduced motion is handled entirely in globals.css.
 */
export function Inview({
  as = "div",
  className = "",
  style,
  threshold = 0.35,
  children,
}: {
  as?: "div" | "span";
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (observerEntries) => {
        if (observerEntries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const Tag = as;
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${className}${inView ? " is-inview" : ""}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
