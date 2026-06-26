import { Container } from "@/components/ui/Container";

/**
 * Selected client wall. Each entry renders as a real visual mark
 * (monogram in a circle) plus the brand name set in the page voice.
 * Replaces the previous text-only wordmark wall, which read as
 * placeholder.
 */
interface ClientMark {
  name: string;
  initials: string;
  sector: string;
}

const clients: ClientMark[] = [
  { name: "Nayim's Embroideries", initials: "N", sector: "Embroidery" },
  { name: "JC Setton Opticians", initials: "JC", sector: "Optometry" },
  { name: "T-SHOT", initials: "TS", sector: "Print" },
  { name: "Forum Studios", initials: "F", sector: "Creative" },
  { name: "Cape Kings", initials: "CK", sector: "Retail" },
  { name: "Confidential", initials: "·", sector: "Finance" },
];

function Monogram({ initials }: { initials: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width="40"
      height="40"
      role="img"
      aria-hidden
      className="shrink-0"
    >
      <circle
        cx="20"
        cy="20"
        r="19"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.45"
      />
      <text
        x="20"
        y="25"
        textAnchor="middle"
        fontFamily="var(--font-sans), sans-serif"
        fontSize={initials.length > 1 ? "11" : "14"}
        fontWeight="500"
        fill="currentColor"
        letterSpacing="0.5"
      >
        {initials}
      </text>
    </svg>
  );
}

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
            Selected clients
          </span>
          <span className="flex-1 h-px bg-rule" />
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-8">
          {clients.map((c) => (
            <li
              key={c.name}
              className="group flex items-center gap-4 text-ink-mute hover:text-ink transition-colors duration-200"
            >
              <Monogram initials={c.initials} />
              <div className="min-w-0">
                <p className="font-sans text-base md:text-lg tracking-tight truncate">
                  {c.name}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim mt-0.5">
                  {c.sector}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
