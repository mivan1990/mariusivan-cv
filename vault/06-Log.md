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

#### 23:05 — G2 verificat, G1 parțial

- [x] `npm run preview` servește build-ul de producție pe :4173 — `HTTP 200` pe `/` și pe
  `/assets/index-NxjMIJgu.js`, iar `index.html` referențiază corect assetul hashuit
- [x] `npm run dev` pornește în 133 ms (verificat mai devreme)
- [ ] Hot-reload neverificat — cere o editare făcută cu pagina deschisă în browser
- Notă: ambele verificări s-au făcut prin request-uri HTTP, nu vizual. Faptul că serverul
  întoarce 200 nu spune nimic despre ce se randează. Avertismentul din `07-Handover.md`
  rămâne valabil.

#### 22:30 — Reparate două din cele trei probleme cunoscute

- [x] `Projects.tsx:89` — `className="gap--1.5"` (două minusuri, clasă Tailwind invalidă) → `gap-1.5`, ca la butonul de deasupra. Butonul „View repo” primește spațiu între iconiță și text
- [x] `Projects.tsx` — ambele butoane: `window.open(url, '_blank')` → `window.open(url, '_blank', 'noopener,noreferrer')` (reverse tabnabbing închis)
- [x] Indentarea stricată din jurul liniei 74 (butonul „Live demo”) aliniată cu restul fișierului — fără nicio schimbare de logică
- [x] `npm run build` — trece: 1633 module, 276.51 kB js (88.66 kB gzip), 20.29 kB css (4.81 kB gzip)
- [ ] Problema 1 din audit (linkul CS2Leaderboard care dă 404) **rămâne deschisă** — cere răspunsul lui Marius (repo privat sau nume greșit)
- Notă: singurul fișier atins e `Projects.tsx`; fără schimbări vizuale în afara spațiului dintre iconiță și text de la punctul 1
- Commit: vezi `git log` (fără push)

### 2026-09-04

#### 23:16 — Bug fix: comutarea EN/RO nu funcționa (doar butonul se schimba)
- [x] **Bug confirmat în browser (Playwright):** după click pe toggle → butonul afișa `EN`, dar navbar-ul rămânea `Experience` (netradus), iar `localStorage` conținea deja `ro`. Traducerea apărea abia după un refresh manual
- [x] **Cauză:** `useLanguage.ts` folosea `useState` local — fiecare componentă care chema `useLanguage()` (LanguageToggle, Navbar, Hero, Experience, Projects, Skills, Contact, Footer, Faq — ~9 apeluri) avea propria copie independentă a limbii, fixată la montare. `toggle` schimba doar starea locală a butonului
- [x] **Fix:** rescris `useLanguage.ts` ca store la nivel de modul — o singură variabilă `lang` + un `Set` de listeneri, citit cu `useSyncExternalStore(subscribe, getSnapshot, getSnapshot)`. `getSnapshot` întoarce primitivul `lang` (referință stabilă, fără obiect nou la fiecare apel → fără buclă infinită). `toggle` scrie variabila, persistă în `localStorage` + `document.documentElement.lang`, și notifica toți abonații
- [x] **De ce nu React Context:** nu cere niciun provider în `main.tsx` și nu atinge nicio componentă — API-ul `{ lang, t, toggle }` e identic, toate cele ~9 apeluri funcționează neschimbate
- [x] Comportamentul păstrat: citire inițială din `localStorage 'cv:lang'`, fallback pe `navigator.language` (ro → `ro`, altfel `en`), scriere în localStorage la schimbare, actualizare `<html lang>`
- [x] `npm run build` — trece: 1633 module, 276.71 kB js (88.73 kB gzip), 20.29 kB css
- [ ] Verificare vizuală în browser (toggle comută acum toate secțiunile instant) — rămâne la F2
- Commit: vezi `git log` (fără push)

#### 23:40 — F2 făcut cu adevărat; suită E2E în repo

- [x] Deblocat testarea în browser: extensiile (Claude in Chrome, Playwright MCP Bridge) nu sunt
  conectate, dar Playwright avea deja browserele în `~/Library/Caches/ms-playwright`, iar Chrome
  e instalat pe sistem. Se conduce Chrome-ul real prin `channel: 'chrome'`.
- [x] `tests/e2e.mjs` — 21 de verificări pe build-ul de producție: randare, typing effect,
  numere animate, cele 6 secțiuni, accordion FAQ, comutare EN/RO, focus vizibil la Tab, ancore
  navbar, cursor trail, meniu mobil, scroll orizontal, erori de consolă, plus `prefers-reduced-motion`
- [x] **21/21 trec** după fixul de limbă
- [x] Confirmat vizual: aplicația arată corect pe 1440px și pe 390px, fără erori JS
- [ ] Firefox și Safari — netestate. WebKit e descărcat local, dar revizia nu se potrivește cu
  pachetul playwright din cache.
- Notă: **cel mai important lucru al zilei** — testul a găsit că butonul EN/RO nu funcționa.
  `useLanguage` folosea `useState` local, deci fiecare componentă avea propria copie a limbii;
  click-ul schimba doar butonul, restul aplicației se traducea abia după refresh. Nu se vedea
  nici din build (tsc mulțumit), nici din review pe fișier (hook-ul era corect în sine), nici
  din `npm run preview` (pagina se randa perfect). Doar apăsând butonul.
- Notă: primele două „eșecuri" ale suitei au fost erori ale testului, nu ale aplicației — alesesem
  butonul „Home" (care duce corect la `scrollY = 0`) și câmpul `role`, identic în ambele limbi.
  Merită reținut: un test care pică nu e automat un bug găsit.

### 2026-09-05

#### 11:11 — Integrare componentă `Floating` (parallax după mouse)
- [x] Două fișiere sursa, copiate verbatim de la autor: `src/components/ui/parallax-floating.tsx`
  (`Floating` + `FloatingElement`) și `src/hooks/use-mouse-position-ref.ts` (dependența hook-ului)
