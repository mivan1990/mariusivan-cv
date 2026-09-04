/**
 * Conținut CV — bilingv EN/RO.
 * Sursă canonică: mariusivan-portfolio/frontend/src/components/desktop/feg/About.tsx
 * Rezumă CV-BRIEF.md §1–§3. Structurăm totul ca un singur obiect per limbă
 * ca toggle-ul să fie trivial și fără drift de traducere.
 */

export type Lang = 'en' | 'ro'

export interface TechGroup {
  zone: string
  items: string[]
}

export interface Responsibility {
  title: string
  detail: string
}

export interface Project {
  id: string
  name: string
  role: string
  status: string
  description: string
  highlight: string
  stack: string[]
  liveUrl?: string
  repoUrl?: string
  badge: string
  badgeTone: 'primary' | 'success' | 'info'
}

export interface Translation {
  meta: {
    title: string
    description: string
  }
  nav: {
    hero: string
    experience: string
    projects: string
    skills: string
    contact: string
  }
  hero: {
    eyebrow: string
    name: string
    role: string
    tagline: string
    taglineStrong: string
    location: string
    ctaPrimary: string
    ctaSecondary: string
    ctaTertiary: string
    statTeam: { value: string; label: string }
    statModules: { value: string; label: string }
    statSince: { value: string; label: string }
  }
  experience: {
    heading: string
    sub: string
    company: string
    role: string
    period: string
    intro: string
    introStrong: string
    introTail: string
    projectHeading: string
    projectBody: string
    projectBodyStrong: string
    responsibilitiesHeading: string
    responsibilities: Responsibility[]
    techHeading: string
    techGroups: TechGroup[]
  }
  projects: {
    heading: string
    sub: string
    items: Project[]
    liveDemo: string
    viewRepo: string
    comingSoon: string
  }
  skills: {
    heading: string
    sub: string
    groups: { title: string; items: string[] }[]
  }
  contact: {
    heading: string
    sub: string
    email: string
    github: string
    live: string
    note: string
  }
  footer: {
    line: string
    github: string
  }
}

