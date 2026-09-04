---
tip: deploy
proiect: cv
tags: [deploy, nginx, cv]
---
# Configurație nginx pentru CV (VPS cyberfolks.ro)

Configurație recomandată pentru `mariusivan.ro` → `/var/www/cv/dist`.
Context: build-ul e **static pur** (Vite, fără backend, fără variabile de mediu la runtime).

## Concluzii cheie

1. **Static pur — confirmat.** Niciun `fetch()` către API-uri proprii în `src/`,
   niciun `import.meta.env`, nicio rutare pe cai reale. Singurele resurse externe
   sunt Google Fonts (CDN) și linkuri outbound (GitHub, mailto). Nu e nevoie de
   PHP, Node, sau orice alt proces pe VPS.

2. **Nu e nevoie de `try_files ... /index.html` (rewrite SPA).**
   Aplicația nu folosește react-router nici un alt router pe cai reale —
   navigarea e doar prin ancore `#hash` + `scrollIntoView` (Navbar, Hero).
   URL-ul nu se schimbă niciodată, deci orice refresh merge mereu la `/index.html`.
   `try_files $uri $uri/ /index.html;` nu ar strica, dar e degeabă aici.
   Dacă în viitor se adaugă rute reale (ex. `/proiecte/cs2`), atunci da, se adaugă.

3. **Cache:** asseturile din `dist/assets/` au hash în nume
   (`index-CdPAFNPn.js`) → se pot servi cu cache imutabil de 1 an.
   `index.html` NU are hash → cache scurt (sau `no-cache` + revalidare),
   altfel vizitatorii văd build-ul vechi după fiecare deploy.

## Configurație nginx

```nginx
server {
    listen 80;
    server_name mariusivan.ro;

    # Certbot-ul va modifica automat această secțiune (443 ssl + certbot redirect)
    # după `certbot --nginx -d mariusivan.ro`

    root /var/www/cv/dist;
    index index.html;

    # index.html: revalidare la fiecare request (e mic, 1 kB, gzip 0.5 kB)
    location = /index.html {
        add_header Cache-Control "no-cache";
    }

    # Asseturi hashuite: cache imutabil, 1 an
    location /assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        try_files $uri =404;
    }

    # Restul (favicon, icons): cache moderat
    location ~* \.(svg|png|jpg|jpeg|webp|avif|woff2?)$ {
        add_header Cache-Control "public, max-age=2592000";
        try_files $uri =404;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip (Vite nu pre-gzipează; nginx face el)
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/css application/javascript application/json image/svg+xml;

    # Security headers de bază
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

## Pasul de deploy (pe VPS)

```bash
# local: npm run build
# apoi:
rsync -avz --delete dist/ root@<vps>:/var/www/cv/dist/
# pe VPS:
nginx -t && systemctl reload nginx
```

`--delete` e sigur: `dist/` e regenerat complet la fiecare build, nimic nu e scris
manual în el.

## Ce NU trebuie făcut

- Nu e nevoie de `proxy_pass`, `fastcgi_pass`, sau `.env` — nu există backend.
- Nu e nevoie de `try_files ... /index.html` ca fallback SPA (fără rute reale),
  dar l-am lăsat în config ca să fie tolerant dacă se adaugă rute viitor.
- `dist/icons.svg` e copiat de Vite (e în `public/`) dar **nu e referențat în cod** —
  ocupă 5 kB pe disc, zero impact la runtime. Nu e șters (vezi `11-Taskuri.md`, F1).

[[README]] · [[04-Deploy]] · [[11-Taskuri]]
