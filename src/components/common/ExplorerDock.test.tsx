import { describe, expect, it } from 'bun:test';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { ExplorerProvider } from '@/providers/ExplorerProvider';
import { ExplorerDock } from './ExplorerDock';

describe('Explorer dock', () => {
  it('appears only after the main figure leaves view and restores focus after Escape', async () => {
    const figure = document.createElement('div');
    figure.dataset.explorerMain = '';
    figure.getBoundingClientRect = () => ({ top: 120, bottom: 480 } as DOMRect);
    document.body.append(figure);
    render(<ExplorerProvider><ExplorerDock /></ExplorerProvider>);
    expect(screen.queryByRole('button', { name: 'Explore' })).not.toBeInTheDocument();
    figure.getBoundingClientRect = () => ({ top: -600, bottom: -100 } as DOMRect);
    fireEvent.scroll(window);
    const trigger = await screen.findByRole('button', { name: 'Explore' });
    trigger.focus();
    fireEvent.click(trigger);
    const dialog = await screen.findByRole('dialog', { name: 'Explore the toolbox' });
    expect(dialog.querySelector('.anatomy-explorer-stage')).toBeInTheDocument();
    expect(dialog.querySelectorAll('[data-hotspot]')).toHaveLength(6);
    expect(dialog.querySelector('.anatomy-explorer-caption')).toBeNull();
    expect(dialog.querySelector('.anatomy-explorer-links')).toBeNull();
    expect(within(dialog).getByRole('link', { name: /^Open source/ })).toHaveAttribute('href', '#vllm-ascend-work');
    fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });
});
