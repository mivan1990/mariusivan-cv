---
tip: tasks
proiect: cv
tags: [tasks, cv]
---
# Taskuri de la A la Z

De la **A** (proiect gol) la **Z** (ready to deploy pe prod, ieșit din beta).

Fiecare task are: ID, descriere, dependențe, și status.
Status: `[ ]` = de făcut, `[x]` = făcut, `[~]` = în curs.

---

## Faza A — Setup & Fundație

### A1. Creare repo nou
- [x] `git init` într-un director nou (ex. `~/Projects/cv/` sau `~/Projects/mariusivan-cv/`)
- [ ] `git add . && git commit -m "Initial commit"`
- [ ] Creează repo pe GitHub: `github.com/mivan1990/mariusivan-cv`
- [ ] `git remote add origin git@github.com:mivan1990/mariusivan-cv.git`
- [ ] `.gitignore` standard pentru Node/React (node_modules, dist, .env, .DS_Store)
- Dependențe: none
- Estimare: 10 min
- Status: folder creat la `~/Projects/PERSONAL/CV/mariusivan-cv/`

### A2. Inițializare proiect Vite + React + TypeScript
- [x] `npx create-vite mariusivan-cv --template react-ts`
- [ ] `cd mariusivan-cv && npm install`
- [ ] Verifică: `npm run dev` pornește, `npm run build` funcționează
- Dependențe: A1
- Estimare: 15 min
- Status: proiect inițializat, `package.json` + `vite.config.ts` + `tsconfig.json` prezente

### A3. Configurație Tailwind CSS
- [x] `npm install -D tailwindcss postcss autoprefixer`
- [x] `npx tailwindcss init`
- [x] Configurează `tailwind.config.js` cu content paths
- [x] Adaugă `@tailwind base; @tailwind components; @tailwind utilities;` în `index.css`
- Dependențe: A2
- Estimare: 10 min
- Status: `tailwind.config.js`, `postcss.config.js`, `src/index.css` configurate

### A4. Inițializare shadcn/ui
- [x] `npx shadcn@latest init`
- [x] Configurează `components.json`
- [x] Verifică: `src/lib/utils.ts` e creat
- [x] Verifică: `tailwind.config.js` e actualizat
- Dependențe: A3
- Estimare: 10 min
- Status: `components.json`, `src/lib/utils.ts` prezente

### A5. Structură de fișiere
- [x] Creează directoarele:
  ```
  src/
  ├── components/
  │   ├── ui/          ← button, card, tabs, badge, tooltip
  │   ├── layout/      ← Navbar, Footer
  │   ├── sections/    ← Hero, Experience, Projects, Skills, Contact
  │   ├── projects/
  │   └── animations/
  ├── lib/             ← utils.ts
  ├── hooks/           ← useLanguage, useReveal
  ├── assets/
  │   ├── images/
  │   └── icons/
  ├── styles/
  ├── data/
  └── types/
  ```
- Dependențe: A4
- Estimare: 5 min
- Status: structură implementată: `src/components/`, `src/sections/`, `src/ui/`, `src/hooks/`, `src/lib/`, `src/i18n/`

---

## Faza B — Componente de Bază (shadcn/ui)

### B1. Adaugă componente shadcn de bază
- [x] `npx shadcn@latest add button card tabs dialog tooltip badge separator avatar input label textarea sheet skeleton progress accordion carousel table navigation-menu breadcrumbs dropdown-menu alert divider container row column stack grid flex`
- [x] Verifică: toate fișierele sunt create în `src/components/ui/`
- Dependențe: A4
- Estimare: 10 min
- Status: `button`, `card`, `tabs`, `badge`, `tooltip` create în `src/components/ui/`

### B2. Componente de layout
- [x] `src/components/layout/header.tsx` — sticky header cu glassmorphism
- [x] `src/components/layout/footer.tsx` — footer cu linkuri
- [x] `src/components/layout/nav.tsx` — navigare (hamburger pe mobile)
- [ ] `src/components/layout/sidebar.tsx` — sidebar pentru mobile
- Dependențe: B1
- Estimare: 30 min
- Status: `Navbar.tsx` + `Footer.tsx` create

### B3. Secțiuni ale paginii
- [x] `src/components/sections/hero.tsx` — hero cu titlu, subtitlu, quote, butoane, stats
- [x] `src/components/sections/experience.tsx` — timeline verticală
- [x] `src/components/sections/projects.tsx` — grid de carduri
- [x] `src/components/sections/skills.tsx` — grid de badge-uri
- [ ] `src/components/sections/stats.tsx` — numere animate
- [ ] `src/components/sections/faq.tsx` — accordion
- [x] `src/components/sections/contact.tsx` — formular
- Dependențe: B1
- Estimare: 60 min
- Status: `Hero`, `Experience`, `Projects`, `Skills`, `Contact` implementate

### B4. Carduri pentru proiecte
- [x] `src/components/projects/cs2-leaderboard.tsx`
- [x] `src/components/projects/portfolio-xp.tsx`
- [x] `src/components/projects/fortuna-wc2026.tsx`
- Dependențe: B1
- Estimare: 30 min
- Status: carduri integrate în `src/components/sections/Projects.tsx`

