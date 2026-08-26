'use client';

import { Code, Github, Globe, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import type { Project } from '@/types/profile';

export default function ProjectModal({ project, isOpen, onClose, language }: { project: Project | null; isOpen: boolean; onClose: () => void; language: 'tr' | 'en' }) {
  if (!project) return null;
  return <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-zinc-950/50 backdrop-blur-sm dark:bg-zinc-950/80" />
      <Dialog.Content aria-describedby="project-description" className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-zinc-200 bg-white shadow-2xl backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/60">
        <div className="flex items-center justify-between border-b border-zinc-200 p-6 dark:border-zinc-800"><Dialog.Title className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</Dialog.Title><Dialog.Close asChild><button aria-label={language === 'tr' ? 'Kapat' : 'Close'} className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"><X /></button></Dialog.Close></div>
        <div className="space-y-7 p-6">
          <div className="code-preview flex aspect-video items-center justify-center rounded-xl text-center"><Code className="mr-3" /> {project.image || 'architecture / implementation preview'}</div>
          <div><h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{language === 'tr' ? 'Açıklama' : 'Description'}</h3><p id="project-description" className="leading-7 text-zinc-700 dark:text-zinc-300">{project.description}</p></div>
          <div><h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white"><Code size={18} /> {language === 'tr' ? 'Teknolojiler' : 'Technologies'}</h3><div className="flex flex-wrap gap-2">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div>
          <div className="flex flex-wrap gap-3 border-t border-zinc-200 pt-5 dark:border-zinc-800">{project.github && <a className="button-secondary" href={project.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>}{project.demo && <a className="button-primary" href={project.demo} target="_blank" rel="noreferrer"><Globe size={17} /> {language === 'tr' ? 'Canlı Demo' : 'Live Demo'}</a>}</div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
