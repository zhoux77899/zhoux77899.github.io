import { Card, Chip, Modal } from '@heroui/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { LinkSquare01Icon, Github01Icon } from '@hugeicons/core-free-icons';
import { useState } from 'react';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { projects } from '@/lib/data';
import type { Project } from '@/types';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="py-24"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Projects
          </h2>
          <p
            className="text-center mb-12 max-w-2xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            Selected recent work showcasing technical skills and innovation
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.1}>
              <Card
                className="overflow-hidden h-full cursor-pointer group"
                style={{ backgroundColor: 'var(--background)' }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden aspect-video">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--sage-soft)' }}
                  >
                    <span
                      className="text-4xl font-bold"
                      style={{ color: 'var(--sage)' }}
                    >
                      {project.title.slice(0, 1)}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm mb-4 line-clamp-2"
                    style={{ color: 'var(--muted)' }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Chip
                        key={tag}
                        size="sm"
                        style={{
                          backgroundColor: 'var(--sage-soft)',
                          color: 'var(--sage-soft-foreground)',
                        }}
                      >
                        {tag}
                      </Chip>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-2">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm hover:underline"
                        style={{ color: 'var(--link)' }}
                      >
                        <HugeiconsIcon icon={LinkSquare01Icon} className="h-4 w-4 mr-1" />
                        Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm hover:underline"
                        style={{ color: 'var(--muted)' }}
                      >
                        <HugeiconsIcon icon={Github01Icon} className="h-4 w-4 mr-1" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Project Detail Modal */}
        <Modal
          isOpen={selectedProject !== null}
          onOpenChange={() => setSelectedProject(null)}
        >
          {selectedProject && (
            <div style={{ backgroundColor: 'var(--background)' }}>
              <Modal.Header>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: 'var(--foreground)' }}
                >
                  {selectedProject.title}
                </h3>
              </Modal.Header>
              <Modal.Body>
                <div
                  className="w-full h-48 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'var(--sage-soft)' }}
                >
                  <span
                    className="text-6xl font-bold"
                    style={{ color: 'var(--sage)' }}
                  >
                    {selectedProject.title.slice(0, 1)}
                  </span>
                </div>
                <p
                  className="mb-4"
                  style={{ color: 'var(--foreground)' }}
                >
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <Chip
                      key={tag}
                      size="sm"
                      style={{
                        backgroundColor: 'var(--sage-soft)',
                        color: 'var(--sage-soft-foreground)',
                      }}
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="flex gap-2">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-lg font-medium"
                      style={{
                        backgroundColor: 'var(--accent)',
                        color: 'var(--accent-foreground)',
                      }}
                    >
                      <HugeiconsIcon icon={LinkSquare01Icon} className="h-4 w-4 mr-2" />
                      View Demo
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-lg font-medium border"
                      style={{
                        borderColor: 'var(--border)',
                        color: 'var(--foreground)',
                      }}
                    >
                      <HugeiconsIcon icon={Github01Icon} className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  )}
                </div>
              </Modal.Footer>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
