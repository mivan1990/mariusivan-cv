import { useLanguage } from '@/hooks/useLanguage'
import { Github } from 'lucide-react'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border/70 px-5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-center text-sm text-muted-foreground sm:text-left">{t.footer.line}</p>
        <div className="flex items-center gap-4">
          <a
            href={`https://${t.contact.github}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`${t.a11y.github} (${t.contact.github})`}
            className="flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Github className="h-4 w-4" />
            {t.footer.github}
          </a>
        </div>
      </div>
    </footer>
  )
}
