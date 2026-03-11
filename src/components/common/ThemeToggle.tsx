import { Button } from '@heroui/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onPress={toggleTheme}
      className="rounded-full w-10 h-10 p-0 min-w-0"
      aria-label={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" style={{ color: 'var(--foreground)' }} />
      ) : (
        <Sun className="h-5 w-5" style={{ color: 'var(--foreground)' }} />
      )}
    </Button>
  );
}
