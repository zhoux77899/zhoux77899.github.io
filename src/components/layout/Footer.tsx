import { HugeiconsIcon } from '@hugeicons/react';
import { Github01Icon, Linkedin01Icon, TwitterIcon, Mail01Icon, FavouriteIcon, ArrowUp01Icon } from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';
import { Separator } from '@heroui/react';
import { personalInfo } from '@/lib/data';
import { motion } from 'framer-motion';

const footerLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative" style={{ backgroundColor: 'var(--surface)' }}>
      {/* Back to Top Button */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <motion.button
          onClick={scrollToTop}
          className="p-3 rounded-full shadow-lg"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--accent-foreground)',
          }}
          whileHover={{ y: -4, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <HugeiconsIcon icon={ArrowUp01Icon} className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
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

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: 'var(--foreground)' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--muted)' }}
                    whileHover={{ x: 4, color: 'var(--accent)' }}
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: 'var(--foreground)' }}
            >
              Contact
            </h4>
            <div className="space-y-3">
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-sm block transition-colors hover:text-[var(--accent)]"
                  style={{ color: 'var(--muted)' }}
                >
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.location && (
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  {personalInfo.location}
                </p>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-8" style={{ backgroundColor: 'var(--border)' }} />

        {/* Copyright */}
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
