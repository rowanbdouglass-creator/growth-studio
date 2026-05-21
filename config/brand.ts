/**
 * Brand abstraction layer.
 *
 * Every brand-facing string in the codebase MUST reference this object.
 * A rebrand should be a 30-minute job: edit this file, swap the SVG logos
 * in /public/assets/, and the entire site updates.
 *
 * Hard rule: never hardcode brand.name, brand.tagline, brand.email, etc.
 * anywhere else. If you find yourself typing "Growth Studio" in a component,
 * import from here instead.
 */
export const brand = {
  /** Display name used in headings, og tags, copyright. */
  name: "Growth Studio",

  /** Full legal entity name for ToS, contracts, footer. */
  legalName: "You Look Booked Ltd",

  /** UK Companies House registration number — required on legal/footer copy. */
  companiesHouseNumber: "17020720",

  /** Long tagline used in eyebrow text, hero pre-headlines. */
  tagline: "Paid traffic. Custom systems. Intelligence at the core.",

  /** Short tagline used in og descriptions, meta titles, abbreviated contexts. */
  shortTagline: "A growth studio for businesses ready to scale.",

  /** Marketing description — used in meta descriptions and og:description. */
  description:
    "A two-person growth studio combining paid traffic, custom operational software, and AI-powered intelligence into one revenue engine for established businesses ready to scale.",

  /** Canonical URL of the live site. Used in metadataBase, og:url, sitemap. */
  url: "https://ylb.youlookbooked.com",

  /** Primary contact email. */
  email: "hello@youlookbooked.com",

  /** Primary contact phone (UK format). */
  phone: "+44 0000 000 000",

  /** Social media handles / URLs. Leave empty until accounts exist. */
  social: {
    linkedin: "",
    twitter: "",
    instagram: "",
  },

  /** Logo asset paths. Replace SVG files in /public/assets/ during rebrand. */
  logo: {
    light: "/assets/logo-light.svg",
    dark: "/assets/logo-dark.svg",
    mark: "/assets/logo-mark.svg",
  },
} as const;

export type Brand = typeof brand;
