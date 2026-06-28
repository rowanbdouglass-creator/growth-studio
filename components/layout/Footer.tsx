import Link from "next/link";
import { brand } from "@/config/brand";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/brand/Wordmark";

/**
 * Site footer. Dark ink surface with the brand wordmark, three nav
 * columns, an end-of-week sign-off, and a Companies House line.
 */
export function Footer() {
  return (
    <footer
      className="bg-[color:var(--color-ink)] text-[color:var(--color-paper)] pt-20 pb-9"
      data-bg="dark"
    >
      <Container size="wide">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 md:gap-14 mb-12 md:mb-20">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              aria-label={`${brand.name} home`}
              className="inline-block hover:opacity-70 transition-opacity"
              data-cur="pen"
            >
              <Wordmark
                size={36}
                letterColor="var(--color-paper)"
                bColor="var(--color-red)"
              />
            </Link>
            <p
              className="mt-5 max-w-[34ch] leading-[1.55]"
              style={{
                color: "var(--color-pencil-soft, #B2A99D)",
                fontSize: 14,
              }}
            >
              A growth &amp; systems studio for UK SMEs. We fill the calendar
              — then build the things that keep it full.
            </p>
          </div>

          <FootCol heading="STUDIO">
            <FootLink href="/work">Past appointments</FootLink>
            <FootLink href="/services">Services</FootLink>
            <FootLink href="/about">About</FootLink>
          </FootCol>

          <FootCol heading="LEGAL">
            <FootLink href="/privacy">Privacy</FootLink>
            <FootLink href="/terms">Terms</FootLink>
            <FootLink href="/accessibility">Accessibility</FootLink>
          </FootCol>

          <FootCol heading="CONTACT">
            <FootLink href={`mailto:${brand.email}`}>{brand.email}</FootLink>
            <FootLink href="/contact">Find a slot</FootLink>
            <FootLink href="#">LinkedIn</FootLink>
          </FootCol>
        </div>

        <div
          className="py-7 border-t border-b flex justify-between items-center flex-wrap gap-3 mb-6"
          style={{ borderColor: "#3A3833" }}
        >
          <div
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3.5vw, 46px)",
              letterSpacing: "-0.022em",
              lineHeight: 1.1,
            }}
          >
            End of week.
            <br />
            <em style={{ color: "var(--color-red)", fontStyle: "italic" }}>
              See you Monday.
            </em>
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "var(--color-pencil-soft, #B2A99D)",
              textTransform: "uppercase",
              lineHeight: 1.6,
            }}
          >
            Next open slot
            <br />
            <b style={{ color: "var(--color-red)", fontWeight: 700 }}>
              Fri · 14 Jul · 14:00
            </b>
          </div>
        </div>

        <div
          className="flex justify-between flex-wrap gap-3"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "var(--color-pencil)",
            textTransform: "uppercase",
          }}
        >
          <span>
            © 2026 {brand.legalName} · Companies House{" "}
            {brand.companiesHouseNumber}
          </span>
          <span>UK</span>
        </div>
      </Container>
    </footer>
  );
}

function FootCol({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "var(--color-pencil-soft, #B2A99D)",
          marginBottom: 18,
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        {heading}
      </h4>
      <ul className="flex flex-col gap-[11px] list-none p-0">{children}</ul>
    </div>
  );
}

function FootLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="hover:text-[color:var(--color-red)] transition-colors"
        style={{ fontSize: 15, color: "#D4CFC2" }}
        data-cur="pen"
      >
        {children}
      </Link>
    </li>
  );
}
