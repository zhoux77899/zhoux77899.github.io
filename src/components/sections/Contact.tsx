import { useState } from 'react';
import { Button } from '@heroui/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Mail01Icon, Location01Icon, SentIcon, CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/common/AnimatedSection';
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
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
    <section
      id="contact"
      className="py-32 relative overflow-hidden"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-5 hidden lg:block"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
              style={{
                backgroundColor: 'var(--accent-soft)',
                color: 'var(--accent)',
              }}
            >
              Get in Touch
            </span>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: 'var(--foreground)' }}
            >
              Contact Me
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--muted)' }}
            >
              Open to tech discussions, collaboration or just saying hello!
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <AnimatedSection animation="slide-right" delay={0.1}>
            <div>
              <h3
                className="font-display text-2xl font-semibold mb-8"
                style={{ color: 'var(--foreground)' }}
              >
                Let's Connect
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
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--foreground)' }}
                >
                  Name
                </label>
                <motion.input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all"
                  style={{
                    backgroundColor: 'var(--field-background)',
                    borderColor: focusedField === 'name' ? 'var(--accent)' : 'var(--field-border)',
                    color: 'var(--field-foreground)',
                  }}
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--foreground)' }}
                >
                  Email
                </label>
                <motion.input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all"
                  style={{
                    backgroundColor: 'var(--field-background)',
                    borderColor: focusedField === 'email' ? 'var(--accent)' : 'var(--field-border)',
                    color: 'var(--field-foreground)',
                  }}
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--foreground)' }}
                >
                  Message
                </label>
                <motion.textarea
                  placeholder="Enter your message..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all resize-none"
                  style={{
                    backgroundColor: 'var(--field-background)',
                    borderColor: focusedField === 'message' ? 'var(--accent)' : 'var(--field-border)',
                    color: 'var(--field-foreground)',
                  }}
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="w-full cursor-pointer font-semibold py-6 text-lg"
                  disabled={isSubmitting || isSubmitted}
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
      </div>
    </section>
  );
}
