import { describe, expect, it } from 'bun:test';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { StrictMode } from 'react';
import { ExplorerProvider } from '@/providers/ExplorerProvider';
import { setMediaQuery } from '@/test/media';
import { contributions } from '@/lib/data';
import { Projects } from './Projects';

function renderProjects() { return render(<ExplorerProvider><Projects /></ExplorerProvider>); }
function selectedProject() {
  return within(screen.getByRole('group', { name: 'Choose a project' })).getAllByRole('button').find(button => button.hasAttribute('aria-current'));
}

function carouselGeometry(gallery: HTMLElement, initialWidth = 500, initialCardWidth = 400, initialGap = 24) {
  let width = initialWidth, cardWidth = initialCardWidth, gap = initialGap;
  Object.defineProperty(gallery, 'clientWidth', { get: () => width, configurable: true });
  gallery.getBoundingClientRect = () => ({ left: 76, width, height: 500, top: 180, bottom: 680 } as DOMRect);
  Array.from(gallery.children).forEach((slide, index) => {
    slide.getBoundingClientRect = () => ({ left: 76 + (width - cardWidth) / 2 + index * (cardWidth + gap) - gallery.scrollLeft, width: cardWidth, height: 500 } as DOMRect);
  });
  return {
    offset: (logicalIndex: number) => (logicalIndex + 2) * (cardWidth + gap),
    endpoint: () => cardWidth + gap,
    resize: (nextWidth: number, nextCardWidth: number, nextGap: number) => { width = nextWidth; cardWidth = nextCardWidth; gap = nextGap; },
  };
}

