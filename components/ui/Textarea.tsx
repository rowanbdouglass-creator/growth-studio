import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

const base =
  "w-full min-h-32 px-4 py-3 text-base " +
  "bg-surface border border-border rounded-md " +
  "text-text-primary placeholder:text-text-tertiary " +
  "transition-colors duration-150 ease-[var(--ease-out-quint)] " +
  "hover:border-border-strong " +
  "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-subtle " +
  "disabled:opacity-50 disabled:cursor-not-allowed " +
  "resize-y";

const invalidStyles = "border-accent focus:border-accent focus:ring-accent-subtle";

export function Textarea({
  invalid = false,
  className = "",
  ...rest
}: TextareaProps) {
  return (
    <textarea
      className={`${base} ${invalid ? invalidStyles : ""} ${className}`}
      {...rest}
    />
  );
}
