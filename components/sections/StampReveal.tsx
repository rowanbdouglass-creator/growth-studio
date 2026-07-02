import { Inview } from "@/components/fx/Inview";

/**
 * StampReveal — a small stamp badge that plays the signature stamp-in
 * motion the first time it enters the viewport (threshold 0.6, once).
 * Rotation is owned entirely by the stamp-in keyframes (thud in at
 * -9deg, settle at -5deg); no static rotate class, so there is no
 * double-rotation. Reduced motion is handled in CSS (.stamp stays
 * visible).
 */
export function StampReveal({
  label,
  delayMs = 0,
  className = "",
}: {
  label: string;
  delayMs?: number;
  className?: string;
}) {
  return (
    <Inview
      as="span"
      threshold={0.6}
      className={`stamp inline-block rounded-sm border-2 border-accent-text bg-surface-0 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-accent-text ${className}`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {label}
    </Inview>
  );
}
