import { Container } from "@/components/ui/Container";

const stats = [
  { value: "12+", label: "Active engagements", context: "across the UK" },
  { value: "£4.8m", label: "Tracked revenue", context: "client side, 2025" },
  { value: "240+", label: "Campaigns optimised", context: "Meta + Google" },
  { value: "8 yrs", label: "Custom builds", context: "WP, WC, Next.js" },
];

export function StatRow() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="py-20 md:py-28 border-y border-border"
    >
      <Container size="wide">
        <p
          id="stats-heading"
          className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary mb-12 text-center"
        >
          Receipts, not adjectives
        </p>
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="anim-stat text-center md:text-left"
            >
              <dd className="font-mono text-5xl md:text-6xl text-text-primary leading-none mb-3 tabular-nums tracking-tight">
                {stat.value}
              </dd>
              <dt>
                <span className="block font-serif text-lg text-text-primary mb-1">
                  {stat.label}
                </span>
                <span className="block font-mono text-xs uppercase tracking-[0.14em] text-text-tertiary">
                  {stat.context}
                </span>
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
