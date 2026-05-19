# Growth Studio — Session Context Document

**Last updated:** 2026-05-19 (Phase 2 complete — Payload + Neon wired, admin functional locally)

## Live URLs
- GitHub repo: https://github.com/rowanbdouglass-creator/growth-studio (private)
- Vercel preview: https://growth-studio-two.vercel.app/ (auto-deploys on `git push origin main`)

## Phase 2 wrap-up notes

- Payload v3.84.1 installed: payload, @payloadcms/next, @payloadcms/db-postgres, @payloadcms/richtext-lexical
- Sharp added as direct dep (Payload v3 needs it imported in payload.config.ts; transitive install wasn't enough)
- 10 collections + 2 globals defined in `payload/`
- Route groups: `app/(marketing)/` (homepage + Header + Footer) and `app/(payload)/` (admin + REST API + GraphQL)
- Admin live at `/admin`, REST API at `/api/[...slug]`, GraphQL at `/api/graphql`, GraphQL playground at `/api/graphql-playground`
- Local `.env.local` has PAYLOAD_SECRET + DATABASE_URI + PAYLOAD_PUBLIC_SERVER_URL + NEXT_PUBLIC_SITE_URL
- User added same env vars to Vercel dashboard (Production + Preview + Development)
- Neon migrations ran automatically on first admin load; schema for all 10 collections pushed
- First admin user created via `/admin/create-first-user`
- Industry record write verified end-to-end (admin → Neon)
- `payload-types.ts` and `/media/` added to .gitignore (regenerated/user-uploaded)

## Phase 2 gotchas (for future sessions)

- **tsx + Windows path with space** can't resolve extensionless TS imports in `payload.config.ts`. Fix: add `"allowImportingTsExtensions": true` to tsconfig and use explicit `.ts` extensions on imports in `payload.config.ts` only.
- **handleServerFunctions** is exported from `@payloadcms/next/layouts`, NOT `/utilities` (despite some older docs).
- **importMap.js** must be populated via `pnpm generate:importmap` — empty `{}` causes runtime `CollectionCards not found` errors in the admin dashboard.
- **esbuild needs `allowBuilds: true`** in `pnpm-workspace.yaml` (along with sharp and unrs-resolver) for pnpm 11 to run its postinstall scripts.
- **pnpm 11 build approval format** is `allowBuilds: { pkg: true }`, NOT `onlyBuiltDependencies: [...]` (legacy).
- **Stale `.next/dev/types/validator.ts`** breaks builds after moving page.tsx around. Fix: `rm -rf .next` and rebuild.
- **Email warning** "No email adapter provided" is expected until Phase 4 (Resend). Password resets go to console in dev.
- **SSL mode deprecation warning** from pg-connection-string is informational. Future-proof by changing `?sslmode=require` to `?sslmode=verify-full` or `?uselibpqcompat=true&sslmode=require` in DATABASE_URI later.
**Purpose:** Hand-off doc so any session (or future Claude Code session after compaction) can pick up exactly where work stopped. Update this at the end of every work block.

---

## Project at a glance

Brand-new agency website built from scratch for a UK growth studio. Two founders:
- One runs paid traffic (Meta, Google, social ads)
- One (Rowan, the user) builds custom systems and AI-powered tooling

The site is a sales tool. Target: convert technically-aware prospects into discovery calls for £10k–£50k+ engagements. Must out-design and out-perform 95% of UK agency sites.

**Brand name is placeholder** — "Growth Studio". All brand strings must live in `/config/brand.ts` so a future rebrand is a 30-min job.

---

## Working location and domains

- **Local working dir:** `C:\Users\ROWEN\Desktop\Growth Studio`
- **Target live domain (final cutover only):** `https://ylb.youlookbooked.com`
- **Build phase URLs:** Vercel auto-generated preview URLs only
- ⚠️ **HARD RULE:** WordPress site currently at ylb.youlookbooked.com must NOT be touched. DNS stays on Namecheap shared hosting until user explicitly says "ready to cut over."
- **Note on brief inconsistency:** The build brief mentioned `build.youlookbooked.com` in one place but the starting context (authoritative) specifies `ylb.youlookbooked.com`. Use ylb.

---

## Tech stack (locked, do not deviate)

| Layer | Choice |
|---|---|
| Framework | Next.js 15+ App Router, RSC, Server Actions, Partial Prerendering, Turbopack |
| Language | TypeScript strict |
| UI lib | React 19+ |
| Styling | Tailwind CSS v4 (CSS-first `@theme` directive) |
| Animation | Native CSS (animation-timeline, @starting-style, View Transitions API). Motion library only when CSS can't do it |
| CMS | Payload CMS v3 (self-hosted inside Next.js app) |
| DB | Neon (serverless Postgres) |
| File storage | Vercel Blob (fallback: Cloudflare R2) |
| Email | Resend |
| Forms | Server Actions + Zod + React Hook Form |
| Icons | Lucide React |
| Fonts | Fraunces (headings), Inter (body), JetBrains Mono (code) via `next/font` |
| Analytics | Vercel Analytics + Speed Insights |
| Deploy | Vercel (Hobby tier → Pro later) |
| Pkg mgr | pnpm |

**Hard nos:** WordPress, PHP, jQuery, third-party page builders, Shadcn/Radix (unless absolutely required for one component), hardcoded brand strings, hardcoded design tokens, Google Fonts CDN, external JS beyond Vercel Analytics/Speed Insights.

---

## Local environment (verified 2026-05-19)

```
node    v24.14.1   ✅ (well above v20 LTS minimum)
pnpm    11.1.3     ✅ (installed via npm install -g pnpm)
git     2.53.0     ✅ (Git for Windows)
```

User account info:
- Email: rowandouglass1@gmail.com
- Windows 11 Pro, PowerShell 5.1 shell
- VS Code with Claude Code extension

---

## What's been done so far

### 2026-05-19 — Session 1 — Phase 1 foundation COMPLETE

1. ✅ Verified Node v24.14.1, Git 2.53, installed pnpm 11.1.3
2. ✅ Confirmed empty `C:\Users\ROWEN\Desktop\Growth Studio` folder
3. ✅ Saved auto-memory `project_growth_studio.md` and added to MEMORY.md index
4. ✅ Created CONTEXT.md (this file)
5. ✅ Saved `feedback_growth_studio_explain.md` memory — Rowan is WP-native, needs JS ecosystem framed in WP terms
6. ✅ Scaffolded Next.js 16.2.6 + React 19.2.4 + Tailwind v4.3 + TypeScript 5.9 (`pnpm create next-app`)
   - Note: brief said Next 15+; we got 16. Same features, newer. Fine.
   - Note: created via `growth-studio` temp folder then renamed → "Growth Studio" because npm name rules reject spaces/caps
7. ✅ Resolved pnpm 11 build-script approval — uses `allowBuilds: { pkg: true }` format in pnpm-workspace.yaml, NOT `onlyBuiltDependencies` (which was the legacy format). Sharp and unrs-resolver now run their postinstall scripts cleanly.
8. ✅ `app/globals.css` — Full Tailwind v4 `@theme` block: OKLCH palette (background/surface/text/accent/etc.), fluid type clamp() scale (xs → display), radii, shadows, motion easings (cubic-bezier + linear() spring), durations. Plus base resets, prefers-reduced-motion handler, accent focus outlines, accent selection.
9. ✅ `app/layout.tsx` — `next/font/google` wired for Fraunces (with opsz/SOFT/WONK axes), Inter, JetBrains Mono. Full Metadata + Viewport API hooked to `brand` config. Dark colour-scheme, en-GB locale.
10. ✅ `config/brand.ts` — Brand abstraction with name, taglines, description, url (`https://ylb.youlookbooked.com`), email, phone, social, logo paths. Typed with `as const`.
11. ✅ `config/site.ts` — Main nav (Services/Work/Tools/About/Contact), footer nav structure (3 columns + legal), copyright holder.
12. ✅ `app/page.tsx` — Minimal hero placeholder using design tokens directly: mono eyebrow tagline, serif headline with italic span, body sub-headline, primary amber + ghost secondary CTAs, mono footer note. Pulls everything from `brand`.
13. ✅ `BUILD_BRIEF.md` — Full build brief committed to project root.
14. ✅ `pnpm build` — passes: 4.6s compile, TypeScript clean, 4 static pages prerendered.
15. ✅ Git init on `main` branch, local config `user.name = "You Look Booked Ltd"` / `user.email = rowandouglass1@gmail.com` (per-repo only, not global). First commit `8c161d3` "chore: bootstrap Next.js 16 + Tailwind v4 foundation".
16. ✅ Dev server running at http://localhost:3000 (ready in 758ms).
17. ✅ User signed off on foundation ("sure" → continue).
18. ✅ Built UI primitives in `components/ui/`:
    - `Button.tsx` — exports both `<Button>` component AND `buttonStyles()` helper for use on `<a>` / `<Link>`. Variants: primary (amber, glow on hover), secondary (ghost), tertiary (text link with hover underline). Sizes: sm (h-9), md (h-11), lg (h-13). Active scale-down, disabled state.
    - `Container.tsx` — polymorphic `as` prop, 3 size presets: narrow (max-w-3xl), default (max-w-6xl), wide (max-w-7xl). Consistent `px-6 md:px-10` padding.
    - `Card.tsx` — variants: default (surface + border), elevated (surface-elevated + shadow), outlined (border-strong only).
    - `Input.tsx`, `Textarea.tsx` — surface bg, border-border, focus ring with accent-subtle. `invalid` prop for error states.
    - `Badge.tsx` — variants: accent (tinted bg + accent text), neutral, outline. Uppercase mono, tracking-[0.14em].
19. ✅ Built layout components in `components/layout/`:
    - `Header.tsx` — sticky top-0, `bg-background/70` + `backdrop-blur-md`, brand mark linking to `/`, main nav (hidden md:flex — needs hamburger for mobile in Phase 3), primary "Book a call" CTA.
    - `Footer.tsx` — 4-col grid (1.5fr + 3×1fr): brand block with shortTagline + email mailto, then 3 nav columns from `site.footerNav`. Bottom row: copyright + legal nav.
20. ✅ Updated `app/layout.tsx`:
    - Wraps `{children}` with `<Header />` and `<Footer />`
    - Added skip-to-content link (`sr-only focus:not-sr-only`) for a11y — focus reveals it at top-left, jumps to `#main`
    - `<div id="main">` is the focus target
21. ✅ Refactored `app/page.tsx`:
    - Uses `<Container size="wide">` instead of bare div
    - Eyebrow now uses `<Badge variant="accent">`
    - CTAs now use `<Link>` + `buttonStyles()` (primary lg + secondary lg)
22. ✅ Build passes: 2.7s compile, TypeScript clean.
23. ✅ Commit `4e60766` (approx) "feat: add UI primitives and Header/Footer layout".

---

## What's next

**Phase 2 (Payload + cloud) — likely the next chunk:**
- Sign up GitHub, push repo
- Sign up Vercel, link to GitHub repo for auto-deploy on push
- Sign up Neon, get Postgres connection string
- Install Payload v3 with Postgres adapter and Vercel Blob adapter
- Define collections (Users, CaseStudies, Services, TeamMembers, BlogPosts, Testimonials, Industries, WaitlistSignups, Pages, Media)
- Define globals (SiteSettings, Navigation)
- Wire Payload admin route at `/admin`
- Seed placeholder case studies (Nayim's, T-SHOT, Forum Studios, Cape Kings, JC Setton)

**Phase 3 (marketing pages):**
- Full hero variants (Default with gradient mesh, Editorial, Product)
- Content blocks (StatBlock, CaseStudyCard, ServiceCard, ToolCTA, Testimonial, LogoGrid, ProcessSteps, ComparisonTable, BigQuote, WaitlistForm, FAQ, CodeBlock, MetricStrip)
- All marketing routes (services, work, tools, about, contact, blog)
- View Transitions for cross-route navigation
- Scroll-driven CSS animations

**Phase 4 (polish + deploy):**
- SEO (sitemap, robots, JSON-LD)
- Server Actions for contact + waitlist forms (Resend integration)
- a11y pass (keyboard nav, focus states, reduced motion testing)
- Performance pass (Lighthouse audits, bundle analysis)
- Custom domain cutover from WordPress to Vercel (DNS change at Namecheap — LAST STEP, only when user explicitly confirms ready)

---

## Design system summary (full spec in BUILD_BRIEF.md §4)

**Visual direction:** Dark and premium. Reference: Linear, Vercel, Anthropic, Cursor, The Browser Company.

**Colour palette (OKLCH):**
- `--color-background: oklch(0.13 0.005 280)` — near-black, subtle warm
- `--color-surface: oklch(0.16 0.006 280)` — card bg
- `--color-surface-elevated: oklch(0.19 0.007 280)`
- `--color-border: oklch(0.24 0.008 280)`
- `--color-border-strong: oklch(0.32 0.010 280)`
- `--color-text-primary: oklch(0.96 0.003 280)`
- `--color-text-secondary: oklch(0.72 0.005 280)`
- `--color-text-tertiary: oklch(0.52 0.006 280)`
- `--color-accent: oklch(0.74 0.18 50)` — warm electric amber
- `--color-accent-hover: oklch(0.70 0.20 47)`
- `--color-accent-subtle: oklch(0.74 0.18 50 / 0.12)`
- `--color-success: oklch(0.78 0.16 155)` — sparingly
- `--color-mono-blue: oklch(0.42 0.04 240)`

**Type:** Fraunces (headings, variable, weights 400–600 typical, with selective italic editorial flourishes), Inter (body, 400/500/600/700), JetBrains Mono (code, technical labels, stat blocks). Fluid scale via `clamp()`.

**Motion:**
- Default ease: `cubic-bezier(0.16, 1, 0.3, 1)`
- Spring via modern `linear()` easing function where appropriate
- Durations: 200ms small UI, 400ms medium, 600–800ms hero
- All non-essential motion must respect `prefers-reduced-motion`

**Radii:** 4/8/12/16/24 px. No fully-rounded blobs.

---

## Performance targets (non-negotiable)

- Lighthouse Performance: 98+
- Lighthouse Accessibility: 100
- Lighthouse Best Practices: 100
- Lighthouse SEO: 100
- LCP < 1.2s
- CLS < 0.02
- INP < 100ms
- Total JS shipped to client: under 80kb gzipped on home

Achieve through: Server Components default, minimal client JS, no jQuery, no large UI libs, self-hosted fonts with `font-display: swap`, Next/Image, PPR for instant shell, edge runtime where appropriate.

---

## Site structure (planned)

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
/blog                              Blog index (empty initially)
/blog/[slug]                       Individual blog post
/admin                             Payload CMS admin
```

---

## Folder structure target

```
/Growth Studio/
├── /app/
│   ├── /(marketing)/
│   ├── /(payload)/
│   ├── /api/
│   ├── /sitemap.ts
│   ├── /robots.ts
│   └── /global.css
├── /components/{layout,hero,blocks,ui,utils}/
├── /config/{brand,navigation,site}.ts
├── /lib/{payload,utils,actions}/
├── /payload/{collections,globals,blocks}/payload.config.ts
├── /public/assets/
├── /styles/
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── .env.local
├── BUILD_BRIEF.md
└── CONTEXT.md           ← this file
```

---

## Accounts to set up (when needed, not now)

| Service | When | Purpose |
|---|---|---|
| GitHub | Before first commit push | Source control, Vercel integration |
| Vercel | After first meaningful commit | Hosting, preview URLs, analytics |
| Neon | Phase 2 start | Postgres for Payload |
| Resend | Phase 4 start | Transactional email |
| Vercel Blob | Phase 2 (alongside Payload) | File uploads |

---

## Environment variables (set up in `.env.local` later)

```
PAYLOAD_SECRET=                 # long random string
DATABASE_URI=                   # Neon connection string
PAYLOAD_PUBLIC_SERVER_URL=      # http://localhost:3000 in dev
BLOB_READ_WRITE_TOKEN=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=
```

Use placeholders until user provides values.

---

## Things learned / decisions made

- **Folder init:** The "Growth Studio" folder name with caps and space violates npm package-name rules. Worked around by scaffolding into `growth-studio` and renaming the folder to "Growth Studio" after. The `package.json` name is "growth-studio" (valid).
- **Next 16 vs Next 15:** `pnpm create next-app@latest` installed Next 16.2.6. Brief said 15+. Same features (App Router, RSC, Server Actions, PPR, Turbopack), newer. Proceeding with 16.
- **Tailwind v4 `@theme` syntax:** Use plain `@theme` (not `@theme inline`) for our dark-only site since we don't need a runtime light/dark toggle. Tokens become first-class utilities (`bg-background`, `text-text-primary`, `text-accent`, etc.).
- **Fonts:** Fraunces opsz/SOFT/WONK axes opted-in via `axes: ["opsz", "SOFT", "WONK"]` parameter. Inter and JetBrains Mono use defaults.
- **pnpm 11 build approval gotcha:** `pnpm-workspace.yaml` requires `allowBuilds: { pkgname: true }` format in pnpm v11, not `onlyBuiltDependencies` array. Without this, postinstall scripts (sharp's binary fetch, unrs-resolver) are silently skipped AND `pnpm install` exits 1, which blocks `pnpm build`. Solved by writing explicit boolean entries.
- **Brand URL conflict:** Build brief mentioned `build.youlookbooked.com`; starting context says `ylb.youlookbooked.com`. Starting context wins — that's the live target.
- **Git author:** Per-repo (not global) config: `user.name = "You Look Booked Ltd"`, `user.email = rowandouglass1@gmail.com`. User confirmed this choice.
- **No GitHub/Vercel yet:** Per starting context Step 6, user wants to see foundation working first. Defer GitHub/Vercel until after Phase 1 foundation is approved.
- **Scaffold leftovers in /public:** `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg` are still in `/public/`. Harmless but unused. Can clean up later or leave for now.
- **No `dark:` Tailwind variants used:** We're dark-only — colours hard-set on `html, body` in globals.css base reset, no media query toggle. Saves bundle size and keeps things simple.

---

## Open questions for the user (queue, do NOT ask mid-task)

- Final company name (currently placeholder "Growth Studio")
- Six placeholder client treatments for logo grid — any real clients we can use beyond the named case studies?
- Pricing copy for services pages
- Founders' bios for /about

---

## How to use this doc

**At the start of a new session:**
1. Read this entire file
2. Read BUILD_BRIEF.md in the project root for full spec
3. Check the auto-memory at `C:\Users\ROWEN\.claude\projects\c--Users-ROWEN-Desktop\memory\` for project_growth_studio.md and related
4. Run `git log --oneline -20` in the project to see latest commits
5. Run `pnpm dev` to confirm the dev server starts

**At the end of a work block:**
1. Update the "What's been done so far" section with the date and a numbered list of actions
2. Update the "What's next" checklist (tick completed, add new)
3. Add to "Things learned / decisions made" if anything non-obvious came up
4. Bump "Last updated" at the top
5. Commit this file along with the code change
