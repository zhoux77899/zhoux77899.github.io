import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setMediaQuery } from '@/test/media';
import { AnimatedRevealGroup, AnimatedRevealItem, AnimatedSection } from './AnimatedSection';

const nativeAnimate = Object.getOwnPropertyDescriptor(Element.prototype, 'animate');
// Happy DOM cancels delayed WAAPI promises differently from browsers. Exercise
// Motion's real frame-driven animation path so final style checks stay reliable.
beforeAll(() => { Reflect.deleteProperty(Element.prototype, 'animate'); });
afterAll(() => { if (nativeAnimate) Object.defineProperty(Element.prototype, 'animate', nativeAnimate); });

function revealObservers() {
  const original = globalThis.IntersectionObserver;
  const observers: ManualObserver[] = [];
  class ManualObserver implements IntersectionObserver {
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
      observers.push(this);
    }
    observe(target: Element) { this.observed.add(target); this.active.add(target); }
    unobserve(target: Element) { this.active.delete(target); }
    disconnect() { this.active.clear(); this.disconnected = true; }
    takeRecords() { return []; }
    emit(target: Element, intersecting: boolean, ratio = intersecting ? 1 : 0) {
      this.callback([{ target, isIntersecting: intersecting, intersectionRatio: ratio } as IntersectionObserverEntry], this);
    }
  }
  Object.defineProperty(globalThis, 'IntersectionObserver', { configurable: true, value: ManualObserver });
  return {
    observers,
    for(target: Element) {
      const observer = observers.find(item => item.observed.has(target));
      if (!observer) throw new Error('The reveal target was not observed.');
      return observer;
    },
    restore() { Object.defineProperty(globalThis, 'IntersectionObserver', { configurable: true, value: original }); },
  };
}

async function expectHidden(element: HTMLElement, distance = 32) {
  await waitFor(() => {
    expect(element.style.opacity).toBe('0');
    expect(element.style.transform).toContain(`translateY(${distance}px)`);
  });
}

async function expectRevealed(element: HTMLElement) {
  await waitFor(() => {
    expect(element.style.opacity).toBe('1');
    expect(element.style.transform).toBe('none');
  });
}

