import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { CTASection } from "@/components/blocks/CTASection";
import { getServices } from "@/lib/payload/queries";
import { brand } from "@/config/brand";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description: `Three pillars from ${brand.name}: paid growth, custom systems, and an intelligence layer that makes both smarter every quarter.`,
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <section className="py-24 md:py-32 border-b border-border">
        <Container size="wide">
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-8">
              Services
            </Badge>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] text-text-primary mb-8 tracking-tight">
              Three pillars,{" "}
              <span className="italic text-text-secondary">one engine.</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
              Paid traffic, custom operational systems, and an intelligence
              layer. Run independently they each move the needle. Stitched
              together they compound.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container size="wide">
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
