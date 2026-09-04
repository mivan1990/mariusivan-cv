import { useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Parallax subtil pe elemente decorative (petele din Hero).
 *
 * Performanta:
 * - NU foloseste setState la scroll -> zero re-rendere, scrie direct pe
 *   `element.style.transform` printr-un ref.
 * - Evenimentele de scroll sunt coalescite cu `requestAnimationFrame`
 *   (cel mult o scriere pe frame), iar listenerul e `{ passive: true }`.
 * - Foloseste doar `translate3d` (compositor), nu `top`/`margin` (layout).
 *
 * Accesibilitate: cu `prefers-reduced-motion` activ nu se ataseaza niciun
 * listener si elementul ramane exact pe loc.
 *
 * @param speed  cat de mult se deplaseaza elementul fata de centrul viewport-ului (0-1)
 * @param max    plafonul de deplasare in px (efectul trebuie sa ramana subtil)
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.05, max = 50) {
  const ref = useRef<T | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    let frame: number | null = null

    const update = () => {
      frame = null
      // Masuram containerul parinte (stabil), nu elementul insusi:
      // altfel transform-ul aplicat s-ar include in masuratoare (feedback loop).
      const rect = (el.parentElement ?? el).getBoundingClientRect()
      const offsetFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2
      const shift = Math.max(-max, Math.min(max, -offsetFromCenter * speed))
      el.style.transform = `translate3d(0, ${shift}px, 0)`
    }

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame !== null) cancelAnimationFrame(frame)
      el.style.transform = ''
    }
  }, [reduced, speed, max])

  return ref
}