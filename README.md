# NOCTURNE

> Small-batch drops, released after dark.

A premium dark e-commerce homepage built with React + TypeScript + Vite + Tailwind CSS + Framer Motion.

---

## Stack

| Tool | Purpose |
|------|---------|
| React 18 + TypeScript | UI + type safety |
| Vite 5 | Dev server + build |
| Tailwind CSS 3 | Utility styles |
| Framer Motion 11 | Animations |
| Lucide React | Icons |

---

## Getting started

```bash
# Install
npm install

# Dev server (localhost:5173)
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

---

## Deploy to Vercel

### Option A — CLI

```bash
npm i -g vercel
vercel
```

### Option B — GitHub + Vercel dashboard

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repo
4. Vercel auto-detects Vite — no config needed
5. Click **Deploy**

The `vercel.json` handles SPA routing so direct URL navigation works.

---

## Project structure

```
nocturne/
├── index.html
├── vercel.json          # SPA rewrite rules
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── src/
    ├── main.tsx         # Entry point
    ├── App.tsx          # Root, preloader gate
    ├── index.css        # Global styles + responsive
    ├── tokens.ts        # Design tokens (single source of truth)
    ├── types/
    │   └── index.ts     # TypeScript interfaces
    ├── data/
    │   └── index.ts     # All site data + image URLs
    ├── hooks/
    │   └── useCountdown.ts
    └── components/
        ├── Preloader.tsx
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── Marquee.tsx
        ├── ProductCard.tsx
        ├── Products.tsx
        ├── FeatureBand.tsx
        ├── Reviews.tsx
        ├── Newsletter.tsx
        └── Footer.tsx
```

---

## Swapping images

All images live in `src/data/index.ts`. The helper `U(photoId, w, h)` builds an Unsplash URL. Replace any `photoId` string with a different Unsplash photo ID or swap `U(...)` for your own hosted URL.

## Customising content

Everything — hero copy, products, reviews, nav links, footer columns — is in `src/data/index.ts`. No hardcoded strings in components.

Design tokens (colors, etc.) are in `src/tokens.ts`.
