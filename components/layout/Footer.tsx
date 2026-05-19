import Link from "next/link";
import { brand } from "@/config/brand";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-border bg-background">
      <Container size="wide" className="py-16">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)] md:gap-16">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-serif text-2xl font-medium tracking-tight text-text-primary hover:text-accent transition-colors"
            >
              {brand.name}
            </Link>
            <p className="mt-4 max-w-xs text-sm text-text-secondary leading-relaxed">
              {brand.shortTagline}
            </p>
            <a
              href={`mailto:${brand.email}`}
              className="mt-6 inline-block font-mono text-xs text-text-tertiary hover:text-accent transition-colors"
            >
              {brand.email}
            </a>
          </div>

          {site.footerNav.map((column) => (
            <div key={column.heading}>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary mb-4">
                {column.heading}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <p className="font-mono text-xs text-text-tertiary">
            © {year} {site.copyrightHolder}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {site.legalNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-xs text-text-tertiary hover:text-text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
