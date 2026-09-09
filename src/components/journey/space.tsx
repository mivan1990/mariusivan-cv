import React, { useEffect, useRef } from 'react'
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

// Fara inel si fara rotatie: inelul de 1500px era mult mai lat decat ecranul, iar
// rotatia aducea planetele de pe partea opusa IN FATA camerei, unde se umflau si
// zboarau lateral (afar de cadru). Acum planetele stau pe un culoar in adancime,
// la 4000px una de alta, ca zborul sa acopere distanta reala si planeta tinta sa
// creasca vizibil. Planetele deja depasite sunt ascunse (opacitate 0), deci nu
// pot aparea uriase in fata camerei.
const BODIES = [
  { x: -220, y: -110, z:  -1200, size: 200, bg: 'radial-gradient(circle at 32% 30%, #7dd3fc, #0e7490 55%, #082f49)', glow: '0 0 70px rgba(56,189,248,0.45)' },
  { x:  260, y:  130, z:  -5200, size: 210, bg: 'radial-gradient(circle at 32% 30%, #fdba74, #c2410c 55%, #431407)', glow: '0 0 75px rgba(249,115,22,0.45)' },
  { x: -280, y:  120, z:  -9200, size: 195, bg: 'radial-gradient(circle at 32% 30%, #fde68a, #b45309 55%, #451a03)', glow: '0 0 70px rgba(245,158,11,0.45)' },
  { x:  240, y: -140, z: -13200, size: 205, bg: 'radial-gradient(circle at 32% 30%, #c4b5fd, #6d28d9 55%, #2e1065)', glow: '0 0 75px rgba(139,92,246,0.45)' },
  { x:    0, y:   40, z: -17200, size: 240, bg: 'radial-gradient(circle at 32% 30%, #a5b4fc, #4338ca 55%, #1e1b4b)', glow: '0 0 90px rgba(99,102,246,0.5)' },
]

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
  const reversed = yaw !== 0

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
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [reduced])

  return (
    // Camera: perspective + perspective-origin 50% 34% = punctul de fixare al scenei
    <div className='pointer-events-none absolute inset-0 [perspective:1000px] [perspective-origin:50%_34%]'>
      {/* Virajul (bank) sta pe stratul lui, ca sa nu se bata cu transformarea scrisa
          de mouse pe rig si cu translatia camerei de pe lume — un element poate
          avea o singura transformare. */}
      <div
        className={cn('absolute inset-0 [transform-style:preserve-3d]', bank !== 0 && 'bank-turn')}
        style={{ '--bank': `${bank}deg` } as React.CSSProperties}
      >
      {/* „Rig”: se inclina usor dupa mouse (rotateY/rotateX mici), peste glisajul lumii. */}
      <div
        ref={rigRef}
        className='absolute inset-0 [transform-style:preserve-3d]'
        style={{ transition: 'transform 220ms ease-out' }}
      >
        {/* Cerul sta in scena (sub rig), altfel ramane nemiscat cand camera vireaza:
            primeste si inclinarea de viraj, si privirea de mouse.
            Nu poate insa participa la intoarcerea de 180°: un panou plat dispare
            cand ajunge pe muchie, la 90°. Asa ca sta cu fata la camera si traduce
            intoarcerea intr-o PANORAMARE orizontala. E lat de patru ecrane si tiluit,
            ca la capatul panoramarii (±100vw) sa nu se vada marginea. */}
        <div
          className='pointer-events-none absolute -top-[20%] -bottom-[20%] left-[-150vw] flex w-[400vw]'
          style={{ transform: `translateX(${(-yaw / 180) * 100}vw)`, transition: TURN }}
        >
          {Array.from({ length: SKY_TILES }, (_, n) => (
            <div key={n} className='relative h-full w-1/4'>
              {/* Alt seed pe fiecare dala, altfel se vede acelasi desen repetat. */}
              <Starfield seed={n * 100000} count={160} />
            </div>
          ))}
        </div>
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
            // Pornire lenta, accelerare intre 12% si 36% din zbor, frânare pana la
            // 46% (adica 2.3s) unde e deja 93% din drum, apoi o asezare foarte lenta.
            // 'linear()' cere Chrome 113+, Safari 17.2+, Firefox 112+; pe browsere
            // mai vechi se ignora si se foloseste easing-ul implicit, deci
            // degradarea e blanda.
            transition:
              'transform 5000ms linear(0, 0.015 6%, 0.06 12%, 0.16 18%, 0.32 24%, 0.52 30%, 0.70 36%, 0.84 41%, 0.93 46%, 0.965 55%, 0.985 70%, 1)',
          }}
        >
          {stops.map((stop, i) => {
            const b = BODIES[i]
            // Planetele ramase in spate se sting. Care sunt „in spate” depinde de
            // orientarea camerei: intors, opririle urmatoare sunt cele din urma.
            const behind = reversed ? i > index : i < index
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
                  'pointer-events-auto absolute [transform-style:preserve-3d] focus-visible:outline-none',
                  behind && 'pointer-events-none',
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
                  opacity: behind ? 0 : i === index ? 1 : 0.75,
                }}
              >
                <div
                  style={{ width: b.size, height: b.size, background: b.bg, boxShadow: b.glow }}
                  className='rounded-full'
                />
                {/* Eticheta de sub sfera: doar pentru planetele nefocalizate — numele
                    planetei alese e deja scris mare in panoul de jos.
                    E absoluta ca sa nu afecteze marimea cutiei butonului (doar sfera). */}
                {i !== index && <div className='absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap text-center text-xs font-medium text-white/70'>{stop.company}</div>}
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
  )
}
