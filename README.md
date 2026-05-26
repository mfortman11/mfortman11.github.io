# mfortman11.github.io

Personal site. Astro + TypeScript + Tailwind v4, content collections for `projects`, `pokemon`, `nba`. Deploys to GitHub Pages on push to `main`.

Full spec: [`personal-site-spec.md`](./personal-site-spec.md).

## Local dev

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static output → ./dist
npm run preview    # serve the built site
npm run check      # astro + TS check
npm run lint       # eslint
npm run format     # prettier --write
```

## Adding content

> Content collections aren't wired up yet — see Phase 5 of the build plan. When they are, examples will live under `src/content/{projects,pokemon,nba}/_example.md`.

## Swapping the design

All visual decisions are CSS custom properties in `src/styles/global.css`. Change tokens there; components consume them via Tailwind utilities bound to `var(--…)`. No hardcoded hexes in components.

## Deploy

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds with `withastro/action@v3` and deploys via `actions/deploy-pages@v4`.

**One-time GitHub setup** (manual — I can't do this for you):

1. Settings → Branches → set default branch to `main` (already renamed locally).
2. Settings → Pages → Source: **GitHub Actions**.

## Custom domain (TBD)

When ready:

1. Register the domain.
2. Add `public/CNAME` containing just the apex hostname (e.g. `example.com`).
3. DNS:
   - Apex `A` records to GitHub Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - `www` `CNAME` to `mfortman11.github.io`.
4. Settings → Pages → set custom domain, then enable **Enforce HTTPS**.
5. Update `SITE_URL` in `astro.config.mjs`.
