import { Button } from '@heroui/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Sun01Icon, Moon02Icon } from '@hugeicons/core-free-icons';
import { useTheme } from '@/providers/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onPress={toggleTheme}
      className="rounded-full w-10 h-10 p-0 min-w-0"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <HugeiconsIcon icon={Moon02Icon} className="h-5 w-5" style={{ color: 'var(--foreground)' }} />
      ) : (
        <HugeiconsIcon icon={Sun01Icon} className="h-5 w-5" style={{ color: 'var(--foreground)' }} />
      )}
    </Button>
  );
}
