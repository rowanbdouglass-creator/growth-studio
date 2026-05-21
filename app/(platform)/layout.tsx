import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { brand } from "@/config/brand";
import "../globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `Platform · ${brand.name}`,
    template: `%s · Platform`,
  },
  description: "Internal agency operating system",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0d0c0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/**
 * Internal-only agency platform UI. Hidden from search engines. Will
 * be gated by Clerk in Chunk 2E; for now any authenticated Payload
 * user can reach it via the cross-link from /admin.
 *
 * Distinct from the marketing layout: no public header/footer, no
 * cursor glow, no marketing chrome. Built for speed of use, not
 * conversion. Per the brief: "ship ugly internally."
 */
export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${hanken.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex bg-canvas text-ink">
        <PlatformSidebar />
        <main className="flex-1 min-w-0 flex flex-col">{children}</main>
      </body>
    </html>
  );
}

function PlatformSidebar() {
  const nav = [
    {
      label: "Dashboard",
      items: [{ href: "/platform", name: "Overview" }],
    },
    {
      label: "CRM",
      items: [
        { href: "/platform/contacts", name: "Contacts" },
        { href: "/platform/companies", name: "Companies" },
        { href: "/platform/pipeline", name: "Pipeline" },
        { href: "/platform/activity", name: "Activity feed" },
      ],
    },
    {
      label: "Tools",
      items: [
        { href: "/platform/audits", name: "Audits" },
        { href: "/platform/hubs", name: "Discovery Hubs" },
        { href: "/platform/outreach", name: "Outreach" },
      ],
    },
    {
      label: "Admin",
      items: [
        { href: "/admin", name: "Payload CMS" },
        { href: "/platform/settings", name: "Settings" },
      ],
    },
  ];

  return (
    <aside className="w-60 shrink-0 border-r border-border bg-canvas-2/40 flex flex-col">
      <div className="px-5 py-4 border-b border-border">
        <Link
          href="/platform"
          className="font-sans text-sm font-medium tracking-tight text-ink"
        >
          {brand.name}
          <span className="text-ink-mute font-normal ml-1.5">/ platform</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {nav.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim mb-2">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-2 py-1.5 text-sm text-ink-soft hover:text-ink hover:bg-canvas rounded transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="px-5 py-3 border-t border-border">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
          Auth pending · Chunk 2E
        </p>
      </div>
    </aside>
  );
}
