import type { ReactNode } from "react";

type BadgeVariant = "accent" | "neutral" | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

const variantMap: Record<BadgeVariant, string> = {
  accent: "bg-accent-subtle text-accent",
  neutral: "bg-surface-elevated text-text-secondary",
  outline: "border border-border-strong text-text-secondary",
};

export function Badge({
  variant = "neutral",
  className = "",
  children,
}: BadgeProps) {
  return (
    <span
      className={
        "inline-flex items-center px-2 py-1 rounded-sm " +
        "font-mono text-xs uppercase tracking-[0.14em] " +
        variantMap[variant] +
        " " +
        className
      }
    >
      {children}
    </span>
  );
}
