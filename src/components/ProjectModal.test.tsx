import '@testing-library/jest-dom/vitest';
import { useState } from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Locale, Project } from '@/types/profile';
import ProjectModal from './ProjectModal';
import BentoProjects from './sections/BentoProjects';

const project: Project = { id: 'example', title: 'Example', description: 'Project description', techStack: ['React'], highlights: ['Highlight'] };

afterEach(cleanup);

function Harness({ language = 'en', item = project }: { language?: Locale; item?: Project }) {
  const [selectedId, setSelectedId] = useState<Project['id'] | null>(null);
  const localizedProject = { ...item, title: language === 'tr' ? 'Örnek' : 'Example' };
  return <>
    <BentoProjects projects={[localizedProject]} language={language} title="Projects" detailLabel={language === 'tr' ? 'Detaylar' : 'Details'} onSelect={(selected) => setSelectedId(selected.id)} />
    <ProjectModal project={selectedId === item.id ? localizedProject : null} isOpen={selectedId !== null} onClose={() => setSelectedId(null)} language={language} />
  </>;
}

describe('ProjectModal', () => {
  it('uses the Radix-generated description ID without accessibility warnings', async () => {
    const warning = vi.spyOn(console, 'warn');
    try {
      render(<ProjectModal project={project} isOpen onClose={vi.fn()} language="en" />);
      const dialog = screen.getByRole('dialog', { name: 'Example' });
      const descriptionId = dialog.getAttribute('aria-describedby');
      expect(descriptionId).toBeTruthy();
      expect(document.getElementById(descriptionId!)).toHaveTextContent('Project description');
      expect(dialog).toHaveAccessibleDescription('Project description');
      expect(warning).not.toHaveBeenCalled();
    } finally {
      warning.mockRestore();
    }
  });

  it.each(['escape', 'close button'])('returns focus to the correct card after closing via %s', async (method) => {
    const user = userEvent.setup();
    render(<Harness />);
    const trigger = screen.getByRole('button', { name: 'Example: Details' });
    await user.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    if (method === 'escape') await user.keyboard('{Escape}');
    else await user.click(screen.getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('keeps localized selection and restores focus after a locale change', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Example: Details' }));
    rerender(<Harness language="tr" />);
    expect(screen.getByRole('dialog', { name: 'Örnek' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Açıklama' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Öne Çıkan Özellikler' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Teknolojiler' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Kapat' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Örnek: Detaylar' })).toHaveFocus());
  });

  it('dismisses the tooltip before dismissing the modal with Escape', async () => {
    const user = userEvent.setup();
    render(<Harness item={{ ...project, privacyNotice: 'Private network.' }} />);
    await user.click(screen.getByRole('button', { name: 'Example: Details' }));
    await user.click(screen.getByRole('dialog').querySelector<HTMLButtonElement>('button[aria-label="Privacy information"]')!);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('retries a failed cover when the source changes', () => {
    const item = { ...project, image: '/first.png' };
    const onClose = vi.fn();
    const { rerender } = render(<ProjectModal project={item} isOpen onClose={onClose} language="en" />);
    fireEvent.error(screen.getByRole('img', { name: 'Example' }));
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    rerender(<ProjectModal project={{ ...item, image: '/replacement.png' }} isOpen onClose={onClose} language="en" />);
    expect(screen.getByRole('img', { name: 'Example' })).toHaveAttribute('src', '/replacement.png');
  });

  it('does not invent a production status for private projects', () => {
    render(<ProjectModal project={{ ...project, privacyNotice: 'Private network.' }} isOpen onClose={vi.fn()} language="en" />);
    expect(screen.queryByText(/In Production/)).not.toBeInTheDocument();
    expect(screen.getByText('Privacy information', { selector: 'div' })).toBeInTheDocument();
  });
});
