import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test';
import { StrictMode } from 'react';
import { act, fireEvent, render, within } from '@testing-library/react';
import { explorerDestinations } from '@/lib/anatomy';
import type { ExplorerAsset } from '@/lib/anatomy';
import { setMediaQuery } from '@/test/media';

const pending: Array<{ resolve: (asset: ExplorerAsset) => void; reject: (error: Error) => void }> = [];
mock.module('@/lib/anatomy', () => ({
  explorerDestinations,
  loadExplorer: () => new Promise((resolve, reject) => pending.push({ resolve, reject })),
}));
const { AnatomyExplorer } = await import('./AnatomyExplorer');
const asset: ExplorerAsset = {
  version: 1, width: 800, height: 640, solids: 6,
  items: explorerDestinations.map((item, i) => ({ id: `${item.id}.tray`, piece: item.id, key: i, lift: 1, offset: [0, -10] })),
  body: explorerDestinations.map(item => `<g data-item="${item.id}.tray" data-piece="${item.id}"><path class="iso-edge" d="M0 0L10 0L10 10Z"/></g>`).join(''),
  modules: explorerDestinations.map((item, i) => ({ ...item, x: 100 + i * 50, y: 200, rx: 24, ry: 20 })),
};
const originalObserver = globalThis.IntersectionObserver;
const originalRAF = globalThis.requestAnimationFrame;
const originalCancel = globalThis.cancelAnimationFrame;
let callback: IntersectionObserverCallback | undefined;
const disconnected = mock(() => {});
const frames = new Map<number, FrameRequestCallback>();
let frameID = 0;
beforeEach(() => {
  pending.length = 0;
  frames.clear();
  callback = undefined;
  disconnected.mockClear();
  Object.defineProperty(globalThis, 'IntersectionObserver', { configurable: true, value: class {
    constructor(cb: IntersectionObserverCallback) { callback = cb; }
    observe() {}
    disconnect() { disconnected(); }
  } });
  Object.defineProperty(globalThis, 'requestAnimationFrame', { configurable: true, value: (cb: FrameRequestCallback) => { frames.set(++frameID, cb); return frameID; } });
  Object.defineProperty(globalThis, 'cancelAnimationFrame', { configurable: true, value: (id: number) => { frames.delete(id); } });
});
afterEach(() => {
  Object.defineProperty(globalThis, 'IntersectionObserver', { configurable: true, value: originalObserver });
  Object.defineProperty(globalThis, 'requestAnimationFrame', { configurable: true, value: originalRAF });
  Object.defineProperty(globalThis, 'cancelAnimationFrame', { configurable: true, value: originalCancel });
});
const loaded = async () => { await act(async () => { pending.forEach(item => item.resolve(asset)); }); };
const visibility = (visible: boolean) => callback?.([{ isIntersecting: visible } as IntersectionObserverEntry], {} as IntersectionObserver);

