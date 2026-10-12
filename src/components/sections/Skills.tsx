import { useState } from "react";
import { Chip } from "@/components/base/badges/chip";
import { SegmentedControl, SegmentedControlItem } from "@/components/base/segmented-control/segmented-control";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Section } from "@/components/layout/Section";
import { getSkillCategoryLabel, skills } from "@/lib/data";
import type { SkillCategory } from "@/types";

const categories: readonly SkillCategory[] = ["other", "backend", "frontend", "tools"];
const stats = [
  { label: "Years Experience", value: "8+" },
  { label: "Projects Completed", value: "10+" },
  { label: "Technologies", value: skills.length.toString() },
  { label: "Open Source", value: "3+" },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("other");
  const filteredSkills = skills.filter((skill) => skill.category === activeCategory);

  return (
    <Section id="skills" decorativeElements>
      <SectionHeader titleId="skills-title" label="Expertise" title="Tech Stack" description="AI/ML, backend systems, frontend and modern development tools" />

      <AnimatedSection animation="fade-up" delay={0.1}>
        <div className="mb-16 overflow-x-auto pb-2">
          <SegmentedControl
            aria-label="Skill categories"
            variant="plain"
            selectedKeys={new Set([activeCategory])}
            onSelectionChange={(keys) => {
              const key = keys.values().next().value;
              if (categories.some((category) => category === key)) {
                setActiveCategory(key as SkillCategory);
              }
            }}
            className="mx-auto flex w-max min-w-max gap-3"
          >
            {categories.map((category) => (
              <SegmentedControlItem
                key={category}
                id={category}
                className={({ isSelected }) => `min-h-12 rounded-xl px-6 py-3 font-medium ${isSelected ? "bg-[var(--accent)] text-[var(--accent-foreground)]" : "text-[var(--foreground)]"}`}
              >
                {getSkillCategoryLabel(category)}
              </SegmentedControlItem>
            ))}
          </SegmentedControl>
        </div>
      </AnimatedSection>

      <AnimatedSection key={activeCategory} animation="fade-up" duration={0.4}>
        <ul aria-label={`${getSkillCategoryLabel(activeCategory)} skills`} className="flex flex-wrap justify-center gap-4">
          {filteredSkills.map((skill) => (
            <li key={skill.name}>
              <Chip color="lime" variant="subtle" className="rounded-xl bg-[var(--sage-soft)] px-5 py-2.5 text-base font-medium text-[var(--sage-soft-foreground)]">
                {skill.name}
              </Chip>
            </li>
          ))}
        </ul>
      </AnimatedSection>

      <AnimatedSection animation="fade-up" delay={0.3}>
        <dl className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col rounded-2xl bg-[var(--background)] p-6 text-center">
              <dt className="order-2 text-sm font-medium text-[var(--muted)]">{stat.label}</dt>
              <dd className="order-1 mb-2 font-display text-3xl font-bold text-[var(--accent)] md:text-4xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </AnimatedSection>
    </Section>
  );
}
