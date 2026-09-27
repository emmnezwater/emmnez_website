# Emmnez Water Solution Ltd Website

Premium static marketing website for Emmnez Water Solution Ltd, built with Astro, TypeScript, GSAP and progressive WebGL enhancement.

## Development

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
```

The deployable, vendor-neutral site is generated in `dist/`. Existing public routes remain `/`, `/services.html`, `/projects.html`, `/about.html`, and `/contact.html`.

Company details and structured page content are centralized in `src/data/site.ts`. Global visual styles live in `src/styles/global.css`; shared navigation, footer and page framing live under `src/components` and `src/layouts`.