describe('Anatomy explorer lifecycle and navigation', () => {
  it('keeps cover hotspots and navigation usable in the tighter static fallback', async () => {
    const view = render(<AnatomyExplorer activeDestination={null} compactFrame />);
    await act(async () => { pending.forEach(item => item.reject(new Error('offline'))); });
    expect(view.getByRole('img')).toHaveAttribute('viewBox', '75 65 650 520');
    const links = within(view.getByRole('group', { name: 'Explore the toolbox' })).getAllByRole('link');
    expect(links).toHaveLength(6);
    for (const link of links) {
      expect(parseFloat(link.style.left)).toBeGreaterThan(0);
      expect(parseFloat(link.style.left)).toBeLessThan(100);
      expect(parseFloat(link.style.top)).toBeGreaterThan(0);
      expect(parseFloat(link.style.top)).toBeLessThan(100);
    }
    act(() => { links[0].focus(); fireEvent.keyDown(links[0], { key: 'End' }); });
    expect(links.at(-1)).toHaveFocus();
    expect(links.at(-1)).toHaveAttribute('href', '#contact');
  });
  it('keeps six real drawing hotspots usable when interactive loading fails', async () => {
    const view = render(<AnatomyExplorer activeDestination={null} />);
    await act(async () => { pending.forEach(item => item.reject(new Error('offline'))); });
    const drawing = within(view.getByRole('group', { name: 'Explore the toolbox' }));
    for (const destination of explorerDestinations) {
      const link = drawing.getByRole('link', { name: `${destination.label} — ${destination.object}` });
      expect(link).toHaveAttribute('href', destination.href);
      expect(link.tabIndex).toBe(0);
      expect(link.style.left).not.toBe('');
    }
    expect(drawing.getAllByRole('link')).toHaveLength(6);
    expect(view.queryByRole('navigation')).toBeNull();
    expect(view.queryByText('Choose an object to look around.')).toBeNull();
    expect(view.container.querySelectorAll('img')).toHaveLength(2);
    expect(view.container.querySelectorAll('[data-item]')).toHaveLength(0);
    expect(view.getByRole('img')).toHaveAccessibleName(/An open precision case/);
  });
  it('keeps current hotspot copy and destinations when an older asset finishes loading', async () => {
    const view = render(<AnatomyExplorer activeDestination={null} />);
    const links = explorerDestinations.map(destination =>
      view.getByRole('link', { name: `${destination.label} — ${destination.object}` }));
    const olderAsset: ExplorerAsset = {
      ...asset,
      modules: asset.modules.map(module => ({ ...module, label: 'Old label', object: 'Old object', href: '#old-destination' })),
    };
    await act(async () => { pending.forEach(item => item.resolve(olderAsset)); });
    for (const [index, destination] of explorerDestinations.entries()) {
      const link = view.getByRole('link', { name: `${destination.label} — ${destination.object}` });
      expect(link).toBe(links[index]);
      expect(link).toHaveAttribute('href', destination.href);
      expect(link.style.left).toBe(`${asset.modules[index].x / asset.width * 100}%`);
    }
    expect(view.queryByRole('link', { name: /Old label/ })).toBeNull();
  });
  it('ignores the abandoned StrictMode load and removes its observer on unmount', async () => {
    const view = render(<StrictMode><AnatomyExplorer activeDestination="projects" /></StrictMode>);
    await loaded();
    expect(view.container.querySelectorAll('svg')).toHaveLength(1);
    expect(view.container.querySelectorAll('[data-item]')).toHaveLength(6);
    view.unmount();
    expect(disconnected).toHaveBeenCalledTimes(1);
    expect(frames.size).toBe(0);
  });
  it('does not install drawing nodes after unmounting during a load', async () => {
    const view = render(<AnatomyExplorer activeDestination={null} />);
    view.unmount();
    await loaded();
    expect(callback).toBeUndefined();
  });
  it('previews with keyboard focus without changing selection or hash', async () => {
    const view = render(<AnatomyExplorer activeDestination="projects" />);
    await loaded();
    act(() => { visibility(true); });
    const drawing = within(view.getByRole('group', { name: 'Explore the toolbox' }));
    const projects = drawing.getByRole('link', { name: /^Projects —/ });
    const stack = drawing.getByRole('link', { name: /^Stack —/ });
    const hash = window.location.hash;
    act(() => { projects.focus(); fireEvent.keyDown(projects, { key: 'ArrowRight' }); });
    expect(stack).toHaveFocus();
    expect(projects).toHaveAttribute('aria-current', 'location');
    expect(stack).not.toHaveAttribute('aria-current');
    expect(window.location.hash).toBe(hash);
    expect(view.container.querySelector('[data-item="skills.tray"]')).toHaveAttribute('data-on');
    act(() => { fireEvent.keyDown(stack, { key: 'End' }); });
    const contact = drawing.getByRole('link', { name: /^Contact —/ });
    expect(contact).toHaveFocus();
    act(() => { fireEvent.keyDown(contact, { key: 'Home' }); });
    expect(projects).toHaveFocus();
    act(() => { fireEvent.keyDown(projects, { key: 'ArrowLeft' }); });
    expect(contact).toHaveFocus();
    expect(window.location.hash).toBe(hash);
    expect(drawing.getAllByRole('link')).toHaveLength(6);
    view.rerender(<AnatomyExplorer activeDestination="travel" />);
    expect(drawing.getByRole('link', { name: /^Travel —/ })).toHaveAttribute('aria-current', 'location');
    expect(view.container.querySelectorAll('svg')).toHaveLength(1);
  });
  it('activates a drawing destination with Enter or Space after previewing', async () => {
    const view = render(<AnatomyExplorer activeDestination="projects" />);
    const link = view.getByRole('link', { name: /^Travel —/ });
    const activate = mock((event: Event) => { event.preventDefault(); });
    link.addEventListener('click', activate);
    act(() => { link.focus(); });
    expect(activate).not.toHaveBeenCalled();
    act(() => {
      fireEvent.keyDown(link, { key: 'Enter' });
      fireEvent.keyDown(link, { key: ' ' });
    });
    expect(activate).toHaveBeenCalledTimes(2);
    expect(link).toHaveAttribute('href', '#travel');
    await loaded();
    expect(link).toHaveFocus();
    expect(view.container.querySelector('[data-item="travel.tray"]')).toHaveAttribute('data-on');
  });
  it('uses the newest visibility record and cancels RAF when the case leaves view', async () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    const view = render(<AnatomyExplorer activeDestination={null} />);
    await loaded();
    act(() => {
      callback?.([{ isIntersecting: false }, { isIntersecting: true }] as IntersectionObserverEntry[], {} as IntersectionObserver);
      fireEvent.pointerEnter(view.container.querySelector('[data-hotspot="projects"]')!);
    });
    expect(frames.size).toBe(1);
    act(() => { visibility(false); });
    expect(frames.size).toBe(0);
    act(() => { fireEvent.pointerEnter(view.container.querySelector('[data-hotspot="travel"]')!); });
    expect(frames.size).toBe(0);
    view.unmount();
  });
  it('stops when the document is hidden and resumes only while visible', async () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    const descriptor = Object.getOwnPropertyDescriptor(document, 'hidden');
    Object.defineProperty(document, 'hidden', { value: false, configurable: true });
    const view = render(<AnatomyExplorer activeDestination="projects" />);
    try {
      await loaded();
      act(() => { visibility(true); });
      expect(frames.size).toBe(1);
      act(() => {
        Object.defineProperty(document, 'hidden', { value: true, configurable: true });
        document.dispatchEvent(new Event('visibilitychange'));
      });
      expect(frames.size).toBe(0);
      act(() => {
        Object.defineProperty(document, 'hidden', { value: false, configurable: true });
        document.dispatchEvent(new Event('visibilitychange'));
      });
      expect(frames.size).toBe(1);
    } finally {
      view.unmount();
      if (descriptor) Object.defineProperty(document, 'hidden', descriptor);
      else Reflect.deleteProperty(document, 'hidden');
    }
  });
  it('waits eight idle seconds before a tour and keeps the committed destination', async () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    const setTimeout = window.setTimeout;
    const clearTimeout = window.clearTimeout;
    const timers = new Map<number, () => void>();
    let timerID = 100_000;
    window.setTimeout = ((fn: TimerHandler, delay?: number) => {
      if (delay !== 8_000) return setTimeout(fn, delay);
      const id = ++timerID;
      timers.set(id, fn as () => void);
      return id;
    }) as typeof window.setTimeout;
    window.clearTimeout = ((id: number) => {
      if (timers.has(id)) timers.delete(id);
      else clearTimeout(id);
    }) as typeof window.clearTimeout;
    const view = render(<AnatomyExplorer activeDestination="projects" />);
    try {
      await loaded();
      act(() => { visibility(true); });
      const explorer = view.container.querySelector('.anatomy-explorer')!;
      expect(explorer).toHaveAttribute('data-touring', 'false');
      expect(timers.size).toBe(1);
      const hash = window.location.hash;
      act(() => {
        timers.values().next().value?.();
        const callbacks = Array.from(frames.values());
        frames.clear();
        callbacks.forEach(fn => fn(performance.now() + 2_900));
      });
      expect(explorer).toHaveAttribute('data-touring', 'true');
      const drawing = within(view.getByRole('group', { name: 'Explore the toolbox' }));
      expect(drawing.getByRole('link', { name: /^Projects —/ })).toHaveAttribute('aria-current', 'location');
      expect(window.location.hash).toBe(hash);
      act(() => { drawing.getByRole('link', { name: /^Travel —/ }).focus(); });
      expect(explorer).toHaveAttribute('data-touring', 'false');
    } finally {
      view.unmount();
      window.setTimeout = setTimeout;
      window.clearTimeout = clearTimeout;
    }
  });
});
