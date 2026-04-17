import { useState } from 'react';
import { Button } from '@heroui/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { SentIcon, CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/common/SectionHeader';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { FormField } from '@/components/common/FormField';

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

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <Section id="contact" showPattern={false}>
      <SectionHeader
        label="Get in Touch"
        title="Contact Me"
        description="Open to tech discussions, collaboration or just saying hello!"
      />

      <AnimatedSection animation="fade-up" delay={0.1}>
        <div
          className="p-6 md:p-8 rounded-2xl max-w-2xl mx-auto"
          style={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
          }}
        >
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
        </div>
      </AnimatedSection>
    </Section>
  );
}
