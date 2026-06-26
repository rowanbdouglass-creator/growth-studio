import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CTASection } from "@/components/blocks/CTASection";
import { RichText } from "@/lib/lexical/RichText";
import { getTeamMembers } from "@/lib/payload/queries";
import { brand } from "@/config/brand";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: `Two-person ${brand.name}. The people behind the paid traffic, the custom systems, and the intelligence layer.`,
};

const beliefs = [
  {
    title: "Receipts over rhetoric",
    body: "We'll tell you what didn't work last quarter. If we can't measure it, we'll say so.",
  },
  {
    title: "Engineering-grade work",
    body: "Most agencies hand you half-finished prototypes wrapped in a Figma file. We don't.",
  },
  {
    title: "Compound, don't sprint",
    body: "We optimise for the next quarter's plan, not just this one. Every system we build is meant to keep paying off.",
  },
  {
    title: "Two people, real depth",
    body: "You'll always be talking to a founder. No account managers, no junior hand-offs, no Slack-only relationships.",
  },
];

export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <>
      <section className="py-24 md:py-32 border-b border-border">
        <Container size="wide">
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-8">
              About
            </Badge>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] text-text-primary mb-8 tracking-tight">
              Two people.{" "}
              <span className="italic text-text-secondary">No middle layer.</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
              We started {brand.name} because most agencies optimise for the
              wrong thing. The headcount, the deck, the retainer. Not the
              outcome. We wanted to do it differently.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container size="wide">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-12">
            What we believe
          </p>
          <ul className="grid md:grid-cols-2 gap-6">
            {beliefs.map((b) => (
              <li key={b.title}>
                <Card variant="default" className="h-full">
                  <h2 className="font-serif text-2xl text-text-primary mb-4">
                    {b.title}
                  </h2>
                  <p className="text-text-secondary leading-relaxed">
                    {b.body}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {team.length > 0 && (
        <section className="py-24 md:py-32 border-t border-border bg-surface/30">
          <Container size="wide">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-12">
              The team
            </p>
            <div className="grid md:grid-cols-2 gap-12">
              {team.map((person) => (
                <article key={person.id}>
                  <h3 className="font-serif text-3xl text-text-primary mb-2">
                    {person.name}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-tertiary mb-6">
                    {person.role}
                  </p>
                  {person.bio ? <RichText data={person.bio} /> : null}
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
