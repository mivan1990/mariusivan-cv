import { useEffect, useRef, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const DURATION = 1200

/**
 * Descompune o valoare de tip '≤6' / '82' / '2023' in prefix + cifra + suffix.
 * Returneaza null daca valoarea nu contine nicio cifra.
 */
function parseValue(value: string): { prefix: string; num: number; suffix: string } | null {
  const m = value.match(/^(\D*)(\d+)(\D*)$/)
  if (!m) return null
  return { prefix: m[1], num: parseInt(m[2], 10), suffix: m[3] }
}

/** Anii (1900–2100) pornesc de aproape, nu de la 0. */
function isYear(n: number): boolean {
  return n >= 1900 && n <= 2100
}

function startValue(target: number): number {
  return isYear(target) ? Math.max(0, target - 25) : 0
}

/**
 * Animeaza cifra dintr-o valoare statica (ex. '≤6', '82', '2023') cand elementul
 * intra in viewport. Prefixul/suffixul non-numeric raman neschimbate.
 *
 * - prefers-reduced-motion: afiseaza direct valoarea finala, fara animatie.
 * - Anii (1900–2100) pornesc de aproape (target - 25), nu de la 0.
 * - La schimbarea valorii (comutare EN/RO) continua de la cifra afisata
 *   curent, nu reporneste de la zero.
 * - Valori fara cifre se afiseaza ca atare.
 */
export function useCountUp(value: string) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState<number | null>(null)
  const currentRef = useRef<number | null>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const parsed = parseValue(value)
    if (!parsed) {
      currentRef.current = null
      setDisplay(null)
      return
    }
    if (reduced) {
      cancelAnimationFrame(rafRef.current)
      currentRef.current = parsed.num
      setDisplay(parsed.num)
      return
    }
    if (!visible) return

    const from = currentRef.current ?? startValue(parsed.num)
    if (from === parsed.num) {
      currentRef.current = parsed.num
      setDisplay(parsed.num)
      return
    }
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION)
      const eased = 1 - Math.pow(1 - p, 3)
      const v = Math.round(from + (parsed.num - from) * eased)
      currentRef.current = v
      setDisplay(v)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value, visible, reduced])

  const parsed = parseValue(value)
  if (!parsed) return { ref, text: value }
  const num = display ?? startValue(parsed.num)
  return { ref, text: `${parsed.prefix}${num}${parsed.suffix}` }
}