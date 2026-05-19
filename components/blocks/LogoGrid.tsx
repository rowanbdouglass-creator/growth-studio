import { Container } from "@/components/ui/Container";

/**
 * Selected client list. Treated as type, not logos — confident,
 * editorial. Real SVG marks can replace these later.
 */
const clients = [
  "Nayim's Embroideries",
  "T-SHOT",
  "Forum Studios",
  "Cape Kings",
  "JC Setton Opticians",
  "Confidential",
];

export function LogoGrid() {
  return (
    <section
      aria-labelledby="clients-heading"
      className="py-20 md:py-24"
    >
      <Container size="wide">
        <div className="flex items-center gap-3 mb-10">
          <span
            id="clients-heading"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute"
          >
            Selected clients · 2024 — 2026
          </span>
          <span className="flex-1 h-px bg-rule" />
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6">
          {clients.map((name) => (
            <li
              key={name}
              className="font-sans text-base md:text-lg text-ink-mute hover:text-ink transition-colors duration-200 tracking-tight"
            >
              {name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