- [x] `npm install motion` (`^13.2.0`) — componenta autorului importa `useAnimationFrame` din `motion/react`
- [x] **`prefers-reduced-motion`** — folosește hook-ul existent `useReducedMotion` (fără copie):
  cu reduce activ, elementele sunt resetate la `translate3d(0,0,0)`, nu se rulează nicio buclă
  și nu se atașează niciun listener (zero calcul per cadru)
- [x] **Bucla se oprește cu adevărat** (model: `CursorTrail.tsx`) — am verificat în sursa motion
  13.2.0 că `useAnimationFrame` **nu poate fi oprit conditionat** (se abonează la
  `frame.update(cb, true)` cu keepAlive și se deabonează doar la unmount). Deci am renunțat la
  `useAnimationFrame` și am scris bucla cu `requestAnimationFrame` direct + flag `running` +
  `cancelAnimationFrame`: rulează doar cât timp vreun element e la >0.1px de țintă, apoi se oprește
  și repornește la mișcarea mouse-ului. Nu am folosit fallback-ul „sari peste calcul" — ăla ar fi
  lăsat frameloop-ul motion să bată la 60fps în gol
- [x] Directiva `"use client"` — **nu exista** în fișierul autorului (nu e Next.js), deci nimic de scos
- [x] **Nu e montată nicaieri** și nu am creat niciun demo — rămâne disponibilă în codebase, nefolosită
- [x] `npm run build` — trece: 1633 module, 276.71 kB js (**88.73 kB gzip**), 20.64 kB css (4.87 kB gzip)
- **Cost la bundle: 0.00 kB JS.** Baseline (fără cele 2 fișiere): js 88.73 kB gzip / css 4.81 kB.
  După `npm install motion` + fișierele: js 88.73 kB gzip / css 4.87 kB. Diferența de JS e zero pentru
  că componenta nu e importată de nimeni → Vite o tree-shake-uiește complet, iar `motion` nu intră în
  graf. CSS-ul a crescut +0.06 kB doar pentru că Tailwind scanează clasele din fișierele noi
  (`absolute`, `will-change-transform` etc.)
- Notă: pentru că am ales bucla rAF directă, componenta **nu mai importă motion**. Deci `motion` e acum
  o dependență declarată dar nefolosită (0 kB, tree-shake). O las în `package.json` (a fost cerută
  explicit); dacă vrei s-o scoți, `npm uninstall motion` — nu afectează build-ul
- Commit: `4906ecb` (fără push)

