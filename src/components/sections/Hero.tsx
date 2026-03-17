import { Button, Avatar } from '@heroui/react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { SocialLinks } from '@/components/common/SocialLinks';
import { personalInfo } from '@/lib/data';
import { useTheme } from '@/providers/ThemeProvider';

export function Hero() {
  const { theme } = useTheme();

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

  const heroImage = theme === 'dark'
    ? '/assets/images/hero/transformer_dark.png'
    : '/assets/images/hero/transformer_light.png';

  return (
    <section
      id="hero"
      className="min-h-screen relative pt-16"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      {/* Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20 min-h-[calc(100vh-4rem)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
          {/* Left Side: Content */}
          <div className="text-center lg:text-left order-2 lg:order-1 flex flex-col justify-center pt-[35vh] lg:pt-0">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex justify-center lg:justify-start"
            >
              <Avatar size="lg">
                <Avatar.Image
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                />
                <Avatar.Fallback
                  className="text-2xl font-bold"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--accent-foreground)',
                  }}
                >
                  {personalInfo.name.slice(0, 1)}
                </Avatar.Fallback>
              </Avatar>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              Hi, I'm {personalInfo.name}
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl mb-6"
              style={{ color: 'var(--accent)' }}
            >
              {personalInfo.title}
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg mb-8 max-w-xl mx-auto lg:mx-0"
              style={{ color: 'var(--muted)' }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8 flex justify-center lg:justify-start"
            >
              <SocialLinks />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onPress={handleScrollToProjects}
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--accent-foreground)',
                }}
              >
                View Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                onPress={handleScrollToContact}
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                }}
              >
                Contact Me
              </Button>
            </motion.div>
          </div>

          {/* Right Side: Placeholder for desktop layout */}
          <div className="order-1 lg:order-2 hidden lg:block" />
        </div>
      </div>

      {/* Desktop Image - Full right half */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="hidden lg:block absolute top-16 right-0 w-1/2 h-[calc(100%-4rem)]"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Mobile Image - Full width top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="lg:hidden absolute top-16 left-0 w-full h-[35vh]"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            className="w-8 h-8"
            style={{ color: 'var(--muted)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
