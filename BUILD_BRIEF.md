# Build Brief — Agency Operating System

For You Look Booked Ltd (working brand: Growth Studio).
Founders: Rowan Barrett-Douglass · Michelangelo Nana Kwarteng.

> **This brief supersedes the earlier marketing-site-only brief.** The marketing site is now Phase 1 of a much larger seven-layer agency OS.

---

## 1. What This Is

An **agency operating system** for a UK two-person growth studio. Internal infrastructure the agency runs its business on — not a SaaS product. Ship ugly internally; only polish what clients see (audit dashboards, Discovery Hubs, client portal, marketing site).

Audience served:

1. **Our own clients** (direct service)
2. **Prospects** entering via the free audit (lead gen)
3. **Other agencies** (later — only if the platform play activates in 12-18 months)

Critical mindset: this is infrastructure, not a product. Bar is "good enough for our team to use today." Polish only the outward-facing layers.

## 2. Strategic Posture (don't re-litigate)

- **Not** an autonomous-ad-management SaaS. Market is crowded with funded competitors (Ryze, Madgicx, Revealbot, Smartly). Meta + Google's own Advantage+ / Performance Max are absorbing the optimisation layer. Solo founder vs funded incumbents loses on go-to-market.
- **Instead**, an agency OS where ad management is one workflow among many. The agency wins through: strategic judgment, creative direction, custom operational software (Nayim's-Hub-tier work), Discovery Hub experiences, audits that double as bidding weapons, integrated client experience.
- **Audits are weapons, not lead magnets.** Run an audit on a prospect before pitching a £25-50k engagement — arrive having already delivered insight. Win-rate difference is real.
- **Phase 9 (in-house ad management) is built only after Phases 1-7 ship.** The audit tool proves perception + reasoning works without execution risk.

## 3. The Seven Layers

1. **Public marketing site** — what prospects see
2. **CMS** (Payload) — where content is edited
3. **CRM core** — single source of truth for contacts, leads, conversations
4. **Ad Audit tool** — lead-gen engine + bidding weapon
5. **Discovery Hub** — post-call portal that becomes the project portal
6. **Outreach engine** — Michelangelo's cold-email through the unified system
7. **Client operations layer** — what signed clients see day-to-day

Optional **Layer 8** (Phase 9): in-house ad management module — tiered policy framework, human approval queue, execution + learning loops. Only after 1-7 are running.

## 4. Locked Tech

- Next.js 15+ App Router · TypeScript strict · Tailwind v4 (CSS-first `@theme`)
- React 19+ · View Transitions API · CSS `animation-timeline` · Motion only when CSS can't
- Postgres via Neon · Drizzle ORM (for high-frequency time-series writes) · pgvector
- Payload CMS v3 (self-hosted in the Next app)
- Claude API (Sonnet 4.6 analysis, Haiku 4.5 classification, structured outputs via tool use, prompt caching)
- **Clerk** for auth (speed over cost; user is solo and time-poor). Multi-tenant from day one.
- **Trigger.dev v3** for scheduled perception runs, async reasoning, action execution
- Resend (transactional email) · Instantly.ai (cold outreach) · OpenAI Whisper (transcription)
- Playwright via Browserless.io (audit crawling/screenshots)
- Zod everywhere · React Hook Form for complex forms · Lucide icons
- Fonts (next/font/google): Fraunces (headings), Inter (body), JetBrains Mono (code)
  - *Note: live site currently uses Hanken Grotesk per user override; default-but-not-locked*
- Vercel Blob (file storage) · Vercel (deploy, Hobby → Pro on go-live)
- Sentry · PostHog · **Langfuse** (every Claude call logged — non-negotiable)
- Vitest + Playwright + synthetic fixtures

## 5. Design System

Dark + premium. References: Linear, Vercel, Anthropic, Cursor, The Browser Company.

- Palette in OKLCH, all values in `@theme` block
- Brief's default accent: warm amber `oklch(0.74 0.18 50)`.
  *Live site currently uses silver `oklch(0.86 0.012 245)` per explicit user preference. Brief defers to user choice.*
- Fraunces (italic axis for editorial flourish) / Inter / JetBrains Mono — *swap to Hanken Grotesk currently in effect*
- Radii subtle: 4/8/12/16/24. No fully-rounded blobs.
- Motion: `cubic-bezier(0.16, 1, 0.3, 1)`, 200ms / 400ms / 600-800ms. Respect reduced-motion.
- Lighthouse target on public pages: 95+, LCP < 1.5s, CLS < 0.05.

## 6. Critical Brand Abstraction

```ts
// /config/brand.ts
export const brand = {
  name: 'Growth Studio',
  legalName: 'You Look Booked Ltd',
  companiesHouseNumber: '17020720',
  tagline: 'Paid traffic. Custom systems. Intelligence at the core.',
  shortTagline: 'A growth studio for businesses ready to scale.',
  url: 'https://ylb.youlookbooked.com',
  email: 'info@youlookbooked.com',
  // ...
} as const;
```

A rebrand is a 30-min job: edit this file + swap logos in `/public/assets/`. Never hardcode brand strings elsewhere.

## 7. Phase Plan & Realistic Timeline

Solo, 20-25 hrs/week alongside client work.

| # | Phase | Weeks | Outcome |
|---|---|---|---|
| 1 | Marketing site + Payload | 1-4 | Agency looks serious immediately |
| 2 | CRM core | 5-8 | Stop losing leads |
| 3 | Ad Audit tool | 9-16 | First inbound lead engine; bidding weapon |
| 4 | Discovery Hub | 17-21 | Close more deals |
| 5 | Outreach engine | 22-26 | Michelangelo runs all outreach through one system |
| 6 | Website Audit tool | 27-31 | Second lead source for non-ad spenders |
| 7 | Client ops layer | 32-38 | Signed clients log into a unified portal |
| 8 | Intelligence layer | 39-44 | Nightly briefings, lead scoring, anomalies, reactivation |
| 9 | (optional) In-house ad mgmt | 45-54 | Tiered policy framework + execution + learning |

**Total realistic: 12-14 months with slippage.**
**First revenue-adjacent milestone: Week 16 (audit live).**

## 8. Monthly Running Costs at Full Build

~£300/month all-in (Vercel Pro, Instantly, Apollo, MillionVerifier, Claude API, Browserless, etc.). Most services have generous free tiers covering early phases.

## 9. Cross-Cutting Concerns (build in from day one)

- **Multi-tenancy** — Agency → Client → User hierarchy. Tenant isolation in every query.
- **Roles** — Agency users / client users / prospect magic-link viewers.
- **GDPR + DPA** — lawful basis documented, right to deletion, encrypted tokens, audit log of personal-data access.
- **Platform compliance** — Meta Business Partner + Google Ads API Standard Access applications submitted *early* (reviews take weeks).
- **Observability** — Sentry, PostHog, Langfuse from day one. Every Claude call logged.

## 10. Hard Rules

- Never touch ylb.youlookbooked.com WordPress until user explicitly says "ready to cut over"
- Never WordPress, PHP, jQuery, page builders
- Never hardcode brand strings, colours, fonts, spacing outside `brand.ts` and `@theme`
- Never load fonts from Google Fonts CDN (always next/font)
- Never UI component library (no Shadcn / Radix unless one specific component genuinely needs it)
- Always test in production build before claiming things work
- Always commit after each meaningful chunk
- Always treat OAuth tokens as security-critical (encrypted, never logged, rotatable)
- Always Zod-validate input, escape output
- Never auto-execute a Phase-9 action that wasn't pre-classified as Tier 1

## 11. First Task

Per brief, Phase 1 step 1: verify Node/pnpm/Git, init Next.js 15, etc.
**Phase 1 is already done as of the current Vercel deploy.** Pick up at Phase 2 (CRM) when ready.

## 12. Working with the User

- Rowan is WordPress-native, new to this stack. Explain decisions, don't just do.
- Prefer simpler over cleverer.
- Surface platform compliance blockers clearly.
- Don't build phases in parallel; finish one before the next.
- After `/compact`, re-read this brief or ask for re-paste of relevant sections.

---

*Brief consolidated 2026-05-21 from the long-form pasted by Rowan. Replaces the earlier marketing-site-only brief verbatim.*
