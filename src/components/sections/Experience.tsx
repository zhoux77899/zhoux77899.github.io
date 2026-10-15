import { SectionHeader } from '@/components/common/SectionHeader';
import { Section } from '@/components/layout/Section';
import { experienceItems } from '@/lib/data';
export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader titleId="experience-title" title="A bit of background" description="Optical engineering, life science research, database work, and now AI infrastructure. Each has shaped the questions I like working on." />
      <div className="background-list">{experienceItems.map(item=><article key={item.id} className="background-row" aria-labelledby={`experience-${item.id}`}><p className="background-period">{item.period}</p><div><h3 id={`experience-${item.id}`}>{item.title}</h3><p className="background-place">{item.company}</p><p className="background-description">{item.description}</p></div></article>)}</div>
    </Section>
  );
}
