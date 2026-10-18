import { content } from '@/content';
import type { ExplorerDestination, SectionId } from '@/types';

const sections = ['hero', 'projects', 'skills', 'experience', 'publications', 'travel', 'contact'] as const satisfies readonly SectionId[];

export const navLinks = sections.map(id => ({ name: content.navigation[id], href: `#${id}` as const }));

const destinations: ReadonlyArray<{ id: ExplorerDestination; href: string }> = [
  { id: 'projects', href: '#projects' },
  { id: 'skills', href: '#skills' },
  { id: 'experience', href: '#experience' },
  { id: 'open-source', href: '#vllm-ascend-work' },
  { id: 'travel', href: '#travel' },
  { id: 'contact', href: '#contact' },
];

export const explorerDestinations = destinations.map(destination => ({
  ...destination,
  ...content.explorer.destinations[destination.id],
}));
