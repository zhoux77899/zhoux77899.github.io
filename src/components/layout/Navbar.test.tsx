import { describe, expect, it } from 'bun:test';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ExplorerProvider } from '@/providers/ExplorerProvider';
import { navLinks } from '@/lib/navigation';
import { setMediaQuery } from '@/test/media';
import { Navbar } from './Navbar';

function renderNavbar() {
  return render(
    <ThemeProvider>
      <ExplorerProvider>
      <Navbar />
      </ExplorerProvider>
    </ThemeProvider>,
  );
}

describe('Navbar', () => {
  it('renders a real home link and links to every page section', async () => {
    await act(async () => { renderNavbar(); });
    expect(screen.getByRole('link', { name: 'zhoux77899' })).toHaveAttribute('href', '#hero');

    const navigation = screen.getByRole('navigation', { name: 'Main navigation' });
    for (const link of navLinks) {
      expect(within(navigation).getByRole('link', { name: link.name }))
        .toHaveAttribute('href', link.href);
    }
  });

  it('selects themes through the BoardUI segmented control', async () => {
    await act(async () => { renderNavbar(); });
    const darkButton = screen.getByRole('radio', { name: 'Dark mode' });
    await act(async () => { fireEvent.click(darkButton); });

    expect(darkButton).toHaveAttribute('aria-checked', 'true');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement).toHaveClass('dark');

    await act(async () => { fireEvent.click(screen.getByRole('radio', { name: 'System theme' })); });
    expect(localStorage.getItem('theme')).toBe('system');
  });

  it('exposes the active section to assistive technology', async () => {
    const hero = document.createElement('section');
    hero.id = 'hero';
    hero.getBoundingClientRect = () => ({ top: -300 } as DOMRect);
    const projects = document.createElement('section');
    projects.id = 'projects';
    projects.getBoundingClientRect = () => ({ top: 80 } as DOMRect);
    document.body.append(hero, projects);

    await act(async () => { renderNavbar(); });
    const navigation = screen.getByRole('navigation', { name: 'Main navigation' });
    const projectsLink = within(navigation).getByRole('link', { name: 'Projects' });

    expect(projectsLink).toHaveAttribute('aria-current', 'location');

    projects.getBoundingClientRect = () => ({ top: 400 } as DOMRect);
    fireEvent.scroll(window);
    await waitFor(() => {
      expect(within(navigation).getByRole('link', { name: 'About' }))
        .toHaveAttribute('aria-current', 'location');
    });
  });

  it('opens an accessible mobile dialog and closes it with Escape', async () => {
    renderNavbar();
    const trigger = screen.getByRole('button', { name: 'Open menu' });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = await screen.findByRole('dialog', { name: 'Navigation' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-controls', dialog.id);
    const navigation = within(dialog).getByRole('navigation', { name: 'Mobile navigation' });
    expect(within(navigation).getByRole('link', { name: 'Projects' }))
      .toHaveAttribute('href', '#projects');

    fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('closes the mobile menu after selecting a section link', async () => {
    renderNavbar();
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const dialog = await screen.findByRole('dialog', { name: 'Navigation' });
    fireEvent.click(within(dialog).getByRole('link', { name: 'Contact' }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    const navigation = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(within(navigation).getByRole('link', { name: 'Contact' }))
      .toHaveAttribute('aria-current', 'location');
  });

  it('dismisses the mobile overlay when the desktop breakpoint is reached', async () => {
    renderNavbar();
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    await screen.findByRole('dialog', { name: 'Navigation' });

    act(() => setMediaQuery('(min-width: 1024px)', true));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
