import { projects } from '@/content';
import { explorerDestinations } from '@/lib/navigation';
import type { ExplorerDestination } from '@/types';

export type { ExplorerDestination } from '@/types';

export const explorerLinks = explorerDestinations.map(({ id, label, href }) => ({ destination: id, name: label, href }));

export const countryIds = ['new-zealand', 'japan', 'china'] as const;
const legacyCountries: Record<string, string> = { 'travel-1': 'new-zealand', 'travel-2': 'japan', 'travel-3': 'japan' };

export interface ExplorerRoute {
  section: string;
  destination: ExplorerDestination | null;
  target: string;
  projectId?: string;
  countryId?: string;
}

export function resolveExplorerHash(hash: string): ExplorerRoute | undefined {
  const target = hash.replace(/^#/, '');
  if (target === 'hero') return { section: 'hero', destination: null, target };
  if (target === 'publications') return { section: 'publications', destination: null, target };
  const link = explorerLinks.find((item) => item.href === hash);
  if (link) return { section: link.destination === 'open-source' ? 'projects' : link.destination, destination: link.destination, target };
  const project = projects.find((item) => `project-${item.id}` === target);
  if (project) return { section: 'projects', destination: 'projects', target, projectId: project.id };
  const countryId = countryIds.find((id) => `travel-${id}` === target) ?? legacyCountries[target];
  if (countryId) return { section: 'travel', destination: 'travel', target, countryId };
  return undefined;
}

export function getNavigationOffset(kind: 'anchor' | 'header' = 'anchor'): number {
  const styles = window.getComputedStyle(document.documentElement);
  const header = Number.parseFloat(styles.getPropertyValue('--header-height')) || 64;
  if (kind === 'header') return header;
  const anchor = styles.getPropertyValue('--anchor-offset').trim();
  if (/^\d+(\.\d+)?px$/.test(anchor)) return Number.parseFloat(anchor);
  // Custom properties preserve calc(), even after their var() references resolve.
  if (/^calc\(\s*\d+(\.\d+)?px\s*\+\s*\d+(\.\d+)?px\s*\)$/.test(anchor)) {
    return [...anchor.matchAll(/[\d.]+(?=px)/g)].reduce((total, match) => total + Number(match[0]), 0);
  }
  return header + 24;
}

export function readActiveExplorer(): { section: string; destination: ExplorerDestination | null } {
  const offset = getNavigationOffset();
  let section = 'hero';
  for (const id of ['hero', 'projects', 'skills', 'experience', 'publications', 'travel', 'contact']) {
    const rect = document.getElementById(id)?.getBoundingClientRect();
    if (rect && rect.height !== 0 && rect.top <= offset) section = id;
  }
  if (document.documentElement.scrollHeight > window.innerHeight
    && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) section = 'contact';
  const contribution = document.getElementById('vllm-ascend-work')?.getBoundingClientRect();
  const destination = section === 'projects' && contribution && contribution.height !== 0 && contribution.top <= offset
    ? 'open-source'
    : section === 'hero' || section === 'publications' ? null : section as ExplorerDestination;
  return { section, destination };
}
