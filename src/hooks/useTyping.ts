import { useEffect, useState } from 'react'

function useReducedMotion(): boolean {
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

/**
 * Efect de tastare: afiseaza `text` litera cu litera, cu viteza `speed` ms/caracter.
 *
 * - prefers-reduced-motion: returneaza textul complet imediat, fara animatie.
 * - La schimbarea textului (ex. comutare EN/RO) reporneste curat de la zero
 *   cu noua valoare — nu amesteca caractere din doua limbi.
 * - Timerele sunt curatate la unmount si la fiecare schimbare de text.
 *
 * `reduced` e expus ca sa stie consumatorul sa ascunda cursorul.
 */
export function useTyping(text: string, speed = 50) {
  const reduced = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reduced) {
      setCount(text.length)
      return
    }
    setCount(0)
    if (text.length === 0) return
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          window.clearInterval(id)
          return c
        }
        return c + 1
      })
    }, speed)
    return () => window.clearInterval(id)
  }, [text, speed, reduced])

  return {
    typed: text.slice(0, count),
    done: count >= text.length,
    reduced,
  }
}