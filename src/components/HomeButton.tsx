import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { Button } from '@/components/ui/button'

interface HomeButtonProps {
  onClick: () => void
}

/**
 * Intoarcerea la ecranul de start, de pe pagina de portofoliu.
 *
 * Pana acum, ecranul de portofoliu era o fundatura: odata ajuns pe el, prin
 * calatorie sau sarind peste ea, nu mai aveai cum sa te intorci la stele decat
 * reincarcand pagina.
 *
 * Eticheta statea in `nav.hero`, dar grupul `nav` erau linkurile barei de
 * navigare, stearsa odata cu restul paginii vechi. Acum are cheia ei, `home`.
 */
export function HomeButton({ onClick }: HomeButtonProps) {
  const { t } = useLanguage()
  return (
    <Button onClick={onClick} variant="outline" size="sm" className="gap-1.5">
      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="text-xs font-medium">{t.home}</span>
    </Button>
  )
}
