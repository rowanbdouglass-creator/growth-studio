import Link from "next/link";
import type { Service } from "@/lib/payload/queries";

type Pillar = Service["pillar"];

const pillarMeta: Record<
  Pillar,
  {
    label: string;
    number: string;
    accent: string;
    dot: string;
    text: string;
    border: string;
    glow: string;
  }
> = {
  "paid-growth": {
    label: "Paid Growth",
    number: "01",
    accent: "amber",
    dot: "bg-amber",
    text: "text-amber",
    border: "hover:border-amber/50",
    glow: "oklch(0.78 0.17 60 / 0.20)",
  },
  "custom-systems": {
    label: "Custom Systems",
    number: "02",
    accent: "indigo",
    dot: "bg-indigo",
    text: "text-indigo",
    border: "hover:border-indigo/50",
    glow: "oklch(0.72 0.18 270 / 0.20)",
  },
  "intelligence-layer": {
    label: "Intelligence",
    number: "03",
    accent: "magenta",
    dot: "bg-magenta",
    text: "text-magenta",
    border: "hover:border-magenta/50",
    glow: "oklch(0.72 0.22 340 / 0.20)",
  },
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const meta = pillarMeta[service.pillar];

  return (
    <article
      className={`group/card relative h-full overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 ${meta.border} hover:bg-surface-elevated`}
    >
      {/* Glow on hover */}
      <div
        aria-hidden
        className="absolute -top-1/2 -right-1/4 w-[110%] h-[110%] rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none blur-[60px]"
        style={{ background: `radial-gradient(circle at center, ${meta.glow}, transparent 70%)` }}
      />

      {/* Massive ghost number */}
      <span
        aria-hidden
        className="absolute -top-6 -right-2 font-display text-[12rem] leading-none text-ink/[0.025] tracking-tighter select-none"
      >
        {meta.number}
      </span>

      <div className="relative flex flex-col gap-6 h-full p-8 md:p-10">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
          <span className={`font-mono text-[11px] uppercase tracking-[0.18em] ${meta.text}`}>
            {meta.number} · {meta.label}
          </span>
        </div>

        <h3 className="font-display font-medium text-3xl md:text-4xl text-ink leading-[1.0] tracking-[-0.025em]">
          {service.title}
        </h3>

        <p className="text-ink-soft leading-relaxed">{service.summary}</p>

        {service.capabilities && service.capabilities.length > 0 && (
          <ul className="space-y-2 text-sm">
            {service.capabilities.slice(0, 4).map((cap, idx) => (
              <li key={cap.id ?? idx} className="flex gap-2.5 text-ink-mute">
                <span className={`${meta.text} mt-0.5`}>+</span>
                <span>{cap.capability}</span>
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/services/${service.slug}`}
          className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-ink group/link"
        >
          <span className={`group-hover/link:${meta.text} transition-colors`}>
            See how it works
          </span>
          <span
            aria-hidden
            className={`${meta.text} transition-transform duration-200 group-hover/link:translate-x-1`}
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
