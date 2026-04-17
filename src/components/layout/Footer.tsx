import { HugeiconsIcon } from '@hugeicons/react';
import { Github01Icon, Linkedin01Icon, TwitterIcon, Mail01Icon, FavouriteIcon } from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';
import { Separator } from '@heroui/react';
import { personalInfo } from '@/lib/data';
import { motion } from 'framer-motion';

const footerLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Travel', href: '#travel' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const iconMap: Record<string, IconSvgElement> = {
  github: Github01Icon,
  linkedin: Linkedin01Icon,
  twitter: TwitterIcon,
  email: Mail01Icon,
};

export function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h3
              className="font-display text-2xl font-bold mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              <span className="gradient-text">{personalInfo.name}</span>
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              {personalInfo.bio}
            </p>
            <div className="flex gap-3">
              {personalInfo.socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg w-10 h-10 transition-colors"
                    style={{
                      color: 'var(--muted)',
                      backgroundColor: 'var(--background)',
                    }}
                    aria-label={link.name}
                    whileHover={{
                      scale: 1.1,
                      color: 'var(--accent)',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <HugeiconsIcon icon={Icon} className="h-4 w-4" />
                  </motion.a>
                );
              })}
              {personalInfo.email ? (
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center justify-center rounded-lg w-10 h-10 transition-colors"
                  style={{
                    color: 'var(--muted)',
                    backgroundColor: 'var(--background)',
                  }}
                  aria-label="Email"
                  whileHover={{
                    scale: 1.1,
                    color: 'var(--accent)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HugeiconsIcon icon={Mail01Icon} className="h-4 w-4" />
                </motion.a>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h4
                className="text-sm font-semibold mb-4 uppercase tracking-wider"
                style={{ color: 'var(--foreground)' }}
              >
                Quick Links
              </h4>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {footerLinks.map((link) => (
                  <motion.button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--muted)' }}
                    whileHover={{ color: 'var(--accent)' }}
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mt-6 md:mt-8">
              <h4
                className="text-sm font-semibold mb-4 uppercase tracking-wider"
                style={{ color: 'var(--foreground)' }}
              >
                Contact
              </h4>
              <div className="space-y-2">
                {personalInfo.email ? (
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm block transition-colors hover:text-[var(--accent)]"
                    style={{ color: 'var(--muted)' }}
                  >
                    {personalInfo.email}
                  </a>
                ) : (
                  <a
                    href={personalInfo.socialLinks.find((l) => l.icon === 'github')?.url ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm block transition-colors hover:text-[var(--accent)]"
                    style={{ color: 'var(--muted)' }}
                  >
                    GitHub
                  </a>
                )}
                {personalInfo.location ? (
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    {personalInfo.location}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" style={{ backgroundColor: 'var(--border)' }} />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <motion.p
            className="text-sm flex items-center gap-1"
            style={{ color: 'var(--muted)' }}
            whileHover={{ scale: 1.05 }}
          >
            Made with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <HugeiconsIcon icon={FavouriteIcon} className="h-4 w-4 mx-1" style={{ color: 'var(--accent)' }} />
            </motion.span>
            using React & HeroUI
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
