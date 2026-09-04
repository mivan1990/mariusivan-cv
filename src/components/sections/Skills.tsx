import { useLanguage } from '@/hooks/useLanguage'
import { useReveal } from '@/hooks/useReveal'
import { Section, SectionHeading } from './shared'
import { cn } from '@/lib/utils'

const GROUP_ICONS: Record<string, string> = {
  Languages: '🗣️',
  Web: '🌐',
  Build: '⚙️',
  'Data & Infra': '🗄️',
  Tools: '🧰',
}

export function Skills() {
  const { t } = useLanguage()
  const s = t.skills
  const { ref, visible } = useReveal()

  return (
    <Section id="skills" alt>
      <SectionHeading eyebrow={s.heading} title={s.heading} sub={s.sub} />
      <div ref={ref} className={cn('reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-3', visible && 'is-visible')}>
        {s.groups.map((g) => (
          <div
            key={g.title}
            className="rounded-xl border border-border/70 bg-card px-5 py-5 transition hover:border-primary/40"
          >
            <div className="flex items-center gap-2">
              <span className="text-base leading-none">{GROUP_ICONS[g.title] ?? '✦'}</span>
              <h3 className="font-mono-code text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {g.title}
              </h3>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <span
                  key={it}
                  className="rounded-lg bg-primary/8 px-2.5 py-1 text-sm font-medium text-primary transition hover:bg-primary/15"
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
