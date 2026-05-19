import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonStylesOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const base =
  "inline-flex items-center justify-center font-medium tracking-tight " +
  "transition-[background-color,border-color,color,box-shadow,transform] " +
  "duration-200 ease-[var(--ease-out-quint)] " +
  "disabled:opacity-50 disabled:cursor-not-allowed " +
  "active:scale-[0.985]";

const variantMap: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-background hover:bg-accent-hover " +
    "shadow-md hover:shadow-[var(--shadow-glow-accent)]",
  secondary:
    "border border-border-strong text-text-primary " +
    "hover:bg-surface hover:border-text-tertiary",
  tertiary:
    "text-text-secondary hover:text-text-primary " +
    "underline-offset-4 hover:underline decoration-text-tertiary",
};

const sizeMap: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm rounded-md gap-1.5",
  md: "h-11 px-5 text-base rounded-md gap-2",
  lg: "h-13 px-7 text-lg rounded-lg gap-2.5",
};

/**
 * Return the class string for button-styled elements.
 * Use on `<a>`, `<Link>`, or wrap with `<Button>` for native `<button>`.
 */
export function buttonStyles({
  variant = "primary",
  size = "md",
  fullWidth = false,
}: ButtonStylesOptions = {}): string {
  return [
    base,
    variantMap[variant],
    sizeMap[size],
    fullWidth ? "w-full" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStylesOptions {}

export function Button({
  variant,
  size,
  fullWidth,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${buttonStyles({ variant, size, fullWidth })}${
        className ? ` ${className}` : ""
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}
