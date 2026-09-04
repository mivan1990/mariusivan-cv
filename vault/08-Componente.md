---
tip: componente
proiect: cv
tags: [componente, cv]
---
# Componente

Lista completă de componente folosite în CV-ul interactiv.

## Bază — shadcn/ui

Acestea acoperă ~90% din necesitate. Toate sunt gratuite, nelimitate.

| Componentă | Unde e folosită | Rol |
|---|---|---|
| `Button` | Totul | Butoane de acțiune (Live demo, Contact, Download CV) |
| `Card` | Proiecte, Experiență | Carduri pentru fiecare proiect și fiecare experiență |
| `Tabs` | Proiecte | Tab-uri pentru a comuta între detaliile fiecărui proiect |
| `Dialog` | Proiecte | Popup cu detalii complete ale unui proiect |
| `Tooltip` | Totul | Info suplimentară la hover |
| `Badge` | Experiență, Proiecte | Etichete pentru tehnologii, roluri, status |
| `Separator` | Totul | Linie de separare între secțiuni |
| `Avatar` | Header | Imagine de profil |
| `Input` | Contact | Câmpuri de formular |
| `Label` | Contact | Etichete pentru câmpuri |
| `Textarea` | Contact | Câmp de mesaj |
| `Sheet` | Mobile | Meniu lateral pe mobile |
| `Skeleton` | Totul | Loading state |
| `Progress` | Proiecte | Bară de progres pentru proiecte în curs |
| `Accordion` | FAQ | Secțiune de întrebări frecvente |
| `Carousel` | Proiecte | Carusel pentru screenshot-uri |
| `Table` | Stack | Tabelă de tehnologii |
| `NavigationMenu` | Header | Meniu de navigare |
| `Breadcrumbs` | Totul | Drum de navigare |
| `DropdownMenu` | Header | Meniu de acțiuni |
| `Alert` | Totul | Mesaje de alertă / info |
| `Divider` | Totul | Linie de separare |
| `Container` | Totul | Container de layout |
| `Row` | Totul | Row de layout |
| `Column` | Totul | Column de layout |
| `Stack` | Totul | Stack de layout |
| `Grid` | Totul | Grid de layout |
| `Flex` | Totul | Flex de layout |

## Spectaculoase — din 21st.dev (2-3 piese)

Acestea sunt cele care fac site-ul să arată "wow". Se iau punctual, nu se cumpără abonament.

| Componentă | Unde e folosită | Rol |
|---|---|---|
| **Hero animat** | Topul paginii | Animație de intro, cu numele, titlul, și o animație de tip "typing" sau particule |
| **Timeline de experiență** | Secțiunea Experiență | Timeline verticală cu puncte pentru fiecare job, cu animație la scroll |
| **Animated Stats** | Secțiunea Experiență | Numere animate (82 module, 3 proiecte, 2 branduri) care se count-up la scroll |
| **Parallax Background** | Totul | Fundal cu efect de parallax la scroll |
| **Animated Cards** | Proiecte | Carduri cu efect de tilt 3D la hover |
| **Typing Effect** | Hero | Efect de tastare pentru titlul principal |
| **Particle Background** | Hero | Particule animate în fundal |
| **Scroll Animation** | Totul | Animații de intrare la scroll (fade, slide, scale) |
| **Animated Counter** | Stats | Numere care se count-up la scroll |
| **Glassmorphism Cards** | Proiecte | Carduri cu efect de sticlă (blur + transparency) |

## Structură de fișiere

```
src/
├── components/
│   ├── ui/              ← Componente shadcn (generate cu npx shadcn)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── tabs.tsx
│   │   ├── dialog.tsx
│   │   ├── tooltip.tsx
│   │   ├── badge.tsx
│   │   ├── separator.tsx
│   │   ├── avatar.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   ├── progress.tsx
│   │   ├── accordion.tsx
│   │   ├── carousel.tsx
│   │   ├── table.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── breadcrumbs.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── alert.tsx
│   │   ├── divider.tsx
│   │   ├── container.tsx
│   │   ├── row.tsx
│   │   ├── column.tsx
│   │   ├── stack.tsx
│   │   ├── grid.tsx
│   │   └── flex.tsx
│   ├── layout/          ← Componente de layout
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── nav.tsx
│   │   └── sidebar.tsx
│   ├── sections/        ← Secțiuni ale paginii
│   │   ├── hero.tsx
│   │   ├── experience.tsx
│   │   ├── projects.tsx
│   │   ├── skills.tsx
│   │   ├── stats.tsx
│   │   ├── faq.tsx
│   │   └── contact.tsx
│   ├── projects/        ← Carduri pentru proiecte
│   │   ├── cs2-leaderboard.tsx
│   │   ├── portfolio-xp.tsx
│   │   └── fortuna-wc2026.tsx
│   └── animations/      ← Componente animate (din 21st.dev)
│       ├── hero-animated.tsx
│       ├── timeline.tsx
│       ├── animated-stats.tsx
│       ├── parallax-bg.tsx
│       ├── animated-cards.tsx
│       ├── typing-effect.tsx
│       ├── particles.tsx
│       ├── scroll-anim.tsx
│       ├── counter.tsx
│       └── glass-card.tsx
├── lib/
│   ├── i18n.ts        ← Sistem bilingv EN/RO
│   ├── utils.ts       ← Utilitare (cn, etc.)
│   └── data.ts        ← Datele CV (experiență, proiecte, skills)
├── hooks/
│   ├── use-i18n.ts    ← Hook pentru bilingv
│   ├── use-scroll.ts  ← Hook pentru animații la scroll
│   └── use-typing.ts  ← Hook pentru efect de tastare
├── assets/
│   ├── images/
│   │   ├── avatar.jpg
│   │   ├── cs2-leaderboard/
│   │   ├── portfolio-xp/
│   │   └── fortuna-wc2026/
│   └── icons/
├── styles/
│   ├── index.css
│   └── animations.css
├── App.tsx
└── main.tsx
```

## Setup

```bash
# 1. Creează proiectul
npx create-vite mariusivan-cv --template react-ts
cd mariusivan-cv
npm install

# 2. Initializează shadcn
npx shadcn@latest init

# 3. Adaugă componentele de bază
npx shadcn@latest add button card tabs dialog tooltip badge separator avatar input label textarea sheet skeleton progress accordion carousel table navigation-menu breadcrumbs dropdown-menu alert divider container row column stack grid flex

# 4. Adaugă animațiile (din 21st.dev, copiate manual)
# - hero-animated.tsx
# - timeline.tsx
# - animated-stats.tsx
# - parallax-bg.tsx
# - animated-cards.tsx
# - typing-effect.tsx
# - particles.tsx
# - scroll-anim.tsx
# - counter.tsx
# - glass-card.tsx
```

[[README]] · [[03-Stack-Și-Componente]] · [[08-Design]]