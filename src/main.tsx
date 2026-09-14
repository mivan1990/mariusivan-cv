import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Experience } from '@/components/sections/Experience'
import { CursorTrail } from '@/components/CursorTrail'
import { LanguageToggle } from '@/components/LanguageToggle'
import { HomeButton } from '@/components/HomeButton'
import { Intro } from '@/components/journey/intro'
import { Journey } from '@/components/journey/journey'
import { cn } from '@/lib/utils'
import './index.css'

type Screen = 'intro' | 'journey' | 'cv'

function App() {
  const [screen, setScreen] = React.useState<Screen>('intro')
  const [leaving, setLeaving] = React.useState(false)

  // trecerea intre ecrane: stinge ecranul curent, apoi il schimba
  const go = (next: Screen) => {
    setLeaving(true)
    window.setTimeout(() => {
      setScreen(next)
      setLeaving(false)
    }, 320)
  }

  return (
    <TooltipProvider delayDuration={250}>
      <div
        className={cn(
          'transition-opacity duration-300 motion-reduce:transition-none',
          leaving ? 'opacity-0' : 'opacity-100',
        )}
      >
        {screen === 'intro' && <Intro onStart={() => go('journey')} onSkip={() => go('cv')} />}
        {screen === 'journey' && <Journey onFinish={() => go('cv')} />}
        {screen === 'cv' && (
          <div className='relative min-h-screen bg-background text-foreground'>
            {/* Cele doua controale ale paginii, in oglinda: intoarcerea la
                ecranul de start in stanga, limba in dreapta. Fara primul,
                portofoliul era o fundatura — se iesea din el doar reincarcand. */}
            <div className='absolute left-5 top-5 z-50'>
              <HomeButton onClick={() => go('intro')} />
            </div>
            <div className='absolute right-5 top-5 z-50'>
              <LanguageToggle />
            </div>
            <main>
              <Experience />
            </main>
          </div>
        )}
      </div>
      <CursorTrail />
    </TooltipProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
