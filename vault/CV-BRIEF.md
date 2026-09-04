# Handoff: CV interactiv modern (repo nou)

## Context

Portofoliul actual (`mariusivan-portfolio`, live pe mariusivan.ro) e un desktop Windows XP
interactiv. Marius vrea în loc un **CV interactiv modern**. Am evaluat migrarea în-place și
am respins-o: ar însemna demontarea a ~6.600 linii de UI XP, rescrierea rutării și curățarea
unui backend care deservește altceva. Decizia: **repo-ul actual rămâne neatins și funcțional**,
CV-ul se construiește într-un repo nou, de la zero.

Acest fișier NU e un plan de execuție pentru repo-ul curent. E un **brief de handoff** pentru
sesiunea Claude care va porni repo-ul nou — conține contextul pe care un director gol nu-l are.

**Zero modificări în `mariusivan-portfolio`.** Singura acțiune aici: livrarea acestui brief.

---

## 1. Conținut CV real (de recuperat — nu se rescrie de la zero)

Sursa: `mariusivan-portfolio/frontend/src/components/desktop/feg/About.tsx`
Scris deja **bilingv EN/RO**, într-un `<pre>` monospace. E cel mai valoros activ de transferat.

**FEG Group — Junior Developer, ianuarie 2023 → prezent**

Fortuna Entertainment Group operează două branduri de pariuri: Fortuna și Casa Pariurilor.
Intrat ca Junior Developer în ianuarie 2023 — **de la zero cunoștințe de programare,
autodidact** — crescut într-o echipă de maximum 6 developeri. (Detaliul „de la zero,
autodidact" e un diferențiator narativ puternic pentru un CV — merită scos în evidență,
nu ascuns într-un paragraf.)

**Proiect:** intranet intern la scară largă, monolith modular pe Laravel, **82 module** —
operațiuni pariuri, HR, finanțe, conformitate și productivitate angajați, pentru ambele
branduri și toate locațiile.

**Responsabilități:**
- Funcționalități în operațiuni magazine (ciclu de viață, deschideri, închideri, audituri, inspecții)
- HR: onboarding, contracte de muncă, pontaje, concedii, e-learning
- Finanțe: rapoarte de cheltuieli, procesare facturi
- Conformitate: cereri GDPR, semnare documente
- Control acces per-resursă peste Entrust ACL, cu bibliotecă de documente ierarhică și
  permisiuni pe **5 axe** (folder×magazin, folder×user, fișier×magazin, fișier×user, grupuri JSON legacy)
- Pagini Blade server-rendered: controllere, rute, modele Eloquent, migrații, procesare formulare
- Integrat Microsoft Graph mailer (M365), Google Maps, trei toolchain-uri PDF (dompdf / FPDF / wkhtmltopdf)
- Comenzi Artisan programate: exporturi periodice, KPI rollups, arhivare

**Stack proiect:**
| Zonă | Tehnologii |
|---|---|
| Backend | PHP 8.2 · Laravel 10 · MySQL · Redis |
| Frontend | Blade · Bootstrap 5 · jQuery |
| Storage | NetApp NFS · AWS S3 · SFTP |
| Auth | Entrust ACL · Google 2FA · WebPush |
| Tools | Yajra Datatables · dompdf · FPDF · wkhtmltopdf · Maatwebsite Excel · Microsoft Graph Mail |

## 2. Proiecte de prezentat în CV

| Proiect | Stare reală | Repo |
|---|---|---|
| **CS2 Leaderboard** | Aplicație reală în producție pe mașină Windows locală, conectată la server CS2. Folosită activ de un grup de prieteni pentru competiții 2v2. React+Vite / FastAPI / plugin CS2. Leaderboard, meciuri, pariuri, bracket turneu. | `github.com/mivan1990/CS2Leaderboard` |
| **Portfolio XP** | Desktop XP interactiv: ferestre draggable, taskbar, start menu, aplicații cu backend real de pariuri. **Cardul cel mai puternic din CV** — singurul proiect pe care recrutorul îl poate atinge live. Se mută pe `xp.mariusivan.ro` (vezi §4). | `github.com/mivan1990/mariusivan-portfolio` |
| **Fortuna WC2026** | Pariuri FIFA WC2026 cu backend real (football-data.org), auth guest pe UUID+JWT, sync la 5 min. Trăiește în repo-ul portfolio. | idem |

## 3. Decizii tehnice stabilite

**Componente — shadcn/ui ca bază, 21st.dev punctual.**
21st.dev a fost punctul de plecare al discuției. Realitatea verificată pe site:
- Codul e **MIT** — o dată copiat e al tău definitiv
- Browsing gratuit, dar **doar 2 copieri de componente pe zi** pe planul gratuit
- Nelimitat = **$6/lună** (Builder); Magic MCP cu generare AI `/ui` = **$15/lună** (Builder + AI) + API key
- Deci „e gratis" e doar parțial adevărat — licența da, accesul e throttled

Recomandare: **shadcn/ui** (gratuit, nelimitat) acoperă ~90% — butoane, carduri, tabs, dialog,
tooltip. Din 21st.dev se iau punctual 2-3 piese spectaculoase (hero animat, timeline de
experiență). Cost zero, fără dependență de un abonament.

**Stack propus:** React 18 + TypeScript + Vite + Tailwind + shadcn/ui.
Consecvent cu ce știe deja Marius și cu deploy-ul existent pe VPS.

**Setup shadcn necesită:** `npx shadcn@latest init` → adaugă Radix, `class-variance-authority`,
`tailwind-merge`, `clsx`, creează `components.json` + `src/lib/utils.ts`, rescrie
`tailwind.config.js` și `index.css`. În repo nou, gol, e fără risc.

