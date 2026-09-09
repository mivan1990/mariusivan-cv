import React, { useEffect, useRef } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'
import { Starfield } from '@/components/journey/starfield'

// Cat de departe de camera sta planeta aleasa (distanta focala).
// Planeta aleasa trebuie sa fie mereu cea mai mare de pe ecran, de aceea sta mai
// aproape (FOCUS_Z mic) si diametrele de baza sunt apropiate intre ele.
const FOCUS_Z = 420

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

// Cat se inclina camera intrand in viraj: spre dreapta inseamna rotatie inversa a continutului.
export function bankAngle(from: number, to: number): number {
  const dx = BODIES[to].x - BODIES[from].x
  if (dx === 0) return 0
  return dx > 0 ? -14 : 14
}

export function Space({ index, bank, onSelect }: { index: number; bank: number; onSelect: (i: number) => void }) {
  const { t } = useLanguage()
  const stops = t.journey.stops
  const reduced = useReducedMotion()
  const rigRef = useRef<HTMLDivElement>(null)

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
            primeste si inclinarea de viraj, si privirea de mouse. */}
        {/* Cerul e mai mare decat ecranul, ca la inclinare colturile sa nu ramana goale. */}
        <div className='pointer-events-none absolute -inset-[20%]'>
          <Starfield />
        </div>
        {/* „Lumea” gliseaza spre planeta aleasa: negand x, y si z ale ei, planeta ajunge
            exact in centru, la z = -FOCUS_Z, iar restul raman in jur, mai mici.
            Fara rotatie — planetele sunt deja cu fata la camera. */}
        <div
          className='absolute left-1/2 top-[34%] [transform-style:preserve-3d]'
          style={{
            transform: `translate3d(${-BODIES[index].x}px, ${-BODIES[index].y}px, ${-BODIES[index].z - FOCUS_Z}px)`,
            transition: 'transform 5000ms cubic-bezier(0.45, 0, 0.2, 1)',
          }}
        >
          {stops.map((stop, i) => {
            const b = BODIES[i]
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
                  'pointer-events-auto absolute [transform-style:preserve-3d] focus-visible:outline-none transition-opacity duration-700',
                  i < index && 'pointer-events-none',
                )}
                style={{
                  // translate(-50%, -50%) la final: procente relative la propria
                  // marime a butonului (care acum = sfera), centreaza sfera exact
                  // pe punctul din constelatie.
                  transform: `translate3d(${b.x}px, ${b.y}px, ${b.z}px) translate(-50%, -50%)`,
                  opacity: i < index ? 0 : i === index ? 1 : 0.75,
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
  )
}
