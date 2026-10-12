import { Chip } from "@/components/base/badges/chip";
import { ButtonLink } from "@/components/base/buttons/button";
import { StaggerContainer, StaggerItem } from "@/components/common/AnimatedSection";
import { ContentImage } from "@/components/common/ContentImage";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Section } from "@/components/layout/Section";
import { projects } from "@/lib/data";
import { ExternalLinkIcon, GitHubIcon } from "@/utils/icons";

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeader titleId="projects-title" label="Portfolio" title="Featured Projects" description="Selected recent work showcasing technical skills and innovation" />
      <StaggerContainer className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1} threshold={0.05}>
        {projects.map((project) => (
          <StaggerItem key={project.id} animation="scale-up">
            <article aria-labelledby={`project-${project.id}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] transition-transform duration-300 motion-safe:hover:-translate-y-2">
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <ContentImage src={project.image} alt={project.title} fallback={project.title.slice(0, 1)} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 id={`project-${project.id}`} className="font-display text-xl font-semibold text-[var(--foreground)]">{project.title}</h3>
                  {project.stars != null && (
                    <span aria-label={`${project.stars} GitHub stars`} className="flex gap-1 text-sm whitespace-nowrap text-[var(--muted)]">
                      <span aria-hidden="true" className="text-[var(--accent)]">★</span>{project.stars}
                    </span>
                  )}
                </div>
                <p className="mb-5 text-sm leading-relaxed text-[var(--muted)]">{project.description}</p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Chip key={tag} variant="caption" color="lime" className="border border-[var(--sage)] bg-transparent text-[var(--sage)]">{tag}</Chip>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-4 border-t border-[var(--border)] pt-4">
                  {project.demoUrl ? (
                    <ButtonLink href={project.demoUrl} target="_blank" rel="noopener noreferrer" variant="ghost" size="small" leadingIcon={ExternalLinkIcon} className="p-0 text-[var(--link)]">
                      {project.demoLabel || "Live Demo"}
                    </ButtonLink>
                  ) : null}
                  {project.githubUrl ? (
                    <ButtonLink href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="ghost" size="small" leadingIcon={GitHubIcon} className="p-0 text-[var(--muted)]">
                      Source Code
                    </ButtonLink>
                  ) : null}
                </div>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
