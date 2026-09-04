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

    # ATENȚIE: în nginx, `add_header` dintr-un bloc ANULEAZĂ toate `add_header`
    # moștenite de la nivelul superior. De aceea headerele de securitate sunt
    # într-un snippet inclus în FIECARE location care își pune propriul header,
    # nu doar o dată la nivel de server.
    # Creează /etc/nginx/snippets/security-headers.conf cu:
    #   add_header X-Content-Type-Options "nosniff" always;
    #   add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # index.html: revalidare la fiecare request (e mic, 1 kB, gzip 0.5 kB)
    location = /index.html {
        include snippets/security-headers.conf;
        add_header Cache-Control "no-cache" always;
    }

    # Asseturi hashuite: cache imutabil, 1 an
    location /assets/ {
        include snippets/security-headers.conf;
        add_header Cache-Control "public, max-age=31536000, immutable" always;
        try_files $uri =404;
    }

    # Restul (favicon, icons): cache moderat
    location ~* \.(svg|png|jpg|jpeg|webp|avif|woff2?)$ {
        include snippets/security-headers.conf;
        add_header Cache-Control "public, max-age=2592000" always;
        try_files $uri =404;
    }

    location / {
        include snippets/security-headers.conf;
        try_files $uri $uri/ /index.html;
    }

    # Gzip (Vite nu pre-gzipează; nginx face el)
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/css application/javascript application/json image/svg+xml;

    # Headerele de securitate NU se pun aici — vezi nota de mai sus.
    # La nivel de server ar fi anulate în orice location cu `add_header` propriu.
}
```

## Capcana cu `add_header`

Merită reținută, fiindcă e cea mai frecventă greșeală de configurare nginx:

> `add_header` se moștenește de la nivelul superior **doar dacă** nivelul curent
> nu declară niciun `add_header` propriu. Unul singur le anulează pe toate.

Concret: dacă pui headerele de securitate la nivel de `server` și apoi ai un
`location /assets/` cu `add_header Cache-Control ...`, asseturile ajung servite
**fără** `X-Content-Type-Options` și `Referrer-Policy`. Nu primești niciun
avertisment — `nginx -t` trece, totul pare în regulă.

De verificat după deploy, pe fiecare tip de resursă:

```bash
curl -sI https://mariusivan.ro/ | grep -i "x-content-type\|referrer\|cache-control"
curl -sI https://mariusivan.ro/index.html | grep -i "x-content-type\|referrer\|cache-control"
curl -sI https://mariusivan.ro/assets/index-CdPAFNPn.js | grep -i "x-content-type\|referrer\|cache-control"
```

Toate trei trebuie să arate ambele headere de securitate.

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
