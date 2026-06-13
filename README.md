# Dress Me AI

A responsive React/Vite portfolio concept inspired by Mahima Gupta's "Get ready in 3 second" UI study, with Abhimanyu Singh as Technical Owner.

## Run locally

```bash
npm install
npm run dev
```

## Build for GitHub Pages

```bash
npm run build
```

The Vite config uses a relative asset base, so the `dist` directory works from a GitHub Pages project subpath.

## GitHub Pages

The included GitHub Actions workflow builds and deploys the `dist` directory whenever `main` is pushed.

In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.

## Progressive Web App

The production build is installable on supported mobile and desktop browsers. It includes app icons, standalone display mode, automatic service-worker updates, offline app-shell caching, and cached fashion imagery.
