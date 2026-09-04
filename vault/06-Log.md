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


#### 16:40 — F2 sărit prin decizie; audit static de linkuri

- [x] `npm run dev` pornește (133 ms) — era neverificat de la început, acum confirmat
- [x] Push pe origin: `c373d0f..eec7031`, 4 commit-uri (baseline, fix build, log F3, corectură AGENTS.md)
- [ ] **F2 nu s-a făcut** — decizie explicită (Marius, 2026-09-04): sărim peste testarea în browser
- Notă: nu s-a putut testa automat oricum — extensiile de browser (Claude in Chrome, Playwright MCP Bridge) nu sunt conectate. Rămân netestate: Chrome/Firefox/Safari, mobil real, și dacă toggle-ul EN/RO comută corect vizual.
- Notă: **trei probleme găsite din audit static, toate încă nereparate:**
  1. `github.com/mivan1990/CS2Leaderboard` întoarce **404** — repo privat sau nume greșit. Linkul e în `translations.ts`, în ambele limbi.
  2. `Projects.tsx:89` — `className="gap--1.5"` (două minusuri), clasă Tailwind inexistentă → butonul „View repo" n-are spațiu între iconiță și text. **Preexistent**, verificat cu `git show 5171be6` — nu vine de la F3. Tot acolo, indentarea e stricată în jurul liniei 74.
  3. Ambele butoane din `Projects.tsx` folosesc `window.open(url, '_blank')` fără `noopener` → pagina deschisă primește `window.opener` (reverse tabnabbing). Linkurile `<a>` din Contact/Footer au `rel="noreferrer"` și sunt în regulă.
