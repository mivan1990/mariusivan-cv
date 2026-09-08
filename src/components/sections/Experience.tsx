import { useLanguage } from '@/hooks/useLanguage'
import type { Translation } from '@/i18n/translations'
import { Section } from './shared'
import Floating, { FloatingElement } from '@/components/ui/parallax-floating'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  SkillsPanel,
  ContactPanel,
  FaqPanel,
  IntranetPanel,
  ProjectPanel,
} from '@/components/map/panels'
import { cn } from '@/lib/utils'
import { FloatingPaths } from '@/components/ui/floating-paths'
import { ExternalLink, HelpCircle, Layers, Mail } from 'lucide-react'
import type { ReactNode } from 'react'

// 9 elemente pe harta (pozitiile top/left sunt procentuale).
// Pozitiile tin libera banda centrala unde e blocul cu poza.
const MAP_ITEMS = [
  { key: 'portfolio-xp',    kind: 'photo', pos: 'top-[1%] left-[6%]',   box: 'w-32 lg:w-44 aspect-[4/3]',  depth: 1.4 },
  { key: 'skills',          kind: 'tile',  pos: 'top-[2%] left-[34%]',  box: 'w-24 lg:w-32 aspect-square', depth: 0.9 },
  { key: 'cs2-leaderboard', kind: 'photo', pos: 'top-[1%] left-[72%]',  box: 'w-24 lg:w-36 aspect-[3/4]',  depth: 0.8 },
  { key: 'fortuna-wc2026',  kind: 'photo', pos: 'top-[38%] left-[1%]',  box: 'w-28 lg:w-40 aspect-square', depth: 1.8 },
  { key: 'fegbet',          kind: 'photo', pos: 'top-[34%] left-[78%]', box: 'w-32 lg:w-44 aspect-square', depth: 2 },
  { key: 'contact',         kind: 'tile',  pos: 'top-[70%] left-[8%]',  box: 'w-24 lg:w-32 aspect-square', depth: 1.2 },
  { key: 'voteaza-liga2',   kind: 'photo', pos: 'top-[73%] left-[30%]', box: 'w-24 lg:w-32 aspect-[31/35]', depth: 1.1 },
  { key: 'intranet',        kind: 'photo', pos: 'top-[74%] left-[54%]', box: 'w-32 lg:w-48 aspect-[4/3]',  depth: 0.7 },
  { key: 'faq',             kind: 'tile',  pos: 'top-[72%] left-[80%]', box: 'w-24 lg:w-28 aspect-square', depth: 1.5 },
]

type MapItem = (typeof MAP_ITEMS)[number]

// Un card pregatit: eticheta, vizualul (poza/tile), continutul dialogului
// si (optional) o url — cardul devine o ancora clickabila catre site.
interface MapCardData {
  label: string
  visual: ReactNode
  panel: ReactNode
  url?: string
  headerImg?: string
  t: Translation
}

// Componenta interna MapCard(label, visual, children).
function MapCard({ label, visual, panel, url, headerImg, t }: MapCardData) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="block rounded-xl text-left transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {visual}
          <span className="mt-2 block text-center text-xs font-medium text-foreground">{label}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        {headerImg && (
          <img
            src={headerImg}
            alt=""
            loading="lazy"
            decoding="async"
            className="mb-1 w-full rounded-lg"
          />
        )}
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        {panel}
        {url && (
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ExternalLink className="h-4 w-4" />
              {t.projects.visitSite}
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function Experience() {
  const { t } = useLanguage()
  const e = t.experience

  // O singura functie interna: primeste (it, box) si returneaza { label, visual, panel }.
  // Folosita si pe desktop si pe mobil — doar box-ul difera.
  // Pozele se leaga dupa numele fisierului din 'img' (contine key-ul).
  const makeCard = (it: MapItem, box: string): MapCardData => {
    if (it.kind === 'photo') {
      const item = e.mapItems.find((m) => m.img.includes(it.key))
      return {
        label: item?.name ?? it.key,
        visual: (
          <img
            src={item?.img ?? ''}
            alt=""
            loading="lazy"
            decoding="async"
            className={cn('rounded-xl border border-border object-cover shadow-sm', box)}
          />
        ),
        panel: it.key === 'intranet' ? <IntranetPanel /> : <ProjectPanel id={it.key} />,
        url: item?.url,
        headerImg: item?.headerImg,
        t,
      }
    }

    // tile — eticheta si iconita din traducerile sectiunii respective
    const label =
      it.key === 'skills' ? t.skills.heading : it.key === 'contact' ? t.contact.heading : t.faq.heading
    const Icon = it.key === 'skills' ? Layers : it.key === 'contact' ? Mail : HelpCircle
    const panel =
      it.key === 'skills' ? <SkillsPanel /> : it.key === 'contact' ? <ContactPanel /> : <FaqPanel />
    return {
      label,
      visual: (
        <div className={cn('flex items-center justify-center rounded-xl border border-border bg-card shadow-sm', box)}>
          <Icon className="h-7 w-7 text-muted-foreground" />
        </div>
      ),
      panel,
      t,
    }
  }

  return (
    <Section id="experience" className="bg-background text-foreground">
      <div className="relative md:min-h-[680px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden text-foreground opacity-40 md:block">
          <FloatingPaths />
        </div>
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

        {/* harta — elemente plutitoare, doar desktop */}
        <Floating sensitivity={0.5} className="absolute inset-0 z-10 hidden md:block">
          {MAP_ITEMS.map((it) => (
            <FloatingElement key={it.key} depth={it.depth} className={cn('absolute', it.pos)}>
              <MapCard {...makeCard(it, it.box)} />
            </FloatingElement>
          ))}
        </Floating>

        {/* mobil — grila normala, nimic nu pluteste */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:hidden">
          {MAP_ITEMS.map((it) => (
            <MapCard key={it.key} {...makeCard(it, 'w-full aspect-[4/3]')} />
          ))}
        </div>
      </div>
    </Section>
  )
}