# Stack și Componente

## Decizii stabilite

### Componente — shadcn/ui ca bază, 21st.dev punctual

21st.dev a fost punctul de plecare al discuției. Realitatea verificată pe site:
- Codul e **MIT** — o dată copiat e al tău definitiv
- Browsing gratuit, dar **doar 2 copieri de componente pe zi** pe planul gratuit
- Nelimitat = **$6/lună** (Builder); Magic MCP cu generare AI `/ui` = **$15/lună** (Builder + AI) + API key
- Deci „e gratis" e doar parțial adevărat — licența da, accesul e throttled

**Recomandare:** shadcn/ui (gratuit, nelimitat) acoperă ~90% — butoane, carduri, tabs, dialog, tooltip.
Din  21st.dev se iau punctual 2-3 piese spectaculoase (hero animat, timeline de experiență).
Cost zero, fără dependență de un abonament.

### Stack propus

**React 18 + TypeScript + Vite + Tailwind + shadcn/ui**

Consecvent cu ce știe deja Marius și cu deploy-ul existent pe VPS.

### Setup shadcn necesită

```
npx shadcn@latest init
```
- Adaugă Radix, `class-variance-authority`, `tailwind-merge`, `clsx`
- Creează `components.json` + `src/lib/utils.ts`
- Rescrie `tailwind.config.js` și `index.css`

În repo nou, gol, e fără risc.

### Bilingv EN/RO cu toggle

Conținutul există deja în ambele limbi, ar fi risipă să se piardă.

## Checklist

- [ ] `npx create-vite` cu React + TypeScript
- [ ] `npx shadcn@latest init`
- [ ] Adaugă componentele de bază (button, card, tabs, dialog, tooltip)
- [ ] Sistem de i18n (EN/RO toggle)
- [ ] 2-3 componente spectaculoase din 21st.dev (hero animat, timeline)
- [ ] Structura paginii: hero → experiență → proiecte → contact

[[README]] · [[01-Conținut-CV]] · [[02-Proiecte]]