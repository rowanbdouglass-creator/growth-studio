import type { ReactNode } from "react";

type Element = "div" | "section" | "article" | "aside";

interface GlassCardProps {
  as?: Element;
  className?: string;
  children: ReactNode;
  /** Adds a soft accent glow halo around the card */
  glow?: boolean;
}

/**
 * Premium glass surface. Backdrop-blur, gradient background that
 * fades from a brighter top-left to the canvas, inset light reflections
 * on top + left edges. Reads as a physical glass panel.
 *
 * Use anywhere we previously used `Card` to upgrade visual weight.
 */
export function GlassCard({
  as: Tag = "div",
  className = "",
  children,
  glow = false,
}: GlassCardProps) {
  return (
    <div className={`relative ${glow ? "" : ""}`}>
      {glow && (
        <div
          aria-hidden
          className="absolute -inset-6 rounded-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(50% 45% at 50% 50%, oklch(0.86 0.012 245 / 0.10), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      )}
      <Tag
        className={`relative rounded-xl backdrop-blur-xl ${className}`}
        style={{
          background:
            "linear-gradient(155deg, oklch(0.20 0.008 260 / 0.55) 0%, oklch(0.14 0.006 260 / 0.88) 70%)",
          border: "1px solid oklch(0.32 0.008 260 / 0.7)",
          boxShadow:
            "0 30px 80px -20px oklch(0 0 0 / 0.5), inset 0 1px 0 0 oklch(1 0 0 / 0.06), inset 1px 0 0 0 oklch(1 0 0 / 0.04)",
        }}
      >
        {children}
      </Tag>
    </div>
  );
}
