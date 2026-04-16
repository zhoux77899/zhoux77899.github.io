import { Card, Chip } from '@heroui/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Location01Icon } from '@hugeicons/core-free-icons';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/common/SectionHeader';
import { StaggerContainer, StaggerItem } from '@/components/common/AnimatedSection';
import { travelItems, travelStats } from '@/lib/data';

export function Travel() {
  return (
    <Section id="travel">
      <SectionHeader
        label="Adventures"
        title="Travel"
        description={`${travelStats.countries} countries · ${travelStats.cities} cities · ${travelStats.moments} moments`}
      />

      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        staggerDelay={0.1}
        threshold={0.05}
      >
        {travelItems.map((item) => (
          <StaggerItem key={item.id} animation="fade-up">
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-full"
            >
              <Card
                className="overflow-hidden group cursor-pointer h-full flex flex-col"
                style={{ backgroundColor: 'var(--background)' }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-video rounded-xl">
                  <motion.div
                    className="w-full h-full flex items-center justify-center overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.location}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--sage-soft)' }}
                      >
                        <span className="text-7xl">{item.flag}</span>
                      </div>
                    )}
                  </motion.div>

                  {/* Year Badge */}
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--accent-foreground)',
                    }}
                  >
                    {item.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="p-1.5 rounded-lg"
                      style={{ backgroundColor: 'var(--accent-soft)' }}
                    >
                      <HugeiconsIcon
                        icon={Location01Icon}
                        className="h-4 w-4"
                        style={{ color: 'var(--accent)' }}
                      />
                    </div>
                    <h3
                      className="text-xl font-semibold font-display"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {item.location}
                    </h3>
                  </div>
                  <p
                    className="text-sm mb-5 leading-relaxed line-clamp-2"
                    style={{ color: 'var(--muted)' }}
                  >
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex gap-2 mt-auto">
                    <Chip
                      size="sm"
                      className="border"
                      style={{
                        borderColor: 'var(--sage)',
                        color: 'var(--sage)',
                        backgroundColor: 'transparent',
                      }}
                    >
                      {item.country}
                    </Chip>
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
