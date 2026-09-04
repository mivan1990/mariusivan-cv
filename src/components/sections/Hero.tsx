import { useLanguage } from '@/hooks/useLanguage'
import { useReveal } from '@/hooks/useReveal'
import { useCountUp } from '@/hooks/useCountUp'
import { useTyping } from '@/hooks/useTyping'
import { useParallax } from '@/hooks/useParallax'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Globe, FolderOpen, Download } from 'lucide-react'

function StatBox({ value, label }: { value: string; label: string }) {
  const { ref, text } = useCountUp(value)
  return (
    <div ref={ref} className="rounded-xl border border-border/70 bg-card/60 px-4 py-3">
      <div className="font-mono-code text-2xl font-bold text-primary sm:text-3xl">{text}</div>
      <div className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">{label}</div>
    </div>
  )
}

export function Hero() {
  const { t } = useLanguage()
  const { ref, visible } = useReveal()
  const { typed, done, reduced } = useTyping(t.hero.role)
  // Parallax subtil pe petele decorative: viteze diferite = adancime.
  // Petele raman pe loc daca utilizatorul are prefers-reduced-motion.
  const blobA = useParallax<HTMLDivElement>(0.04, 40)
  const blobB = useParallax<HTMLDivElement>(0.09, 55)

  return (
    <section id="hero" className="relative overflow-hidden px-5 pb-16 pt-28 sm:pb-24 sm:pt-36">
      {/* fundal decorativ — raze subtile, fără imagini externe */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div ref={blobA} className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
        <div ref={blobB} className="absolute right-0 top-1/3 h-60 w-60 rounded-full bg-primary/6 blur-3xl" />
      </div>

      <div ref={ref} className={cn('reveal mx-auto max-w-6xl', visible && 'is-visible')}>
        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {t.hero.eyebrow}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              {t.hero.name}
            </h1>
            {/* rolul: efect de tastare; spatiul e rezervat de span-ul invisibil
                cu textul complet (fara layout shift), iar textul intreg e
                expus tehnologiilor asistive prin .sr-only */}
            <p className="relative mt-3 text-lg font-semibold text-muted-foreground sm:text-xl">
              <span aria-hidden="true" className="invisible">
                {t.hero.role}
              </span>
              <span aria-hidden="true" className="absolute inset-0">
                {typed}
                {!reduced && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      'typing-cursor ml-0.5 inline-block h-[1em] w-0.5 translate-y-[0.1em] bg-foreground',
                      done && 'animate-typing-blink',
                    )}
                  />
                )}
              </span>
              <span className="sr-only">{t.hero.role}</span>
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              <span className="text-foreground">{t.hero.tagline}</span>{' '}
              <span className="font-semibold text-foreground underline decoration-primary/50 decoration-2 underline-offset-4 animate-shimmer">
                {t.hero.taglineStrong}
              </span>{' '}
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                {t.hero.location}
              </span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" className="group" onClick={() => window.open('https://xp.mariusivan.ro', '_blank')}>
                <FolderOpen className="transition group-hover:scale-110" />
                {t.hero.ctaPrimary}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.hero.ctaSecondary}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => window.print()}
              >
                <Download />
                {t.hero.ctaTertiary}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-4">
            <StatBox value={t.hero.statTeam.value} label={t.hero.statTeam.label} />
            <StatBox value={t.hero.statModules.value} label={t.hero.statModules.label} />
            <StatBox value={t.hero.statSince.value} label={t.hero.statSince.label} />
          </div>
        </div>
      </div>
    </section>
  )
}
