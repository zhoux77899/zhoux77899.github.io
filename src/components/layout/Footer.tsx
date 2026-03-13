import { HugeiconsIcon } from '@hugeicons/react';
import { Github01Icon, Linkedin01Icon, TwitterIcon, Mail01Icon, FavouriteIcon } from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';
import { Separator } from '@heroui/react';

const footerLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: Github01Icon },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin01Icon },
  { name: 'Twitter', url: 'https://twitter.com', icon: TwitterIcon },
  { name: 'Email', url: 'mailto:zhangmingyuan@example.com', icon: Mail01Icon },
];

export function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              Portfolio
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Passionate about technology, focused on creating clean and elegant digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm font-semibold mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm hover:underline"
                    style={{ color: 'var(--muted)' }}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4
              className="text-sm font-semibold mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              Social
            </h4>
            <div className="flex gap-2">
              {socialLinks.map((link) => {
                const Icon: IconSvgElement = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full w-10 h-10 transition-colors hover:bg-[var(--background)]"
                    style={{ color: 'var(--muted)' }}
                    aria-label={link.name}
                  >
                    <HugeiconsIcon icon={Icon} className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <Separator className="my-8" style={{ backgroundColor: 'var(--border)' }} />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            &copy; {new Date().getFullYear()} Mingyuan Zhang. All rights reserved.
          </p>
          <p
            className="text-sm flex items-center gap-1"
            style={{ color: 'var(--muted)' }}
          >
            Made with <HugeiconsIcon icon={FavouriteIcon} className="h-4 w-4" style={{ color: '#ef4444' }} /> using React & HeroUI
          </p>
        </div>
      </div>
    </footer>
  );
}