- Notă: `xp.mariusivan.ro` nu rezolvă, dar e normal — taskul I1 („Mută XP-ul pe subdomeniu") e încă nefăcut. Nu e bug, e ordinea de deploy.

#### 18:36 — F1 + H1 + H2: performanță, build prod, config nginx
- [x] **F1**: `npm run build` — 1622 module, 253.86 kB js (81.35 kB gzip), 18.28 kB css (4.44 kB gzip), index.html 1.02 kB. Total ~86 kB gzip
- [x] Lazy-load pe secțiuni: **nu implementat, cu argument** — bundle-ul e sub 100 kB gzip, o singură pagină cu scroll; `React.lazy` ar adăuga un request suplimentar fără a reduce dimensiunea (secțiunile sunt deja în același chunk). Codul n-a fost atins
- [x] Imagini: confirmat că `hero.png` (13K) și `icons.svg` (5K) **nu sunt referențate în cod** — singurul asset folosit e `favicon.svg` (din `index.html`). Nu e nimic de optimizat pentru că nu sunt încărcate; **nu au fost șterse** (decizie explicită)
- [x] Code-splitting 3D: **fără obiect** — nici three, nici gsap, nici framer-motion în `package.json`; `src/components/animations/` nu are conținut
- [x] **H1**: `dist/` verificat — `index.html` referențiază corect `index-CdPAFNPn.js` + `index-B5d2kAm5.css`; nimic nu lipsește
- [x] **H2**: static pur confirmat (fără `fetch()` către API-uri proprii, fără `import.meta.env`); navigarea e doar ancore `#hash` + `scrollIntoView` (fără react-router) → rewrite SPA nu e necesar; config nginx scris în `vault/13-Nginx.md` (cache: assets hashuite 1 an immutable, `index.html` no-cache)
- [ ] Deploy pe VPS (I1–I4) — urmează

#### 19:20 — B3: secțiunea FAQ (accordion)
- [x] `expandFaq` / `collapseFaq` adăugate în ambele limbi din `translations.ts` (build-ul era stricat de lipsa lor)
- [x] `src/components/sections/Faq.tsx` — accordion Radix (`type="multiple"`), `useReveal`, `id="faq"` pentru ancora din Navbar
- [x] Montată în `main.tsx` între `<Contact />` și `</main>`; link `t.nav.faq` adăugat în Navbar (desktop + mobil)
- [x] `npm run build` — trece: 1628 module, 272.35 kB js (87.21 kB gzip), 19.14 kB css (4.60 kB gzip)
- Commit: `532c178` (fără push)

#### 20:05 — B3: stats — numere animate
- [x] `src/hooks/useCountUp.ts` — hook nou: descompune valoarea în prefix + cifre + suffix (regex `^(\D*)(\d+)(\D*)$`), animează doar cifra cu `requestAnimationFrame` (1.2 s, ease-out cubic), folosește `useReveal` pentru viewport (fără al doilea IntersectionObserver)
- [x] `Hero.tsx` — `StatBox` folosește `useCountUp`; ref-ul e pe cardul întreg
- [x] Capcane: `'≤6'` — prefixul `≤` rămâne, se animează doar `6`; `'2023'` — **alegere: pornesc de aproape (target − 25, adică de la 1998)**, nu de la 0 — un an numărat de la zero arată prostesc, iar delta mică e încă vizibilă ca mișcare; `'82'` — de la 0, normal
- [x] `prefers-reduced-motion` — respectat: valoarea finală direct, fără animatie (media query + listener la `change`)
- [x] Comutare EN/RO — cifra curentă e ținută într-un ref; la schimbarea valorii se continuă de la cifra afișată, nu repornește de la zero; valori identice → fără animatie
- [x] Valoare fără cifre → se afișează ca atare (fallback, nu cade)
- [x] `npm run build` — trece: 1629 module, 273.44 kB js (87.59 kB gzip), 19.18 kB css
- [x] Subtask bifat în `11-Taskuri.md` (B3: stats.tsx — numere animate)
- Commit: `db16346` (fără push)

### 2026-09-04

#### 11:00 — C2: typing effect pe rolul din Hero
- [x] `src/hooks/useTyping.ts` — hook nou: tastează textul literă cu literă (~50 ms/caracter, `setInterval`), repornește de la zero la schimbarea textului (EN/RO), curăță timerul la unmount și la schimbare
- [x] `prefers-reduced-motion` — afișează textul complet direct, fără animatie și fără cursor (media query + listener la `change`)
- [x] Accesibilitate — spanul animat `aria-hidden`, textul complet într-un `.sr-only` (e citit o dată, întreg), cursorul `aria-hidden`
- [x] Fără layout shift — textul complet invizibil (`invisible`) rezervă spațiul; textul animat e suprapus `absolute inset-0`
- [x] Cursorul clipește doar după terminare; keyframes injectate printr-un `<style>` în Hero (modificarea ținută doar în Hero.tsx + hook)
- [x] `npm run build` — trece: 1630 module, 274.87 kB js (87.98 kB gzip)
- [x] Subtask bifat în `11-Taskuri.md` (C2: typing-effect)
- Commit: `b3786af` (fără push)

#### 21:25 — C1: parallax subtil pe petele decorative din Hero
- [x] `src/hooks/useParallax.ts` — hook nou: scrie direct pe `element.style.transform` printr-un ref (zero `setState` → zero re-rendere), coalescerea evenimentelor de scroll cu `requestAnimationFrame`, listener `{ passive: true }`, doar `translate3d` (compositor, fără layout)
- [x] `Hero.tsx` — cele două pete `blur-3xl` primesc viteze diferite (0.04 / 0.09) → adâncime; plafon 40/55 px, efect subtil
- [x] `prefers-reduced-motion` — folosește hook-ul existent `useReducedMotion` (fără copie): cu reduce activ nu se atașează niciun listener, petele rămân pe loc
- [x] Curățare la unmount: `removeEventListener` + `cancelAnimationFrame` + reset transform
- [x] Masurarea se face pe containerul părinte (stabil), nu pe element — altfel transform-ul aplicat s-ar include în măsurătoare (feedback loop)
- [x] `npm run build` — trece: 1632 module, 274.83 kB js (88.04 kB gzip)
- [x] Subtask bifat în `11-Taskuri.md` (C1: parallax)
- Notă: animația `float` din `tailwind.config.js` **nu a fost combinată** — ambele scriu pe `transform` (parallax direct pe `style`, `float` prin `@keyframes`), deci s-ar anula reciproc; iar două mișcări continue (float infinit + parallax) pe elemente deja `blur-3xl` ar fi fost prea agitat pentru un fundal subtil. Rămâne definită, nefolosită
- Commit: vezi `git log` (fără push)

#### 21:32 — C2: cursor trail (urma discretă după cursor)
- [x] `src/components/CursorTrail.tsx` — componentă izolată (se scoate dintr-o singură linie din `main.tsx`): 5 puncte mici (8→3 px) în `primary` cu opacitate descrescătoare (0.4→0.1), fiecare urmărește pe cel din față cu lerp → efect de urmă estompată
- [x] Dezactivată pe touch: `window.matchMedia("(pointer: fine)")` + listener la `change` — pe dispozitive fără pointer fin nu randează nimic și nu se atașează niciun listener
- [x] `prefers-reduced-motion` — folosește hook-ul existent `useReducedMotion` (fără copie): reduce activ → `return null`
- [x] `pointer-events: none` pe container + `z-40` (sub navbar-ul `z-50`) — nu blochează click/hover, nu acoperă navbarul
- [x] Performanță: zero `setState` pe `pointermove` — coordonatele intră într-un ref, pozițiile se scriu direct pe `style.transform` (`translate3d`) într-un buclă `requestAnimationFrame`; listener `{ passive: true }`
- [x] Curățare la unmount: `removeEventListener` + `cancelAnimationFrame`; containerul se stinge (`opacity: 0`) când pointerul părăsește pagina sau fereastra pierde focusul
- [x] Montată în `main.tsx` ca ultim copil, înaintea `</TooltipProvider>`
- [x] `npm run build` — trece: 1633 module, 276.38 kB js (88.59 kB gzip)
- [x] Subtask bifat în `11-Taskuri.md` (C2: cursor-trail)

#### 21:50 — Faza C închisă; C3 (3D/WebGL) decis să nu se facă

- [x] Toate efectele din C sunt gata: reveal la scroll (`useReveal`, exista dinainte), numere
  animate (`useCountUp`), typing effect (`useTyping`), parallax (`useParallax`), cursor trail
  (`CursorTrail.tsx`). Micro-interacțiunile există prin `transition hover:` din Tailwind.
- [x] `useReducedMotion` extras într-un hook comun — toate cele cinci efecte îl respectă
- [~] C3 (3D, WebGL, glassmorphism): **decis să nu**, vezi `11-Taskuri.md`
- Notă: bundle-ul a crescut de la 87.2 la 88.65 kB gzip pe toată faza — 1.4 kB pentru cinci
  efecte. `three.js` singur ar fi adăugat de o sută de ori mai mult.
- Notă: planul C era scris ca listă de 11 fișiere de creat, dar implementarea a folosit hooks
  reutilizabile în loc de componente-wrapper. Efectele există, fișierele din plan nu — de aceea
  subtaskurile sunt bifate după efect, nu după numele fișierului.
- Notă: **niciun efect n-a fost văzut în browser.** Build-ul care trece nu spune nimic despre
  cum arată parallax-ul, urma de cursor sau tastarea. Rămâne de verificat vizual.

#### 22:12 — J2: README rescris
- [x] `README.md` rescris în engleză (repo public pe GitHub), reflectând proiectul real:
  descriere (CV interactiv, bilingv EN/RO, static pur), stack din `package.json` (React 18.3,
  TS 5.6, Vite 5.4, Tailwind 3.4, Radix/shadcn, lucide), structura reală a `src/` cu cei
  6 hooks descriși pe câte o linie, comenzi (dev/build/preview), deploy rezumat
  (static, nginx, `/var/www/cv/dist`) cu trimitere la `vault/13-Nginx.md` (fără duplicarea
  configului), sectiune pentru vault (Obsidian), sectiune „Accessibility"
  (prefers-reduced-motion, aria-labels din `t.a11y`, focus vizibil)
- [x] Vechiul README descria o structură care nu exista niciodată (layout/, projects/,
  animations/, styles/, data/, types/) și trimitea la `04-Deploy.md` fără prefixul `vault/`
- [x] `npm run build` — trece: 1633 module, 276.47 kB js (88.65 kB gzip), 20.29 kB css (4.81 kB gzip)
- [x] J2 bifat în `11-Taskuri.md` (ambele locuri)
- Notă: n-am promis testare în browsere (nu a fost făcută — vezi F2); README-ul nu
  pretinde niciun lucru neverificat

#### 22:40 — J3: handover rescris la starea reală
- [x] `07-Handover.md` rescris: calea corectă (`~/Projects/PERSONAL/mariusivan-cv/`, vault în `vault/`, vechea `~/Vaults/cv` nu mai există), build-ul trece, fazele gata (A, B, C, F1, F3, G1, H1, H2, J2), ce nu e gata și de ce (F2 sărită, C3 decis să nu, I1–I4 cer Cloudflare+SSH, J1/J3/J4), cele 3 probleme cunoscute, cele 2 decizii deschise
- [x] Accent pus clar: **aplicația nu a fost deschisă niciodată într-un browser** — build-ul care trece nu spune nimic despre cele cinci efecte
- [x] `npm run build` re-rulat pentru verificare: 1633 module, 276.47 kB js (88.65 kB gzip), 20.29 kB css (4.81 kB gzip) — trece
- [x] J3 bifat în `11-Taskuri.md` (ambele locuri)
- [ ] J4 rămâne deschis (beta → prod) — depinde de deploy (I1–I4)
- Commit: fără push

[[README]] · [[05-Plan-Execuție]] · [[11-Taskuri]] · [[07-Handover]]
