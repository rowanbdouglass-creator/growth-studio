import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Service } from "@/lib/payload/queries";

const pillarMeta: Record<Service["pillar"], { label: string; n: string }> = {
  "paid-growth": { label: "Paid Growth", n: "01" },
  "custom-systems": { label: "Custom Systems", n: "02" },
  "intelligence-layer": { label: "Intelligence", n: "03" },
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const meta = pillarMeta[service.pillar];

  return (
    <GlassCard as="article" className="h-full">
      <div className="group/card relative flex flex-col gap-6 h-full p-8 md:p-9">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            {meta.n}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            {meta.label}
          </span>
        </div>

        <h3 className="font-sans font-medium text-2xl md:text-3xl text-ink leading-[1.1] tracking-[-0.025em]">
          {service.title}
        </h3>

        <p className="text-ink-soft leading-relaxed text-sm md:text-base">
          {service.summary}
        </p>

        {service.capabilities && service.capabilities.length > 0 && (
          <ul className="space-y-1.5 text-sm">
            {service.capabilities.slice(0, 4).map((cap, idx) => (
              <li
                key={cap.id ?? idx}
                className="flex gap-3 text-ink-mute"
              >
                <span aria-hidden className="text-accent select-none">
                  /
                </span>
                <span>{cap.capability}</span>
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/services/${service.slug}`}
          className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-accent transition-colors w-fit"
        >
          <span>Read more</span>
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover/card:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </GlassCard>
  );
}
