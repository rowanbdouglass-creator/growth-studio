/**
 * The signed-and-dated red stamp used on case studies and as the easter
 * egg drop. Rotated, bordered, mono type.
 */

interface BookedStampProps {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  rotate?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BookedStamp({
  top = "BOOKED",
  bottom,
  rotate = -8,
  size = "md",
  className = "",
}: BookedStampProps) {
  const padding =
    size === "sm" ? "10px 14px" : size === "lg" ? "22px 32px" : "16px 22px";
  const topFontSize = size === "sm" ? 13 : size === "lg" ? 22 : 17;
  const bottomFontSize = size === "sm" ? 9 : size === "lg" ? 12 : 10;
  const border = size === "lg" ? 3 : 2;

  return (
    <span
      aria-hidden
      className={`inline-block text-center ${className}`}
      style={{
        border: `${border}px solid var(--color-red)`,
        color: "var(--color-red)",
        padding,
        transform: `rotate(${rotate}deg)`,
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: topFontSize, display: "block" }}>{top}</span>
      {bottom && (
        <span
          style={{
            fontSize: bottomFontSize,
            fontWeight: 400,
            letterSpacing: "0.22em",
            display: "block",
            marginTop: 6,
          }}
        >
          {bottom}
        </span>
      )}
    </span>
  );
}
