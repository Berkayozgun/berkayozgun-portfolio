'use client';

import type { Locale, Project } from '@/types/profile';
import { ProductionBadge } from '@/components/TelemetryTerminal';

function PreviewShell({
  title,
  badge,
  privacyNotice,
  status,
  language,
  children,
}: {
  title: string;
  badge: string;
  privacyNotice?: string;
  status?: string;
  language: Locale;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 rounded-2xl border border-zinc-200/80 bg-zinc-950/95 font-mono shadow-md backdrop-blur-xl dark:border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-2xl border-b border-zinc-800 bg-zinc-900/90 px-3.5 sm:px-4 py-2.5 sm:py-3 dark:border-white/10">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>
          <span className="ml-2 truncate font-mono text-xs text-zinc-400">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-950/70 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
            {badge}
          </span>
          {privacyNotice && (
            <ProductionBadge privacyNotice={privacyNotice} status={status} language={language} />
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5 text-xs sm:text-sm leading-relaxed space-y-2 text-zinc-300 select-none">
        {children}
      </div>
    </div>
  );
}

export default function ProjectPreview({
  project,
  language,
}: {
  project: Project;
  language: Locale;
}) {
  const id = String(project.id);

  if (id === 'numbrias') {
    return (
      <PreviewShell
        title="order-fsm.ts"
        badge="313 Unit · 14 E2E Tests Passing"
        privacyNotice={project.privacyNotice}
        status={project.links?.status}
        language={language}
      >
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs font-mono">
          {['pending', 'paid', 'slicing', 'printing', 'shipped'].map((step, idx, arr) => (
            <span key={step} className="inline-flex items-center gap-1.5">
              <span
                className={`rounded px-1.5 py-0.5 border ${
                  step === 'shipped'
                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/50 font-semibold'
                    : 'bg-zinc-900 text-zinc-200 border-zinc-700/80'
                }`}
              >
                {step}
              </span>
              {idx < arr.length - 1 && <span className="text-zinc-500">→</span>}
            </span>
          ))}
        </div>
        <div className="pt-1 text-xs text-zinc-400 font-mono">
          <span className="text-emerald-400">pipeline:</span> idempotent_webhooks · signed_url (STL/3MF) · RLS
        </div>
      </PreviewShell>
    );
  }

  if (id === 'wakelarm') {
    return (
      <PreviewShell
        title="Kotlin Native Bridge"
        badge="Cold-Start Bypass: 0ms JS Wait"
        privacyNotice={project.privacyNotice}
        status={project.links?.status}
        language={language}
      >
        <div className="flex items-center gap-2 text-emerald-400 font-medium text-xs">
          <span className="text-zinc-500">&gt;</span>
          <span>AlarmRingingActivity / USAGE_ALARM</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-300">
          <span className="rounded bg-emerald-950/80 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-800/50">
            [INTENT]
          </span>
          <span className="text-zinc-300">FLAG_SHOW_WHEN_LOCKED</span>
          <span className="text-zinc-500">·</span>
          <span className="text-zinc-400">On-Device QR/Barcode · Accelerometer · Math</span>
        </div>
      </PreviewShell>
    );
  }

  if (id === 'myrrh') {
    return (
      <PreviewShell
        title="ESP32 MQTT Telemetry"
        badge="TÜBİTAK BiGG Finalist"
        privacyNotice={project.privacyNotice}
        status={project.links?.status}
        language={language}
      >
        <div className="flex items-center gap-2 text-emerald-400 font-medium text-xs">
          <span className="text-zinc-500">&gt;</span>
          <span>IFRA Rule Engine</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-300">
          <span className="rounded bg-emerald-950/80 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-800/50">
            [MQTT]
          </span>
          <span className="text-zinc-400">Bi-Directional OTA Firmware · Touch-First Kiosk UI</span>
        </div>
      </PreviewShell>
    );
  }

  if (id === 'amerikano') {
    return (
      <PreviewShell
        title="Headless TS Engine (108 Cards)"
        badge="Capacitor Offline-First"
        privacyNotice={project.privacyNotice}
        status={project.links?.status}
        language={language}
      >
        <div className="flex items-center gap-2 text-emerald-400 font-medium text-xs">
          <span className="text-zinc-500">&gt;</span>
          <span>11-Round State Machine</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-300">
          <span className="rounded bg-emerald-950/80 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-800/50">
            [ENGINE]
          </span>
          <span className="text-zinc-400">INTERRUPT_WINDOW · 60 FPS Gesture Fan · Vitest</span>
        </div>
      </PreviewShell>
    );
  }

  return null;
}
