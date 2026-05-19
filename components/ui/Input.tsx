import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

const base =
  "w-full h-11 px-4 text-base " +
  "bg-surface border border-border rounded-md " +
  "text-text-primary placeholder:text-text-tertiary " +
  "transition-colors duration-150 ease-[var(--ease-out-quint)] " +
  "hover:border-border-strong " +
  "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-subtle " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

const invalidStyles =
  "border-accent focus:border-accent focus:ring-accent-subtle";

export function Input({ invalid = false, className = "", ...rest }: InputProps) {
  return (
    <input
      className={`${base} ${invalid ? invalidStyles : ""} ${className}`}
      {...rest}
    />
  );
}
