import { Container } from "@/components/ui/Container";
import type { Testimonial as TestimonialType } from "@/lib/payload/queries";

interface TestimonialProps {
  testimonial: TestimonialType;
}

/**
 * Visual portrait placeholder — chrome ring with the client's
 * initials, sized so it reads as an avatar without needing a
 * real photo asset. Replace with a real <Image /> when a real
 * portrait or company logo is available.
 */
function PortraitPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-3 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, oklch(0.86 0.012 245 / 0.20), transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <div
        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border border-border-strong"
        style={{
          background:
            "conic-gradient(from 200deg, oklch(0.30 0.020 260), oklch(0.85 0.010 260), oklch(0.30 0.020 260))",
        }}
      >
        <div className="w-[88%] h-[88%] rounded-full bg-canvas flex items-center justify-center">
          <span className="font-sans font-medium text-ink text-xl tracking-tight">
            {initials}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Testimonial({ testimonial }: TestimonialProps) {
  return (
    <section
      aria-labelledby="testimonial-heading"
      className="py-24 md:py-32"
    >
      <Container size="wide">
        <blockquote className="max-w-5xl grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
          <PortraitPlaceholder name={testimonial.author} />
          <div>
            <p
              id="testimonial-heading"
              className="font-sans font-normal text-2xl md:text-4xl lg:text-5xl text-ink leading-[1.15] tracking-[-0.025em] mb-10"
            >
              <span aria-hidden className="text-accent">
                &ldquo;
              </span>
              {testimonial.quote}
              <span aria-hidden className="text-accent">
                &rdquo;
              </span>
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
          </div>
        </blockquote>
      </Container>
    </section>
  );
}
