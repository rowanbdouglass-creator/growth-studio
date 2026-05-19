import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/fx/CountUp";

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  context: string;
}

const stats: Stat[] = [
  {
    value: 12,
    suffix: "+",
    label: "Active engagements",
    context: "across the UK",
  },
  {
    value: 4.8,
    prefix: "£",
    suffix: "m",
    decimals: 1,
    label: "Tracked revenue",
    context: "client side, 2025",
  },
  {
    value: 240,
    suffix: "+",
    label: "Campaigns optimised",
    context: "Meta + Google",
  },
  {
    value: 8,
    suffix: " yrs",
    label: "Custom builds",
    context: "WP, WC, Next.js",
  },
];

export function StatRow() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="py-32 md:py-44 border-t border-rule"
    >
      <Container size="wide">
        <div className="flex items-center gap-3 mb-16 md:mb-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            05 — Numbers
          </span>
          <span className="flex-1 h-px bg-rule" />
        </div>

        <h2
          id="stats-heading"
          className="font-sans font-medium text-ink leading-[0.98] tracking-[-0.035em] text-5xl md:text-6xl lg:text-7xl mb-20 md:mb-24 max-w-3xl"
        >
          No vague{" "}
          <span className="italic-editorial font-normal text-ink-soft">
            "case studies."
          </span>
        </h2>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="anim-stat pt-6 border-t border-rule"
            >
              <dd
                className="font-sans font-medium text-ink leading-none mb-6 tracking-[-0.04em] text-5xl md:text-6xl lg:text-7xl"
                style={{ fontFeatureSettings: "'tnum'" }}
              >
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </dd>
              <dt>
                <p className="text-base text-ink mb-1">{stat.label}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">
                  {stat.context}
                </p>
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
