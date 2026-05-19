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
    <Link
      href={`/services/${service.slug}`}
      data-cursor-mode="view"
      data-cursor-label="view"
      className="group/card block h-full"
    >
      <GlassCard
        as="article"
        className="h-full transition-all duration-500 group-hover/card:[transform:translateY(-4px)]"
      >
        <div className="relative flex flex-col gap-6 h-full p-8 md:p-9 overflow-hidden">
          {/* Hover shimmer */}
          <div
            aria-hidden
            className="absolute -inset-x-1/2 -top-1/2 h-[200%] w-[200%] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"
            style={{
              background:
                "radial-gradient(40% 30% at 30% 20%, oklch(0.86 0.012 245 / 0.10), transparent 60%)",
            }}
          />

          <div className="flex items-baseline gap-4 relative">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
              {meta.n}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
              {meta.label}
            </span>
          </div>

          <h3 className="font-sans font-medium text-2xl md:text-3xl text-ink leading-[1.1] tracking-[-0.025em] relative">
            {service.title}
          </h3>

          <p className="text-ink-soft leading-relaxed text-sm md:text-base relative">
            {service.summary}
          </p>

          {service.capabilities && service.capabilities.length > 0 && (
            <ul className="space-y-1.5 text-sm relative">
              {service.capabilities.slice(0, 4).map((cap, idx) => (
                <li key={cap.id ?? idx} className="flex gap-3 text-ink-mute">
                  <span aria-hidden className="text-accent select-none">
                    /
                  </span>
                  <span>{cap.capability}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-medium text-ink-soft group-hover/card:text-accent transition-colors w-fit relative">
            <span>Read more</span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover/card:translate-x-2"
            >
              →
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
