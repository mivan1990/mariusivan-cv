import { useLanguage } from '@/hooks/useLanguage'
import { Github } from 'lucide-react'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="dark overflow-hidden border-t border-border bg-background px-5 pb-6 pt-12 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">{t.footer.line}</p>
          <a
            href={`https://${t.contact.github}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`${t.a11y.github} (${t.contact.github})`}
            className="flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Github className="h-4 w-4" />
            {t.footer.github}
          </a>
        </div>
        <div
          aria-hidden="true"
          className="mt-10 select-none overflow-hidden text-center font-extrabold uppercase leading-[0.85] tracking-tight text-foreground/10"
        >
          <span className="block text-[18vw] sm:text-[15vw] lg:text-[13vw]">{t.hero.name}</span>
        </div>
      </div>
    </footer>
  )
}
