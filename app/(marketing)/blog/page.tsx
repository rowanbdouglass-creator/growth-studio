import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/blocks/CTASection";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Notes",
  description: `Writing from ${brand.name} on paid growth, custom systems, and AI tooling for established businesses.`,
};

export default function BlogPage() {
  return (
    <>
      <section className="py-24 md:py-32 border-b border-border">
        <Container size="wide">
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-8">
              Notes
            </Badge>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] text-text-primary mb-8 tracking-tight">
              Writing{" "}
              <span className="italic text-text-secondary">in progress.</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
              Field notes from real engagements — what worked, what didn't,
              and the playbooks we're actively iterating on. First posts
              landing soon.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container size="default">
          <div className="p-12 rounded-lg border border-border bg-surface text-center">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary mb-4">
              Nothing here yet
            </p>
            <p className="font-serif text-2xl text-text-primary leading-snug max-w-xl mx-auto">
              We'd rather post nothing than fill space with thin content.
              Subscribe to the email list to know when posts go live.
            </p>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
