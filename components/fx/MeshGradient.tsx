/**
 * Silver-toned mesh background. Cool drifting halo + cool depth.
 * No warm colour — sits behind type without competing.
 */
export function MeshGradient({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Silver halo top-left */}
      <div
        className="absolute -top-1/3 -left-1/4 w-[75vw] h-[75vw] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.72 0.020 240 / 0.22), oklch(0.72 0.020 240 / 0.06) 45%, transparent 70%)",
          animation: "mesh-drift-a 36s ease-in-out infinite",
        }}
      />
      {/* Cool depth bottom-right */}
      <div
        className="absolute -bottom-1/3 -right-1/4 w-[70vw] h-[70vw] rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.30 0.020 260 / 0.55), transparent 65%)",
          animation: "mesh-drift-b 44s ease-in-out infinite",
        }}
      />
      {/* Subtle grid mask */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 78%)",
        }}
      />
    </div>
  );
}
