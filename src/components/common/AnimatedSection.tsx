import { motion, useReducedMotion } from 'framer-motion';
import { type ReactNode } from 'react';

export type AnimationType = 'fade-up' | 'fade-in' | 'scale-up' | 'slide-left' | 'slide-right';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: AnimationType;
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

const animationVariants = {
  'fade-up': {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'scale-up': {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
};

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  animation = 'fade-up',
  threshold = 0.1,
  once = true,
  rootMargin = '-50px',
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = animationVariants[animation];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: rootMargin }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  threshold = 0.1,
  once = true,
  rootMargin = '-50px',
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: rootMargin }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  duration?: number;
}

export function StaggerItem({
  children,
  className = '',
  animation = 'fade-up',
  duration = 0.5,
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = animationVariants[animation];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={variants}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}
