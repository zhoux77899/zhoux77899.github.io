import { SegmentedControl, SegmentedControlItem } from '@/components/base/segmented-control/segmented-control';
import { useTheme } from '@/hooks/useTheme';
import { isTheme } from '@/providers/theme';
import { MoonIcon, SunIcon, SystemIcon } from '@/utils/icons';
import { content } from '@/content';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <SegmentedControl
      aria-label={content.ui.theme.selectionLabel}
      selectedKeys={new Set([theme])}
      onSelectionChange={(keys) => {
        const selection = keys.values().next().value;
        if (isTheme(selection)) setTheme(selection);
      }}
      className="site-theme-toggle shrink-0"
    >
      <SegmentedControlItem id="light" aria-label={content.ui.theme.light}>
        <SunIcon aria-hidden="true" className="size-4" />
      </SegmentedControlItem>
      <SegmentedControlItem id="dark" aria-label={content.ui.theme.dark}>
        <MoonIcon aria-hidden="true" className="size-4" />
      </SegmentedControlItem>
      <SegmentedControlItem id="system" aria-label={content.ui.theme.system}>
        <SystemIcon aria-hidden="true" className="size-4" />
      </SegmentedControlItem>
    </SegmentedControl>
  );
}
