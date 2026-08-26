'use client';

import { ArrowDown, Github, Linkedin, Mail, Terminal } from 'lucide-react';
import type { ProfileData } from '@/types/profile';

interface HeroSectionProps {
  data: ProfileData;
  labels: { available: string; work: string; contact: string };
  onScroll: (id: string) => void;
}

export default function HeroSection({ data, labels, onScroll }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[min(900px,100vh)] items-center overflow-hidden pt-24">
      <div className="section-container relative grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white/80 px-3 py-1 font-mono text-sm text-zinc-600 dark:border-zinc-700/80 dark:bg-zinc-900/60 dark:text-zinc-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> {labels.available}
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-zinc-900 md:text-7xl dark:text-zinc-100">
            Berkay Özgün
            <span className="mt-3 block text-3xl text-emerald-400 md:text-5xl">
              {data.hero.title}
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-xl text-zinc-600 dark:text-zinc-400">{data.hero.subtitle}</p>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">{data.hero.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={() => onScroll('projects')} className="button-primary">
              <Terminal size={18} /> {labels.work} <ArrowDown size={16} />
            </button>
            <button onClick={() => onScroll('contact')} className="button-secondary">
              <Mail size={18} /> {labels.contact}
            </button>
          </div>
          <div className="mt-10 flex items-center gap-5 text-zinc-600 dark:text-zinc-400">
            <a aria-label="GitHub" href="https://github.com/Berkayozgun" target="_blank" rel="noreferrer"><Github /></a>
            <a aria-label="LinkedIn" href="https://linkedin.com/in/berkayozgun" target="_blank" rel="noreferrer"><Linkedin /></a>
            <span className="h-px w-12 bg-zinc-300 dark:bg-zinc-700" />
            <span className="font-mono text-sm">TypeScript · React · ML</span>
          </div>
        </div>
        <div className="code-window">
          <div className="code-window-bar"><i /><i /><i /></div>
          <pre className="p-7 font-mono text-sm leading-8 text-zinc-700 dark:text-zinc-300"><code><span className="text-zinc-500">const</span> engineer = {'{'}{'\n'}  focus: <span className="text-emerald-400">&apos;useful products&apos;</span>,{'\n'}  stack: [<span className="text-emerald-400">&apos;Next.js&apos;</span>, <span className="text-emerald-400">&apos;Supabase&apos;</span>],{'\n'}  research: <span className="text-emerald-400">&apos;NLP + XAI&apos;</span>,{'\n'}  shipping: <span className="text-emerald-400">true</span>{'\n'}{'}'};</code></pre>
        </div>
      </div>
    </section>
  );
}
