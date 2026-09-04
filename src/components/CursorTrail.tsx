import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const DOT_COUNT = 5
// Dimensiuni si opacitati descrescatoare — urma estompata, discreta.
const DOT_SIZES = [8, 6, 5, 4, 3]
const DOT_OPACITIES = [0.4, 0.3, 0.22, 0.16, 0.1]

/**
 * Urma discreta de cursor: cateva puncte mici in culoarea `primary`
 * care raman putin in urma cursorului.
 *
 * - Dezactivata pe dispozituri fara pointer fin (touch) — nu randa nimic.
 * - Dezactivata la `prefers-reduced-motion` (via useReducedMotion).
 * - `pointer-events: none` + z-index sub navbar (z-50) — nu blocheaza nimic.
 * - Fara setState pe mousemove: scrie direct pe `style.transform` prin rAF.
 */
export function CursorTrail() {
  const reducedMotion = useReducedMotion()
  const [finePointer, setFinePointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])
  const target = useRef({ x: -100, y: -100 })
  const positions = useRef(
    Array.from({ length: DOT_COUNT }, () => ({ x: -100, y: -100 })),
  )

  // Asculta schimbari de tip pointer in timp real (ex. mouse atasat/detasat).
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const onChange = () => setFinePointer(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reducedMotion || !finePointer) return

    let raf = 0
    let running = false

    const start = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      if (containerRef.current) containerRef.current.style.opacity = '1'
      start()
    }
    const onLeave = () => {
      if (containerRef.current) containerRef.current.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)

    function tick() {
      const pts = positions.current
      // Cat timp vreun punct e inca in miscare, mai cerem un cadru. Cand toate
      // au ajuns din urma cursorul, bucla se opreste si porneste iar abia la
      // urmatoarea miscare — altfel am tine procesorul treaz degeaba.
      let moving = false
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        const t = i === 0 ? target.current : pts[i - 1]
        // Fiecare punct urmareste pe cel din fata cu lerp — efect de urma.
        const ease = i === 0 ? 0.35 : 0.25
        const dx = t.x - p.x
        const dy = t.y - p.y
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) moving = true
        p.x += dx * ease
        p.y += dy * ease
        const el = dotRefs.current[i]
        if (el) {
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`
        }
      }
      if (moving) {
        raf = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }
    start()

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [reducedMotion, finePointer])

  if (reducedMotion || !finePointer) return null

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40"
      style={{ opacity: 0 }}
    >
      {DOT_SIZES.map((size, i) => (
        <span
          key={i}
          ref={(el) => {
            dotRefs.current[i] = el
          }}
          className="absolute left-0 top-0 rounded-full bg-primary"
          style={{ width: size, height: size, opacity: DOT_OPACITIES[i] }}
        />
      ))}
    </div>
  )
}