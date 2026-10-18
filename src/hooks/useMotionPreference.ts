import { useSyncExternalStore } from "react";

const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return typeof window !== "undefined" && window.matchMedia(motionQuery).matches;
}

export function useMotionPreference() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
