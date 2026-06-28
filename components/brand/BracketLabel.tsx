/**
 * Bracketed section marker — `[ 01 what we do ]` in IBM Plex Mono.
 *
 * The editorial signature device that runs through every section.
 * Number is rendered in brand red, text in pencil. Brackets are mono.
 */
interface BracketLabelProps {
  /** Number prefix, e.g. "01", "02". Rendered in red. Optional. */
  number?: string;
  /** Label text. Rendered in pencil. */
  children: React.ReactNode;
  /** Override colour scheme: 'light' (default) or 'dark' (for ink backgrounds). */
  scheme?: "light" | "dark" | "on-red";
  className?: string;
}

export function BracketLabel({
  number,
  children,
  scheme = "light",
  className = "",
}: BracketLabelProps) {
  const labelColor =
    scheme === "dark"
      ? "var(--color-pencil-soft)"
      : scheme === "on-red"
        ? "rgba(243, 239, 230, 0.85)"
        : "var(--color-pencil)";

  const numColor =
    scheme === "on-red" ? "var(--color-ink)" : "var(--color-red)";

  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        fontWeight: 500,
        color: labelColor,
        lineHeight: 1.5,
      }}
    >
      <span aria-hidden style={{ opacity: 0.7 }}>[</span>
      {number && (
        <span style={{ color: numColor, fontWeight: 700 }}>{number}</span>
      )}
      <span>{children}</span>
      <span aria-hidden style={{ opacity: 0.7 }}>]</span>
    </span>
  );
}
