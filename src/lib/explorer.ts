import { projects } from '@/lib/data';

export type ExplorerDestination = 'projects' | 'skills' | 'experience' | 'open-source' | 'travel' | 'contact';

export const explorerLinks: { destination: ExplorerDestination; name: string; href: string }[] = [
  { destination: 'projects', name: 'Projects', href: '#projects' },
  { destination: 'skills', name: 'Stack', href: '#skills' },
  { destination: 'experience', name: 'Background', href: '#experience' },
  { destination: 'open-source', name: 'Open source', href: '#vllm-ascend-work' },
  { destination: 'travel', name: 'Travel', href: '#travel' },
  { destination: 'contact', name: 'Contact', href: '#contact' },
];

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
  const link = explorerLinks.find((item) => item.href === hash);
  if (link) return { section: link.destination === 'open-source' ? 'projects' : link.destination, destination: link.destination, target };
  const project = projects.find((item) => `project-${item.id}` === target);
  if (project) return { section: 'projects', destination: 'projects', target, projectId: project.id };
  const countryId = countryIds.find((id) => `travel-${id}` === target) ?? legacyCountries[target];
  if (countryId) return { section: 'travel', destination: 'travel', target, countryId };
  return undefined;
}

export function readActiveExplorer(): { section: string; destination: ExplorerDestination | null } {
  let section = 'hero';
  for (const id of ['hero', 'projects', 'skills', 'experience', 'travel', 'contact']) {
    const rect = document.getElementById(id)?.getBoundingClientRect();
    if (rect && rect.height !== 0 && rect.top <= 112) section = id;
  }
  if (document.documentElement.scrollHeight > window.innerHeight
    && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) section = 'contact';
  const contribution = document.getElementById('vllm-ascend-work')?.getBoundingClientRect();
  const destination = section === 'projects' && contribution && contribution.height !== 0 && contribution.top <= 112
    ? 'open-source'
    : section === 'hero' ? null : section as ExplorerDestination;
  return { section, destination };
}
