# mariusivan-cv — instrucțiuni pentru agent

CV interactiv bilingv EN/RO. React 18 + TypeScript + Vite 5 + Tailwind + shadcn/ui.
Site static, fără backend. Deploy pe VPS cyberfolks.ro (nginx), detalii în `vault/04-Deploy.md`.

## Structură

```
src/main.tsx              entry point + componenta App (nu există App.tsx separat)
src/components/           Navbar, LanguageToggle
src/components/sections/  Hero, Experience, Projects, Skills, Contact, Footer, shared
src/components/ui/        shadcn: button, card, tabs, badge, tooltip
src/hooks/                useLanguage, useReveal
src/i18n/translations.ts  traduceri EN/RO
src/lib/utils.ts          cn()
vault/                    vault Obsidian — toată documentația proiectului
```

## Comenzi

```bash
npm run dev      # vite, port 5173
npm run build    # tsc -b && vite build
npm run preview
```

## Starea build-ului

`npm run build` **trece** de la commit-ul `d273c15` (2026-09-04): 1622 module,
251.95 kB js (80.98 kB gzip), 18.00 kB css.

Nu există bug-uri de build cunoscute. Dacă `npm run build` pică, e ceva introdus recent —
raportează eroarea, nu presupune că e una veche și știută.

Ce **nu** e verificat încă: `npm run dev` n-a fost pornit de nimeni, iar aplicația n-a fost
deschisă în browser. Nu presupune că randează corect doar fiindcă build-ul trece.

## REGULA — după FIECARE task terminat

Un task nu e gata până nu faci ambele:

### 1. Commit în git

```bash
npm run build          # trebuie să treacă înainte de commit
git add -A
git commit -m "<tip>: <descriere>"
```

Tipuri: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`.
Descrierea la imperativ, în engleză, fără punct la final. Exemplu: `fix: add @ alias to vite config`.

- Un commit per task logic, nu unul pe fișier.
- **Nu face `git push`** fără să ceară utilizatorul explicit. Remote-ul e
  `git@github.com:mivan1990/mariusivan-cv.git`.
- Dacă build-ul nu trece, nu comite — repară întâi sau raportează.

### 2. Notează în vault

**`vault/06-Log.md`** — adaugă la finalul secțiunii `## Intrări`, cu formatul existent:

```
### YYYY-MM-DD

#### HH:MM — Titlu scurt
- [x] ce s-a făcut
- [ ] ce a rămas
- Notă: context important, decizii, capcane
```

Dacă există deja secțiunea pentru ziua curentă, adaugă doar un bloc `#### HH:MM` nou.

**`vault/11-Taskuri.md`** — bifează taskurile atinse: `[ ]` → `[x]` (făcut) sau `[~]` (în curs).
Nu rescrie taskuri, doar schimbă statusul și adaugă o linie `- Status:` dacă e ceva de spus.

Ce merge în log: ce s-a schimbat și **de ce**, decizii de design, lucruri care au surprins,
ce e blocat și de ce. Nu lista de fișiere atinse — aia e în git.

## Convenții

- Comentariile și textul din vault: română. Codul, numele de variabile, mesajele de commit: engleză.
- Traduceri noi → în `src/i18n/translations.ts`, ambele limbi, niciodată hardcodat în componentă.
- Componentele shadcn din `src/components/ui/` se modifică doar dacă e chiar nevoie.
- Comenzile SSH se scriu pe o singură linie — se rup la copiere dacă au newline-uri.
