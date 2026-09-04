'use client';

import { useEffect, useState } from 'react';
import { Code, Github, Globe, Terminal, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import type { Project } from '@/types/profile';

function ProjectCover({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [project.id, project.image]);

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

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-zinc-950/50 backdrop-blur-sm dark:bg-zinc-950/80" />
        <Dialog.Content
          aria-describedby="project-description"
          className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-zinc-200 bg-white shadow-2xl backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/60"
        >
          <div className="flex items-center justify-between border-b border-zinc-200 p-6 dark:border-zinc-800">
            <Dialog.Title className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              {project.title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                aria-label={language === 'tr' ? 'Kapat' : 'Close'}
                className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                <X />
              </button>
            </Dialog.Close>
          </div>
          <div className="space-y-7 p-6">
            <ProjectCover project={project} />
            <div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {language === 'tr' ? 'Açıklama' : 'Description'}
              </h3>
              <p id="project-description" className="leading-7 text-zinc-700 dark:text-zinc-300">
                {project.description}
              </p>
            </div>
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white">
                <Code size={18} /> {language === 'tr' ? 'Teknolojiler' : 'Technologies'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
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
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
