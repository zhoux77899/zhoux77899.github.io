import { describe, expect, it } from 'bun:test';
import { content, defaultLocale, getContent } from './index';
import { en } from './en';
import type { ExplorerDestination, SectionId } from '../types';

describe('site content', () => {
  it('reads the registered English locale through the same default entry point', () => {
    expect(defaultLocale).toBe('en');
    expect(getContent()).toBe(en);
    expect(getContent('en')).toBe(en);
    expect(content).toBe(getContent(defaultLocale));
    expect(content.metadata.lang).toBe(defaultLocale);
  });

  it.each([
    [0, '0 merged pull requests', '0 more pull requests'],
    [1, '1 merged pull request', '1 more pull request'],
    [12, '12 merged pull requests', '12 more pull requests'],
  ])('formats complete contribution messages for %i requests', (count, merged, more) => {
    expect(content.sections.contributions.mergedRequests(count)).toBe(merged);
    expect(content.sections.contributions.moreRequests(count)).toBe(more);
  });

  it('formats accessible names and dates with the supplied values', () => {
    expect(content.ui.carousel.show('CFGAN')).toBe('Show CFGAN');
    expect(content.ui.carousel.position('CFGAN', 1, 6)).toBe('CFGAN, 1 of 6');
    expect(content.explorer.hotspotLabel('Projects', 'Model workstation')).toBe('Projects — Model workstation');
    expect(content.sections.travel.yearRange(2025, 2025)).toBe('2025');
    expect(content.sections.travel.yearRange(2018, 2022)).toBe('2018–2022');
    expect(content.ui.footer.copyright(2026)).toBe('© 2026 ');
    expect(content.explorer.previewTitle('light')).toBe('Precision exploration case — light');
    expect(content.explorer.previewTitle('dark')).toBe('Precision exploration case — dark');
  });

  it('provides navigation and explorer labels for every stable destination', () => {
    const sections: SectionId[] = ['hero', 'projects', 'skills', 'experience', 'publications', 'travel', 'contact'];
    const destinations: ExplorerDestination[] = ['projects', 'skills', 'experience', 'open-source', 'travel', 'contact'];
    for (const section of sections) expect(content.navigation[section].trim()).not.toBe('');
    for (const destination of destinations) {
      expect(content.explorer.destinations[destination].label.trim()).not.toBe('');
      expect(content.explorer.destinations[destination].object.trim()).not.toBe('');
    }
  });

  it('keeps stable content identifiers unique and skill project references valid', () => {
    for (const items of [content.projects, content.skills, content.travelItems, content.experienceItems, content.personalInfo.socialLinks]) {
      expect(new Set(items.map(item => item.id)).size).toBe(items.length);
    }
    const projectIds = new Set(content.projects.map(project => project.id));
    for (const skill of content.skills) {
      expect(skill.id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(content.skillCategories[skill.category].trim()).not.toBe('');
      for (const id of skill.projects) expect(projectIds.has(id)).toBe(true);
    }
    for (const project of content.projects) {
      expect(project.links.length).toBeGreaterThan(0);
      for (const link of project.links) {
        expect(['source', 'releases', 'website']).toContain(link.kind);
        expect(link.name.trim()).not.toBe('');
        expect(new URL(link.url).protocol).toBe('https:');
      }
    }
  });

  it('includes all featured pull requests in the contribution links', () => {
    for (const contribution of content.contributions) {
      const requestIds = new Set(contribution.links
        .filter(link => /\/pull\/\d+$/.test(link.url))
        .map(link => Number(link.url.split('/').at(-1))));
      expect(new Set(contribution.featuredPullRequests).size).toBe(contribution.featuredPullRequests.length);
      for (const id of contribution.featuredPullRequests) expect(requestIds.has(id)).toBe(true);
    }
  });

  it('keeps publication source text ordered around a resolvable link', () => {
    const source = content.sections.publications.source;
    expect(source.map(part => part.text).join('')).toBe('See my ORCID record for publication details.');
    const links = source.filter(part => part.type === 'link');
    expect(links).toHaveLength(1);
    expect(links[0].id).toBe('orcid');
    expect(content.personalInfo.socialLinks.find(link => link.id === links[0].id)?.url).toBe(content.orcidUrl);
  });

  it('provides nonempty metadata, social handles and travel illustration descriptions', () => {
    for (const value of Object.values(content.metadata)) expect(value.trim()).not.toBe('');
    expect(content.metadata.author).toBe(content.personalInfo.name);
    expect(content.metadata.image).toBe(content.personalInfo.avatar);
    for (const link of content.personalInfo.socialLinks) {
      expect(link.handle.trim()).not.toBe('');
      expect(link.contactLabel.trim()).not.toBe('');
    }
    for (const travel of content.travelItems) {
      expect(travel.description.trim()).not.toBe('');
      expect(travel.illustrationLabel.trim()).not.toBe('');
    }
  });
});
