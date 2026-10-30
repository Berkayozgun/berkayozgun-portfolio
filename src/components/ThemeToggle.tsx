'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ThemeToggle({ labels }: { labels: { light: string; dark: string } }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? labels.light : labels.dark}
      title={isDark ? labels.light : labels.dark}
      className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-all hover:bg-zinc-200/60 hover:text-zinc-900 active:scale-90 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
