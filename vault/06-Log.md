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


[[README]] · [[05-Plan-Execuție]] · [[11-Taskuri]] · [[07-Handover]]
