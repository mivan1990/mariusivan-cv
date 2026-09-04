import { useEffect, useState } from 'react'

/**
 * Spune daca utilizatorul a cerut mai putina miscare (`prefers-reduced-motion`).
 * Asculta si schimbarile facute in timp ce pagina e deschisa.
 *
 * Orice animatie din proiect trebuie sa respecte asta — vezi F3 (accesibilitate).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
