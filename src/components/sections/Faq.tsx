import { useLanguage } from '@/hooks/useLanguage'
import { useReveal } from '@/hooks/useReveal'
import { Section, SectionHeading } from './shared'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

export function Faq() {
  const { t } = useLanguage()
  const f = t.faq
  const { ref, visible } = useReveal()

  return (
    <Section id="faq">
      <SectionHeading eyebrow={f.heading} title={f.heading} sub={f.sub} />
      <div ref={ref} className={cn('reveal mx-auto max-w-3xl', visible && 'is-visible')}>
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
    </Section>
  )
}
