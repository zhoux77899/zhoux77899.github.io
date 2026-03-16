import { useState } from 'react';
import { Button } from '@heroui/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Menu01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { ThemeToggle } from '@/components/common/ThemeToggle';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Travel', href: '#travel' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: 'var(--navbar-glass)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--navbar-glass-border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 relative">
            {/* Logo */}
            <a
              className="text-xl font-bold cursor-pointer hover:opacity-70 transition-opacity absolute left-0"
              style={{ color: 'var(--foreground)' }}
              onClick={() => handleNavClick('#hero')}
            >
              Portfolio
            </a>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center gap-6 mx-auto">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium cursor-pointer hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--foreground)' }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Side - Theme Toggle */}
            <div className="hidden md:block absolute right-0">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden absolute right-0">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onPress={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-full w-10 h-10 p-0 min-w-0"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <HugeiconsIcon icon={Cancel01Icon} className="h-5 w-5" style={{ color: 'var(--foreground)' }} />
                ) : (
                  <HugeiconsIcon icon={Menu01Icon} className="h-5 w-5" style={{ color: 'var(--foreground)' }} />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{
            backgroundColor: 'var(--background)',
            paddingTop: '4rem',
          }}
        >
          <div className="flex flex-col items-center gap-4 p-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-lg font-medium cursor-pointer hover:opacity-70 transition-opacity"
                style={{ color: 'var(--foreground)' }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
