# Claude Code Build Brief — Growth Studio Agency Site

**Next.js 15 + Payload CMS + Vercel + Neon**

## 1. Project Overview

Build a brand-new agency website from scratch for a UK-based growth studio. Two-person partnership: one founder runs paid traffic (Meta, Google, social ads), the other builds custom operational software, conversion systems, and AI-powered tooling. Together they're a complete revenue engine for established SMEs ready to scale (£10k–£50k+ engagements).

This site is a sales tool. Its job is to convert technically-aware prospects into discovery calls. It must out-design and out-perform 95% of UK agency sites. It must feel native-app-smooth, load instantly, animate beautifully, and signal to inspecting developers that the team behind it builds at a high level.

This is a cutting-edge build. Push design and tech to the current edge — View Transitions API, scroll-driven CSS animations, React Server Components, partial prerendering, container queries, the works. The site itself must be an experience.

The company name is not finalised. Build brand-agnostic with all brand references (name, logo, colours, fonts, tagline) controlled from a single config file at `/config/brand.ts` so a future rebrand is a 30-minute job. Use placeholder name "Growth Studio" and placeholder client treatments throughout for now.

## 2. Tech Stack — Locked Decisions

**Framework & language:**
- Next.js 15+ with App Router, React Server Components, Server Actions, Partial Prerendering
- TypeScript in strict mode
- React 19+

**Styling:**
- Tailwind CSS v4 (CSS-first config via `@theme` directive)
- CSS custom properties for design tokens
- CSS Container Queries where appropriate
- Native CSS `animation-timeline` for scroll-driven animations
- Native View Transitions API for page transitions

**Animation:**
- Native CSS animations and `@starting-style` for entry animations
- Native View Transitions API for route changes
- Motion (motion, formerly Framer Motion) only where CSS can't handle it (complex orchestration, gesture-based interactions)

**CMS:**
- Payload CMS v3+ (self-hosted, runs inside the Next.js app)
- Postgres database via Neon

**Database:**
- Neon (serverless Postgres) — free tier, connection string from Neon dashboard

**File storage:**
- Vercel Blob (free tier, integrates natively with Next.js)
- Alternative: Cloudflare R2 if Vercel Blob limits hit

**Forms & email:**
- Native Server Actions for form submission
- Resend for transactional email (free tier, 3,000/month)
- Form validation: Zod + React Hook Form

**Icons:** Lucide React

**Fonts (self-hosted via `next/font/google`):**
- Fraunces (variable serif) — headings
- Inter (variable sans) — body
- JetBrains Mono — code/technical accents

**Analytics:** Vercel Analytics + Vercel Speed Insights (free tiers initially)

**Deployment:** Vercel (Hobby tier initially, upgrade to Pro when paid)

**Version control:** Git from day one, hosted on GitHub

**Monorepo structure:** Single Next.js app for now. Structure code so audit tools (built later) can be added as separate apps in a Turborepo workspace if we go that route.

## 3. Strategic Context — What This Agency Actually Does

Three productised offerings:

**Paid Growth** — Cold outreach, paid social, paid search, performance marketing.

**Custom Systems** — Bespoke WordPress/WooCommerce operational hubs and conversion systems. Real case studies (use structured placeholder content for now, easy to fill in later):
- **Nayim's Hub** — Custom WooCommerce operations hub for an embroidery business: quoting, packing slips, QuickBooks integration, Diamond Logistics delivery booking, staff logins, Tamil/English toggle, mobile-compatible hub stations.
- **T-SHOT** — Dark-themed WooCommerce product configurator wizard for customisable golf hats with dynamic attribute steps and variation image swapping.
- **Forum Studios** — WooCommerce Bookings studio booking site with custom dark/gold theme.
- **Cape Kings** — E-commerce site with security hardening (Cloudflare Turnstile, bot mitigation).
- **JC Setton Opticians** — WordPress e-commerce + booking platform with prescription saving, membership plans, Fluent Support ticketing.

