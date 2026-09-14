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
 * Eticheta refoloseste `nav.hero`, care e deja „Home” / „Acasa” in traduceri —
 * o cheie noua ar fi insemnat acelasi cuvant scris a doua oara, cu riscul ca
 * cele doua sa se desincronizeze la prima corectura.
 */
export function HomeButton({ onClick }: HomeButtonProps) {
  const { t } = useLanguage()
  return (
    <Button onClick={onClick} variant="outline" size="sm" className="gap-1.5">
      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="text-xs font-medium">{t.nav.hero}</span>
    </Button>
  )
}
