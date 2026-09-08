// Fundal de spatiu pentru sectiunea "calatoria printre planete":
// stele mici, albe, pe fond negru — cateva clipesc incet.
//
// Fara canvas, fara requestAnimationFrame: un singur <svg> cu <circle>-uri,
// pozitiile generate determinist (fara Math.random in render), deci stelele
// raman fixe la fiecare re-randare.

// Generator pseudo-aleatoriu simplu si determinist:
// acelasi index da mereu aceeasi valoare in 0..1
const rand = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

// Numarul total de stele din fundal
const STAR_COUNT = 220;

export function Starfield() {
  // Fiecare stea: pozitie, raza si opacitate derivate din indexul ei,
  // cu offset-uri diferite ca valorile sa nu fie corelate
  const stars = Array.from({ length: STAR_COUNT }, (_, i) => {
    const cx = rand(i) * 1000; // pozitie pe orizontala, 0..1000
    const cy = rand(i + 1000) * 1000; // pozitie pe verticala, 0..1000
    const r = 0.6 + rand(i + 2000) * (2.2 - 0.6); // raza intre 0.6 si 2.2
    const opacity = 0.15 + rand(i + 4000) * (0.9 - 0.15); // opacitate 0.15..0.9
    const twinkle = i % 4 === 0; // o stea din patru clipseste

    return (
      <circle
        key={i}
        cx={cx.toFixed(2)}
        cy={cy.toFixed(2)}
        r={r.toFixed(2)}
        fill="#ffffff"
        opacity={opacity.toFixed(2)}
        {...(twinkle
          ? {
              // intarziere aleatorie (dar stabila) ca stelele sa nu clipescă la unison
              className: 'star-twinkle',
              style: { animationDelay: (rand(i + 3000) * 6).toFixed(2) + 's' },
            }
          : {})}
      />
    );
  });

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {stars}
    </svg>
  );
}
