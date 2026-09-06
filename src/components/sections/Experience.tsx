import { useLanguage } from '@/hooks/useLanguage'
import { useReveal } from '@/hooks/useReveal'
import { Section, SectionHeading } from './shared'
import { Card } from '@/components/ui/card'
import Floating, { FloatingElement } from '@/components/ui/parallax-floating'
import { cn } from '@/lib/utils'
import { CheckCircle2, Code2 } from 'lucide-react'

// 6 pozitii (top/left procentuale), imprastiate in jurul centrului.
// Pozitiile tin banda centrala libera pentru blocul cu poza.
// Sub 'lg' pozele sunt mai mici, altfel calca peste blocul central.
const PROJECT_CARDS = [
  { pos: 'top-[2%] left-[7%]', box: 'w-32 lg:w-44 aspect-[4/3]', depth: 1.4 },
  { pos: 'top-[4%] left-[73%]', box: 'w-24 lg:w-36 aspect-[3/4]', depth: 0.8 },
  { pos: 'top-[46%] left-[1%]', box: 'w-28 lg:w-40 aspect-square', depth: 1.8 },
  { pos: 'top-[76%] left-[17%]', box: 'w-24 lg:w-32 aspect-square', depth: 1.1 },
  { pos: 'top-[40%] left-[76%]', box: 'w-24 lg:w-36 aspect-[3/4]', depth: 2 },
  { pos: 'top-[72%] left-[56%]', box: 'w-32 lg:w-48 aspect-[4/3]', depth: 0.7 },
]

function ProjectPhoto({ name, img, box }: { name: string; img: string; box: string }) {
  return (
    <figure className="select-none">
      <img
        src={img}
        alt=""
        loading="lazy"
        decoding="async"
        className={cn('rounded-xl border border-border object-cover shadow-sm', box)}
      />
      <figcaption className="mt-2 text-center text-xs font-medium text-foreground">{name}</figcaption>
    </figure>
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
          <div className="relative md:min-h-[680px]">
            {/* bloc central — static pe mobil, centrat + z-10 pe desktop.
                Poza, sub ea numele, apoi compania si rolul/perioada.
                Latimea e mica intentionat (numele companiei se rupe pe doua randuri):
                asa ramane loc pentru cardurile care plutesc in jur. */}
            <div className="md:absolute md:left-1/2 md:top-1/2 md:z-10 md:w-[min(420px,44%)] md:-translate-x-1/2 md:-translate-y-1/2">
              <div className="flex flex-col items-center text-center">
                {/* PLACEHOLDER — inlocuieste cu poza reala si pune un alt descriptiv
                    (ex. alt={e.personName}). Cat timp e desen generic, alt gol e corect. */}
                <img
                  src="/profile-placeholder.svg"
                  alt=""
                  width={144}
                  height={144}
                  loading="lazy"
                  decoding="async"
                  className="h-28 w-28 rounded-full border border-border object-cover sm:h-36 sm:w-36"
                />
                <div className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {e.personName}
                </div>
                <div className="mt-2 text-base font-semibold leading-snug text-foreground sm:text-lg">
                  {e.company}
                </div>
                <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-2 text-sm text-muted-foreground">
                  <span className="font-medium">{e.role}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-code text-xs">{e.period}</span>
                </div>
              </div>
            </div>

            {/* harta — poze plutitoare, doar desktop */}
            <Floating sensitivity={0.5} className="absolute inset-0 hidden md:block">
              {e.mapItems.map((item, i) => (
                <FloatingElement
                  key={item.name}
                  depth={PROJECT_CARDS[i].depth}
                  className={cn('absolute', PROJECT_CARDS[i].pos)}
                >
                  <ProjectPhoto name={item.name} img={item.img} box={PROJECT_CARDS[i].box} />
                </FloatingElement>
              ))}
            </Floating>

            {/* mobil — grila normala, nimic nu pluteste */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:hidden">
              {e.mapItems.map((item) => (
                <ProjectPhoto key={item.name} name={item.name} img={item.img} box="w-full aspect-[4/3]" />
              ))}
            </div>
          </div>

          {/* responsabilități — grila normala sub harta */}
          <div className="mt-12 mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">{e.responsibilitiesHeading}</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {e.responsibilities.map((r) => (
              <Card key={r.title} className="px-5 py-4">
                <div className="text-sm font-semibold text-foreground">{r.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.detail}</p>
              </Card>
            ))}
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