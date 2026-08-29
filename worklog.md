# Worklog

---
Task ID: 1
Agent: main (Super Z)
Task: Build a Software Quality Assurance blog (Next.js) with typewriter hero greeting, hover-raise article cards, copy-flash code-block buttons, top reading-progress bar, live GitHub star/fork counters, and a 3-state theme toggle with smooth color transitions. Vercel-deploy friendly.

Work Log:
- Read reference design from upload/Pasted Content_1788010552760.txt (3-theme tokens, editorial typography, copy-flash pattern, counter animation)
- Initialized fullstack env (init-fullstack.sh); Next.js 16 + Tailwind 4 scaffold present
- Rewrote src/app/globals.css: theme tokens for dark/light/cyber on html[data-theme], theme-anim transition rule, bg-grid/glow/scanline decor, article-card hover-raise, copy-btn flash keyframes, reading-progress, modal animations, reduced-motion handling
- Rewrote src/app/layout.tsx: Fraunces + JetBrains Mono + Space Grotesk via next/font (self-hosted, Vercel-friendly), inline pre-paint theme restore script, QA blog metadata
- Created src/lib/highlight.ts: regex tokenizer producing React spans (no dangerouslySetInnerHTML)
- Created src/data/posts.ts: 6 full QA posts (structured blocks) + 4 archive drafts, each with dek/tags/status/read time
- Created components: progress-bar.tsx (rAF-throttled), typewriter.tsx (6 QA greetings, reduced-motion fallback), theme-toggle.tsx (useSyncExternalStore, theme-anim class, localStorage), github-stats.tsx (shared module-level fetch, count-up, live/cached indicator), copy-button.tsx (clipboard + execCommand fallback, flash), code-block.tsx, article-card.tsx + article-modal.tsx (Esc close, scroll lock)
- Rewrote src/app/page.tsx: nav (GH pill + toggle), hero (typewriter + latest-run terminal card + hero stats), field notes grid, snippet library (3 blocks), archive (clickable rows + drafts), about, sticky footer
- Fixed 2 eslint set-state-in-effect errors (typewriter deferred start; theme toggle -> useSyncExternalStore)
- Fixed GitHub rate-limit issue: single shared fetch promise for pill + hero stats
- Browser verification (agent-browser): dark/light/cyber themes render + persist to localStorage; typewriter cycles; article modal opens/Esc closes; copy button -> "copied" state + flash; progress bar 57% mid-page / 94% bottom; card hover = translateY(-8px); mobile 390px layout clean; no console/page errors; lint clean

Stage Summary:
- Deliverable: runnable Next.js 16 QA blog at src/app/page.tsx (single route, client shell)
- All 6 requested features implemented and browser-verified
- Vercel-friendly: no DB, no server-only deps, next/font self-hosted fonts, GitHub API client-side with graceful fallback
- Branding: assert(true) — Notes from a QA Engineer's Desk; themes: Night Run / Paper Trail / Phosphor
