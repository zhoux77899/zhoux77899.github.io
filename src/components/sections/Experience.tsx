import { Card, Chip } from "@heroui/react";
import { experiences } from "@/lib/data";
import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/common/AnimatedSection";

export function Experience() {
  return (
    <AnimatedSection id="experience" className="py-16 sm:py-24 bg-surface">
      <Container className="max-w-4xl">
        <h2 className="text-3xl font-bold text-foreground mb-12">工作经历</h2>
        <div className="space-y-6">
          {experiences.map((exp) => (
            <Card
              key={exp.id}
              className="w-full bg-background border-l-4 border-l-[var(--accent)]"
            >
              <Card.Header>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <Card.Title className="text-foreground">
                      {exp.title}
                    </Card.Title>
                    <Card.Description className="text-muted">
                      {exp.company}
                    </Card.Description>
                  </div>
                  <Chip
                    size="sm"
                    className="bg-[var(--sage-soft)] text-[var(--sage-soft-foreground)] shrink-0"
                    variant="soft"
                  >
                    {exp.period}
                  </Chip>
                </div>
              </Card.Header>
              <Card.Content>
                <p className="text-muted">{exp.description}</p>
              </Card.Content>
            </Card>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