---

## Faza C — Animații & Interacțiuni

### C1. Animații de bază
- [ ] `src/components/animations/fade-in.tsx` — fade-in la scroll
- [ ] `src/components/animations/slide-up.tsx` — slide-up la scroll
- [ ] `src/components/animations/scale-up.tsx` — scale-up la scroll
- [ ] `src/components/animations/parallax.tsx` — parallax pe fundal
- Dependențe: B1
- Estimare: 30 min

### C2. Animații avansate
- [ ] `src/components/animations/typing-effect.tsx` — efect de tastare
- [ ] `src/components/animations/animated-counter.tsx` — numere animate
- [ ] `src/components/animations/cursor-trail.tsx` — urmă după cursor
- [ ] `src/components/animations/micro-interactions.tsx` — micro-interacțiuni pe butoane
- Dependențe: B1
- Estimare: 45 min

### C3. Animații 3D (opțional)
- [ ] `src/components/animations/3d-floating-shapes.tsx` — forme 3D care reacționează la cursor
- [ ] `src/components/animations/glassmorphism-cards.tsx` — carduri cu efect de sticlă
- [ ] `src/components/animations/webgl-distortion.tsx` — distorsiune WebGL pe imagini
- Dependențe: B1
- Estimare: 60 min

### C4. Hooks pentru animații
- [ ] `src/hooks/use-scroll.ts` — hook pentru animații la scroll
- [ ] `src/hooks/use-typing.ts` — hook pentru efect de tastare
- [ ] `src/hooks/use-cursor.ts` — hook pentru cursor trail
- [ ] `src/hooks/use-animated-counter.ts` — hook pentru numere animate
- Dependențe: C1
- Estimare: 30 min

---

## Faza D — Conținut & Date

### D1. Datele CV
- [ ] `src/data/cv.ts` — toate datele CV (experiență, proiecte, skills, stats)
- [ ] Structură:
  ```typescript
  interface CVData {
    name: string;
    title: string;
    quote: string;
    experience: Experience[];
    projects: Project[];
    skills: SkillCategory[];
    stats: Stat[];
    faq: FAQItem[];
    contact: ContactInfo;
  }
  ```
- Dependențe: A5
- Estimare: 30 min

### D2. Sistem bilingv EN/RO
- [ ] `src/lib/i18n.ts` — sistem de traduceri
- [ ] `src/hooks/use-i18n.ts` — hook pentru comutare limbă
- [ ] `src/data/translations/en.ts` — traduceri EN
- [ ] `src/data/translations/ro.ts` — traduceri RO
- [ ] Toggle în header
- Dependențe: D1
- Estimare: 45 min

### D3. Conținut real
- [ ] Completează `src/data/cv.ts` cu datele reale din `01-Conținut-CV.md`
- [ ] FEG Group: Junior Developer, ian. 2023 → prezent
- [ ] 82 module, responsabilități, stack
- [ ] Cele 3 proiecte din `02-Proiecte.md`
- Dependențe: D1
- Estimare: 30 min

---

## Faza E — Pagina Principală

### E1. Structura paginii
- [ ] `src/App.tsx` — structura completă:
  ```
  <Header />
  <main>
    <Hero />
    <Experience />
    <Projects />
    <Skills />
    <Stats />
    <FAQ />
    <Contact />
  </main>
  <Footer />
  ```
- Dependențe: B3
- Estimare: 15 min

### E2. Responsive design
- [ ] Testează pe mobile (375px), tablet (768px), desktop (1920px)
- [ ] Ajustează grid-uri, font-uri, spațiere
- [ ] Verifică că totul e curat și aliniat
- Dependențe: E1
- Estimare: 30 min

### E3. Testare animații
- [ ] Verifică că toate animațiile funcționează
- [ ] Verifică performanța (60fps)
- [ ] Ajustează durate și timing
- Dependențe: E1
- Estimare: 30 min

---

## Faza F — Optimizare & Testare

### F1. Optimizare performanță
- [ ] `npm run build` — verifică dimensiunea bundle-ului
- [ ] Optimizează imagini (WebP/AVIF)
- [ ] Lazy-load pentru secțiuni
- [ ] Code-splitting pentru animații 3D
- Dependențe: E3
- Estimare: 30 min

### F2. Testare
- [ ] Testează pe Chrome, Firefox, Safari
- [ ] Testează pe mobile (real sau emulator)
- [ ] Testează toggle-ul EN/RO
- [ ] Testează că toate linkurile merg
- Dependențe: E2
- Estimare: 30 min

### F3. Testare accesibilitate
- [ ] Verifică contrastul culorilor
- [ ] Verifică navigare cu tastatură
- [ ] Adaugă aria-labels unde e necesar
- Dependențe: F2
- Estimare: 20 min

---

## Faza G — Local Development

### G1. Dev server
- [ ] `npm run dev` — verifică că totul funcționează local
- [ ] Verifică hot-reload
- Dependențe: E1
- Estimare: 10 min

### G2. Preview build
- [ ] `npm run build && npm run preview` — verifică build-ul
- Dependențe: F1
- Estimare: 10 min

