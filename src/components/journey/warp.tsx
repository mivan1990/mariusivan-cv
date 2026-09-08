import { cn } from '@/lib/utils';

// Dungi de lumina pentru efectul de warp: cand se schimba planeta,
// 90 de linii radiale taresc din centru spre margini (fwd) sau din
// margini spre centru (back), iar scalarea stratului le face sa para
// ca zboara pe langa camera.
//
// Fara canvas, fara requestAnimationFrame: un singur <svg> cu <line>-uri,
// pozitiile generate determinist (fara Math.random in render), deci
// dungile raman identice la fiecare re-randare.

// Generator pseudo-aleatoriu simplu si determinist:
// acelasi index da mereu aceeasi valoare in 0..1
const rand = (n: number) => {
  const x = Math.sin(n * 91.7) * 43758.5453;
  return x - Math.floor(x);
};

// Numarul total de dungi de warp
const STREAK_COUNT = 90;

interface WarpStreaksProps {
  // directia warp-ului: 'fwd' = zbor inainte (zoom in), 'back' = inapoi (zoom out)
  dir: 'fwd' | 'back';
}

export function WarpStreaks({ dir }: WarpStreaksProps) {
  // Fiecare dunga: unghi pe cerc, raza de plecare si lungime derivate
  // din indexul ei, cu offset-uri diferite ca valorile sa nu fie corelate
  const streaks = Array.from({ length: STREAK_COUNT }, (_, i) => {
    const ang = rand(i) * Math.PI * 2; // unghiul pe cerc
    const r0 = 90 + rand(i + 500) * 300; // de unde incepe (in jurul centrului)
    const len = 40 + rand(i + 1500) * 190; // cat e de lunga
    // Dungile sunt orientate radial fata de centru (500,500 in viewBox):
    // scalarea stratului le face sa para ca zboara pe langa camera
    const x1 = Math.cos(ang) * r0;
    const y1 = Math.sin(ang) * r0;
    const x2 = Math.cos(ang) * (r0 + len);
    const y2 = Math.sin(ang) * (r0 + len);

    return (
      <line
        key={i}
        x1={x1.toFixed(2)}
        y1={y1.toFixed(2)}
        x2={x2.toFixed(2)}
        y2={y2.toFixed(2)}
        stroke='#ffffff'
        strokeLinecap='round'
        strokeWidth={(0.8 + rand(i + 2500) * 1.6).toFixed(2)}
        opacity={(0.25 + rand(i + 3500) * 0.6).toFixed(2)}
      />
    );
  });

  return (
    <svg
      className={cn('pointer-events-none absolute inset-0 h-full w-full', dir === 'fwd' ? 'warp-streaks-fwd' : 'warp-streaks-back')}
      viewBox='-500 -500 1000 1000'
      preserveAspectRatio='xMidYMid slice'
      aria-hidden='true'
    >
      {streaks}
    </svg>
  );
}
