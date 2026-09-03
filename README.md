# Marius Ivan — CV Interactiv Modern

CV interactiv modern, bilingv EN/RO.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

## Structură

```
src/
├── components/
│   ├── ui/              # Componente shadcn
│   ├── layout/          # Header, footer, nav
│   ├── sections/        # Hero, experiență, proiecte, skills, stats, FAQ, contact
│   ├── projects/        # Carduri pentru proiecte
│   └── animations/      # Animații
├── lib/
│   ├── i18n.ts        # Sistem bilingv EN/RO
│   └── utils.ts       # Utilitare
├── hooks/
│   ├── use-i18n.ts    # Hook pentru bilingv
│   ├── use-scroll.ts  # Hook pentru animații la scroll
│   └── use-typing.ts  # Hook pentru efect de tastare
├── data/
│   ├── cv.ts          # Datele CV
│   └── translations/  # Traduceri EN/RO
├── assets/
│   ├── images/
│   └── icons/
├── styles/
│   ├── index.css
│   └── animations.css
├── App.tsx
└── main.tsx
```

## Cum rulezi

```bash
# Install
npm install

# Dev
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Deploy

Vezi `04-Deploy.md` în vault-ul Obsidian.

- VPS: cyberfolks.ro
- DNS: Cloudflare (proxied)
- Web server: nginx
- Certificat: Let's Encrypt / certbot

## Vault Obsidian

Toate detaliile sunt documentate în:
`/Users/mariusivan/Vaults/cv/`

## Regula de aur

Comenzi SSH pe o singură linie. Se rup la copiere dacă au newline-uri.