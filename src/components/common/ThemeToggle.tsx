import { SegmentedControl, SegmentedControlItem } from '@/components/base/segmented-control/segmented-control';
import { useTheme } from '@/hooks/useTheme';
import { isTheme } from '@/providers/theme';
import { MoonIcon, SunIcon, SystemIcon } from '@/utils/icons';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <SegmentedControl
      aria-label="Theme selection"
      selectedKeys={new Set([theme])}
      onSelectionChange={(keys) => {
        const selection = keys.values().next().value;
        if (isTheme(selection)) setTheme(selection);
      }}
      className="shrink-0"
    >
      <SegmentedControlItem id="light" aria-label="Light mode">
        <SunIcon aria-hidden="true" className="size-4" />
      </SegmentedControlItem>
      <SegmentedControlItem id="dark" aria-label="Dark mode">
        <MoonIcon aria-hidden="true" className="size-4" />
      </SegmentedControlItem>
      <SegmentedControlItem id="system" aria-label="System theme">
        <SystemIcon aria-hidden="true" className="size-4" />
      </SegmentedControlItem>
    </SegmentedControl>
  );
}
