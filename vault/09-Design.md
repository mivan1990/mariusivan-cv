---
tip: design
proiect: cv
tags: [design, cv]
---
# Design — Cum arată CV-ul interactiv

Descriere vizuală a site-ului. De la sus la jos.

---

## 1. Header (Fix, sticky)

```
┌─────────────────────────────────────────────────────────────┐
│  [Avatar]  Marius Ivan          [EN/RO]  [Menu]           │
│  Junior Developer · FEG Group                            │
└─────────────────────────────────────────────────────────────┘
```

- **Sticky** — rămâne fix la scroll
- **Glassmorphism** — fundal cu blur (backdrop-filter: blur(10px))
- **Avatar** — imagine de profil (32px)
- **Nume + titlu** — "Marius Ivan" + "Junior Developer · FEG Group"
- **Toggle EN/RO** — buton pentru comutare limbă
- **Menu** — hamburger pe mobile, linkuri pe desktop
- **Heights** — 60px pe desktop, 50px pe mobile

---

## 2. Hero (Secțiunea de intro)

```
┌─────────────────────────────────────────────────────────────┐
│                                                           │
│         Marius Ivan                                       │
│                                                           │
│    Junior Developer · FEG Group                           │
│                                                           │
│    "De la zero cunoștințe de programare, autodidact,      │
│     crescut într-o echipă de 6 developeri."              │
│                                                           │
│         [Explore Projects]  [Download CV]  [Contact]      │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  82 modules  │  3 projects  │  2 brands  │  1 team │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  [Particule animate în fundal]                            │
│  [Efect de tastare pe titlu]                             │
└─────────────────────────────────────────────────────────────┘
```

- **Titlu** — "Marius Ivan" cu efect de tastare (typing effect)
- **Subtitlu** — "Junior Developer · FEG Group"
- **Quote** — "De la zero cunoștințe de programare, autodidact, crescut într-o echipă de 6 developeri."
- **Butoane** — 3 butoane: "Explore Projects" (primary), "Download CV" (secondary), "Contact" (ghost)
- **Stats** — 4 numere animate: 82 modules, 3 projects, 2 brands, 1 team
- **Fundal** — particule animate (particles) + efect de parallax
- **Animație** — fade-in la load, count-up pe numere
- **Heights** — 100vh pe desktop, auto pe mobile

---

## 3. Experiență (Secțiunea de experiență)

```
┌─────────────────────────────────────────────────────────────┐
│  EXPERIENȚA                                               │
│  ────────────────────────────────────────────────────────  │
│                                                           │
│  ● 2023 ──── Prezent                                    │
│  │  FEG Group — Junior Developer                        │
│  │  Fortuna Entertainment Group                         │
│  │  - 82 module intranet                               │
│  │  - PHP 8.2, Laravel 10, MySQL, Redis               │
│  │  - HR, Finanțe, Conformitate                       │
│  │  - Entrust ACL, Microsoft Graph, PDF tools         │
│  │                                                    │
│  │  [View Details]  [View Code]                       │
│  │                                                    │
│  ● 2023 ──── Prezent                                    │
│  │  Autodidact — De la zero                            │
│  │  - Început de la zero cunoștințe                  │
│  │  - Crescut într-o echipă de 6 developeri          │
│  │  - 2 branduri: Fortuna, Casa Pariurilor          │
│  │                                                    │
│  │  [View Details]                                    │
│  │                                                    │
│  [Timeline verticală cu puncte și linii]                 │
│  [Animație la scroll: fade-in + slide-up]              │
└─────────────────────────────────────────────────────────────┘
```

- **Timeline verticală** — linie verticală cu puncte pentru fiecare job
- **Carduri** — fiecare job e un card cu:
  - Perioada (2023 → Prezent)
  - Compania + rol
  - Bullet points cu responsabilități
  - Badge-uri cu tehnologii
  - Butoane: "View Details" (deschide dialog), "View Code" (link la repo)
- **Animație** — la scroll, fiecare card face fade-in + slide-up
- **Timeline** — linia se desenează la scroll (SVG animation)
- **Heights** — auto

---

## 4. Proiecte (Secțiunea de proiecte)

