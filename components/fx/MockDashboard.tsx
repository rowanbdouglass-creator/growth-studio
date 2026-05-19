/**
 * Restrained "live audit" card. Single accent (amber). No
 * coloured dots beyond accent + ink-mute. Reads as a serious
 * diagnostic tool, not a candy-coloured demo.
 */
export function MockDashboard() {
  const findings = [
    { label: "Audience overlap", value: "£1,840 / mo" },
    { label: "Broken UTM tags", value: "11 campaigns" },
    { label: "Dead creative", value: "£940 / mo" },
    { label: "Branded search bleed", value: "23%" },
  ];

  return (
    <div className="relative w-full max-w-md">
      {/* Subtle glow halo behind */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-3xl"
        style={{
          background:
            "radial-gradient(50% 45% at 50% 50%, oklch(0.62 0.13 60 / 0.18), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div
        className="relative rounded-xl border border-border-strong overflow-hidden backdrop-blur-md"
        style={{
          backgroundColor: "oklch(0.14 0.006 60 / 0.85)",
          boxShadow:
            "0 30px 80px -20px oklch(0 0 0 / 0.55), 0 0 0 1px oklch(1 0 0 / 0.04) inset",
        }}
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-canvas-2/60">
          <div className="flex items-center gap-2.5">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />
              <span className="relative w-2 h-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              Audit · Live
            </span>
          </div>
          <span className="font-mono text-[10px] text-ink-dim">
            growth.studio/audit
          </span>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute mb-2">
              Wastage detected
            </p>
            <p
              className="font-sans font-medium text-ink leading-none tracking-[-0.04em] text-5xl md:text-6xl"
              style={{ fontFeatureSettings: "'tnum'" }}
            >
              £4,832
              <span className="text-ink-mute text-xl ml-2 font-normal">/mo</span>
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent mt-3">
              + 3 quick wins available
            </p>
          </div>

          <ul className="space-y-0">
            {findings.map((f, i) => (
              <li
                key={f.label}
                className="flex items-center justify-between py-3 border-t border-border/60"
                style={{
                  animation: `fade-up 600ms ${900 + i * 110}ms var(--ease-out-quint) both`,
                }}
              >
                <span className="text-sm text-ink-soft">{f.label}</span>
                <span
                  className="font-mono text-xs text-ink"
                  style={{ fontFeatureSettings: "'tnum'" }}
                >
                  {f.value}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 pt-1">
            <span className="flex-1 h-px bg-rule overflow-hidden relative">
              <span
                className="absolute inset-y-0 left-0 bg-accent"
                style={{ width: "74%" }}
              />
            </span>
            <span className="font-mono text-[10px] text-ink-mute uppercase tracking-[0.14em]">
              74% reviewed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
