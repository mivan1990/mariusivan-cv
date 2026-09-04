# Marius Ivan — Interactive CV

A single-page, interactive CV for Marius Ivan (developer, FEG Group). It is bilingual — English and Romanian, switchable at runtime — and ships as a fully static site: no backend, no runtime environment variables, no client-side routing (navigation is hash anchors plus `scrollIntoView`).

## Stack

From `package.json`:

- React 18.3 + React DOM 18.3
- TypeScript 5.6
- Vite 5.4 (build tool and dev server)
- Tailwind CSS 3.4 (+ PostCSS, Autoprefixer)
- shadcn/ui primitives on Radix UI (accordion, dialog, separator, tabs, tooltip)
- class-variance-authority, clsx, tailwind-merge (component variant utilities)
- lucide-react (icons)

## Project structure

```
src/
├── assets/
│   └── hero.png               # not referenced anywhere yet
├── components/
│   ├── CursorTrail.tsx        # subtle fading dot trail following the pointer (fine pointers only)
│   ├── LanguageToggle.tsx     # EN/RO switch, persisted to localStorage
│   ├── Navbar.tsx             # sticky nav with mobile menu
│   ├── sections/
│   │   ├── Hero.tsx           # intro, typing effect, animated stats, parallax blobs
│   │   ├── Experience.tsx     # work history timeline
│   │   ├── Projects.tsx       # project cards (Portfolio XP, CS2 Leaderboard, Fortuna WC2026)
│   │   ├── Skills.tsx         # skills grid
│   │   ├── Contact.tsx        # contact links
│   │   ├── Faq.tsx            # Radix accordion
│   │   ├── Footer.tsx
│   │   └── shared.tsx         # shared section primitives
│   └── ui/                    # shadcn/ui: accordion, badge, button, card, tabs, tooltip
├── hooks/
│   ├── useLanguage.ts         # EN/RO state, persisted to localStorage, falls back to browser language
│   ├── useReveal.ts           # one-shot scroll reveal via IntersectionObserver
│   ├── useCountUp.ts          # animates a numeric value (prefix/digits/suffix) with requestAnimationFrame
│   ├── useTyping.ts           # character-by-character typing effect for the Hero role line
│   ├── useParallax.ts         # subtle parallax on Hero blobs; writes transform directly, no re-renders
│   └── useReducedMotion.ts    # shared prefers-reduced-motion check, listened for changes live
├── i18n/
│   └── translations.ts        # all EN/RO content, including the a11y label block
├── lib/
│   └── utils.ts               # shadcn class-merging helper
├── index.css                  # Tailwind layers, theme tokens, focus-visible, reveal classes
└── main.tsx                   # entry point: mounts Navbar, sections, Footer, CursorTrail
```

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check (tsc -b) + production build to dist/
npm run preview    # serve the production build locally
```

## Deploy

The build is purely static — no PHP, Node, or any other process is needed on the server. It is served by nginx from `/var/www/cv/dist` on a VPS (cyberfolks.ro), with DNS proxied through Cloudflare and TLS from Let's Encrypt/certbot. Hashed assets in `dist/assets/` are cached immutable for a year; `index.html` is served with `no-cache`.

The full nginx configuration, the reasoning behind each choice, and the deploy procedure are in [`vault/13-Nginx.md`](vault/13-Nginx.md).

## Project documentation

The project's working documentation lives in [`vault/`](vault/) in this repository. It is structured as an Obsidian vault — open the `vault/` folder as a vault in Obsidian to browse the notes (content, design, stack, deploy, task list, progress log, handover) and follow their links.

## Accessibility

- Every animation in the project (reveal, count-up, typing, parallax, cursor trail) checks `prefers-reduced-motion` through the shared `useReducedMotion` hook and disables or skips the motion when it is set, including live changes made while the page is open.
- Interactive controls carry `aria-label`s from a dedicated `a11y` block in the translations (in both languages), plus `aria-expanded`/`aria-controls` on the mobile menu.
- A global `:focus-visible` outline provides a visible focus indicator on all interactive elements.
- The typing effect keeps the full text in a visually hidden element so screen readers hear it once, in full, rather than character by character.