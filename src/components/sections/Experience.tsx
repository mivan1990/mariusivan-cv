import { useLanguage } from '@/hooks/useLanguage'
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

// 8 elemente pe harta (pozitiile top/left sunt procentuale).
// Pozitiile sunt imprastiate intentionat, la inaltimi diferite, ca harta sa nu
// se citeasca a grila; banda centrala ramane libera pentru blocul cu poza.
const MAP_ITEMS = [
  { key: 'portfolio-xp',  kind: 'photo', pos: 'top-[1%] left-[2%] md:top-[2%] md:left-[4%]',    box: 'w-20 aspect-[4/3] md:w-32 lg:w-44',      depth: 1.4 },
  { key: 'skills',        kind: 'tile',  pos: 'top-[4%] left-[44%] md:top-[8%] md:left-[28%]',  box: 'w-14 aspect-square md:w-24 lg:w-32',     depth: 0.9 },
  { key: 'fegbet',        kind: 'photo', pos: 'top-[12%] left-[72%] md:top-[6%] md:left-[72%]', box: 'w-20 aspect-square md:w-32 lg:w-44',     depth: 2 },
  { key: 'contact',       kind: 'tile',  pos: 'top-[36%] left-[0%] md:top-[38%] md:left-[3%]',  box: 'w-14 aspect-square md:w-24 lg:w-32',     depth: 1.2 },
  { key: 'voteaza-liga2', kind: 'photo', pos: 'top-[70%] left-[4%] md:top-[72%] md:left-[18%]', box: 'w-16 aspect-[31/35] md:w-24 lg:w-32',    depth: 1.1 },
  { key: 'intranet',      kind: 'photo', pos: 'top-[74%] left-[42%] md:top-[73%] md:left-[50%]',box: 'w-20 aspect-[4/3] md:w-32 lg:w-48',      depth: 0.7 },
  { key: 'faq',           kind: 'tile',  pos: 'top-[52%] left-[80%] md:top-[46%] md:left-[84%]',box: 'w-14 aspect-square md:w-24 lg:w-28',     depth: 1.5 },
  { key: 'numlock',       kind: 'photo', pos: 'top-[86%] left-[68%] md:top-[70%] md:left-[76%]',box: 'w-16 aspect-square md:w-24 lg:w-32',     depth: 1.3 },
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
}

// Componenta interna MapCard(label, visual, children).
function MapCard({ label, visual, panel, url, headerImg }: MapCardData) {
  const { t } = useLanguage()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="block rounded-xl text-left transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {visual}
          <span className="mt-1.5 block text-center text-[10px] font-medium leading-tight text-foreground md:mt-2 md:text-xs">{label}</span>
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
    }
  }

  return (
    <Section id="experience" className="bg-background text-foreground">
      <div className="relative min-h-[560px] md:min-h-[680px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden text-foreground opacity-40 md:block">
          <FloatingPaths />
        </div>
        {/* bloc central — static pe mobil, centrat + z-10 pe desktop.
            Poza, sub ea numele, apoi compania si rolul/perioada.
            Latimea e mica intentionat (numele companiei se rupe pe doua randuri):
            asa ramane loc pentru cardurile care plutesc in jur. */}
        <div className="absolute left-1/2 top-1/2 z-10 w-[min(190px,58%)] -translate-x-1/2 -translate-y-1/2 md:w-[min(420px,44%)]">
          <div className="flex flex-col items-center text-center">
            {/* Poza e patrata (512px) si decupata pe fata, nu pe mijlocul
                geometric — originalul e un portret cu capul in treimea de sus,
                iar un decupaj centrat ii taia parul. */}
            <img
              src="/marius.jpg"
              alt={e.personName}
              width={144}
              height={144}
              loading="lazy"
              decoding="async"
              className="h-20 w-20 rounded-full border border-border object-cover md:h-28 md:w-28 lg:h-36 lg:w-36"
            />
            <div className="mt-3 text-lg font-bold tracking-tight text-foreground md:mt-4 md:text-2xl lg:text-3xl">
              {e.personName}
            </div>
            <div className="mt-1.5 text-xs font-semibold leading-snug text-foreground md:mt-2 md:text-base lg:text-lg">
              {e.company}
            </div>
            <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-2 text-[11px] text-muted-foreground md:text-sm">
              <span className="font-medium">{e.role}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-code text-xs">{e.period}</span>
            </div>
          </div>
        </div>

        {/* harta — elemente plutitoare, doar desktop */}
        <Floating sensitivity={0.5} className="absolute inset-0 z-10">
          {MAP_ITEMS.map((it) => (
            <FloatingElement key={it.key} depth={it.depth} className={cn('absolute', it.pos)}>
              <MapCard {...makeCard(it, it.box)} />
            </FloatingElement>
          ))}
        </Floating>

      </div>
    </Section>
  )
}