import { SectionHeader } from '@/components/common/SectionHeader';
import { Section } from '@/components/layout/Section';
import { content, personalInfo } from '@/content';
import { SocialBrandIcon } from '@/utils/brand-icons';
import '@/styles/stack.css';
import { AnimatedSection } from '@/components/common/AnimatedSection';

export function Contact() {
  return (
    <Section id="contact" className="contact-section">
      <SectionHeader titleId="contact-title" title={content.sections.contact.title} description={content.sections.contact.description} />
      <AnimatedSection className="contact-links contact-links-revised" animation="fade-in">
        {personalInfo.socialLinks.map(link => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.contactLabel}
          >
            <span className="contact-brand-title">
              <SocialBrandIcon id={link.id} className="contact-brand-icon" />
              {link.name}
            </span>
            <span className="contact-handle">{link.handle}</span>
          </a>
        ))}
      </AnimatedSection>
    </Section>
  );
}
