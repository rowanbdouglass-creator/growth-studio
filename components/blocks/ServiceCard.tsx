import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Service } from "@/lib/payload/queries";

const pillarLabel: Record<Service["pillar"], string> = {
  "paid-growth": "01 · Paid Growth",
  "custom-systems": "02 · Custom Systems",
  "intelligence-layer": "03 · Intelligence Layer",
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card
      as="article"
      variant="default"
      className="flex flex-col gap-6 h-full transition-[border-color,background-color] duration-200 hover:border-border-strong hover:bg-surface-elevated"
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
        {pillarLabel[service.pillar]}
      </p>

      <h3 className="font-serif text-3xl font-medium text-text-primary leading-tight">
        {service.title}
      </h3>

      <p className="text-text-secondary leading-relaxed">{service.summary}</p>

      {service.capabilities && service.capabilities.length > 0 && (
        <ul className="mt-2 space-y-2 text-sm text-text-tertiary">
          {service.capabilities.slice(0, 4).map((cap, idx) => (
            <li key={cap.id ?? idx} className="flex gap-2">
              <span aria-hidden className="text-accent">·</span>
              <span>{cap.capability}</span>
            </li>
          ))}
        </ul>
      )}

      <Link
        href={`/services/${service.slug}`}
        className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-text-primary group/link"
      >
        <span className="group-hover/link:text-accent transition-colors">
          See how it works
        </span>
        <span
          aria-hidden
          className="text-accent transition-transform duration-200 group-hover/link:translate-x-1"
        >
          →
        </span>
      </Link>
    </Card>
  );
}
