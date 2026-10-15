import { beforeEach, describe, expect, it } from 'bun:test';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { ExplorerProvider } from '@/providers/ExplorerProvider';
import { Travel } from './Travel';

beforeEach(() => { window.history.replaceState({}, '', '/'); });

async function showTravel() {
  render(<ExplorerProvider><Travel /></ExplorerProvider>);
  await act(async () => {
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
  });
}

describe('Travel', () => {
  it('shows country headings and known years without city or region metadata', async () => {
    await showTravel();
    const countries = screen.getAllByRole('article');
    expect(countries).toHaveLength(3);
    const nz = screen.getByRole('article', { name: 'New Zealand' });
    expect(within(nz).getByText('2025')).toBeInTheDocument();
    const japan = screen.getByRole('article', { name: 'Japan' });
    expect(within(japan).getByText('2018–2022')).toBeInTheDocument();
    expect(within(japan).queryByRole('list')).not.toBeInTheDocument();
    const china = screen.getByRole('article', { name: 'China' });
    expect(china.textContent).not.toMatch(/20\d{2}/);
    for (const country of countries) {
      expect(country.textContent).not.toMatch(/South Island|Honshu|Kyushu|Suzhou|Nanjing/);
      expect(within(country).queryByRole('link')).not.toBeInTheDocument();
    }
    expect(screen.getByRole('heading', { name: 'New Zealand' })).toHaveAttribute('id', 'travel-new-zealand');
    expect(screen.getByRole('heading', { name: 'Japan' })).toHaveAttribute('id', 'travel-japan');
    expect(screen.getByRole('heading', { name: 'China' })).toHaveAttribute('id', 'travel-china');
    expect(screen.queryByText(/saved moments/)).not.toBeInTheDocument();
    expect(document.getElementById('travel-1')).toBeInTheDocument();
    expect(document.getElementById('travel-2')).toBeInTheDocument();
    expect(document.getElementById('travel-3')).toBeInTheDocument();
  });

  it('preserves country and legacy deep links while country titles stay plain text', async () => {
    window.history.replaceState({}, '', '#travel-japan');
    await showTravel();
    expect(screen.getByRole('article', { name: 'Japan' })).toHaveAttribute('data-selected', 'true');
    await act(async () => {
      window.history.replaceState({}, '', '#travel-china');
      fireEvent(window, new HashChangeEvent('hashchange'));
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    });
    expect(screen.getByRole('article', { name: 'China' })).toHaveAttribute('data-selected', 'true');
    expect(screen.getByRole('article', { name: 'Japan' })).not.toHaveAttribute('data-selected');
    await act(async () => {
      window.history.replaceState({}, '', '#travel-1');
      fireEvent(window, new PopStateEvent('popstate'));
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    });
    expect(screen.getByRole('article', { name: 'New Zealand' })).toHaveAttribute('data-selected', 'true');
    expect(screen.getByRole('article', { name: 'China' })).not.toHaveAttribute('data-selected');
  });
});
