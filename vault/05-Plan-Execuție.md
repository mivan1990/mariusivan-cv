# Plan de Execuție

Ordinea de lucru, de la zero la lansare.
Fiecare paș e bifat când e verificat — starea reală e în [[11-Taskuri]] și [[06-Log]].

## Faza 0 — Pregătire

- [x] Creează repo-ul nou (ex. `mariusivan-cv`)
- [x] `npx create-vite mariusivan-cv --template react-ts`
- [x] `npm install`
- [ ] `npx shadcn@latest init`
- [ ] Configurează Tailwind + shadcn

## Faza 1 — Structură

- [x] `src/lib/i18n.ts` — sistem bilingv EN/RO cu toggle
- [x] `src/components/layout/` — header, footer, nav
- [x] Structura paginii: hero → experiență → proiecte → contact
- [ ] 2-3 componente spectaculoase din 21st.dev (hero animat, timeline de experiență)

## Faza 2 — Conținut

- [x] Secțiunea Experiență: FEG Group (din [[01-Conținut-CV]])
- [x] Scoate în evidență: autodidact, de la zero, echipă de 6
- [x] Secțiunea Proiecte: cele 3 carduri (din [[02-Proiecte]])
  - CS2 Leaderboard — screenshot-uri
  - Portfolio XP — buton „Live demo" → `xp.mariusivan.ro`
  - Fortuna WC2026 — descriere + repo
- [x] Secțiunea Contact / Linkuri

## Faza  3 — Local

- [ ] `npm run dev` — verifică totul local
- [ ] Testează toggle-ul EN/RO
- [ ] Testează responsivitate (mobile/tablet)
- [ ] Verifică că toate linkurile merg

## Faza 4 — Deploy

Vezi [[04-Deploy]] pentru detaliile complete.

- [ ] Pas 1: mută XP-ul pe `xp.mariusivan.ro` și verifică
- [ ] Pas 2: construiește CV-ul local (nu atinge VPS-ul)
- [ ] Pas 3: build în `/var/www/cv/dist`, schimbă `root` în vhost, `nginx - și apoi verifică
- [ ] Verifică: `https://` arată CV-ul nou
- [ ] Verifică: `https://xp.` încă arată XP-ul
- [ ] Testează butonul „Live demo" din CV → XP

## Faza 5 — Finalizare

- [ ] `.env` nu e pe Git
- [ ] README în repo-ul nou
- [ ] Git tag v1.0

## Regula de aur

Comenzi SSH pe o singură linie. Se rup la copere dacă au newline-uri.

[[README]] · [[01-Conținut-CV]] · [[02-Proiecte]] · [[03-Stack-Și--Componente]] · [[04-Deploy]]
