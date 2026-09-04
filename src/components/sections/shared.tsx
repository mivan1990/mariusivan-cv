import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

/**
 * Section de titlu — eyebrow + titlu + subtitlu, cu reveal la scroll.
 * Folosit de fiecare secțiune; păstrează un ritm vizual consistent.
 */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  className,
}: {
  eyebrow: string
  title: string
  sub?: string
  className?: string
}) {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} className={cn('reveal mb-10 sm:mb-14', className, visible && 'is-visible')}>
      <div className="mb-3 flex items-center gap-2">
        <span className="h-px w-8 bg-primary/60" />
        <span className="font-mono-code text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">{sub}</p>}
    </div>
  )
}

export function Section({
  id,
  children,
  className,
  alt = false,
}: {
  id: string
  children: ReactNode
  className?: string
  alt?: boolean
}) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-20 px-5 py-16 sm:py-24',
        alt ? 'bg-muted/40' : 'bg-background',
        className
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}
