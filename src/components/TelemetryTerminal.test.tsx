import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import TelemetryTerminal, { ProductionBadge } from './TelemetryTerminal';

afterEach(cleanup);

describe('ProductionBadge', () => {
  it('connects a unique tooltip to its native button and dismisses with Escape and blur', async () => {
    const user = userEvent.setup();
    render(<><ProductionBadge language="en" privacyNotice="Private network." /><button type="button">Next</button></>);
    const button = screen.getByRole('button', { name: 'Privacy information' });
    expect(button.tagName).toBe('BUTTON');
    expect(button.className).toContain('focus-visible:outline');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await user.tab();
    expect(button).toHaveFocus();
    expect(button).toHaveAttribute('aria-describedby', screen.getByRole('tooltip').id);
    expect(button).toHaveAccessibleDescription('Privacy and network restrictions Private network.');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(button).not.toHaveAttribute('aria-describedby');
    expect(button).toHaveFocus();
    await user.keyboard(' ');
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    await user.tab();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('supports pointer hover over both the badge and its tooltip', async () => {
    const user = userEvent.setup();
    render(<ProductionBadge language="tr" privacyNotice="Yerel ağ." />);
    const button = screen.getByRole('button', { name: 'Gizlilik bilgisi' });
    await user.hover(button);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveTextContent('Gizlilik ve ağ kısıtlaması');
    expect(button).not.toHaveFocus();

    // user-event 14.6.8 omits relatedTarget during hover transitions. Supply browser-like
    // mouseout/mouseover pairs so React can distinguish internal moves from a real leave.
    const moveMouse = (from: Element, to: Element) => {
      fireEvent.mouseOut(from, { relatedTarget: to });
      fireEvent.mouseOver(to, { relatedTarget: from });
    };
    moveMouse(button, tooltip);
    expect(screen.getByRole('tooltip')).toBe(tooltip);
    expect(tooltip).toBeInTheDocument();

    const tooltipText = screen.getByText('Yerel ağ.');
    moveMouse(tooltip, tooltipText);
    expect(screen.getByRole('tooltip')).toBe(tooltip);
    moveMouse(tooltipText, button);
    expect(screen.getByRole('tooltip')).toBe(tooltip);
    expect(button).toHaveAttribute('aria-describedby', tooltip.id);

    moveMouse(button, tooltipText);
    moveMouse(tooltipText, document.body);
    expect(tooltip).not.toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(button).not.toHaveAttribute('aria-describedby');
  });

  it('uses distinct tooltip IDs for multiple instances', async () => {
    const user = userEvent.setup();
    render(<><ProductionBadge language="en" privacyNotice="First" /><ProductionBadge language="en" privacyNotice="Second" /></>);
    const buttons = screen.getAllByRole('button');
    await user.tab();
    const firstId = buttons[0].getAttribute('aria-describedby');
    await user.tab();
    expect(buttons[1]).toHaveAttribute('aria-describedby', screen.getByRole('tooltip').id);
    expect(buttons[1].getAttribute('aria-describedby')).not.toBe(firstId);
  });

  it('does not render an inert button without a privacy explanation or invent a status', () => {
    const { rerender } = render(<ProductionBadge language="en" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByText(/production/i)).not.toBeInTheDocument();
    rerender(<ProductionBadge language="en" status="Prototype" />);
    expect(screen.getByText('Prototype')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

describe('TelemetryTerminal', () => {
  it('localizes sample copy and preserves only data-provided status', () => {
    const project = { id: 'private', title: 'Private project', description: 'Description', privacyNotice: 'Notice', links: { status: 'Pilot' } };
    const { rerender } = render(<TelemetryTerminal project={project} language="en" />);
    expect(screen.getByText('Sample telemetry')).toBeInTheDocument();
    expect(screen.getByText('Basket closed with 2 items')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pilot' })).toBeInTheDocument();
    expect(screen.queryByText(/In Production/)).not.toBeInTheDocument();
    rerender(<TelemetryTerminal project={project} language="tr" />);
    expect(screen.getByText('Örnek telemetri')).toBeInTheDocument();
    expect(screen.getByText('2 ürün ile sepet kapandı')).toBeInTheDocument();
  });
});
