import { useCallback, useSyncExternalStore } from 'react'
import { translations, type Lang, type Translation } from '@/i18n/translations'

const STORAGE_KEY = 'cv:lang'

function readInitial(): Lang {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'ro') return stored
  const nav = window.navigator.language.toLowerCase()
  return nav.startsWith('ro') ? 'ro' : 'en'
}

// Single source of truth at module level: one shared `lang` variable plus
// the set of subscribers. Every useLanguage() call reads from here, so all
// components see the same language and re-render together on a toggle.
let lang: Lang = readInitial()
const listeners = new Set<() => void>()

// Sync the initial value into localStorage and <html lang> once, on load.
if (typeof window !== 'undefined') {
  window.localStorage.setItem(STORAGE_KEY, lang)
  document.documentElement.lang = lang
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

// Stable snapshot: returns the primitive `lang`, never a new object, so
// React's Object.is comparison stays stable and no infinite loop occurs.
function getSnapshot(): Lang {
  return lang
}

function setLang(next: Lang) {
  if (next === lang) return
  lang = next
  window.localStorage.setItem(STORAGE_KEY, lang)
  document.documentElement.lang = lang
  for (const listener of listeners) listener()
}

export function useLanguage(): { lang: Lang; t: Translation; toggle: () => void } {
  const current = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const t: Translation = translations[current]

  const toggle = useCallback(() => {
    // Read the module-level `lang` directly (always fresh, no stale closure).
    setLang(lang === 'en' ? 'ro' : 'en')
  }, [])

  return { lang: current, t, toggle }
}