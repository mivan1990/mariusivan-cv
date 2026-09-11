import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import { Space, bankAngle, turnSide } from '@/components/journey/space';
import { WarpStreaks } from '@/components/journey/warp';

interface JourneyProps {
  // Cheiam la final (butonul de la ultima oprire sau butonul de iesire)
  onFinish: () => void;
}

// Ecranul de "calatorie" prin cariera — o oprire = o planeta
export function Journey({ onFinish }: JourneyProps) {
  const { t } = useLanguage();
  const [i, setI] = useState(0); // indexul opririi curente (conduce camera si scena)
  const [panelI, setPanelI] = useState(0); // indexul opririi afisata in panoul de text (se schimba la sosire)
  const [panelOn, setPanelOn] = useState(true); // panoul e ascuns doar cat dureaza schimbul de text, nu tot zborul
  const [warp, setWarp] = useState(false); // warp in desfasurare (dârele sunt montate)
  const [dir, setDir] = useState<1 | -1>(1); // ultima directie, pt. animatia de sosire
  const [bank, setBank] = useState(0); // unghiul de inclinare in viraj (aplicat scenei si dârelor)
  const [yaw, setYaw] = useState(0); // orientarea camerei: 0 = spre opririle urmatoare, ±180 = intoarsa
  const lockRef = useRef(0); // timestamp-ul ultimei deplasare (o singura pe rand)
  const touchYRef = useRef<number | null>(null); // Y-ul de la touchstart, pt. swipe

  // O singura functie de navigare: camera pleaca imediat, textul se schimba
  // spre finalul zborului, iar warp-ul se stinge la final. Lock pe 5200ms
  // impiedica deplasari inlantuite.
  //
  // „Inapoi” nu inseamna mers cu spatele: camera se intoarce 180° si zboara tot
  // cu fata. Intoarcerea se face o singura data, cand se schimba sensul — doua
  // opriri inapoi la rand inseamna zbor drept, nu inca o piruetă.
  const go = (target: number, d: 1 | -1) => {
    const now = Date.now();
    if (warp || now - lockRef.current < 5200) return // o singura deplasare pe rand
    if (target === i || target < 0 || target >= t.journey.stops.length) return
    const nextYaw = d === -1 ? (yaw !== 0 ? yaw : 180 * turnSide(i, target)) : 0
    const turning = nextYaw !== yaw
    lockRef.current = now
    setDir(d)
    setWarp(true)
    setBank(bankAngle(i, target, { reversed: nextYaw !== 0, turning }))
    setYaw(nextYaw)
    setI(target) // camera porneste in aceeasi clipa cu warp-ul
    setPanelOn(false)
    // 1200ms: „ochirea” (x, y) se termina la 1s, deci planeta tinta sta deja in
    // punctul de focus si se vede spre cine zbori — de aici incolo n-ai de ce sa
    // mai astepti textul. Mai devreme de atat ar aparea in timpul virajului.
    //
    // Panoul se leaga de ACEST moment, nu de sfarsitul warp-ului. Cat a fost legat
    // de `warp`, textul se schimba pe la 1.2s dar in spatele unui parinte la
    // opacitate 0, si reaparea abia la 5.1s — masurat: 4.7 secunde de ecran gol.
    window.setTimeout(() => { setPanelI(target); setPanelOn(true) }, 1200)
    window.setTimeout(() => { setWarp(false); setBank(0) }, 5000)
  };

  const travel = (d: 1 | -1) => go(i + d, d);

  // Salt direct la oprirea n (indicatorii rotunzi) — aceeasi logica de zbor,
  // cu directia dedusa din pozitia curenta
  const travelTo = (n: number) => go(n, n > i ? 1 : -1);

  // Navigare cu tastatura: sagetile stanga/dreapta si sus/jos
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') travel(1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') travel(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const stop = t.journey.stops[panelI];
  const isLast = i === t.journey.stops.length - 1;

  return (
    <div
      className='relative flex min-h-screen flex-col items-center justify-start overflow-hidden bg-black px-5 text-white'
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
      {/* Dungi de warp — montate si demontate la fiecare deplasare, deci
          animatia porneste de la capat de fiecare data */}
      {warp && (
        <div
          className={cn('pointer-events-none absolute -inset-[20%]', bank !== 0 && 'bank-turn')}
          style={{ '--bank': `${bank}deg` } as React.CSSProperties}
        >
          <WarpStreaks />
        </div>
      )}

      {/* Scena 3D: cele 5 planete pe un culoar in adancime, camera zboara spre oprirea aleasa */}
      <Space index={i} bank={bank} yaw={yaw} onSelect={(n) => travelTo(n)} />

      {/* Panoul cu text, mutat jos pe ecran */}
      <div className='pointer-events-none absolute inset-x-0 bottom-0 z-10 px-5 pb-10 bg-gradient-to-t from-black via-black/85 to-transparent pt-24'>
        <div
          className={cn(
            'pointer-events-auto mx-auto max-w-2xl text-center transition-opacity duration-500 motion-reduce:transition-none',
            panelOn ? 'opacity-100' : 'opacity-0',
          )}
        >
          {/* key pe stop.id => re-montare la fiecare schimbare, declanseaza animatia de sosire */}
          <div
            key={stop.id}
            className={cn('flex flex-col items-center text-center', dir === 1 ? 'arrive-fwd' : 'arrive-back')}
          >
            <p className='mt-8 font-mono-code text-xs uppercase tracking-[0.2em] text-white/50'>
              {t.journey.stopLabel} {i + 1} / {t.journey.stops.length}
            </p>
            <h2 className='mt-3 text-xl font-bold sm:text-2xl'>{stop.company}</h2>
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
                onClick={() => travelTo(n)}
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
