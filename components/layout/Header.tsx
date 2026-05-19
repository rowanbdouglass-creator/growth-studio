import Link from "next/link";
import { brand } from "@/config/brand";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import { Logomark } from "@/components/brand/Logomark";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header
      className="
        sticky top-0 z-50
        bg-canvas/70 backdrop-blur-md
        border-b border-border
      "
    >
      <Container size="wide">
        <div className="flex h-14 md:h-16 items-center justify-between gap-8">
          <Link
            href="/"
            aria-label={`${brand.name} home`}
            className="group/logo flex items-center gap-2.5 text-ink hover:text-accent transition-colors"
          >
            <Logomark animate />
            <span className="font-sans text-sm md:text-base font-medium tracking-tight">
              {brand.name}
            </span>
          </Link>

          <nav
            aria-label="Main"
            className="hidden md:flex items-center gap-7"
          >
            {site.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-ink-soft hover:text-ink transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={`${buttonStyles({ variant: "primary", size: "sm" })} hidden md:inline-flex`}
            >
              Book a call
            </Link>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