function rotationHarness() {
  const originalObserver = globalThis.IntersectionObserver;
  const originalTimeout = window.setTimeout;
  const originalClear = window.clearTimeout;
  const hidden = Object.getOwnPropertyDescriptor(document, 'hidden');
  const observers = new Map<IntersectionObserver, IntersectionObserverCallback>();
  const timers = new Map<number, () => void>();
  let timerId = 100_000;
  Object.defineProperty(document, 'hidden', { value: false, configurable: true });
  setMediaQuery('(prefers-reduced-motion: reduce)', false);
  Object.defineProperty(globalThis, 'IntersectionObserver', { configurable: true, value: class {
    callback: IntersectionObserverCallback;
    constructor(callback: IntersectionObserverCallback) { this.callback = callback; }
    observe(target: Element) { if (target.classList.contains('carousel')) observers.set(this as unknown as IntersectionObserver, this.callback); }
    disconnect() { observers.delete(this as unknown as IntersectionObserver); }
  } });
  window.setTimeout = ((callback: TimerHandler, delay?: number) => {
    if (delay !== 6_000) return originalTimeout(callback, delay);
    const id = ++timerId;
    timers.set(id, callback as () => void);
    return id;
  }) as typeof window.setTimeout;
  window.clearTimeout = ((id: number) => {
    if (timers.has(id)) timers.delete(id);
    else originalClear(id);
  }) as typeof window.clearTimeout;
  return {
    timers, observers,
    visible(value: boolean) {
      observers.forEach((callback, observer) => callback([{ isIntersecting: value, intersectionRatio: value ? 1 : 0 } as IntersectionObserverEntry], observer));
    },
    tick() { const callbacks = Array.from(timers.values()); timers.clear(); callbacks.forEach(callback => callback()); },
    hidden(value: boolean) {
      Object.defineProperty(document, 'hidden', { value, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    },
    restore() {
      Object.defineProperty(globalThis, 'IntersectionObserver', { value: originalObserver, configurable: true });
      window.setTimeout = originalTimeout;
      window.clearTimeout = originalClear;
      if (hidden) Object.defineProperty(document, 'hidden', hidden);
      else Reflect.deleteProperty(document, 'hidden');
    },
  };
}

describe('Project carousel', () => {
  it('keeps six unique deep links and uses inert static copies at the loop endpoints', () => {
    renderProjects();
    expect(screen.getAllByRole('article')).toHaveLength(7);
    expect(selectedProject()).toHaveAccessibleName('Show CFGAN');
    expect(screen.queryByRole('navigation', { name: 'Choose a project' })).not.toBeInTheDocument();
    expect(document.querySelector('.project-gallery-position')).toBeNull();
    const gallery = screen.getByRole('region', { name: 'Personal projects' });
    expect(gallery.querySelectorAll('[data-project-id]')).toHaveLength(6);
    expect(gallery.querySelectorAll('[data-hairline]')).toHaveLength(6);
    const copies = gallery.querySelectorAll('[data-carousel-copy]');
    expect(copies).toHaveLength(4);
    copies.forEach(copy => {
      expect(copy).toHaveAttribute('inert');
      expect(copy).toHaveAttribute('aria-hidden', 'true');
      expect(copy.querySelector('[id], a, button, [data-hairline]')).toBeNull();
    });
    expect(document.querySelectorAll('#project-what-to-eat')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'vLLM Ascend' })).toBeInTheDocument();
  });

  it('keeps dots and keyboard navigation without page arrows or browser history changes', () => {
    renderProjects();
    const historyLength = window.history.length;
    const gallery = screen.getByRole('region', { name: 'Personal projects' });
    carouselGeometry(gallery);
    expect(screen.queryByRole('button', { name: 'Previous project' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Next project' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Show Kitsune Proxy' }));
    expect(selectedProject()).toHaveAccessibleName('Show Kitsune Proxy');
    fireEvent.click(screen.getByRole('button', { name: 'Show CFGAN' }));
    expect(selectedProject()).toHaveAccessibleName('Show CFGAN');
    fireEvent.keyDown(gallery, { key: 'ArrowLeft' });
    expect(selectedProject()).toHaveAccessibleName('Show Kitsune Proxy');
    fireEvent.keyDown(gallery, { key: 'ArrowRight' });
    expect(selectedProject()).toHaveAccessibleName('Show CFGAN');
    fireEvent.keyDown(gallery, { key: 'End' });
    expect(selectedProject()).toHaveAccessibleName('Show Kitsune Proxy');
    fireEvent.keyDown(gallery, { key: 'Home' });
    expect(selectedProject()).toHaveAccessibleName('Show CFGAN');
    expect(window.history.length).toBe(historyLength);
    expect(window.location.hash).toBe('');
  });

  it('restores deep links and browser Back while a native swipe adds no history', async () => {
    window.history.replaceState(null, '', '#project-what-to-eat');
    renderProjects();
    expect(selectedProject()).toHaveAccessibleName('Show What to Eat');
    await act(async () => { await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))); });
    const gallery = screen.getByRole('region', { name: 'Personal projects' });
    const geometry = carouselGeometry(gallery);
    const historyLength = window.history.length;
    await act(async () => {
      fireEvent.pointerDown(gallery, { pointerType: 'touch', pointerId: 1, isPrimary: true });
      gallery.scrollLeft = geometry.offset(2) + 8;
      fireEvent(gallery, new Event('scrollend'));
    });
    expect(selectedProject()).toHaveAccessibleName('Show Claude Code Insights');
    expect(window.history.length).toBe(historyLength);
    expect(window.location.hash).toBe('#project-what-to-eat');
    await act(async () => {
      window.history.replaceState(null, '', '#project-luma');
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    expect(selectedProject()).toHaveAccessibleName('Show LUMA');
    await act(async () => {
      window.history.replaceState(null, '', '#project-what-to-eat');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    expect(selectedProject()).toHaveAccessibleName('Show What to Eat');
    expect(gallery.scrollLeft).toBe(geometry.offset(4));
  });

  it('rebases a native endpoint swipe to the canonical card', async () => {
    renderProjects();
    const gallery = screen.getByRole('region', { name: 'Personal projects' });
    const geometry = carouselGeometry(gallery);
    await act(async () => {
      fireEvent.pointerDown(gallery, { pointerType: 'touch', pointerId: 1, isPrimary: true });
      gallery.scrollLeft = geometry.endpoint();
      fireEvent(gallery, new Event('scrollend'));
    });
    expect(selectedProject()).toHaveAccessibleName('Show Kitsune Proxy');
    expect(gallery.scrollLeft).toBe(geometry.offset(5));
    expect(window.location.hash).toBe('');
  });

  it('continues forward after a same-project deep link replaces an unfinished loop transition', async () => {
    renderProjects();
    const gallery = screen.getByRole('region', { name: 'Personal projects' });
    const geometry = carouselGeometry(gallery);
    fireEvent.keyDown(gallery, { key: 'ArrowLeft' });
    expect(selectedProject()).toHaveAccessibleName('Show Kitsune Proxy');
    // A different card encountered during the requested motion must not
    // replace the requested project or release the animation guard.
    await act(async () => {
      gallery.scrollLeft = geometry.offset(3);
      fireEvent(gallery, new Event('scrollend'));
    });
    expect(selectedProject()).toHaveAccessibleName('Show Kitsune Proxy');
    const canonical = document.querySelector<HTMLElement>('[data-project-id="kitsune-proxy"]');
    if (!canonical) throw new Error('The canonical project card is missing.');
    canonical.scrollIntoView = () => { gallery.scrollLeft = geometry.offset(5); };
    await act(async () => {
      window.history.replaceState(null, '', '#project-kitsune-proxy');
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      fireEvent(gallery, new Event('scrollend'));
    });
    expect(gallery.scrollLeft).toBe(geometry.offset(5));
    expect(selectedProject()).toHaveAccessibleName('Show Kitsune Proxy');
    fireEvent.keyDown(gallery, { key: 'ArrowRight' });
    // Advance to the adjacent trailing copy, rather than five cards backward
    // to the first canonical card from the obsolete leading-copy position.
    expect(gallery.scrollLeft).toBe(geometry.offset(6));
    expect(selectedProject()).toHaveAccessibleName('Show CFGAN');
    expect(window.location.hash).toBe('#project-kitsune-proxy');
  });

  it('centers the current card after responsive resizing and cleans up observation', async () => {
    const previousObserver = Object.getOwnPropertyDescriptor(globalThis, 'ResizeObserver');
    const observers: TestResizeObserver[] = [];
    class TestResizeObserver implements ResizeObserver {
      observed = new Set<Element>();
      disconnected = false;
      callback: ResizeObserverCallback;
      constructor(callback: ResizeObserverCallback) { this.callback = callback; observers.push(this); }
      observe(target: Element) { this.observed.add(target); }
      unobserve(target: Element) { this.observed.delete(target); }
      disconnect() { this.disconnected = true; this.observed.clear(); }
      emit() { this.callback([], this); }
    }
    Object.defineProperty(globalThis, 'ResizeObserver', { value: TestResizeObserver, configurable: true });
    let view: ReturnType<typeof render> | undefined;
    try {
      window.history.replaceState(null, '', '#project-what-to-eat');
      view = renderProjects();
      const gallery = screen.getByRole('region', { name: 'Personal projects' });
      const observer = observers.find(item => item.observed.has(gallery));
      expect(observer).toBeDefined();
      const geometry = carouselGeometry(gallery, 320, 260, 14);
      const historyLength = window.history.length;
      await act(async () => { observer?.emit(); });
      expect(gallery.scrollLeft).toBe(1644);
      await act(async () => { geometry.resize(1120, 920, 24); observer?.emit(); });
      expect(gallery.scrollLeft).toBe(5664);
      expect(selectedProject()).toHaveAccessibleName('Show What to Eat');
      await act(async () => {
        fireEvent.pointerDown(gallery, { pointerType: 'touch', pointerId: 1, isPrimary: true });
        gallery.scrollLeft = geometry.offset(2);
        fireEvent(gallery, new Event('scrollend'));
        geometry.resize(375, 307, 14);
        observer?.emit();
      });
      expect(selectedProject()).toHaveAccessibleName('Show Claude Code Insights');
      expect(gallery.scrollLeft).toBe(1284);
      expect(window.history.length).toBe(historyLength);
      view.unmount(); view = undefined;
      expect(observer?.disconnected).toBe(true);
    } finally {
      view?.unmount();
      if (previousObserver) Object.defineProperty(globalThis, 'ResizeObserver', previousObserver);
    }
  });

  it('automatically advances visible projects through the loop without adding history', () => {
    const clock = rotationHarness();
    const view = renderProjects();
    try {
      const gallery = screen.getByRole('region', { name: 'Personal projects' });
      const geometry = carouselGeometry(gallery);
      const historyLength = window.history.length;
      // An already-centered instant reveal need not emit a scrollend event.
      gallery.scrollLeft = geometry.offset(0);
      expect(clock.timers.size).toBe(0);
      act(() => { clock.visible(true); });
      expect(clock.timers.size).toBe(1);
      act(() => { clock.tick(); });
      act(() => { fireEvent(gallery, new Event('scrollend')); });
      expect(selectedProject()).toHaveAccessibleName('Show LUMA');
      expect(gallery.scrollLeft).toBe(geometry.offset(1));
      act(() => { fireEvent.click(screen.getByRole('button', { name: 'Show Kitsune Proxy' })); });
      act(() => { fireEvent(gallery, new Event('scrollend')); });
      act(() => { clock.tick(); });
      act(() => { fireEvent(gallery, new Event('scrollend')); });
      expect(selectedProject()).toHaveAccessibleName('Show CFGAN');
      expect(gallery.scrollLeft).toBe(geometry.offset(0));
      expect(clock.timers.size).toBe(1);
      expect(window.history.length).toBe(historyLength);
      expect(window.location.hash).toBe('');
    } finally { view.unmount(); clock.restore(); }
  });

  it('pauses rotation for reading, gestures, hidden content and reduced motion, then restarts the idle period', () => {
    const clock = rotationHarness();
    const view = renderProjects();
    try {
      const gallery = screen.getByRole('region', { name: 'Personal projects' });
      const geometry = carouselGeometry(gallery);
      const root = gallery.parentElement!;
      act(() => { gallery.scrollLeft = geometry.offset(0); fireEvent(gallery, new Event('scrollend')); clock.visible(true); });
      const beforeManual = Array.from(clock.timers.keys())[0];
      act(() => { fireEvent.click(screen.getByRole('button', { name: 'Show LUMA' })); fireEvent(gallery, new Event('scrollend')); });
      expect(Array.from(clock.timers.keys())[0]).not.toBe(beforeManual);
      act(() => { fireEvent.pointerEnter(root, { pointerType: 'mouse' }); });
      expect(clock.timers.size).toBe(0);
      act(() => { fireEvent.pointerLeave(root, { pointerType: 'mouse' }); });
      expect(clock.timers.size).toBe(1);
      act(() => { gallery.focus(); });
      expect(clock.timers.size).toBe(0);
      act(() => { gallery.blur(); });
      expect(clock.timers.size).toBe(1);
      act(() => { fireEvent.pointerDown(gallery, { pointerType: 'touch', pointerId: 1 }); });
      expect(clock.timers.size).toBe(0);
      act(() => { fireEvent.pointerUp(window, { pointerType: 'touch', pointerId: 1 }); });
      expect(clock.timers.size).toBe(1);
      act(() => { clock.hidden(true); });
      expect(clock.timers.size).toBe(0);
      act(() => { clock.hidden(false); });
      expect(clock.timers.size).toBe(1);
      act(() => { clock.visible(false); });
      expect(clock.timers.size).toBe(0);
      act(() => { clock.visible(true); setMediaQuery('(prefers-reduced-motion: reduce)', true); });
      expect(clock.timers.size).toBe(0);
      expect(screen.getByRole('button', { name: 'Start automatic project rotation' })).toBeDisabled();
      act(() => { setMediaQuery('(prefers-reduced-motion: reduce)', false); });
      expect(clock.timers.size).toBe(1);
      expect(selectedProject()).toHaveAccessibleName('Show LUMA');
    } finally { view.unmount(); clock.restore(); }
  });

  it('continues automatic rotation after resizing a fixed-width card without a scroll event', () => {
    const clock = rotationHarness();
    const originalObserver = globalThis.ResizeObserver;
    const callbacks = new Map<Element, () => void>();
    Object.defineProperty(globalThis, 'ResizeObserver', { configurable: true, value: class {
      callback: ResizeObserverCallback;
      constructor(callback: ResizeObserverCallback) { this.callback = callback; }
      observe(target: Element) { callbacks.set(target, () => this.callback([], this as unknown as ResizeObserver)); }
      disconnect() {}
    } });
    const view = renderProjects();
    try {
      const gallery = screen.getByRole('region', { name: 'Personal projects' });
      const geometry = carouselGeometry(gallery, 1200, 960, 24);
      act(() => { callbacks.get(gallery)?.(); fireEvent(gallery, new Event('scrollend')); clock.visible(true); });
      expect(gallery.scrollLeft).toBe(1968);
      act(() => { geometry.resize(1240, 960, 24); callbacks.get(gallery)?.(); });
      expect(gallery.scrollLeft).toBe(1968);
      // Changing only the track width leaves the canonical offset unchanged,
      // so browsers have no scroll or scrollend event to dispatch.
      for (const project of ['LUMA', 'Claude Code Insights', 'Flawless']) {
        act(() => { clock.tick(); });
        expect(selectedProject()).toHaveAccessibleName(`Show ${project}`);
        act(() => { fireEvent(gallery, new Event('scrollend')); });
      }
      expect(clock.timers.size).toBe(1);
    } finally {
      view.unmount();
      Object.defineProperty(globalThis, 'ResizeObserver', { value: originalObserver, configurable: true });
      clock.restore();
    }
  });

  it('allows explicit pause and resume and leaves no rotation timer or observer after StrictMode unmount', () => {
    const clock = rotationHarness();
    const view = render(<StrictMode><ExplorerProvider><Projects /></ExplorerProvider></StrictMode>);
    try {
      const gallery = screen.getByRole('region', { name: 'Personal projects' });
      const geometry = carouselGeometry(gallery);
      act(() => { gallery.scrollLeft = geometry.offset(0); fireEvent(gallery, new Event('scrollend')); clock.visible(true); });
      expect(clock.observers.size).toBe(1);
      expect(clock.timers.size).toBe(1);
      act(() => { const pause = screen.getByRole('button', { name: 'Pause automatic project rotation' }); pause.focus(); fireEvent.click(pause); clock.visible(true); });
      expect(clock.timers.size).toBe(0);
      expect(screen.getByRole('button', { name: 'Start automatic project rotation' })).toHaveFocus();
      act(() => { fireEvent.click(screen.getByRole('button', { name: 'Start automatic project rotation' })); });
      act(() => { clock.visible(true); });
      expect(clock.timers.size).toBe(1);
      const outside = document.createElement('button');
      document.body.append(outside);
      act(() => { outside.focus(); });
      expect(clock.timers.size).toBe(1);
      act(() => { screen.getByRole('button', { name: 'Pause automatic project rotation' }).focus(); });
      expect(clock.timers.size).toBe(0);
      view.unmount();
      expect(clock.timers.size).toBe(0);
      expect(clock.observers.size).toBe(0);
      act(() => { fireEvent.pointerUp(window); document.dispatchEvent(new Event('visibilitychange')); });
      expect(clock.timers.size).toBe(0);
    } finally { view.unmount(); clock.restore(); }
  });

  it('normalizes project links and separates ordered pull requests from source', () => {
    renderProjects();
    const luma = document.querySelector('[data-project-id="luma"]') as HTMLElement;
    expect(within(luma).getAllByRole('link').map(link => link.textContent)).toEqual(['Source', 'Releases', 'Website']);
    expect(within(luma).getByRole('link', { name: 'Website' })).toHaveAttribute('href', 'https://zhoux77899.github.io/luma/');
    const contribution = document.getElementById('vllm-ascend-work') as HTMLElement;
    expect(within(contribution).getByRole('link', { name: 'Source' }).parentElement).toHaveClass('contribution-source');
    const requests = contributions[0].links.filter(link => /\/pull\/\d+/.test(link.url))
      .sort((left, right) => Number(left.url.split('/').at(-1)) - Number(right.url.split('/').at(-1)));
    const mainRequests = within(contribution).getByRole('list', { name: 'Merged pull requests' });
    const links = within(mainRequests).getAllByRole('link');
    expect(links.map(link => link.textContent)).toEqual(requests.map(link => link.name));
    expect(links.map(link => link.getAttribute('href'))).toEqual(requests.map(link => link.url));
    expect(new Set(links.map(link => link.getAttribute('href'))).size).toBe(requests.length);
    expect(contribution.querySelector('details')).toBeNull();
    expect(within(contribution).getByText(`${requests.length} merged pull requests`)).toBeInTheDocument();
  });
});
