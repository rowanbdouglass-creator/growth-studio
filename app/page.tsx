import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { brand } from "@/config/brand";

export default function Home() {
  return (
    <section className="flex-1 flex items-center py-24 md:py-32">
      <Container size="wide">
        <div className="max-w-4xl">
          <Badge variant="accent" className="mb-8">
            {brand.tagline}
          </Badge>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.02] text-text-primary mb-8">
            A growth studio for businesses{" "}
            <span className="italic text-text-secondary">
              ready to scale.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-12">
            Paid traffic that performs. Custom operational systems that
            compound. An intelligence layer that makes both smarter every
            quarter.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/tools/website-audit"
              className={buttonStyles({ variant: "primary", size: "lg" })}
            >
              Run a free audit
            </Link>
            <Link
              href="/work"
              className={buttonStyles({ variant: "secondary", size: "lg" })}
            >
              See our work
            </Link>
          </div>

          <p className="font-mono text-xs text-text-tertiary mt-24">
            Foundation — Phase 1 ✱ Primitives, Header, Footer, Skip-link wired.
          </p>
        </div>
      </Container>
    </section>
  );
}
