'use client';

import { useState } from 'react';
import { ArrowUpRight, Code2, Terminal } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Locale, Project } from '@/types/profile';
import TelemetryTerminal, { ProductionBadge } from '@/components/TelemetryTerminal';
import ProjectPreview from '@/components/ProjectPreview';
import { hasCustomPreview } from '@/lib/utils';

interface BentoProjectsProps {
  projects: Project[];
  language: Locale;
  title: string;
  detailLabel: string;
  onSelect: (project: Project) => void;
}

type FilterKey = 'all' | 'web' | 'mobile' | 'ai-iot';

function matchesFilter(project: Project, filter: FilterKey): boolean {
  if (filter === 'all') return true;
  const hay = [project.category, ...(project.techStack ?? []), ...(project.tags ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (filter === 'web') {
    return /full-stack|webgl|next\.js|react\b(?! native)|pazaryeri|marketplace|simulation|simülasyon/.test(hay);
  }
  if (filter === 'mobile') {
    return /mobile|mobil|react native|kotlin|expo|android|ios/.test(hay);
  }
  return /\bai\b|iot|nlp|yapay zeka|embedded|gömülü|ml|xai/.test(hay);
}

const copy = {
  tr: {
    selectedWork: '02 / seçili çalışmalar',
    localContent: 'yerel içerik / CMS yok',
    featured: 'Öne çıkan proje',
    flagship: 'Vitrin projesi',
    preview: 'mimari önizlemesi',
    filters: {
      all: 'Tümü',
      web: 'Web & Full-Stack',
      mobile: 'Mobil',
      'ai-iot': 'AI & IoT',
    },
  },
  en: {
    selectedWork: '02 / selected work',
    localContent: 'local content / no CMS',
    featured: 'Featured Flagship',
    flagship: 'Flagship',
    preview: 'architecture preview',
    filters: {
      all: 'All',
      web: 'Web & Full-Stack',
      mobile: 'Mobile',
      'ai-iot': 'AI & IoT',
    },
  },
} satisfies Record<
  Locale,
  {
    selectedWork: string;
    localContent: string;
    featured: string;
    flagship: string;
    preview: string;
    filters: Record<FilterKey, string>;
  }
>;

function CardMedia({ project, language }: { project: Project; language: Locale }) {
  const [failed, setFailed] = useState(false);


  if (project.id === 'ultimarket') {
    return <TelemetryTerminal project={project} language={language} />;
  }

  if (hasCustomPreview(project.id)) {
    return <ProjectPreview project={project} language={language} />;
  }

  const showImage = Boolean(project.image) && !failed;

  if (!showImage) {
    return (
      <div className="mb-6 rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-zinc-100 via-white to-emerald-50/30 dark:border-white/10 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/20">
        <div className="flex items-center justify-between gap-2 rounded-t-2xl px-4 py-3 text-emerald-500 dark:text-emerald-400">
          <div className="flex items-center gap-2">
            <Terminal size={18} />
            <Code2 size={16} className="text-zinc-400 dark:text-zinc-500" />
          </div>
          <div className="flex items-center gap-2">
            {project.privacyNotice && (
              <ProductionBadge
                privacyNotice={project.privacyNotice}
                status={project.links?.status}
                language={language}
              />
            )}
            <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={18} />
          </div>
        </div>
        <Preview project={project} language={language} />
      </div>
    );
  }

  return (
    <div className="relative mb-6 rounded-2xl border border-zinc-200/80 dark:border-white/10">
      <div className="overflow-hidden rounded-2xl">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="aspect-video w-full object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          onError={() => setFailed(true)}
        />
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
      </div>
      {project.privacyNotice && (
        <div className="absolute left-3 top-3 z-10">
          <ProductionBadge
            privacyNotice={project.privacyNotice}
            status={project.links?.status}
            language={language}
          />
        </div>
      )}
      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-transform group-hover:scale-110">
        <ArrowUpRight size={16} />
      </div>
    </div>
  );
}

function Preview({ project, language }: { project: Project; language: Locale }) {
  const stack = (project.techStack || project.tags || []).slice(0, 2).join(' · ');
  return (
    <div className="px-4 pb-4 font-mono text-xs leading-relaxed" aria-label={`${project.title} ${copy[language].preview}`}>
      <span className="text-zinc-600 dark:text-zinc-400">module</span> <span className="text-zinc-700 dark:text-zinc-300">{'{'}</span>
      <br />
      <span className="pl-4 text-zinc-600 dark:text-zinc-400">
        stack: <b className="text-emerald-600 dark:text-emerald-400">{stack}</b>
      </span>
      <br />
      {project.links?.status && (
        <>
          <span className="pl-4 text-zinc-600 dark:text-zinc-400">
            status: <b className="text-emerald-600 dark:text-emerald-400">{project.links.status}</b>
          </span>
          <br />
        </>
      )}
      <span className="text-zinc-700 dark:text-zinc-300">{'}'}</span>
    </div>
  );
}

export default function BentoProjects({ projects, title, detailLabel, onSelect, language }: BentoProjectsProps) {
  const text = copy[language];
  const reducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const filterKeys: FilterKey[] = ['all', 'web', 'mobile', 'ai-iot'];
  const filteredProjects = projects.filter((project) => matchesFilter(project, activeFilter));

  return (
    <section id="projects" className="section-container">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">{text.selectedWork}</p>
          <h2 className="section-title">{title}</h2>
        </div>
        <span className="hidden font-mono text-sm text-zinc-500 md:block">{text.localContent}</span>
      </div>

      {projects.length > 1 && (
        <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label={title}>
          {filterKeys.map((key) => {
            const count = projects.filter((project) => matchesFilter(project, key)).length;
            if (key !== 'all' && count === 0) return null;
            const isActive = activeFilter === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(key)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all ${
                  isActive
                    ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-700 shadow-sm dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-300'
                    : 'border-zinc-200/80 bg-white/60 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-white/10 dark:bg-zinc-900/40 dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-zinc-200'
                }`}
              >
                <span>{text.filters[key]}</span>
                <span className="opacity-65">{count}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="grid grid-flow-row-dense auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
        {filteredProjects.map((project, index) => {
          const isFeatured = Boolean(project.isFeatured ?? project.featured ?? index === 0);
          const tags = project.techStack || project.tags || [];

          return (
            <motion.article
              key={project.id}
              layout={!reducedMotion}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`group glass-card relative flex h-full flex-col justify-between ${
                isFeatured ? 'col-span-1 md:col-span-2 p-6 md:p-8' : 'col-span-1 p-6'
              }`}
            >
              <div>
                <CardMedia key={project.image ?? ''} project={project} language={language} />
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                    {project.category || (index === 0 ? text.featured : text.flagship)}
                  </p>
                  {project.year && (
                    <span className="font-mono text-xs text-zinc-500">
                      {project.year}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      — {project.subtitle}
                    </span>
                  )}
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.summary || project.description}
                </p>

                {project.metrics && project.metrics.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-zinc-200/80 bg-zinc-100/50 p-3 dark:border-white/10 dark:bg-zinc-950/40">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="font-mono text-xs sm:text-sm font-semibold text-emerald-500 dark:text-emerald-400">
                          {m.value}
                        </div>
                        <div className="font-mono text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {(isFeatured ? tags : tags.slice(0, 4)).map((tag) => (
                    <span
                      key={tag}
                      className="tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  data-project-id={String(project.id)}
                  aria-label={`${project.title}: ${detailLabel}`}
                  aria-haspopup="dialog"
                  onClick={() => onSelect(project)}
                  className="mt-5 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-emerald-500 transition-all after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-emerald-500 group-hover:gap-2.5 dark:text-emerald-400"
                >
                  {detailLabel} <span aria-hidden="true">→</span>
                </button>
              </div>
            </motion.article>
          );
        })}
        </AnimatePresence>
      </div>
    </section>
  );
}
