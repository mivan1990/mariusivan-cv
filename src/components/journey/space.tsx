import { useLanguage } from '@/hooks/useLanguage'

// Cat de departe de camera sta planeta aleasa (distanta focala).
// Planeta aleasa trebuie sa fie mereu cea mai mare de pe ecran, de aceea sta mai
// aproape (FOCUS_Z mic) si diametrele de baza sunt apropiate intre ele.
const FOCUS_Z = 420

// Fara inel si fara rotatie: inelul de 1500px era mult mai lat decat ecranul, iar
// rotatia aducea planetele de pe partea opusa IN FATA camerei, unde se umflau si
// zboarau lateral (afar de cadru). Acum planetele stau intr-o constelatie compacta,
// la adancimi diferite, iar camera doar GLISEAZA (translateaza) spre cea aleasa.
// Diferentele de z sunt mici ca nimeni sa nu ajunga in fata camerei.
const BODIES = [
  { x: -400, y: -150, z: -1000, size: 190, bg: 'radial-gradient(circle at 32% 30%, #7dd3fc, #0e7490 55%, #082f49)', glow: '0 0 60px rgba(56,189,248,0.45)' },
  { x:  380, y:  120, z: -1250, size: 220, bg: 'radial-gradient(circle at 32% 30%, #fdba74, #c2410c 55%, #431407)', glow: '0 0 80px rgba(249,115,22,0.45)' },
  { x: -300, y:  190, z: -1450, size: 175, bg: 'radial-gradient(circle at 32% 30%, #fde68a, #b45309 55%, #451a03)', glow: '0 0 55px rgba(245,158,11,0.45)' },
  { x:  420, y: -190, z: -1150, size: 200, bg: 'radial-gradient(circle at 32% 30%, #c4b5fd, #6d28d9 55%, #2e1065)', glow: '0 0 70px rgba(139,92,246,0.45)' },
  { x:    0, y:   40, z: -1500, size: 240, bg: 'radial-gradient(circle at 32% 30%, #a5b4fc, #4338ca 55%, #1e1b4b)', glow: '0 0 90px rgba(99,102,241,0.5)' },
]

export function Space({ index, onSelect }: { index: number; onSelect: (i: number) => void }) {
  const { t } = useLanguage()
  const stops = t.journey.stops

  return (
    // Camera: perspective + perspective-origin 50% 34% = punctul de fixare al scenei
    <div className='pointer-events-none absolute inset-0 [perspective:1000px] [perspective-origin:50%_34%]'>
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
        {stops.map((stop, i) => {
          const b = BODIES[i]
          return (
            <button
              key={i}
              type='button'
              aria-label={stop.company}
              onClick={() => onSelect(i)}
              className='pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] focus-visible:outline-none transition-opacity duration-700'
              style={{
                transform: `translate3d(${b.x}px, ${b.y}px, ${b.z}px)`,
                opacity: i === index ? 1 : 0.45,
              }}
            >
              <div
                style={{ width: b.size, height: b.size, background: b.bg, boxShadow: b.glow }}
                className='rounded-full'
              />
              {/* Eticheta de sub sfera: doar pentru planetele nefocalizate — numele
                  planetei alese e deja scris mare in panoul de jos. */}
              {i !== index && <div className='mt-3 whitespace-nowrap text-center text-xs font-medium text-white/70'>{stop.company}</div>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
