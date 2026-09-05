import { useLanguage } from '@/hooks/useLanguage'
import { useReveal } from '@/hooks/useReveal'
import { Section, SectionHeading } from './shared'
import { Card } from '@/components/ui/card'
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
import { CheckCircle2, Code2 } from 'lucide-react'

// 8 pozitii (top/left procentuale), imprastiate DENS in jurul centrului.
// Banda centrala (top ~30-65%, left ~25-75%) ramane libera pentru textul central.
// depth-uri 0.5–2 ca miscarea de parallax sa fie vizibila.
const FLOATING_CARDS = [
  { pos: 'top-[4%] left-[10%]', depth: 1.4 },
  { pos: 'top-[9%] left-[70%]', depth: 0.8 },
  { pos: 'top-[30%] left-[2%]', depth: 1.8 },
  { pos: 'top-[34%] left-[84%]', depth: 1.1 },
  { pos: 'top-[62%] left-[4%]', depth: 2 },
  { pos: 'top-[70%] left-[80%]', depth: 0.7 },
  { pos: 'top-[88%] left-[24%]', depth: 1.5 },
  { pos: 'top-[90%] left-[58%]', depth: 0.9 },
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
    <Section id="experience" className="dark bg-background text-foreground">
      <SectionHeading eyebrow={e.heading} title={e.heading} sub={e.sub} />

      <div ref={ref} className={cn('reveal space-y-8', visible && 'is-visible')}>
        {/* responsabilități */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">{e.responsibilitiesHeading}</h3>
          </div>

          <div className="relative md:min-h-[560px]">
            {/* bloc central — static pe mobil, centrat + z-10 pe desktop.
                Doar compania (mare) + rol/perioada (mic), nimic altceva. */}
            {/* Latimea e generoasa intentionat: numele companiei e lung si, intr-un
                container ingust, se rupea in patru randuri si devenea o coloana
                inalta care domina toata sectiunea. Asa incape pe doua. */}
            <div className="md:absolute md:left-1/2 md:top-1/2 md:z-10 md:w-[min(680px,66%)] md:-translate-x-1/2 md:-translate-y-1/2">
              <div className="text-center">
                <div className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
                  {e.company}
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 text-sm text-muted-foreground">
                  <span className="font-medium">{e.role}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-code text-xs">{e.period}</span>
                </div>
              </div>
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

          {/* intro + proiect — sub zona plutitoare, bloc centrat */}
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <p className="leading-relaxed text-muted-foreground">
              {e.intro}{' '}
              <span className="font-semibold text-foreground">{e.introStrong}</span>{' '}
              {e.introTail}
            </p>
            <div className="mt-4 rounded-lg border bg-muted/40 p-4 text-left">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  {e.projectHeading}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {e.projectBody}{' '}
                <span className="font-semibold text-foreground">
                  {e.projectBodyStrong}
                </span>
              </p>
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
                      className="rounded-md bg-primary/8 px-2 py-0.5 text-xs font-medium text-foreground"
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