---
tip: log
proiect: cv
tags: [log, cv]
---
# Log

Jurnal de progres pentru proiectul CV. Fiecare intrare: dată, ce s-a făcut, ce e în așteptare.

## Format

```
### YYYY-MM-DD
- [x] ce s-a făcut
- [ ] ce e în așteptare
- Notă: orice context important
```

---

## Intrări

### 2026-09-03

#### 16:00 — Pregătire documentație
- [x] Creat structura proiectului în Obsidian (`~/Vaults/cv/`)
- [x] 6 note: README (hub), 01-Conținut-CV, 02-Proiecte, 03-Stack-Și-Componente, 04-Deploy, 05-Plan-Execuție
- [x] Toate legate cu wikilinks
- [x] Adăugat .obsidian/ (configurația Obsidian)
- [x] Adăugat 06-Log.md (jurnal de progres)
- [x] Adăugat 07-Handover.md (document de preluare)
- [x] Adăugat 08-Componente.md (lista completă de componente)
- [x] Adăugat 09-Design.md (cum arată site-ul)
- [x] Adăugat 10-Research.md (ce putem lua de la alți site-uri)
- [x] Adăugat 11-Taskuri.md (taskuri de la A la Z)
- Notă: proiect separat de `QWEN-36b` și `marketing`

#### 18:00–20:35 — Faze 0–3 implementate
- [x] A1: Creat folder `~/Projects/PERSONAL/CV/mariusivan-cv/`
- [x] A2: Inițializat proiect Vite + React + TypeScript
- [x] A3: Configurat Tailwind CSS
- [x] A4: Inițializat shadcn/ui
- [x] A5: Structură fișiere (components, sections, ui, hooks, i18n, lib)
- [x] B1: Adăugat componente shadcn de bază: button, card, tabs, badge, tooltip
- [x] B2: Creați componente layout: Navbar, Footer
- [x] B3: Secțiuni implementate: Hero, Experience, Projects, Skills, Contact
- [x] B4: Carduri proiecte: Portfolio XP (demo live), CS2 Leaderboard, Fortuna WC2026
- [x] D1–D3: Conținut CV scris în `src/i18n/translations.ts`
- [x] E1: Structură pagină (Hero → Experience → Projects → Skills → Contact → Footer)
- [x] E2: Responsive (grid-uri flexibile)
- [x] E3: Animații (fade-in, slide-up, counter)
- [ ] F1: Optimizare performanță
- [ ] F2: Testare
- [ ] F3: Testare accesibilitate
- [ ] G1: Dev server
- [ ] G2: Preview build
- [ ] H1: Build pentru producție
- [ ] H2: Configurație pentru VPS
- [ ] I1: Pas 1: Muta XP-ul pe subdomeniu
- [ ] I2: Pas 2: Build CV local
- [ ] I3: Pas 3: Deploy pe VPS
- [ ] I4: Verificare finală
- [ ] J1: Git
- [ ] J2: README
- [ ] J3: Actualizare Obsidian
- [ ] J4: Beta → Prod
- Notă: proiectul e gata de execuție locală (npm run dev/build)

### 2026-09-04

#### 12:00 — Consolidare într-un singur loc
- [x] Fuzionat cele două copii ale proiectului în `~/Projects/PERSONAL/mariusivan-cv/`
- [x] Codul aplicației venea din `PERSONAL/CV/mariusivan-cv`; repo-ul git cu remote venea din `Projects/mariusivan-cv` (avea doar schelet Vite gol)
- [x] Vaultul Obsidian mutat din `~/Vaults/cv/` în `vault/`, în interiorul repo-ului
- [x] `CV-BRIEF.md` mutat lângă restul documentației, în `vault/`
- [x] Adăugat `AGENTS.md` — regulile pentru agent: commit + notă aici după fiecare task
- [x] Commit de baseline `5bfff1b`
- Notă: vechile foldere sunt în `PERSONAL/_archive-cv-2026-09-04/` (86 MB), de șters după verificare
- Notă: căile din `07-Handover.md` și `12-Prompt.md` au fost actualizate; intrările istorice din log și taskuri au fost lăsate cum erau

