import { useLanguage } from '@/hooks/useLanguage'
import { Starfield } from '@/components/journey/starfield'
import { LanguageToggle } from '@/components/LanguageToggle'

interface IntroProps {
  onStart: () => void
  onSkip: () => void
}

// Ecranul de intrare: fundal de spatiu, titlu, text si doua butoane
// (porneste calatoria / sari direct la CV).
export function Intro({ onStart, onSkip }: IntroProps) {
  const { t } = useLanguage()

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-5 text-center text-white'>
      <Starfield />

      <div className='relative z-10 max-w-xl animate-journey-in'>
        <h1 className='text-3xl font-bold tracking-tight sm:text-[2.9rem] sm:leading-none'>{t.journey.introTitle}</h1>
        <p className='mt-4 text-base leading-relaxed text-white/70'>{t.journey.introText}</p>

        <div className='mt-9 flex flex-wrap items-center justify-center gap-3'>
          <button
            type='button'
            onClick={onStart}
            className='rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60'
          >
            {t.journey.start}
          </button>
          <button
            type='button'
            onClick={onSkip}
            className='rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40'
          >
            {t.journey.skip}
          </button>
        </div>
      </div>

      {/* comutatorul de limba, in stanga sus */}
      <div className='absolute left-5 top-5 z-10'>
        <LanguageToggle />
      </div>
    </div>
  )
}