**Intelligence Layer** — AI-powered audit tools and Discovery Hub experiences. Three tools coming after the site:
- **Ad Audit Tool** — Meta + Google OAuth, 90-day campaign analysis, dashboard with wastage findings, quick wins, benchmarks, forecasts.
- **Website & Systems Audit Tool** — URL input, Playwright crawl + screenshots, Claude visual analysis against vertical-specific playbooks, business-model audit output.
- **Discovery Hub** — Per-client portal after discovery calls with AI-transcribed notes, proposal cards, embedded Claude Q&A.

These are built later as separate Next.js apps sharing the Payload backend. The marketing site needs prominent landing pages for each with waitlist forms now.

## 4. Design System — Locked Decisions

**Visual direction:** Dark and premium. Reference: Linear, Vercel, Anthropic, Cursor, The Browser Company.

**Colour palette** (in `@theme` block):

```css
--color-background:        oklch(0.13 0.005 280);    /* near-black, subtle warm */
--color-surface:           oklch(0.16 0.006 280);    /* card backgrounds */
--color-surface-elevated:  oklch(0.19 0.007 280);    /* hover/elevated */
--color-border:            oklch(0.24 0.008 280);    /* subtle dividers */
--color-border-strong:     oklch(0.32 0.010 280);    /* emphasised dividers */
--color-text-primary:      oklch(0.96 0.003 280);    /* main text */
--color-text-secondary:    oklch(0.72 0.005 280);    /* muted text */
--color-text-tertiary:     oklch(0.52 0.006 280);    /* labels, captions */
--color-accent:            oklch(0.74 0.18 50);      /* warm electric amber */
--color-accent-hover:      oklch(0.70 0.20 47);      /* deeper amber */
--color-accent-subtle:     oklch(0.74 0.18 50 / 0.12); /* tinted bg */
--color-success:           oklch(0.78 0.16 155);     /* used sparingly */
--color-mono-blue:         oklch(0.42 0.04 240);     /* tertiary UI */
```

Use OKLCH for all colours — better perceptual uniformity, wider gamut, current best practice.

**Typography:**
- Fraunces for headings: variable axes (weight 300-900, optical size 9-144, soft/wonky axes). Use weights 400-600 typically, with selective italic for editorial flourishes.
- Inter for body: weights 400/500/600/700, variable.
- JetBrains Mono for code, technical labels, stat blocks, monospaced accents.

**Fluid type scale using `clamp()`. Define in theme:**

```css
--text-xs:    clamp(0.75rem, 0.7rem + 0.25vw, 0.85rem);
--text-sm:    clamp(0.875rem, 0.825rem + 0.25vw, 1rem);
--text-base:  clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--text-lg:    clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem);
--text-xl:    clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
--text-2xl:   clamp(1.5rem, 1.3rem + 1vw, 2rem);
--text-3xl:   clamp(1.875rem, 1.5rem + 1.875vw, 2.75rem);
--text-4xl:   clamp(2.25rem, 1.75rem + 2.5vw, 3.75rem);
--text-5xl:   clamp(3rem, 2.25rem + 3.75vw, 5rem);
--text-6xl:   clamp(3.75rem, 2.75rem + 5vw, 7rem);
--text-display: clamp(4.5rem, 3rem + 7.5vw, 9rem);
```

**Spacing:** 4px base scale. Tailwind's default scale plus custom large values for hero sections.

**Border radius:**
- `--radius-sm: 4px`
- `--radius-md: 8px`
- `--radius-lg: 12px`
- `--radius-xl: 16px`
- `--radius-2xl: 24px`

No fully-rounded blobs. Subtle radii throughout.

**Motion:**
- Default easing: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth ease-out)
- Spring easing: `linear(0, 0.009 0.4%, 0.035 0.8%, ... 1)` (use modern `linear()` easing function for spring feel where appropriate)
- Default duration: 200ms small UI, 400ms medium, 600-800ms hero
- All non-essential motion must respect `prefers-reduced-motion`

