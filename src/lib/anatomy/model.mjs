// Shared by the browser and geometry audit; motion never overshoots its rails.
export function followLift(current, target, dt, reduced) {
  if (reduced) return target;
  // Pick up promptly on focus or hover, then ease the insert back into its tray.
  const timeConstant = target > current ? 0.14 : 0.2;
  const next = current + (target - current) * (1 - Math.exp(-Math.min(dt, 1 / 30) / timeConstant));
  return Math.abs(next - target) < 0.0005 ? target : next;
}
