# Deploy — SWAP pe Subdomeniu

## Starea finală

- `mariusivan.ro` = **CV-ul nou**
- `xp.mariusivan.ro` = **desktopul XP**, rămâne live și e link-uit din CV ca proiect cu buton „Live demo"

## De ce swap și nu redirect

XP-ul jucabil e singurul proiect pe care un recrutor îl poate atinge direct în browser.
CS2 Leaderboard rulează pe un PC Windows local, deci acolo rămân doar screenshot-uri.
Costul suplimentar față de redirect e ~10 minute, o singură dată.

## De ce subdomeniu și nu `mariusivan.ro/xp`

Varianta cu path ar economisi DNS-ul și certificatul, dar cere rebuild al XP-ului cu
`base: '/xp/'` în `vite.config.ts` plus `<BrowserRouter basename="/xp">`, urmat de retestarea
tuturor rutelor, asset-urilor absolute și a fluxului de pariuri FEG.
Repo-ul XP e înghețat — inclusiv față de un base path.

## Infrastructura existentă (verificată)

- VPS cyberfolks.ro, Ubuntu 22.04, nginx
- DNS prin Cloudflare, **proxied** (rezolvă la `188.114.96.8` / `188.114.97.8`)
- NS: `eric.ns.cloudflare.com` / `brynne.ns.cloudflare.com`
- Vhost: `/etc/nginx/sites-available/mariusivan.ro` → root `/var/www/portfolio/dist`, proxy `/api/*` → `127.0.0.1:8000`
- Cert: Let's Encrypt / certbot (certificat de origine; browserul vede certul Cloudflare)

**Cloudflare free e suficient.** Universal SSL acoperă rădăcina + subdomeniile de nivel unu,
deci `xp.mariusivan.ro` intră automat. Record-ul trebuie să fie **Proxied (nor portocaliu)** —
Cloudflare servește certificat doar pentru record-uri proxied. Doar subdomeniile de nivel doi
ar cere Advanced Certificate Manager (plătit) — nu e cazul.

## Pașii, în ordine

### Pas 1 — acum, înainte de a construi CV-ul

Mută XP-ul pe subdomeniu cât încă e la rădăină, ca să poți verifica fără presiune:

1. Cloudflare → DNS → record `A`, nume `xp`, același IP de origine ca `mariusivan.ro`, **Proxied ON**.
2. Vhost nou pe VPS pentru `xp.mariusivan.ro` → root `/var/www/portfolio/dist`.
   Copiază blocul `location /api/` **verbatim** din vhost-ul existent (pariurile FEG depind de el — păstrează exact aceleași header-e proxy). Plus `location / { try_files $uri $uri/ /index.html; }` pentru SPA.
3. `certbot --nginx -d xp.mariusivan.ro` — provocarea HTTP-01 trece prin proxy-ul Cloudflare.
4. Verifică: `https://xp.mariusivan.ro` încarcă desktopul, ferestrele se deschid, pariurile FEG se plasează. Abia după ce merge, treci mai departe.

### Pas 2 — cât construiești CV-ul

Nu atinge VPS-ul deloc. `npm run dev` local.
`mariusivan.ro` rămâne pe XP, complet funcțional.

### Pas 3 — la lansare

Build CV în `/var/www/cv/dist`, apoi în vhost-ul `mariusivan.ro` schimbi `root` din
`/var/www/portfolio/dist` în `/var/www/cv/dist`, apoi `nginx -t && systemctl reload nginx`.
Dacă CV-ul e pur static, blocul `/api/` de pe vhost-ul rădăcină poate fi scos — dar **doar**
după ce ai confirmat că a fost copiat corect pe vhost-ul XP.

**Rollback:** schimbi `root` înapoi și dai reload. Nimic distructiv, nimic șters.

## Dacă certbot face figuri

Alternativă: **Cloudflare Origin Certificate** — gratuit, 15 ani, acoperă `*.mariusivan.ro`
dintr-un foc, fără reînnoiri. Se generează din dashboard. E plasa de siguranță, nu prima opțiune —
certbot e fluxul deja funcțional și nu merită introdus un al doilea mecanism fără motiv.

**Modul SSL din Cloudflare (SSL/TLS → Overview) nu a fost verificat** — se vede doar în dashboard.
Pe **Full (strict)** certificatul de origine e obligatoriu; pe **Full** simplu merge și self-signed.

## Ce NU se face

- Nicio modificare în `mariusivan-portfolio` — rămâne live și funcțional
- Nu se șterge desktopul XP; se mută pe `xp.mariusivan.ro` și devine card în CV
- Nu se face swap-ul pe `mariusivan.ro` înainte ca `xp.mariusivan.ro` să fie verificat că merge
- Nu se cumpără abonament 21st.dev înainte să se dovedească necesar
- `.env` niciodată pe Git

[[README]] · [[03-Stack-Și-Componente]]