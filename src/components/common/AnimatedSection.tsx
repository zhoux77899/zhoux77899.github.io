import { motion, useAnimationControls, type MotionProps, type Variants } from "motion/react";
import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { useMotionPreference } from "@/hooks/useMotionPreference";

export type AnimationType = "fade-up" | "fade-in" | "scale-up" | "slide-left" | "slide-right";
type ViewportMargin = NonNullable<MotionProps["viewport"]>["margin"];

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: AnimationType;
  threshold?: number;
  once?: boolean;
  rootMargin?: ViewportMargin;
}

const animationVariants: Record<AnimationType, Variants> = {
  "fade-up": { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } },
  "fade-in": { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  "scale-up": { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  "slide-left": { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } },
  "slide-right": { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } },
};

const revealEase = [0.25, 0.1, 0.25, 1] as const;

interface RevealState {
  visible: boolean;
  instant: boolean;
  forceVisible: () => void;
}

const RevealContext = createContext<RevealState | null>(null);

// A visible default also covers browsers without IntersectionObserver. Only
// observed content is hidden, and navigation or focus always reveals it now.
function useReveal(ref: RefObject<HTMLDivElement | null>, once: boolean, threshold: number, rootMargin: ViewportMargin) {
  const reduced = useMotionPreference();
  const [phase, setPhase] = useState<'idle' | 'hidden' | 'visible'>('idle');
  const [immediate, setImmediate] = useState(false);
  const revealed = useRef(false);
  const forceVisible = useCallback(() => {
    revealed.current = true;
    setImmediate(true);
    setPhase('visible');
  }, []);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const revealHash = (hash: string) => {
      let id: string;
      try { id = decodeURIComponent(hash.replace(/^#/, '')); } catch { return; }
      const target = id ? document.getElementById(id) : null;
      const titleId = target?.matches('section') ? target.getAttribute('aria-labelledby')?.trim().split(/\s+/)[0] : undefined;
      const title = titleId ? document.getElementById(titleId) : null;
      if (target && (node.contains(target) || (title && target.contains(title) && node.contains(title)))) forceVisible();
    };
    const navigate = () => revealHash(window.location.hash);
    const click = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (link && !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) revealHash(link.hash);
    };
    navigate();
    if (node.contains(document.activeElement)) forceVisible();
    window.addEventListener('hashchange', navigate);
    window.addEventListener('popstate', navigate);
    document.addEventListener('click', click, true);
    let observer: IntersectionObserver | undefined;
    let disposed = false;
    if (!reduced && typeof IntersectionObserver !== 'undefined' && !revealed.current) {
      setPhase('hidden');
      observer = new IntersectionObserver(entries => {
        if (disposed || (once && revealed.current)) return;
        const entry = entries.at(-1);
        if (!entry) return;
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          revealed.current = true;
          setPhase('visible');
          if (once) observer?.disconnect();
        } else if (!once) setPhase('hidden');
      }, { threshold, rootMargin });
      observer.observe(node);
    }
    return () => {
      disposed = true;
      observer?.disconnect();
      window.removeEventListener('hashchange', navigate);
      window.removeEventListener('popstate', navigate);
      document.removeEventListener('click', click, true);
    };
  }, [forceVisible, immediate, once, reduced, ref, rootMargin, threshold]);

  return { visible: reduced || immediate || phase !== 'hidden', instant: reduced || immediate || phase !== 'visible', forceVisible };
}

function useRevealControls({ visible, instant }: Pick<RevealState, 'visible' | 'instant'>, variants: Variants, duration: number, delay: number) {
  const controls = useAnimationControls();
  useLayoutEffect(() => {
    controls.stop();
    if (instant) controls.set(visible ? 'visible' : 'hidden');
    else void controls.start(visible ? 'visible' : 'hidden', { duration, delay, ease: revealEase });
    return () => controls.stop();
  }, [controls, delay, duration, instant, variants, visible]);
  return controls;
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  duration = 0.65,
  animation = "fade-up",
  threshold = 0.1,
  once = true,
  rootMargin = "0px 0px -40px 0px",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reveal = useReveal(ref, once, threshold, rootMargin);
  const controls = useRevealControls(reveal, animationVariants[animation], duration, delay);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={controls}
      onFocusCapture={reveal.forceVisible}
      variants={animationVariants[animation]}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedRevealGroupProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  once?: boolean;
  rootMargin?: ViewportMargin;
}

/** Observe a stationary layout wrapper while its contents share one entrance. */
export function AnimatedRevealGroup({ children, className, threshold = 0.1, once = true, rootMargin = "0px 0px -40px 0px" }: AnimatedRevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reveal = useReveal(ref, once, threshold, rootMargin);
  return (
    <RevealContext value={reveal}>
      <div ref={ref} className={className} onFocusCapture={reveal.forceVisible}>{children}</div>
    </RevealContext>
  );
}

interface AnimatedRevealItemProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  distance?: number;
  duration?: number;
  delay?: number;
}

/** Animate an inner visual layer without transforming carousel measurements. */
export function AnimatedRevealItem({ children, className, animation = "fade-up", distance, duration = 0.65, delay = 0 }: AnimatedRevealItemProps) {
  const group = useContext(RevealContext);
  const variants = useMemo(() => {
    if (distance === undefined) return animationVariants[animation];
    if (animation === 'fade-up') return { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } };
    if (animation === 'slide-left') return { hidden: { opacity: 0, x: distance }, visible: { opacity: 1, x: 0 } };
    if (animation === 'slide-right') return { hidden: { opacity: 0, x: -distance }, visible: { opacity: 1, x: 0 } };
    return animationVariants[animation];
  }, [animation, distance]);
  const controls = useRevealControls(group ?? { visible: true, instant: true }, variants, duration, delay);
  return <motion.div initial={false} animate={controls} variants={variants} className={className}>{children}</motion.div>;
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
  once?: boolean;
  rootMargin?: ViewportMargin;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.06,
  threshold = 0.1,
  once = true,
  rootMargin = "0px 0px -40px 0px",
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { visible, instant, forceVisible } = useReveal(ref, once, threshold, rootMargin);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={visible ? 'visible' : 'hidden'}
      onFocusCapture={forceVisible}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: instant ? 0 : staggerDelay } } }}
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

export function StaggerItem({ children, className = "", animation = "fade-up", duration = 0.5 }: StaggerItemProps) {
  const prefersReducedMotion = useMotionPreference();
  if (prefersReducedMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      variants={animationVariants[animation]}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
