import type { ResolvedTheme, Theme } from './themeContext';

export interface ThemeState {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
}

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark' || value === 'system';
}

export function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === 'system' ? getSystemTheme() : theme;
}

export function readInitialTheme(): ThemeState {
  const root = document.documentElement;
  const bootstrappedTheme = root.dataset.themePreference;
  let theme: Theme = 'system';

  if (isTheme(bootstrappedTheme)) {
    theme = bootstrappedTheme;
  } else {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (isTheme(savedTheme)) theme = savedTheme;
    } catch {
      // The system preference remains available when browser storage is blocked.
    }
  }

  return { theme, resolvedTheme: resolveTheme(theme) };
}

export function applyTheme({ theme, resolvedTheme }: ThemeState) {
  const root = document.documentElement;
  root.dataset.themePreference = theme;
  root.dataset.theme = resolvedTheme;
  root.classList.toggle('dark', resolvedTheme === 'dark');
  root.style.colorScheme = resolvedTheme;
}
