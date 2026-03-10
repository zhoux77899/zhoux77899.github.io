import { useState } from "react";
import { Chip, Modal } from "@heroui/react";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/common/ProjectCard";
import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import type { Project } from "@/types";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <AnimatedSection id="projects" className="py-16 sm:py-24 bg-surface">
      <Container>
        <h2 className="text-3xl font-bold text-foreground mb-12">项目作品</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </Container>

      <Modal.Backdrop
        isOpen={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-lg bg-surface">
            <Modal.CloseTrigger />
            {selectedProject && (
              <>
                <Modal.Header>
                  <Modal.Heading className="text-foreground">
                    {selectedProject.title}
                  </Modal.Heading>
                </Modal.Header>
                <Modal.Body className="text-foreground">
                  <p className="text-muted mb-4">
                    {selectedProject.longDescription ?? selectedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.tags.map((tag) => (
                      <Chip
                        key={tag}
                        size="sm"
                        className="bg-[var(--sage-soft)] text-[var(--sage-soft-foreground)]"
                        variant="soft"
                      >
                        {tag}
                      </Chip>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm bg-surface border border-border text-foreground hover:bg-default"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    )}
                  </div>
                </Modal.Body>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </AnimatedSection>
  );
}
