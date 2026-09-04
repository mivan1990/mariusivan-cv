---
tip: handover
proiect: cv
tags: [handover, cv]
---
# Handover

Document de preluare pentru cine ia proiectul de unde l-am lăsat.
Actualizat la fiecare sesiune — la închidere, scrie ce e gata, ce e în curs, ce e blocat.

---

## Stare curentă

**Ultima actualizare:** 2026-09-04
**Stare:** Build-ul de producție TRECE. Toate fazele de cod sunt închise (A, B, C, F1, F3, G1, G2, H1, H2, J2, J3). Rămâne deploy-ul (I1–I4) și finalizarea git (J1, J4), plus testarea vizuală (F2, sărită prin decizie).

**Calea proiectului:** `~/Projects/PERSONAL/mariusivan-cv/` — vault-ul Obsidian e **în interiorul repo-ului**, la `vault/`. Vechea cale `~/Vaults/cv/` **nu mai există** (mutat la consolidarea din 2026-09-04, vezi `06-Log.md`).

> ⚠️ **Citește asta înainte de orice:** aplicația **NU a fost deschisă niciodată într-un browser.** Build-ul care trece (tsc + vite) nu spune nimic despre cum arată cele cinci efecte de animație (reveal, numere animate, typing, parallax, cursor trail) — niciunul nu a fost văzut vizual. Dacă preiei, primul lucru pe care îl faci e să pornești `npm run dev` și să te uiți cu adevărat.

## Ce e gata

- [x] **Faza A — Setup & Fundație** (A1–A5): repo, Vite+React+TS, Tailwind, shadcn, structură fișiere
- [x] **Faza B — Componente** (B1–B4): componente shadcn, Navbar/Footer, secțiuni (Hero, Experience, Projects, Skills, FAQ, Contact), carduri proiecte
  - ⚠️ **cu excepția formularului de contact** — vezi „Decizii deschise” mai jos. B3 e bifat, dar `Contact.tsx` conține doar linkuri (email, GitHub, live site), nu un formular.
- [x] **Faza C — Animații & Interacțiuni**: reveal la scroll, numere animate, typing effect, parallax, cursor trail — toate cu `prefers-reduced-motion`. (C3 / 3D: decis să NU se facă — vezi mai jos.)
- [x] **F1 — Optimizare performanță**: bundle ~88.65 kB gzip, analizat (lazy-load nu merită, imagini nefolosite lăsate în loc)
- [x] **F3 — Accesibilitate**: aria-labels, focus vizibil, audit contrast (contrastul `primary` în dark e sub 4.5:1 — raportat, paleta neschimbată)
- [~] **G1 — Dev server**: `npm run dev` pornește în 133 ms (confirmat). Hot-reload-ul
  NU a fost verificat — cere o editare făcută cu pagina deschisă în browser.
- [x] **G2 — Preview build**: `npm run preview` servește pe :4173, `HTTP 200` pe `/` și pe
  assetul hashuit. Verificat prin request-uri, nu vizual.
- [x] **H1 — Build producție**: `npm run build` trece, `dist/` corect
- [x] **H2 — Config VPS**: static pur confirmat, config nginx scris în `vault/13-Nginx.md`
- [x] **J2 — README**: rescris în engleză, reflectă structura reală

## Ce NU e gata (și de ce)

- [ ] **F2 — Testare în browser**: **sărită prin decizie explicită** (2026-09-04). Doar linkurile au fost verificate static; testarea pe Chrome/Firefox/Safari + mobil + toggle vizual EN/RO nu s-a făcut. Aici se suprapune și avertismentul de mai sus: n-a fost văzut nimic vizual.
- [ ] **C3 — Animații 3D (WebGL)**: **decis să NU se facă** (2026-09-04). `three.js` ar adăuga ~150 kB gzip peste bundle-ul de 88.65 kB — l-ar tripla, pentru forme care se rotesc pe un CV. Nu e restanță, e alegere.
- [ ] **I1–I4 — Deploy pe prod**: **nu se pot face din cod** — necesită acces Cloudflare (DNS record `xp`) și SSH pe VPS (vhost, certbot, nginx). Depinde de tine, nu de repo.
- [ ] **J1 — Git**: commit final + tag `v1.0` + push (încă nefăcut; local e înaintea `origin/main`)
- [ ] **J4 — Beta → Prod**: marcarea ca „ready to deploy”

