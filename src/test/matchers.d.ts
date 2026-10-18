import type { expect } from 'bun:test';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'bun:test' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Matcher declaration merging requires an interface.
  interface Matchers<T> extends TestingLibraryMatchers<ReturnType<typeof expect.stringContaining>, T> {}
}

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}
