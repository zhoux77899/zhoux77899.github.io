import { useEffect, useId, useRef, useState } from 'react';
import { Dialog } from 'react-aria-components/Dialog';
import { Modal, ModalOverlay } from 'react-aria-components/Modal';
import { IconButton } from '@/components/base/buttons/icon-button';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { navLinks } from '@/lib/navigation';
import { CloseIcon, MenuIcon } from '@/utils/icons';

const ACTIVE_SECTION_OFFSET = 112;

function initialActiveSection() {
  const initialLink = navLinks.find((link) => link.href === window.location.hash);
  return initialLink?.href.slice(1) ?? 'hero';
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(initialActiveSection);
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 20);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const menuTitleId = useId();

  useEffect(() => {
    let frame: number | undefined;

    const updateNavigation = () => {
      frame = undefined;
      setIsScrolled(window.scrollY > 20);

      let currentSection = 'hero';
      for (const link of navLinks) {
        const element = document.getElementById(link.href.slice(1));
        if (element && element.getBoundingClientRect().top <= ACTIVE_SECTION_OFFSET) {
          currentSection = element.id;
        }
      }

      setActiveSection(currentSection);
    };

    const handleScroll = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(updateNavigation);
    };

    updateNavigation();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMobileMenuOpen(false);
    };

    desktopQuery.addEventListener('change', handleChange);
    return () => desktopQuery.removeEventListener('change', handleChange);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveSection(href.slice(1));
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
          isScrolled
            ? 'border-line bg-background/90 shadow-sm backdrop-blur-xl'
            : 'border-transparent bg-background/75 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a
            href="#hero"
            onClick={() => handleNavClick('#hero')}
            className="font-display text-2xl font-bold text-foreground"
          >
            <span className="gradient-text">Portfolio</span>
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === link.href.slice(1)
                    ? 'bg-accent-soft text-accent'
                    : 'text-foreground hover:bg-surface'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <IconButton
              ref={triggerRef}
              icon={MenuIcon}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls={menuId}
              aria-haspopup="dialog"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden"
            />
          </div>
        </div>
      </header>

      <ModalOverlay
        isOpen={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
        isDismissable
        className="fixed inset-0 z-[100] flex items-start justify-end overflow-y-auto bg-black/45 p-4 pt-6 backdrop-blur-sm"
      >
        <Modal className="max-h-[calc(100dvh-2.5rem)] w-full max-w-sm overflow-y-auto rounded-2xl border border-line bg-background p-6 shadow-xl">
          <Dialog id={menuId} aria-labelledby={menuTitleId} className="outline-none">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 id={menuTitleId} className="font-display text-xl font-semibold text-foreground">
                Navigation
              </h2>
              <IconButton
                icon={CloseIcon}
                aria-label="Close menu"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>

            <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'bg-accent-soft text-accent'
                      : 'text-foreground hover:bg-surface'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  );
}
