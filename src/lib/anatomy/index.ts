import type { ExplorerDestination } from '@/types';

export type { ExplorerDestination } from '@/types';
export { explorerDestinations } from '@/lib/navigation';

export interface ExplorerItem {
  id: string;
  piece: ExplorerDestination | 'stand';
  key: number;
  lift: number;
  offset: [number, number];
}
export interface ExplorerAsset {
  version: 1;
  width: number;
  height: number;
  solids: number;
  body: string;
  items: ExplorerItem[];
  modules: Array<{ id: ExplorerDestination; label: string; href: string; object: string; x: number; y: number; rx: number; ry: number }>;
}

let pending: Promise<ExplorerAsset> | undefined;
export function loadExplorer(): Promise<ExplorerAsset> {
  if (pending) return pending;
  pending = fetch(`${import.meta.env.BASE_URL}anatomy/explorer.json`)
    .then(async response => {
      if (!response.ok) throw new Error('The exploration drawing could not load.');
      const asset = await response.json() as ExplorerAsset;
      if (asset.version !== 1 || !Array.isArray(asset.items) || asset.modules.length !== 6) {
        throw new Error('The exploration drawing has an unsupported format.');
      }
      return asset;
    })
    .catch((error: unknown) => {
      pending = undefined;
      throw error;
    });
  return pending;
}
