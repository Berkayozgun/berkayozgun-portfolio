'use client';

import { ArrowDown, Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ProfileData } from '@/types/profile';

interface HeroSectionProps {
  data: ProfileData;
  labels: { available: string; work: string; contact: string };
  onScroll: (id: string) => void;
}

export default function HeroSection({ data, labels, onScroll }: HeroSectionProps) {
  const reducedMotion = useReducedMotion();

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
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">engineer.ts</span>
            <div className="w-10" />
          </div>
          <pre className="p-5 sm:p-7 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed sm:leading-8 text-zinc-700 dark:text-zinc-300">
            <code>
              <span className="text-zinc-500">const</span> engineer = {'{'}{'\n'}
              {'  '}building: <span className="text-emerald-500 dark:text-emerald-400">&apos;ReHeal&apos;</span>,{'\n'}
              {'  '}stack: [<span className="text-emerald-500 dark:text-emerald-400">&apos;Next.js&apos;</span>, <span className="text-emerald-500 dark:text-emerald-400">&apos;Expo&apos;</span>, <span className="text-emerald-500 dark:text-emerald-400">&apos;Node&apos;</span>],{'\n'}
              {'  '}openToWork: <span className="text-emerald-500 dark:text-emerald-400">true</span>{'\n'}
              {'}'};
            </code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