describe('AnimatedSection', () => {
  it('reveals after entering the reading area once and stays visible when scrolling away', async () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    const io = revealObservers();
    const view = render(<AnimatedSection duration={0}><h2>Research notes</h2></AnimatedSection>);
    try {
      const element = screen.getByRole('heading', { name: 'Research notes' }).parentElement!;
      await expectHidden(element);
      const observer = io.for(element);
      act(() => { observer.emit(element, true, 0.05); });
      await expectHidden(element);
      act(() => { observer.emit(element, true, 0.5); });
      await expectRevealed(element);
      expect(observer.disconnected).toBe(true);
      // A callback already queued before disconnect must not hide revealed content.
      act(() => { observer.emit(element, false); });
      await expectRevealed(element);
    } finally { view.unmount(); io.restore(); }
  });

  it('reveals immediately when reduced motion is enabled, including during a delayed entrance', async () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    const io = revealObservers();
    const view = render(<AnimatedSection delay={60}><h2>Publications</h2></AnimatedSection>);
    try {
      const element = screen.getByRole('heading', { name: 'Publications' }).parentElement!;
      await expectHidden(element);
      const observer = io.for(element);
      act(() => { observer.emit(element, true); });
      act(() => { setMediaQuery('(prefers-reduced-motion: reduce)', true); });
      await expectRevealed(element);
      expect(observer.disconnected).toBe(true);
    } finally { view.unmount(); io.restore(); }
  });

  it('shows reduced-motion content without waiting for an observer or animation delay', async () => {
    const io = revealObservers();
    const view = render(<AnimatedSection delay={60}><p>Available research</p></AnimatedSection>);
    try {
      await expectRevealed(screen.getByText('Available research').parentElement!);
      expect(io.observers).toHaveLength(0);
    } finally { view.unmount(); io.restore(); }
  });

  it('reveals a focused control immediately even with a pending animation delay', async () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    const io = revealObservers();
    const view = render(<AnimatedSection delay={60}><button>Open source</button></AnimatedSection>);
    try {
      const button = screen.getByRole('button', { name: 'Open source' });
      const element = button.parentElement!;
      await expectHidden(element);
      act(() => { button.focus(); });
      expect(button).toHaveFocus();
      await expectRevealed(element);
    } finally { view.unmount(); io.restore(); }
  });

  it('immediately shows a section containing the initial deep-link target', async () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    window.history.replaceState(null, '', '#paper-title');
    const io = revealObservers();
    const view = render(<AnimatedSection delay={60}><h2 id="paper-title">Published paper</h2></AnimatedSection>);
    try {
      await expectRevealed(screen.getByRole('heading', { name: 'Published paper' }).parentElement!);
      expect(io.observers).toHaveLength(0);
    } finally { view.unmount(); io.restore(); }
  });

  it.each(['hashchange', 'popstate'] as const)('reveals only the main heading for %s section navigation', async event => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    const io = revealObservers();
    const view = render(<section id="projects" aria-labelledby="projects-title">
      <AnimatedSection delay={60}><h2 id="projects-title">Things I make</h2></AnimatedSection>
      <AnimatedSection delay={60}><p>Working in the open</p></AnimatedSection>
    </section>);
    try {
      const heading = screen.getByRole('heading', { name: 'Things I make' }).parentElement!;
      const contribution = screen.getByText('Working in the open').parentElement!;
      await expectHidden(heading);
      await expectHidden(contribution);
      act(() => {
        window.history.replaceState(null, '', '#projects');
        window.dispatchEvent(new Event(event));
      });
      await expectRevealed(heading);
      await expectHidden(contribution);
    } finally { view.unmount(); io.restore(); }
  });

  it('keeps lower content observed on an initial section deep link', async () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    window.history.replaceState(null, '', '#projects');
    const io = revealObservers();
    const view = render(<section id="projects" aria-labelledby="projects-title">
      <AnimatedSection delay={60}><h2 id="projects-title">Things I make</h2></AnimatedSection>
      <AnimatedSection delay={60}><p>More project work</p></AnimatedSection>
    </section>);
    try {
      await expectRevealed(screen.getByRole('heading', { name: 'Things I make' }).parentElement!);
      const lower = screen.getByText('More project work').parentElement!;
      await expectHidden(lower);
      expect(io.for(lower).active.has(lower)).toBe(true);
    } finally { view.unmount(); io.restore(); }
  });

  it('reveals for a same-hash anchor click even when no navigation event fires', async () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    const io = revealObservers();
    const view = render(<><a href="#research-title">Read research</a><AnimatedSection delay={60}><h2 id="research-title">Research</h2></AnimatedSection></>);
    try {
      const element = screen.getByRole('heading', { name: 'Research' }).parentElement!;
      await expectHidden(element);
      window.history.replaceState(null, '', '#research-title');
      fireEvent.click(screen.getByRole('link', { name: 'Read research' }));
      await expectRevealed(element);
    } finally { view.unmount(); io.restore(); }
  });

  it('keeps content visible when IntersectionObserver is unavailable', async () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    const original = globalThis.IntersectionObserver;
    Object.defineProperty(globalThis, 'IntersectionObserver', { configurable: true, value: undefined });
    const view = render(<AnimatedSection delay={60}><p>Research remains readable</p></AnimatedSection>);
    try {
      await expectRevealed(screen.getByText('Research remains readable').parentElement!);
    } finally {
      view.unmount();
      Object.defineProperty(globalThis, 'IntersectionObserver', { configurable: true, value: original });
    }
  });

  it('disconnects pending observation on unmount', () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    const io = revealObservers();
    const view = render(<AnimatedSection><p>Pending research</p></AnimatedSection>);
    try {
      const observer = io.for(screen.getByText('Pending research').parentElement!);
      expect(observer.disconnected).toBe(false);
      view.unmount();
      expect(observer.disconnected).toBe(true);
      expect(observer.active.size).toBe(0);
    } finally { view.unmount(); io.restore(); }
  });
});