**Bilingv EN/RO cu toggle** — conținutul există deja în ambele limbi, ar fi risipă să se piardă.

## 4. Deploy — decizia luată: SWAP pe subdomeniu

**Starea finală:** `mariusivan.ro` = CV-ul nou. `xp.mariusivan.ro` = desktopul XP, rămâne
live și e link-uit din CV ca proiect cu buton „Live demo".

**De ce swap și nu redirect:** XP-ul jucabil e singurul proiect pe care un recrutor îl poate
atinge direct în browser. CS2 Leaderboard rulează pe un PC Windows local, deci acolo rămân
doar screenshot-uri. Costul suplimentar față de redirect e ~10 minute, o singură dată.

**De ce subdomeniu și nu `mariusivan.ro/xp`:** varianta cu path ar economisi DNS-ul și
certificatul, dar cere rebuild al XP-ului cu `base: '/xp/'` în `vite.config.ts` plus
`<BrowserRouter basename="/xp">`, urmat de retestarea tuturor rutelor, asset-urilor absolute
și a fluxului de pariuri FEG. Repo-ul XP e înghețat — inclusiv față de un base path.

### Infrastructura existentă (verificată)

- VPS cyberfolks.ro, Ubuntu 22.04, nginx
- DNS prin Cloudflare, **proxied** (rezolvă la `188.114.96.8` / `188.114.97.8`)
- NS: `eric.ns.cloudflare.com` / `brynne.ns.cloudflare.com`
- Vhost: `/etc/nginx/sites-available/mariusivan.ro` → root `/var/www/portfolio/dist`,
  proxy `/api/*` → `127.0.0.1:8000`
- Cert: Let's Encrypt / certbot (certificat de **origine**; browserul vede certul Cloudflare)

**Cloudflare free e suficient.** Universal SSL acoperă rădăcina + subdomeniile de **nivel unu**,
deci `xp.mariusivan.ro` intră automat. Record-ul trebuie să fie **Proxied (nor portocaliu)** —
Cloudflare servește certificat doar pentru record-uri proxied. Doar subdomeniile de nivel doi
(`ceva.xp.mariusivan.ro`) ar cere Advanced Certificate Manager, care e plătit — nu e cazul.

### Pașii, în ordine

**Pas 1 — acum, înainte de a construi CV-ul.** Mută XP-ul pe subdomeniu cât încă e la rădăcină,
ca să poți verifica fără presiune:

1. Cloudflare → DNS → record `A`, nume `xp`, același IP de origine ca `mariusivan.ro`,
   **Proxied ON**.
2. Vhost nou pe VPS pentru `xp.mariusivan.ro` → root `/var/www/portfolio/dist`.
   Copiază blocul `location /api/` **verbatim** din vhost-ul existent (pariurile FEG depind de
   el — păstrează exact aceleași header-e proxy). Plus `location / { try_files $uri $uri/ /index.html; }`
   pentru SPA.
3. `certbot --nginx -d xp.mariusivan.ro` — provocarea HTTP-01 trece prin proxy-ul Cloudflare
   (dovada: merge deja pe domeniul principal).
4. Verifică: `https://xp.mariusivan.ro` încarcă desktopul, ferestrele se deschid, pariurile FEG
   se plasează. Abia după ce merge, treci mai departe.

**Pas 2 — cât construiești CV-ul.** Nu atinge VPS-ul deloc. `npm run dev` local.
`mariusivan.ro` rămâne pe XP, complet funcțional.

**Pas 3 — la lansare.** Build CV în `/var/www/cv/dist`, apoi în vhost-ul `mariusivan.ro`
schimbi `root` din `/var/www/portfolio/dist` în `/var/www/cv/dist`, apoi
`nginx -t && systemctl reload nginx`. Dacă CV-ul e pur static, blocul `/api/` de pe vhost-ul
rădăcină poate fi scos — dar **doar** după ce ai confirmat că a fost copiat corect pe vhost-ul XP.

**Rollback:** schimbi `root` înapoi și dai reload. Nimic distructiv, nimic șters.

### Dacă certbot face figuri

Alternativă: **Cloudflare Origin Certificate** — gratuit, 15 ani, acoperă `*.mariusivan.ro`
dintr-un foc, fără reînnoiri. Se generează din dashboard. E plasa de siguranță, nu prima opțiune —
certbot e fluxul deja funcțional și nu merită introdus un al doilea mecanism fără motiv.

**Modul SSL din Cloudflare (SSL/TLS → Overview) nu a fost verificat** — se vede doar în dashboard.
Pe **Full (strict)** certificatul de origine e obligatoriu; pe **Full** simplu merge și self-signed.

### Regula de aur

Comenzi SSH **pe o singură linie**. Se rup la copiere dacă au newline-uri.

## 5. Ce NU se face

- Nicio modificare în `mariusivan-portfolio` — rămâne live și funcțional, inclusiv fără
  `base: '/xp/'` (de-aia s-a ales subdomeniul, nu path-ul)
- Nu se șterge desktopul XP; se mută pe `xp.mariusivan.ro` și devine card în CV
- Nu se face swap-ul pe `mariusivan.ro` înainte ca `xp.mariusivan.ro` să fie verificat că merge
- Nu se cumpără abonament 21st.dev înainte să se dovedească necesar
- `.env` niciodată pe Git

## Verificare

Acest brief e livrat, nu executat. Succesul = sesiunea nouă pornește cu conținutul CV,
lista de proiecte și decizia pe componente, fără să le re-deducă.

Marius pornește Claude în directorul repo-ului nou și dă acest fișier ca punct de plecare.
Pentru conținutul integral EN+RO, sursa canonică rămâne:
`mariusivan-portfolio/frontend/src/components/desktop/feg/About.tsx`
