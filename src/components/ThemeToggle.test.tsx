import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import { useTheme } from 'next-themes';
import { describe, expect, it, vi } from 'vitest';
import ThemeToggle from './ThemeToggle';

vi.mock('next-themes', () => ({ useTheme: vi.fn() }));

const labels = { light: 'Açık temaya geç', dark: 'Koyu temaya geç' };

describe('ThemeToggle', () => {
  it('omits the unresolved theme control during server rendering', () => {
    vi.mocked(useTheme).mockReturnValue({ resolvedTheme: undefined, setTheme: vi.fn(), themes: ['light', 'dark'] });
    expect(renderToString(<ThemeToggle labels={labels} />)).toBe('');
  });

  it.each([
    ['dark', 'light', labels.light],
    ['light', 'dark', labels.dark],
  ])('switches from %s to %s with the localized accessible label', async (current, next, label) => {
    const user = userEvent.setup();
    const setTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({ resolvedTheme: current, setTheme, themes: ['light', 'dark'] });
    render(<ThemeToggle labels={labels} />);
    await user.click(screen.getByRole('button', { name: label }));
    expect(setTheme).toHaveBeenCalledExactlyOnceWith(next);
  });
});
