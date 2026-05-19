/**
 * Fake "live audit" dashboard card used as a visual proof
 * element in hero and tool sections. Server component — no JS.
 * Looks like real product. Numbers are static but plausible.
 */
export function MockDashboard() {
  const findings = [
    { label: "Audience overlap", value: "£1,840/mo", severity: "high" },
    { label: "Broken UTM tags", value: "11 campaigns", severity: "high" },
    { label: "Dead creative", value: "£940/mo", severity: "mid" },
    { label: "Branded search bleed", value: "23%", severity: "mid" },
  ];

  return (
    <div className="relative w-full max-w-md">
      {/* Glow halo */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-3xl"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, oklch(0.78 0.17 60 / 0.25), transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Card */}
      <div
        className="relative rounded-2xl border border-border-strong overflow-hidden backdrop-blur-md"
        style={{
          backgroundColor: "oklch(0.14 0.012 290 / 0.85)",
          boxShadow:
            "0 30px 80px -20px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(1 0 0 / 0.03) inset",
        }}
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-canvas-2/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald" />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">
              Audit · Live
            </span>
          </div>
          <span className="font-mono text-[10px] text-ink-dim">
            growth.studio/audit
          </span>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute mb-1.5">
              Total wastage detected
            </p>
            <p
              className="font-serif text-5xl text-ink leading-none tracking-tight"
              style={{ fontFeatureSettings: "'tnum'" }}
            >
              £4,832
              <span className="text-ink-mute text-2xl ml-1">/mo</span>
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-emerald mt-2">
              ⏶ 3 quick wins available
            </p>
          </div>

          <div className="space-y-2">
            {findings.map((f, i) => (
              <div
                key={f.label}
                className="flex items-center justify-between py-2 border-t border-border/60"
                style={{
                  animation: `fade-up 600ms ${800 + i * 120}ms var(--ease-out-quint) both`,
                }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={
                      "w-1.5 h-1.5 rounded-full " +
                      (f.severity === "high" ? "bg-amber" : "bg-indigo")
                    }
                  />
                  <span className="text-sm text-ink-soft">{f.label}</span>
                </div>
                <span
                  className="font-mono text-xs text-ink"
                  style={{ fontFeatureSettings: "'tnum'" }}
                >
                  {f.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <span className="flex-1 h-1 rounded-full bg-canvas-2 overflow-hidden">
              <span
                className="block h-full rounded-full"
                style={{
                  width: "74%",
                  background:
                    "linear-gradient(90deg, oklch(0.78 0.17 60), oklch(0.72 0.22 340))",
                }}
              />
            </span>
            <span className="font-mono text-[10px] text-ink-mute uppercase tracking-[0.14em]">
              74%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