```
┌─────────────────────────────────────────────────────────────┐
│  PROIECTE                                                 │
│  ────────────────────────────────────────────────────────  │
│                                                           │
│  ┌─────────────────────┐  ┌─────────────────────┐        │
│  │  CS2 Leaderboard   │  │  Portfolio XP      │        │
│  │  [Screenshot]      │  │  [Screenshot]      │        │
│  │  React+Vite        │  │  Desktop XP        │        │
│  │  FastAPI           │  │  Ferestre          │        │
│  │  CS2 Plugin        │  │  Taskbar           │        │
│  │                     │  │  Start Menu        │        │
│  │  [Live Demo]       │  │  Aplicații         │        │
│  │  [View Code]       │  │                     │        │
│  │  [View Details]    │  │  [Live Demo]       │        │
│  │                     │  │  [View Code]       │        │
│  └─────────────────────┘  └─────────────────────┘        │
│                                                           │
│  ┌─────────────────────┐                                 │
│  │  Fortuna WC2026    │                                 │
│  │  [Screenshot]      │                                 │
│  │  Pariuri FIFA      │                                 │
│  │  football-data.org │                                 │
│  │  UUID+JWT auth     │                                 │
│  │  Sync 5 min        │                                 │
│  │                     │                                 │
│  │  [View Code]       │                                 │
│  │  [View Details]    │                                 │
│  └─────────────────────┘                                 │
│                                                           │
│  [Grid: 2 coloane pe desktop, 1 pe mobile]              │
│  [Carduri cu efect de tilt 3D la hover]                 │
│  [Animație: fade-in + scale-up la scroll]              │
└─────────────────────────────────────────────────────────────┘
```

- **Grid** — 2 coloane pe desktop, 1 pe mobile
- **Carduri** — fiecare proiect e un card cu:
  - Screenshot (imagine)
  - Numele proiectului
  - Bullet points cu tehnologii / funcții
  - Badge-uri cu status (Production, Live, etc.)
  - Butoane: "Live Demo" (dacă e live), "View Code" (link la repo), "View Details" (deschide dialog)
- **Animație** — la scroll, fiecare card face fade-in + scale-up
- **Hover** — efect de tilt 3D (perspective transform)
- **Dialog** — "View Details" deschide un dialog cu detalii complete
- **Heights** — auto

---

## 5. Skills / Stack (Secțiunea de tehnologii)

```
┌─────────────────────────────────────────────────────────────┐
│  STACK & TEHNOLOGII                                       │
│  ────────────────────────────────────────────────────────  │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  BACKEND     │  │  FRONTEND    │  │  STORAGE     │   │
│  │  PHP 8.2    │  │  Blade      │  │  NetApp NFS  │   │
│  │  Laravel 10 │  │  Bootstrap 5│  │  AWS S3      │   │
│  │  MySQL      │  │  jQuery     │  │  SFTP        │   │
│  │  Redis      │  │  React 18   │  │              │   │
│  │              │  │  TypeScript │  │              │   │
│  │              │  │  Vite       │  │              │   │
│  │              │  │  Tailwind   │  │              │   │
│  │              │  │  shadcn/ui  │  │              │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐                      │
│  │  AUTH        │  │  TOOLS       │                      │
│  │  Entrust ACL│  │  dompdf     │                      │
│  │  Google 2FA │  │  FPDF       │                      │
│  │  WebPush    │  │  wkhtmltopdf│                      │
│  │              │  │  Maatwebsite│                      │
│  │              │  │  Excel      │                      │
│  │              │  │  MS Graph   │                      │
│  └──────────────┘  └──────────────┘                      │
│                                                           │
│  [Grid: 3 coloane pe desktop, 1 pe mobile]              │
│  [Carduri cu badge-uri pentru fiecare tehnologie]       │
│  [Animație: fade-in la scroll]                         │
└─────────────────────────────────────────────────────────────┘
```

- **Grid** — 3 coloane pe desktop, 1 pe mobile
- **Carduri** — fiecare categorie e un card cu:
  - Titlul categoriei (BACKEND, FRONTEND, STORAGE, AUTH, TOOLS)
  - Lista de tehnologii (badge-uri)
- **Badge-uri** — fiecare tehnologie e un badge colorat
- **Animație** — la scroll, fiecare card face fade-in
- **Heights** — auto

---

## 6. Stats (Secțiunea de statistici)

