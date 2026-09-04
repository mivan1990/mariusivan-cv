import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'
import { Faq } from '@/components/sections/Faq'
import { Footer } from '@/components/sections/Footer'
import { CursorTrail } from '@/components/CursorTrail'
import './index.css'

function App() {
  return (
    <TooltipProvider delayDuration={250}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
          <Faq />
        </main>
        <Footer />
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
