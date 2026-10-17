import { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from '@/components/base/tabs/tabs';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Section } from '@/components/layout/Section';
import { getSkillCategoryLabel, skills, projects } from '@/lib/data';
import type { SkillCategory } from '@/types';
import { GitHubBrandIcon, TechnologyIcon } from '@/utils/brand-icons';
import '@/styles/stack.css';
import { AnimatedSection } from '@/components/common/AnimatedSection';

const categories: readonly SkillCategory[] = ['ai', 'science', 'systems', 'web', 'tools'];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('ai');
  return (
    <Section id="skills" className="stack-section">
      <SectionHeader titleId="skills-title" title="Tools I work with" description="From inference and agent tools to scientific computing, embedded devices, and the web." />
      <AnimatedSection animation="fade-in"><Tabs
        selectedKey={activeCategory}
        onSelectionChange={key => {
          if (categories.some(category => category === key)) setActiveCategory(key as SkillCategory);
        }}
        className="stack-tabs"
      >
        <div className="stack-tab-scroll">
          <TabList aria-label="Skill categories" className="stack-tab-list">
            {categories.map(category => (
              <Tab key={category} id={category} className="stack-tab">
                {getSkillCategoryLabel(category)}
              </Tab>
            ))}
          </TabList>
        </div>
        {categories.map(category => (
          <TabPanel key={category} id={category} className="stack-tab-panel">
            <ul aria-label={`${getSkillCategoryLabel(category)} skills`} className="stack-skill-list">
              {skills.filter(skill => skill.category === category).map(skill => (
                <li key={skill.name}>
                  <h3 className="stack-skill-name">
                    <TechnologyIcon name={skill.name} className="stack-technology-icon" />
                    {skill.name}
                  </h3>
                  <div className="stack-skill-projects">
                    {skill.projects.map(id => {
                      const project = projects.find(item => item.id === id);
                      return project ? (
                        <a key={id} href={`#project-${id}`}>
                          <GitHubBrandIcon className="stack-project-icon" />
                          {project.title}
                        </a>
                      ) : null;
                    })}
                    {skill.source ? (
                      <a href={skill.source.url}>
                        <GitHubBrandIcon className="stack-project-icon" />
                        {skill.source.name}
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </TabPanel>
        ))}
      </Tabs></AnimatedSection>
    </Section>
  );
}
