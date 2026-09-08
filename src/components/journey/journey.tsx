import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import { Starfield } from '@/components/journey/starfield';

// Planetele pentru cele 5 opriri, in ordine (fundal + glow)
const PLANETS = [
  { bg: 'radial-gradient(circle at 32% 30%, #7dd3fc, #0e7490 55%, #082f49)', glow: '0 0 90px rgba(56,189,248,0.35)' },
  { bg: 'radial-gradient(circle at 32% 30%, #fdba74, #c2410c 55%, #431407)', glow: '0 0 90px rgba(249,115,22,0.35)' },
  { bg: 'radial-gradient(circle at 32% 30%, #fde68a, #b45309 55%, #451a03)', glow: '0 0 90px rgba(245,158,11,0.35)' },
  { bg: 'radial-gradient(circle at 32% 30%, #c4b5fd, #6d28d9 55%, #2e1065)', glow: '0 0 90px rgba(139,92,246,0.35)' },
  { bg: 'radial-gradient(circle at 32% 30%, #a5b4fc, #4338ca 55%, #1e1b4b)', glow: '0 0 90px rgba(99,102,241,0.40)' },
];

interface JourneyProps {
  // Cheiam la final (butonul de la ultima oprire sau butonul de iesire)
  onFinish: () => void;
}

// Ecranul de "calatorie" prin cariera — o oprire = o planeta
export function Journey({ onFinish }: JourneyProps) {
  const { t } = useLanguage();
  const [i, setI] = useState(0); // indexul opririi curente
  const [warp, setWarp] = useState<null | 'fwd' | 'back'>(null); // directia activa a warp-ului
  const [dir, setDir] = useState<1 | -1>(1); // ultima directie, pt. animatia de sosire
  const lockRef = useRef(0); // timestamp-ul ultimei deplasare (o singura pe rand)
  const touchYRef = useRef<number | null>(null); // Y-ul de la touchstart, pt. swipe

  // O singura functie de navigare: porneste warp-ul, schimba planeta in
  // mijlocul lui, apoi elibereaza. Lock pe 780ms impiedica deplasari inlantuite.
  const travel = (d: 1 | -1) => {
    const now = Date.now();
    if (warp || now - lockRef.current < 780) return // o singura deplasare pe rand
    const target = i + d;
    if (target < 0 || target >= t.journey.stops.length) return
    lockRef.current = now
    setDir(d)
    setWarp(d === 1 ? 'fwd' : 'back')
    window.setTimeout(() => setI(target), 260) // schimba planeta in mijlocul warp-ului
    window.setTimeout(() => setWarp(null), 760)
  };

  // Navigare cu tastatura: sagetile stanga/dreapta si sus/jos
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') travel(1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') travel(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const stop = t.journey.stops[i];
  const isLast = i === t.journey.stops.length - 1;

  return (
    <div
      className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-5 text-white'
      onWheel={(e) => travel(e.deltaY > 0 ? 1 : -1)}
      onTouchStart={(e) => {
        touchYRef.current = e.touches[0].clientY;
      }}
      onTouchEnd={(e) => {
        if (touchYRef.current === null) return;
        const delta = touchYRef.current - e.changedTouches[0].clientY;
        touchYRef.current = null;
        if (Math.abs(delta) > 40) travel(delta > 0 ? 1 : -1); // deget in sus = fwd, in jos = back
      }}
    >
      {/* Fundalul de stele (absolut, in spate) — primeste clasa de warp in functie de directie */}
      <div className={cn('absolute inset-0', warp === 'fwd' && 'warp-fwd', warp === 'back' && 'warp-back')}>
        <Starfield />
      </div>

      <div className='relative z-10 w-full max-w-3xl'>
        {/* key pe stop.id => re-montare la fiecare schimbare, declanseaza animatia de sosire */}
        <div
          key={stop.id}
          className={cn('flex flex-col items-center text-center', dir === 1 ? 'arrive-fwd' : 'arrive-back')}
        >
          {/* Planeta opririi curente */}
          <div
            className='mx-auto h-40 w-40 rounded-full sm:h-56 sm:w-56'
            style={{ background: PLANETS[i].bg, boxShadow: PLANETS[i].glow }}
          />

          {/* Blocul de text, centrat */}
          <p className='mt-8 font-mono-code text-xs uppercase tracking-[0.2em] text-white/50'>
            {t.journey.stopLabel} {i + 1} / {t.journey.stops.length}
          </p>
          <h2 className='mt-3 text-2xl font-bold sm:text-4xl'>{stop.company}</h2>
          <p className='mt-1 text-sm text-white/60'>
            {stop.span} · {stop.location}
          </p>

          {/* Rolurile din companie */}
          <ul className='mt-5 space-y-1'>
            {stop.roles.map((role) => (
              <li key={role.title} className='flex flex-col items-center'>
                <span className='text-sm font-semibold text-white'>{role.title}</span>
                <span className='text-xs text-white/50'>{role.period}</span>
              </li>
            ))}
          </ul>

          {/* Descrierea opririi */}
          <p className='mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/70'>{stop.blurb}</p>
        </div>

        {/* Controalele de navigare */}
        <div className='mt-9 flex flex-wrap items-center justify-center gap-3'>
          {/* Inapoi — doar daca nu suntem la prima oprire */}
          {i > 0 && (
            <button
              type='button'
              onClick={() => travel(-1)}
              className='rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40'
            >
              {t.journey.prev}
            </button>
          )}

          {/* Butonul principal: "next" pe orice oprire, "land" pe ultima */}
          <button
            type='button'
            onClick={isLast ? onFinish : () => travel(1)}
            className='rounded-lg bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60'
          >
            {isLast ? t.journey.land : t.journey.next}
          </button>
        </div>

        {/* Indicatorii — se poate sari direct la orice oprire, prin aceeasi logica de warp */}
        <div className='mt-6 flex items-center justify-center gap-2'>
          {t.journey.stops.map((s, n) => (
            <button
              key={s.id}
              type='button'
              aria-label={`${t.journey.stopLabel} ${n + 1}`}
              onClick={() => {
                const now = Date.now();
                if (warp || now - lockRef.current < 780) return // aceeasi protectie de lock
                if (n === i) return
                lockRef.current = now
                setDir(n > i ? 1 : -1)
                setWarp(n > i ? 'fwd' : 'back')
                window.setTimeout(() => setI(n), 260)
                window.setTimeout(() => setWarp(null), 760)
              }}
              className={cn(
                'h-2 w-2 rounded-full transition',
                n === i ? 'bg-white' : 'bg-white/25',
              )}
            />
          ))}
        </div>

        {/* Indiciu discret de navigare cu scroll */}
        <p className='mt-5 text-center font-mono-code text-[11px] uppercase tracking-[0.18em] text-white/35'>
          {t.journey.scrollHint}
        </p>
      </div>

      {/* Buton discret de iesire, in dreapta sus */}
      <button
        type='button'
        onClick={onFinish}
        className='absolute right-5 top-5 z-10 rounded-lg px-3 py-2 text-xs font-medium text-white/50 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40'
      >
        {t.journey.skip}
      </button>
    </div>
  );
}
