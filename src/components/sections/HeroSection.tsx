'use client';

import { useState } from 'react';
import { ArrowDown, Check, Copy, Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ProfileData } from '@/types/profile';

interface HeroSectionProps {
  data: ProfileData;
  labels: { available: string; work: string; contact: string };
  onScroll: (id: string) => void;
}

const engineerSnippet = `const engineer = {
  focus: ['Full-Stack Web', 'Native Mobile', 'Edge & IoT'],
  stack: ['TypeScript', 'Next.js 16', 'React Native', 'Kotlin', 'Supabase'],
  openToWork: true
};`;

const stackSnippet = `{
  "web": ["Next.js 16", "React 19", "TypeScript", "Tailwind"],
  "mobile": ["React Native", "Kotlin", "Jetpack Compose"],
  "backend": ["Node.js", "Supabase", "PostgreSQL"],
  "edge_ai": ["IoT Telemetry", "Explainable AI", "NLP"]
}`;

export default function HeroSection({ data, labels, onScroll }: HeroSectionProps) {
  const reducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'engineer' | 'stack'>('engineer');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeTab === 'engineer' ? engineerSnippet : stackSnippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="relative flex min-h-[min(900px,100vh)] items-center overflow-hidden pt-28 pb-16">
      <div className="section-container relative grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Apple HIG: Dynamic Status Indicator Capsule */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-600 backdrop-blur-md shadow-sm dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            </span>
            <span className="font-mono tracking-tight">{labels.available}</span>
          </div>

          <h1 className="max-w-4xl text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 md:text-7xl dark:text-white">
            Berkay Özgün
            <span className="mt-2.5 sm:mt-3 block text-2xl sm:text-3xl font-medium tracking-tight text-zinc-500 md:text-5xl dark:text-zinc-400">
              {data.hero.title}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
            {data.hero.subtitle}
          </p>

          {data.hero.description ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {data.hero.description}
            </p>
          ) : null}

          {/* Tactile Spring Action Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <motion.button 
              whileHover={reducedMotion ? undefined : { scale: 1.02 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={() => onScroll('projects')} 
              className="button-primary"
            >
              <Terminal size={17} /> {labels.work} <ArrowDown size={15} />
            </motion.button>

            <motion.button 
              whileHover={reducedMotion ? undefined : { scale: 1.02 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={() => onScroll('contact')} 
              className="button-secondary"
            >
              <Mail size={17} /> {labels.contact}
            </motion.button>
          </div>

          <div className="mt-10 flex items-center gap-5 text-zinc-500 dark:text-zinc-400">
            <a 
              aria-label="GitHub" 
              href="https://github.com/Berkayozgun" 
              target="_blank" 
              rel="noreferrer"
              className="transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              <Github size={20} />
            </a>
            <a 
              aria-label="LinkedIn" 
              href="https://linkedin.com/in/berkayozgun" 
              target="_blank" 
              rel="noreferrer"
              className="transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              <Linkedin size={20} />
            </a>
            <span className="h-px w-10 bg-zinc-200 dark:bg-white/10" />
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">Next.js · React Native · Node</span>
          </div>
        </motion.div>

        {/* macOS Sequoia Style Code Window */}
        <motion.div 
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="code-window group relative transition-transform duration-500 hover:-translate-y-1"
        >
          <div className="code-window-bar justify-between">
            <div className="flex items-center gap-2">
              <i /><i /><i />
            </div>
            <div className="flex items-center gap-1 rounded-full border border-zinc-200/80 bg-zinc-100/70 p-0.5 dark:border-white/10 dark:bg-zinc-900/70" role="tablist" aria-label="Code preview tabs">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'engineer'}
                onClick={() => setActiveTab('engineer')}
                className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] transition-colors ${
                  activeTab === 'engineer'
                    ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
                    : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                engineer.ts
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'stack'}
                onClick={() => setActiveTab('stack')}
                className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] transition-colors ${
                  activeTab === 'stack'
                    ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
                    : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                stack.json
              </button>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? 'Copied code' : 'Copy code'}
              className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-200/70 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {copied ? <Check size={13} className="text-emerald-500 dark:text-emerald-400" /> : <Copy size={13} />}
            </button>
          </div>
          <pre className="p-5 sm:p-7 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed sm:leading-8 text-zinc-700 dark:text-zinc-300">
            {activeTab === 'engineer' ? (
              <code>
                <span className="text-zinc-500">const</span> engineer = {'{'}{'\n'}
                {'  '}focus: [<span className="text-emerald-600 dark:text-emerald-400">&apos;Full-Stack Web&apos;</span>, <span className="text-emerald-600 dark:text-emerald-400">&apos;Native Mobile&apos;</span>, <span className="text-emerald-600 dark:text-emerald-400">&apos;Edge &amp; IoT&apos;</span>],{'\n'}
                {'  '}stack: [<span className="text-emerald-600 dark:text-emerald-400">&apos;TypeScript&apos;</span>, <span className="text-emerald-600 dark:text-emerald-400">&apos;Next.js 16&apos;</span>, <span className="text-emerald-600 dark:text-emerald-400">&apos;React Native&apos;</span>, <span className="text-emerald-600 dark:text-emerald-400">&apos;Kotlin&apos;</span>, <span className="text-emerald-600 dark:text-emerald-400">&apos;Supabase&apos;</span>],{'\n'}
                {'  '}openToWork: <span className="text-emerald-600 dark:text-emerald-400">true</span>{'\n'}
                {'}'};
              </code>
            ) : (
              <code>
                {'{'}{'\n'}
                {'  '}<span className="text-zinc-500">&quot;web&quot;</span>: [<span className="text-emerald-600 dark:text-emerald-400">&quot;Next.js 16&quot;</span>, <span className="text-emerald-600 dark:text-emerald-400">&quot;React 19&quot;</span>, <span className="text-emerald-600 dark:text-emerald-400">&quot;TypeScript&quot;</span>],{'\n'}
                {'  '}<span className="text-zinc-500">&quot;mobile&quot;</span>: [<span className="text-emerald-600 dark:text-emerald-400">&quot;React Native&quot;</span>, <span className="text-emerald-600 dark:text-emerald-400">&quot;Kotlin&quot;</span>, <span className="text-emerald-600 dark:text-emerald-400">&quot;Compose&quot;</span>],{'\n'}
                {'  '}<span className="text-zinc-500">&quot;backend&quot;</span>: [<span className="text-emerald-600 dark:text-emerald-400">&quot;Node.js&quot;</span>, <span className="text-emerald-600 dark:text-emerald-400">&quot;Supabase&quot;</span>, <span className="text-emerald-600 dark:text-emerald-400">&quot;PostgreSQL&quot;</span>],{'\n'}
                {'  '}<span className="text-zinc-500">&quot;edge_ai&quot;</span>: [<span className="text-emerald-600 dark:text-emerald-400">&quot;IoT Telemetry&quot;</span>, <span className="text-emerald-600 dark:text-emerald-400">&quot;Explainable AI&quot;</span>]{'\n'}
                {'}'}
              </code>
            )}
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
