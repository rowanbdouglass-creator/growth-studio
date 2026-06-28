/**
 * Animated audio waveform — 28 bars, CSS-keyframe-pulsed. Server-safe.
 * Used inside VoiceNote section to visualize the testimonial as a real
 * voice memo.
 */

const BARS = 28;

// Which bars are red ("active") vs ink (background)
const ACTIVE = new Set([3, 4, 5, 8, 9, 12, 14, 15, 18, 21, 22, 25]);

export function Waveform({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        display: "flex",
        alignItems: "end",
        gap: 3,
        height: 48,
        margin: "36px 0 24px",
        maxWidth: 600,
      }}
    >
      <style>{`
        @keyframes ylb-wave-pulse {
          0%, 100% { transform: scaleY(0.35); }
          50%      { transform: scaleY(1); }
        }
        .ylb-wave-bar {
          flex: 1;
          border-radius: 1px;
          background: var(--color-ink);
          animation: ylb-wave-pulse 1.8s ease-in-out infinite;
          transform-origin: bottom;
        }
        .ylb-wave-bar.a { background: var(--color-red); }
        .ylb-wave-bar:nth-child(2n)  { animation-duration: 1.4s; }
        .ylb-wave-bar:nth-child(3n)  { animation-duration: 2.2s; animation-delay: 0.2s; }
        .ylb-wave-bar:nth-child(5n)  { animation-duration: 1.6s; animation-delay: 0.4s; }
        @media (prefers-reduced-motion: reduce) {
          .ylb-wave-bar { animation: none; transform: scaleY(0.7); }
        }
      `}</style>
      {Array.from({ length: BARS }, (_, i) => (
        <span
          key={i}
          className={`ylb-wave-bar ${ACTIVE.has(i) ? "a" : ""}`}
        />
      ))}
    </div>
  );
}
