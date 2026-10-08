'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Code2, Terminal } from 'lucide-react';
import type { Project } from '@/types/profile';
import TelemetryTerminal from '@/components/TelemetryTerminal';

interface BentoProjectsProps {
  projects: Project[];
  title: string;
  detailLabel: string;
  onSelect: (project: Project) => void;
}

function cardEyebrow(project: Project, index: number) {
  if (project.category) return project.category;
  return index === 0 ? 'Featured Flagship' : 'Flagship';
}

function CardMedia({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [project.id, project.image]);

  if (project.id === 'ultimarket' || project.privacyNotice) {
    return <TelemetryTerminal project={project} />;
  }

  const showImage = Boolean(project.image) && !failed;

  if (!showImage) {
    return (
      <div className="mb-6 overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 via-white to-emerald-50 dark:border-zinc-800/80 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/30">
        <div className="flex items-center justify-between px-4 py-3 text-emerald-400">
          <div className="flex items-center gap-2">
            <Terminal size={20} />
            <Code2 size={16} className="text-zinc-500" />
          </div>
          <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />
        </div>
        <Preview project={project} />
      </div>
    );
  }

  return (
    <div className="relative mb-6 overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-700/50">
      <img
        src={project.image}
        alt={project.title}
        className="aspect-video w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
        onError={() => setFailed(true)}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent" />
      <ArrowUpRight
        className="absolute right-3 top-3 text-emerald-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
        size={20}
      />
    </div>
  );
}

function Preview({ project }: { project: Project }) {
  const stack = (project.techStack || project.tags || []).slice(0, 2).join(' · ');
  return (
    <div className="code-preview border-0 bg-transparent dark:bg-transparent" aria-label={`${project.title} architecture preview`}>
      <span className="text-zinc-500">module</span> <span className="text-zinc-300">{'{'}</span>
      <br />
      <span className="pl-4 text-zinc-500">
        stack: <b className="text-emerald-400">{stack}</b>
      </span>
      <br />
      <span className="pl-4 text-zinc-500">
        status: <b className="text-emerald-400">shipped</b>
      </span>
      <br />
      <span className="text-zinc-300">{'}'}</span>
    </div>
  );
}

export default function BentoProjects({ projects, title, detailLabel, onSelect }: BentoProjectsProps) {
  return (
    <section id="projects" className="section-container">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">02 / selected work</p>
          <h2 className="section-title">{title}</h2>
        </div>
        <span className="hidden font-mono text-sm text-zinc-500 md:block">local content / no CMS</span>
      </div>
      <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const isFeatured = Boolean(project.isFeatured || index === 0);
          const tags = project.techStack || project.tags || [];

          return (
            <article
              key={project.id}
              className={`group glass-card flex h-full cursor-pointer flex-col justify-between ${
                isFeatured ? 'col-span-1 md:col-span-2 p-6 md:p-8' : 'col-span-1 p-6'
              }`}
              onClick={() => onSelect(project)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(project)}
            >
              <div>
                <CardMedia project={project} />
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                    {cardEyebrow(project, index)}
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
                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-zinc-200/80 bg-zinc-100/60 p-3 dark:border-zinc-800/80 dark:bg-zinc-950/60">
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
                      className="border border-neutral-800 bg-neutral-900/50 text-neutral-400 text-xs rounded-md px-2.5 py-0.5 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-block text-sm font-medium text-emerald-400">
                  {detailLabel} →
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
