import { SectionHeader } from '@/components/common/SectionHeader';
import { Section } from '@/components/layout/Section';
import { personalInfo } from '@/lib/data';
import { SocialBrandIcon } from '@/utils/brand-icons';
import '@/styles/stack.css';

const handles: Record<string, string> = {
  GitHub: 'zhoux77899',
  X: '@miyoshichi',
  ORCID: '0000-0003-3695-460X',
};

export function Contact() {
  return (
    <Section id="contact" className="contact-section">
      <SectionHeader titleId="contact-title" title="Keep in touch" description="You can find my code on GitHub, reach me on X, or follow my research identity on ORCID." />
      <div className="contact-links contact-links-revised">
        {personalInfo.socialLinks.map(link => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name === 'GitHub' ? 'Connect on GitHub' : link.name}
          >
            <span className="contact-brand-title">
              <SocialBrandIcon name={link.name} className="contact-brand-icon" />
              {link.name}
            </span>
            <span className="contact-handle">{handles[link.name]}</span>
          </a>
        ))}
      </div>
    </Section>
  );
}
