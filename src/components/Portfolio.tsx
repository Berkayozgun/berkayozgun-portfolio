'use client';

import { useEffect, useState } from 'react';
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

export default function Portfolio() {
  const [locale, setLocale] = useState<Locale>('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  useEffect(() => { const saved = window.localStorage.getItem('locale'); if (saved === 'tr' || saved === 'en') setLocale(saved); }, []);
  const data = profiles[locale];
  const t = translations[locale];
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  const links = [['about', t.navigation.about], ['projects', t.navigation.projects], ['experience', t.navigation.experience], ['education', t.navigation.education], ['contact', t.navigation.contact]];
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-100">
        <nav className="fixed inset-x-0 top-0 z-40 border-b border-zinc-200/80 bg-zinc-50/80 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
            <button onClick={() => scrollTo('top')} className="flex items-center gap-2 font-mono text-sm text-zinc-900 dark:text-zinc-100">
              <Terminal className="text-emerald-400" size={20} /> ~/berkay-ozgun
            </button>
            <div className="hidden items-center gap-1 md:flex">
              {links.map(([id, label]) => <button className="nav-link" key={id} onClick={() => scrollTo(id)}>{label}</button>)}
              <button className="nav-link" onClick={() => { const next = locale === 'en' ? 'tr' : 'en'; setLocale(next); window.localStorage.setItem('locale', next); }}>{locale.toUpperCase()}</button>
              <ThemeToggle />
            </div>
            <button className="rounded-lg p-2 text-zinc-700 dark:text-zinc-300 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">{menuOpen ? <X /> : <Menu />}</button>
          </div>
          {menuOpen && <div className="space-y-1 border-t border-zinc-200 px-5 py-4 md:hidden dark:border-zinc-800">
            {links.map(([id, label]) => <button className="block w-full py-2 text-left text-zinc-700 dark:text-zinc-300" key={id} onClick={() => scrollTo(id)}>{label}</button>)}
            <button className="py-2 text-emerald-400" onClick={() => setLocale(locale === 'en' ? 'tr' : 'en')}>{locale === 'en' ? 'Türkçe' : 'English'}</button>
          </div>}
        </nav>
        <div id="top"><HeroSection data={data} labels={{ available: 'Open to work', work: data.hero.cta, contact: t.hero.getInTouch }} onScroll={scrollTo} /></div>
        <section id="about" className="section-container border-t border-zinc-200/80 dark:border-zinc-800/80">
          <p className="eyebrow">01 / about</p>
          <h2 className="section-title">{data.about.title}</h2>
          <p className="mt-5 max-w-3xl leading-8 text-zinc-600 dark:text-zinc-400">{data.about.description}</p>
          <div className="mt-8 flex flex-wrap gap-2">{data.skills.flatMap((group) => group.technologies).map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div>
        </section>
        <BentoProjects projects={data.projects} title={t.projects.title} detailLabel={t.projects.viewDetails} onSelect={setSelected} />
        <ExperienceSection items={data.experience} title={t.experience.title} />
        <EducationSection items={data.education} title={t.education.title} />
        <ContactSection labels={{ title: t.contact.title, description: t.contact.description, copyEmail: t.contact.copyEmail, copied: t.contact.copied, sendEmail: t.contact.sendEmail, linkedin: t.contact.linkedin, github: t.contact.github }} />
        <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800">© {new Date().getFullYear()} Berkay Özgün · {t.footer.rights}</footer>
        <ProjectModal project={selected} isOpen={Boolean(selected)} onClose={() => setSelected(null)} language={locale} />
    </main>
  );
}
