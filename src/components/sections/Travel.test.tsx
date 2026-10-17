import { beforeEach, describe, expect, it } from 'bun:test';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { ExplorerProvider } from '@/providers/ExplorerProvider';
import { useExplorer } from '@/hooks/useExplorer';
import { setMediaQuery } from '@/test/media';
import { travelItems } from '@/content';
import { Travel } from './Travel';

beforeEach(() => { window.history.replaceState({}, '', '/'); });

async function showTravel() {
  render(<ExplorerProvider><Travel /></ExplorerProvider>);
  await act(async () => {
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
  });
}

function CountrySelection() {
  const { selectCountry } = useExplorer();
  return <button onClick={() => selectCountry('china')}>Select China</button>;
}

function readingObservers() {
  const originalObserver = globalThis.IntersectionObserver;
  const header = document.documentElement.style.getPropertyValue('--header-height');
  const viewport = Object.getOwnPropertyDescriptor(window, 'innerWidth');
  const records: ReadingObserver[] = [];
  class ReadingObserver implements IntersectionObserver {
    readonly root = null;
    readonly scrollMargin = '0px';
    readonly rootMargin: string;
    readonly thresholds: number[];
    readonly observed = new Set<Element>();
    readonly active = new Set<Element>();
    disconnected = false;
    constructor(readonly callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      this.rootMargin = options?.rootMargin ?? '';
      this.thresholds = typeof options?.threshold === 'number' ? [options.threshold] : options?.threshold ?? [0];
      records.push(this);
    }
    observe(target: Element) { this.observed.add(target); this.active.add(target); }
    unobserve(target: Element) { this.active.delete(target); }
    disconnect() { this.active.clear(); this.disconnected = true; }
    takeRecords() { return []; }
    emit(target: Element, visible: boolean) {
      this.callback([{ target, isIntersecting: visible, intersectionRatio: visible ? 1 : 0 } as IntersectionObserverEntry], this);
    }
  }
  Object.defineProperty(globalThis, 'IntersectionObserver', { configurable: true, value: ReadingObserver });
  return {
    records,
    markerObservers: () => records.filter(observer => [...observer.observed].some(target => target.classList.contains('country-reading-marker'))),
    viewport(width: number, headerHeight: number) {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: width });
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    },
    reading(country: string, visible: boolean) {
      const marker = screen.getByRole('article', { name: country }).querySelector('.country-reading-marker')!;
      const observer = [...records].reverse().find(item => item.active.has(marker));
      if (!observer) throw new Error(`${country}'s reading marker was not observed.`);
      observer.emit(marker, visible);
    },
    restore() {
      Object.defineProperty(globalThis, 'IntersectionObserver', { configurable: true, value: originalObserver });
      if (header) document.documentElement.style.setProperty('--header-height', header);
      else document.documentElement.style.removeProperty('--header-height');
      if (viewport) Object.defineProperty(window, 'innerWidth', viewport);
      else Reflect.deleteProperty(window, 'innerWidth');
    },
  };
}

function countryCopy(country: string) {
  return screen.getByRole('article', { name: country }).querySelector('.country-copy')!;
}

