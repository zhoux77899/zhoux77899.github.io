import { Card, Chip, Modal } from '@heroui/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { LinkSquare01Icon, Github01Icon, ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/common/AnimatedSection';
import { projects } from '@/lib/data';
import type { Project } from '@/types';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section
      id="projects"
      className="py-32 relative overflow-hidden"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--border) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
              style={{
                backgroundColor: 'var(--accent-soft)',
                color: 'var(--accent)',
              }}
            >
              Portfolio
            </span>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: 'var(--foreground)' }}
            >
              Featured Projects
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--muted)' }}
            >
              Selected recent work showcasing technical skills and innovation
            </p>
          </div>
        </AnimatedSection>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          staggerDelay={0.1}
          threshold={0.05}
        >
          {projects.map((project, index) => (
            <StaggerItem key={project.id} animation="scale-up">
              <motion.div
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Card
                  className="overflow-hidden h-full cursor-pointer group relative"
                  style={{ backgroundColor: 'var(--background)' }}
                  onPress={() => setSelectedProject(project)}
                >
                  {/* Project Number Badge */}
                  <div
                    className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--accent-foreground)',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Project Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <motion.div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--sage-soft)' }}
                      animate={{
                        scale: hoveredProject === project.id ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <span
                        className="text-5xl font-bold font-display"
                        style={{ color: 'var(--sage)' }}
                      >
                        {project.title.slice(0, 1)}
                      </span>
                    </motion.div>

                    {/* Hover Overlay */}
                    <AnimatePresence>
                      {hoveredProject === project.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ backgroundColor: 'var(--overlay)' }}
                        >
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium"
                            style={{
                              backgroundColor: 'var(--accent)',
                              color: 'var(--accent-foreground)',
                            }}
                          >
                            View Details
                            <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-4 h-4" />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3
                        className="text-xl font-semibold font-display group-hover:text-[var(--accent)] transition-colors"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {project.title}
                      </h3>
                      {project.stars != null && (
                        <span
                          className="text-sm flex items-center gap-1 whitespace-nowrap"
                          style={{ color: 'var(--muted)' }}
                          title="Stars"
                        >
                          <span style={{ color: 'var(--accent)' }}>★</span> {project.stars}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-sm mb-5 line-clamp-2 leading-relaxed"
                      style={{ color: 'var(--muted)' }}
                    >
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Chip
                          key={tag}
                          size="sm"
                          variant="outline"
                          className="border"
                          style={{
                            borderColor: 'var(--sage)',
                            color: 'var(--sage)',
                            backgroundColor: 'transparent',
                          }}
                        >
                          {tag}
                        </Chip>
                      ))}
                      {project.tags.length > 3 && (
                        <Chip
                          size="sm"
                          style={{
                            backgroundColor: 'var(--default)',
                            color: 'var(--default-foreground)',
                          }}
                        >
                          +{project.tags.length - 3}
                        </Chip>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                      {project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium"
                          style={{ color: 'var(--link)' }}
                          whileHover={{ x: 4 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <HugeiconsIcon icon={LinkSquare01Icon} className="h-4 w-4 mr-1" />
                          Live Demo
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium"
                          style={{ color: 'var(--muted)' }}
                          whileHover={{ x: 4 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <HugeiconsIcon icon={Github01Icon} className="h-4 w-4 mr-1" />
                          Source Code
                        </motion.a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Project Detail Modal */}
        <Modal
          isOpen={selectedProject !== null}
          onOpenChange={() => setSelectedProject(null)}
          size="lg"
        >
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                style={{ backgroundColor: 'var(--background)' }}
              >
                <Modal.Header>
                  <div>
                    <span
                      className="text-sm font-medium mb-2 block"
                      style={{ color: 'var(--accent)' }}
                    >
                      Project Details
                    </span>
                    <h3
                      className="text-3xl font-bold font-display"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {selectedProject.title}
                    </h3>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <div
                    className="w-full h-56 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: 'var(--sage-soft)' }}
                  >
                    <span
                      className="text-7xl font-bold font-display"
                      style={{ color: 'var(--sage)' }}
                    >
                      {selectedProject.title.slice(0, 1)}
                    </span>
                  </div>
                  <p
                    className="mb-6 text-lg leading-relaxed"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {selectedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <Chip
                        key={tag}
                        size="md"
                        variant="outline"
                        className="border"
                        style={{
                          borderColor: 'var(--sage)',
                          color: 'var(--sage)',
                          backgroundColor: 'transparent',
                        }}
                      >
                        {tag}
                      </Chip>
                    ))}
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className="flex gap-3 w-full">
                    {selectedProject.demoUrl && (
                      <motion.a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium flex-1"
                        style={{
                          backgroundColor: 'var(--accent)',
                          color: 'var(--accent-foreground)',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <HugeiconsIcon icon={LinkSquare01Icon} className="h-4 w-4 mr-2" />
                        View Demo
                      </motion.a>
                    )}
                    {selectedProject.githubUrl && (
                      <motion.a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium border-2 flex-1"
                        style={{
                          borderColor: 'var(--border)',
                          color: 'var(--foreground)',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <HugeiconsIcon icon={Github01Icon} className="h-4 w-4 mr-2" />
                        View Code
                      </motion.a>
                    )}
                  </div>
                </Modal.Footer>
              </motion.div>
            )}
          </AnimatePresence>
        </Modal>
      </div>
    </section>
  );
}
