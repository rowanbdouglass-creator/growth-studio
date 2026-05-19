import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/forms/ContactForm";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a conversation with ${brand.name}. 30 minutes, your numbers, one real play we'd run for you this quarter.`,
};

export default function ContactPage() {
  return (
    <section className="py-24 md:py-32">
      <Container size="default">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16">
          <div>
            <Badge variant="accent" className="mb-8">
              Contact
            </Badge>
            <h1 className="font-serif text-5xl md:text-6xl font-medium leading-[1.05] text-text-primary mb-8 tracking-tight">
              Let's talk{" "}
              <span className="italic text-text-secondary">real numbers.</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-10">
              30 minutes. We'll look at your account, walk through one play
              we'd actually run for you this quarter, and you'll leave with
              something useful either way.
            </p>

            <div className="space-y-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary mb-2">
                  Email
                </p>
                <a
                  href={`mailto:${brand.email}`}
                  className="text-text-primary text-lg hover:text-accent transition-colors"
                >
                  {brand.email}
                </a>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary mb-2">
                  Response time
                </p>
                <p className="text-text-primary">
                  Within one working day, usually faster.
                </p>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
