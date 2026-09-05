import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react"

import { cn } from "@/lib/utils"
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface FloatingContextType {
  registerElement: (id: string, element: HTMLDivElement, depth: number) => void
  unregisterElement: (id: string) => void
}

const FloatingContext = createContext<FloatingContextType | null>(null)

interface FloatingProps {
  children: ReactNode
  className?: string
  sensitivity?: number
  easingFactor?: number
}

// Prag (px) sub care consideram ca un element a ajuns la tinta — sub el nu mai
// programam un cadru, deci bucla se opreste cu adevarat (vezi tick).
const SETTLE_EPSILON = 0.1

const Floating = ({
  children,
  className,
  sensitivity = 1,
  easingFactor = 0.05,
  ...props
}: FloatingProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsMap = useRef(
    new Map<
      string,
      {
        element: HTMLDivElement
        depth: number
        currentPosition: { x: number; y: number }
      }
    >()
  )
  const mousePositionRef = useMousePositionRef(containerRef)
  const reducedMotion = useReducedMotion()

  const rafRef = useRef(0)
  const runningRef = useRef(false)

  const registerElement = useCallback(
    (id: string, element: HTMLDivElement, depth: number) => {
      elementsMap.current.set(id, {
        element,
        depth,
        currentPosition: { x: 0, y: 0 },
      })
    },
    []
  )

  const unregisterElement = useCallback((id: string) => {
    elementsMap.current.delete(id)
  }, [])

  // Bucla de parallax cu oprire reala (model: CursorTrail). Ruleaza doar cat
  // timp vreun element inca nu a ajuns la tinta; cand toate s-au stabilizat
  // (deplasare < SETTLE_EPSILON) nu mai cere un cadru si se opreste, apoi
  // reporneste la urmatoarea miscare a mouse-ului. Fara asta, frameloop-ul ar
  // rula la 60fps cat e pagina deschisa, chiar cu mouse-ul nemiscat.
  const tick = useCallback(() => {
    let moving = false

    elementsMap.current.forEach((data) => {
      const strength = (data.depth * sensitivity) / 20

      // Calculate new target position
      const newTargetX = mousePositionRef.current.x * strength
      const newTargetY = mousePositionRef.current.y * strength

      // Check if we need to update
      const dx = newTargetX - data.currentPosition.x
      const dy = newTargetY - data.currentPosition.y
      if (Math.abs(dx) > SETTLE_EPSILON || Math.abs(dy) > SETTLE_EPSILON) {
        moving = true
      }

      // Update position only if we're still moving
      data.currentPosition.x += dx * easingFactor
      data.currentPosition.y += dy * easingFactor

      data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`
    })

    if (moving) {
      rafRef.current = requestAnimationFrame(tick)
    } else {
      runningRef.current = false
    }
  }, [sensitivity, easingFactor])

  const start = useCallback(() => {
    if (reducedMotion) return
    if (!runningRef.current) {
      runningRef.current = true
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [reducedMotion, tick])

  // Trezim bucla la orice miscare a mouse-ului / touch. (useMousePositionRef
  // se ocupa de pozitie; aici doar repornim bucla cand e oprita.)
  useEffect(() => {
    if (reducedMotion) return
    const onMove = () => start()
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("touchmove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("touchmove", onMove)
    }
  }, [reducedMotion, start])

  // La prefers-reduced-motion: oprim bucla, resetam elementele la zero si nu
  // mai facem niciun calcul per cadru.
  useEffect(() => {
    if (!reducedMotion) return
    cancelAnimationFrame(rafRef.current)
    runningRef.current = false
    elementsMap.current.forEach((data) => {
      data.currentPosition.x = 0
      data.currentPosition.y = 0
      data.element.style.transform = "translate3d(0, 0, 0)"
    })
  }, [reducedMotion])

  // Curata rAF-ul la unmount.
  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div
        ref={containerRef}
        className={cn("absolute top-0 left-0 w-full h-full", className)}
        {...props}
      >
        {children}
      </div>
    </FloatingContext.Provider>
  )
}

export default Floating

interface FloatingElementProps {
  children: ReactNode
  className?: string
  depth?: number
}

export const FloatingElement = ({
  children,
  className,
  depth = 1,
}: FloatingElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(FloatingContext)

  useEffect(() => {
    if (!elementRef.current || !context) return

    const nonNullDepth = depth ?? 0.01

    context.registerElement(idRef.current, elementRef.current, nonNullDepth)
    return () => context.unregisterElement(idRef.current)
  }, [depth])

  return (
    <div
      ref={elementRef}
      className={cn("absolute will-change-transform", className)}
    >
      {children}
    </div>
  )
}