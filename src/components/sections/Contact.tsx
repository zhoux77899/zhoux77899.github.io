import { ButtonLink } from "@/components/base/buttons/button";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Section } from "@/components/layout/Section";
import { githubUrl } from "@/lib/data";
import { GitHubIcon } from "@/utils/icons";

export function Contact() {
  return (
    <Section id="contact" showPattern={false}>
      <SectionHeader titleId="contact-title" label="Get in Touch" title="Contact Me" description="Open to tech discussions, collaboration or just saying hello!" />
      <AnimatedSection animation="fade-up" delay={0.1}>
        <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 text-center md:p-8">
          <p className="mb-6 text-lg leading-relaxed text-[var(--muted)]">Find my projects and get in touch on GitHub.</p>
          <ButtonLink href={githubUrl} target="_blank" rel="noopener noreferrer" leadingIcon={GitHubIcon} variant="primary" className="h-auto min-h-12 rounded-xl px-6 py-3 text-base font-semibold">
            Connect on GitHub
          </ButtonLink>
        </div>
      </AnimatedSection>
    </Section>
  );
}
