import { brand } from "@/config/brand";

/**
 * The official You Look Booked wordmark — lowercase ylb in Syne 800
 * with the b in brand red. The whole brand identity in one mark.
 */
interface WordmarkProps {
  size?: number | string;
  className?: string;
  /** Override colour for the y and l (defaults to current text colour). */
  letterColor?: string;
  /** Override colour for the b (defaults to brand red). */
  bColor?: string;
}

export function Wordmark({
  size = 26,
  className = "",
  letterColor,
  bColor = "var(--color-red)",
}: WordmarkProps) {
  return (
    <span
      aria-label={`${brand.name} home`}
      className={`inline-flex items-baseline ${className}`}
      style={{
        fontFamily: "var(--font-syne), Syne, system-ui, sans-serif",
        fontWeight: 800,
        fontSize: typeof size === "number" ? `${size}px` : size,
        letterSpacing: "-0.045em",
        lineHeight: 0.9,
        gap: "1px",
        color: letterColor,
      }}
    >
      <span>y</span>
      <span>l</span>
      <span style={{ color: bColor }}>b</span>
    </span>
  );
}
