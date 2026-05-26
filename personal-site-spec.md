# Personal Site — Build Spec

## Context

A personal website for a frontend engineer. Primarily professional (portfolio, about, work) with a couple of personality pages mixed in. Deploys to GitHub Pages with a custom domain (TBD).

## Stack

- **Astro** (latest) with TypeScript
- **Tailwind CSS** via the official `@astrojs/tailwind` integration (or `@tailwindcss/vite` if Tailwind v4 — use whichever is current)
- **Content Collections** for structured content (projects, pokemon, nba)
- **MDX** support enabled (`@astrojs/mdx`) so content files can include components if needed
- **No client framework by default.** Add a React or Svelte island only when a page genuinely needs interactivity. If/when added, prefer Svelte for size.
- **No analytics**, **no backend**, **no auth**.

## Hosting

- GitHub Pages, user site (`<username>.github.io` repo so it serves from root — no subpath).
- Custom domain TBD. Include a placeholder `public/CNAME` (commented in README, not committed with a real value yet) and document the DNS steps in the README.
- Deploy via GitHub Actions using `withastro/action`. Trigger on push to `main`. Output to `gh-pages` branch or use Pages Actions deploy — whichever the official action recommends currently.
- Set `site` in `astro.config.mjs` to a placeholder constant that's easy to swap once the domain is registered.

## Design system — built for experimentation

The whole point is to be able to swap looks fast without touching components. Do this by centralizing every visual decision in tokens.

### Tokens

Define design tokens as CSS custom properties in `src/styles/global.css` under `:root` (light) and `:root.dark` (dark). Expose them to Tailwind via the config so utilities like `bg-surface` and `text-accent` work.

Required token groups:

- **Colors:** `--color-bg`, `--color-surface`, `--color-surface-2`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-accent`, `--color-accent-2` (for gradients), `--color-success`, `--color-warning`, `--color-danger`
- **Gradients:** `--gradient-primary`, `--gradient-subtle` — defined as full `linear-gradient(...)` values so swapping is one line
- **Typography:** `--font-sans`, `--font-display` (can be the same initially), `--font-mono`. Use `font-display: swap` and self-host or use a CDN — leave a comment showing where to swap.
- **Spacing scale:** rely on Tailwind defaults; don't redefine.
- **Radii:** `--radius-sm`, `--radius`, `--radius-lg`
- **Shadows:** `--shadow-sm`, `--shadow`, `--shadow-lg` — make them subtle and dark-mode aware
- **Motion:** `--ease-out`, `--ease-spring`, `--duration-fast`, `--duration`, `--duration-slow`

Pick reasonable starting values — modern, polished, slight gradient accent — but the priority is that changing tokens propagates everywhere. No hardcoded hex values in components.

### Dark mode

- `class` strategy (Tailwind `darkMode: 'class'`).
- Respect `prefers-color-scheme` on first visit, persist user choice to `localStorage`, expose a toggle in the nav.
- Apply theme before paint to avoid flash — inline script in `<head>` of `BaseLayout.astro` that reads localStorage/system pref and sets the `dark` class on `<html>` synchronously.

### Motion

- Enable Astro's `<ClientRouter />` for view transitions across pages.
- Respect `prefers-reduced-motion` everywhere — wrap any animation in a media query or gate JS-driven animation behind a check.
- Keep animation utilities in `tailwind.config` as named keyframes (`fade-up`, `fade-in`, `gradient-shift`) so they're reusable.

## Information architecture

```
/                       Home
/about                  About
/work                   Projects index (grid)
/work/[slug]            Project case study
/fun                    Fun index (links to pokemon + nba)
/fun/pokemon            Ultimate Pokémon squad
/fun/nba                NBA top 10 of all time
/contact                Contact (socials + mailto)
/404                    Not found
```

Nav: Home, Work, About, Fun, Contact. Fun is a single nav item that opens the index page listing the sub-pages — keeps personality visible without cluttering the bar.

## File structure

```
.
├── .github/workflows/deploy.yml
├── public/
│   ├── favicon.svg
│   ├── resume.pdf                # placeholder, real file added later
│   └── og/                        # OG images per page (placeholders ok)
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro       # <html>, head, theme script, nav, footer, ClientRouter
│   │   └── ProseLayout.astro      # for markdown content (case studies)
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── ThemeToggle.astro      # button + small inline script
│   │   ├── SEO.astro              # title, description, OG, canonical
│   │   ├── ProjectCard.astro
│   │   ├── PokemonCard.astro
│   │   ├── PlayerCard.astro
│   │   └── Gradient.astro         # decorative background helper
│   ├── content/
│   │   ├── config.ts              # collection schemas (zod)
│   │   ├── projects/
│   │   │   └── _example.md
│   │   ├── pokemon/
│   │   │   └── _example.md
│   │   └── nba/
│   │       └── _example.md
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── 404.astro
│   │   ├── work/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── fun/
│   │       ├── index.astro
│   │       ├── pokemon.astro
│   │       └── nba.astro
│   ├── lib/
│   │   └── seo.ts                 # default meta helpers
│   └── styles/
│       └── global.css             # @tailwind directives, tokens, base resets
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

