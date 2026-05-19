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
      className="py-24 md:py-32"
    >
      <Container size="wide">
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-6">
            Three pillars, one engine
          </p>
          <h2
            id="services-heading"
            className="font-serif text-4xl md:text-5xl font-medium leading-[1.1] text-text-primary"
          >
            We don't sell{" "}
            <span className="italic text-text-secondary">point solutions.</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mt-6">
            Paid traffic without custom systems leaks. Custom systems without
            paid traffic don't scale. We build both — and an intelligence
            layer that keeps them sharper every quarter.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