#### 11:35 — Montare `Floating` în Hero (parallax mouse în loc de scroll)
- [x] `Hero.tsx`: cele două pete decorative sunt acum în `<Floating sensitivity={0.5}>`,
  fiecare petă într-un `<FloatingElement>`: blob A `depth={0.4}` (max ~14.4px, „mai departe")
  și blob B `depth={0.8}` (max ~28.8px, „mai aproape"). Formula: deplasare = mouse ×
  (depth × sensitivity / 20); pe 1440px max = 72 × depth × sensitivity → plafon 30px respectat
- [x] Scoase importul `useParallax` + cele două apeluri + ref-urile de pe pete (conflict:
  ambele scriu pe `style.transform`, deci înlocuire, nu combinație). `pointer-events-none`
  și `-z-10` rămân pe containerul `<Floating>`
- Notă: `src/hooks/useParallax.ts` **rămâne în proiect, dar e acum nefolosit** (niciun import)
- [x] `npm run build` — trece: 1634 module, 278.45 kB js (89.32 kB gzip), 20.64 kB css (4.87 kB gzip)
- Commit: vezi `git log` (fără push)

#### 12:10 — Experience devine hartă interactivă (carduri plutitoare)
- [x] `src/components/sections/Experience.tsx` rescris — singurul fișier atins
- [x] **Bloc central** (companie + rol + perioadă + intro cu `introStrong` + blocul de proiect): centrat pe desktop cu `md:absolute left-1/2 top-1/2 -translate-1/2`, `z-10` peste carduri, lățime `min(600px, 58%)` — centrul rămâne liber
- [x] **8 carduri plutitoare** (doar `md:` în sus): fiecare responsabilitate e un `<button>` compact (doar `title`), focusabil cu Tab + focus ring consistent cu restul proiectului; click-ul deschide un `<Dialog>` (DialogTitle = `r.title`, DialogDescription = `r.detail`)
- [x] Împrăștiate cu poziții procentuale statice (`FLOATING_CARDS`, top/left în clase Tailwind) în jurul centrului; adâncimi diferite 0.3–0.9 pentru straturi; container `<Floating sensitivity={0.5}>` → deplasare max ~30px pe 1440px, fără `pointer-events-none` (cardurile sunt clicibile)
- [x] **Mobil (sub `md`)**: nimic nu pluteste — aceleași 8 carduri într-o grilă `grid gap-3 sm:grid-cols-2` (`md:hidden`), fiecare tot buton → același Dialog
- [x] Zona plutitoare are `md:min-h-[520px]` explicit (elementele sunt absolute)
- [x] `techGroups` rămân dedesubt, neschimbate (grid de carduri cu etichete) — nu intră în zona plutitoare
- [x] `<Section id="experience" alt>` + `<SectionHeading eyebrow title sub>` păstrate — ancora din navbar funcționează
- [x] `npm run build` — trece: 1675 module, 303.67 kB js (97.69 kB gzip), 23.54 kB css (5.19 kB gzip). Creșterea de la 88.7→97.7 kB gzip vine din Dialog (Radix) + componenta Floating care acum e importată efectiv
- Notă: prima rulare a picat la tsc — `Floating` e export default, nu numit; import corectat
- [ ] Verificare vizuală în browser (pozițiile cardurilor, suprapuneri, Dialog) — rămâne la F2
- Commit: `b8f5370` (fără push)

#### 13:18 — Experience: fundal dark, centru golit, carduri dense
- [x] `src/components/sections/Experience.tsx` rescris — singurul fișier atins
- [x] **Fundal întunecat pe toată secțiunea**: `className="dark bg-background text-foreground"` pe `<Section>` (darkMode `class` → tokenii se redefinesc, toți copiii devin dark indiferent de tema utilizatorului); prop-ul `alt` eliminat (conflict cu fundalul)
- [x] **Centrul golit**: rămâne doar numele companiei (`text-4xl sm:text-5xl font-bold tracking-tight`, centrat) + sub el rolul și perioada pe o linie mică (`text-sm text-muted-foreground`). Cardul mare cu iconiță, intro și blocul de proiect a dispărut din centru
- [x] **Text mutat sub zona plutitoare**: fraza de intro (`intro` + `introStrong` îngroșat + `introTail`) + blocul de proiect (`projectHeading`, `projectBody`, `projectBodyStrong`) — bloc centrat `max-w-3xl` sub zona `min-h-[560px]`. Nimic pierdut
- [x] **Carduri mai mari + dense**: `px-4 py-2.5 text-sm rounded-lg` (erau deja), poziții procentuale variate cu banda centrală (top ~30–65%, left ~25–75%) ținută liberă; depth-uri 0.5–2 (erau 0.3–0.9) → mișcare max ~72px pe 1440px; `<Floating sensitivity={0.5}>` neschimbat; zona `md:min-h-[560px]`
- [x] **Contrast (regula F3)**: zero `text-primary` pe text citit — rol/perioadă, intro, proiect, heading-urile și pastilele techGroups (`text-primary` → `text-foreground`, tint-ul `bg-primary/8` rămâne ca accent non-text). Primary rămâne doar pe iconițe/puncte decorative
- [x] Păstrate: Dialog la click, grila mobilă (`md:hidden`), `techGroups` dedesubt, `<Section id="experience">`, `<SectionHeading>`, butoane `<button>` cu focus-visible
- [x] `npm run build` — trece: 1675 module, 302.97 kB js (97.56 kB gzip), 23.90 kB css (5.28 kB gzip)
- [ ] Verificare vizuală în browser (poziții carduri, suprapuneri, aspect dark) — rămâne la F2
- Notă: eyebrow-ul din `SectionHeading` (în `shared.tsx`, neatins) rămâne `text-primary` — e text mic; dacă auditul F3 se aplică strict pe toată pagina, e un candidat de schimbat acolo
- Commit: `f8ba728` (fără push)

### 2026-09-06

#### 16:40 — Centrul hărții Experience: poză + nume
- [x] `src/components/sections/Experience.tsx` — blocul central e acum, de sus în jos: **poză**, `personName`, `company`, `role · period`. Înainte era doar compania la 2.75rem
- [x] **Poza e placeholder**: `public/profile-placeholder.svg` (desen generic, 320×320, fără dependință de rețea). Randată 144px pe desktop, 112px pe mobil, `rounded-full` + `border-border`. `alt=""` cât timp e desen generic — la poza reală se pune alt descriptiv
- [x] `src/i18n/translations.ts` — cheie nouă `experience.personName` = `Ivan Marius`, în interfață + EN + RO. (Utilizatorul a scris „Ivan Marus"; am corectat typo-ul din nume, dar am păstrat ordinea nume-prenume cerută de el, care diferă de `hero.name` = „Marius Ivan")
- [x] **Blocul central s-a îngustat de la 680px la 420px** — compania nu mai e cel mai mare element, deci se poate rupe pe două rânduri; rămâne mai mult loc pentru cardurile plutitoare
- [x] Verificat în Chrome real la 768/1024/1280/1440/1920 + mobil 390: poza se încarcă, zero carduri peste blocul central, zero suprapuneri între carduri, zero erori în consolă, fără scroll orizontal
- [x] `npm run build` — trece: 303.36 kB js (97.69 kB gzip), 24.01 kB css (5.32 kB gzip)
- Commit: `6961042` (fără push)
- Notă: commit-ul `60f9c23` (5 sept, lățirea blocului central la 680px) **nu a fost notat aici** de sesiunea care l-a făcut — regula din AGENTS.md cere și notă în vault, nu doar commit

#### 17:20 — Harta Experience: proiecte cu poze în loc de module
- [x] Cerința lui Marius: în jurul pozei lui să plutească **poze de proiect** cu numele dedesubt, nu cardurile cu modulele Laravel
- [x] **6 elemente**: Portfolio XP, CS2 Leaderboard, Fortuna WC2026, Votează Liga 2, FEGBet, Intranet (ultimele trei nu existau nicăieri în CV — le-a dat el acum). Pozele sunt placeholder: `public/projects/*.svg`, câte o nuanță fiecare, ca să se citească ca șase lucruri diferite
- [x] **Modulele nu s-au pierdut**: coboară sub hartă ca grilă normală pe două coloane, cu textul detaliat vizibil fără click. Deci Dialog-ul dispare din secțiune — `src/components/ui/dialog.tsx` **rămâne în proiect dar nu-l mai importă nimeni**
- [x] Trei dimensiuni și trei proporții diferite (4/3, 3/4, pătrat) — uniformitatea cardurilor era motivul principal pentru care harta se citea ca listă, nu ca in referință
- [x] **Sub `lg` pozele se micșorează**: la 768 și 1024 cele mari intrau peste blocul central și una peste alta (măsurat, nu presupus)
- [x] Verificat în Chrome real la 768/1024/1280/1440/1920 + mobil 390: zero suprapuneri, zero imagini rupte, zero erori, parallax activ, iar cu `prefers-reduced-motion` toate transformările sunt zero
- [x] **Acoperirea cadrului: 6.5% → 18.9%** (referința lui Marius are 24.7%, măsurat pe pixeli). Asta era cea mai mare diferență față de poză
- [x] `npm run build` — trece, și **bundle-ul scade**: 97.57 → 89.80 kB gzip, fiindcă Radix Dialog nu mai intră în graf
- Commit: `5dcdd7f` (fără push)
- **Cine a scris codul**: taskurile au rulat pe modelul local (Qwen prin hermes), în patru bucăți mici — i18n, cele 6 SVG-uri, rescrierea hărții, apoi corecțiile de layout. Verificarea în browser și măsurătorile sunt făcute separat, nu de model
- Notă: la taskul cu SVG-urile modelul a scris fișierele în `~/public/projects/` în loc de `public/projects/` din proiect (a folosit cale relativă la home). Le-am mutat manual; a rămas un director gol `~/public` — se șterge cu `rmdir ~/public`

#### 18:05 — Hero și footer închise la culoare, albastrul redus
- [x] Cerința: „nu îmi place cum e cu albastru sus și jos în footer" + „vezi pe 21st.dev ce putem lua". Marius a lăsat alegerile pe mine
- [x] **Diagnostic**, măsurat în cod: `--primary` (indigo `#352CDD`) făcea patru munci deodată — marcă de brand, eyebrow de secțiune, cifră importantă și decor de listă. Cel mai rău arăta jos: **28 de pastile albastre** în Skills, una lângă alta, chiar înainte de footer
- [x] **Albastrul rămâne doar pe acțiune și identitate**: butonul principal, marca `MI`, punctele decorative și badge-urile de status din Projects. Eyebrow-urile (`shared.tsx`), pastilele din Skills și Projects, cifrele din Hero → neutre
- [x] **Hero și footer primesc clasa `dark`**, ca Experience. Motivul: banda neagră din mijlocul unei pagini albe arăta a greșeală; cu capetele închise devine intenție
- [x] **Luat de pe 21st.dev, rescris, nu copiat**:
  - `FloatingPaths` (după *Floating Paths*, autor Bundui) — 24 de curbe subțiri care se desenează o dată. Originalul folosește framer-motion, pe care proiectul l-a scos intenționat; aici animația e `stroke-dashoffset` din CSS, deci **zero dependințe noi**. Se oprește complet la `prefers-reduced-motion`
  - footer-ul (după *Large Name Footer*, autor Arihant jain) — numele la 13vw pe toată lățimea, `aria-hidden` fiindcă numele e deja `h1` în Hero
- [x] **Trei bug-uri prinse testând în browser, nu din cod**:
  1. Numele din navbar era negru pe negru. Clasa `.dark` redefinește variabilele, dar un element fără clasă de culoare moștenește culoarea deja calculată de pe `body` — deci navbar-ul are nevoie și de `text-foreground`
  2. Liniile nu se vedeau deloc: `<Floating>` avea `-z-10`, deci stătea **în spatele fundalului propriu al secțiunii** (secțiunea are acum `bg-background`). Trecut pe `z-0` + conținutul pe `relative z-10`
  3. Liniile treceau peste „Backend & Full-Stack Developer" ca o tăietură. Rezolvat cu `mask-image` care le stinge peste coloana din stânga, plus opacitate scăzută (0.04–0.12)
- [x] Verificat: fără scroll orizontal (desktop și mobil), zero erori în consolă, `prefers-reduced-motion` oprește animația (`animation: none`, `stroke-dashoffset: 0`), navbar-ul comută corect între transparent-dark și opac-light
- [x] `npm run build` — trece: 90.12 kB gzip JS (+0.3 kB față de înainte, tot costul componentei noi), 5.55 kB CSS
- Commit-uri: `1b103f8` (fundal închis + componentele de pe 21st.dev), `dd3ae66` (albastrul) — fără push
- **Cine a scris codul**: șase taskuri mici pe modelul local (Qwen prin hermes), cu serverul repornit înainte de fiecare. Testarea în browser, diagnosticul celor trei bug-uri și măsurătorile sunt separate, nu de model

#### 19:30 — CV-ul devine un singur ecran cu carduri plutitoare
- [x] Cerința: „cum arată în 21st.dev/@danielpetho/components/parallax-floating, dar cu pozele alea". Marius a ales: **fără navbar, fără hero, fără footer**; butoanele și cifrele din hero **dispar**; conținutul de sub hartă intră **în cardul companiei** (adică în dialogul „Intranet")
- [x] **Structura nouă**: un singur `<Section id='experience'>` pe toată înălțimea ecranului. În centru poza + numele + compania + rolul; în jur **9 elemente plutitoare**, fiecare buton care deschide propriul Dialog
  - 6 poze de proiect (Portfolio XP, CS2 Leaderboard, Fortuna WC2026, Votează Liga 2, FEGBet, Intranet)
  - 3 plăcuțe cu iconiță: Skills, Contact, FAQ
- [x] **Nimic nu s-a pierdut**: corpurile dialogurilor sunt în `src/components/map/panels.tsx`, portate din componentele de secțiune, nu rescrise. Dialogul „Intranet" ține overview-ul, cele 8 responsabilități și grupele de tehnologii
- [x] `main.tsx`: rămân doar `<Experience />`, `LanguageToggle` (colț dreapta-sus) și `CursorTrail`
- [x] **Bug prins în browser**: dialogurile se deschideau ALBE pe pagina neagră. Radix randează dialogul într-un portal atașat la `<body>`, deci în afara containerului cu clasa `dark`. Rezolvat mutând `dark` pe `<html>` în `index.html` — tema e globală acum, site-ul e dark-only
- [x] **Prima rulare a picat cu `insufficient memory ... during prefill`** (modelul local, task prea mare). Repornit serverul complet și reîmpărțit taskul în bucăți mai mici — a doua rulare a trecut
- [x] Verificat la 768/1024/1280/1440/1920 + mobil 390: 9 carduri, zero suprapuneri (peste centru sau între ele), zero elemente ieșite din cadru, zero imagini rupte, **pagina exact cât ecranul** (900 = 900), fără scroll orizontal, Tab ajunge pe carduri și Enter deschide dialogul, zero erori în consolă
- [x] **Acoperirea cadrului: 28.7%** (referința are 24.7% — acum e chiar mai densă decât modelul)
- [x] `npm run build` — trece: 94.43 kB gzip (crește față de 90.12 fiindcă Radix Dialog reintră în graf)
- Commit: `597ac88` (fără push)
- **Rămân nefolosite** (nu le-am șters, tree-shaking le scoate oricum din bundle): `Navbar.tsx`, `Hero.tsx`, `Footer.tsx`, `Projects.tsx`, `Skills.tsx`, `Contact.tsx`, `Faq.tsx` și hook-urile `useTyping`, `useCountUp`, `useParallax`
- **De discutat cu Marius:** „Download CV" (`window.print()`) era în hero și a dispărut o dată cu el — nu mai există niciun mod de a tipări CV-ul, iar conținutul din dialoguri nu se tipărește

### 2026-09-08

#### 12:00 — Ancora de redirect pe cardul FEGBet
- [x] Cerința: adaugă pe cardul FEGBet o ancoră cu redirect către `https://fegbet.fortungame.ro`
- [x] `src/i18n/translations.ts` — interfața `MapItem` primește câmpul opțional `url`; cele două intrări FEGBet (EN + RO) au `url: 'https://fegbet.fortungame.ro'`
- [x] `src/components/sections/Experience.tsx` — `MapCardData` și `MapCard` primesc câmpul `url`; când e setat, vizualul cardului (SVG-ul de proiect) e împachetat într-un `<a href target=_blank rel=noopener>`, deci cardul devine o ancoră clickabilă care deschide site-ul FEGBet
- [x] Doar cardul FEGBet devine clickabil; celelalte carduri (Portfolio XP, CS2 Leaderboard, Fortuna WC2026, Votează Liga 2, Intranet) rămân butoane care deschid propriul Dialog
- [x] `npm run build` — trece
- Notă: nu a fost verificat vizual în browser — click-ul pe cardul FEGBet ar trebui să deschidă `https://fegbet.fortungame.ro` într-o tabă nouă

#### 12:01 — SVG nou pentru cardul FEGBET
- [x] Cerința: creează un SVG care să arate ca referința (banner FEGBET) și înlocuiește `/projects/fegbet.svg`
- [x] Analizat referința (108×66, proporție 1.636:1): fundal navy aproape negru `#090A15`, „FEG" alb `#FFFFFF`, „BET" auriu `#FABC0A`, font sans-serif semibold cu spacing larg
- [x] `public/projects/fegbet.svg` — rescris: canvas 1080×660 (10× referința), gradient subtil `#0b0c16 → #070813`, „FEG" alb + „BET" auriu, `font-size:150 / weight:600 / letter-spacing:26`, centrat
- [x] Preview randat cu PIL + verificat vizual: aspectul corespunde referinței (fundal navy, FEG alb, BET auriu, centrat)
- [x] `npm run build` — trece
- Notă: cardul e afișat în casă pătrată cu `object-cover` — SVG-ul larg e crozit pe laturi, textul rămâne centrat și vizibil

#### 14:35 — Cardul FEGBet: dialog cu buton „Live demo", nu redirect
- [x] **Ce era greșit** (verificat în browser, nu presupus): vizualul cardului era împachetat într-un `<a target=_blank>` pus **înăuntrul butonului** care e `DialogTrigger`. Un click făcea două lucruri deodată — măsurat: filele treceau de la 1 la 2 **și** se deschidea dialogul în spate. În plus, `<a>` în interiorul unui `<button>` e HTML invalid, iar FEGBet era singurul card care naviga în loc să deschidă
- [x] `Experience.tsx` — ancora scoasă din buton; când un card are `url`, dialogul lui afișează la final un link „Live demo" (`ExternalLink` + `t.projects.liveDemo`, `rel=noreferrer`), în același stil cu butoanele pe care `ProjectPanel` le randează deja pentru proiectele cu link
- [x] **Domeniul era greșit**: `fegbet.fortungame.ro` nu rezolvă în DNS; `fegbet.fortunagame.ro` rezolvă la `92.86.6.118` — lipsea un „a" din „fortuna". Corectat în ambele intrări (EN + RO)
- [x] Verificat în Chrome: zero ancore în butoane, click = filele rămân 1 și se deschide doar dialogul, butonul are `href=https://fegbet.fortunagame.ro`, `rel=noreferrer`, `target=_blank`; cardul Portfolio XP e neatins (își păstrează cele două linkuri din `ProjectPanel`); zero erori sau avertismente în consolă
- [x] `npm run build` — trece: 94.48 kB gzip
- Commit: `9e6fef7` (fără push)
- Notă: Qwen a trebuit să paseze `t` prin `MapCardData` ca să ajungă la `t.projects.liveDemo` în dialog. Merge, dar mai curat ar fi ca `MapCard` să cheme singur `useLanguage()` — de curățat la o trecere viitoare
- **Rămâne deschis**: corpul dialogului zice „Coming soon", fiindcă FEGBet n-are intrare în `t.projects.items`. Trebuie textul de la Marius (rol, status, descriere, stack). Și bannerul e tot tăiat: SVG-ul e 1080×660, cardul e `aspect-[3/4]` cu `object-cover`, deci se citește „EGBE"

#### 15:05 — Bannerul FEGBET nu mai e tăiat
- [x] **Simptom**: pe card se citea „EGBE" — fără F și fără T. Marius a crezut că textul nu e centrat în SVG; nu era asta: textul **era** centrat, dar SVG-ul era lat (1080×660, raport 1.64) iar caseta cardului înaltă (`aspect-[3/4]`, 144×192 măsurat). `object-cover` lasă sursa neatinsă **doar** când raportul ei e identic cu al casetei; altfel taie — aici lateralele
- [x] Ambele aduse la **16/10**: `public/projects/fegbet.svg` devine 1080×675 cu textul recentrat (`x=540 y=337.5`), iar cardul devine `w-32 lg:w-44 aspect-[16/10]`
- [x] Verificat în Chrome: raport casetă **1.6** = raport sursă **1.6**, deci zero tăiere; pe card se citește FEGBET întreg
- [x] Cardul trece din portret în peisaj, deci am re-verificat harta la 768/1024/1280/1440/1920: zero suprapuneri peste centru sau între carduri, nimic ieșit din cadru, pagina tot exact cât ecranul, zero erori
- [x] `npm run build` — trece
- Commit: `f1d65cc` (fără push)
- Notă: SVG-ul cere `font-family: Inter`, dar fonturile externe nu se aplică într-un SVG randat ca `<img>` — se folosește fallback-ul de sistem. Diferența e mică, dar dacă vrei exact Inter, textul trebuie convertit în contururi

#### 15:20 — Bannerul FEGBET devine pătrat
- [x] Marius a cerut SVG-ul pătrat imediat după varianta 16/10. Regula care a rezolvat tăierea rămâne aceeași — `object-cover` lasă sursa neatinsă doar când raportul ei e identic cu al casetei — deci a mers și caseta: canvas 1080×1080 cu textul recentrat (`x=540 y=540`), card `w-32 lg:w-44 aspect-square`
- [x] Verificat în Chrome: raport casetă **1** = raport sursă **1**, FEGBET se citește întreg și e centrat pe ambele axe
- [x] Cardul e mai înalt decât varianta 16/10, deci re-verificat la 768/1024/1280/1440/1920: zero suprapuneri, nimic ieșit din cadru, pagina tot exact cât ecranul, zero erori
- [x] `npm run build` — trece
- Commit: `df3c4d1` (fără push)

#### 15:45 — Cardul „Votează Liga 2" primește link către site
- [x] `url: 'https://voteazaliga2.casapariurilor.ro'` în ambele intrări din `mapItems` (EN + RO). Domeniul rezolvă (172.64.144.205, Cloudflare) — verificat înainte
- [x] Mecanismul exista deja de la FEGBet (câmpul `url` + butonul randat de `MapCard`), deci a fost doar de legat
- [x] **Eticheta butonului schimbată**: cheie nouă `projects.visitSite` — „Visit site" / „Vizitează site-ul". Site-urile astea sunt producție, nu demo-uri. Butoanele randate de `ProjectPanel` pentru cele trei proiecte din CV rămân „Live demo", că acolo chiar sunt demo-uri
- [x] Verificat în Chrome: click pe card = **nu se deschide filă nouă**, se deschide dialogul cu butonul „Visit site" → linkul corect; la fel FEGBet; Portfolio XP neatins (își păstrează Live demo + View repo); pe RO butonul scrie „Vizitează site-ul"; zero erori
- [x] `npm run build` — trece
- Commit: `8a47908` (fără push)
- **Rămâne**: Marius a trimis două logo-uri (scutul Casa Pariurilor LIGA 2 și bannerul roșu „casa pariurilor") ca imagini în chat, nu ca fișiere — nu pot fi salvate din conversație. Trebuie fișierele pe disc, de preferat vectorul oficial; o trasare de mână după PNG ar arăta prost, mai ales emblema FRF din scut
- **Rămâne**: corpul dialogului zice tot „Coming soon" și pentru Liga 2, și pentru FEGBet — lipsesc textele (rol, status, descriere, stack)

#### 16:05 — Logo-urile oficiale pe cardul „Votează Liga 2"
- [x] Marius a trimis cele două logo-uri ca imagini în chat (nu se pot scrie pe disc) și a dat acordul să le iau de pe site. Luate de pe `voteazaliga2.casapariurilor.ro`: scutul LIGA 2 (`/own/casa/logos/liga2.png`, 310×350) și bannerul „casa pariurilor" (`/own/casa/logos/Logo_Sport_Bullet.png`, 1500×601), puse în `public/projects/`
- [x] **Site-ul nu servește SVG** — am încercat și `.svg` pentru ambele, 404. Deci sunt PNG-urile publicate de ei. Un vector fidel trebuie luat de la cine are originalul; o trasare de mână după PNG ar arăta prost, mai ales emblema FRF din scut
- [x] Scutul intră pe card, iar caseta devine `aspect-[31/35]` — exact raportul imaginii, deci `object-cover` nu taie nimic (aceeași regulă care a reparat FEGBET)
- [x] Câmp nou `headerImg` în `MapItem` + în `MapCardData`: bannerul se randează în capul dialogului, pe toată lățimea, la proporția lui (fără `object-cover`, fără înălțime fixă)
- [x] **Corecție prinsă la măsurare**: scutul e mai înalt decât pătratul pe care l-a înlocuit și ieșea ~10px sub marginea hărții la 1024px și mai sus. Cardul a urcat de la `top-[76%]` la `top-[73%]`
- [x] Verificat la 768/1024/1280/1440/1920: raport casetă 0.886 = raport sursă 0.886, imagini încărcate, zero suprapuneri, nimic ieșit din cadru, pagina tot exact cât ecranul, zero erori sau request-uri eșuate
- [x] Șters placeholder-ul `public/projects/voteaza-liga2.svg`, nu-l mai folosește nimeni
- [x] `npm run build` — trece
- Commit: `674038e` (fără push)
- Notă: bannerul din dialog e destul de mare (622×249 într-un dialog de 672). Arată bine cât timp textul lipsește; când intră descrierea, dacă dezechilibrează, se rezolvă cu `max-h-28 object-contain`

#### 16:25 — Siglă pentru cardul Intranet
- [x] `public/projects/intranet.svg` — nu mai e placeholder-ul generic (munte + soare): „FEG" alb pe primul rând, „Intranet" auriu (`#fabc0a`) dedesubt, pe același gradient navy ca bannerul FEGBET, ca cele două proiecte FEG să arate înrudite
- [x] Canvas 1080×810, adică exact 4/3 — raportul casetei cardului (`w-32 lg:w-48 aspect-[4/3]`), deci `object-cover` nu taie nimic. Nicio schimbare de layout, cardul rămâne unde era
- [x] Verificat la 768/1280/1440: raport casetă 1.333 = raport sursă 1.333, imaginea se încarcă, zero suprapuneri, nimic ieșit din cadru, pagina tot exact cât ecranul, zero erori
- [x] `npm run build` — trece
- Commit: `d84b20b` (fără push)
- Notă: fonturile externe nu se aplică într-un SVG randat ca `<img>`, deci „Inter" cade pe fallback-ul de sistem — la fel ca la FEGBET. Dacă vrei exact Inter, textul trebuie convertit în contururi

#### 16:45 — Scoase cardurile CS2 Leaderboard și Fortuna WC2026
- [x] Cerința lui Marius. Rămân **7 elemente**: Portfolio XP, Skills, FEGBet, Contact, Votează Liga 2, Intranet, FAQ — fiecare cu aceleași `pos`, `box` și `depth`, nimic rearanjat
- [x] Șterse și din `mapItems` (EN + RO), plus placeholder-ele `public/projects/cs2-leaderboard.svg` și `fortuna-wc2026.svg`, care nu mai erau folosite
- [x] **`projects.items` rămâne intact** — descrierile, stack-ul și linkurile celor două proiecte sunt tot acolo, deci un card se poate întoarce oricând
- [x] Verificat la 768/1024/1280/1440/1920: zero suprapuneri, nimic ieșit din cadru, pagina tot exact cât ecranul, zero erori
- [x] `npm run build` — trece
- Commit: `c9e6459` (fără push)
- **De discutat**: cele două proiecte nu mai apar **nicăieri** pe site — secțiunea Projects a dispărut la rescrierea în ecran unic, deci harta era singurul loc unde se vedeau. Datele stau degeaba în `translations.ts`
- **De discutat**: acoperirea cadrului scade de la 28.7% la **21.8%**, iar colțul dreapta-sus rămâne gol — pozițiile au fost gândite pentru nouă elemente. Dacă vrei, redistribui cele 7 ca să reechilibrez harta

#### 17:30 — Ecran de intrare + călătoria printre planete
- [x] Cerința: la intrarea pe pagină, un ecran cu fade care întreabă dacă vrei „journey" sau skip. Skip → harta de acum. Journey → călătorie printre planete, unde planetele sunt locurile de muncă, cu un buton spre următorul
- [x] **Deciziile lui Marius**: ordine cronologică (RCS & RDS 2012 → EA → Amber → Euronet → FEG), la final aterizezi pe hartă, **o planetă per companie** (FEG arată toate cele 3 roluri, EA ambele)
- [x] **Datele** vin din PDF-ul de profil LinkedIn (`~/Downloads/Profile (1).pdf`), extras cu `pypdf` într-un venv temporar — nu era instalat niciun cititor de PDF pe mașină. Textele sunt condensate și traduse, și stau în `translations.ts` ca tot restul, în EN + RO
- [x] **Fișiere noi**: `src/components/journey/starfield.tsx` (220 de cercuri SVG pe poziții deterministe — fără `Math.random` în render, altfel stelele sar la fiecare re-randare; un sfert clipesc pe keyframe CSS), `journey.tsx` (planeta + textul + controalele + indicatorii), `intro.tsx` (întrebarea)
- [x] `main.tsx` — App e acum o mașină cu trei ecrane: `intro` → `journey` → `cv`, cu fade de 320ms între ele
- [x] **Reduced motion**: clipitul stelelor, sosirea fiecărei opriri și fade-ul dintre ecrane sunt toate oprite sub `prefers-reduced-motion`
- [x] Verificat în Chrome, parcurgând tot fluxul: intro → 5 opriri în ordinea corectă, cu companiile, perioadele și rolurile exacte → aterizare pe hartă cu cele 7 carduri. 220 de stele, 55 care clipesc, zero erori în consolă
- [x] `npm run build` — trece
- Commit: `3cca3e5` (fără push)
- Notă: comutatorul de limbă apare pe intro (stânga sus) și pe hartă (dreapta sus), dar nu în timpul călătoriei — acolo colțul e ocupat de „Skip to the CV"
- Notă: alegerea nu se ține minte între vizite; oricine reintră vede iar întrebarea. Dacă deranjează, se salvează în `localStorage`

#### 18:00 — Deplasare prin spațiu + navigare cu scroll
- [x] Trecerea dintre opriri era un fade simplu — arăta a slideshow, nu a călătorie. Acum fiecare mutare e un „warp": câmpul de stele se repede pe lângă tine (scalează în afară înainte, se retrage înapoi), iar planeta următoare vine din depărtare, mică și neclară, și se așază
- [x] **Scroll-ul navighează**: roata în jos = oprirea următoare, în sus = înapoi. La fel săgețile, la fel swipe-ul pe touch; butoanele și indicatorii rotunzi merg mai departe
- [x] **Lock de 780ms** — o mișcare bruscă de trackpad avansează o oprire, nu patru. Verificat: două scroll-uri rapide una după alta mută tot o singură oprire
- [x] Rând nou sub indicatori cu indiciul „Scroll to travel" / „Derulează ca să călătorești" (cheie nouă `journey.scrollHint`, EN + RO)
- [x] Curățenie: `MapCard` nu mai primește tot obiectul de traduceri prin props — cheamă singur `useLanguage()`. Importul `Translation` a rămas nefolosit și a fost scos
- [x] Verificat în Chrome: scroll jos și sus mută câte o oprire, săgeata dreapta la fel, click pe indicator sare direct, iar sub `prefers-reduced-motion` toate cele trei animații (clipit, warp, sosire) dau `animation: none`. Zero erori
- [x] `npm run build` — trece
- Commit: `671b11c` (fără push)
- Notă de proces: Marius a cerut să vadă live ce face modelul. **Hermes în mod one-shot (`-z`) nu streamează** — am verificat în două feluri: rulat sub pseudo-terminal cu `script` (tot doar răspunsul final) și căutat în `hermes logs agent --component tools` (gol). Deci fereastra de Terminal arată acum altceva, real: fișierele atinse și `git diff --stat` care cresc în timp real, plus activitatea serverului local

#### 18:40 — Călătoria devine spațiu 3D cu toate planetele vizibile
- [x] Cerința: totul într-un spațiu 3D, cu celelalte joburi vizibile în fundal; click pe o planetă sau pe buton te duce acolo
- [x] **Fără bibliotecă 3D** — perspectivă și transformări CSS. Bundle-ul crește cu 0.4 kB; three.js ar fi costat ~130 kB gzip peste cei 97 de acum
- [x] Fișier nou `src/components/journey/space.tsx`: cele 5 planete într-o singură scenă cu `perspective: 1000px`, fiecare buton cu `aria-label`, cea aleasă opacă, restul la 0.45
- [x] **Prima variantă a fost greșită și s-a văzut doar măsurând**: planetele pe un inel de rază 1500, camera rotindu-se în jur. În browser, doar cea focalizată era pe ecran — celelalte cădeau la x = -352, 1442 și 2870, iar cele de pe partea opusă ajungeau **în fața** camerei, unde perspectiva le umflă. Rotația a dispărut: acum e o constelație compactă (lateral ±420, adâncime 500) și camera doar translatează. Re-măsurat: toate cinci pe ecran, oricare ar fi focalizată
- [x] **A doua problemă prinsă tot la măsurare**: planeta aleasă ieșea mai mică decât vecinele (88px vs 118px), fiindcă diametrele de bază mergeau de la 150 la 250. Acum stă mai aproape (FOCUS_Z 420 în loc de 700) și diametrele sunt între 175 și 240 — e mereu cea mai mare
- [x] **Lizibilitate**: panoul de text s-a mutat jos, pe un degradat negru, iar eticheta de sub planeta focalizată a dispărut (numele ei e deja scris mare în panou, se suprapuneau)
- [x] Verificat în Chrome: 5 planete în scenă, toate vizibile, click pe una din fundal (Euronet) mută călătoria acolo, scroll-ul merge mai departe, zero erori
- [x] `npm run build` — trece: 98.2 kB gzip
- Commit: `0238e42` (fără push)

#### 19:15 — Camera urmărește mouse-ul, traseu punctat între planete
- [x] **Privire cu mouse-ul**: un strat „rig" între perspectivă și lume se înclină până la 12° pe orizontală și 8° pe verticală. Scrie direct pe element într-un `requestAnimationFrame`, fără state — altfel s-ar re-randa tot arborele la fiecare pixel de mișcare. Oprit complet sub `prefers-reduced-motion` (verificat: transformarea rămâne nulă)
- [x] **Traseul**: 4 bare punctate, fiecare așezată pe o planetă și rotită spre următoarea — `yaw = atan2(-dz, dx)`, `pitch = asin(dy/len)`
- [x] **Trei bug-uri, toate prinse măsurând sau uitându-mă la captură, niciunul din citit codul:**
  1. Bara se rotea în jurul centrului ei, deci ambele capete plecau de lângă planete. Rezolvat cu `transform-origin` la capătul din stânga și fără `translateX(len/2)`
  2. Planetele aveau clasele Tailwind `-translate-x-1/2 -translate-y-1/2`, dar **transformarea inline le suprascrie complet** — deci fiecare planetă stătea după colțul ei stânga-sus, iar cea focalizată nu era niciodată centrată. Centrarea a intrat în transformarea inline, iar eticheta e acum absolută, ca să rămână cutia exact cât sfera
  3. Măsurat în toate cele 5 poziții ale camerei: EA se suprapunea peste Euronet și Amber peste FEG **de fiecare dată** (40px separare laterală), iar intervalul de adâncime de 450 depășea FOCUS_Z (420), împingând planeta cea mai apropiată aproape în fața camerei. Constelație refăcută: minim 288px separare laterală, adâncime pe 250. Re-măsurat: zero suprapuneri în oricare poziție
- [x] Verificat: 5 planete în cadru, click pe una din fundal mută camera, scroll-ul merge, zero erori
- [x] `npm run build` — trece: 98.5 kB gzip
- Commit: `41fabaa` (fără push)
- Rămâne: în 3 din 5 poziții ale camerei, o planetă e tăiată parțial de marginea ecranului. Rămâne vizibilă și clicabilă, dar dacă deranjează, se strânge constelația lateral

#### 19:45 — Verificare vizuală pe toate cele 5 opriri, un bug prins
- [x] Marius a cerut verificare vizuală pe fiecare oprire. Am făcut captură la fiecare și am măsurat unde aterizează planeta focalizată
- [x] **Bug găsit**: butonul-planetă avea în className **și `absolute`, și `relative`** (`relative` a fost adăugat când eticheta a devenit absolută). `relative` câștigă, deci planetele reveneau în fluxul normal de layout, una sub alta, și abia apoi primeau transformarea 3D — fiecare pornind din altă origine
- [x] S-a văzut ca drift: parcurgând opririle, planeta focalizată ateriza la x = **720, 836, 966, 1076, 720** în loc de 720 de fiecare dată, iar la ultima oprire cădea peste panoul de text
- [x] Rezolvat scoțând `relative`: un element `position: absolute` e deja bloc de referință pentru copiii lui absoluți, deci eticheta n-avea nevoie de el
- [x] Re-măsurat pe toate cele 5 opriri: fiecare planetă focalizată aterizează **exact la (720, 306)**, niciuna nu intră peste panou, zero suprapuneri între planete
- [x] `npm run build` — trece
- Commit: `a44cf2d` (fără push)
- Rămâne: la opririle 2 și 4, o planetă din fundal e tăiată parțial de marginea ecranului; rămâne vizibilă și clicabilă. Și constelația se adună într-o parte când e focalizată o planetă de la capăt — normal, dat fiind că întreaga lume se translatează

#### 20:05 — Efect de warp la trecerea între planete
- [x] Până acum, deplasarea doar scala puțin câmpul de stele — se citea ca o împingere, nu ca un salt
- [x] Fișier nou `src/components/journey/warp.tsx`: 90 de dungi radiale (SVG `<line>`) care țâșnesc din centru cât timp camera se mută. Înainte scalează în afară, înapoi se reped spre centru — deci direcția se vede fără să citești etichetele
- [x] Pozițiile sunt deterministe (același truc cu `Math.sin` ca la `starfield.tsx`), deci nimic nu tresare între randări
- [x] Stratul e montat **doar cât ține warp-ul**, așa că animația repornește de la capăt la fiecare salt. Verificat: 0 dungi înainte, 90 în timpul saltului, 0 după
- [x] Reduced-motion: `animation: none` și opacitate 0 — verificat în browser cu `reducedMotion: reduce`
- [x] `npm run build` — trece
- Commit: `a019a9a` (fără push)

[[README]] · [[05-Plan-Execuție]] · [[11-Taskuri]] · [[07-Handover]]