## Content collections

Define in `src/content/config.ts` using Zod. All collections are `type: 'content'` (markdown bodies) except where noted.

### `projects`

```ts
{
  title: string
  summary: string                 // 1–2 sentences, shown on card
  role: string                    // "Lead frontend", "Solo", etc.
  year: number
  tags: string[]                  // tech tags
  links: { label: string, url: string }[]   // repo, live, case study external, etc.
  hero?: { src: string, alt: string }
  featured?: boolean              // surface on home
  order?: number                  // manual sort override
}
```

Body = case study markdown rendered on `/work/[slug]`.

### `pokemon`

```ts
{
  name: string
  dex: number
  types: ('normal'|'fire'|'water'|'electric'|'grass'|'ice'|'fighting'|'poison'|'ground'|'flying'|'psychic'|'bug'|'rock'|'ghost'|'dragon'|'dark'|'steel'|'fairy')[]
  sprite: string                  // path under /public or remote URL
  role: string                    // "Sweeper", "Wall", "Lead", etc.
  stats?: { hp: number, atk: number, def: number, spa: number, spd: number, spe: number }
  order: number                   // squad position 1–6
}
```

Body = your reasoning for picking them.

### `nba`

```ts
{
  name: string
  rank: number                    // 1–10
  era: string                     // "1980s", "2000s–2010s"
  teams: string[]
  accolades: string[]             // championships, MVPs, etc.
  photo?: string
}
```

Body = your blurb.

