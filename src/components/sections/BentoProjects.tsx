'use client';

import { ArrowUpRight, Code2 } from 'lucide-react';
import type { Project } from '@/types/profile';

interface BentoProjectsProps {
  projects: Project[];
  title: string;
  detailLabel: string;
  onSelect: (project: Project) => void;
}

function Preview({ project }: { project: Project }) {
  return (
    <div className="code-preview" aria-label={`${project.title} architecture preview`}>
      <span className="text-zinc-500">module</span> <span className="text-zinc-300">{'{'}</span><br />
      <span className="pl-4 text-zinc-500">stack: <b className="text-emerald-400">{project.tags.slice(0, 2).join(' · ')}</b></span><br />
      <span className="pl-4 text-zinc-500">status: <b className="text-emerald-400">shipped</b></span><br />
      <span className="text-zinc-300">{'}'}</span>
    </div>
  );
}

export default function BentoProjects({ projects, title, detailLabel, onSelect }: BentoProjectsProps) {
  return (
    <section id="projects" className="section-container">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div><p className="eyebrow">02 / selected work</p><h2 className="section-title">{title}</h2></div>
        <span className="hidden font-mono text-sm text-zinc-500 md:block">local content / no CMS</span>
      </div>
      <div className="grid auto-rows-fr grid-cols-1 gap-4 lg:grid-cols-12">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className={`group glass-card flex h-full cursor-pointer flex-col justify-between ${
              index === 0
                ? 'lg:col-span-8 p-6 md:p-8'
                : index === 1
                  ? 'lg:col-span-4 p-6'
                  : index === 2 || index === 3
                    ? 'lg:col-span-6 p-6'
                    : 'lg:col-span-4 p-5'
            }`}
            onClick={() => onSelect(project)}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(project)}
          >
            <div>
              <div className="mb-6 flex items-center justify-between text-emerald-400">
                <Code2 size={22} />
                <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={20} />
              </div>
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-zinc-500">
                {index === 0 ? 'featured / ReHeal' : index === 1 ? 'stack / metrics' : 'project'}
              </p>
              <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{project.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{project.description}</p>
            </div>
            <div className="mt-6">
              <Preview project={project} />
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>
              <span className="mt-5 inline-block text-sm font-medium text-emerald-400">{detailLabel} →</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
