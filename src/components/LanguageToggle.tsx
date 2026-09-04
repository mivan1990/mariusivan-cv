import { useLanguage } from '@/hooks/useLanguage'
import { Button } from '@/components/ui/button'

export function LanguageToggle() {
  const { lang, toggle } = useLanguage()
  return (
    <Button
      onClick={toggle}
      variant="outline"
      size="sm"
      className="gap-1.5"
      aria-label={lang === 'en' ? 'Comută pe Română' : 'Switch to English'}
    >
      <span className="font-mono-code text-xs font-semibold uppercase">
        {lang === 'en' ? 'RO' : 'EN'}
      </span>
    </Button>
  )
}
