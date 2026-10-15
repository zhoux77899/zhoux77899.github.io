import { ButtonLink } from '@/components/base/buttons/button';
import { AnatomyExplorer } from '@/components/common/AnatomyExplorer';
import { PhotoAvatar } from '@/components/common/PhotoAvatar';
import { SocialLinks } from '@/components/common/SocialLinks';
import { useExplorer } from '@/hooks/useExplorer';
import { personalInfo } from '@/lib/data';
export function Hero() {
  const { activeDestination } = useExplorer();
  return (
    <section id="hero" aria-labelledby="hero-title" className="hero-section scroll-mt-20">
      <div className="site-container hero-layout">
        <div className="hero-intro">
          <div className="hero-identity"><PhotoAvatar src={personalInfo.avatar} name={personalInfo.name} /><h1 id="hero-title">{personalInfo.name}</h1></div>
          <p className="hero-role">{personalInfo.title}</p>
        </div>
        <div className="hero-drawing" data-explorer-main>
          <AnatomyExplorer activeDestination={activeDestination} compactFrame />
        </div>
        <div className="hero-copy">
          <p className="hero-bio">{personalInfo.bio}</p>
          <div className="hero-actions">
            <ButtonLink href="#projects" variant="primary">Explore projects</ButtonLink>
            <ButtonLink href="#contact" variant="primary">Get in touch</ButtonLink>
          </div>
          <SocialLinks className="hero-socials" />
        </div>
      </div>
    </section>
  );
}
