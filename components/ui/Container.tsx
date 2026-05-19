import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  as?: ElementType;
  size?: "default" | "narrow" | "wide";
  className?: string;
  children: ReactNode;
}

const sizeMap = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function Container({
  as: Tag = "div",
  size = "default",
  className = "",
  children,
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full ${sizeMap[size]} px-6 md:px-10 ${className}`}
    >
      {children}
    </Tag>
  );
}
