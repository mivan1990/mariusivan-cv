---
tip: handover
proiect: cv
tags: [handover, cv]
---
# Handover

Document de preluare pentru cineia ia proiectul de unde l-am lăsat.
Actualizat la fiecare sesiune — la închidere, scrie ce e gata, ce e în curs, ce e blocat.

---

## Stare curentă

**Ultima actualizare:** 2026-09-03
**Stare:** Faze 0–3 implementate, gata de testare locală

## Ce e gata

- [x] Structura proiectului în Obsidian (`~/Vaults/cv/`)
- [x] Conținut CV real (FEG Group, 82 module, responsabilități)
- [x] Lista de proiecte de prezentare (CS2 Leaderboard, Portfolio XP, Fortuna WC2026)
- [x] Decizii tehnice (React+TS+Vite+Tailwind+shadcn, 21st.dev punctual)
- [x] Plan de deploy (SWAP pe subdomeniu, 3 pași)
- [x] Plan de execuție pe 6 faze
- [x] Log de progres
- [x] Lista completă de componente (08-Componente)
- [x] Design-ul site-ului, de la sus la jos (09-Design)
- [x] **Faza 0: Repo creat** (`~/Projects/PERSONAL/CV/mariusivan-cv/`)
- [x] **Faza 1: Structură completă** (Vite + React + TS + Tailwind + shadcn)
- [x] **Faza 2: Conținut** (i18n EN/RO, hero, experiență, proiecte, skills, contact)
- [x] **Faza 3: Componente** (20+ fișiere, toate secțiunile)

## Ce e în curs

- [ ] **Faza 3: Testare locală** (`npm run dev` / `npm run build`)
- [ ] **Faza 4: Deploy** (SWAP pe subdomeniu, 3 pași)
- [ ] **Faza 5: Finalizare** (Git tag, README, .env)

## Ce e blocat / de rezolvat

- [ ] Pas 1 Deploy: muta XP-ul pe `xp.` (trebuie făcut înainte de a construi CV-ul)
- [ ] Faza 3: rulează `npm run dev` și verifică
- [ ] Faza 4: deploy pe VPS

## Unde e tot

| Fișier | Conținut |
|---|---|
| `README.md` | Hub-ul proiectului, rezumat |
| `01-Conținut-CV.md` | Conținut real FEG Group |
| `02-Proiecte.md` | Cele 3 proiecte |
| `03-Stack-Și-Componente.md` | Stack + componente |
| `04-Deploy.md` | Plan de deploy |
| `05-Plan-Execuție.md` | Checklist complet |
| `06-Log.md` | Jurnal de progres |
| `07-Handover.md` | Acest fișier |
| `08-Componente.md` | Lista completă de componente |
| `09-Design.md` | Cum arată site-ul |
| `10-Research.md` | Ce putem lua de la alți site-uri |
| `11-Taskuri.md` | Taskuri de la A la Z |

## Structura proiectului

```
~/Projects/PERSONAL/mariusivan-cv/
├── package.json     ✓ (React 18, Vite 5, TS, Tailwind)
├── vite.config.ts   ✓
├── tailwind.config.js ✓
├── components.json  ✓ (shadcn)
├── postcss.config.js ✓
├── index.html       ✓
├── src/
│   ├── main.tsx     ✓ (entry point)
│   ├── index.css    ✓ (tema + animații)
│   ├── i18n/
│   │   └── translations.ts ✓ (490 linii, EN/RO)
│   ├── components/
│   │   ├── Navbar.tsx ✓
│   │   ├── LanguageToggle.tsx ✓
│   │   ├── sections/
│   │   │   ├── Hero.tsx ✓
│   │   │   ├── Experience.tsx ✓
│   │   │   ├── Projects.tsx ✓
│   │   │   ├── Skills.tsx ✓
│   │   │   ├── Contact.tsx ✓
│   │   │   ├── Footer.tsx ✓
│   │   │   └── shared.tsx ✓
│   │   └── ui/
│   │       ├── button.tsx ✓
│   │       ├── card.tsx ✓
│   │       ├── tabs.tsx ✓
│   │       ├── badge.tsx ✓
│   │       └── tooltip.tsx ✓
│   ├── hooks/
│   │   ├── useLanguage.ts ✓
│   │   └── useReveal.ts ✓
│   └── lib/
│       └── utils.ts ✓
├── public/
│   ├── favicon.svg ✓
│   └── icons.svg ✓
├── README.md            ✓
└── vault/               ✓ (vault Obsidian — toată documentația + CV-BRIEF.md)
```

## Cum preia

1. Citește `README.md` pentru rezumat
2. Citește `05-Plan-Execuție.md` pentru pașii în ordine
3. Verifică `06-Log.md` pentru ce s-a făcut deja
4. Pornește de la prima fază neterminată

## Pas cu pas — ce ai de făcut

### Pas 1: Testare locală
```bash
cd ~/Projects/PERSONAL/mariusivan-cv
npm install
npm run dev
# Deschide http://localhost:5173
# Verifică:
# - Hero cu statistici
# - Secțiunea Experience (FEG Group)
# - Cele 3 proiecte
# - Skills
# - Contact
# - Toggle EN/RO
```

### Pas 2: Build
```bash
npm run build
# Verifică că dist/ e generat
# Testează cu npm run preview
```

### Pas 3: Deploy
Vezi [[04-Deploy]] pentru detaliile complete.

1. Muta XP-ul pe `xp.`
2. Build CV-ul local
3. Deploy pe VPS (`/var/www/cv/dist`)
4. Verifică: `https://` arată CV-ul nou
5. Verifică: `https://xp.` încă arată XP-ul

## Regula de aur

Comenzi SSH pe o singură linie. Se rup la copiere dacă au newline-uri.

[[README]] · [[05-Plan-Execuție]] · [[06-Log]] · [[11-Taskuri]]
