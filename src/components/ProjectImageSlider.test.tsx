import '@testing-library/jest-dom/vitest';
import { useState } from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ProjectImageSlider from './ProjectImageSlider';

const images = [
  { id: 'first', src: '/first.png', alt: 'First screenshot', title: 'First image' },
  { id: 'second', src: '/second.png', alt: 'Second screenshot', title: 'Second image' },
  { id: 'third', src: '/third.png', alt: 'Third screenshot', title: 'Third image' },
];

afterEach(cleanup);

async function expectImage(index: number) {
  expect(await screen.findByRole('img', { name: images[index].alt })).toHaveAttribute('src', images[index].src);
}

function Harness() {
  const [isOpen, setIsOpen] = useState(false);
  return <>
    <button onClick={() => setIsOpen(true)}>Open gallery</button>
    <ProjectImageSlider images={images} isOpen={isOpen} onClose={() => setIsOpen(false)} />
  </>;
}

describe('ProjectImageSlider', () => {
  it('resets to the first image after isOpen changes from false to true', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { rerender } = render(<ProjectImageSlider images={images} isOpen onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: 'Next image' }));
    await expectImage(1);

    rerender(<ProjectImageSlider images={images} isOpen={false} onClose={onClose} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    rerender(<ProjectImageSlider images={images} isOpen onClose={onClose} />);
    await expectImage(0);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('safely handles an empty list initially and while open', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { rerender } = render(<ProjectImageSlider images={[]} isOpen onClose={onClose} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.keyboard('{ArrowLeft}{ArrowRight}{Escape}');
    expect(onClose).not.toHaveBeenCalled();

    rerender(<ProjectImageSlider images={images} isOpen onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: 'Next image' }));
    await expectImage(1);
    rerender(<ProjectImageSlider images={[]} isOpen onClose={onClose} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    rerender(<ProjectImageSlider images={images} isOpen onClose={onClose} />);
    await expectImage(0);
  });

  it('keeps the image and navigation in range when the list shrinks', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { rerender } = render(<ProjectImageSlider images={images} isOpen onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: 'Go to image 3' }));
    await expectImage(2);

    rerender(<ProjectImageSlider images={images.slice(0, 2)} isOpen onClose={onClose} />);
    await expectImage(1);
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
    await user.keyboard('{ArrowRight}');
    await expectImage(0);
    await user.keyboard('{ArrowLeft}');
    await expectImage(1);

    rerender(<ProjectImageSlider images={images.slice(0, 1)} isOpen onClose={onClose} />);
    await expectImage(0);
    expect(screen.getByText('1 / 1')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Next image' })).not.toBeInTheDocument();
    await user.keyboard('{ArrowLeft}{ArrowRight}');
    await expectImage(0);
  });

  it('wraps with arrow keys and navigation buttons without closing', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ProjectImageSlider images={images} isOpen onClose={onClose} />);
    await user.keyboard('{ArrowLeft}');
    await expectImage(2);
    await user.keyboard('{ArrowRight}');
    await expectImage(0);
    await user.click(screen.getByRole('button', { name: 'Previous image' }));
    await expectImage(2);
    await user.click(screen.getByRole('button', { name: 'Next image' }));
    await expectImage(0);
    expect(onClose).not.toHaveBeenCalled();
  });

  it.each(['Escape', 'Close'])('closes via %s and restores focus to the opener', async (method) => {
    const user = userEvent.setup();
    render(<Harness />);
    const opener = screen.getByRole('button', { name: 'Open gallery' });
    await user.click(opener);
    expect(screen.getByRole('dialog', { name: 'Project images' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Go to image 3' })).toHaveFocus();
    if (method === 'Escape') await user.keyboard('{Escape}');
    else await user.click(screen.getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(opener).toHaveFocus());
  });

  it('closes once on a background click but not on an image click', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ProjectImageSlider images={images} isOpen onClose={onClose} />);
    await user.click(screen.getByRole('img', { name: images[0].alt }));
    expect(onClose).not.toHaveBeenCalled();
    await user.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
