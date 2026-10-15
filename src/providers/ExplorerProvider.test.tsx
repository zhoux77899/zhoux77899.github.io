import { describe, expect, it, mock } from 'bun:test';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useExplorer } from '@/hooks/useExplorer';
import { resolveExplorerHash } from '@/lib/explorer';
import { ExplorerProvider } from './ExplorerProvider';

function Inspector() {
  const explorer = useExplorer();
  return <>
    <output aria-label="Explorer state">{JSON.stringify(explorer)}</output>
    <a href="#project-fridge">Unknown project</a>
    <a href="#project-what-to-eat">Choose the fridge</a>
    <button onClick={() => explorer.selectCountry('china')}>Choose China</button>
    <button onClick={() => explorer.selectProject('luma')}>Choose LUMA</button>
  </>;
}
function state() { return JSON.parse(screen.getByLabelText('Explorer state').textContent ?? '{}'); }

describe('Explorer navigation', () => {
  it('resolves project links, contribution links, countries and legacy destinations', () => {
    expect(resolveExplorerHash('#project-cfgan')?.projectId).toBe('cfgan');
    expect(resolveExplorerHash('#vllm-ascend-work')?.destination).toBe('open-source');
    expect(resolveExplorerHash('#travel-1')?.countryId).toBe('new-zealand');
    expect(resolveExplorerHash('#travel-2')?.countryId).toBe('japan');
    expect(resolveExplorerHash('#travel-3')?.countryId).toBe('japan');
    expect(resolveExplorerHash('#travel-china')?.countryId).toBe('china');
    expect(resolveExplorerHash('#project-fridge')).toBeUndefined();
  });
  it('restores a project on entry and follows browser hash changes', async () => {
    window.history.replaceState(null, '', '#project-flawless');
    render(<ExplorerProvider><Inspector /></ExplorerProvider>);
    expect(state().selectedProjectId).toBe('flawless');
    await act(async () => {
      window.history.replaceState(null, '', '#project-luma');
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    expect(state().selectedProjectId).toBe('luma');
    await act(async () => {
      window.history.replaceState(null, '', '#project-flawless');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    expect(state().selectedProjectId).toBe('flawless');
  });
  it('updates content selection without adding history or scrolling the page', () => {
    render(<ExplorerProvider><Inspector /></ExplorerProvider>);
    const historyLength = window.history.length;
    fireEvent.click(screen.getByRole('button', { name: 'Choose China' }));
    expect(state().selectedCountryId).toBe('china');
    expect(state().activeDestination).toBe('travel');
    fireEvent.click(screen.getByRole('button', { name: 'Choose LUMA' }));
    expect(state().selectedProjectId).toBe('luma');
    expect(state().activeDestination).toBe('projects');
    expect(window.history.length).toBe(historyLength);
    expect(window.location.hash).toBe('');
  });
  it('synchronizes real anchor clicks and ignores unrelated hashes', () => {
    render(<ExplorerProvider><Inspector /></ExplorerProvider>);
    fireEvent.click(screen.getByRole('link', { name: 'Choose the fridge' }));
    expect(state().selectedProjectId).toBe('what-to-eat');
    fireEvent.click(screen.getByRole('link', { name: 'Unknown project' }));
    expect(state().selectedProjectId).toBe('what-to-eat');
  });
  it('positions the whole project card with the same center alignment as the carousel', async () => {
    const card = document.createElement('article');
    const heading = document.createElement('h3');
    heading.id = 'project-what-to-eat';
    card.append(heading);
    const reveal = mock(() => {});
    card.scrollIntoView = reveal;
    document.body.append(card);
    render(<ExplorerProvider><Inspector /></ExplorerProvider>);
    fireEvent.click(screen.getByRole('link', { name: 'Choose the fridge' }));
    await waitFor(() => expect(reveal).toHaveBeenCalledWith({ block: 'start', inline: 'center', behavior: 'instant' }));
  });
  it('scrolling updates the shared section and hides the dock while the figure is visible', async () => {
    const hero = document.createElement('section');
    hero.id = 'hero';
    hero.getBoundingClientRect = () => ({ top: -300 } as DOMRect);
    const projects = document.createElement('section');
    projects.id = 'projects';
    projects.getBoundingClientRect = () => ({ top: 100 } as DOMRect);
    const figure = document.createElement('div');
    figure.dataset.explorerMain = '';
    figure.getBoundingClientRect = () => ({ top: -600, bottom: -100 } as DOMRect);
    document.body.append(hero, projects, figure);
    render(<ExplorerProvider><Inspector /></ExplorerProvider>);
    fireEvent.scroll(window);
    await waitFor(() => expect(state().heroVisible).toBe(false));
    expect(state().activeDestination).toBe('projects');
    projects.getBoundingClientRect = () => ({ top: 600 } as DOMRect);
    figure.getBoundingClientRect = () => ({ top: 200, bottom: 550 } as DOMRect);
    fireEvent.scroll(window);
    await waitFor(() => expect(state().heroVisible).toBe(true));
    expect(state().activeDestination).toBeNull();
  });
});
