import { Card, Chip } from '@heroui/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Location01Icon } from '@hugeicons/core-free-icons';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { travelItems, travelStats } from '@/lib/data';

export function Travel() {
  return (
    <section
      id="travel"
      className="py-24"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Travel
          </h2>
          <p
            className="text-center mb-4"
            style={{ color: 'var(--muted)' }}
          >
            {travelStats.countries} countries · {travelStats.cities} cities · {travelStats.moments} moments
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {travelItems.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.1}>
              <Card
                className="overflow-hidden group cursor-pointer"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <div
                    className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: 'var(--sage-soft)' }}
                  >
                    <span className="text-6xl">{item.flag}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <HugeiconsIcon
                      icon={Location01Icon}
                      className="h-4 w-4"
                      style={{ color: 'var(--accent)' }}
                    />
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {item.location}
                    </h3>
                  </div>
                  <p
                    className="text-sm mb-4"
                    style={{ color: 'var(--muted)' }}
                  >
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex gap-2">
                    <Chip
                      size="sm"
                      style={{
                        backgroundColor: 'var(--sage-soft)',
                        color: 'var(--sage-soft-foreground)',
                      }}
                    >
                      {item.country}
                    </Chip>
                    <Chip
                      size="sm"
                      style={{
                        backgroundColor: 'var(--sage-soft)',
                        color: 'var(--sage-soft-foreground)',
                      }}
                    >
                      {item.year}
                    </Chip>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
