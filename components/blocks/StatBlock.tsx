import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/fx/CountUp";
import { Sparkline } from "@/components/fx/Sparkline";

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  context: string;
  trend: number[];
  trendType?: "line" | "bar";
}

const stats: Stat[] = [
  {
    value: 12,
    suffix: "+",
    label: "Active engagements",
    context: "across the UK",
    trend: [2, 3, 3, 5, 6, 8, 8, 10, 11, 12, 12, 12],
    trendType: "line",
  },
  {
    value: 4.8,
    prefix: "£",
    suffix: "m",
    decimals: 1,
    label: "Tracked revenue",
    context: "client side, 2025",
    trend: [0.4, 0.8, 1.1, 1.6, 2.0, 2.4, 3.0, 3.5, 3.9, 4.3, 4.6, 4.8],
    trendType: "line",
  },
  {
    value: 240,
    suffix: "+",
    label: "Campaigns optimised",
    context: "Meta + Google",
    trend: [12, 18, 24, 22, 30, 28, 35, 32, 40, 38, 45, 42, 50, 48],
    trendType: "bar",
  },
  {
    value: 8,
    suffix: " yrs",
    label: "Custom builds",
    context: "WP, WC, Next.js",
    trend: [1, 1, 1, 1, 1, 1, 1, 1],
    trendType: "bar",
  },
];

export function StatRow() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="py-24 md:py-32"
    >
      <Container size="wide">
        <h2
          id="stats-heading"
          className="font-sans font-medium text-ink leading-[1.05] tracking-[-0.035em] text-5xl md:text-6xl lg:text-7xl mb-20 md:mb-24 max-w-3xl"
        >
          No vague{" "}
          <span className="italic-editorial font-normal text-ink-soft">
            &ldquo;case studies.&rdquo;
          </span>
        </h2>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="anim-stat pt-6 border-t border-rule flex flex-col gap-4"
            >
              <dd
                className="font-sans font-medium text-ink leading-none tracking-[-0.04em] text-5xl md:text-6xl lg:text-7xl"
                style={{ fontFeatureSettings: "'tnum'" }}
              >
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </dd>
              {/* Trend sparkline */}
              <div className="opacity-80">
                <Sparkline
                  data={stat.trend}
                  variant={stat.trendType ?? "line"}
                  fill
                />
              </div>
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
