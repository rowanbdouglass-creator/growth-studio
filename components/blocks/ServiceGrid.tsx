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
      className="relative py-28 md:py-40 overflow-hidden"
    >
      <Container size="wide">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20 mb-16 md:mb-20 items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-6">
              · Three pillars, one engine
            </p>
            <h2
              id="services-heading"
              className="font-display font-medium text-ink leading-[0.95] tracking-[-0.035em] text-5xl md:text-6xl lg:text-7xl"
            >
              We don't sell{" "}
              <span
                className="italic-editorial font-normal text-ink-soft"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                point solutions.
              </span>
            </h2>
          </div>
          <p className="text-lg text-ink-soft leading-relaxed md:pl-10 md:border-l md:border-border max-w-md">
            Paid traffic without custom systems leaks. Custom systems without
            paid traffic don't scale. We build both — and an intelligence layer
            that keeps both sharper every quarter.
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
