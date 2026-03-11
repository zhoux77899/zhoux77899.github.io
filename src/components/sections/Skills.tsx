import { useState } from 'react';
import { Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/common/AnimatedSection';
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
        <AnimatedSection>
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            技术栈
          </h2>
          <p
            className="text-center mb-12 max-w-2xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            熟练掌握多种前端、后端技术，以及现代开发工具
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="px-4 py-2 rounded-lg font-medium transition-colors"
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

        <AnimatedSection delay={0.2}>
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {filteredSkills.map((skill) => (
              <Chip
                key={skill.name}
                size="lg"
                style={{
                  backgroundColor: 'var(--sage-soft)',
                  color: 'var(--sage-soft-foreground)',
                }}
              >
                {skill.name}
              </Chip>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
