import Link from "next/link";
import { brand } from "@/config/brand";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";

export function Header() {
  return (
    <header
      className="
        sticky top-0 z-50
        bg-background/70 backdrop-blur-md
        border-b border-border
      "
    >
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-8">
          <Link
            href="/"
            aria-label={`${brand.name} home`}
            className="font-serif text-xl font-medium tracking-tight text-text-primary hover:text-accent transition-colors"
          >
            {brand.name}
          </Link>

          <nav
            aria-label="Main"
            className="hidden md:flex items-center gap-8"
          >
            {site.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className={buttonStyles({ variant: "primary", size: "sm" })}
          >
            Book a call
          </Link>
        </div>
      </Container>
    </header>
  );
}
