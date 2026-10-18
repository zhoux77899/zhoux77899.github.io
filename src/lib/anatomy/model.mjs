// Shared by the browser and geometry audit; motion never overshoots its rails.
export function followLift(current, target, dt, reduced) {
  if (reduced) return target;
  const next = current + (target - current) * (1 - Math.exp(-Math.min(dt, 1 / 30) / 0.2));
  return Math.abs(next - target) < 0.0005 ? target : next;
}
