/**
 * Single-tone amber mesh background. Two layers of slow-drifting
 * blurred warmth + a subtle grid mask. No competing colours — the
 * mesh sits behind type without fighting it.
 */
export function MeshGradient({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Warm halo top-left */}
      <div
        className="absolute -top-1/3 -left-1/4 w-[75vw] h-[75vw] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.62 0.13 60 / 0.28), oklch(0.62 0.13 60 / 0.08) 45%, transparent 70%)",
          animation: "mesh-drift-a 36s ease-in-out infinite",
        }}
      />
      {/* Cool depth bottom-right (kept very low chroma so it reads as shadow, not colour) */}
      <div
        className="absolute -bottom-1/3 -right-1/4 w-[70vw] h-[70vw] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.30 0.02 280 / 0.45), transparent 65%)",
          animation: "mesh-drift-b 44s ease-in-out infinite",
        }}
      />
      {/* Subtle grid mask for structure */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
    </div>
  );
}
