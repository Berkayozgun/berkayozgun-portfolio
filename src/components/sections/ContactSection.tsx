'use client';

import { useState } from 'react';
import { Check, Copy, Github, Linkedin, Mail } from 'lucide-react';

const emailAddress = 'berkayozgun001@gmail.com';

type ContactLabels = {
  title: string;
  description: string;
  copyEmail: string;
  copied: string;
  sendEmail: string;
  linkedin: string;
  github: string;
};

export default function ContactSection({ labels }: { labels: ContactLabels }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="section-container border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow">05 / contact</p>
        <h2 className="section-title mb-8">{labels.title}</h2>
        <div className="rounded-2xl border border-zinc-200 bg-white/80 p-6 text-zinc-900 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100 md:p-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
                <Mail size={15} />
                <span>open_channel</span>
              </div>
              <p className="text-lg leading-8 text-zinc-700 dark:text-zinc-300">{labels.description}</p>
              <p className="font-mono text-sm text-zinc-500">{emailAddress}</p>
              <button
                type="button"
                onClick={copyEmail}
                className="mt-6 inline-flex items-center gap-3 rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 font-mono text-sm text-zinc-900 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-100 dark:hover:border-zinc-500"
              >
                {copied ? <Check size={17} className="text-emerald-400" /> : <Copy size={17} className="text-zinc-400" />}
                <span>{copied ? labels.copied : labels.copyEmail}</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              <a className="button-secondary" href={`mailto:${emailAddress}`}>
                <Mail size={17} />
                {labels.sendEmail}
              </a>
              <a className="button-secondary" href="https://linkedin.com/in/berkayozgun" target="_blank" rel="noreferrer">
                <Linkedin size={17} />
                {labels.linkedin}
              </a>
              <a className="button-secondary" href="https://github.com/Berkayozgun" target="_blank" rel="noreferrer">
                <Github size={17} />
                {labels.github}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
