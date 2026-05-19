import { Container } from "@/components/ui/Container";

/**
 * Placeholder client logo treatments. Real client logos go here once
 * Nayim, Forum Studios, etc. supply usable marks.
 */
const placeholderClients = [
  "NAYIM'S",
  "T-SHOT",
  "FORUM",
  "CAPE KINGS",
  "JC SETTON",
  "CONFIDENTIAL",
];

export function LogoGrid() {
  return (
    <section
      aria-labelledby="trusted-by-heading"
      className="border-y border-border py-16 md:py-20"
    >
      <Container size="wide">
        <p
          id="trusted-by-heading"
          className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary text-center mb-10"
        >
          Trusted by ambitious teams across the UK
        </p>
        <ul
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 items-center justify-items-center"
        >
          {placeholderClients.map((name) => (
            <li
              key={name}
              className="font-serif text-xl text-text-tertiary hover:text-text-secondary transition-colors tracking-tight"
            >
              {name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
