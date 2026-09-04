import { useLanguage } from '@/hooks/useLanguage'
import { useReveal } from '@/hooks/useReveal'
import { Section, SectionHeading } from './shared'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Building2, CheckCircle2, Code2 } from 'lucide-react'

export function Experience() {
  const { t } = useLanguage()
  const e = t.experience
  const { ref, visible } = useReveal()

  return (
    <Section id="experience" alt>
      <SectionHeading eyebrow={e.heading} title={e.heading} sub={e.sub} />

      <div ref={ref} className={cn('reveal space-y-8', visible && 'is-visible')}>
        {/* card principal — companie + rol + perioada */}
        <Card className="border-primary/20 bg-card">
          <CardHeader className="gap-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg sm:text-xl">{e.company}</CardTitle>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-sm font-semibold text-primary">{e.role}</span>
                    <span className="text-sm text-muted-foreground">·</span>
                    <span className="font-mono-code text-xs text-muted-foreground">{e.period}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {e.intro} <span className="font-semibold text-foreground">{e.introStrong}</span> {e.introTail}
            </p>
          </CardHeader>
        </Card>

        {/* proiect */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">{e.projectHeading}</CardTitle>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {e.projectBody} <span className="font-semibold text-foreground">{e.projectBodyStrong}</span>
            </p>
          </CardHeader>
        </Card>

        {/* responsabilități — grid de mici carduri */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">{e.responsibilitiesHeading}</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {e.responsibilities.map((r) => (
              <Card key={r.title} className="transition hover:border-primary/40">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm">{r.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  {r.detail}
                </CardContent>
              </Card>
            ))}
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
