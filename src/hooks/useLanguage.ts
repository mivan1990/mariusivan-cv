import { useCallback, useEffect, useState } from 'react'
import { translations, type Lang, type Translation } from '@/i18n/translations'

const STORAGE_KEY = 'cv:lang'

function readInitial(): Lang {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'ro') return stored
  const nav = window.navigator.language.toLowerCase()
  return nav.startsWith('ro') ? 'ro' : 'en'
}

export function useLanguage() {
  const [lang, setLang] = useState<Lang>(readInitial)
  const [t, setT] = useState<Translation>(translations[readInitial])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    setT(translations[lang])
    document.documentElement.lang = lang
  }, [lang])

  const toggle = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ro' : 'en'))
  }, [])

  return { lang, t, toggle }
}
