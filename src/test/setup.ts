import { afterEach, expect } from 'bun:test';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { resetMediaQueries } from './media';

expect.extend(matchers);
resetMediaQueries();
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(globalThis, 'ResizeObserver', { value: ObserverStub, configurable: true });
Object.defineProperty(globalThis, 'IntersectionObserver', {
  value: class extends ObserverStub {
    root = null;
    rootMargin = '';
    thresholds = [0];
    takeRecords() { return []; }
  },
  configurable: true,
});
Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  value: () => {}, configurable: true, writable: true,
});
Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
  value: function(this: HTMLElement, options: ScrollToOptions) {
    if (options.left !== undefined) this.scrollLeft = options.left;
    if (options.top !== undefined) this.scrollTop = options.top;
  }, configurable: true, writable: true,
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.classList.remove('dark');
  delete document.documentElement.dataset.theme;
  delete document.documentElement.dataset.themePreference;
  document.documentElement.style.colorScheme = '';
  document.body.innerHTML = '';
  window.history.replaceState(null, '', '/');
  resetMediaQueries();
});
