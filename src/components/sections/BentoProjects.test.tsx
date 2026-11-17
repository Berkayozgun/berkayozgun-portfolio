import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Project } from '@/types/profile';
import BentoProjects from './BentoProjects';

const project: Project = {
  id: 'example', title: 'Example', description: 'Project description', techStack: ['React', 'TypeScript'],
};

afterEach(cleanup);

function setup(item = project, language: 'tr' | 'en' = 'en') {
  const onSelect = vi.fn();
  const view = render(<BentoProjects projects={[item]} language={language} title="Projects" detailLabel="Details" onSelect={onSelect} />);
  return { ...view, onSelect };
}

describe('BentoProjects', () => {
  it.each(['{Enter}', ' '])('opens details with the native button using %s', async (key) => {
    const user = userEvent.setup();
    const { onSelect } = setup();
    const button = screen.getByRole('button', { name: 'Example: Details' });
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('aria-haspopup', 'dialog');
    expect(button).toHaveAttribute('data-project-id', 'example');
    expect(button.className).toContain('focus-visible:after:outline');
    await user.tab();
    expect(button).toHaveFocus();
    await user.keyboard(key);
    expect(onSelect).toHaveBeenCalledExactlyOnceWith(project);
  });

  it('opens details by clicking the detail button', async () => {
    const { onSelect } = setup();
    await userEvent.click(screen.getByRole('button', { name: 'Example: Details' }));
    expect(onSelect).toHaveBeenCalledExactlyOnceWith(project);
  });

  it('does not invent a shipped status in the fallback preview', () => {
    setup();
    expect(screen.queryByText('shipped')).not.toBeInTheDocument();
    expect(screen.queryByText(/status:/)).not.toBeInTheDocument();
    expect(screen.getByText('React · TypeScript')).toBeInTheDocument();
  });

  it('shows only the supplied project status', () => {
    setup({ ...project, links: { status: 'Prototype' } });
    expect(screen.getByText('Prototype')).toBeInTheDocument();
  });

  it('localizes static copy and a failed image preview', () => {
    setup({ ...project, image: '/missing.png' }, 'tr');
    const image = screen.getByRole('img', { name: 'Example' });
    expect(image).toHaveAttribute('loading', 'lazy');
    fireEvent.error(image);
    expect(screen.getByLabelText('Example mimari önizlemesi')).toBeInTheDocument();
    expect(screen.getByText('02 / seçili çalışmalar')).toBeInTheDocument();
    expect(screen.getByText('Öne çıkan proje')).toBeInTheDocument();
    expect(screen.getByText('yerel içerik / CMS yok')).toBeInTheDocument();
  });

  it('retries the cover when its image source changes without an effect reset', () => {
    const item = { ...project, image: '/first.png' };
    const { rerender, onSelect } = setup(item);
    fireEvent.error(screen.getByRole('img', { name: 'Example' }));
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    rerender(<BentoProjects projects={[{ ...item, image: '/replacement.png' }]} language="en" title="Projects" detailLabel="Details" onSelect={onSelect} />);
    expect(screen.getByRole('img', { name: 'Example' })).toHaveAttribute('src', '/replacement.png');
  });

  it('keeps the privacy button independent from the detail action', async () => {
    const user = userEvent.setup();
    const { onSelect } = setup({ ...project, privacyNotice: 'Private network.' });
    const privacy = screen.getByRole('button', { name: 'Privacy information' });
    await user.click(privacy);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Private network.');
    await user.keyboard('{Enter} {Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('renders POS telemetry only for ultimarket, not other projects with privacyNotice', () => {
    const { rerender } = render(
      <BentoProjects
        projects={[{ ...project, id: 'private-app', title: 'Private App', privacyNotice: 'Private network.' }]}
        language="en"
        title="Projects"
        detailLabel="Details"
        onSelect={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: 'Privacy information' })).toBeInTheDocument();
    expect(screen.queryByText('Sample telemetry')).not.toBeInTheDocument();

    rerender(
      <BentoProjects
        projects={[{ ...project, id: 'ultimarket', title: 'Ultimarket', privacyNotice: 'Private network.' }]}
        language="en"
        title="Projects"
        detailLabel="Details"
        onSelect={vi.fn()}
      />,
    );
    expect(screen.getByText('Sample telemetry')).toBeInTheDocument();
  });

  it('renders custom preview cards for numbrias, wakelarm, myrrh, and amerikano', () => {
    const customProjects: Project[] = [
      { id: 'numbrias', title: 'Numbrias', description: '3D Marketplace' },
      { id: 'wakelarm', title: 'Wakelarm', description: 'Android Alarm' },
      { id: 'myrrh', title: 'Myrrh', description: 'IoT Fragrance' },
      { id: 'amerikano', title: 'Amerikano', description: 'Card Game' },
    ];
    render(
      <BentoProjects
        projects={customProjects}
        language="en"
        title="Projects"
        detailLabel="Details"
        onSelect={vi.fn()}
      />,
    );
    expect(screen.getByText('313 Unit · 14 E2E Tests Passing')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
    expect(screen.getByText('shipped')).toBeInTheDocument();
    expect(screen.getByText('Kotlin Native Bridge')).toBeInTheDocument();
    expect(screen.getByText('Cold-Start Bypass: 0ms JS Wait')).toBeInTheDocument();
    expect(screen.getByText('AlarmRingingActivity / USAGE_ALARM')).toBeInTheDocument();
    expect(screen.getByText('ESP32 MQTT Telemetry')).toBeInTheDocument();
    expect(screen.getByText('TÜBİTAK BiGG Finalist')).toBeInTheDocument();
    expect(screen.getByText('IFRA Rule Engine')).toBeInTheDocument();
    expect(screen.getByText('Headless TS Engine (108 Cards)')).toBeInTheDocument();
    expect(screen.getByText('11-Round State Machine')).toBeInTheDocument();
    expect(screen.getByText('Capacitor Offline-First')).toBeInTheDocument();
  });
});
