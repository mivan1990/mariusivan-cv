import { useEffect, useRef } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Cat de departe de camera sta planeta aleasa (distanta focala).
// Planeta aleasa trebuie sa fie mereu cea mai mare de pe ecran, de aceea sta mai
// aproape (FOCUS_Z mic) si diametrele de baza sunt apropiate intre ele.
const FOCUS_Z = 420

// Fara inel si fara rotatie: inelul de 1500px era mult mai lat decat ecranul, iar
// rotatia aducea planetele de pe partea opusa IN FATA camerei, unde se umflau si
// zboarau lateral (afar de cadru). Acum planetele stau intr-o constelatie compacta,
// la adancimi diferite, iar camera doar GLISEAZA (translateaza) spre cea aleasa.
// Pozitiile sunt alese ca planetele sa nu se suprapuna in nicio pozitie a camerei
// si ca intervalul de adancime sa ramana sub FOCUS_Z, altfel planeta cea mai
// apropiata trece in fata camerei.
const BODIES = [
  { x: -420, y: -120, z: -1200, size: 165, bg: 'radial-gradient(circle at 32% 30%, #7dd3fc, #0e7490 55%, #082f49)', glow: '0 0 60px rgba(56,189,248,0.45)' },
  { x: -180, y:  190, z: -1350, size: 185, bg: 'radial-gradient(circle at 32% 30%, #fdba74, #c2410c 55%, #431407)', glow: '0 0 70px rgba(249,115,22,0.45)' },
  { x:   60, y: -180, z: -1250, size: 155, bg: 'radial-gradient(circle at 32% 30%, #fde68a, #b45309 55%, #451a03)', glow: '0 0 55px rgba(245,158,11,0.45)' },
  { x:  330, y:  150, z: -1450, size: 175, bg: 'radial-gradient(circle at 32% 30%, #c4b5fd, #6d28d9 55%, #2e1065)', glow: '0 0 65px rgba(139,92,246,0.45)' },
  { x:  430, y: -120, z: -1300, size: 205, bg: 'radial-gradient(circle at 32% 30%, #a5b4fc, #4338ca 55%, #1e1b4b)', glow: '0 0 80px rgba(99,102,246,0.5)' },
]

export function Space({ index, onSelect }: { index: number; onSelect: (i: number) => void }) {
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
      {/* „Rig”: se inclina usor dupa mouse (rotateY/rotateX mici), peste glisajul lumii. */}
      <div
        ref={rigRef}
        className='absolute inset-0 [transform-style:preserve-3d]'
        style={{ transition: 'transform 220ms ease-out' }}
      >
        {/* „Lumea” gliseaza spre planeta aleasa: negand x, y si z ale ei, planeta ajunge
            exact in centru, la z = -FOCUS_Z, iar restul raman in jur, mai mici.
            Fara rotatie — planetele sunt deja cu fata la camera. */}
        <div
          className='absolute left-1/2 top-[34%] [transform-style:preserve-3d]'
          style={{
            transform: `translate3d(${-BODIES[index].x}px, ${-BODIES[index].y}px, ${-BODIES[index].z - FOCUS_Z}px)`,
            transition: 'transform 1400ms cubic-bezier(0.22, 0.61, 0.36, 1)',
          }}
        >
          {/* Traseul punctat intre planete: 4 segmente, generate din perechi consecutive. */}
          {Array.from({ length: BODIES.length - 1 }, (_, i) => {
            const a = BODIES[i]
            const b = BODIES[i + 1]
            const dx = b.x - a.x
            const dy = b.y - a.y
            const dz = b.z - a.z
            const len = Math.sqrt(dx * dx + dy * dy + dz * dz)
            // yaw foloseste -dz: in CSS, z creste spre observator, deci o deplasare
            // spre adancime (dz negativ) inseamna rotatie pozitiva in jurul lui Y.
            const yaw = (Math.atan2(-dz, dx) * 180) / Math.PI
            const pitch = (Math.asin(dy / len) * 180) / Math.PI
            return (
              <div
                key={i}
                aria-hidden='true'
                className='pointer-events-none absolute h-px origin-left [transform-style:preserve-3d]'
                style={{
                  width: len,
                  // Ordinea conteaza: mai intai originea in prima planeta, apoi rotatiile
                  // (yaw, apoi pitch). 'origin-left' pune originea transformarii la capatul
                  // din stanga al barei — asa capatul cade fix pe prima planeta, iar bara se
                  // intinde singura spre a doua. Fara ea, rotatiile s-ar face in jurul
                  // CENTRULUI barei (transform-origin implicit), mutandu-le ambele capete.
                  transform: `translate3d(${a.x}px, ${a.y}px, ${a.z}px) rotateY(${yaw}deg) rotateZ(${pitch}deg)`,
                  backgroundImage: 'repeating-linear-gradient(to right, rgba(255,255,255,0.5) 0 5px, transparent 5px 16px)',
                }}
              />
            )
          })}
          {stops.map((stop, i) => {
            const b = BODIES[i]
            return (
              <button
                key={i}
                type='button'
                aria-label={stop.company}
                onClick={() => onSelect(i)}
                className='pointer-events-auto absolute relative [transform-style:preserve-3d] focus-visible:outline-none transition-opacity duration-700'
                style={{
                  // translate(-50%, -50%) la final: procente relative la propria
                  // marime a butonului (care acum = sfera), centreaza sfera exact
                  // pe punctul din constelatie.
                  transform: `translate3d(${b.x}px, ${b.y}px, ${b.z}px) translate(-50%, -50%)`,
                  opacity: i === index ? 1 : 0.45,
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
  )
}
