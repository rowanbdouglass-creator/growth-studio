/**
 * The Receipts "stop" — a square with the bottom-right corner torn
 * at the 58%/58% rule. This is the brand's single signature device.
 * Used as bullet, divider, accent, end-of-wordmark period.
 *
 * Renders as a single CSS clip-path polygon. No SVG required.
 * Inherits color from current `color` so can be re-coloured via Tailwind.
 */
interface StopProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Stop({
  size = "0.45em",
  color = "var(--color-red)",
  className = "",
  style,
}: StopProps) {
  return (
    <span
      aria-hidden
      className={`inline-block align-baseline ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        clipPath: "polygon(0 0, 100% 0, 100% 58%, 58% 100%, 0 100%)",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}
