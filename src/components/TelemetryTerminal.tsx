'use client';

import { useId, useRef, useState } from 'react';
import { Lock } from 'lucide-react';
import type { Locale, Project } from '@/types/profile';

const copy = {
  tr: {
    privacy: 'Gizlilik bilgisi',
    privacyTitle: 'Gizlilik ve ağ kısıtlaması',
    sample: 'Örnek telemetri',
    basketClosed: '2 ürün ile sepet kapandı',
    peanuts: 'Tadım Kavrulmuş Fıstık',
  },
  en: {
    privacy: 'Privacy information',
    privacyTitle: 'Privacy and network restrictions',
    sample: 'Sample telemetry',
    basketClosed: 'Basket closed with 2 items',
    peanuts: 'Tadım Roasted Peanuts',
  },
} satisfies Record<Locale, Record<'privacy' | 'privacyTitle' | 'sample' | 'basketClosed' | 'peanuts', string>>;

export function ProductionBadge({ privacyNotice, status, language }: {
  privacyNotice?: string;
  status?: string;
  language: Locale;
}) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const text = copy[language];
  const label = status || text.privacy;

  if (!privacyNotice) {
    return status ? <span className="font-mono text-xs text-emerald-300">{status}</span> : null;
  }

  return (
    <div
      className="relative z-10"
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => {
        if (document.activeElement !== buttonRef.current) setTooltipOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className="relative inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/70 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono font-medium text-emerald-300 shadow-sm backdrop-blur-sm transition-all hover:border-emerald-500/60 hover:bg-emerald-900/60 cursor-help focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
        aria-label={label}
        aria-describedby={tooltipOpen ? tooltipId : undefined}
        onFocus={() => setTooltipOpen(true)}
        onBlur={() => setTooltipOpen(false)}
        onClick={(event) => {
          event.stopPropagation();
          setTooltipOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape' && tooltipOpen) {
            e.preventDefault();
            e.stopPropagation();
            setTooltipOpen(false);
          }
        }}
      >
        <Lock size={12} aria-hidden="true" className="text-emerald-400 shrink-0" />
        <span className="tracking-tight">{label}</span>
      </button>

      {tooltipOpen && (
        <div
          id={tooltipId}
          role="tooltip"
          className="absolute right-0 top-full z-40 w-64 max-w-[calc(100vw-4rem)] pt-2 text-xs leading-relaxed text-zinc-300"
        >
          <div className="flex items-start gap-2.5 rounded-xl border border-zinc-700/80 bg-zinc-950 p-3.5 shadow-2xl">
            <div className="rounded-md bg-emerald-950/80 p-1 border border-emerald-800/50 shrink-0 text-emerald-400">
              <Lock size={13} />
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold text-emerald-400 mb-1">
                {text.privacyTitle}
              </p>
              <p className="text-zinc-300 text-[11px] leading-relaxed">
                {privacyNotice}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TelemetryTerminal({ project, language }: { project: Project; language: Locale }) {
  const text = copy[language];
  return (
    <div className="mb-6 rounded-2xl border border-zinc-200/80 bg-zinc-950/95 font-mono shadow-md backdrop-blur-xl dark:border-white/10">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between gap-2 rounded-t-2xl border-b border-zinc-800 bg-zinc-900/90 px-3.5 sm:px-4 py-2.5 sm:py-3 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>
          <span className="ml-2 font-mono text-xs text-zinc-400">{text.sample}</span>
        </div>

        {/* Private Production Badge with Hover Tooltip */}
        <ProductionBadge privacyNotice={project.privacyNotice} status={project.links?.status} language={language} />
      </div>

      {/* Terminal Body with Telemetry Stream */}
      <div className="p-4 sm:p-5 text-xs sm:text-sm leading-relaxed space-y-2 text-zinc-300 select-none">
        <div className="flex items-center gap-2 text-emerald-400 font-medium">
          <span className="text-zinc-500">&gt;</span>
          <span>kasa_agent@pos: ~/telemetry-stream</span>
          <span className="inline-block h-3.5 w-1.5 bg-emerald-400 animate-pulse ml-0.5" />
        </div>
        <div className="flex flex-wrap items-center gap-x-2 pt-1 font-mono">
          <span className="rounded bg-emerald-950/80 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-800/50">
            [SCAN]
          </span>
          <span className="text-zinc-400">8690504131458</span>
          <span className="text-zinc-500">-&gt;</span>
          <span className="text-zinc-100 font-medium">Ülker Dido Trio 36.5g</span>
          <span className="ml-auto font-mono text-emerald-400 font-semibold">₺30.00</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 font-mono">
          <span className="rounded bg-emerald-950/80 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-800/50">
            [SCAN]
          </span>
          <span className="text-zinc-400">8690787131022</span>
          <span className="text-zinc-500">-&gt;</span>
          <span className="text-zinc-100 font-medium">{text.peanuts}</span>
          <span className="ml-auto font-mono text-emerald-400 font-semibold">₺45.00</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 pt-1 font-mono text-zinc-400">
          <span className="rounded bg-amber-950/80 px-1.5 py-0.5 text-[11px] font-semibold text-amber-400 border border-amber-800/50">
            [BASKET_CLOSED]
          </span>
          <span className="text-zinc-300">{text.basketClosed}</span>
          <span className="text-zinc-500 font-mono">(ESC)</span>
        </div>
      </div>
    </div>
  );
}