```
┌─────────────────────────────────────────────────────────────┐
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │    82        │  │     3        │  │     2        │   │
│  │  MODULES     │  │  PROJECTS    │  │  BRANDS      │   │
│  │  (count-up)  │  │  (count-up)  │  │  (count-up)  │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                           │
│  ┌──────────────┐                                        │
│  │     1        │                                        │
│  │  TEAM        │                                        │
│  │  (count-up)  │                                        │
│  └──────────────┘                                        │
│                                                           │
│  [Numere animate: count-up la scroll]                    │
│  [Grid: 4 coloane pe desktop, 2 pe mobile]             │
│  [Animație: scale-up + fade-in la scroll]              │
└─────────────────────────────────────────────────────────────┘
```

- **Grid** — 4 coloane pe desktop, 2 pe mobile
- **Numere** — fiecare număr e un counter animat (count-up la scroll)
- **Label-uri** — sub fiecare număr: MODULES, PROJECTS, BRANDS, TEAM
- **Animație** — la scroll, fiecare număr face scale-up + fade-in
- **Heights** — auto

---

## 7. FAQ (Secțiunea de întrebări frecvente)

```
┌─────────────────────────────────────────────────────────────┐
│  ÎNTREBĂRI FRECVENTE                                      │
│  ────────────────────────────────────────────────────────  │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  De ce ai ales Laravel?                    [+]    │  │
│  └─────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Cât de complex e intranetul?               [+]    │  │
│  └─────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Ce înseamnă "de la zero"?              [+]    │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  [Accordion: fiecare întrebare e un item expandabil]    │
│  [Animație: slide-down la expand]                      │
└─────────────────────────────────────────────────────────────┘
```

- **Accordion** — fiecare întrebare e un item expandabil
- **Animație** — la expand, conținul face slide-down
- **Heights** — auto

---

## 8. Contact (Secțiunea de contact)

```
┌─────────────────────────────────────────────────────────────┐
│  CONTACT                                                  │
│  ────────────────────────────────────────────────────────  │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Nume:  [________________________]                 │  │
│  │  Email: [________________________]                 │  │
│  │  Mesaj: [________________________]                 │  │
│  │         [________________________]                 │  │
│  │         [________________________]                 │  │
│  │                                                     │  │
│  │  [Send Message]                                   │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  [Formular cu Input, Label, Textarea]                   │
│  [Buton: Send Message (primary)]                        │
│  [Animație: fade-in la scroll]                         │
└─────────────────────────────────────────────────────────────┘
```

- **Formular** — 3 câmpuri: Nume, Email, Mesaj
- **Input** — câmpuri de text
- **Label** — etichete pentru fiecare câmp
- **Textarea** — câmp de mesaj (3 linii)
- **Buton** — "Send Message" (primary)
- **Animație** — la scroll, formularul face fade-in
- **Heights** — auto

---

## 9. Footer

```
┌─────────────────────────────────────────────────────────────┐
│  © 2026 Marius Ivan · Junior Developer · FEG Group       │
│  [LinkedIn]  [GitHub]  [Email]                           │
└─────────────────────────────────────────────────────────────┘
```

- **Info** — copyright + titlu
- **Linkuri** — LinkedIn, GitHub, Email
- **Heights** — auto

---

## Culoare & Stil

| Element | Valoare |
|---|---|
| Fundal | `#0a0a0a` (dark) sau `#fafafa` (light) |
| Text | `#e0e0e0` (dark) sau `#333333` (light) |
| Accent | `#4dab9a` (teal) |
| Card | `#1a1a1a` (dark) sau `#ffffff` (light) |
| Border | `#333333` (dark) sau `#e0e0e0` (light) |
| Font | Inter, system-ui, sans-serif |
| Mărime font | 16px (body), 24px (h2), 32px (h1) |
| Linia | 1.6 |
| Răspuns | Responsive (mobile-first) |

## Animații

| Animație | Unde | Durată |
|---|---|---|
| Fade-in | Totul | 0.3s |
| Slide-up | Experiență, Proiecte | 0.4s |
| Scale-up | Stats, Proiecte | 0.3s |
| Count-up | Stats | 1s |
| Typing | Hero | 0.5s per caracter |
| Particles | Hero | continuu |
| Parallax | Totul | la scroll |
| Tilt 3D | Proiecte | 0.2s |
| Slide-down | FAQ | 0.3s |

[[README]] · [[03-Stack-Și-Componente]] · [[08-Componente]]