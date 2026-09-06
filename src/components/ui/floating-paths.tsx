// Fundal decorativ: linii curbate subtiri care se "deseneaza" lent.
//
// Adaptare dupa componenta 'Floating Paths' de pe 21st.dev (autor: Bundui).
// Originalul folosea framer-motion; aici e rescrisa FARA framer-motion —
// animatia de desenare se face integral din CSS (clasa .fp-line + keyframe
// fp-draw din src/index.css), inclusiv respectarea prefers-reduced-motion.

export function FloatingPaths() {
  return (
    <svg
      viewBox="0 0 1200 640"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* 24 de curbe largi, paralele intre ele; fiecare incepe cu un
          animationDelay incremental ca desenarea sa fie in cascada. */}
      {Array.from({ length: 24 }).map((_, i) => (
        <path
          key={i}
          className="fp-line"
          d={`M-200 ${120 + i * 16} C 200 ${40 + i * 16}, 600 ${300 + i * 14}, 1400 ${120 + i * 18}`}
          stroke="currentColor"
          fill="none"
          strokeWidth={0.6 + (i / 23) * 0.8}
          strokeOpacity={0.04 + (i / 23) * 0.08}
          style={{ animationDelay: i * 0.12 + 's' }}
        />
      ))}
    </svg>
  )
}
