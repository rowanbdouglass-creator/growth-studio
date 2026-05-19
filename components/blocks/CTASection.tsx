import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-32 md:py-44 border-t border-rule">
      <Container size="wide">
        <div className="flex items-center gap-3 mb-16 md:mb-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            08 — Talk
          </span>
          <span className="flex-1 h-px bg-rule" />
        </div>

        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20 items-end">
          <h2 className="font-sans font-medium text-ink leading-[0.95] tracking-[-0.04em] text-5xl md:text-6xl lg:text-7xl max-w-3xl">
            Ready to see{" "}
            <span className="italic-editorial font-normal text-ink-soft">
              what's possible?
            </span>
          </h2>
          <div className="space-y-8 max-w-sm">
            <p className="text-lg text-ink-soft leading-relaxed">
              30 minutes. We look at your numbers, walk through one real
              play we'd run this quarter, you leave with something useful
              either way.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className={buttonStyles({ variant: "primary", size: "lg" })}
              >
                Book a discovery call
              </Link>
              <Link
                href="/tools/website-audit"
                className="inline-flex items-center gap-2 text-ink-soft hover:text-accent transition-colors text-sm"
              >
                <span>Or run an audit first</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
