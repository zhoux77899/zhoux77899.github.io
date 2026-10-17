import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/common/SectionHeader';
import { AnimatedRevealGroup, AnimatedRevealItem, AnimatedSection } from '@/components/common/AnimatedSection';
import { HairlineFigure } from '@/components/common/HairlineFigure';
import { Carousel, CarouselItem } from '@/components/base/carousel/carousel';
import { useExplorer } from '@/hooks/useExplorer';
import { content, projects, contributions } from '@/content';
import type { Project, ProjectLink } from '@/types';
import { GitHubBrandIcon } from '@/utils/brand-icons';
import { createHugeicon } from '@/utils/icons';
import ReleaseIconData from '@hugeicons/core-free-icons/PackageIcon';
import WebsiteIconData from '@hugeicons/core-free-icons/Globe02Icon';
import PullRequestIconData from '@hugeicons/core-free-icons/GitPullRequestIcon';
import '@/styles/projects.css';

const ReleaseIcon = createHugeicon(ReleaseIconData, { displayName: 'ReleaseIcon' });
const WebsiteIcon = createHugeicon(WebsiteIconData, { displayName: 'WebsiteIcon' });
const PullRequestIcon = createHugeicon(PullRequestIconData, { displayName: 'PullRequestIcon' });

function projectLinkKind(kind: ProjectLink['kind']) {
  return kind === 'source' ? { Icon: GitHubBrandIcon, order: 0 }
    : kind === 'releases' ? { Icon: ReleaseIcon, order: 1 }
      : { Icon: WebsiteIcon, order: 2 };
}

function ProjectCard({ project, copy = false }: { project: Project; copy?: boolean }) {
  const { selectProject } = useExplorer();
  const body = <>
    <AnimatedRevealItem className="project-art" distance={40} duration={0.75}>{copy ? <div className="hairline-figure project-static-figure">
      <img className="hairline-preview-light" src={`${import.meta.env.BASE_URL}hairline/previews/${project.visualId}-light.svg`} width="400" height="320" alt="" />
      <img className="hairline-preview-dark" src={`${import.meta.env.BASE_URL}hairline/previews/${project.visualId}-dark.svg`} width="400" height="320" alt="" />
    </div> : <HairlineFigure name={project.visualId} label={content.sections.projects.illustration(project.title, project.description)} />}</AnimatedRevealItem>
    <AnimatedRevealItem className="project-copy" distance={32} duration={0.65} delay={0.12}>
      {copy ? <p className="project-card-title">{project.title}</p> : <h3 id={`project-${project.id}`}>{project.title}</h3>}
      <p className="project-summary">{project.description}</p>
      <p className="project-details">{project.details}</p>
      <ul className="tag-list" aria-label={copy ? undefined : content.sections.projects.technologies(project.title)}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <div className="project-links">{project.links.map(link => ({ ...link, ...projectLinkKind(link.kind) }))
        .sort((left, right) => left.order - right.order)
        .map(({ url, name, Icon }) => copy ? <span key={url}><Icon aria-hidden="true" className="project-link-icon" />{name}</span>
          : <a key={url} href={url} target="_blank" rel="noopener noreferrer"><Icon aria-hidden="true" className="project-link-icon" />{name}</a>)}</div>
    </AnimatedRevealItem>
  </>;
  return copy ? <div className="project-card project-card-copy">{body}</div>
    : <article className="project-card" data-project-id={project.id} aria-labelledby={`project-${project.id}`} onFocus={() => selectProject(project.id)}>{body}</article>;
}

export function Projects() {
  const { selectedProjectId, selectProject } = useExplorer();
  const currentIndex = Math.max(0, projects.findIndex(project => project.id === selectedProjectId));
  return <Section id="projects" contained={false}>
    <div className="site-container"><SectionHeader titleId="projects-title" title={content.sections.projects.title} description={content.sections.projects.description} /></div>
    <AnimatedRevealGroup className="project-gallery-reveal"><Carousel aria-label={content.sections.projects.galleryLabel} labels={projects.map(project => project.title)} selectedIndex={currentIndex}
      onIndexChange={index => selectProject(projects[index].id)} renderCopy={index => <ProjectCard project={projects[index]} copy />}>
      {projects.map(project => <CarouselItem key={project.id}><ProjectCard project={project} /></CarouselItem>)}
    </Carousel></AnimatedRevealGroup>
    <AnimatedSection className="site-container contribution-section">
      <h3>{content.sections.contributions.title}</h3>
      {contributions.map(item => {
        const sources = item.links.filter(link => !/\/pull\/\d+/.test(link.url));
        const requests = item.links.filter(link => /\/pull\/\d+/.test(link.url))
          .sort((left, right) => Number(left.url.split('/').at(-1)) - Number(right.url.split('/').at(-1)));
        const requestNumber = (link: typeof requests[number]) => Number(link.url.split('/').at(-1));
        const featured = item.featuredPullRequests.flatMap(number => requests.filter(link => requestNumber(link) === number));
        const remaining = requests.filter(link => !item.featuredPullRequests.includes(requestNumber(link)));
        const renderRequest = (link: typeof requests[number]) => <li key={link.url}><a href={link.url} target="_blank" rel="noopener noreferrer"><PullRequestIcon aria-hidden="true" className="project-link-icon" />{link.name}</a></li>;
        return <article key={item.title} id="vllm-ascend-work">
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <div className="contribution-source">{sources.map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"><GitHubBrandIcon aria-hidden="true" className="project-link-icon" />{content.sections.contributions.source}</a>)}</div>
          <p className="contribution-count">{content.sections.contributions.mergedRequests(requests.length)}</p>
          <ul className="contribution-requests" aria-label={content.sections.contributions.featuredLabel}>{featured.map(renderRequest)}</ul>
          {remaining.length > 0 && <details className="contribution-more">
            <summary>{content.sections.contributions.moreRequests(remaining.length)}</summary>
            <ul className="contribution-requests" aria-label={content.sections.contributions.moreLabel}>{remaining.map(renderRequest)}</ul>
          </details>}
        </article>;
      })}
    </AnimatedSection>
  </Section>;
}