export const translations: Record<Lang, Translation> = {
  en: {
    meta: {
      title: 'Marius Ivan — Software Developer',
      description:
        'Marius Ivan — Software Developer. From zero programming knowledge to building production systems for a two-brand betting group.',
    },
    nav: {
      hero: 'Home',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'Software Developer',
      name: 'Marius Ivan',
      role: 'Backend & Full-Stack Developer',
      tagline: 'Started with',
      taglineStrong: 'zero programming knowledge',
      location: 'Bucharest, Romania',
      ctaPrimary: 'View live portfolio',
      ctaSecondary: 'Browse projects',
      ctaTertiary: 'Download CV',
      statTeam: { value: '≤6', label: 'developer team I grew in' },
      statModules: { value: '82', label: 'modules in one Laravel monolith' },
      statSince: { value: '2023', label: 'shipped in production since' },
    },
    experience: {
      heading: 'Experience',
      sub: 'Where I work and what I build.',
      company: 'FEG Group — Fortuna Entertainment Group',
      role: 'Junior Developer',
      period: 'January 2023 — Present',
      intro:
        'Fortuna Entertainment Group operates two betting brands: Fortuna and Casa Pariurilor. I joined as a Junior Developer in January 2023 —',
      introStrong:
        'starting from zero programming knowledge, self-taught',
      introTail:
        '— and grew within a team of up to 6 developers.',
      projectHeading: 'Project overview',
      projectBody:
        'Large-scale internal business intranet built as a modular monolith on Laravel (82 modules), covering betting operations, HR, finance, compliance and employee productivity across',
      projectBodyStrong:
        'both brands and all shop locations.',
      responsibilitiesHeading: 'What I worked on',
      responsibilities: [
        {
          title: 'Shop operations',
          detail:
            'Built and maintained features across shop operations (shop lifecycle, openings, closures, audits, inspections).',
        },
        {
          title: 'HR',
          detail:
            'Employee onboarding, work contracts, timesheets, vacations, e-learning.',
        },
        {
          title: 'Finance',
          detail: 'Expense reports and invoice processing.',
        },
        {
          title: 'Compliance',
          detail: 'GDPR requests and document signing.',
        },
        {
          title: 'Access control',
          detail:
            'Per-resource access control on top of Entrust ACL — a hierarchical document library with 5-axis permissions (folder×shop, folder×user, file×shop, file×user, legacy JSON groups).',
        },
        {
          title: 'Blad server-rendered pages',
          detail:
            'Controllers, routes, Eloquent models, migrations, form handling.',
        },
        {
          title: 'Integrations',
          detail:
            'Microsoft Graph mailer (M365), Google Maps, and three PDF toolchains (dompdf / FPDF / wkhtmltopdf).',
        },
        {
          title: 'Scheduled jobs',
          detail:
            'Artisan commands for periodic exports, KPI rollups and archive sweeps.',
        },
      ],
      techHeading: 'Project technologies',
      techGroups: [
        { zone: 'Backend', items: ['PHP 8.2', 'Laravel 10', 'MySQL', 'Redis'] },
        { zone: 'Frontend', items: ['Blade', 'Bootstrap 5', 'jQuery'] },
        { zone: 'Storage', items: ['NetApp NFS', 'AWS S3', 'SFTP'] },
        { zone: 'Auth', items: ['Entrust ACL', 'Google 2FA', 'WebPush'] },
        {
          zone: 'Tools',
          items: [
            'Yajra Datatables',
            'dompdf',
            'FPDF',
            'wkhtmltopdf',
            'Maatwebsite Excel',
            'Microsoft Graph Mail',
          ],
        },
      ],
    },
    projects: {
      heading: 'Projects',
      sub: 'Real projects — from production to the live demo.',
      items: [
        {
          id: 'portfolio-xp',
          name: 'Portfolio XP',
          role: 'Creator & maintainer',
          status: 'Live — the strongest card',
          description:
        'An interactive Windows XP desktop: draggable windows, taskbar, start menu and applications backed by a real betting backend. The only project a recruiter can touch live in a browser.',
          highlight:
            'Moves to xp.mariusivan.ro and links from the CV with a “Live demo” button.',
          stack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'FastAPI', 'SQLite'],
          liveUrl: 'https://xp.mariusivan.ro',
          repoUrl: 'https://github.com/mivan1990/mariusivan-portfolio',
          badge: 'Live demo',
          badgeTone: 'success',
        },
        {
          id: 'cs2-leaderboard',
          name: 'CS2 Leaderboard',
          role: 'Creator & maintainer',
          status: 'Production',
          description:
            'A real production application on a local Windows machine, connected to a CS2 server. Actively used by a group of friends for 2v2 competitions: leaderboard, matches, betting and tournament brackets.',
          highlight: 'Full-stack: React+Vite frontend, FastAPI backend, C# CS2 game-state plugin.',
          stack: ['React', 'Vite', 'FastAPI', 'C#', 'SQLite'],
          repoUrl: 'https://github.com/mivan1990/CS2Leaderboard',
          badge: 'Production',
          badgeTone: 'info',
        },
        {
          id: 'fortuna-wc2026',
          name: 'Fortuna WC2026',
          role: 'Developer',
          status: 'Live data',
          description:
            'Betting on FIFA World Cup 2026 matches with a real backend (football-data.org), guest auth on UUID+JWT and 5-minute sync. Lives in the portfolio repo.',
          highlight: 'Real live match data drives the odds.',
          stack: ['React', 'TypeScript', 'Vite', 'FastAPI', 'JWT'],
          repoUrl: 'https://github.com/mivan1990/mariusivan-portfolio',
          badge: 'Live data',
          badgeTone: 'primary',
        },
      ],
      liveDemo: 'Live demo',
      viewRepo: 'View repo',
      comingSoon: 'Coming soon',
    },
    skills: {
      heading: 'Skills',
      sub: 'What I use to build.',
      groups: [
        {
          title: 'Languages',
          items: ['Python', 'PHP', 'TypeScript', 'JavaScript', 'C#'],
        },
        {
          title: 'Web',
          items: ['React', 'Laravel', 'FastAPI', 'Blade', 'Bootstrap', 'jQuery'],
        },
        {
          title: 'Build',
          items: ['Vite', 'Tailwind CSS', 'shadcn/ui', 'Radix UI'],
        },
        {
          title: 'Data & Infra',
          items: ['MySQL', 'SQLite', 'Redis', 'AWS S3', 'nginx', 'Let’s Encrypt'],
        },
        {
          title: 'Tools',
          items: ['Git', 'Artisan', 'dompdf', 'FPDF', 'wkhtmltopdf', 'Google Maps'],
        },
      ],
    },
    contact: {
      heading: 'Contact',
      sub: 'Let’s build something.',
      email: 'mariusivan.dev@gmail.com',
      github: 'github.com/mivan1990',
      live: 'mariusivan.ro',
      note: 'Open to backend, full-stack and product-engineering roles.',
    },
    footer: {
      line: 'Built with React, TypeScript, Vite, Tailwind and shadcn/ui.',
      github: 'github.com/mivan1990',
    },
  },
  ro: {
    meta: {
      title: 'Marius Ivan — Software Developer',
      description:
        'Marius Ivan — Software Developer. De la zero cunoștințe de programare la sisteme în producție pentru un grup de pariuri cu două branduri.',
    },
    nav: {
      hero: 'Acasă',
      experience: 'Experiență',
      projects: 'Proiecte',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'Software Developer',
      name: 'Marius Ivan',
      role: 'Backend & Full-Stack Developer',
      tagline: 'Am început cu',
      taglineStrong: 'zero cunoștințe de programare',
      location: 'București, România',
      ctaPrimary: 'Vezi portofoliul live',
      ctaSecondary: 'Explorează proiectele',
      ctaTertiary: 'Descarcă CV-ul',
      statTeam: { value: '≤6', label: 'echipă de developeri în care am crescut' },
      statModules: { value: '82', label: 'module într-un singur monolith Laravel' },
      statSince: { value: '2023', label: 'în producție din' },
    },
    experience: {
      heading: 'Experiență',
      sub: 'Unde lucrez și ce construiesc.',
      company: 'FEG Group — Fortuna Entertainment Group',
      role: 'Junior Developer',
      period: 'Ianuarie 2023 — Prezent',
      intro:
        'Fortuna Entertainment Group operează două branduri de pariuri: Fortuna și Casa Pariurilor. Am intrat ca Junior Developer în ianuarie 2023 —',
      introStrong:
        'începând de la zero cunoștințe de programare, autodidact',
      introTail:
        '— și am crescut într-o echipă de maximum 6 developeri.',
      projectHeading: 'Descriere proiect',
      projectBody:
        'Intranet intern la scară largă, construit ca monolith modular pe Laravel (82 module), acoperind operațiuni pariuri, HR, finanțe, conformitate și productivitate angajați pentru',
      projectBodyStrong:
        'ambele branduri și toate locațiile.',
      responsibilitiesHeading: 'Ce am lucrat',
      responsibilities: [
        {
          title: 'Operațiuni magazine',
          detail:
            'Construit și menținut funcționalități în operațiuni magazine (ciclu de viață, deschideri, închideri, audituri, inspecții).',
        },
        {
          title: 'HR',
          detail:
            'Onboarding angajați, contracte de muncă, pontaje, concedii, e-learning.',
        },
        {
          title: 'Finanțe',
          detail: 'Rapoarte de cheltuieli și procesare facturi.',
        },
        {
          title: 'Conformitate',
          detail: 'Cereri GDPR și semnare documente.',
        },
        {
          title: 'Control acces',
          detail:
            'Control acces per-resursă pe Entrust ACL — o bibliotecă de documente ierarhică cu permisiuni pe 5 axe (folder×magazin, folder×user, fișier×magazin, fișier×user, grupuri JSON legacy).',
        },
        {
          title: 'Pagini Blade server-rendered',
          detail:
            'Controllere, rute, modele Eloquent, migrații, procesare formulare.',
        },
        {
          title: 'Integrări',
          detail:
            'Microsoft Graph mailer (M365), Google Maps și trei toolchain-uri PDF (dompdf / FPDF / wkhtmltopdf).',
        },
        {
          title: 'Job-uri programate',
          detail:
            'Comenzi Artisan pentru exporturi periodice, KPI rollups și arhivare.',
        },
      ],
      techHeading: 'Tehnologii folosite în proiect',
      techGroups: [
        { zone: 'Backend', items: ['PHP 8.2', 'Laravel 10', 'MySQL', 'Redis'] },
        { zone: 'Frontend', items: ['Blade', 'Bootstrap 5', 'jQuery'] },
        { zone: 'Storage', items: ['NetApp NFS', 'AWS S3', 'SFTP'] },
        { zone: 'Auth', items: ['Entrust ACL', 'Google 2FA', 'WebPush'] },
        {
          zone: 'Tools',
          items: [
            'Yajra Datatables',
            'dompdf',
            'FPDF',
            'wkhtmltopdf',
            'Maatwebsite Excel',
            'Microsoft Graph Mail',
          ],
        },
      ],
    },
    projects: {
      heading: 'Proiecte',
      sub: 'Proiecte reale — de la producție la demo-ul live.',
      items: [
        {
          id: 'portfolio-xp',
          name: 'Portfolio XP',
          role: 'Creator & maintainer',
          status: 'Live — cardul cel mai puternic',
          description:
            'Un desktop Windows XP interactiv: ferestre draggable, taskbar, start menu și aplicații cu un backend real de pariuri. Singurul proiect pe care un recrutor îl poate atinge live în browser.',
          highlight:
            'Se mută pe xp.mariusivan.ro și e legat din CV cu un buton „Live demo”.',
          stack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'FastAPI', 'SQLite'],
          liveUrl: 'https://xp.mariusivan.ro',
          repoUrl: 'https://github.com/mivan1990/mariusivan-portfolio',
          badge: 'Demo live',
          badgeTone: 'success',
        },
        {
          id: 'cs2-leaderboard',
          name: 'CS2 Leaderboard',
          role: 'Creator & maintainer',
          status: 'Producție',
          description:
            'O aplicație reală în producție pe o mașină Windows locală, conectată la un server CS2. Folosită activ de un grup de prieteni pentru competiții 2v2: leaderboard, meciuri, pariuri și bracket de turneu.',
          highlight: 'Full-stack: frontend React+Vite, backend FastAPI, plugin CS2 în C# (game-state).',
          stack: ['React', 'Vite', 'FastAPI', 'C#', 'SQLite'],
          repoUrl: 'https://github.com/mivan1990/CS2Leaderboard',
          badge: 'Producție',
          badgeTone: 'info',
        },
        {
          id: 'fortuna-wc2026',
          name: 'Fortuna WC2026',
          role: 'Developer',
          status: 'Date live',
          description:
            'Pariuri pe meciurile FIFA World Cup 2026 cu un backend real (football-data.org), auth guest pe UUID+JWT și sync la 5 minute. Trăiește în repo-ul portfolio.',
          highlight: 'Date live de meciuri conduc cotele.',
          stack: ['React', 'TypeScript', 'Vite', 'FastAPI', 'JWT'],
          repoUrl: 'https://github.com/mivan1990/mariusivan-portfolio',
          badge: 'Date live',
          badgeTone: 'primary',
        },
      ],
      liveDemo: 'Demo live',
      viewRepo: 'Vezi repo-ul',
      comingSoon: 'Curând',
    },
    skills: {
      heading: 'Skills',
      sub: 'Cu ce construiesc.',
      groups: [
        {
          title: 'Limbi',
          items: ['Python', 'PHP', 'TypeScript', 'JavaScript', 'C#'],
        },
        {
          title: 'Web',
          items: ['React', 'Laravel', 'FastAPI', 'Blade', 'Bootstrap', 'jQuery'],
        },
        {
          title: 'Build',
          items: ['Vite', 'Tailwind CSS', 'shadcn/ui', 'Radix UI'],
        },
        {
          title: 'Date & Infrastructură',
          items: ['MySQL', 'SQLite', 'Redis', 'AWS S3', 'nginx', 'Let’s Encrypt'],
        },
        {
          title: 'Instrumente',
          items: ['Git', 'Artisan', 'dompdf', 'FPDF', 'wkhtmltopdf', 'Google Maps'],
        },
      ],
    },
    contact: {
      heading: 'Contact',
      sub: 'Să construim ceva.',
      email: 'mariusivan.dev@gmail.com',
      github: 'github.com/mivan1990',
      live: 'mariusivan.ro',
      note: 'Deschis la roluri de backend, full-stack și product-engineering.',
    },
    footer: {
      line: 'Construit cu React, TypeScript, Vite, Tailwind și shadcn/ui.',
      github: 'github.com/mivan1990',
    },
  },
}