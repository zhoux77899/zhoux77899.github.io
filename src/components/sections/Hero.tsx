import { Button, Avatar } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon, SparklesIcon } from '@hugeicons/core-free-icons';
import { SocialLinks } from '@/components/common/SocialLinks';
import { personalInfo } from '@/lib/data';
import { useTheme } from '@/providers/ThemeProvider';
import { useRef } from 'react';

export function Hero() {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroImage = resolvedTheme === 'dark'
    ? '/assets/images/hero/transformer_dark.png'
    : '/assets/images/hero/transformer_light.png';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--border) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Content Area */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20 min-h-screen flex items-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
          {/* Left Side: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left order-2 lg:order-1 flex flex-col justify-center pt-[40vh] sm:pt-[45vh] lg:pt-0"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6 flex justify-center lg:justify-start">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: 'var(--accent-soft)',
                  color: 'var(--accent)',
                }}
              >
                <HugeiconsIcon icon={SparklesIcon} className="w-4 h-4" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Avatar */}
            <motion.div
              variants={itemVariants}
              className="mb-6 flex justify-center lg:justify-start"
            >
              <div
                className="w-20 h-20 rounded-full p-1"
                style={{ backgroundColor: 'var(--accent-soft)' }}
              >
                <Avatar className="w-[72px] h-[72px]">
                  <Avatar.Image
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="w-[72px] h-[72px]"
                  />
                  <Avatar.Fallback
                    className="text-3xl font-bold w-[72px] h-[72px]"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--accent-foreground)',
                    }}
                  >
                    {personalInfo.name.slice(0, 1)}
                  </Avatar.Fallback>
                </Avatar>
              </div>
            </motion.div>

            {/* Name - Large Display */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight leading-[1.1]"
              style={{ color: 'var(--foreground)' }}
            >
              Hi, I'm
              <br />
              <span className="gradient-text">{personalInfo.name}</span>
            </motion.h1>

            {/* Title */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl font-medium mb-6"
              style={{ color: 'var(--accent)' }}
            >
              {personalInfo.title}
            </motion.p>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              style={{ color: 'var(--muted)' }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="mb-10 flex justify-center lg:justify-start"
            >
              <SocialLinks />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onPress={handleScrollToProjects}
                className="font-semibold px-8 py-6 text-lg hover-lift"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--accent-foreground)',
                }}
              >
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                onPress={handleScrollToContact}
                className="font-semibold px-8 py-6 text-lg hover-lift"
                style={{
                  borderColor: 'var(--border)',
                  borderWidth: '2px',
                  color: 'var(--foreground)',
                }}
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side: Placeholder for desktop layout */}
          <div className="order-1 lg:order-2 hidden lg:block" />
        </div>
      </motion.div>

      {/* Desktop Image - Full right half with parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ y: backgroundY }}
        className="hidden lg:block absolute top-0 right-0 w-1/2 h-full"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Gradient overlay for better text contrast */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, var(--surface) 0%, transparent 30%)`,
          }}
        />
      </motion.div>

      {/* Mobile Image - Full width top */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="lg:hidden absolute top-16 left-0 w-full h-[40vh] sm:h-[45vh]"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Bottom gradient for mobile */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 60%, var(--surface) 100%)`,
          }}
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
            Scroll to explore
          </span>
          <div
            className="p-2 rounded-full"
            style={{ backgroundColor: 'var(--accent-soft)' }}
          >
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              className="w-5 h-5"
              style={{ color: 'var(--accent)' }}
            />
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
