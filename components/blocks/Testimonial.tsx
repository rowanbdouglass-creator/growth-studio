import { Container } from "@/components/ui/Container";
import type { Testimonial as TestimonialType } from "@/lib/payload/queries";

interface TestimonialProps {
  testimonial: TestimonialType;
}

export function Testimonial({ testimonial }: TestimonialProps) {
  return (
    <section
      aria-labelledby="testimonial-heading"
      className="py-32 md:py-44 border-t border-rule"
    >
      <Container size="wide">
        <div className="flex items-center gap-3 mb-16 md:mb-20">
          <span
            id="testimonial-heading"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute"
          >
            07 — In their words
          </span>
          <span className="flex-1 h-px bg-rule" />
        </div>

        <blockquote className="max-w-4xl">
          <p className="font-sans font-normal text-3xl md:text-5xl lg:text-6xl text-ink leading-[1.1] tracking-[-0.025em] mb-10">
            <span aria-hidden className="text-accent">“</span>
            {testimonial.quote}
            <span aria-hidden className="text-accent">”</span>
          </p>
          <footer>
            <p className="text-base text-ink mb-1">{testimonial.author}</p>
            {(testimonial.role || testimonial.company) && (
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">
                {[testimonial.role, testimonial.company]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </footer>
        </blockquote>
      </Container>
    </section>
  );
}
