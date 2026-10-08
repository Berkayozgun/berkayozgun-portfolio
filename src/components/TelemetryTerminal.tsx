'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';
import type { Project } from '@/types/profile';

export function ProductionBadge({ privacyNotice }: { privacyNotice?: string }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
      onClick={(e) => {
        e.stopPropagation();
        setTooltipOpen((prev) => !prev);
      }}
    >
      <div
        className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/70 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono font-medium text-emerald-300 shadow-sm backdrop-blur-sm transition-all hover:border-emerald-500/60 hover:bg-emerald-900/60 cursor-help"
        tabIndex={0}
        role="button"
        aria-label="In Production // Local Edge Node"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation();
            setTooltipOpen((prev) => !prev);
          }
        }}
      >
        <Lock size={12} className="text-emerald-400 shrink-0" />
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </span>
        <span className="tracking-tight whitespace-nowrap">In Production // Local Edge Node</span>
      </div>

      {privacyNotice && (
        <div
          role="tooltip"
          className={`pointer-events-none absolute right-0 top-full z-40 mt-2 w-72 sm:w-80 rounded-xl border border-zinc-700/80 bg-zinc-950/95 p-3.5 text-xs leading-relaxed text-zinc-300 shadow-2xl backdrop-blur-md transition-all duration-150 ${
            tooltipOpen
              ? 'opacity-100 scale-100 visible pointer-events-auto'
              : 'opacity-0 scale-95 invisible group-hover/badge:opacity-100 group-hover/badge:scale-100 group-hover/badge:visible'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <div className="rounded-md bg-emerald-950/80 p-1 border border-emerald-800/50 shrink-0 text-emerald-400">
              <Lock size={13} />
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold text-emerald-400 mb-1">
                Gizlilik &amp; Ağ Kısıtlaması
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

export default function TelemetryTerminal({ project }: { project: Project }) {
  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-950 font-mono shadow-md dark:border-zinc-800/80">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-3.5 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 font-mono text-xs text-zinc-400">telemetry-stream</span>
        </div>

        {/* Private Production Badge with Hover Tooltip */}
        <ProductionBadge privacyNotice={project.privacyNotice} />
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
          <span className="text-zinc-100 font-medium">Tadım Kavrulmuş Fıstık</span>
          <span className="ml-auto font-mono text-emerald-400 font-semibold">₺45.00</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 pt-1 font-mono text-zinc-400">
          <span className="rounded bg-amber-950/80 px-1.5 py-0.5 text-[11px] font-semibold text-amber-400 border border-amber-800/50">
            [BASKET_CLOSED]
          </span>
          <span className="text-zinc-300">2 ürün ile sepet kapandı</span>
          <span className="text-zinc-500 font-mono">(ESC)</span>
        </div>
      </div>
    </div>
  );
}
