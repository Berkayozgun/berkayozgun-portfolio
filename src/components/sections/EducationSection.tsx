import { GraduationCap } from 'lucide-react';
import type { Education } from '@/types/profile';

export default function EducationSection({ items, title, eyebrow }: { items: Education[]; title: string; eyebrow: string }) {
  return (
    <section id="education" className="section-container border-t border-zinc-200/80 dark:border-white/10">
      <div className="mb-12">
        <p className="eyebrow">04 / {eyebrow}</p>
        <h2 className="section-title">{title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <article 
            key={`${item.school}-${item.date}`} 
            className="glass-card p-7 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <GraduationCap size={16} />
                  </span>
                  <p className="font-medium text-emerald-600 dark:text-emerald-400 text-sm">
                    {item.school}
                  </p>
                </div>

                <span className="rounded-full border border-zinc-200/80 bg-zinc-100/60 px-3 py-1 font-mono text-xs text-zinc-600 dark:border-white/10 dark:bg-zinc-800/60 dark:text-zinc-300">
                  {item.date}
                </span>
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">
                {item.degree}
              </h3>

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
