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
  eyebrow: string;
  channel: string;
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
    <section id="contact" className="section-container border-t border-zinc-200/80 dark:border-white/10">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow">05 / {labels.eyebrow}</p>
        <h2 className="section-title mb-8">{labels.title}</h2>

        <div className="glass-panel p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle ambient accent glow inside the card */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <Mail size={13} />
                <span>{labels.channel}</span>
              </div>

              <p className="text-lg md:text-xl leading-relaxed text-zinc-700 dark:text-zinc-200">
                {labels.description}
              </p>
              
              <p className="mt-2 font-mono text-sm text-zinc-500 dark:text-zinc-400">
                {emailAddress}
              </p>

              <button
                type="button"
                onClick={copyEmail}
                className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-zinc-200/90 bg-white/90 px-4 py-2.5 font-mono text-xs font-medium text-zinc-800 shadow-sm transition-all hover:bg-zinc-100 active:scale-95 dark:border-white/10 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                {copied ? <Check size={15} className="text-emerald-500 dark:text-emerald-400" /> : <Copy size={15} className="text-zinc-400" />}
                <span>{copied ? labels.copied : labels.copyEmail}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <a className="button-primary" href={`mailto:${emailAddress}`}>
                <Mail size={16} />
                {labels.sendEmail}
              </a>
              <a className="button-secondary" href="https://linkedin.com/in/berkayozgun" target="_blank" rel="noreferrer">
                <Linkedin size={16} />
                {labels.linkedin}
              </a>
              <a className="button-secondary" href="https://github.com/Berkayozgun" target="_blank" rel="noreferrer">
                <Github size={16} />
                {labels.github}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
