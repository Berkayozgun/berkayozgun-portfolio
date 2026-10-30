import { Briefcase } from 'lucide-react';
import type { Experience } from '@/types/profile';

export default function ExperienceSection({ items, title, eyebrow }: { items: Experience[]; title: string; eyebrow: string }) {
  return (
    <section id="experience" className="section-container border-t border-zinc-200/80 dark:border-white/10">
      <div className="mb-12">
        <p className="eyebrow">03 / {eyebrow}</p>
        <h2 className="section-title">{title}</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {items.map((item) => (
          <article 
            key={`${item.company}-${item.period}`} 
            className="glass-card p-7 sm:p-8 flex flex-col justify-between group"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Briefcase size={15} />
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {item.company}
                  </h3>
                </div>

                <span className="rounded-full border border-zinc-200/80 bg-zinc-100/60 px-3 py-1 font-mono text-xs text-zinc-600 dark:border-white/10 dark:bg-zinc-800/60 dark:text-zinc-300">
                  {item.period}
                </span>
              </div>

              <p className="font-medium text-emerald-600 dark:text-emerald-400 text-sm mb-4">
                {item.role}
              </p>

              <p className="leading-relaxed text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