Seed each collection with 1–2 `_example.*` files (prefix with underscore so they're easy to delete) so the routes have something to render on first build.

## Page specs

### Home (`/`)

- Hero: name, one-line title, 1–2 sentence intro. Subtle animated gradient backdrop (`gradient-shift` keyframe, respects reduced motion).
- "Selected work" section: 2–3 featured projects (cards), link to `/work` for the rest.
- Personality teaser: small section linking to `/fun` — something like "Off the clock" with two thumbnails.
- Quick links row: GitHub, LinkedIn, email, resume.

### About (`/about`)

- Longer bio, what you work on, what you care about, currently-learning/reading section if you want it. Keep it markdown-driven — pull from a single `.md` file under `src/content` or just hardcode in the `.astro` for now.

### Work index (`/work`)

- Grid of `ProjectCard`s, sorted by `featured` then `order` then `year` desc.
- Optional tag filter row (vanilla JS, no framework needed — toggles `hidden` class).

### Work case study (`/work/[slug]`)

- Generated via `getStaticPaths` from the `projects` collection.
- Uses `ProseLayout`, shows title, summary, role/year/tags, links, then markdown body.

### Fun index (`/fun`)

- Two big cards: Pokémon squad, NBA top 10. Playful styling — more gradient, more motion than the pro pages.

### Pokémon (`/fun/pokemon`)

- 6 cards in a responsive grid (2x3 desktop, 1 col mobile).
- Each card: sprite, name, type badges (use type-color tokens — define a `typeColors` map in `src/lib/`), role, expandable reasoning.
- Sort by `order` field.
- Pure CSS hover/focus interactions; no JS framework needed.

### NBA (`/fun/nba`)

- Ranked vertical list, large numerals on the left, player photo, accolades inline, your blurb below.
- Color band or accent per era (subtle).
- Sort by `rank` ascending.

### Contact (`/contact`)

- Socials (GitHub, LinkedIn, X/Bluesky/whatever — list in a config file `src/lib/socials.ts`).
- Big `mailto:` button with the email.
- No form.

### 404 (`/404`)

- Friendly message, link home. Tiny bit of character (a misplaced Pokémon? your call).

## Components — behavior notes

- **Nav:** sticky top, blurred translucent background using tokens, current-page indicator, theme toggle on the right. Collapses to a hamburger under `md`.
- **ThemeToggle:** sun/moon icon, toggles `dark` class on `<html>`, writes to localStorage, dispatches a `themechange` event so other scripts can react.
- **SEO:** props for `title`, `description`, `image`, `canonical`. Sets title template `${page} · ${siteName}`. Defaults from `src/lib/seo.ts`.
- **Gradient:** absolute-positioned decorative element, `aria-hidden`, uses `--gradient-primary`. Used in hero sections.

## Accessibility & quality bar

- Semantic HTML (`<nav>`, `<main>`, `<article>`, `<footer>`, proper heading hierarchy).
- All interactive elements keyboard-reachable with visible focus rings (token-driven).
- Color contrast ≥ AA in both themes — verify tokens after picking starting palette.
- All images have `alt` text; decorative ones use `alt=""` + `aria-hidden`.
- Respect `prefers-reduced-motion` — no auto-playing animation if set.
- Lighthouse target: 100/100/100/100 on a clean run of the home page. No bundled JS on pages that don't need it.

## SEO

- Per-page title + description via `SEO.astro`.
- OG image per page — placeholders in `public/og/` (1200×630 PNG).
- `sitemap.xml` via `@astrojs/sitemap`.
- `robots.txt` in `public/`.
- Canonical URLs.

## Tooling & DX

- ESLint + Prettier with Astro plugins.
- `prettier-plugin-tailwindcss` for class sorting.
- TypeScript strict.
- `npm run` scripts: `dev`, `build`, `preview`, `astro check`, `lint`, `format`.
- Husky + lint-staged are optional — skip unless asked.

## README

Document:
1. Local dev (`npm install`, `npm run dev`).
2. How to add a project / Pokémon / NBA entry (point at the example files).
3. How to swap the design tokens (link to the token block in `global.css`).
4. Deploy: push to `main`, GitHub Action handles the rest.
5. Custom domain steps: register, add `public/CNAME`, set DNS (apex A records to GH's IPs, `www` CNAME to `<username>.github.io`), enable Enforce HTTPS in repo settings.

## Build order for Claude Code

Do it in this order so the site is deployable at every step:

1. Scaffold Astro + Tailwind + MDX + sitemap integrations.
2. Set up GitHub Action and verify a hello-world deploy works (push, confirm Pages serves it).
3. Implement design tokens, `global.css`, Tailwind config, dark mode with no-flash script.
4. Build `BaseLayout`, `Nav`, `Footer`, `ThemeToggle`, `SEO`, `ClientRouter`.
5. Implement content collections + schemas + example entries.
6. Home page.
7. About, Contact, 404.
8. Work index + dynamic case study route.
9. Fun index, Pokémon page, NBA page.
10. Lighthouse pass + accessibility sweep + README.

## Out of scope (do not build)

- Blog / posts.
- Comments.
- Analytics.
- Contact form / serverless functions.
- CMS integration.
- i18n.
- Auth.

## Open items for the user to fill in later

- Name, handle, email, social URLs.
- Real project content.
- Real Pokémon squad + reasoning.
- Real NBA top 10 + blurbs.
- Domain name.
- Final color palette and font choices (starting palette is a placeholder).
- Resume PDF.
