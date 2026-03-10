import { useEffect, useState } from "react";

export function useScrollPosition(): number {
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return y;
}

export function useScrollPastThreshold(threshold = 300): boolean {
  const y = useScrollPosition();
  return y > threshold;
}
