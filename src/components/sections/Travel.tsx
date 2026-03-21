import { Card, Chip } from '@heroui/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Location01Icon } from '@hugeicons/core-free-icons';
import { motion } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/common/AnimatedSection';
import { travelItems, travelStats } from '@/lib/data';

export function Travel() {
  return (
    <section
      id="travel"
      className="py-32 relative overflow-hidden"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5 hidden lg:block"
        style={{ background: 'radial-gradient(circle, var(--sage) 0%, transparent 70%)', transform: 'translate(-50%, 50%)' }}
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
              Adventures
            </span>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: 'var(--foreground)' }}
            >
              Travel
            </h2>
            <p
              className="text-lg"
              style={{ color: 'var(--muted)' }}
            >
              {travelStats.countries} countries · {travelStats.cities} cities · {travelStats.moments} moments
            </p>
          </div>
        </AnimatedSection>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          staggerDelay={0.1}
          threshold={0.05}
        >
          {travelItems.map((item, index) => (
            <StaggerItem key={item.id} animation="fade-up">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Card
                  className="overflow-hidden group cursor-pointer h-full"
                  style={{ backgroundColor: 'var(--background)' }}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <motion.div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--sage-soft)' }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className="text-7xl">{item.flag}</span>
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
                  <div className="p-6">
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
                      className="text-sm mb-5 leading-relaxed"
                      style={{ color: 'var(--muted)' }}
                    >
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex gap-2">
                      <Chip
                        size="sm"
                        variant="outline"
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
      </div>
    </section>
  );
}
