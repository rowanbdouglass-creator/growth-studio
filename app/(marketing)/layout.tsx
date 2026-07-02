import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { brand } from "@/config/brand";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonLd";
import { LenisProvider } from "@/components/fx/LenisProvider";
import { Loader } from "@/components/fx/Loader";
import "../globals.css";

// Display: Cabinet Grotesk (ITF via Fontshare, self-hosted variable).
// Heavy weights carry the headlines; no serif emphasis anywhere.
const display = localFont({
  src: "../../public/fonts/CabinetGrotesk-Variable.woff2",
  weight: "100 900",
  variable: "--font-display",
  display: "swap",
});

// Body: General Sans (ITF via Fontshare, self-hosted variable + italic).
const sans = localFont({
  src: [
    {
      path: "../../public/fonts/GeneralSans-Variable.woff2",
      weight: "200 700",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-VariableItalic.woff2",
      weight: "200 700",
      style: "italic",
    },
  ],
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
  themeColor: "#0E0D0B",
  colorScheme: "dark",
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
      className={`${display.variable} ${sans.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <LenisProvider>
          <Loader />
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
