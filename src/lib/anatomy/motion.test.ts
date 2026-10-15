import { describe, expect, it } from 'bun:test';
import { followLift, TOUR_STEP_MS, tourDestination } from './motion';

describe('explorer motion', () => {
  it('arrives immediately under reduced motion', () => {
    expect(followLift(0.42, 1, 1 / 60, true)).toBe(1);
    expect(followLift(0.42, 0, 1 / 60, true)).toBe(0);
  });
  it('follows elapsed time consistently at 30 and 60 fps', () => {
    let thirty = 0;
    let sixty = 0;
    for (let frame = 0; frame < 15; frame++) thirty = followLift(thirty, 1, 1 / 30, false);
    for (let frame = 0; frame < 30; frame++) sixty = followLift(sixty, 1, 1 / 60, false);
    expect(thirty).toBeCloseTo(sixty, 8);
  });
  it('reverses from the visible position without overshooting', () => {
    let lift = 0;
    for (let frame = 0; frame < 8; frame++) lift = followLift(lift, 1, 1 / 60, false);
    const visible = lift;
    lift = followLift(lift, 0, 1 / 60, false);
    expect(lift).toBeGreaterThan(0);
    expect(lift).toBeLessThan(visible);
    expect(followLift(lift, 1, 50, false)).toBeLessThan(1);
  });
  it('tours the six objects in order and wraps without changing page state', () => {
    expect(tourDestination(0)).toBe('projects');
    expect(tourDestination(TOUR_STEP_MS)).toBe('skills');
    expect(tourDestination(5 * TOUR_STEP_MS)).toBe('contact');
    expect(tourDestination(6 * TOUR_STEP_MS)).toBe('projects');
  });
});
