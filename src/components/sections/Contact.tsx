import { useState } from 'react';
import { Button } from '@heroui/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Mail01Icon, Location01Icon, SentIcon, CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/common/SectionHeader';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/common/AnimatedSection';
import { FormField } from '@/components/common/FormField';
import { SocialLinks } from '@/components/common/SocialLinks';
import { personalInfo } from '@/lib/data';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <Section id="contact" showPattern={false}>
      <SectionHeader
        label="Get in Touch"
        title="Contact Me"
        description="Open to tech discussions, collaboration or just saying hello!"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
        {/* Contact Info */}
        <AnimatedSection animation="slide-right" delay={0.1}>
          <div>
            <h3
              className="font-display text-2xl font-semibold mb-8"
              style={{ color: 'var(--foreground)' }}
            >
              Let&apos;s Connect
            </h3>

            <StaggerContainer className="space-y-6 mb-10" staggerDelay={0.1}>
              {personalInfo.email ? (
                <StaggerItem animation="fade-up">
                  <motion.a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-4 p-4 rounded-xl transition-colors group"
                    style={{ backgroundColor: 'var(--background)' }}
                    whileHover={{ x: 4 }}
                  >
                    <div
                      className="p-3 rounded-xl transition-colors"
                      style={{ backgroundColor: 'var(--accent-soft)' }}
                    >
                      <HugeiconsIcon
                        icon={Mail01Icon}
                        className="h-6 w-6"
                        style={{ color: 'var(--accent)' }}
                      />
                    </div>
                    <div>
                      <p
                        className="text-sm mb-1"
                        style={{ color: 'var(--muted)' }}
                      >
                        Email
                      </p>
                      <p
                        className="font-medium group-hover:text-[var(--accent)] transition-colors"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {personalInfo.email}
                      </p>
                    </div>
                  </motion.a>
                </StaggerItem>
              ) : (
                <StaggerItem animation="fade-up">
                  <motion.a
                    href={personalInfo.socialLinks.find((l) => l.icon === 'github')?.url ?? 'https://github.com/zhoux77899'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl transition-colors group"
                    style={{ backgroundColor: 'var(--background)' }}
                    whileHover={{ x: 4 }}
                  >
                    <div
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: 'var(--accent-soft)' }}
                    >
                      <HugeiconsIcon
                        icon={Mail01Icon}
                        className="h-6 w-6"
                        style={{ color: 'var(--accent)' }}
                      />
                    </div>
                    <div>
                      <p
                        className="text-sm mb-1"
                        style={{ color: 'var(--muted)' }}
                      >
                        Get in touch
                      </p>
                      <p
                        className="font-medium group-hover:text-[var(--accent)] transition-colors"
                        style={{ color: 'var(--foreground)' }}
                      >
                        Contact via GitHub
                      </p>
                    </div>
                  </motion.a>
                </StaggerItem>
              )}

              {personalInfo.location ? (
                <StaggerItem animation="fade-up">
                  <div
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ backgroundColor: 'var(--background)' }}
                  >
                    <div
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: 'var(--accent-soft)' }}
                    >
                      <HugeiconsIcon
                        icon={Location01Icon}
                        className="h-6 w-6"
                        style={{ color: 'var(--accent)' }}
                      />
                    </div>
                    <div>
                      <p
                        className="text-sm mb-1"
                        style={{ color: 'var(--muted)' }}
                      >
                        Location
                      </p>
                      <p
                        className="font-medium"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {personalInfo.location}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ) : null}
            </StaggerContainer>

            <AnimatedSection animation="fade-in" delay={0.3}>
              <div>
                <h4
                  className="text-sm font-semibold mb-4 uppercase tracking-wider"
                  style={{ color: 'var(--muted)' }}
                >
                  Follow Me
                </h4>
                <SocialLinks />
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        {/* Contact Form */}
        <AnimatedSection animation="slide-left" delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              label="Name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              required
            />

            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              required
            />

            <FormField
              label="Message"
              name="message"
              type="textarea"
              placeholder="Enter your message..."
              value={formData.message}
              onChange={(value) => setFormData({ ...formData, message: value })}
              required
              rows={5}
            />

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                size="lg"
                className="w-full cursor-pointer font-semibold py-6 text-lg"
                isDisabled={isSubmitting || isSubmitted}
                style={{
                  backgroundColor: isSubmitted ? 'var(--sage)' : 'var(--accent)',
                  color: 'var(--accent-foreground)',
                }}
              >
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center"
                    >
                      <HugeiconsIcon icon={CheckmarkCircle01Icon} className="h-5 w-5 mr-2" />
                      Message Sent!
                    </motion.span>
                  ) : isSubmitting ? (
                    <motion.span
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="inline-block w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex items-center"
                    >
                      <HugeiconsIcon icon={SentIcon} className="h-5 w-5 mr-2" />
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </form>
        </AnimatedSection>
      </div>
    </Section>
  );
}