**Shadows:** Subtle and layered. Use accent-tinted shadows for emphasis, neutral for everything else.

```css
--shadow-sm:  0 1px 2px 0 oklch(0 0 0 / 0.3);
--shadow-md:  0 4px 12px -2px oklch(0 0 0 / 0.4);
--shadow-lg:  0 12px 32px -4px oklch(0 0 0 / 0.5);
--shadow-glow-accent: 0 0 32px -4px oklch(0.74 0.18 50 / 0.3);
```

## 5. Cutting-Edge Features to Implement

These are non-negotiable — the site uses these:

- **View Transitions API** — Smooth crossfade/morph between routes. Hero images and shared elements morph between pages. Use Next.js 15's built-in `unstable_ViewTransition` component.
- **Scroll-driven animations** — Native CSS `animation-timeline: scroll()` and `animation-timeline: view()` for:
  - Hero text fading in on initial load
  - Stat blocks counting up when scrolled into view
  - Case study cards revealing on scroll
  - Parallax on hero gradient backgrounds
  - Sticky section reveals
- **Container queries** — Components respond to their container size, not viewport. Used in card grids, hero variants, sidebar layouts.
- **`@starting-style`** — Native CSS entry animations for elements appearing in the DOM.
- **OKLCH colours** — Used throughout the colour system (already specified above).
- **Subgrid** — For aligned layouts in card grids and form fields.
- **Anchor positioning** — For tooltips, popovers, dropdowns (with Floating UI fallback for browsers that lack support).
- **Partial Prerendering** — Use Next.js 15's PPR for instant static shell with streaming dynamic content.
- **Server Components by default** — Client components only where interactivity is required.
- **Server Actions** — All form submissions, no API routes for forms.

## 6. Site Structure

```
/                                  Home
/services                          Services hub
/services/paid-growth              Paid Growth detail
/services/custom-systems           Custom Systems detail
/services/intelligence-layer       Intelligence Layer detail
/work                              Case studies hub
/work/[slug]                       Individual case study
/tools                             Audit tools hub
/tools/ad-audit                    Ad audit landing + waitlist
/tools/website-audit               Website audit landing + waitlist
/tools/discovery-hub               Discovery Hub explainer
/about                             Founders, beliefs, approach
/contact                           Contact form + booking embed
/blog                              Blog index (empty initially, structured)
/blog/[slug]                       Individual blog post
/admin                             Payload CMS admin
```

## 7. Payload CMS Collections

Configure these collections in Payload:

- **Users** — Admin users (you and Michelangelo). Roles: admin, editor.
- **CaseStudies** — Fields: title (text), slug (text, unique), client (text), industry (relationship to Industries), summary (text), problem (richText), approach (richText), outcome (richText), technologies (array of strings), heroImage (upload), gallery (array of uploads), metrics (array of {label, value, context}), featured (boolean), publishedAt (date), seo (group).
- **Services** — Fields: title, slug, pillar (select: paid-growth | custom-systems | intelligence-layer), summary, description (richText), capabilities (array of text), idealClient (text), pricing (text), order (number), seo (group).
- **TeamMembers** — Fields: name, role, bio (richText), photo (upload), socialLinks (array of {platform, url}), order (number).
- **BlogPosts** — Fields: title, slug, excerpt, content (richText with custom blocks), author (relationship to TeamMembers), category (relationship), tags (array), heroImage (upload), publishedAt, seo (group).
- **Testimonials** — Fields: quote (text), author (text), role (text), company (text), logo (upload), featured (boolean).
- **Industries** — Taxonomy: name, slug, description.
- **WaitlistSignups** — Fields: email (unique), tool (select: ad-audit | website-audit | discovery-hub), name (optional), company (optional), createdAt. Lock down via access control — only admins can read; anyone can create.
- **Pages** — For flexible page-level content (about, contact, etc.) using a layout field of block-based content.
- **Media** — Standard Payload uploads collection with Vercel Blob adapter.

