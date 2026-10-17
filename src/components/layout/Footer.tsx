import { personalInfo } from '@/lib/data';
import { navLinks } from '@/lib/navigation';
export function Footer() {
  return <footer className="site-footer"><div className="site-container"><div className="footer-top"><div><a href="#hero" className="footer-name gradient-text-primary">{personalInfo.name}</a><p>{personalInfo.footerBio}</p></div><nav aria-label="Footer navigation">{navLinks.map(link=><a key={link.href} href={link.href}>{link.name}</a>)}</nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} <span className="gradient-text-primary">{personalInfo.name}</span></span><span>A personal collection of work and interests.</span></div></div></footer>;
}
