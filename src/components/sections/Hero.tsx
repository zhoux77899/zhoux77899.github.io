import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { ButtonLink } from '@/components/base/buttons/button';
import { AnatomyExplorer } from '@/components/common/AnatomyExplorer';
import { PhotoAvatar } from '@/components/common/PhotoAvatar';
import { SocialLinks } from '@/components/common/SocialLinks';
import { useExplorer } from '@/hooks/useExplorer';
import { content, personalInfo } from '@/content';
export function Hero() {
  const { activeDestination } = useExplorer();
  const ref = useRef<HTMLElement>(null);
  const reduced = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const drawingY = useTransform(scrollYProgress, [0, 1], [0, 24]);
  return (
    <section ref={ref} id="hero" aria-labelledby="hero-title" className="hero-section">
      <div className="site-container hero-layout">
        <AnimatedSection className="hero-intro" rootMargin="0px">
          <p className="hero-greeting">{content.sections.hero.greeting}</p>
          <div className="hero-identity"><PhotoAvatar src={personalInfo.avatar} name={personalInfo.name} /><h1 id="hero-title" className="gradient-text-primary">{personalInfo.name}</h1></div>
          <p className="hero-role">{personalInfo.title}</p>
        </AnimatedSection>
        <AnimatedSection className="hero-drawing" delay={0.06} rootMargin="0px">
          <motion.div data-explorer-main style={reduced ? undefined : { y: drawingY }}>
            <AnatomyExplorer activeDestination={activeDestination} compactFrame />
          </motion.div>
        </AnimatedSection>
        <AnimatedSection className="hero-copy" delay={0.12} rootMargin="0px">
          <p className="hero-bio">{personalInfo.bio}</p>
          <div className="hero-actions">
            <ButtonLink href="#projects" variant="primary">{content.sections.hero.projectsAction}</ButtonLink>
            <ButtonLink href="#contact" variant="secondary">{content.sections.hero.contactAction}</ButtonLink>
          </div>
          <SocialLinks className="hero-socials" />
        </AnimatedSection>
      </div>
    </section>
  );
}
