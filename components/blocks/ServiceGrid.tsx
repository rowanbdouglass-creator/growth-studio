import { Container } from "@/components/ui/Container";
import { ServiceCard } from "./ServiceCard";
import type { Service } from "@/lib/payload/queries";

interface ServiceGridProps {
  services: Service[];
}

export function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <section
      aria-labelledby="services-heading"
      className="py-32 md:py-44"
    >
      <Container size="wide">
        <div className="flex items-center gap-3 mb-16 md:mb-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            02 — What we do
          </span>
          <span className="flex-1 h-px bg-rule" />
        </div>

        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20 mb-20 md:mb-28 items-end">
          <h2
            id="services-heading"
            className="font-sans font-medium text-ink leading-[0.98] tracking-[-0.035em] text-5xl md:text-6xl lg:text-7xl max-w-3xl"
          >
            Three pillars,{" "}
            <span className="italic-editorial font-normal text-ink-soft">
              one engine.
            </span>
          </h2>
          <p className="text-lg text-ink-soft leading-relaxed max-w-md">
            Paid traffic without systems leaks. Systems without traffic
            don't scale. We build both — and an intelligence layer that
            keeps both sharper every quarter.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {services.map((service) => (
            <div key={service.id} className="anim-reveal h-full">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
