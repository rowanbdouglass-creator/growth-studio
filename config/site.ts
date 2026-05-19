import { brand } from "./brand";

/**
 * Site-level configuration that isn't brand-specific.
 * Nav structure, locale, feature flags, etc.
 */
export const site = {
  locale: "en-GB",
  defaultOgImage: "/assets/og-default.png",

  /** Top-level navigation shown in the header. */
  mainNav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Tools", href: "/tools" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  /** Footer column structure. */
  footerNav: [
    {
      heading: "Services",
      links: [
        { label: "Paid Growth", href: "/services/paid-growth" },
        { label: "Custom Systems", href: "/services/custom-systems" },
        { label: "Intelligence Layer", href: "/services/intelligence-layer" },
      ],
    },
    {
      heading: "Tools",
      links: [
        { label: "Ad Audit", href: "/tools/ad-audit" },
        { label: "Website Audit", href: "/tools/website-audit" },
        { label: "Discovery Hub", href: "/tools/discovery-hub" },
      ],
    },
    {
      heading: "Studio",
      links: [
        { label: "About", href: "/about" },
        { label: "Work", href: "/work" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],

  /** Legal links shown in the footer base row. */
  legalNav: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],

  /** Copyright line — year auto-injected in the footer component. */
  copyrightHolder: brand.legalName,
} as const;

export type Site = typeof site;
