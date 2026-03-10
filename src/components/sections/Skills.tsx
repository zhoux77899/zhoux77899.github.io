import { Tabs } from "@heroui/react";
import { skillCategories } from "@/lib/data";
import { SkillTag } from "@/components/common/SkillTag";
import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/common/AnimatedSection";

export function Skills() {
  return (
    <AnimatedSection id="skills" className="py-16 sm:py-24 bg-background">
      <Container>
        <h2 className="text-3xl font-bold text-foreground mb-12">技术栈</h2>
        <Tabs className="w-full">
          <Tabs.ListContainer>
            <Tabs.List aria-label="技能分类" className="bg-surface rounded-lg p-1">
              {skillCategories.map((cat) => (
                <Tabs.Tab key={cat.id} id={cat.id}>
                  {cat.label}
                  <Tabs.Indicator />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>
          {skillCategories.map((cat) => (
            <Tabs.Panel key={cat.id} id={cat.id} className="pt-8">
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill) => (
                  <SkillTag key={skill} name={skill} />
                ))}
              </div>
            </Tabs.Panel>
          ))}
        </Tabs>
      </Container>
    </AnimatedSection>
  );
}