describe('Travel', () => {
  it('reads the displayed story and illustration label from the country content', async () => {
    const country = travelItems.find(item => item.id === 'japan')!;
    const description = country.description;
    const illustrationLabel = country.illustrationLabel;
    try {
      country.description = 'A different story beside the railway.';
      country.illustrationLabel = 'A railway illustration with a new description.';
      await showTravel();
      const article = screen.getByRole('article', { name: country.country });
      expect(within(article).getByText(country.description)).toBeInTheDocument();
      expect(within(article).getByRole('img', { name: country.illustrationLabel })).toBeInTheDocument();
    } finally {
      country.description = description;
      country.illustrationLabel = illustrationLabel;
    }
  });

  it('shows country headings and known years without city or region metadata', async () => {
    await showTravel();
    const countries = screen.getAllByRole('article');
    expect(countries).toHaveLength(3);
    const nz = screen.getByRole('article', { name: 'New Zealand' });
    expect(within(nz).getByText('2025')).toBeInTheDocument();
    const japan = screen.getByRole('article', { name: 'Japan' });
    expect(within(japan).getByText('2018–2022')).toBeInTheDocument();
    expect(within(japan).queryByRole('list')).not.toBeInTheDocument();
    const china = screen.getByRole('article', { name: 'China' });
    expect(china.textContent).not.toMatch(/20\d{2}/);
    for (const country of countries) {
      expect(country.textContent).not.toMatch(/South Island|Honshu|Kyushu|Suzhou|Nanjing/);
      expect(within(country).queryByRole('link')).not.toBeInTheDocument();
    }
    expect(screen.getByRole('heading', { name: 'New Zealand' })).toHaveAttribute('id', 'travel-new-zealand');
    expect(screen.getByRole('heading', { name: 'Japan' })).toHaveAttribute('id', 'travel-japan');
    expect(screen.getByRole('heading', { name: 'China' })).toHaveAttribute('id', 'travel-china');
    expect(screen.queryByText(/saved moments/)).not.toBeInTheDocument();
    expect(document.getElementById('travel-1')).toBeInTheDocument();
    expect(document.getElementById('travel-2')).toBeInTheDocument();
    expect(document.getElementById('travel-3')).toBeInTheDocument();
  });

  it('preserves country and legacy deep links while country titles stay plain text', async () => {
    window.history.replaceState({}, '', '#travel-japan');
    await showTravel();
    expect(screen.getByRole('article', { name: 'Japan' })).toHaveAttribute('data-selected', 'true');
    await act(async () => {
      window.history.replaceState({}, '', '#travel-china');
      fireEvent(window, new HashChangeEvent('hashchange'));
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    });
    expect(screen.getByRole('article', { name: 'China' })).toHaveAttribute('data-selected', 'true');
    expect(screen.getByRole('article', { name: 'Japan' })).not.toHaveAttribute('data-selected');
    await act(async () => {
      window.history.replaceState({}, '', '#travel-1');
      fireEvent(window, new PopStateEvent('popstate'));
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    });
    expect(screen.getByRole('article', { name: 'New Zealand' })).toHaveAttribute('data-selected', 'true');
    expect(screen.getByRole('article', { name: 'China' })).not.toHaveAttribute('data-selected');
  });

  it('activates all three dividers together in a wide reading row without coupling them to selection', () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    const io = readingObservers();
    io.viewport(1440, 64);
    const view = render(<ExplorerProvider><Travel /><CountrySelection /></ExplorerProvider>);
    try {
      const names = ['New Zealand', 'Japan', 'China'];
      expect(io.markerObservers()).toHaveLength(3);
      names.forEach(country => { expect(countryCopy(country)).not.toHaveAttribute('data-reading'); });
      act(() => { names.forEach(country => io.reading(country, true)); });
      names.forEach(country => { expect(countryCopy(country)).toHaveAttribute('data-reading', 'true'); });
      fireEvent.click(screen.getByRole('button', { name: 'Select China' }));
      expect(screen.getByRole('article', { name: 'China' })).toHaveAttribute('data-selected', 'true');
      expect(screen.getByRole('article', { name: 'New Zealand' })).not.toHaveAttribute('data-selected');
      names.forEach(country => { expect(countryCopy(country)).toHaveAttribute('data-reading', 'true'); });
      act(() => { names.forEach(country => io.reading(country, false)); });
      names.forEach(country => { expect(countryCopy(country)).not.toHaveAttribute('data-reading'); });
      expect(screen.getByRole('article', { name: 'China' })).toHaveAttribute('data-selected', 'true');
    } finally { view.unmount(); io.restore(); }
  });

  it('updates each stacked divider independently while scrolling forward and backward', () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    const io = readingObservers();
    io.viewport(390, 56);
    const view = render(<ExplorerProvider><Travel /><CountrySelection /></ExplorerProvider>);
    try {
      act(() => { io.reading('New Zealand', true); });
      expect(countryCopy('New Zealand')).toHaveAttribute('data-reading', 'true');
      expect(countryCopy('Japan')).not.toHaveAttribute('data-reading');
      expect(countryCopy('China')).not.toHaveAttribute('data-reading');
      act(() => { io.reading('New Zealand', false); io.reading('Japan', true); });
      expect(countryCopy('New Zealand')).not.toHaveAttribute('data-reading');
      expect(countryCopy('Japan')).toHaveAttribute('data-reading', 'true');
      act(() => { io.reading('Japan', false); io.reading('China', true); });
      expect(countryCopy('Japan')).not.toHaveAttribute('data-reading');
      expect(countryCopy('China')).toHaveAttribute('data-reading', 'true');
      act(() => { io.reading('China', false); io.reading('Japan', true); });
      fireEvent.click(screen.getByRole('button', { name: 'Select China' }));
      expect(countryCopy('Japan')).toHaveAttribute('data-reading', 'true');
      expect(countryCopy('China')).not.toHaveAttribute('data-reading');
      act(() => { io.reading('Japan', false); io.reading('New Zealand', true); });
      expect(countryCopy('Japan')).not.toHaveAttribute('data-reading');
      expect(countryCopy('New Zealand')).toHaveAttribute('data-reading', 'true');
    } finally { view.unmount(); io.restore(); }
  });

  it('updates the reading region after the header changes height and disconnects observers on unmount', () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    const io = readingObservers();
    io.viewport(1440, 64);
    const view = render(<ExplorerProvider><Travel /></ExplorerProvider>);
    try {
      const desktopObservers = io.markerObservers();
      expect(desktopObservers).toHaveLength(3);
      act(() => { io.viewport(390, 56); fireEvent(window, new Event('resize')); });
      desktopObservers.forEach(observer => { expect(observer.disconnected).toBe(true); });
      const phoneObservers = io.markerObservers().filter(observer => !observer.disconnected);
      expect(phoneObservers).toHaveLength(3);
      phoneObservers.forEach(observer => { expect(observer.rootMargin).not.toBe(desktopObservers[0].rootMargin); });
      act(() => { io.reading('Japan', true); });
      expect(countryCopy('Japan')).toHaveAttribute('data-reading', 'true');
      view.unmount();
      expect(io.records.every(observer => observer.disconnected && observer.active.size === 0)).toBe(true);
    } finally { view.unmount(); io.restore(); }
  });
});
