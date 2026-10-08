'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Code, Github, Globe, Lock, Terminal, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import type { Project } from '@/types/profile';
import TelemetryTerminal from './TelemetryTerminal';

function ProjectCover({ project }: { project: Project }) {
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
      <div className="flex aspect-video items-center justify-center rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 via-zinc-50 to-emerald-50 dark:border-zinc-700/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/40">
        <div className="flex flex-col items-center gap-3 px-6 text-center">
          <Terminal className="text-emerald-400" size={28} />
          <p className="font-mono text-sm text-zinc-600 dark:text-zinc-400">{project.title}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={project.image}
      alt={project.title}
      className="w-full aspect-video object-cover rounded-xl border border-zinc-700/50 shadow-lg"
      onError={() => setFailed(true)}
    />
  );
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
  language,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  language: 'tr' | 'en';
}) {
  if (!project) return null;

  const tags = project.techStack || project.tags || [];

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-zinc-950/50 backdrop-blur-sm dark:bg-zinc-950/80" />
        <Dialog.Content
          aria-describedby="project-description"
          className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-zinc-200 bg-white shadow-2xl backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/90"
        >
          <div className="flex items-center justify-between border-b border-zinc-200 p-6 dark:border-zinc-800">
            <div>
              <Dialog.Title className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {project.title}
              </Dialog.Title>
              {project.subtitle && (
                <p className="mt-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {project.subtitle}
                </p>
              )}
            </div>
            <Dialog.Close asChild>
              <button
                aria-label={language === 'tr' ? 'Kapat' : 'Close'}
                className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                <X />
              </button>
            </Dialog.Close>
          </div>
          <div className="space-y-6 p-6">
            <ProjectCover project={project} />

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-3 rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
                {project.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="font-mono text-base font-semibold text-emerald-500 dark:text-emerald-400">
                      {m.value}
                    </div>
                    <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {language === 'tr' ? 'Açıklama' : 'Description'}
              </h3>
              <Dialog.Description asChild>
                <p className="leading-7 text-zinc-700 dark:text-zinc-300">
                  {project.description}
                </p>
              </Dialog.Description>
            </div>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {language === 'tr' ? 'Öne Çıkan Özellikler' : 'Key Highlights'}
                </h3>
                <ul className="space-y-2.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 size={16} className="mt-0.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white">
                <Code size={18} /> {language === 'tr' ? 'Teknolojiler' : 'Technologies'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    className="border border-neutral-800 bg-neutral-900/50 text-neutral-400 text-xs rounded-md px-2.5 py-0.5 font-mono"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Privacy Notice Banner */}
            {project.privacyNotice && (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-xs leading-relaxed text-zinc-300">
                <Lock size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="font-mono font-medium text-emerald-400 mb-1">
                    {project.links?.status || 'In Production (Private Network)'}
                  </div>
                  <p className="text-zinc-400">{project.privacyNotice}</p>
                </div>
              </div>
            )}

            {/* Action buttons (only when external links are provided) */}
            {(project.github || project.demo) && (
              <div className="flex flex-wrap gap-3 border-t border-zinc-200 pt-5 dark:border-zinc-800">
                {project.github && (
                  <a className="button-secondary" href={project.github} target="_blank" rel="noreferrer">
                    <Github size={17} /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a className="button-primary" href={project.demo} target="_blank" rel="noreferrer">
                    <Globe size={17} /> {language === 'tr' ? 'Canlı Demo' : 'Live Demo'}
                  </a>
                )}
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
