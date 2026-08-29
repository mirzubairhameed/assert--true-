# assert(true) — Notes from a QA Engineer's Desk

A software quality assurance blog with an editorial, terminal-flavored design.
Reads like a programmer's notebook: warm, opinionated, and alive.

![stack](https://img.shields.io/badge/Next.js%2016-App%20Router-black) ![ts](https://img.shields.io/badge/TypeScript-5-blue) ![tailwind](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8)

## Features

- **Typewriter hero greeting** — cycles QA one-liners with a blinking caret; respects reduced-motion preferences
- **Hover-raise article cards** — six full-length QA notes that open in an in-page modal reader (Esc / backdrop to close)
- **Copy-flash code-block buttons** — clipboard API with legacy fallback, radial flash pulse, regex-tokenized syntax highlighting
- **Top reading-progress bar** — rAF-throttled scroll progress with gradient fill
- **Live GitHub star/fork counters** — tracks [mirzubairhameed/network-traffic-analyzer](https://github.com/mirzubairhameed/network-traffic-analyzer) via the public GitHub API, with graceful cached fallback when rate-limited
- **3-state theme toggle** — Night Run (warm dark) · Paper Trail (paper light) · Phosphor (terminal green), ~450ms smooth cross-fade, persisted in localStorage, no flash on load

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript 5
- Tailwind CSS 4 + custom CSS-variable theme system
- Fonts self-hosted via `next/font` (Fraunces · JetBrains Mono · Space Grotesk)
- Zero runtime dependencies beyond the framework — no database, fully Vercel-ready

## Run locally

```bash
bun install   # or npm install
bun run dev   # or npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Deploys to Vercel with zero configuration — it is a static-friendly Next.js app:

```bash
npx vercel
```

## Customize

- **Posts** — add/edit in `src/data/posts.ts` (structured blocks: paragraphs, headings, lists, quotes, code)
- **Featured GitHub repo for the counters** — `REPO` constant in `src/components/blog/github-stats.tsx`
- **Typewriter greetings** — `GREETINGS` array in `src/components/blog/typewriter.tsx`
- **Themes** — token blocks in `src/app/globals.css`

---
Tested by hand · shipped by CI
