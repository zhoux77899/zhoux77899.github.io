import { HugeiconsIcon } from '@hugeicons/react';
import { Github01Icon, Linkedin01Icon, TwitterIcon, Mail01Icon } from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';
import { personalInfo } from '@/lib/data';

interface SocialLinksProps {
  className?: string;
}

const iconMap: Record<string, IconSvgElement> = {
  github: Github01Icon,
  linkedin: Linkedin01Icon,
  twitter: TwitterIcon,
  email: Mail01Icon,
};

export function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {personalInfo.socialLinks.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full w-10 h-10 transition-colors hover:bg-[var(--surface)]"
            style={{ color: 'var(--foreground)' }}
            aria-label={link.name}
          >
            <HugeiconsIcon icon={Icon} className="h-5 w-5" style={{ color: 'var(--foreground)' }} />
          </a>
        );
      })}
    </div>
  );
}
