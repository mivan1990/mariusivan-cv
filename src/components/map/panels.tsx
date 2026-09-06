// Corpurile dialogurilor din harta — continutul sectiunilor Skills, Contact si Faq,
// fara Section/SectionHeading/useReveal, gata de pus in dialoguri.
import { useLanguage } from '@/hooks/useLanguage'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { Mail, Github, MapPin, ExternalLink, GitBranch } from 'lucide-react'
import type { ReactNode } from 'react'

// Iconite pentru fiecare grupa de skills (aceeasi constanta ca in Skills.tsx)
const GROUP_ICONS: Record<string, string> = {
  Languages: '🗣️',
  Web: '🌐',
  Build: '⚙️',
  'Data & Infra': '🗄️',
  Tools: '🧰',
}

export function SkillsPanel() {
  const { t } = useLanguage()
  const s = t.skills

  return (
    <div className="grid gap-4 sm:grid-cols-2">
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
                className="rounded-lg bg-muted px-2.5 py-1 text-sm font-medium text-foreground transition hover:bg-muted-foreground/15"
              >
                {it}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Rand de contact — copiat identic din Contact.tsx
function ContactRow({
  icon,
  label,
  value,
  href,
  a11y,
}: {
  icon: ReactNode
  label: string
  value: string
  href?: string
  a11y?: string
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
            aria-label={a11y ? `${a11y} (${value})` : undefined}
            className="text-sm font-medium text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
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

export function ContactPanel() {
  const { t } = useLanguage()
  const c = t.contact

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-3">
        <ContactRow
          icon={<Mail className="h-4.5 w-4.5 text-primary" />}
          label="Email"
          value={c.email}
          href={`mailto:${c.email}`}
          a11y={t.a11y.email}
        />
        <ContactRow
          icon={<Github className="h-4.5 w-4.5 text-primary" />}
          label="GitHub"
          value={c.github}
          href={`https://${c.github}`}
          a11y={t.a11y.github}
        />
        <ContactRow
          icon={<MapPin className="h-4.5 w-4.5 text-primary" />}
          label="Live"
          value={c.live}
          href={`https://${c.live}`}
          a11y={t.a11y.liveSite}
        />
      </div>
      <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
        {c.note}
      </div>
    </div>
  )
}

export function FaqPanel() {
  const { t } = useLanguage()
  const f = t.faq

  return (
    <div className="mx-auto max-w-3xl">
      <Accordion type="multiple" className="rounded-xl border border-border/70 bg-card px-5">
        {f.items.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            {/* fara aria-label: intrebarea e chiar numele accesibil al butonului,
                iar starea deschis/inchis o anunta aria-expanded, pus de Radix */}
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

// Panoul cu intranetul FEG — continut preluat din sectiunea Experience
export function IntranetPanel() {
  const { t } = useLanguage()
  const e = t.experience

  return (
    <div>
      {/* intro proiectul intranet */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {e.projectBody}{' '}
        <span className="font-semibold text-foreground">{e.projectBodyStrong}</span>
      </p>

      {/* responsabilitati */}
      <h3 className="mt-6 text-sm font-semibold text-foreground">{e.responsibilitiesHeading}</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {e.responsibilities.map((r) => (
          <Card key={r.title} className="px-4 py-3">
            <div className="text-sm font-semibold text-foreground">{r.title}</div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.detail}</p>
          </Card>
        ))}
      </div>

      {/* tehnologii */}
      <h3 className="mt-6 text-sm font-semibold text-foreground">{e.techHeading}</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {e.techGroups.map((g) => (
          <Card key={g.zone} className="px-4 py-3">
            <div className="font-mono-code text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {g.zone}
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <span key={it} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
                  {it}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Panoul unui proiect individual — cautat dupa id in t.projects.items
export function ProjectPanel({ id }: { id: string }) {
  const { t } = useLanguage()
  const p = t.projects.items.find((item) => item.id === id)

  // proiect inexistent — doar mesajul de placeholder
  if (!p) {
    return <p className="text-sm text-muted-foreground">{t.projects.comingSoon}</p>
  }

  return (
    <div>
      {/* rol + status */}
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {p.role} · {p.status}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

      <p className="mt-3 rounded-lg bg-muted/50 px-4 py-3 text-sm text-muted-foreground">{p.highlight}</p>

      {/* stack-ul proiectului */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
            {s}
          </span>
        ))}
      </div>

      {/* linkuri: demo live si repo, doar daca exista */}
      <div className="mt-5 flex flex-wrap gap-2">
        {p.liveUrl && (
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ExternalLink className="h-4 w-4" />
            {t.projects.liveDemo}
          </a>
        )}
        {p.repoUrl && (
          <a
            href={p.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <GitBranch className="h-4 w-4" />
            {t.projects.viewRepo}
          </a>
        )}
      </div>
    </div>
  )
}

// Panoul implicit pentru noduri fara continut
export function PanelFallback() {
  const { t } = useLanguage()

  return <p className="text-sm text-muted-foreground">{t.projects.comingSoon}</p>
}