## Probleme cunoscute

Două dintre cele trei probleme găsite în auditul static din `06-Log.md` (16:40) au fost **reparate pe 2026-09-04 (22:30)**; una rămâne deschisă:

1. **Linkul către CS2Leaderboard dă 404** — `github.com/mivan1990/CS2Leaderboard` (în `translations.ts`, ambele limbi). Repo privat sau nume greșit. **Rămâne deschis** — cere răspunsul lui Marius (se face repo-ul public, sau se schimbă numele linkului?).
2. ~~**`gap--1.5` în `Projects.tsx:89`**~~ — **reparat** (2026-09-04): `gap-1.5`, ca la butonul de deasupra; butonul „View repo” are din nou spațiu între iconiță și text.
3. ~~**`window.open` fără `noopener` în `Projects.tsx`**~~ — **reparat** (2026-09-04): ambele butoane folosesc acum `window.open(url, '_blank', 'noopener,noreferrer')` (reverse tabnabbing închis). Linkurile `<a>` din Contact/Footer aveau deja `rel="noreferrer"`.

## Decizii deschise

- **Formularul de contact**: B3 zice că există, dar în realitate `Contact.tsx` are doar linkuri (email, GitHub, live site). **De decis**: se face un formular adevărat sau rămân linkurile? Dacă da, **prin ce serviciu** (Formspree, Netlify Forms, backend propriu)?
- **Contorul de an care pornește de la 1998**: în `useCountUp`, valoarea `'2023'` e animată pornind de la `target − 25` (= 1998), nu de la 0 — ca să nu pară prostesc. E o alegere, nu un bug; dacă nu-ți place, se schimbă.

## Unde e tot

| Fișier | Conținut |
|---|---|
| `README.md` | Hub-ul proiectului, rezumat (engleză) |
| `vault/01-Conținut-CV.md` | Conținut real FEG Group |
| `vault/02-Proiecte.md` | Cele 3 proiecte |
| `vault/03-Stack-Și-Componente.md` | Stack + componente |
| `vault/04-Deploy.md` | Plan de deploy |
| `vault/05-Plan-Execuție.md` | Checklist complet |
| `vault/06-Log.md` | Jurnal de progres |
| `vault/07-Handover.md` | Acest fișier |
| `vault/08-Componente.md` | Lista completă de componente |
| `vault/09-Design.md` | Cum arată site-ul |
| `vault/10-Research.md` | Ce putem lua de la alți site-uri |
| `vault/11-Taskuri.md` | Taskuri de la A la Z |
| `vault/12-Prompt.md` | Prompt-ul de lucru |
| `vault/13-Nginx.md` | **Configurația nginx** (cache, headere, vhost) |
| `vault/CV-BRIEF.md` | Brief-ul inițial |

## Structura proiectului

