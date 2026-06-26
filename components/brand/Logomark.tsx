/**
 * Growth Studio mark, three ascending bars representing the
 * compound shape. Geometric, scales clean, animates on demand.
 *
 * Usage:
 *   <Logomark />              , just the mark
 *   <Logomark withWordmark /> , mark + "Growth Studio"
 *   <Logomark animate />      , draws in on mount
 */

interface LogomarkProps {
  withWordmark?: boolean;
  animate?: boolean;
  size?: number;
  className?: string;
}

export function Logomark({
  withWordmark = false,
  animate = false,
  size = 18,
  className = "",
}: LogomarkProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden
        style={{ overflow: "visible" }}
      >
        {/* Three ascending bars */}
        <line
          x1="0"
          y1="14"
          x2="6"
          y2="14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={
            animate
              ? {
                  strokeDasharray: 6,
                  strokeDashoffset: 6,
                  animation:
                    "logo-draw 600ms 0ms cubic-bezier(0.16,1,0.3,1) forwards",
                }
              : undefined
          }
        />
        <line
          x1="0"
          y1="10"
          x2="11"
          y2="10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={
            animate
              ? {
                  strokeDasharray: 11,
                  strokeDashoffset: 11,
                  animation:
                    "logo-draw 700ms 160ms cubic-bezier(0.16,1,0.3,1) forwards",
                }
              : undefined
          }
        />
        <line
          x1="0"
          y1="6"
          x2="18"
          y2="6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={
            animate
              ? {
                  strokeDasharray: 18,
                  strokeDashoffset: 18,
                  animation:
                    "logo-draw 800ms 320ms cubic-bezier(0.16,1,0.3,1) forwards",
                }
              : undefined
          }
        />
        {/* Diagonal accent */}
        <circle
          cx="18"
          cy="6"
          r="1.5"
          fill="currentColor"
          style={
            animate
              ? {
                  opacity: 0,
                  animation: "fade-in 400ms 1100ms ease-out forwards",
                }
              : undefined
          }
        />
      </svg>

      {withWordmark && (
        <span className="font-sans text-base font-medium tracking-tight">
          Growth Studio
        </span>
      )}
    </span>
  );
}
