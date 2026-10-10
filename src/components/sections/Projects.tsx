import { Card, Chip } from '@heroui/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { LinkSquare01Icon, Github01Icon } from '@hugeicons/core-free-icons';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/common/SectionHeader';
import { StaggerContainer, StaggerItem } from '@/components/common/AnimatedSection';
import { projects } from '@/lib/data';

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeader
        label="Portfolio"
        title="Featured Projects"
        description="Selected recent work showcasing technical skills and innovation"
      />

      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        staggerDelay={0.1}
        threshold={0.05}
      >
        {projects.map((project) => (
          <StaggerItem key={project.id} animation="scale-up">
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="cursor-pointer h-full"
            >
              <Card
                className="overflow-hidden h-full group relative flex flex-col"
                style={{ backgroundColor: 'var(--background)' }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden aspect-video rounded-xl">
                  <motion.div
                    className="w-full h-full flex items-center justify-center overflow-hidden group-hover:scale-105"
                    transition={{ duration: 0.4 }}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--sage-soft)' }}
                      >
                        <span
                          className="text-5xl font-bold font-display"
                          style={{ color: 'var(--sage)' }}
                        >
                          {project.title.slice(0, 1)}
                        </span>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
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
                  <div className="flex gap-4 pt-4 border-t mt-auto" style={{ borderColor: 'var(--border)' }}>
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
                        {project.demoLabel || 'Live Demo'}
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
    </Section>
  );
}
