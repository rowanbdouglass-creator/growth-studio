import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-24 md:py-32">
      <Container size="default">
        <div className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] text-text-primary mb-6">
            Ready to see{" "}
            <span className="italic text-text-secondary">what's possible?</span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-12">
            30 minutes. We'll look at your numbers, walk through one
            real-world play we'd run for you this quarter, and you'll leave
            with something useful either way.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className={buttonStyles({ variant: "primary", size: "lg" })}
            >
              Book a discovery call
            </Link>
            <Link
              href="/tools/website-audit"
              className={buttonStyles({ variant: "secondary", size: "lg" })}
            >
              Run an audit first
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
