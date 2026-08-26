import type { Education } from '@/types/profile';

export default function EducationSection({ items, title }: { items: Education[]; title: string }) {
  return <section id="education" className="section-container border-t border-zinc-200/80 dark:border-zinc-800/80">
    <p className="eyebrow">04 / learning</p><h2 className="section-title mb-10">{title}</h2>
    <div className="grid gap-4 md:grid-cols-2">{items.map((item) => <article key={`${item.school}-${item.date}`} className="glass-card p-6"><p className="font-mono text-xs text-emerald-400">{item.date}</p><h3 className="mt-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{item.degree}</h3><p className="mt-1 text-emerald-400">{item.school}</p><p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">{item.description}</p></article>)}</div>
  </section>;
}
