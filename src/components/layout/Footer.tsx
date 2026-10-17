import { content, personalInfo } from '@/content';
import { navLinks } from '@/lib/navigation';
export function Footer() {
  return <footer className="site-footer"><div className="site-container"><div className="footer-top"><div><a href="#hero" className="footer-name gradient-text-primary">{personalInfo.name}</a><p>{personalInfo.footerBio}</p></div><nav aria-label={content.ui.navigation.footerLabel}>{navLinks.map(link=><a key={link.href} href={link.href}>{link.name}</a>)}</nav></div><div className="footer-bottom"><span>{content.ui.footer.copyright(new Date().getFullYear())}<span className="gradient-text-primary">{personalInfo.name}</span></span><span>{content.ui.footer.tagline}</span></div></div></footer>;
}
