import type { ReactNode } from "react";

type Element = "div" | "section" | "article" | "aside";

interface GlassCardProps {
  as?: Element;
  className?: string;
  children: ReactNode;
  glow?: boolean;
}

/**
 * Clean surface card for the light editorial theme. Soft white
 * background with a hairline border and a subtle warm shadow.
 * Replaces the previous glassmorphism panel which was dark-theme
 * specific.
 */
export function GlassCard({
  as: Tag = "div",
  className = "",
  children,
  glow = false,
}: GlassCardProps) {
  return (
    <div className="relative">
      {glow && (
        <div
          aria-hidden
          className="absolute -inset-6 rounded-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(50% 45% at 50% 50%, oklch(0.460 0.220 252 / 0.10), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      )}
      <Tag
        className={`relative rounded-xl bg-surface border border-border ${className}`}
        style={{
          boxShadow:
            "0 14px 40px -16px oklch(0.20 0.020 60 / 0.10), 0 0 0 1px oklch(0.20 0.020 60 / 0.02) inset",
        }}
      >
        {children}
      </Tag>
    </div>
  );
}