**Globals:**
- **SiteSettings** — Brand name, tagline, contact info, social links, footer copy.
- **Navigation** — Main nav structure, footer nav structure.

## 8. Custom Components to Build

These live in `/components/` and compose into pages:

**Layout components:**
- **Header** — Sticky with backdrop blur, brand mark, nav, CTA button. Subtle hide-on-scroll-down/show-on-scroll-up.
- **Footer** — Brand, nav, social, legal, copyright.
- **Container** — Max-width wrapper with consistent padding.

**Hero variants:**
- **HeroDefault** — Full-bleed dark hero, animated gradient mesh background (CSS only, no canvas), eyebrow + headline + sub-headline + dual CTAs. Scroll-driven parallax on background.
- **HeroEditorial** — Asymmetric editorial layout with large serif headline and inset visual.
- **HeroProduct** — For tool landing pages, includes mock dashboard preview.

**Content blocks:**
- **StatBlock** — Large mono number with label and context. Scroll-triggered count-up via CSS scroll timeline.
- **CaseStudyCard** — Hover reveals approach summary. Used in grids.
- **ServiceCard** — Service name, description, capabilities list, CTA. View transition support for navigation to detail page.
- **ToolCTA** — Promotes an audit tool with mock dashboard preview screenshot, "Run my audit" button.
- **Testimonial** — Editorial styling, quote in Fraunces italic, attribution beneath.
- **LogoGrid** — Client logos, monochrome at 40% opacity, full-colour on hover.
- **ProcessSteps** — Numbered steps with connecting line, scroll-revealed sequentially.
- **ComparisonTable** — For services pages: "DIY", "Traditional agency", "Us".
- **BigQuote** — Editorial pull-quote, Fraunces italic, large.
- **WaitlistForm** — Email + optional name/company fields. Server action submits to Payload.
- **FAQ** — Accordion using native `<details>` element styled.
- **CodeBlock** — For technical case studies, JetBrains Mono, with copy button.
- **MetricStrip** — Horizontal strip of 4-6 metrics for case studies.

**UI primitives:**
- **Button** — Variants: primary (amber), secondary (ghost), tertiary (text link). Sizes: sm, md, lg.
- **Card** — Surface card with consistent treatment.
- **Badge** — Small label component for tags, categories.
- **Input, Textarea, Select** — Form primitives with consistent styling.
- **Cursor** — Optional custom cursor that morphs on interactive elements (polish later).

## 9. Homepage Composition

In order, from top to bottom:

1. **Hero** — Eyebrow: "Paid traffic. Custom systems. Intelligence at the core." Headline: large editorial line (placeholder: "Growth studios for businesses ready to scale."). Sub-headline: one paragraph supporting line. Dual CTA: "Run a free audit" (primary amber) + "See our work" (ghost secondary). Background: subtle animated gradient mesh, slow parallax on scroll.
2. **Client logo grid** — 6 placeholder client treatments. Monochrome SVG-style with refined text-mark fallback. Mono-to-colour hover.
3. **Three services overview** — Paid Growth, Custom Systems, Intelligence Layer. Cards with View Transition link to detail pages.
4. **Featured case study** — Large editorial-feel block, Nayim's Hub as hero example. Big image, problem/outcome, "Read full case study" link.
5. **Audit tools promo** — Split section. Left: ad audit mock dashboard preview + headline + CTA. Right: website audit mock dashboard preview + headline + CTA.
6. **Stats row** — 4 metrics: "X clients" "Y campaigns optimised" "£Zm tracked revenue" "Z years building". Mono numerals, scroll-triggered count-up. Placeholder numbers.
7. **Process steps** — "Discover → Build → Optimise → Scale". 4 numbered cards with scroll-revealed sequence.
8. **Testimonial** — Single editorial testimonial, big Fraunces italic.
9. **CTA section** — "Ready to see what's possible?" with discovery call booking CTA.
10. **Footer** — Brand, nav, social placeholders, copyright, legal links.

## 10. Performance Targets

