import { useState, useEffect } from 'react';
import { Button } from '@heroui/react';
import { Menu, X } from 'lucide-react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? 'var(--surface)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Button
              variant="ghost"
              className="text-xl font-bold p-0"
              style={{ color: 'var(--foreground)' }}
              onPress={() => handleNavClick('#hero')}
            >
              Portfolio
            </Button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="sm"
                  onPress={() => handleNavClick(link.href)}
                  className="font-medium"
                  style={{ color: 'var(--foreground)' }}
                >
                  {link.name}
                </Button>
              ))}
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onPress={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-full w-10 h-10 p-0 min-w-0"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" style={{ color: 'var(--foreground)' }} />
                ) : (
                  <Menu className="h-5 w-5" style={{ color: 'var(--foreground)' }} />
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
              <Button
                key={link.name}
                variant="ghost"
                size="lg"
                onPress={() => handleNavClick(link.href)}
                className="text-lg font-medium w-full"
                style={{ color: 'var(--foreground)' }}
              >
                {link.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
