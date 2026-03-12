import { Button, Avatar } from '@heroui/react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SocialLinks } from '@/components/common/SocialLinks';
import { personalInfo } from '@/lib/data';

export function Hero() {
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

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
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
          className="text-lg max-w-2xl mx-auto mb-8"
          style={{ color: 'var(--muted)' }}
        >
          {personalInfo.bio}
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <SocialLinks className="justify-center" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
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

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown
            className="w-8 h-8"
            style={{ color: 'var(--muted)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
