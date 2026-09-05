import { useLanguage } from '@/hooks/useLanguage'
import { useReveal } from '@/hooks/useReveal'
import { Section, SectionHeading } from './shared'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import Floating, { FloatingElement } from '@/components/ui/parallax-floating'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Building2, CheckCircle2, Code2 } from 'lucide-react'

// 8 pozitii (top/left procentuale) in jurul centrului — clase statice ca Tailwind sa le genereze.
// Centrul ramane liber; depth-uri diferite (0.3–0.9) pentru straturi.
const FLOATING_CARDS = [
  { pos: 'top-[6%] left-[8%]', depth: 0.55 },
  { pos: 'top-[10%] left-[72%]', depth: 0.35 },
  { pos: 'top-[38%] left-[3%]', depth: 0.7 },
  { pos: 'top-[48%] left-[82%]', depth: 0.45 },
  { pos: 'top-[70%] left-[6%]', depth: 0.9 },
  { pos: 'top-[84%] left-[30%]', depth: 0.3 },
  { pos: 'top-[76%] left-[66%]', depth: 0.6 },
  { pos: 'top-[3%] left-[42%]', depth: 0.8 },
]

const CARD_BUTTON =
  'rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium shadow-sm transition hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

function ResponsibilityCard({ title, detail }: { title: string; detail: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={CARD_BUTTON}>
          {title}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{detail}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export function Experience() {
  const { t } = useLanguage()
  const e = t.experience
  const { ref, visible } = useReveal()

  return (
    <Section id="experience" alt>
      <SectionHeading eyebrow={e.heading} title={e.heading} sub={e.sub} />

      <div ref={ref} className={cn('reveal space-y-8', visible && 'is-visible')}>
        {/* responsabilități */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">{e.responsibilitiesHeading}</h3>
          </div>

          <div className="relative md:min-h-[520px]">
            {/* bloc central — static pe mobil, centrat + z-10 pe desktop */}
            <div className="md:absolute md:left-1/2 md:top-1/2 md:z-10 md:w-[min(600px,58%)] md:-translate-x-1/2 md:-translate-y-1/2">
              <Card className="border-primary/20 bg-card">
                <CardHeader className="gap-1">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg sm:text-xl">{e.company}</CardTitle>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-sm font-semibold text-primary">{e.role}</span>
                        <span className="text-sm text-muted-foreground">·</span>
                        <span className="font-mono-code text-xs text-muted-foreground">
                          {e.period}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {e.intro}{' '}
                    <span className="font-semibold text-foreground">{e.introStrong}</span>{' '}
                    {e.introTail}
                  </p>
                  <div className="mt-3 rounded-lg border bg-muted/40 p-4">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">{e.projectHeading}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {e.projectBody}{' '}
                      <span className="font-semibold text-foreground">
                        {e.projectBodyStrong}
                      </span>
                    </p>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* harta — carduri plutitoare, doar desktop */}
            <Floating sensitivity={0.5} className="absolute inset-0 hidden md:block">
              {e.responsibilities.map((r, i) => (
                <FloatingElement
                  key={r.title}
                  depth={FLOATING_CARDS[i].depth}
                  className={cn('absolute', FLOATING_CARDS[i].pos)}
                >
                  <ResponsibilityCard title={r.title} detail={r.detail} />
                </FloatingElement>
              ))}
            </Floating>

            {/* mobil — grila normala, nimic nu pluteste */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 md:hidden">
              {e.responsibilities.map((r) => (
                <ResponsibilityCard key={r.title} title={r.title} detail={r.detail} />
              ))}
            </div>
          </div>
        </div>

        {/* tehnologii — grupe */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <h3 className="font-semibold">{e.techHeading}</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {e.techGroups.map((g) => (
              <Card key={g.zone} className="px-5 py-4">
                <div className="font-mono-code text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {g.zone}
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-md bg-primary/8 px-2 py-0.5 text-xs font-medium text-primary"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
