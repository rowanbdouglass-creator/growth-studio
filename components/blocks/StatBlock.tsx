import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/fx/CountUp";

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  context: string;
  accent: "amber" | "indigo" | "magenta";
}

const stats: Stat[] = [
  {
    value: 12,
    suffix: "+",
    label: "Active engagements",
    context: "across the UK",
    accent: "amber",
  },
  {
    value: 4.8,
    prefix: "£",
    suffix: "m",
    decimals: 1,
    label: "Tracked revenue",
    context: "client side, 2025",
    accent: "indigo",
  },
  {
    value: 240,
    suffix: "+",
    label: "Campaigns optimised",
    context: "Meta + Google",
    accent: "amber",
  },
  {
    value: 8,
    suffix: " yrs",
    label: "Custom builds",
    context: "WP, WC, Next.js",
    accent: "magenta",
  },
];

const accentMap: Record<Stat["accent"], { dot: string; text: string }> = {
  amber: { dot: "bg-amber", text: "text-amber" },
  indigo: { dot: "bg-indigo", text: "text-indigo" },
  magenta: { dot: "bg-magenta", text: "text-magenta" },
};

export function StatRow() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="relative py-24 md:py-32 border-y border-border overflow-hidden"
    >
      <Container size="wide">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 mb-16 items-end">
          <div>
            <p
              id="stats-heading"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-4"
            >
              · The receipts
            </p>
            <h2 className="font-display font-medium text-ink text-4xl md:text-5xl leading-[0.95] tracking-[-0.03em]">
              No vague{" "}
              <span
                className="italic-editorial font-normal text-ink-soft"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                "case studies."
              </span>
            </h2>
          </div>
          <p className="text-lg text-ink-soft leading-relaxed md:pl-12 md:border-l md:border-border max-w-xl">
            Real numbers from current and recent engagements. Updated quarterly.
          </p>
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
          {stats.map((stat) => {
            const c = accentMap[stat.accent];
            return (
              <div
                key={stat.label}
                className="anim-stat bg-canvas p-8 md:p-10 transition-colors duration-200 hover:bg-canvas-2 group/stat"
              >
                <div className="flex items-center gap-2 mb-6">
                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
                    {stat.label}
                  </span>
                </div>
                <dd
                  className="font-display text-ink leading-none mb-3 tracking-[-0.04em] text-5xl md:text-6xl"
                  style={{ fontFeatureSettings: "'tnum'" }}
                >
                  <CountUp
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </dd>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim">
                  {stat.context}
                </dt>
              </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
