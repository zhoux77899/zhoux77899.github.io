import { useState } from 'react';
import { Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/common/AnimatedSection';
import { skills, getSkillCategoryLabel } from '@/lib/data';

const categories = ['frontend', 'backend', 'tools'] as const;

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('frontend');

  const filteredSkills = skills.filter(
    (skill) => skill.category === activeCategory
  );

  return (
    <section
      id="skills"
      className="py-24"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Tech Stack
          </h2>
          <p
            className="text-center mb-12 max-w-2xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            Proficient in frontend, backend and modern development tools
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={0.1}>
          <div className="flex justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                style={{
                  backgroundColor: activeCategory === category ? 'var(--accent)' : 'var(--surface)',
                  color: activeCategory === category ? 'var(--accent-foreground)' : 'var(--foreground)',
                }}
              >
                {getSkillCategoryLabel(category)}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <StaggerContainer
            className="flex flex-wrap justify-center gap-3"
            staggerDelay={0.05}
          >
            {filteredSkills.map((skill) => (
              <StaggerItem key={skill.name} animation="scale-up">
                <Chip
                  size="lg"
                  style={{
                    backgroundColor: 'var(--sage-soft)',
                    color: 'var(--sage-soft-foreground)',
                  }}
                >
                  {skill.name}
                </Chip>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </motion.div>
      </div>
    </section>
  );
}
