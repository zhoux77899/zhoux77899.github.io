import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/common/SectionHeader';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { skills, getSkillCategoryLabel } from '@/lib/data';

const categories = ['frontend', 'backend', 'tools'] as const;

interface SkillChipProps {
  name: string;
  index: number;
}

function SkillChip({ name, index }: SkillChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.03,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        scale: 1.08,
        rotateY: 5,
        rotateX: -5,
        z: 20,
      }}
      whileTap={{ scale: 0.95 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <motion.span
        className="inline-flex items-center px-5 py-2.5 rounded-xl text-base font-medium cursor-default"
        style={{
          backgroundColor: 'var(--sage-soft)',
          color: 'var(--sage-soft-foreground)',
          border: '1px solid transparent',
        }}
        whileHover={{
          borderColor: 'var(--sage)',
          boxShadow: '0 8px 30px -10px var(--sage-soft)',
        }}
        transition={{ duration: 0.2 }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('frontend');

  const filteredSkills = skills.filter(
    (skill) => skill.category === activeCategory
  );

  return (
    <Section id="skills" decorativeElements>
      <SectionHeader
        label="Expertise"
        title="Tech Stack"
        description="Proficient in frontend, backend and modern development tools"
      />

      <AnimatedSection animation="fade-up" delay={0.1}>
        <div className="flex justify-center gap-3 mb-16">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="relative px-6 py-3 rounded-xl font-medium cursor-pointer capitalize"
                style={{
                  color: isActive ? 'var(--accent-foreground)' : 'var(--foreground)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-xl"
                    style={{ backgroundColor: 'var(--accent)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {getSkillCategoryLabel(category)}
                </span>
              </motion.button>
            );
          })}
        </div>
      </AnimatedSection>

      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-wrap justify-center gap-4"
        style={{ perspective: '1000px' }}
      >
        {filteredSkills.map((skill, index) => (
          <SkillChip key={skill.name} name={skill.name} index={index} />
        ))}
      </motion.div>

      {/* Stats Section */}
      <AnimatedSection animation="fade-up" delay={0.3}>
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Years Experience', value: '5+' },
            { label: 'Projects Completed', value: '20+' },
            { label: 'Technologies', value: skills.length.toString() },
            { label: 'Open Source', value: '10+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl"
              style={{ backgroundColor: 'var(--background)' }}
            >
              <div
                className="font-display text-3xl md:text-4xl font-bold mb-2"
                style={{ color: 'var(--accent)' }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm font-medium"
                style={{ color: 'var(--muted)' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </Section>
  );
}
