import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Experience } from '@/components/sections/Experience'
import { CursorTrail } from '@/components/CursorTrail'
import { LanguageToggle } from '@/components/LanguageToggle'
import './index.css'

function App() {
  return (
    <TooltipProvider delayDuration={250}>
      <div className='relative min-h-screen bg-background text-foreground'>
        {/* comutatorul de limba — singurul control ramas pe ecran */}
        <div className='absolute right-5 top-5 z-50'>
          <LanguageToggle />
        </div>
        <main>
          <Experience />
        </main>
      </div>
      <CursorTrail />
    </TooltipProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
