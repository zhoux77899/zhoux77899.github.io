import { Chip } from "@/components/base/badges/chip";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Section } from "@/components/layout/Section";
import { experienceItems } from "@/lib/data";
import { BriefcaseIcon, EducationIcon } from "@/utils/icons";

export function Experience() {
  return (
    <Section id="experience" showPattern={false}>
      <SectionHeader titleId="experience-title" label="Journey" title="Experience" description="From optical engineering through life science research to AI infrastructure" />
      <div className="relative">
        <div aria-hidden="true" className="absolute top-0 bottom-0 left-1/2 hidden w-0.5 -translate-x-1/2 bg-linear-to-b from-[var(--accent)] to-[var(--sage)] md:block" />
        <div className="space-y-12">
          {experienceItems.map((item, index) => {
            const isEven = index % 2 === 0;
            const Icon = item.type === "work" ? BriefcaseIcon : EducationIcon;
            return (
              <AnimatedSection key={item.id} animation={isEven ? "slide-right" : "slide-left"} delay={index * 0.1}>
                <div className="relative md:grid md:grid-cols-[1fr_3rem_1fr] md:gap-8">
                  <div aria-hidden="true" className="absolute left-1/2 z-10 hidden size-12 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] shadow-lg md:flex">
                    <Icon className="size-5" />
                  </div>
                  <article aria-labelledby={`experience-${item.id}`} className={`rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 ${isEven ? "md:col-start-1 md:text-right" : "md:col-start-3"}`}>
                    <div className={`mb-3 flex items-center gap-3 ${isEven ? "md:justify-end" : ""}`}>
                      <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)] md:hidden">
                        <Icon className="size-5" />
                      </span>
                      <Chip variant="caption" color="lime" className="bg-[var(--sage-soft)] text-[var(--sage-soft-foreground)]">{item.period}</Chip>
                    </div>
                    <h3 id={`experience-${item.id}`} className="mb-1 font-display text-xl font-semibold text-[var(--foreground)]">{item.title}</h3>
                    <p className="mb-4 text-sm font-medium text-[var(--accent)]">{item.company}</p>
                    <p className="text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>
                  </article>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
