import type { Experience } from '@/types/profile';

export default function ExperienceSection({ items, title }: { items: Experience[]; title: string }) {
  return <section id="experience" className="section-container">
    <p className="eyebrow">03 / timeline</p><h2 className="section-title mb-10">{title}</h2>
    <div className="grid gap-4 lg:grid-cols-2">{items.map((item) => <article key={`${item.company}-${item.period}`} className="glass-card p-6"><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{item.company}</h3><span className="font-mono text-xs text-emerald-400">{item.period}</span></div><p className="mt-1 text-emerald-400">{item.role}</p><p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">{item.description}</p></article>)}</div>
  </section>;
}
