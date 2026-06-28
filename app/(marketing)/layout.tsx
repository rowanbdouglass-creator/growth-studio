import type { Metadata, Viewport } from "next";
import { Syne, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { brand } from "@/config/brand";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonLd";
import { LenisProvider } from "@/components/fx/LenisProvider";
import { CustomCursor } from "@/components/fx/CustomCursor";
import "../globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} | ${brand.shortTagline}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.name,
  authors: [{ name: brand.legalName }],
  openGraph: {
    title: brand.name,
    description: brand.description,
    url: brand.url,
    siteName: brand.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#F3EFE6",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${syne.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <LenisProvider>
          <CustomCursor />
          <a
            href="#main"
            className="
              sr-only focus:not-sr-only
              focus:fixed focus:top-4 focus:left-4 focus:z-[100]
              focus:px-4 focus:py-2 focus:rounded-md
              focus:bg-ink focus:text-paper focus:font-medium
            "
          >
            Skip to content
          </a>
          <Header />
          <div id="main" className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
        </LenisProvider>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