---

## Faza H — Deploy Pregătire

### H1. Build pentru producție
- [ ] `npm run build` — generează `dist/`
- [ ] Verifică că toate fișierele sunt corecte
- Dependențe: F1
- Estimare: 10 min

### H2. Configurație pentru VPS
- [ ] Pregătește fișierele pentru `/var/www/cv/dist`
- [ ] Verifică că nu e nevoie de backend (static)
- Dependențe: H1
- Estimare: 10 min

---

## Faza I — Deploy pe Prod

### I1. Pas 1: Muta XP-ul pe subdomeniu
- [ ] Cloudflare → DNS → record `A`, nume `xp`, același IP, Proxied ON
- [ ] Vhost nou pe VPS pentru `xp.mariusivan.ro`
- [ ] `certbot --nginx -d xp.mariusivan.ro`
- [ ] Verifică: `https://xp.mariusivan.ro` funcționează
- Dependențe: H2
- Estimare: 30 min

### I2. Pas 2: Build CV local
- [ ] `npm run build` — verifică build-ul
- Dependențe: H1
- Estimare: 10 min

### I3. Pas 3: Deploy pe VPS
- [ ] Copiază `dist/` în `/var/www/cv/dist`
- [ ] Schimbă `root` în vhost-ul `mariusivan.ro`
- [ ] `nginx -t && systemctl reload nginx`
- Dependențe: I2
- Estimare: 20 min

### I4. Verificare finală
- [ ] `https://mariusivan.ro` arată CV-ul nou
- [ ] `https://xp.mariusivan.ro` arată XP-ul
- [ ] Butonul „Live demo" din CV → XP funcționează
- Dependențe: I3
- Estimare: 15 min

---

## Faza J — Finalizare

### J1. Git
- [ ] `git add . && git commit -m "CV interactiv - v1.0"`
- [ ] `git tag v1.0`
- [ ] `git push origin main && git push --tags`
- Dependențe: I4
- Estimare: 10 min

### J2. README
- [ ] Scrie `README.md` cu:
  - Ce e proiectul
  - Cum rulezi local
  - Cum deployezi
  - Structura fișierelor
- Dependențe: J1
- Estimare: 20 min

### J3. Actualizare Obsidian
- [ ] Actualizează `06-Log.md` cu toate task-urile făcute
- [ ] Actualizează `07-Handover.md` cu starea finală
- Dependențe: J2
- Estimare: 15 min

### J4. Beta → Prod
- [ ] Marchează proiectul ca "ready to deploy"
- [ ] Actualizează status în `07-Handover.md`
- [ ] Adaugă în `06-Log.md`: "Z - Ready to deploy pe prod"
- Dependențe: J3
- Estimare: 10 min

---

## Rezumat

| Fază | Taskuri | Estimare totală |
|---|---|---|
| A — Setup & Fundație | A1-A5 | ~60 min |
| B — Componente de Bază | B1-B4 | ~120 min |
| C — Animații & Interacțiuni | C1-C4 | ~165 min |
| D — Conținut & Date | D1-D3 | ~105 min |
| E — Pagina Principală | E1-E3 | ~75 min |
| F — Optimizare & Testare | F1-F3 | ~80 min |
| G — Local Development | G1-G2 | ~20 min |
| H — Deploy Pregătire | H1-H2 | ~20 min |
| I — Deploy pe Prod | I1-I4 | ~75 min |
| J — Finalizare | J1-J4 | ~55 min |
| **Total** | **36 taskuri** | **~700 min (~12 ore)** |

## Status

- [ ] A1. Creare repo nou
- [ ] A2. Inițializare proiect Vite + React + TypeScript
- [ ] A3. Configurație Tailwind CSS
- [ ] A4. Inițializare shadcn/ui
- [ ] A5. Structură de fișiere
- [ ] B1. Adaugă componente shchcn de bază
- [ ] B2. Componente de layout
- [ ] B3. Secțiuni ale paginii
- [ ] B4. Carduri pentru proiecte
- [ ] C1. Animații de bază
- [ ] C2. Animații avansate
- [ ] C3. Animații 3D (opțional)
- [ ] C4. Hooks pentru animații
- [ ] D1. Datele CV
- [ ] D2. Sistem bilingv EN/RO
- [ ] D3. Conținut real
- [ ] E1. Structura paginii
- [ ] E2. Responsive design
- [ ] E3. Testare animații
- [ ] F1. Optimizare performanță
- [ ] F2. Testare
- [ ] F3. Testare accesibilitate
- [ ] G1. Dev server
- [ ] G2. Preview build
- [ ] H1. Build pentru producție
- [ ] H2. Configurație pentru VPS
- [ ] I1. Pas 1: Muta XP-ul pe subdomeniu
- [ ] I2. Pas 2: Build CV local
- [ ] I3. Pas 3: Deploy pe VPS
- [ ] I4. Verificare finală
- [ ] J1. Git
- [ ] J2. README
- [ ] J3. Actualizare Obsidian
- [ ] J4. Beta → Prod

[[README]] · [[05-Plan-Execuție]] · [[06-Log]] · [[07-Handover]]