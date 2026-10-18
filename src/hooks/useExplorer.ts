import { useContext } from 'react';
import { ExplorerContext } from '@/providers/explorerContext';

export function useExplorer() {
  const context = useContext(ExplorerContext);
  if (!context) throw new Error('useExplorer must be used within ExplorerProvider.');
  return context;
}
