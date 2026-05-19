import type { ReactNode } from "react";

type CardElement = "div" | "section" | "article" | "aside";

interface CardProps {
  as?: CardElement;
  variant?: "default" | "elevated" | "outlined";
  className?: string;
  children: ReactNode;
}

const variantMap = {
  default: "bg-surface border border-border",
  elevated: "bg-surface-elevated border border-border shadow-md",
  outlined: "border border-border-strong",
} as const;

export function Card({
  as: Tag = "div",
  variant = "default",
  className = "",
  children,
}: CardProps) {
  return (
    <Tag className={`rounded-lg p-6 ${variantMap[variant]} ${className}`}>
      {children}
    </Tag>
  );
}
