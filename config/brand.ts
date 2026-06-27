/**
 * Brand abstraction layer — You Look Booked identity.
 *
 * You Look Booked is an AI-native growth & systems studio for UK SMEs.
 * Positioning: outcome promise (booked = busy with customers). Multi-discipline:
 * AI calling agents, custom software / systems, website design, AI-optimised
 * paid traffic. Word-of-mouth-only acquisition in next 12 months — site is a
 * 90-second credibility check, not a cold-conversion brochure.
 *
 * Every brand-facing string in the codebase MUST reference this object.
 */
export const brand = {
  /** Display name used in headings, og tags, copyright. */
  name: "You Look Booked",

  /** Short form for tight spaces. */
  shortName: "You Look Booked",

  /** Full legal entity name. */
  legalName: "You Look Booked Ltd",

  /** UK Companies House registration number. */
  companiesHouseNumber: "17020720",

  /** Category descriptor — pairs with the brand name. */
  descriptor: "A growth & systems studio.",

  /** Long tagline. */
  tagline:
    "We make UK SMEs look booked. AI calling agents, custom software, websites, and AI-optimised paid traffic — built and run by people who ship.",

  /** Short tagline. */
  shortTagline: "We make UK SMEs look booked.",

  /** Marketing description. */
  description:
    "An AI-native growth & systems studio for UK SMEs. We design AI calling agents, build custom operational software, ship conversion-focused websites, and run AI-optimised paid traffic — all under one roof.",

  /** Canonical URL. */
  url: "https://growth-studio-two.vercel.app",

  /** Primary contact email. */
  email: "hello@youlookbooked.com",

  /** Primary contact phone. */
  phone: "+44 0000 000 000",

  social: {
    linkedin: "",
    twitter: "",
    instagram: "",
  },

  /** Logo asset paths. Swap once a style is chosen from /logos.html. */
  logo: {
    light: "/assets/logo-light.svg",
    dark: "/assets/logo-dark.svg",
    mark: "/assets/logo-mark.svg",
  },
} as const;

export type Brand = typeof brand;
