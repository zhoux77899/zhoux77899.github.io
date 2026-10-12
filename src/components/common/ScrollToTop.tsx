import { useEffect, useState } from "react";
import { IconButton } from "@/components/base/buttons/icon-button";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { ArrowUpIcon } from "@/utils/icons";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useMotionPreference();

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 500);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <IconButton
      icon={ArrowUpIcon}
      onClick={() => window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "instant" : "smooth",
      })}
      className="fixed right-6 bottom-6 z-50 size-12 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] shadow-lg"
      aria-label="Back to top"
    />
  );
}
