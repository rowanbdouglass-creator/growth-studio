# Growth Studio — Session Context Document

**Last updated:** 2026-05-19
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

### 2026-05-19 — Session 1 (current)

1. ✅ Verified Node, Git versions
2. ✅ Installed pnpm globally
3. ✅ Confirmed `C:\Users\ROWEN\Desktop\Growth Studio` exists and is empty
4. ✅ Saved auto-memory `project_growth_studio.md` and added to MEMORY.md index
5. ✅ Created this CONTEXT.md
6. 🔜 Next: initialise Next.js 15 in this folder

---

## What's next — Phase 1 foundation checklist

From the build brief, Phase 1 = steps 1–8. Goal: get a foundation visible so user can verify design direction before component build.

- [ ] Initialise Next.js 15 in current dir: `pnpm create next-app@latest . --typescript --tailwind --app --turbopack --use-pnpm`
  - Note: brief says `growth-studio` subfolder name, but the folder already exists with the right name so we init in-place with `.`
- [ ] Save full build brief to `BUILD_BRIEF.md` in project root (per user's instruction #5)
- [ ] Configure Tailwind v4 `@theme` block with all design tokens (OKLCH colours, fluid type clamp() scale, spacing, radii, motion easings, shadows). Token spec lives in BUILD_BRIEF.md section 4.
- [ ] Wire up `next/font` for Fraunces (variable, weights 300–900, optical size 9–144), Inter (variable, 400/500/600/700), JetBrains Mono
- [ ] Create `/config/brand.ts` (brand abstraction — name, tagline, url, email, phone, social, logos) and `/config/site.ts`
- [ ] Build minimal homepage with hero placeholder so dev server runs
- [ ] Verify `pnpm dev` and `pnpm build` both succeed
- [ ] `git init`, sensible `.gitignore`, first commit
- [ ] **Stop and check in with user** before building Header/Footer/UI primitives

After user signs off on foundation:
- Phase 1 continued: Button, Card, Container, Input, Textarea primitives. Header, Footer.
- Phase 2: GitHub repo, Vercel account, Neon account, Payload v3 install + collections + admin route.
- Phase 3: Full marketing pages, View Transitions, scroll-driven animations.
- Phase 4: SEO, forms, a11y pass, perf pass, deploy to Vercel preview URL.

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

- **Folder init:** The empty `Growth Studio` folder already exists at the right path, so we init Next.js in-place (`pnpm create next-app@latest .`) rather than as `growth-studio` subfolder.
- **Brand URL conflict:** Build brief mentioned `build.youlookbooked.com`; starting context says `ylb.youlookbooked.com`. Starting context wins — that's the live target.
- **No GitHub/Vercel yet:** Per starting context Step 6, user wants to see foundation working first. Defer GitHub/Vercel until after Phase 1 foundation is approved.

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
