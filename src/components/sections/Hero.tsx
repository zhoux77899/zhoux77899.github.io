import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { PhotoAvatar } from "@/components/common/PhotoAvatar";
import { SocialLinks } from "@/components/common/SocialLinks";
import { useTheme } from "@/hooks/useTheme";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { personalInfo } from "@/lib/data";
import { ArrowDownIcon, SparklesIcon } from "@/utils/icons";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const reducedItemVariants: Variants = {
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export function Hero() {
  const { resolvedTheme } = useTheme();
  const prefersReducedMotion = useMotionPreference();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const variants = prefersReducedMotion ? reducedItemVariants : itemVariants;
  const heroImage = resolvedTheme === "dark"
    ? "/assets/images/hero/transformer_dark.png"
    : "/assets/images/hero/transformer_light.png";

  return (
    <section ref={containerRef} id="hero" aria-labelledby="hero-title" className="relative min-h-screen overflow-hidden bg-[var(--surface)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, var(--border) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <motion.div
        style={prefersReducedMotion ? undefined : { y: textY, opacity }}
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 pt-10 pb-28 sm:px-6 lg:px-8 lg:pt-20"
      >
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            className="order-2 flex flex-col justify-center pt-[40vh] text-center sm:pt-[45vh] lg:order-1 lg:pt-0 lg:text-left"
          >
            <motion.div variants={variants} className="mb-6 flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
                <SparklesIcon className="size-4" aria-hidden="true" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.div variants={variants} className="mb-6 flex justify-center lg:justify-start">
              <div className="size-20 rounded-full bg-[var(--accent-soft)] p-1">
                <PhotoAvatar src={personalInfo.avatar} name={personalInfo.name} className="size-[72px] text-3xl font-bold" />
              </div>
            </motion.div>

            <motion.h1 id="hero-title" variants={variants} className="mb-4 font-display text-5xl leading-[1.1] font-bold tracking-tight text-[var(--foreground)] sm:text-6xl md:text-7xl lg:text-8xl">
              Hi, I'm
              <br />
              <span className="gradient-text">{personalInfo.name}</span>
            </motion.h1>

            <motion.p variants={variants} className="mb-6 text-xl font-medium text-[var(--accent)] md:text-2xl lg:text-3xl">
              {personalInfo.title}
            </motion.p>
            <motion.p variants={variants} className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-[var(--muted)] lg:mx-0">
              {personalInfo.bio}
            </motion.p>

            <motion.div variants={variants} className="mb-10 flex justify-center lg:justify-start">
              <SocialLinks />
            </motion.div>

            <motion.div variants={variants} className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <ButtonLink href="#projects" variant="primary" className="h-auto min-h-14 rounded-xl px-8 py-4 text-lg font-semibold">
                View My Work
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary" className="h-auto min-h-14 rounded-xl border-2 px-8 py-4 text-lg font-semibold">
                Get In Touch
              </ButtonLink>
            </motion.div>
          </motion.div>
          <div className="order-1 hidden lg:order-2 lg:block" />
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.2 }}
        style={prefersReducedMotion ? undefined : { y: backgroundY }}
        className="absolute top-0 right-0 hidden h-full w-1/2 lg:block"
      >
        <img src={heroImage} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, var(--surface) 0%, transparent 30%)" }} />
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={prefersReducedMotion ? false : { opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.2 }}
        className="absolute top-16 left-0 h-[40vh] w-full sm:h-[45vh] lg:hidden"
      >
        <img src={heroImage} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 60%, var(--surface) 100%)" }} />
      </motion.div>

      <div aria-hidden="true" className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          animate={prefersReducedMotion ? { y: 0 } : { y: [0, 10, 0] }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm font-medium text-[var(--muted)]">Scroll to explore</span>
          <div className="rounded-full bg-[var(--accent-soft)] p-2">
            <ArrowDownIcon className="size-5 text-[var(--accent)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
