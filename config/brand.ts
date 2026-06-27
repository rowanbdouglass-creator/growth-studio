/**
 * Brand abstraction layer — Receipts identity.
 *
 * Receipts is a two-person UK agency that runs the traffic and builds
 * the systems that hold the revenue. Brand voice is dry, operator-
 * confident, anti-pitch. Receipts deliver proof: real numbers,
 * recovered spend, hours saved, ROAS that moves. Anything we promise
 * lands in writing, signed and dated.
 *
 * Every brand-facing string in the codebase MUST reference this object.
 */
export const brand = {
  /** Display name. Lowercase, always. */
  name: "receipts",

  /** Display name with the stop period — wordmark form. */
  nameWithStop: "receipts.",

  /** Full legal entity name. */
  legalName: "You Look Booked Ltd",

  /** UK Companies House registration number. */
  companiesHouseNumber: "17020720",

  /** Long tagline. */
  tagline:
    "Paid traffic and the systems that hold the revenue. Built once, built right, signed.",

  /** Short tagline. */
  shortTagline:
    "Paid traffic and the systems that hold the revenue.",

  /** Marketing description. */
  description:
    "A two-person UK agency that runs the traffic and builds the systems that hold the revenue. Real numbers, recovered spend, signed and dated.",

  /** Canonical URL. */
  url: "https://growth-studio-two.vercel.app",

  /** Primary contact email. */
  email: "hello@receipts.studio",

  /** Primary contact phone. */
  phone: "+44 0000 000 000",

  /** Brand palette tokens. */
  palette: {
    paper: "#F3EFE6",
    ink: "#1B1A17",
    red: "#C4472E",
    pencil: "#8C887D",
    slip: "#FCFBF7",
  },

  social: {
    linkedin: "",
    twitter: "",
    instagram: "",
  },

  /** Logo asset paths. */
  logo: {
    light: "/assets/logo-light.svg",
    dark: "/assets/logo-dark.svg",
    mark: "/assets/logo-mark.svg",
  },
} as const;

export type Brand = typeof brand;
