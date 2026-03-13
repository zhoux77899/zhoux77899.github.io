import { Card, Chip } from '@heroui/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Briefcase01Icon, Mortarboard01Icon } from '@hugeicons/core-free-icons';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { experienceItems } from '@/lib/data';

export function Experience() {
  return (
    <section
      id="experience"
      className="py-24"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Experience
          </h2>
          <p
            className="text-center mb-12 max-w-2xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            Years of software development, from startups to leading tech companies
          </p>
        </AnimatedSection>

        <div className="space-y-6">
          {experienceItems.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.1}>
              <Card
                className="overflow-hidden"
                style={{
                  backgroundColor: 'var(--background)',
                  borderLeftWidth: '4px',
                  borderLeftColor: 'var(--accent)',
                }}
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: 'var(--accent-soft)' }}
                      >
                        {item.type === 'work' ? (
                          <HugeiconsIcon
                            icon={Briefcase01Icon}
                            className="h-5 w-5"
                            style={{ color: 'var(--accent)' }}
                          />
                        ) : (
                          <HugeiconsIcon
                            icon={Mortarboard01Icon}
                            className="h-5 w-5"
                            style={{ color: 'var(--accent)' }}
                          />
                        )}
                      </div>
                      <div>
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: 'var(--muted)' }}
                        >
                          {item.company}
                        </p>
                      </div>
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
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {item.description}
                  </p>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
