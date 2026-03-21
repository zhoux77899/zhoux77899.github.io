import { Chip } from '@heroui/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Briefcase01Icon, Mortarboard01Icon } from '@hugeicons/core-free-icons';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/common/SectionHeader';
import { experienceItems } from '@/lib/data';

export function Experience() {
  return (
    <Section id="experience" showPattern={false}>
      <SectionHeader
        label="Journey"
        title="Experience"
        description="Years of software development, from startups to leading tech companies"
      />

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 hidden sm:block"
          style={{
            background: `linear-gradient(to bottom, var(--accent), var(--sage))`,
          }}
        />

        {/* Experience Items */}
        <div className="space-y-12">
          {experienceItems.map((item, index) => {
            const isEven = index % 2 === 0;
            const Icon = item.type === 'work' ? Briefcase01Icon : Mortarboard01Icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-50px' }}
                className={`relative flex flex-col sm:flex-row items-start gap-4 sm:gap-8 ${
                  isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 hidden sm:flex items-center justify-center z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      backgroundColor: 'var(--accent)',
                      boxShadow: '0 0 20px var(--accent-soft)',
                    }}
                  >
                    <HugeiconsIcon
                      icon={Icon}
                      className="w-5 h-5"
                      style={{ color: 'var(--accent-foreground)' }}
                    />
                  </motion.div>
                </div>

                {/* Content Card */}
                <div className={`sm:w-1/2 ${isEven ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 rounded-2xl"
                    style={{
                      backgroundColor: 'var(--background)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {/* Mobile Icon */}
                    <div className="flex sm:hidden items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--accent-soft)' }}
                      >
                        <HugeiconsIcon
                          icon={Icon}
                          className="w-5 h-5"
                          style={{ color: 'var(--accent)' }}
                        />
                      </div>
                      <Chip
                        size="sm"
                        style={{
                          backgroundColor: 'var(--sage-soft)',
                          color: 'var(--sage-soft-foreground)',
                        }}
                      >
                        {item.period}
                      </Chip>
                    </div>

                    {/* Desktop Period Badge */}
                    <div className={`hidden sm:flex mb-3 ${isEven ? 'justify-end' : 'justify-start'}`}>
                      <Chip
                        size="sm"
                        style={{
                          backgroundColor: 'var(--sage-soft)',
                          color: 'var(--sage-soft-foreground)',
                        }}
                      >
                        {item.period}
                      </Chip>
                    </div>

                    <h3
                      className="text-xl font-semibold font-display mb-1"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm font-medium mb-4"
                      style={{ color: 'var(--accent)' }}
                    >
                      {item.company}
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--muted)' }}
                    >
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden sm:block sm:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
