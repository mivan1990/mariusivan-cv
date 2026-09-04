import { useLanguage } from '@/hooks/useLanguage'
import { useReveal } from '@/hooks/useReveal'
import { Section, SectionHeading } from './shared'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ExternalLink, GitBranch, MousePointerClick } from 'lucide-react'
import type { Project } from '@/i18n/translations'

// badgeTone din date foloseste 'primary'; Badge (shadcn) nu are varianta
// 'primary' — 'default' e exact badge-ul colorat pe primary (bg-primary/10 text-primary).
const TONE_TO_VARIANT: Record<Project['badgeTone'], 'default' | 'success' | 'info'> = {
  primary: 'default',
  success: 'success',
  info: 'info',
}

function ProjectCard({
  project,
  liveDemo,
  viewRepo,
  comingSoon,
  liveDemoA11y,
  viewRepoA11y,
}: {
  project: Project
  liveDemo: string
  viewRepo: string
  comingSoon: string
  liveDemoA11y: string
  viewRepoA11y: string
}) {
  const { ref, visible } = useReveal()
  const hasLive = Boolean(project.liveUrl)

  return (
    <Card
      ref={ref}
      className={cn('reveal h-full transition hover:border-primary/50', visible && 'is-visible')}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg">{project.name}</CardTitle>
          <Badge variant={TONE_TO_VARIANT[project.badgeTone]}>{project.badge}</Badge>
        </div>
        <p className="text-xs font-semibold text-muted-foreground">
          {project.role} · {project.status}
        </p>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="rounded-lg bg-muted/60 px-3 py-2.5">
          <p className="text-xs leading-relaxed">
            <span className="font-semibold text-foreground">→ </span>
            {project.highlight}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-md bg-primary/8 px-2 py-0.5 text-xs font-medium text-primary"
            >
              {s}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        {hasLive && (
          <Button
            size="sm"
            className="gap-1.5"
            onClick={() => window.open(project.liveUrl!, '_blank', 'noopener,noreferrer')}
            aria-label={`${liveDemoA11y} — ${project.name}`}
          >
            <MousePointerClick />
            {liveDemo}
          </Button>
        )}
        {project.repoUrl && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5"
                onClick={() => window.open(project.repoUrl!, '_blank', 'noopener,noreferrer')}
                aria-label={`${viewRepoA11y} — ${project.name}`}
              >
                <GitBranch />
                {viewRepo}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{project.repoUrl}</TooltipContent>
          </Tooltip>
        )}
        {!hasLive && !project.repoUrl && (
          <span className="text-sm text-muted-foreground">{comingSoon}</span>
        )}
        <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground opacity-0 transition group-hover:opacity-100">
          <ExternalLink className="h-3 w-3" />
        </span>
      </CardFooter>
    </Card>
  )
}

export function Projects() {
  const { t } = useLanguage()
  const p = t.projects

  return (
    <Section id="projects">
      <SectionHeading eyebrow={p.heading} title={p.heading} sub={p.sub} />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {p.items.map((item) => (
          <ProjectCard
            key={item.id}
            project={item}
            liveDemo={p.liveDemo}
            viewRepo={p.viewRepo}
            comingSoon={p.comingSoon}
            liveDemoA11y={t.a11y.liveDemo}
            viewRepoA11y={t.a11y.viewRepo}
          />
        ))}
      </div>
    </Section>
  )
}
