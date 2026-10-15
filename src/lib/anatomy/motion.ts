import type { ExplorerDestination } from './index';
export { followLift } from './model.mjs';

export const TOUR_WAIT_MS = 8_000;
export const TOUR_STEP_MS = 2_800;
export const TOUR_DESTINATIONS: readonly ExplorerDestination[] = ['projects', 'skills', 'experience', 'open-source', 'travel', 'contact'];

// A tour can preview an object, but never chooses a page destination or a hash.
export function tourDestination(elapsedMs: number): ExplorerDestination {
  return TOUR_DESTINATIONS[Math.floor(Math.max(0, elapsedMs) / TOUR_STEP_MS) % TOUR_DESTINATIONS.length];
}
