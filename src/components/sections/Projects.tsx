import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/common/SectionHeader';
import { AnimatedRevealGroup, AnimatedRevealItem, AnimatedSection } from '@/components/common/AnimatedSection';
import { HairlineFigure } from '@/components/common/HairlineFigure';
import { Carousel, CarouselItem } from '@/components/base/carousel/carousel';
import { useExplorer } from '@/hooks/useExplorer';
import { projects, contributions } from '@/lib/data';
import type { Project } from '@/types';
import { GitHubBrandIcon } from '@/utils/brand-icons';
import { createHugeicon } from '@/utils/icons';
import ReleaseIconData from '@hugeicons/core-free-icons/PackageIcon';
import WebsiteIconData from '@hugeicons/core-free-icons/Globe02Icon';
import PullRequestIconData from '@hugeicons/core-free-icons/GitPullRequestIcon';
import '@/styles/projects.css';

const ReleaseIcon = createHugeicon(ReleaseIconData, { displayName: 'ReleaseIcon' });
const WebsiteIcon = createHugeicon(WebsiteIconData, { displayName: 'WebsiteIcon' });
const PullRequestIcon = createHugeicon(PullRequestIconData, { displayName: 'PullRequestIcon' });

function projectLinkKind(name: string) {
  return name === 'Source' ? { label: 'Source', Icon: GitHubBrandIcon, order: 0 }
    : name === 'Releases' ? { label: 'Releases', Icon: ReleaseIcon, order: 1 }
      : { label: 'Website', Icon: WebsiteIcon, order: 2 };
}

function ProjectCard({ project, copy = false }: { project: Project; copy?: boolean }) {
  const { selectProject } = useExplorer();
  const content = <>
    <AnimatedRevealItem className="project-art" distance={40} duration={0.75}>{copy ? <div className="hairline-figure project-static-figure">
      <img className="hairline-preview-light" src={`${import.meta.env.BASE_URL}hairline/previews/${project.visualId}-light.svg`} width="400" height="320" alt="" />
      <img className="hairline-preview-dark" src={`${import.meta.env.BASE_URL}hairline/previews/${project.visualId}-dark.svg`} width="400" height="320" alt="" />
    </div> : <HairlineFigure name={project.visualId} label={`An interactive line illustration of ${project.title}: ${project.description}`} />}</AnimatedRevealItem>
    <AnimatedRevealItem className="project-copy" distance={32} duration={0.65} delay={0.12}>
      {copy ? <p className="project-card-title">{project.title}</p> : <h3 id={`project-${project.id}`}>{project.title}</h3>}
      <p className="project-summary">{project.description}</p>
      <p className="project-details">{project.details}</p>
      <ul className="tag-list" aria-label={copy ? undefined : `${project.title} technologies`}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <div className="project-links">{project.links.map(link => ({ ...link, ...projectLinkKind(link.name) }))
        .sort((left, right) => left.order - right.order)
        .map(({ url, label, Icon }) => copy ? <span key={url}><Icon aria-hidden="true" className="project-link-icon" />{label}</span>
          : <a key={url} href={url} target="_blank" rel="noopener noreferrer"><Icon aria-hidden="true" className="project-link-icon" />{label}</a>)}</div>
    </AnimatedRevealItem>
  </>;
  return copy ? <div className="project-card project-card-copy">{content}</div>
    : <article className="project-card" data-project-id={project.id} aria-labelledby={`project-${project.id}`} onFocus={() => selectProject(project.id)}>{content}</article>;
}

export function Projects() {
  const { selectedProjectId, selectProject } = useExplorer();
  const currentIndex = Math.max(0, projects.findIndex(project => project.id === selectedProjectId));
  return <Section id="projects" contained={false}>
    <div className="site-container"><SectionHeader titleId="projects-title" title="Things I make" description="Research code, small devices, and tools I wanted to have. These are the projects pinned on my GitHub." /></div>
    <AnimatedRevealGroup className="project-gallery-reveal"><Carousel aria-label="Personal projects" labels={projects.map(project => project.title)} selectedIndex={currentIndex}
      onIndexChange={index => selectProject(projects[index].id)} renderCopy={index => <ProjectCard project={projects[index]} copy />}>
      {projects.map(project => <CarouselItem key={project.id}><ProjectCard project={project} /></CarouselItem>)}
    </Carousel></AnimatedRevealGroup>
    <AnimatedSection className="site-container contribution-section">
      <h3>Working in the open</h3>
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
          <div className="contribution-source">{sources.map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"><GitHubBrandIcon aria-hidden="true" className="project-link-icon" />Source</a>)}</div>
          <p className="contribution-count">{requests.length} merged pull requests</p>
          <ul className="contribution-requests" aria-label="Featured merged pull requests">{featured.map(renderRequest)}</ul>
          {remaining.length > 0 && <details className="contribution-more">
            <summary>{remaining.length} more pull requests</summary>
            <ul className="contribution-requests" aria-label="More merged pull requests">{remaining.map(renderRequest)}</ul>
          </details>}
        </article>;
      })}
    </AnimatedSection>
  </Section>;
}
