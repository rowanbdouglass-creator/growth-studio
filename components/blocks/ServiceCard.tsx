import Link from "next/link";
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
    <article className="group/card relative h-full flex flex-col gap-6 pt-10 border-t border-rule transition-colors duration-300">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
          {meta.n}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
          {meta.label}
        </span>
      </div>

      <h3 className="font-sans font-medium text-3xl md:text-4xl text-ink leading-[1.05] tracking-[-0.025em] max-w-md">
        {service.title}
      </h3>

      <p className="text-ink-soft leading-relaxed max-w-md">
        {service.summary}
      </p>

      {service.capabilities && service.capabilities.length > 0 && (
        <ul className="space-y-1.5 text-sm max-w-md">
          {service.capabilities.slice(0, 4).map((cap, idx) => (
            <li
              key={cap.id ?? idx}
              className="flex gap-3 text-ink-mute"
            >
              <span aria-hidden className="text-accent select-none">/</span>
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
    </article>
  );
}
