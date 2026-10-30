import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Portfolio from './Portfolio';
import profileData from '@/data/profile.json';

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.lang = 'en';
});

describe('Portfolio language selection', () => {
  it('loads the saved locale and updates the document language', () => {
    window.localStorage.setItem('locale', 'tr');
    render(<Portfolio />);
    expect(document.documentElement).toHaveAttribute('lang', 'tr');
    expect(screen.getByRole('heading', { name: 'Projelerim' })).toBeInTheDocument();
    expect(screen.getByText('Geçmişim ve Odak Alanlarım')).toBeInTheDocument();
    expect(screen.getByText('Yeni fırsatlara açığım')).toBeInTheDocument();
  });

  it('hydrates the English server output before applying the saved locale', async () => {
    window.localStorage.setItem('locale', 'tr');
    const container = document.createElement('div');
    container.innerHTML = renderToString(<Portfolio />);
    document.body.append(container);
    expect(within(container).getByRole('heading', { name: 'My Projects' })).toBeInTheDocument();
    const onRecoverableError = vi.fn();
    let root: ReturnType<typeof hydrateRoot> | undefined;
    try {
      await act(async () => {
        root = hydrateRoot(container, <Portfolio />, { onRecoverableError });
      });
      expect(within(container).getByRole('heading', { name: 'Projelerim' })).toBeInTheDocument();
      expect(document.documentElement.lang).toBe('tr');
      expect(onRecoverableError).not.toHaveBeenCalled();
    } finally {
      act(() => root?.unmount());
      container.remove();
    }
  });

  it('persists desktop language changes across remounts', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Portfolio />);
    await user.click(screen.getByRole('button', { name: 'Switch to Turkish' }));
    expect(window.localStorage.getItem('locale')).toBe('tr');
    expect(document.documentElement.lang).toBe('tr');
    unmount();
    render(<Portfolio />);
    expect(document.documentElement.lang).toBe('tr');
  });

  it('persists mobile language changes and exposes menu state', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Portfolio />);
    const menuButton = screen.getByRole('button', { name: 'Open menu' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    const menu = document.getElementById(menuButton.getAttribute('aria-controls')!)!;
    await user.click(within(menu).getByRole('button', { name: 'Switch to Turkish' }));
    expect(window.localStorage.getItem('locale')).toBe('tr');
    expect(document.documentElement.lang).toBe('tr');
    unmount();
    render(<Portfolio />);
    expect(screen.getByRole('heading', { name: 'Projelerim' })).toBeInTheDocument();
  });

  it('ignores unsupported saved locales', () => {
    window.localStorage.setItem('locale', 'invalid');
    render(<Portfolio />);
    expect(document.documentElement.lang).toBe('en');
    expect(screen.getByRole('heading', { name: 'My Projects' })).toBeInTheDocument();
  });

  it('allows switching when browser storage is unavailable', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Blocked'); });
    const user = userEvent.setup();
    render(<Portfolio />);
    await user.click(screen.getByRole('button', { name: 'Switch to Turkish' }));
    expect(document.documentElement.lang).toBe('tr');
    expect(screen.getByRole('heading', { name: 'Projelerim' })).toBeInTheDocument();
  });

  it('keeps the session selection when saved preferences are readable but not writable', async () => {
    window.localStorage.setItem('locale', 'tr');
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Read only'); });
    const user = userEvent.setup();
    render(<Portfolio />);
    await user.click(screen.getByRole('button', { name: 'İngilizceye geç' }));
    expect(document.documentElement.lang).toBe('en');
    expect(screen.getByRole('heading', { name: 'My Projects' })).toBeInTheDocument();
  });

  it('updates an open project from the newly selected locale', async () => {
    const user = userEvent.setup();
    render(<Portfolio />);
    await user.click(screen.getByRole('button', { name: `${profileData.en.projects[0].title}: View Details` }));
    expect(screen.getByRole('dialog')).toHaveAccessibleDescription(profileData.en.projects[0].description);
    // The background language button is intentionally hidden from assistive technology while a dialog is open.
    fireEvent.click(screen.getByRole('button', { name: 'Switch to Turkish', hidden: true }));
    expect(screen.getByRole('dialog')).toHaveAccessibleDescription(profileData.tr.projects[0].description);
  });
});

describe('Portfolio scrolling', () => {
  it.each([false, true])('respects reduced motion = %s', (reducedMotion) => {
    vi.mocked(window.matchMedia).mockReturnValue({ matches: reducedMotion } as MediaQueryList);
    render(<Portfolio />);
    fireEvent.click(screen.getByRole('button', { name: 'Projects' }));
    expect(Element.prototype.scrollIntoView).toHaveBeenLastCalledWith({ behavior: reducedMotion ? 'instant' : 'smooth' });
  });
});
