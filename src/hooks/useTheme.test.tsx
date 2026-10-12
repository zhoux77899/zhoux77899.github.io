import { afterEach, describe, expect, it, mock, spyOn } from 'bun:test';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { useTheme } from '@/hooks/useTheme';
import { setMediaQuery } from '@/test/media';

const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)';

function wrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

afterEach(() => mock.restore());

describe('useTheme', () => {
  it('requires the shared ThemeProvider', () => {
    const errorLog = spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used within ThemeProvider',
    );
    errorLog.mockRestore();
  });

  it('uses the system preference on the first render', () => {
    setMediaQuery(SYSTEM_THEME_QUERY, true);
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('system');
    expect(result.current.resolvedTheme).toBe('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');
  });

  it('reads a saved explicit preference without following the system', () => {
    localStorage.setItem('theme', 'dark');
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('dark');
    expect(result.current.resolvedTheme).toBe('dark');
  });

  it('reuses the bootstrap preference with the current system resolution', () => {
    localStorage.setItem('theme', 'light');
    document.documentElement.dataset.themePreference = 'system';
    document.documentElement.dataset.theme = 'light';
    setMediaQuery(SYSTEM_THEME_QUERY, true);
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('system');
    expect(result.current.resolvedTheme).toBe('dark');
  });

  it('catches a system change between the initial render and subscribing', () => {
    const originalMatchMedia = window.matchMedia;
    let systemReads = 0;
    spyOn(window, 'matchMedia').mockImplementation((query) => {
      const mediaQuery = originalMatchMedia(query);
      if (query === SYSTEM_THEME_QUERY && ++systemReads === 2) {
        setMediaQuery(SYSTEM_THEME_QUERY, true);
      }
      return mediaQuery;
    });

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('system');
    expect(result.current.resolvedTheme).toBe('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('falls back to the system for an invalid stored preference', () => {
    localStorage.setItem('theme', 'unexpected-theme');
    setMediaQuery(SYSTEM_THEME_QUERY, true);
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('system');
    expect(result.current.resolvedTheme).toBe('dark');
  });

  it('ignores invalid bootstrap values and reads valid storage', () => {
    document.documentElement.dataset.themePreference = 'unexpected-theme';
    document.documentElement.dataset.theme = 'unexpected-theme';
    localStorage.setItem('theme', 'light');
    setMediaQuery(SYSTEM_THEME_QUERY, true);
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('light');
    expect(result.current.resolvedTheme).toBe('light');
  });

  it('persists a selection and synchronizes the document theme', () => {
    const { result, unmount } = renderHook(() => useTheme(), { wrapper });
    act(() => result.current.setTheme('dark'));

    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement).toHaveAttribute('data-theme-preference', 'dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');

    unmount();
    const reloaded = renderHook(() => useTheme(), { wrapper });
    expect(reloaded.result.current.theme).toBe('dark');
    expect(reloaded.result.current.resolvedTheme).toBe('dark');
  });

  it('follows system changes only while the system option is selected', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => setMediaQuery(SYSTEM_THEME_QUERY, true));
    expect(result.current.resolvedTheme).toBe('dark');

    act(() => result.current.setTheme('light'));
    act(() => setMediaQuery(SYSTEM_THEME_QUERY, false));
    act(() => setMediaQuery(SYSTEM_THEME_QUERY, true));
    expect(result.current.theme).toBe('light');
    expect(result.current.resolvedTheme).toBe('light');
    expect(document.documentElement).not.toHaveClass('dark');

    act(() => result.current.setTheme('system'));
    expect(result.current.theme).toBe('system');
    expect(result.current.resolvedTheme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('system');
  });

  it('keeps theme selection working when storage is unavailable', () => {
    spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage is disabled');
    });
    spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage is disabled');
    });
    setMediaQuery(SYSTEM_THEME_QUERY, true);
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('system');
    expect(result.current.resolvedTheme).toBe('dark');
    act(() => result.current.setTheme('light'));
    expect(result.current.theme).toBe('light');
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });
});
