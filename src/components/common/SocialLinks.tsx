import { personalInfo } from '@/lib/data';
import { SocialBrandIcon } from '@/utils/brand-icons';

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={`social-links ${className}`}>
      {personalInfo.socialLinks.map(link => (
        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer">
          <SocialBrandIcon name={link.name} className="size-4" />
          {link.name}
        </a>
      ))}
    </div>
  );
}
