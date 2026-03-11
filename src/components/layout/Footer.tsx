import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { Separator } from '@heroui/react';

const footerLinks = [
  { name: '首页', href: '#hero' },
  { name: '技能', href: '#skills' },
  { name: '项目', href: '#projects' },
  { name: '联系', href: '#contact' },
];

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
  { name: 'Twitter', url: 'https://twitter.com', icon: Twitter },
  { name: 'Email', url: 'mailto:zhangmingyuan@example.com', icon: Mail },
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
              热爱技术，专注于创造简洁优雅的数字体验。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm font-semibold mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              快速导航
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
              社交媒体
            </h4>
            <div className="flex gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
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
                    <Icon className="h-4 w-4" />
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
            &copy; {new Date().getFullYear()} 张明远. All rights reserved.
          </p>
          <p
            className="text-sm flex items-center gap-1"
            style={{ color: 'var(--muted)' }}
          >
            Made with <Heart className="h-4 w-4 text-red-500" /> using React & HeroUI
          </p>
        </div>
      </div>
    </footer>
  );
}