```
~/Projects/PERSONAL/mariusivan-cv/
├── package.json     ✓ (React 18.3, Vite 5.4, TS 5.6, Tailwind 3.4)
├── vite.config.ts   ✓ (alias `@` → src)
├── tailwind.config.js ✓
├── components.json  ✓ (shadcn)
├── postcss.config.js ✓
├── index.html       ✓
├── AGENTS.md        ✓ (reguli pentru agent)
├── src/
│   ├── main.tsx     ✓ (entry point)
│   ├── index.css    ✓ (tema + animații + focus global)
│   ├── i18n/
│   │   └── translations.ts ✓ (EN/RO)
│   ├── components/
│   │   ├── Navbar.tsx ✓
│   │   ├── LanguageToggle.tsx ✓
│   │   ├── CursorTrail.tsx ✓ (urma după cursor)
│   │   ├── sections/
│   │   │   ├── Hero.tsx ✓ (stats animate, typing, parallax)
│   │   │   ├── Experience.tsx ✓
│   │   │   ├── Projects.tsx ✓
│   │   │   ├── Skills.tsx ✓
│   │   │   ├── Faq.tsx ✓ (accordion)
│   │   │   ├── Contact.tsx ✓ (doar linkuri, NU formular)
│   │   │   ├── Footer.tsx ✓
│   │   │   └── shared.tsx ✓
│   │   └── ui/
│   │       ├── button.tsx ✓
│   │       ├── card.tsx ✓
│   │       ├── tabs.tsx ✓
│   │       ├── badge.tsx ✓
│   │       ├── tooltip.tsx ✓
│   │       └── accordion.tsx ✓
│   ├── hooks/
│   │   ├── useLanguage.ts ✓
│   │   ├── useReveal.ts ✓
│   │   ├── useCountUp.ts ✓ (numere animate)
│   │   ├── useTyping.ts ✓ (efect de tastare)
│   │   ├── useParallax.ts ✓ (parallax fundal)
│   │   └── useReducedMotion.ts ✓ (compartit)
│   └── lib/
│       └── utils.ts ✓
├── public/
│   ├── favicon.svg ✓ (singurul asset folosit)
│   ├── icons.svg   (nefolosit în cod)
│   (hero.png e în `src/assets/`, nu aici — și nu e folosit nicăieri)
├── README.md            ✓
└── vault/               ✓ (vault Obsidian — toată documentația)
```

## Cum preia

1. Citește `README.md` pentru rezumat
2. Citește `06-Log.md` pentru ce s-a făcut deja (în ordine cronologică)
3. **Pornește `npm run dev` și uită-te cu adevărat la cele cinci efecte** — n-a fost făcut niciodată
4. Pornește de la prima treabă neterminată: F2 (testare vizuală) → I1–I4 (deploy) → J1/J4 (git)

## Pas cu pas — ce ai de făcut

### Pas 1: Testare vizuală (F2)
```bash
cd ~/Projects/PERSONAL/mariusivan-cv
npm install
npm run dev
# Deschide http://localhost:5173
# Verifică CU ADEVĂRAT (niciunul n-a fost văzut încă):
# - reveal la scroll, numere animate, typing, parallax, cursor trail
# - Hero, Experience, Projects, Skills, FAQ, Contact
# - Toggle EN/RO comută corect vizual
# - Responsive pe mobile
```

### Pas 2: Build
```bash
npm run build
# Trece (confirmat): ~88.65 kB gzip js
# Testează cu npm run preview
```

### Pas 3: Deploy (I1–I4)
Vezi `vault/13-Nginx.md` pentru config și `vault/04-Deploy.md` pentru plan.

1. Cloudflare: record `A` pentru `xp`, Proxied ON
2. VPS: vhost nou pentru `xp.mariusivan.ro` + `certbot --nginx -d xp.mariusivan.ro`
3. Build CV-ul local, copiază `dist/` în `/var/www/cv/dist`
4. Schimbă `root` în vhost-ul `mariusivan.ro`, `nginx -t && systemctl reload nginx`
5. Verifică: `https://mariusivan.ro` = CV nou, `https://xp.mariusivan.ro` = XP

> Toți pașii cer acces Cloudflare + SSH pe VPS — nu se pot face din cod.

## Regula de aur

Comenzi SSH pe o singură linie. Se rup la copiere dacă au newline-uri.

[[README]] · [[05-Plan-Execuție]] · [[06-Log]] · [[11-Taskuri]] · [[13-Nginx]]