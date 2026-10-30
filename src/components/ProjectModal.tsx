'use client';

import { useRef, useState } from 'react';
import { CheckCircle2, Code, Github, Globe, Lock, Terminal, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import type { Locale, Project } from '@/types/profile';
import TelemetryTerminal from './TelemetryTerminal';

const copy = {
  tr: {
    close: 'Kapat',
    description: 'Açıklama',
    highlights: 'Öne Çıkan Özellikler',
    technologies: 'Teknolojiler',
    privacy: 'Gizlilik bilgisi',
    demo: 'Canlı Demo',
  },
  en: {
    close: 'Close',
    description: 'Description',
    highlights: 'Key Highlights',
    technologies: 'Technologies',
    privacy: 'Privacy information',
    demo: 'Live Demo',
  },
} satisfies Record<Locale, Record<'close' | 'description' | 'highlights' | 'technologies' | 'privacy' | 'demo', string>>;

function ProjectCover({ project, language }: { project: Project; language: Locale }) {
  const [failed, setFailed] = useState(false);


  if (project.id === 'ultimarket' || project.privacyNotice) {
    return <TelemetryTerminal project={project} language={language} />;
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
      loading="lazy"
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
  language: Locale;
}) {
  const openerRef = useRef<HTMLElement | null>(null);
  const text = copy[language];

  if (!project) return null;

  const tags = project.techStack || project.tags || [];

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-md dark:bg-zinc-950/75 transition-opacity" />
        <Dialog.Content
          onEscapeKeyDown={(event) => {
            const descriptionId = document.activeElement?.getAttribute('aria-describedby');
            // Radix handles Escape in capture phase, before the tooltip button can dismiss it.
            if (descriptionId && document.getElementById(descriptionId)?.getAttribute('role') === 'tooltip') {
              event.preventDefault();
            }
          }}
          onOpenAutoFocus={() => {
            openerRef.current = document.activeElement instanceof HTMLElement
              ? document.activeElement
              : null;
          }}
          onCloseAutoFocus={(event) => {
            // There is no Dialog.Trigger; locate the current localized card by stable project ID.
            event.preventDefault();
            const cardButton = Array.from(document.querySelectorAll<HTMLButtonElement>('button[data-project-id]'))
              .find((button) => button.dataset.projectId === String(project.id));
            const target = cardButton || openerRef.current;
            if (target?.isConnected) target.focus();
          }}
          className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-zinc-200/90 bg-white/95 shadow-[0_25px_60px_rgba(0,0,0,0.2)] backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-900/95"
        >
          <div className="flex items-center justify-between border-b border-zinc-200/80 p-6 sm:p-7 dark:border-white/10">
            <div>
              <Dialog.Title className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
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
                type="button"
                aria-label={text.close}
                className="flex h-8 w-8 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 bg-zinc-100 text-zinc-500 transition-all hover:bg-zinc-200 hover:text-zinc-900 active:scale-95 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
              >
                <X size={16} />
              </button>
            </Dialog.Close>
          </div>
          <div className="space-y-6 p-6 sm:p-7">
            <ProjectCover key={`${project.id}:${project.image ?? ''}`} project={project} language={language} />

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-100/50 p-4 dark:border-white/10 dark:bg-zinc-950/40">
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
              <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {text.description}
              </h3>
              <Dialog.Description asChild>
                <p className="leading-relaxed text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
                  {project.description}
                </p>
              </Dialog.Description>
            </div>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h3 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {text.highlights}
                </h3>
                <ul className="space-y-2.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                      <CheckCircle2 size={16} className="mt-0.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-white">
                <Code size={17} /> {text.technologies}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    className="tag"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Privacy Notice Banner */}
            {project.privacyNotice && (
              <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                <Lock size={15} className="text-emerald-500 dark:text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="font-mono font-medium text-emerald-600 dark:text-emerald-400 mb-1">
                    {project.links?.status || text.privacy}
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">{project.privacyNotice}</p>
                </div>
              </div>
            )}

            {/* Action buttons (only when external links are provided) */}
            {(project.github || project.demo) && (
              <div className="flex flex-wrap gap-3 border-t border-zinc-200/80 pt-5 dark:border-white/10">
                {project.github && (
                  <a className="button-secondary" href={project.github} target="_blank" rel="noreferrer">
                    <Github size={16} /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a className="button-primary" href={project.demo} target="_blank" rel="noreferrer">
                    <Globe size={16} /> {text.demo}
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
