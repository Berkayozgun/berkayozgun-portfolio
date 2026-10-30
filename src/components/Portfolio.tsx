'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { Menu, Terminal, X } from 'lucide-react';
import profileData from '@/data/profile.json';
import en from '@/i18n/locales/en.json';
import tr from '@/i18n/locales/tr.json';
import type { Locale, ProfileData, Project } from '@/types/profile';
import ProjectModal from './ProjectModal';
import HeroSection from './sections/HeroSection';
import BentoProjects from './sections/BentoProjects';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import ContactSection from './sections/ContactSection';
import ThemeToggle from './ThemeToggle';

const profiles: Record<Locale, ProfileData> = profileData;
const translations = { en, tr };

function getSavedLocale(): Locale {
  try {
    return window.localStorage.getItem('locale') === 'tr' ? 'tr' : 'en';
  } catch {
    return 'en';
  }
}

function subscribeToLocale(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === 'locale' || event.key === null) onChange();
  };
  window.addEventListener('storage', onStorage);
  return () => window.removeEventListener('storage', onStorage);
}

const getServerLocale = (): Locale => 'en';

export default function Portfolio() {
  const savedLocale = useSyncExternalStore(subscribeToLocale, getSavedLocale, getServerLocale);
  const [sessionLocale, setSessionLocale] = useState<Locale | null>(null);
  const locale = sessionLocale ?? savedLocale;
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<Project['id'] | null>(null);


  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleLocale = () => {
    const next = locale === 'en' ? 'tr' : 'en';
    setSessionLocale(next);
    try {
      window.localStorage.setItem('locale', next);
    } catch {
      // Keep the selection for this session even if it cannot be persisted.
    }
  };

  const data = profiles[locale];
  const t = translations[locale];
  const selected = data.projects.find((project) => project.id === selectedId) ?? null;
  const scrollTo = (id: string) => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' });
    setMenuOpen(false);
  };
  const links = [['about', t.navigation.about], ['projects', t.navigation.projects], ['experience', t.navigation.experience], ['education', t.navigation.education], ['contact', t.navigation.contact]];
  return (
    <main className="relative min-h-screen bg-zinc-50 text-zinc-900 selection:bg-emerald-500/25 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
        {/* Apple HIG: Ambient Atmospheric Glow for Glass Refraction */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-48 left-1/2 -translate-x-1/2 h-[520px] w-[860px] rounded-full bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl" />
        </div>

        {/* Floating Liquid Glass Navigation Dock */}
        <header className="fixed inset-x-0 top-3.5 z-50 mx-auto w-[calc(100%-1.5rem)] max-w-5xl sm:top-6 sm:w-[calc(100%-2rem)]">
          <nav className={`liquid-glass px-4 py-2.5 transition-all duration-300 sm:px-6 ${menuOpen ? 'rounded-3xl shadow-2xl' : 'rounded-full'}`}>
            <div className="flex items-center justify-between">
              <button 
                onClick={() => scrollTo('top')} 
                className="group flex items-center gap-2.5 font-mono text-sm font-medium text-zinc-900 transition-transform active:scale-95 dark:text-zinc-100"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <Terminal size={15} />
                </span>
                <span className="tracking-tight">~/berkay-ozgun</span>
              </button>

              <div className="hidden items-center gap-1 md:flex">
                {links.map(([id, label]) => (
                  <button className="nav-link" key={id} onClick={() => scrollTo(id)}>
                    {label}
                  </button>
                ))}
                
                <div className="mx-2 h-4 w-px bg-zinc-200 dark:bg-white/10" />

                <button 
                  className="rounded-full border border-zinc-200/80 bg-zinc-100/60 px-2.5 py-1 font-mono text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-200/60 dark:border-white/10 dark:bg-zinc-800/60 dark:text-zinc-300 dark:hover:bg-white/10" 
                  onClick={toggleLocale}
                  aria-label={t.ui.switchLanguage}
                >
                  {locale.toUpperCase()}
                </button>
                <ThemeToggle labels={t.ui.theme} />
              </div>

              <button 
                className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-200/60 dark:text-zinc-300 dark:hover:bg-white/10 md:hidden" 
                onClick={() => setMenuOpen(!menuOpen)} 
                aria-label={menuOpen ? t.ui.closeMenu : t.ui.openMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

            {/* Mobile Sheet Menu */}
            {menuOpen && (
              <div id="mobile-navigation" className="mt-3 space-y-1.5 border-t border-zinc-200/80 pt-3 md:hidden dark:border-white/10">
                {links.map(([id, label]) => (
                  <button 
                    className="block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200/50 dark:text-zinc-300 dark:hover:bg-white/10" 
                    key={id} 
                    onClick={() => scrollTo(id)}
                  >
                    {label}
                  </button>
                ))}
                <div className="flex items-center justify-between pt-2">
                  <button 
                    className="px-3 py-1.5 text-xs font-mono font-medium text-emerald-500 dark:text-emerald-400" 
                    onClick={toggleLocale}
                    aria-label={t.ui.switchLanguage}
                  >
                    {locale === 'en' ? 'Türkçe' : 'English'}
                  </button>
                  <ThemeToggle labels={t.ui.theme} />
                </div>
              </div>
            )}
          </nav>
        </header>
        <div id="top"><HeroSection data={data} labels={{ available: t.hero.availableForHire, work: data.hero.cta, contact: t.hero.getInTouch }} onScroll={scrollTo} /></div>
        
        {/* Apple HIG: About Section with Categorized Skills Deck */}
        <section id="about" className="section-container border-t border-zinc-200/80 dark:border-white/10">
          <div className="mb-12">
            <p className="eyebrow">01 / {t.navigation.about}</p>
            <h2 className="section-title">{data.about.title}</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Biography Glass Panel */}
            <div className="glass-panel p-7 sm:p-9 lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-500 dark:text-emerald-400 font-semibold">
                  {t.ui.background}
                </span>
                <p className="mt-4 text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {data.about.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-200/80 dark:border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span>{t.ui.location}</span>
                <span className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> {t.ui.available}
                </span>
              </div>
            </div>

            {/* Categorized Skills Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {data.skills.map((group) => (
                <div key={group.category} className="glass-card p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight text-base mb-3">
                      {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {group.technologies.map((skill) => (
                        <span className="tag text-[11px] sm:text-xs" key={skill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BentoProjects projects={data.projects} language={locale} title={t.projects.title} detailLabel={t.projects.viewDetails} onSelect={(project) => setSelectedId(project.id)} />
        <ExperienceSection items={data.experience} title={t.experience.title} eyebrow={t.ui.timeline} />
        <EducationSection items={data.education} title={t.education.title} eyebrow={t.ui.learning} />
        <ContactSection labels={t.contact} />
        
        {/* Apple Style Refined Footer */}
        <footer className="border-t border-zinc-200/80 py-12 text-center text-sm text-zinc-500 dark:border-white/10">
          <div className="section-container !py-0 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              © {new Date().getFullYear()} Berkay Özgün · {t.footer.rights}
            </p>
            <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
              {t.ui.builtWith}
            </p>
          </div>
        </footer>

        <ProjectModal project={selected} isOpen={Boolean(selected)} onClose={() => setSelectedId(null)} language={locale} />
    </main>
  );
}
