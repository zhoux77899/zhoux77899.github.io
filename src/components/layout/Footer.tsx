import { SocialLinks } from "@/components/common/SocialLinks";
import { githubUrl, personalInfo } from "@/lib/data";
import { navLinks } from "@/lib/navigation";
import { HeartIcon } from "@/utils/icons";

export function Footer() {
  return (
    <footer className="bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="mb-4 font-display text-2xl font-bold">
              <span className="gradient-text">{personalInfo.name}</span>
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-[var(--muted)]">{personalInfo.bio}</p>
            <SocialLinks />
          </div>

          <div className="flex flex-col justify-between">
            <nav aria-label="Footer navigation">
              <h4 className="mb-4 text-sm font-semibold tracking-wider text-[var(--foreground)] uppercase">Quick Links</h4>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="rounded-sm text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
                    {link.name}
                  </a>
                ))}
              </div>
            </nav>

            <div className="mt-6 md:mt-8">
              <h4 className="mb-4 text-sm font-semibold tracking-wider text-[var(--foreground)] uppercase">Contact</h4>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="rounded-sm text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">GitHub</a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-[var(--border)]" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-[var(--muted)]">&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <p className="flex items-center gap-1 text-sm text-[var(--muted)]">
            Made with <HeartIcon aria-hidden="true" className="mx-1 size-4 text-[var(--accent)]" /> care.
          </p>
        </div>
      </div>
    </footer>
  );
}