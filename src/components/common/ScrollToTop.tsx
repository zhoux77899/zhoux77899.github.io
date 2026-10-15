import { useEffect, useState } from "react";
import { Button } from "@/components/base/buttons/button";
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
    <Button
      variant="primary" iconOnly leadingIcon={ArrowUpIcon}
      onClick={() => window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "instant" : "smooth",
      })}
      className="fixed right-5 bottom-5 z-50 size-12 rounded-xl"
      aria-label="Back to top"
    />
  );
}