- Lighthouse Performance: **98+**
- Lighthouse Accessibility: **100**
- Lighthouse Best Practices: **100**
- Lighthouse SEO: **100**
- LCP < 1.2s
- CLS < 0.02
- INP < 100ms
- Total JS shipped to client: **under 80kb gzipped on home**

Achieve through: Server Components by default, minimal client JS, no jQuery, no large UI libraries, self-hosted fonts with `font-display: swap`, Next/Image for all images, partial prerendering for instant shell, edge runtime where appropriate.

## 11. Accessibility Requirements

- WCAG 2.1 AA minimum, target AAA for text contrast
- Full keyboard navigation
- Custom visible focus states (high-contrast amber outline)
- Skip-to-content link
- Proper heading hierarchy (one H1 per page)
- ARIA labels where needed
- All animations respect `prefers-reduced-motion`
- All form fields properly labelled
- Colour contrast verified for amber on near-black (passes AA large text, fails AA normal text — use amber only for headings, CTAs, and large UI elements)

## 12. SEO Setup

Built into Next.js metadata API:
- Per-page `generateMetadata` with title, description, OG, Twitter cards
- JSON-LD structured data: Organization, WebSite, BreadcrumbList per page, Article for blog posts, CaseStudy schema for work pages
- `sitemap.ts` generating XML sitemap from Payload content
- `robots.ts` referencing sitemap
- Canonical URLs

## 13. Project Structure

```
/
├── /app/
│   ├── /(marketing)/
│   │   ├── /page.tsx                  Home
│   │   ├── /services/
│   │   ├── /work/
│   │   ├── /tools/
│   │   ├── /about/
│   │   ├── /contact/
│   │   ├── /blog/
│   │   └── /layout.tsx
│   ├── /(payload)/
│   │   └── /admin/                    Payload admin route
│   ├── /api/                          Payload API routes (auto)
│   ├── /sitemap.ts
│   ├── /robots.ts
│   └── /global.css
├── /components/
│   ├── /layout/
│   ├── /hero/
│   ├── /blocks/
│   ├── /ui/
│   └── /utils/
├── /config/
│   ├── brand.ts                       BRAND ABSTRACTION
│   ├── navigation.ts
│   └── site.ts
├── /lib/
│   ├── /payload/
│   ├── /utils/
│   └── /actions/                      Server actions
├── /payload/
│   ├── /collections/
│   ├── /globals/
│   ├── /blocks/
│   └── /payload.config.ts
├── /public/
│   └── /assets/
├── /styles/
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── .env.local
```

## 14. Brand Abstraction Layer

ALL brand references come from `/config/brand.ts`:

```ts
export const brand = {
  name: 'Growth Studio',
  legalName: 'Growth Studio Ltd',
  tagline: 'Paid traffic. Custom systems. Intelligence at the core.',
  shortTagline: 'A growth studio for businesses ready to scale.',
  description: '...',
  url: 'https://ylb.youlookbooked.com',
  email: 'hello@youlookbooked.com',
  phone: '+44 0000 000 000',
  social: { linkedin: '', twitter: '', instagram: '' },
  logo: {
    light: '/assets/logo-light.svg',
    dark: '/assets/logo-dark.svg',
    mark: '/assets/logo-mark.svg',
  },
} as const;
```

All templates reference `brand.name`, `brand.tagline`, etc. Logo SVG paths in `/public/assets/`. A future rebrand requires editing only this file and replacing SVG files.

## 15. Coding Standards

- TypeScript strict mode, no `any` without explicit reason
- Prefer Server Components; mark Client Components with `'use client'` only when necessary
- Server Actions for all form submission, not API routes
- Use `next/image` for all images
- Use `next/font` for all fonts
- Use `next/link` for all internal navigation
- Use View Transitions for cross-route navigation where appropriate
- All user input sanitised, all output escaped
- Validate forms with Zod schemas shared between client and server
- Use Tailwind utilities; custom CSS only for animations and complex effects
- No inline styles
- Semantic HTML5 throughout
- All strings in components are direct (no premature i18n)

