import React, { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'
import { Starfield } from '@/components/journey/starfield'

// Cat de departe de camera sta planeta aleasa (distanta focala).
// Planeta aleasa trebuie sa fie mereu cea mai mare de pe ecran, de aceea sta mai
// aproape (FOCUS_Z mic) si diametrele de baza sunt apropiate intre ele.
const FOCUS_Z = 420

// Virajul (ochirea tintei si intoarcerea de 180°) se termina in prima secunda,
// ca planeta tinta sa stea in punctul de focus tot restul zborului.
const TURN_MS = 1000
const TURN_EASE = 'cubic-bezier(0.34, 0, 0.12, 1)'
const TURN = `transform ${TURN_MS}ms ${TURN_EASE}`

// Cate copii ale campului de stele sunt puse cap la cap pe orizontala.
const SKY_TILES = 4

// Distanta dintre doua opriri. Scara CSS e P / (P + d), cu P = 1000: la 4000 o
// planeta vecina iesea de 39px si cadea IN SPATELE celei focalizate, care are
// 141px. Masurat pe toate cele 20 de perechi, 18 aveau spatiu liber negativ.
const SPACING = 2200

// Curba de zbor: pornire lenta, accelerare intre 12% si 36%, franare pana la 46%
// (adica 2.3s) unde e deja 93% din drum, apoi o asezare foarte lenta.
// 'linear()' cere Chrome 113+, Safari 17.2+, Firefox 112+; pe browsere mai vechi
// se ignora si se foloseste easing-ul implicit, deci degradarea e blanda.
const FLIGHT_EASE = 'linear(0, 0.015 6%, 0.06 12%, 0.16 18%, 0.32 24%, 0.52 30%, 0.70 36%, 0.84 41%, 0.93 46%, 0.965 55%, 0.985 70%, 1)'
const FLIGHT = `5000ms ${FLIGHT_EASE}`

// Fara inel si fara rotatie: inelul de 1500px era mult mai lat decat ecranul, iar
// rotatia aducea planetele de pe partea opusa IN FATA camerei, unde se umflau si
// zboarau lateral (afar de cadru). Acum planetele stau pe un culoar in adancime,
// la 4000px una de alta, ca zborul sa acopere distanta reala si planeta tinta sa
// creasca vizibil. Planetele deja depasite sunt ascunse (opacitate 0), deci nu
// pot aparea uriase in fata camerei.
// Semnul de pe planeta: fie o silueta (logo), fie un monogram scris. Etichetele
// de sub planetele departate se randeaza la 2-3px inaltime, deci ilizibile — un
// semn se recunoaste dupa FORMA, nu dupa text, si de aceea supravietuieste
// micsorarii mult mai bine.
type Mark = { text: string } | { paths: string[]; box: string }

// Doua dintre cele cinci au sigla adevarata: „EA” din Simple Icons (CC0) si
// logotipul FEG de pe feg.eu, varianta fara dreptunghi — deja alba, exact ce ne
// trebuie. Restul primesc monograme in mono-ul din CV: Digi are doar wordmark,
// Amber nu publica sigla in HTML, iar marca patrata a Euronet, scoasa din logo-ul
// lor, se citeste ca un glif oarecare atunci cand e singura pe sfera — numele
// scris spune mai mult decat ea.
const EA_MARK = ['M16.635 6.162l-5.928 9.377H4.24l1.508-2.3h4.024l1.474-2.335H2.264L.79 13.239h2.156L0 17.84h12.072l4.563-7.259 1.652 2.66h-1.401l-1.473 2.299h4.347l1.473 2.3H24zm-11.461.107L3.7 8.604l9.52-.035 1.474-2.3z']
const FEG_MARK = [
  'M0 11.3857V30.6404H8.90486V18.4239H18.9302V11.3857H0Z',
  'M23.1515 0.0600586H0V7.09822H23.1515V0.0600586Z',
  'M27.3444 0V0.159247V7.04101V11.3748V23.5885V30.2684V30.6295H36.2492H50.4988V23.5885H36.2492V18.413H46.2774V11.3748H36.1585V7.04101H50.4988V0H27.3444Z',
  'M83.3956 7.06957V0.0285645H68.8798C67.8442 0.0825948 66.7911 0.111032 65.7497 0.182124C65.4016 0.204874 65.0534 0.233311 64.7082 0.270279C63.6492 0.352746 62.5873 0.588774 61.581 0.964142C61.2475 1.08927 60.9169 1.22861 60.5981 1.38501C60.2412 1.55279 59.8989 1.74047 59.5742 1.94806C56.9238 3.76235 55.6337 5.6335 54.9053 7.65822C54.7327 8.13596 54.68 8.61086 54.5952 9.02604C54.3436 10.2716 54.2617 11.1076 54.2617 11.1076C54.1418 12.0546 54.0803 13.047 54.0803 14.085C54.0803 19.4823 55.4933 23.6398 58.3134 26.5546C61.1363 29.4694 65.1324 30.9282 70.3045 30.9282C75.0144 30.9282 79.3381 30.2742 83.2698 28.9661V11.3892H68.7891V18.1913H74.7774V23.3014C73.6453 23.5545 72.4049 23.6825 71.0622 23.6825C68.599 23.6825 66.7121 22.8834 65.4074 21.2824C64.0998 19.6842 63.4445 17.3609 63.4445 14.3125C63.4445 13.1437 63.5586 12.0802 63.7516 11.1133C64.4947 7.39091 68.5668 7.07241 68.8798 7.0781H83.3956V7.06957Z',
]

// Indexul din BODIES corespunde indexului din t.journey.stops.
// 'years' = cati ani a durat oprirea; da grosimea inelului, deci vechimea se
// vede fara sa citesti nimic. Culorile sunt trase din brandul fiecarei companii.
const BODIES: {
  x: number; y: number; z: number; size: number; bg: string; glow: string; ring: string; years: number; mark: Mark
}[] = [
  // x-ul creste monoton: culoarul e o curba lina, nu un zigzag. Cu pozitii care
  // alterneaza stanga-dreapta, vecinele la DOUA opriri distanta ajung din nou in
  // dreptul camerei si se ascund in spatele planetei focalizate; pe arc, toate
  // celelalte se desfasoara in evantai intr-o parte.
  //
  // Cifrele nu sunt alese din ochi: sunt rezultatul unei cautari care cere ca, din
  // ORICE oprire, nicio planeta sa nu atinga pe alta si toate sa ramana intr-o
  // caseta de 330x120 in jurul punctului de focus. Latimea e data de telefon,
  // inaltimea de panoul de text, care ocupa jumatatea de jos a ecranului — cu o
  // caseta mai inalta, planeta urmatoare ateriza fix peste titlu. Caseta nu poate
  // fi asimetrica: daca planeta j e cu 120px deasupra lui i, atunci i e cu exact
  // 120px sub j, deci limita de jos o fixeaza si pe cea de sus.
  // Ies +11px spatiu liber in cel mai strans caz, fata de -92px inainte.
  // RCS & RDS — albastrul Digi (#002bff, din sigla lor)
  { x:  -720, y:  -20, z:  -1200, size: 200, bg: 'radial-gradient(circle at 32% 30%, #a5c8ff, #0033ff 55%, #030a2e)', glow: '0 0 70px rgba(59,90,255,0.45)',  ring: 'rgba(147,180,255,0.5)',  years: 1,    mark: { text: 'RDS' } },
  // Electronic Arts — rosu
  { x:  -340, y:  310, z:  -3400, size: 210, bg: 'radial-gradient(circle at 32% 30%, #fca5a5, #b91c1c 55%, #3f0a0a)', glow: '0 0 75px rgba(239,68,68,0.45)',   ring: 'rgba(252,165,165,0.5)', years: 2.4,  mark: { paths: EA_MARK, box: '0 0 24 24' } },
  // Amber Studio — chihlimbar, ca numele
  { x:   -20, y:  -20, z:  -5600, size: 195, bg: 'radial-gradient(circle at 32% 30%, #fdba74, #c2410c 55%, #431407)', glow: '0 0 70px rgba(249,115,22,0.45)',  ring: 'rgba(253,186,116,0.5)', years: 0.5,  mark: { text: 'AMBER' } },
  // Euronet — turcoazul din sigla (#00b7b0). Bleumarinul lor (#243f90) ar fi fost
  // al treilea albastru din culoar; turcoazul e tot al lor si separa limpede
  { x:  1030, y: -220, z:  -7800, size: 205, bg: 'radial-gradient(circle at 32% 30%, #99f6e4, #00b7b0 55%, #042f2e)', glow: '0 0 75px rgba(0,183,176,0.45)',   ring: 'rgba(153,246,228,0.5)', years: 1.25, mark: { text: 'EURONET' } },
  // FEG — indigoul din sigla lor (#4540ff). Digi (#002bff) e albastru pur, asta e
  // impins spre violet; oricum stau la capetele opuse ale culoarului
  { x:  1780, y:   80, z: -10000, size: 240, bg: 'radial-gradient(circle at 32% 30%, #c4b5fd, #4540ff 55%, #170f4d)', glow: '0 0 90px rgba(90,80,255,0.5)',    ring: 'rgba(196,181,253,0.5)', years: 8.25, mark: { paths: FEG_MARK, box: '0 0 84 31' } },
]

// Monogramele se potrivesc pe LATIME, nu pe corp de litera: altfel „EA” ar fi de
// doua ori mai lat decat „AMBER” la acelasi font-size. Avansul mono e ~0.6em plus
// 0.14em spatiere, deci ~0.74em pe caracter; tinta e ~48% din diametrul sferei.
// Plafonul opreste marcile de doua litere sa devina enorme.
const markFontSize = (size: number, chars: number) => Math.min((0.48 * size) / (0.74 * chars), 0.22 * size)

// Siluetele se potrivesc tot pe latime (~48% din sfera), ca monogramele, dar cu
// inaltimea plafonata la 40%: fara plafon, o sigla patrata precum „EA” ar iesi de
// trei ori mai inalta decat logotipul FEG, care e lat de 2.7 ori cat e de inalt.
// Constelatia e desenata in pixeli ficsi, nu in unitati de ecran: pe un telefon
// planetele de la margine ar iesi din cadru, iar pe un ecran scund ar intra peste
// panoul de text. Micsoram intreaga scena, cu origine in punctul de focus ca sa nu
// se mute nimic din loc. Latimea tine planetele in cadru (pragul de 0.58 le tine si
// pe un ecran de 390px), inaltimea le tine deasupra panoului.
const sceneFit = (width: number, height: number) =>
  Math.min(1, Math.max(0.58, Math.min(width / 1180, height / 980)))

// Etichetele sunt interfata, nu geometrie: le anulam micsorarea de perspectiva,
// ca sa se citeasca la fel de la orice distanta. Fara asta, o eticheta la doua
// opriri distanta se randeaza la 2-3px inaltime — masurat, nu presupus.
const labelScale = (steps: number) => (1000 + FOCUS_Z + steps * SPACING) / 1000

const markSize = (size: number, box: string) => {
  const [, , bw, bh] = box.split(' ').map(Number)
  const width = Math.min(0.48 * size, (0.4 * size * bw) / bh)
  return { width, height: (width * bh) / bw }
}

// In ce parte a lumii se afla tinta: +1 dreapta, -1 stanga. Da si sensul
// intoarcerii de 180°, ca virajul sa se faca spre planeta, nu in partea opusa.
export function turnSide(from: number, to: number): 1 | -1 {
  return BODIES[to].x - BODIES[from].x >= 0 ? 1 : -1
}

// Cat se inclina camera intrand in viraj: spre dreapta inseamna rotatie inversa
// a continutului. Cand camera zboara intoarsa (reversed), stanga si dreapta lumii
// apar pe ecran invers, deci si inclinarea trebuie sa se intoarca. La intoarcerea
// propriu-zisa (turning) inclinarea e mai mare si urmeaza sensul virajului.
export function bankAngle(from: number, to: number, opts: { reversed: boolean; turning: boolean }): number {
  const side = turnSide(from, to)
  const onScreen = opts.turning ? side : opts.reversed ? -side : side
  return -onScreen * (opts.turning ? 24 : 14)
}

interface SpaceProps {
  index: number
  bank: number
  // Orientarea camerei in grade: 0 = spre planetele urmatoare, ±180 = intors.
  yaw: number
  onSelect: (i: number) => void
}

export function Space({ index, bank, yaw, onSelect }: SpaceProps) {
  const { t } = useLanguage()
  const stops = t.journey.stops
  const reduced = useReducedMotion()
  const rigRef = useRef<HTMLDivElement>(null)
  const skyRef = useRef<HTMLDivElement>(null)
  const reversed = yaw !== 0
  // Pasul spre „urmatoarea” oprire: intors, urmatoarea e cea dinainte.
  const step = reversed ? -1 : 1
  const [fit, setFit] = useState(1)

  useEffect(() => {
    const measure = () => setFit(sceneFit(window.innerWidth, window.innerHeight))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Camera se inclina dupa mouse: scriem direct pe element (fara state, ca sa nu
  // se re-randeze la fiecare pixel), cu rAF ca sa prindem doar ultimul eveniment.
  useEffect(() => {
    if (reduced) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const nx = e.clientX / window.innerWidth - 0.5     // -0.5 .. 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        if (rigRef.current) {
          rigRef.current.style.transform =
            `rotateY(${(nx * 12).toFixed(2)}deg) rotateX(${(-ny * 8).toFixed(2)}deg)`
        }
        // Cerul nu mai sta in scena 3D, deci nu mai prinde rotatia rig-ului: ii
        // dam in schimb o deplasare mica, in sens invers cursorului. Pe un fundal
        // de stele se citeste la fel — o rotatie de 12° pe un panou plat oricum nu
        // producea decat o distorsiune pe care nu o vede nimeni.
        if (skyRef.current) {
          skyRef.current.style.transform =
            `translate(${(-nx * 24).toFixed(1)}px, ${(-ny * 16).toFixed(1)}px)`
        }
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [reduced])

  return (
    <div
      className='pointer-events-none absolute inset-0'
      style={{ transform: `scale(${fit})`, transformOrigin: '50% 34%' }}
    >
    {/* Virajul (bank) sta pe stratul lui, ca sa nu se bata cu transformarea scrisa
        de mouse pe rig si cu translatia camerei de pe lume — un element poate avea
        o singura transformare. E si IN AFARA perspectivei, ca sa cuprinda si cerul:
        rotateZ e o rotatie in planul ecranului, deci arata la fel aplicata inainte
        sau dupa proiectie. Originea trebuie mutata pe punctul de focus — altfel
        imaginea deja proiectata s-ar roti in jurul centrului, nu al punctului de
        fuga, si toata scena ar balansa in loc sa se incline. */}
    <div
      className={cn('absolute inset-0', bank !== 0 && 'bank-turn')}
      style={{ '--bank': `${bank}deg`, transformOrigin: '50% 34%' } as React.CSSProperties}
    >
      {/* Cerul e desenat INAINTEA scenei 3D si in afara ei. Cat a stat inauntru, la
          z = 0, sortarea dupa adancime il punea mereu in FATA planetelor, care sunt
          la z negativ — se vedeau steluțe peste sfere. Aici e un fundal simplu: se
          deseneaza primul, deci planetele il acopera.
          Tot nu poate participa la intoarcerea de 180° (un panou plat dispare cand
          ajunge pe muchie, la 90°), asa ca traduce intoarcerea intr-o PANORAMARE
          orizontala. E lat de patru ecrane si tiluit, ca la capatul panoramarii
          (±100vw) sa nu se vada marginea. */}
      <div
        ref={skyRef}
        className='pointer-events-none absolute inset-0 overflow-hidden'
        style={{ transition: 'transform 220ms ease-out' }}
      >
        <div
          className='absolute -top-[20%] -bottom-[20%] left-[-150vw] flex w-[400vw]'
          style={{ transform: `translateX(${(-yaw / 180) * 100}vw)`, transition: TURN }}
        >
          {Array.from({ length: SKY_TILES }, (_, n) => (
            <div key={n} className='relative h-full w-1/4'>
              {/* Alt seed pe fiecare dala, altfel se vede acelasi desen repetat. */}
              <Starfield seed={n * 100000} count={160} />
            </div>
          ))}
        </div>
      </div>
      {/* Camera: perspective + perspective-origin 50% 34% = punctul de fixare al scenei */}
      <div className='pointer-events-none absolute inset-0 [perspective:1000px] [perspective-origin:50%_34%]'>
      {/* „Rig”: se inclina usor dupa mouse (rotateY/rotateX mici), peste glisajul lumii. */}
      <div
        ref={rigRef}
        className='absolute inset-0 [transform-style:preserve-3d]'
        style={{ transition: 'transform 220ms ease-out' }}
      >
        {/* Retragerea camerei cu FOCUS_Z e in spatiul CAMEREI, deci trebuie sa stea
            IN AFARA intoarcerii: daca ar fi inauntru, la 180° planeta focalizata
            ar ajunge fix in spatele camerei. */}
        <div
          className='absolute inset-0 [transform-style:preserve-3d]'
          style={{ transform: `translateZ(${-FOCUS_Z}px)` }}
        >
        {/* Intoarcerea: la „inapoi” nu dam cu spatele, ci rotim camera 180° si
            zburam tot cu fata. Axa de rotatie trece exact prin punctul unde ajunge
            planeta tinta (50% pe orizontala, z = 0), deci pozitia finala e aceeasi
            ca la un zbor normal — se schimba doar drumul pana acolo. */}
        <div
          className='absolute inset-0 [transform-style:preserve-3d]'
          style={{ transform: `rotateY(${yaw}deg)`, transition: TURN }}
        >
        {/* „Lumea” gliseaza spre planeta aleasa: negand x, y si z ale ei, planeta ajunge
            exact in centru, iar restul raman in jur, mai mici.
            Fara rotatie — planetele sunt deja cu fata la camera.

            Miscarea e taiata in doua straturi, fiindca un element are o singura
            transformare si aici ne trebuie doua ritmuri diferite:
              1. „ochirea” (x, y) — se termina in prima secunda, ca planeta tinta sa
                 stea in punctul de fuga (50% / 34%) tot restul zborului;
              2. „adancimea” (z) — dureaza 5s, cu pornire lenta si franare.
            Translatiile comuta intre ele, deci compunerea celor doua straturi da
            exact aceeasi pozitie ca o singura translatie pe toate trei axele. */}
        <div
          className='absolute left-1/2 top-[34%] [transform-style:preserve-3d]'
          style={{
            transform: `translate3d(${-BODIES[index].x}px, ${-BODIES[index].y}px, 0)`,
            // Vireaza si se aseaza pe tinta pana la 1s (cat tine si inclinarea).
            transition: TURN,
          }}
        >
        <div
          className='absolute left-0 top-0 [transform-style:preserve-3d]'
          style={{
            transform: `translate3d(0, 0, ${-BODIES[index].z}px)`,
            transition: `transform ${FLIGHT}`,
          }}
        >
          {stops.map((stop, i) => {
            const b = BODIES[i]
            // Planetele ramase in spate se sting. Care sunt „in spate” depinde de
            // orientarea camerei: intors, opririle urmatoare sunt cele din urma.
            const behind = reversed ? i > index : i < index
            const isNext = i === index + step
            const steps = Math.abs(i - index)
            // In ce parte de ecran cade planeta fata de cea focalizata. Eticheta se
            // ancoreaza spre exteriorul cadrului: centrata sub o planeta lipita de
            // marginea celei focalizate, ii intra pe sub sfera si se taie
            // („mber Studio” in loc de „Amber Studio”), fiindca planeta departata
            // se deseneaza in spate.
            const toTheRight = b.x >= BODIES[index].x
            return (
              <button
                key={i}
                type='button'
                aria-label={stop.company}
                onClick={() => onSelect(i)}
                // 'absolute' e obligatoriu: fara el butoanele raman in fluxul de layout
                // (curg una sub alta) si transformarile 3D pornesc din pozitii diferite,
                // stricandu-i constelatiei. 'relative' NU se pune aici — o clasa 'relative'
                // in CSS castiga fata de 'absolute' (aceeasi specificitate, regula mai
                // tarzie in fisier), deci planetele nu mai ies din flux. Eticheta absoluta
                // din interior nu are nevoie de 'relative': un element position:absolute
                // e deja bloc de referinta pentru copiii lui absoluti.
                className={cn(
                  'planet pointer-events-auto absolute [transform-style:preserve-3d] focus-visible:outline-none',
                  // Planeta pe care stai nu prinde clicuri. Apasata, `go()` iese
                  // imediat (destinatia = oprirea curenta), deci butonul ei nu face
                  // nimic — dar fiind cea mai mare si cea mai aproape de camera,
                  // acoperea vecinele: de pe RDS, trei sferturi din sfera EA cadeau
                  // sub zona ei de apasare, iar clicul pe EA ajungea la RDS.
                  (behind || i === index) && 'pointer-events-none',
                )}
                style={{
                  // translate(-50%, -50%) la mijloc: procente relative la propria
                  // marime a butonului (care acum = sfera), centreaza sfera exact
                  // pe punctul din constelatie.
                  // rotateY la final, in jurul propriului centru: anuleaza intoarcerea
                  // camerei, ca sferele si etichetele sa ramana cu fata la ecran (altfel
                  // textul s-ar citi in oglinda). Aceeasi tranzitie ca stratul de viraj,
                  // deci cele doua rotatii se anuleaza in fiecare cadru, nu doar la capete.
                  transform: `translate3d(${b.x}px, ${b.y}px, ${b.z}px) translate(-50%, -50%) rotateY(${-yaw}deg)`,
                  transition: `${TURN}, opacity 700ms ease`,
                  // Opacitatea sta pe o variabila, nu direct pe element: un stil
                  // inline bate orice clasa, deci :hover n-ar mai avea ce sa
                  // suprascrie. Urmatoarea oprire e vizibil mai aprinsa decat
                  // cele de dupa ea — asta e cea pe care poti da click acum.
                  ['--planet-op' as string]: behind ? 0 : i === index ? 1 : isNext ? 0.92 : 0.5,
                }}
              >
                <div
                  style={{ width: b.size, height: b.size, background: b.bg, boxShadow: b.glow }}
                  className='rounded-full'
                />
                {/* Zona de apasare, mai mare decat sfera: pe telefon planeta
                    urmatoare are vreo 40px, sub pragul de 44px pentru degete.
                    E copil al butonului, deci extinde tinta lui fara sa-i schimbe
                    cutia — cutia da centrarea prin translate(-50%, -50%).
                    Nu si pe planeta focalizata: marginea fiind procentuala, acolo
                    unde sfera e mare da cei mai multi pixeli — exact unde nu e
                    nevoie, si fix peste vecine. */}
                {i !== index && <span aria-hidden='true' className='absolute -inset-[35%]' />}
                {/* Inelul de vechime: cu cat mai multi ani, cu atat mai gros —
                    opt ani la FEG au alta greutate decat sase luni la Amber.
                    Grosimea e in px pe sfera de baza, deci se micsoreaza odata cu
                    ea in perspectiva si comparatia ramane valabila la orice
                    distanta. Neinclinat: un inel inclinat isi schimba grosimea
                    aparenta cu unghiul si ar strica tocmai citirea. Culoarea vine
                    din paleta planetei, nu alb — alb la 130% arata a inel de
                    selectie dintr-o interfata, nu a corp ceresc. */}
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute -inset-[9%] rounded-full'
                  style={{ border: `${(1.5 + b.years * 1.1).toFixed(1)}px solid ${b.ring}` }}
                />
                {/* Marca companiei, alba, centrata pe sfera. Butonul e deja intors
                    cu fata la camera (vezi rotateY de mai sus), deci nu mai are
                    nevoie de nimic in plus ca sa stea drept. */}
                <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
                  {'paths' in b.mark ? (
                    <svg viewBox={b.mark.box} aria-hidden='true' fill='#ffffff' style={markSize(b.size, b.mark.box)} className='drop-shadow'>
                      {b.mark.paths.map((d, n) => <path key={n} d={d} />)}
                    </svg>
                  ) : (
                    <span
                      aria-hidden='true'
                      className='font-mono-code font-bold leading-none text-white'
                      style={{ fontSize: markFontSize(b.size, b.mark.text.length), letterSpacing: '0.14em', textIndent: '0.14em' }}
                    >
                      {b.mark.text}
                    </span>
                  )}
                </div>
                {/* Eticheta de sub sfera: doar pentru planetele nefocalizate — numele
                    planetei alese e deja scris mare in panoul de jos.
                    E absoluta ca sa nu afecteze marimea cutiei butonului (doar sfera). */}
                {i !== index && (
                  <div
                    className={cn(
                      'planet-label absolute left-1/2 top-full whitespace-nowrap text-center text-xs font-medium text-white/70',
                      // Numele scris ramane doar pe oprirea urmatoare — cea pe care
                      // poti da click acum. Cinci etichete la marime constanta se
                      // calca una pe alta, fiindca planetele departate se string pe
                      // ecran. Restul se arata la hover.
                      isNext ? 'opacity-100' : 'opacity-0',
                    )}
                    style={{
                      // scale anuleaza perspectiva; translateY se aplica INAINTE
                      // de scale, deci distanta pana la sfera se scrie tot in
                      // unitati de lume (12 * k) ca sa iasa 12px pe ecran.
                      transform: `translateX(${toTheRight ? '-10%' : '-90%'}) translateY(${12 * labelScale(steps)}px) scale(${labelScale(steps)})`,
                      transformOrigin: `top ${toTheRight ? 'left' : 'right'}`,
                      // Aceeasi durata si curba ca zborul: la plecare distantele
                      // se schimba, iar fara tranzitie eticheta ar sari brusc.
                      transition: `transform ${FLIGHT}`,
                    }}
                  >
                    {stop.company}
                  </div>
                )}
              </button>
            )
          })}
        </div>
        </div>
        </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  )
}
