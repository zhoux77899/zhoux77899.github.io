import { HugeiconsIcon } from '@hugeicons/react';
import { Github01Icon, Linkedin01Icon, TwitterIcon, Mail01Icon } from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';
import { personalInfo } from '@/lib/data';
import { motion } from 'framer-motion';

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
    <div className={`flex items-center gap-3 ${className}`}>
      {personalInfo.socialLinks.map((link, index) => {
        const Icon = iconMap[link.icon];
        return (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl w-11 h-11 transition-colors"
            style={{
              color: 'var(--foreground)',
              backgroundColor: 'var(--background)',
              border: '1px solid var(--border)',
            }}
            aria-label={link.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-foreground)',
              borderColor: 'var(--accent)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <HugeiconsIcon icon={Icon} className="h-5 w-5" />
          </motion.a>
        );
      })}
    </div>
  );
}