#### 13:12 — Build-ul trece pentru prima dată
- [x] `resolve.alias` pentru `@` în `vite.config.ts` — lipsea complet, deși `tsconfig.app.json` avea `paths`
- [x] `Projects.tsx` — datele folosesc `badgeTone: 'primary'`, dar Badge-ul shadcn n-are varianta asta; adăugat un map `TONE_TO_VARIANT` (primary → default)
- [x] `useLanguage.ts` — `translations[readInitial]` indexa cu funcția, nu cu rezultatul ei
- [x] Scoase importurile nefolosite din `LanguageToggle.tsx` și `shared.tsx` (`noUnusedLocals` le face erori, nu warning-uri)
- [x] `npm run build`: 1622 module, 251.95 kB js (80.98 kB gzip), 18.00 kB css
- [x] Commit `d273c15`
- [ ] `npm run dev` neverificat încă — doar build-ul de producție a fost rulat
- Notă: **de ce lipsea alias-ul** — `tsconfig` rezolvă `@/` doar pentru TypeScript; Vite/Rollup are nevoie de propriul alias la runtime. Erau două configurări separate care trebuiau ținute în sincron, și doar una fusese făcută.
- Notă: fix-urile au fost generate de Qwen3.8-27B rulat local (mtplx + hermes), nu scrise de mână
- Notă: prima rulare a picat cu `insufficient memory` în timpul prefill-ului — 33 GB de model pe 48 GB RAM lasă prea puțin loc. Modelul apucase să scrie fișierele, dar a murit înainte de commit. De rulat serverul cu limita GPU ridicată (`sudo sysctl iogpu.wired_limit_mb=40960`) sau cu KV cache q8.

#### 16:15 — F3: Accesibilitate (aria-labels, focus vizibil, audit contrast)
- [x] `translations.ts` — bloc nou `a11y` (EN + RO): toggleLanguage, openMenu/closeMenu, home, liveDemo, viewRepo, email, github, liveSite. Nicio etichetă hardcodată în componente
- [x] `LanguageToggle.tsx` — aria-label din `t.a11y` (era hardcodat ternar)
- [x] `Navbar.tsx` — logo: aria-label „Go to top"; butonul hamburger: aria-label dinamic (open/close) + `aria-expanded` + `aria-controls="mobile-menu"`; toate butoanele de nav au focus ring
- [x] `Projects.tsx` — butoanele „Live demo"/„View repo" au aria-label cu numele proiectului + mențiunea „într-un tab nou"
- [x] `Contact.tsx` — linkurile au aria-label (ex. „Open GitHub profile in a new tab (github.com/mivan1990)") + focus ring
- [x] `Footer.tsx` — linkul GitHub: aria-label + focus ring
- [x] `index.css` — fallback global `:where(a, button, ...):focus-visible` cu outline 2px pe `--ring`; butoanele shadcn deja aveau ring
- [x] `npm run build` trece; commit `2813640`
- [ ] Contrast: `primary` pe fundal/card în tema dark e sub 4.5:1 — paleta NU s-a schimbat (cerință), doar raportat
- Notă: **audit contrast (WCAG 2.1, perechi text/fundal din paletă):**
  - LIGHT: totul trece — foreground/bg 19.0, muted-foreground/bg 6.1, primary/bg 8.2, accent-foreground/accent 9.8
  - DARK: **`primary` pe `background` = 3.35:1** și **`primary` pe `card` = 3.17:1** — sub 4.5:1. Atinge 3:1 (AA pentru UI grafic), deci e ok ca iconițe/borduri, dar NU ca text. În dark, textul colorat pe `text-primary` (eyebrow-uri, stat values, badge-uri, stack pills) nu atinge AA
  - Restul dark: foreground/bg 17.7, muted-foreground 7.1–7.5, accent-foreground/accent 5.9 — toate trec
- Notă: am resetat commitul inițial care trasea `AGENTS.md` (modificat de altcineva în paralel, secțiunea „Bug-uri deschise" → „Starea build-ului"); commitul final conține doar cele 7 fișiere ale taskului


[[README]] · [[05-Plan-Execuție]] · [[11-Taskuri]] · [[07-Handover]]
