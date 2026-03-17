import { Tabs } from '@heroui/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Sun03Icon, Moon02Icon, ComputerIcon } from '@hugeicons/core-free-icons';
import { useTheme } from '@/providers/ThemeProvider';
import classnames from 'classnames';


export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const TAB_CLASSNAME = classnames(
    "flex items-center justify-center",
    "rounded-full w-6 h-6 p-0 min-w-0",
    "data-[selected=true]:bg-[var(--accent)] data-[selected=true]:text-[var(--accent-foreground)] dark:data-[selected=true]:text-[var(--foreground)] transition-colors"
  );
  const ICON_CLASSNAME = "h-4 w-4";

  return (
    <Tabs
      selectedKey={theme}
      onSelectionChange={(key) => setTheme(key as 'light' | 'dark' | 'system')}
      className="w-full text-center"
    >
      <Tabs.ListContainer>
        <Tabs.List
          aria-label="Theme selection"
          className="w-fit gap-2 p-1"
        >
          <Tabs.Tab
            id="light"
            aria-label="Light mode"
            className={TAB_CLASSNAME}
          >
            <HugeiconsIcon
              icon={Sun03Icon}
              className={ICON_CLASSNAME}
            />
          </Tabs.Tab>
          <Tabs.Tab
            id="dark"
            aria-label="Dark mode"
            className={TAB_CLASSNAME}
          >
            <HugeiconsIcon
              icon={Moon02Icon}
              className={ICON_CLASSNAME}
            />
          </Tabs.Tab>
          <Tabs.Tab
            id="system"
            aria-label="System theme"
            className={TAB_CLASSNAME}
          >
            <HugeiconsIcon
              icon={ComputerIcon}
              className={ICON_CLASSNAME}
            />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}
