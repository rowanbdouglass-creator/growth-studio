import { Container } from "@/components/ui/Container";
import type { Testimonial as TestimonialType } from "@/lib/payload/queries";

interface TestimonialProps {
  testimonial: TestimonialType;
}

export function Testimonial({ testimonial }: TestimonialProps) {
  return (
    <section
      aria-labelledby="testimonial-heading"
      className="py-24 md:py-32"
    >
      <Container size="default">
        <p
          id="testimonial-heading"
          className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary text-center mb-12"
        >
          What clients say
        </p>

        <blockquote className="text-center max-w-3xl mx-auto">
          <p className="font-serif text-3xl md:text-4xl lg:text-5xl italic leading-[1.2] text-text-primary mb-10">
            <span aria-hidden className="text-accent mr-2">“</span>
            {testimonial.quote}
            <span aria-hidden className="text-accent ml-2">”</span>
          </p>
          <footer>
            <p className="font-serif text-lg text-text-primary">
              {testimonial.author}
            </p>
            {(testimonial.role || testimonial.company) && (
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-tertiary mt-2">
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
