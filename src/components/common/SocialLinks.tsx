import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
];

export function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socialLinks.map((link) => {
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
            <Icon className="h-5 w-5" style={{ color: 'var(--foreground)' }} />
          </a>
        );
      })}
    </div>
  );
}
