import { useLanguage } from '@/hooks/useLanguage'
import { useReveal } from '@/hooks/useReveal'
import { Section, SectionHeading } from './shared'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Mail, Github, MapPin } from 'lucide-react'
import type { ReactNode } from 'react'

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode
  label: string
  value: string
  href?: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-mono-code text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        {href ? (
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="text-sm font-medium text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
          >
            {value}
          </a>
        ) : (
          <div className="text-sm font-medium">{value}</div>
        )}
      </div>
    </div>
  )
}

export function Contact() {
  const { t } = useLanguage()
  const c = t.contact
  const { ref, visible } = useReveal()

  return (
    <Section id="contact">
      <SectionHeading eyebrow={c.heading} title={c.heading} sub={c.sub} />
      <div ref={ref} className={cn('reveal', visible && 'is-visible')}>
        <Card className="border-primary/25">
          <CardHeader className="sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">
              {c.heading} — <span className="text-muted-foreground">{c.sub}</span>
            </CardTitle>
            <Badge variant="outline" className="font-mono-code">{c.live}</Badge>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-3">
              <ContactRow
                icon={<Mail className="h-4.5 w-4.5 text-primary" />}
                label="Email"
                value={c.email}
                href={`mailto:${c.email}`}
              />
              <ContactRow
                icon={<Github className="h-4.5 w-4.5 text-primary" />}
                label="GitHub"
                value={c.github}
                href={`https://${c.github}`}
              />
              <ContactRow
                icon={<MapPin className="h-4.5 w-4.5 text-primary" />}
                label="Live"
                value={c.live}
                href={`https://${c.live}`}
              />
            </div>
            <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
              {c.note}
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