describe('AnimatedRevealGroup', () => {
  it('animates canonical content and loop copies together without transforming the layout layers', async () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    const io = revealObservers();
    const view = render(<AnimatedRevealGroup className="gallery">
      <div className="carousel-track"><article className="carousel-item">
        <AnimatedRevealItem distance={40} duration={0.3}><p>Canonical art</p></AnimatedRevealItem>
        <AnimatedRevealItem distance={40} duration={0.3}><p>Loop copy art</p></AnimatedRevealItem>
        <AnimatedRevealItem delay={0.08} duration={0.3}><p>Project copy</p></AnimatedRevealItem>
      </article></div>
    </AnimatedRevealGroup>);
    try {
      const group = view.container.querySelector<HTMLElement>('.gallery')!;
      const art = screen.getByText('Canonical art').parentElement!;
      const loop = screen.getByText('Loop copy art').parentElement!;
      const copy = screen.getByText('Project copy').parentElement!;
      await expectHidden(art, 40);
      await expectHidden(loop, 40);
      await expectHidden(copy);
      expect(io.observers).toHaveLength(1);
      const observer = io.for(group);
      act(() => { observer.emit(group, true, 0.05); });
      await expectHidden(art, 40);
      act(() => { observer.emit(group, true, 0.5); });
      await waitFor(() => {
        const artOpacity = Number(art.style.opacity);
        const loopOpacity = Number(loop.style.opacity);
        expect(artOpacity).toBeGreaterThan(0);
        expect(artOpacity).toBeLessThan(1);
        expect(loopOpacity).toBeGreaterThan(0);
        expect(Math.abs(loopOpacity - artOpacity)).toBeLessThan(0.05);
        expect(art.style.transform).not.toBe('none');
      }, { interval: 10 });
      for (const layer of [group, group.firstElementChild!, group.firstElementChild!.firstElementChild!]) {
        expect((layer as HTMLElement).style.transform).toBe('');
        expect((layer as HTMLElement).style.opacity).toBe('');
      }
      await expectRevealed(art);
      await expectRevealed(loop);
      await expectRevealed(copy);
      expect(observer.disconnected).toBe(true);
      act(() => { observer.emit(group, false); observer.emit(group, true); });
      await expectRevealed(art);
      await expectRevealed(loop);
    } finally { view.unmount(); io.restore(); }
  });

  it('reveals all children immediately when focus interrupts a delayed group entrance', async () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    const io = revealObservers();
    const view = render(<AnimatedRevealGroup className="gallery">
      <AnimatedRevealItem delay={60}><button>Read project</button></AnimatedRevealItem>
      <AnimatedRevealItem delay={60}><p>Duplicate project content</p></AnimatedRevealItem>
    </AnimatedRevealGroup>);
    try {
      const group = view.container.querySelector<HTMLElement>('.gallery')!;
      const button = screen.getByRole('button', { name: 'Read project' });
      const first = button.parentElement!;
      const second = screen.getByText('Duplicate project content').parentElement!;
      await expectHidden(first);
      await expectHidden(second);
      const observer = io.for(group);
      act(() => { observer.emit(group, true); });
      act(() => { button.focus(); });
      await expectRevealed(first);
      await expectRevealed(second);
      expect(button).toHaveFocus();
      expect(observer.disconnected).toBe(true);
    } finally { view.unmount(); io.restore(); }
  });

  it('cancels every child delay when reduced motion is enabled during entrance', async () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    const io = revealObservers();
    const view = render(<AnimatedRevealGroup className="gallery">
      <AnimatedRevealItem distance={40} duration={0.75} delay={60}><p>Project drawing</p></AnimatedRevealItem>
      <AnimatedRevealItem duration={0.65} delay={60}><p>Project description</p></AnimatedRevealItem>
    </AnimatedRevealGroup>);
    try {
      const group = view.container.querySelector<HTMLElement>('.gallery')!;
      const art = screen.getByText('Project drawing').parentElement!;
      const copy = screen.getByText('Project description').parentElement!;
      await expectHidden(art, 40);
      await expectHidden(copy);
      const observer = io.for(group);
      act(() => { observer.emit(group, true); });
      act(() => { setMediaQuery('(prefers-reduced-motion: reduce)', true); });
      await expectRevealed(art);
      await expectRevealed(copy);
      expect(observer.disconnected).toBe(true);
    } finally { view.unmount(); io.restore(); }
  });

  it('shows reduced-motion groups without creating an observer', async () => {
    const io = revealObservers();
    const view = render(<AnimatedRevealGroup><AnimatedRevealItem delay={60}><p>Readable project</p></AnimatedRevealItem></AnimatedRevealGroup>);
    try {
      await expectRevealed(screen.getByText('Readable project').parentElement!);
      expect(io.observers).toHaveLength(0);
    } finally { view.unmount(); io.restore(); }
  });

  it('shows a specific initial project deep link without waiting for its group entrance', async () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    window.history.replaceState(null, '', '#project-cfgan');
    const io = revealObservers();
    const view = render(<AnimatedRevealGroup><AnimatedRevealItem delay={60}><h3 id="project-cfgan">CFGAN</h3></AnimatedRevealItem></AnimatedRevealGroup>);
    try {
      await expectRevealed(screen.getByRole('heading', { name: 'CFGAN' }).parentElement!);
      expect(io.observers).toHaveLength(0);
    } finally { view.unmount(); io.restore(); }
  });

  it('does not skip a gallery entrance when its containing section is the navigation target', async () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    window.history.replaceState(null, '', '#projects');
    const io = revealObservers();
    const view = render(<section id="projects" aria-labelledby="projects-title">
      <AnimatedSection><h2 id="projects-title">Things I make</h2></AnimatedSection>
      <AnimatedRevealGroup className="gallery"><AnimatedRevealItem><p>Gallery contents</p></AnimatedRevealItem></AnimatedRevealGroup>
    </section>);
    try {
      await expectRevealed(screen.getByRole('heading', { name: 'Things I make' }).parentElement!);
      await expectHidden(screen.getByText('Gallery contents').parentElement!);
      const group = view.container.querySelector<HTMLElement>('.gallery')!;
      expect(io.for(group).active.has(group)).toBe(true);
    } finally { view.unmount(); io.restore(); }
  });

  it('disconnects group observation and ignores queued callbacks after unmount', async () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false);
    const io = revealObservers();
    const view = render(<AnimatedRevealGroup className="gallery"><AnimatedRevealItem><p>Pending gallery</p></AnimatedRevealItem></AnimatedRevealGroup>);
    try {
      const group = view.container.querySelector<HTMLElement>('.gallery')!;
      await expectHidden(screen.getByText('Pending gallery').parentElement!);
      const observer = io.for(group);
      view.unmount();
      expect(observer.disconnected).toBe(true);
      expect(observer.active.size).toBe(0);
      expect(() => { observer.emit(group, true); }).not.toThrow();
    } finally { view.unmount(); io.restore(); }
  });
});
