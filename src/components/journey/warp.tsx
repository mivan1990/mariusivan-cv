import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Efect de starfield/warp pe canvas: fiecare stea are propriul z (adancime),
// se apropie (fwd) sau se indeparteaza (back) de camera in fiecare cadru si
// se proiecteaza in 2D cu 'x * FOCAL / z'. Dara (streak) e linia dintre
// pozitia stelei de acum cateva cadre (zPrev) si pozitia curenta — asa
// apare senzatia de viteza. Un SVG static scalat cu CSS arata doar ca un
// desen care se mareste, nu ca un zbor.
//
// Canvas + requestAnimationFrame, nu SVG + keyframes:
// - canvas-ul se sterge cu clearRect (NU se picteaza un dreptunghi negru),
//   ca sa ramana transparent si sa lasa vizibile stelele din spate;
// - viteza urmeaza o rampa sinus 0 -> 1 -> 0: accelereaza, apoi franeaza.

const STARS = 820; // numarul de stele din camp; ales pentru suprafata canvas-ului, care e mai
// mare decat ecranul din cauza overscan-ului (vezi OVERSCAN); la 420 densitatea pe ecran se injumatatea
const DEPTH = 1400; // adancimea maxima a campului (z)
const FOCAL = 320; // lungimea focala de proiectie
const DURATION = 5000; // durata totala a warp-ului, ms
const TRAIL = 3; // cat de "in urma" e punctul de plecare al darei (in z)
const SPEED = 30; // viteza maxima de apropiere/departare pe cadru
// Trebuie sa fie identic cu 'perspective-origin' din space.tsx (50% 34%), altfel stelele
// tasnesc din alt punct decat cel spre care converg planetele.
const ORIGIN_Y = 0.34
// Cat depaseste canvas-ul ecranul, pe fiecare latura (vezi journey.tsx)
const OVERSCAN = 0.2

interface WarpStreaksProps {
  // directia warp-ului: 'fwd' = zbor inainte (stelele se apropie),
  // 'back' = inapoi (stelele se indeparteaza)
  dir: 'fwd' | 'back';
}

export function WarpStreaks({ dir }: WarpStreaksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respectam preferinta de reduced-motion: fara animatie, fara desen
    if (reduced) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // capete rotunjite pentru dungi — o singura data, dupa ce avem contextul
    ctx.lineCap = 'round';

    // w/h = dimensiunile CSS ale canvas-ului (clientWidth/clientHeight);
    // bufferul e marit cu devicePixelRatio (max 2) ca sa fie sharp pe ecrane retina
    let w = canvas.clientWidth;
    let h = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Fiecare stea are propriul z: daca toate ar avea acelasi z, miscarea
    // ar fi un simplu zoom (toate se maresc la fel) — fara adancime proprie
    // nu exista efect de viteza.
    const stars = Array.from({ length: STARS }, () => ({
      x: (Math.random() - 0.5) * 2 * w, // offset fata de centru, orizontal
      y: (Math.random() - 0.5) * 2 * h, // offset fata de centru, vertical
      z: 1 + Math.random() * DEPTH, // adancimea proprie a stelei
    }));

    // Redimensionare la resize: refacem bufferul si transformul
    const onResize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener('resize', onResize);

    let raf = 0;
    const start = performance.now();

    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // dârele urmeaza viteza reala: varf pe la 1.5s, stinse pe la 3s, cand camera a ajuns
      const ramp = Math.sin(Math.PI * Math.min(1, t / 0.6));
      const speed = SPEED * ramp;

      // IMPORTANT: stergem canvas-ul (transparent), NU pictam un dreptunghi
      // negru — altfel canvas-ul devine un voal opac peste stelele din spate
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      // ORIGIN_Y e masurat fata de ECRAN; canvas-ul e mai mare, deci fractia se recalculeaza:
      // (OVERSCAN + ORIGIN_Y) / (1 + 2 * OVERSCAN)
      const cy = h * ((OVERSCAN + ORIGIN_Y) / (1 + 2 * OVERSCAN));

      for (const s of stars) {
        // inainte: se apropie (z scade); inapoi: se departeaza (z creste)
        if (dir === 'fwd') {
          s.z -= speed;
          if (s.z < 20) {
            // a trecut de camera: o re-sparam departe, pe o pozitie noua
            s.x = (Math.random() - 0.5) * 2 * w;
            s.y = (Math.random() - 0.5) * 2 * h;
            s.z = DEPTH;
          }
        } else {
          s.z += speed;
          if (s.z > DEPTH) {
            // a plecat din camp: o aducem inapoi, aproape
            s.x = (Math.random() - 0.5) * 2 * w;
            s.y = (Math.random() - 0.5) * 2 * h;
            s.z = 20;
          }
        }

        // pozitia de acum cateva cadre (inapoi pe axa z) — de aici porneste dara
        const zPrev = dir === 'fwd' ? s.z + speed * TRAIL : s.z - speed * TRAIL;
        if (zPrev < 20) continue; // saram peste: altfel dare ar iesi uriasa

        // proiectie perspective: 'x * FOCAL / z' fata de centrul canvas-ului
        const sx = cx + (s.x * FOCAL) / s.z;
        const sy = cy + (s.y * FOCAL) / s.z;
        const px = cx + (s.x * FOCAL) / zPrev;
        const py = cy + (s.y * FOCAL) / zPrev;

        // k: 0 = departe, 1 = aproape — controleaza grosimea si opacitatea
        const k = 1 - s.z / DEPTH;
        ctx.lineWidth = 0.4 + k * 2.2; // stelele apropiate sunt mai groase
        ctx.strokeStyle = `rgba(255,255,255,${(Math.min(1, k * 1.4) * ramp).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }

      // continuam bucla cat timp nu s-a terminat warp-ul
      if (t < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // curatare la demontare: oprim bucla si scoatem listenerul de resize
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [dir, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden='true'
      className='pointer-events-none absolute inset-0 h-full w-full'
    />
  );
}
