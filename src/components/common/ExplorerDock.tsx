import { useId, useRef, useState } from 'react';
import { Popover } from 'react-aria-components/Popover';
import { Dialog } from 'react-aria-components/Dialog';
import { useExplorer } from '@/hooks/useExplorer';
import type { ExplorerDestination } from '@/lib/explorer';
import { CloseIcon } from '@/utils/icons';
import { Button } from '@/components/base/buttons/button';
import { AnatomyExplorer } from './AnatomyExplorer';
import { content } from '@/content';

export function ExplorerDock() {
  const { heroVisible, activeDestination } = useExplorer();
  return heroVisible ? null : <ExplorerDockPanel activeDestination={activeDestination} />;
}

function ExplorerDockPanel({ activeDestination }: { activeDestination: ExplorerDestination | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogId = useId();
  return (
    <div className="explorer-dock">
      <Button ref={triggerRef} variant="primary" className="explorer-dock-trigger" aria-haspopup="dialog"
        aria-expanded={isOpen} aria-controls={dialogId} onClick={() => setIsOpen((open) => !open)}>
        <span className="explorer-dock-thumbnail" aria-hidden="true">
          <img className="hairline-preview-light" src={`${import.meta.env.BASE_URL}anatomy/explorer-light.svg`} alt="" width="64" height="50" />
          <img className="hairline-preview-dark" src={`${import.meta.env.BASE_URL}anatomy/explorer-dark.svg`} alt="" width="64" height="50" />
        </span>
        <span>{content.explorer.open}</span>
      </Button>
      <Popover isOpen={isOpen} onOpenChange={setIsOpen} triggerRef={triggerRef} placement="top start" offset={10} className="explorer-dock-popover">
        <Dialog id={dialogId} aria-label={content.explorer.groupLabel} className="explorer-dock-dialog" onClick={(event) => {
          if (event.target instanceof Element && event.target.closest('a[href^="#"]')) setIsOpen(false);
        }}>
          <div className="explorer-dock-heading"><h2>{content.explorer.open}</h2><Button variant="primary" iconOnly leadingIcon={CloseIcon} aria-label={content.explorer.close} onClick={() => setIsOpen(false)} /></div>
          <AnatomyExplorer activeDestination={activeDestination} />
        </Dialog>
      </Popover>
    </div>
  );
}
