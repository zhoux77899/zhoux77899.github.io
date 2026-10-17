import { describe, expect, it } from 'bun:test';
import { render, screen, within } from '@testing-library/react';
import { content, publications } from '@/content';
import { explorerLinks, resolveExplorerHash } from '@/lib/explorer';
import { navLinks } from '@/lib/navigation';
import { Publications } from './Publications';

describe('Publications', () => {
  it('shows the two unique papers in descending year order with complete citations', () => {
    render(<Publications />);
    const entries = within(screen.getByRole('list', { name: 'Research publications' })).getAllByRole('article');
    expect(entries).toHaveLength(2);
    expect(new Set(publications.map((publication) => publication.doi.toLowerCase())).size).toBe(2);

    const recent = within(entries[0]);
    expect(recent.getByText('2026')).toBeInTheDocument();
    expect(recent.getByRole('heading', { name: 'Improving Precision in Extended-Range Three-Dimensional Single-Molecule Localization with Physics-Guided Deep Learning' })).toBeInTheDocument();
    expect(entries[0]).toHaveTextContent('Xiang Zhou, Yuma Ito, Makio Tokunaga');
    expect(entries[0]).toHaveTextContent('Photonics 13(7), 649');
    expect(recent.getByRole('link', { name: 'DOI: 10.3390/photonics13070649' })).toHaveAttribute('href', 'https://doi.org/10.3390/photonics13070649');

    const earlier = within(entries[1]);
    expect(earlier.getByText('2017')).toBeInTheDocument();
    expect(earlier.getByRole('heading', { name: 'Dynamic wavefront measurement with a pinhole linear polarizer point-diffraction interferometer' })).toBeInTheDocument();
    expect(entries[1]).toHaveTextContent('Xiang Zhou, Renhui Guo, Wenhua Zhu, Donghui Zheng, Lei Chen');
    expect(entries[1]).toHaveTextContent('Applied Optics 56(29), 8040–8047');
    expect(earlier.getByRole('link', { name: 'DOI: 10.1364/ao.56.008040' })).toHaveAttribute('href', 'https://doi.org/10.1364/ao.56.008040');
    for (const entry of entries) expect(entry.querySelector('strong')).toHaveTextContent('Xiang Zhou');
  });

  it('links to the ORCID source and adds a section without adding an Explorer hotspot', () => {
    render(<Publications />);
    expect(screen.getByRole('region', { name: 'Publications' })).toHaveAttribute('id', 'publications');
    expect(screen.getByRole('link', { name: 'ORCID record' })).toHaveAttribute('href', 'https://orcid.org/0000-0003-3695-460X');
    expect(navLinks.map((link) => link.href)).toEqual(['#hero', '#projects', '#skills', '#experience', '#publications', '#travel', '#contact']);
    expect(resolveExplorerHash('#publications')).toEqual({ section: 'publications', destination: null, target: 'publications' });
    expect(explorerLinks).toHaveLength(6);
    expect(explorerLinks.some((link) => link.href === '#publications')).toBe(false);
  });

  it('renders linked source copy in the order defined by the locale', () => {
    const source = content.sections.publications.source;
    try {
      content.sections.publications.source = [
        { type: 'link', id: 'orcid', text: 'Publication record' },
        { type: 'text', text: ' has all the details.' },
      ];
      const view = render(<Publications />);
      expect(view.container.querySelector('.publication-source')?.textContent).toBe('Publication record has all the details.');
      const link = screen.getByRole('link', { name: 'Publication record' });
      expect(link).toHaveAttribute('href', content.orcidUrl);
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    } finally { content.sections.publications.source = source; }
  });
});
