import { describe, expect, it, mock } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button, ButtonLink } from './button';

describe('Action button variants', () => {
  it.each(['primary', 'secondary'] as const)('%s preserves activation, focus, and disabled behavior', (variant) => {
    const activate = mock(() => {});
    render(<>
      <Button variant={variant} onClick={activate}>Run action</Button>
      <Button variant={variant} disabled onClick={activate}>Unavailable action</Button>
      <ButtonLink variant={variant} href="#contact">Visit contact</ButtonLink>
    </>);
    const action = screen.getByRole('button', { name: 'Run action' });
    action.focus();
    expect(action).toHaveFocus();
    fireEvent.click(action);
    expect(activate).toHaveBeenCalledTimes(1);

    const disabled = screen.getByRole('button', { name: 'Unavailable action' });
    expect(disabled).toBeDisabled();
    disabled.focus();
    expect(action).toHaveFocus();
    fireEvent.click(disabled);
    expect(activate).toHaveBeenCalledTimes(1);

    const destination = screen.getByRole('link', { name: 'Visit contact' });
    expect(destination).toHaveAttribute('href', '#contact');
    destination.focus();
    expect(destination).toHaveFocus();
  });
});
