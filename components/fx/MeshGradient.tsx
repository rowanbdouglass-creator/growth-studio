/**
 * Slow-drifting multi-stop conic + radial gradient mesh.
 * Pure CSS — no canvas, no JS. Sits in a -z-10 layer behind hero
 * content. Two stacked layers rotate independently for organic
 * movement that doesn't feel templated.
 */
export function MeshGradient({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Layer 1 — warm amber glow top-left */}
      <div
        className="absolute -top-1/3 -left-1/4 w-[80vw] h-[80vw] rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.78 0.17 60 / 0.35), oklch(0.78 0.17 60 / 0.10) 40%, transparent 70%)",
          animation: "mesh-drift 22s ease-in-out infinite",
        }}
      />
      {/* Layer 2 — indigo glow bottom-right */}
      <div
        className="absolute -bottom-1/3 -right-1/4 w-[80vw] h-[80vw] rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.72 0.18 270 / 0.32), oklch(0.72 0.18 270 / 0.10) 40%, transparent 70%)",
          animation: "mesh-drift 28s ease-in-out infinite reverse",
          animationDelay: "-7s",
        }}
      />
      {/* Layer 3 — magenta accent right-mid */}
      <div
        className="absolute top-1/4 right-1/3 w-[40vw] h-[40vw] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.72 0.22 340 / 0.22), transparent 65%)",
          animation: "mesh-drift 18s ease-in-out infinite",
          animationDelay: "-3s",
        }}
      />
      {/* Subtle grid overlay to give structure */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
    </div>
  );
}
