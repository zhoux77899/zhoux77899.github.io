import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeContext, type Theme, type ThemeContextType } from './themeContext';
import { applyTheme, readInitialTheme, resolveTheme } from './theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(readInitialTheme);

  useEffect(() => {
    applyTheme(state);
  }, [state]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setState((current) => {
        if (current.theme !== 'system') return current;
        const resolvedTheme = mediaQuery.matches ? 'dark' : 'light';
        return current.resolvedTheme === resolvedTheme
          ? current
          : { theme: 'system', resolvedTheme };
      });
    };

    mediaQuery.addEventListener('change', handleChange);
    // Recheck after subscribing so changes between render and this effect are observed.
    handleChange();
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    const nextState = { theme, resolvedTheme: resolveTheme(theme) };
    applyTheme(nextState);
    setState(nextState);

    try {
      localStorage.setItem('theme', theme);
    } catch {
      // An unavailable storage area must not prevent theme selection.
    }
  }, []);

  const value = useMemo<ThemeContextType>(
    () => ({ ...state, setTheme }),
    [state, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