## 16. Hard Rules

- Never use WordPress, never use PHP
- Never use jQuery
- Never use a third-party page builder
- Never hardcode brand strings outside `/config/brand.ts`
- Never hardcode colours, fonts, or spacing values — always reference design tokens
- Never load fonts from Google Fonts CDN — always via `next/font`
- Never load external JavaScript except Vercel Analytics and Speed Insights
- Never use a UI component library (no Shadcn, no Radix unless absolutely needed for one component) — build components from scratch
- Always test in production build (`pnpm build && pnpm start`) before assuming things work
- Always test with `prefers-reduced-motion: reduce` enabled
- Always test keyboard navigation
- Always commit to Git after each meaningful chunk of work
- Always check Lighthouse scores after major changes

## 17. Environment Variables

Set up `.env.local` with:

```
# Payload
PAYLOAD_SECRET=                 # long random string
DATABASE_URI=                   # Neon connection string
PAYLOAD_PUBLIC_SERVER_URL=      # http://localhost:3000 in dev

# Vercel Blob
BLOB_READ_WRITE_TOKEN=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# Site
NEXT_PUBLIC_SITE_URL=
```

User will provide these values. Until they do, use placeholder values that allow build to compile.

## 18. Build Order — Where to Start

**Phase 1 — Foundation:**
1. Initialise Next.js 15 app with TypeScript, App Router, Turbopack
2. Set up Tailwind v4 with `@theme` block containing all design tokens
3. Set up `next/font` for Fraunces, Inter, JetBrains Mono
4. Create `/config/brand.ts` and `/config/site.ts`
5. Set up Git, initialise repo, first commit
6. Build core UI primitives: Button, Card, Container, Input, Textarea
7. Build Header and Footer layout components
8. Build minimal homepage with hero placeholder so build runs

**Phase 2 — Payload setup:**
9. Install Payload v3, configure with Postgres adapter, Vercel Blob adapter
10. Define collections: Users, CaseStudies, Services, TeamMembers, BlogPosts, Testimonials, Industries, WaitlistSignups, Pages, Media
11. Define globals: SiteSettings, Navigation
12. Set up Payload admin at `/admin`
13. Seed initial content for case studies (Nayim's, T-SHOT, Forum Studios, Cape Kings, JC Setton) with placeholder copy

**Phase 3 — Marketing pages:**
14. Build full Hero, StatBlock, CaseStudyCard, ServiceCard, ToolCTA, Testimonial, LogoGrid, ProcessSteps components
15. Build homepage composition as specified
16. Build services pages (hub + 3 detail pages)
17. Build work pages (hub + dynamic case study route)
18. Build tools landing pages (3 pages with waitlist forms)
19. Build about, contact, blog index pages
20. Wire up View Transitions for cross-route navigation
21. Wire up scroll-driven animations on hero, stats, case studies

**Phase 4 — Polish:**
22. Implement SEO metadata, sitemap, robots
23. Implement contact form server action (saves to Payload, sends notification email via Resend)
24. Implement waitlist form server actions
25. Final accessibility pass — keyboard nav, focus states, ARIA, reduced motion
26. Final performance pass — Lighthouse audits, bundle analysis
27. Deploy to Vercel, configure custom domain ylb.youlookbooked.com

## 19. First Task

Begin with Phase 1 step 1. Initialise the Next.js 15 project using:

```bash
pnpm create next-app@latest growth-studio --typescript --tailwind --app --turbopack --use-pnpm
```

Then set up the design system in Tailwind v4 with the `@theme` block containing the OKLCH colour palette, fluid type scale, spacing, and radius tokens specified above. Set up `next/font` for the three font families. Create `/config/brand.ts` and `/config/site.ts`. Initialise Git, write a sensible `.gitignore`, make first commit.

Then check in with the user before moving to component building, so they can verify the foundation looks right.

If anything in this brief is ambiguous or conflicts with current best practice, raise it before assuming. If you encounter a real technical blocker, surface it rather than working around it silently.
