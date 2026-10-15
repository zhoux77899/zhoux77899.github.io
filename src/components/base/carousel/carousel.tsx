/* Adapted from BoardUI free Carousel (MIT). See licenses/BoardUI-LICENSE.txt.
 * https://github.com/BoardUI/boardui/blob/main/components/base/carousel/carousel.tsx
 * Native scroll-snap and DOM measurements are retained; controlled selection,
 * inert endpoint copies and loop rebasing extend the original gallery.
 */
import { Children, cloneElement, isValidElement, useCallback, useEffect, useRef, useState } from 'react';
import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import { Button } from '@/components/base/buttons/button';
import { createHugeicon } from '@/utils/icons';
import PauseIconData from '@hugeicons/core-free-icons/PauseIcon';
import PlayIconData from '@hugeicons/core-free-icons/PlayIcon';

const PauseIcon = createHugeicon(PauseIconData, { displayName: 'PauseIcon' });
const PlayIcon = createHugeicon(PlayIconData, { displayName: 'PlayIcon' });
const rotationDelay = 6_000;

interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  'data-carousel-index'?: number;
  'data-active'?: boolean;
}

interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  children: ReactNode;
  'aria-label': string;
  labels: string[];
  selectedIndex: number;
  onIndexChange: (index: number) => void;
  /** Static copies have no IDs or links, so only canonical cards receive focus. */
  renderCopy: (index: number) => ReactNode;
}

export function CarouselItem({ children, className = '', ...props }: CarouselItemProps) {
  return <div role="group" aria-roledescription="slide" className={`carousel-item ${className}`} {...props}>{children}</div>;
}

function centeredOffset(track: HTMLElement, item: HTMLElement) {
  const trackBounds = track.getBoundingClientRect();
  const itemBounds = item.getBoundingClientRect();
  return track.scrollLeft + itemBounds.left - trackBounds.left - (track.clientWidth - itemBounds.width) / 2;
}

export function Carousel({ children, labels, selectedIndex, onIndexChange, renderCopy, className = '', ...props }: CarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef(selectedIndex);
  const onChangeRef = useRef(onIndexChange);
  const requestRef = useRef<{ index: number; position: number } | undefined>(undefined);
  const settleScrollRef = useRef(() => {});
  const restartRotationRef = useRef(() => {});
  const interactionRef = useRef({ hovered: false, pressed: false, allowControlFocus: false });
  const [rotationPaused, setRotationPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const all = Children.toArray(children).filter(isValidElement<CarouselItemProps>);
  const count = all.length;
  const copyCount = Math.min(2, count);

  const items = useCallback(() => Array.from(trackRef.current?.children ?? []) as HTMLElement[], []);
  const scrollToPosition = useCallback((position: number, instant = false) => {
    const track = trackRef.current;
    const target = items()[position];
    if (!track || !target) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: centeredOffset(track, target), behavior: instant || reduce ? 'instant' : 'smooth' });
  }, [items]);

  useEffect(() => { onChangeRef.current = onIndexChange; }, [onIndexChange]);
  useEffect(() => {
    selectionRef.current = selectedIndex;
    // A control already requested its nearest endpoint copy; let that motion
    // finish before rebasing to the one canonical card.
    if (requestRef.current?.index === selectedIndex) return;
    requestRef.current = { index: selectedIndex, position: selectedIndex + copyCount };
    scrollToPosition(selectedIndex + copyCount, true);
  }, [selectedIndex, copyCount, scrollToPosition]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let width = track.clientWidth;
    let itemWidth = items()[copyCount]?.getBoundingClientRect().width;
    const settle = () => {
      clearTimeout(timer);
      const slides = items();
      if (!slides.length || track.clientWidth === 0) return;
      const request = requestRef.current;
      let position = 0;
      let shortest = Infinity;
      slides.forEach((item, index) => {
        const distance = Math.abs(centeredOffset(track, item) - track.scrollLeft);
        if (distance < shortest) { shortest = distance; position = index; }
      });
      const index = (position - copyCount + count) % count;
      if (request) {
        const atRequestedPosition = Math.abs(centeredOffset(track, slides[request.position]) - track.scrollLeft) <= 2;
        // Hash navigation can reveal the canonical card for the same project
        // while its looping copy is still requested. Accept either physical
        // position once centered, but ignore other cards passed in motion.
        const atEquivalentPosition = shortest <= 2 && index === request.index;
        if (!atRequestedPosition && !atEquivalentPosition) return;
      }
      requestRef.current = undefined;
      if (position < copyCount || position >= count + copyCount) scrollToPosition(index + copyCount, true);
      if (index !== selectionRef.current) {
        selectionRef.current = index;
        onChangeRef.current(index);
      }
    };
    const onScroll = () => { clearTimeout(timer); timer = setTimeout(settle, 140); };
    settleScrollRef.current = settle;
    const interrupt = () => { requestRef.current = undefined; };
    const resize = () => {
      const nextWidth = track.clientWidth;
      const nextItemWidth = items()[copyCount]?.getBoundingClientRect().width;
      if (width === nextWidth && itemWidth === nextItemWidth) return;
      width = nextWidth;
      itemWidth = nextItemWidth;
      clearTimeout(timer);
      const index = selectionRef.current;
      requestRef.current = { index, position: index + copyCount };
      scrollToPosition(index + copyCount, true);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(track);
    if (items()[copyCount]) observer.observe(items()[copyCount]);
    track.addEventListener('scroll', onScroll, { passive: true });
    track.addEventListener('scrollend', settle);
    track.addEventListener('pointerdown', interrupt, { passive: true });
    track.addEventListener('touchstart', interrupt, { passive: true });
    track.addEventListener('wheel', interrupt, { passive: true });
    return () => {
      clearTimeout(timer);
      settleScrollRef.current = () => {};
      observer.disconnect();
      track.removeEventListener('scroll', onScroll);
      track.removeEventListener('scrollend', settle);
      track.removeEventListener('pointerdown', interrupt);
      track.removeEventListener('touchstart', interrupt);
      track.removeEventListener('wheel', interrupt);
    };
  }, [count, copyCount, items, scrollToPosition]);

  const choose = useCallback((index: number, step = 0) => {
    const next = (index + count) % count;
    const track = trackRef.current;
    const slides = items();
    let position = next + copyCount;
    const adjacent = requestRef.current ? requestRef.current.position + step : selectionRef.current + copyCount + step;
    if (step !== 0 && Number(slides[adjacent]?.dataset.carouselIndex) === next) position = adjacent;
    else if (track) {
      let shortest = Infinity;
      slides.forEach((slide, physicalIndex) => {
        if (Number(slide.dataset.carouselIndex) !== next) return;
        const distance = Math.abs(centeredOffset(track, slide) - track.scrollLeft);
        if (distance < shortest) { shortest = distance; position = physicalIndex; }
      });
    }
    requestRef.current = { index: next, position };
    selectionRef.current = next;
    scrollToPosition(position);
    onChangeRef.current(next);
    restartRotationRef.current();
  }, [count, copyCount, items, scrollToPosition]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || count < 2) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = typeof IntersectionObserver === 'undefined';
    let timer: number | undefined;
    const interactions = interactionRef.current;
    let focused = root.contains(document.activeElement)
      && !(interactions.allowControlFocus && document.activeElement?.hasAttribute('data-carousel-rotation'));
    const canRotate = () => visible && !document.hidden && !media.matches && !rotationPaused
      && !interactions.hovered && !interactions.pressed && !focused;
    const restart = () => {
      window.clearTimeout(timer);
      timer = undefined;
      if (!canRotate()) return;
      timer = window.setTimeout(() => {
        timer = undefined;
        if (!canRotate()) return;
        // Never interrupt a native gesture or an unfinished loop transition.
        // An instant recenter with an unchanged offset emits no scrollend.
        if (requestRef.current) settleScrollRef.current();
        if (requestRef.current) { restart(); return; }
        choose(selectionRef.current + 1, 1);
      }, rotationDelay);
    };
    restartRotationRef.current = restart;
    const observer = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(entries => {
      const latest = entries.at(-1);
      if (latest) visible = latest.isIntersecting && latest.intersectionRatio >= .35;
      restart();
    }, { threshold: [0, .35] }) : undefined;
    observer?.observe(root);
    const enter = (event: PointerEvent) => { if (event.pointerType !== 'touch') interactions.hovered = true; restart(); };
    const leave = () => { interactions.hovered = false; restart(); };
    const press = () => { interactions.pressed = true; restart(); };
    const release = () => { interactions.pressed = false; restart(); };
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof Element && event.target.hasAttribute('data-carousel-rotation'))) interactions.allowControlFocus = false;
      focused = !interactions.allowControlFocus;
      restart();
    };
    const blur = (event: FocusEvent) => {
      if (!root.contains(event.relatedTarget as Node | null)) {
        interactions.allowControlFocus = false;
        focused = false;
        restart();
      }
    };
    const motion = () => { setReducedMotion(media.matches); restart(); };
    root.addEventListener('pointerenter', enter);
    root.addEventListener('pointerleave', leave);
    root.addEventListener('pointerdown', press, { passive: true });
    root.addEventListener('focusin', focus);
    root.addEventListener('focusout', blur);
    root.addEventListener('scroll', restart, true);
    root.addEventListener('wheel', restart, { passive: true });
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    document.addEventListener('visibilitychange', restart);
    media.addEventListener('change', motion);
    restart();
    return () => {
      window.clearTimeout(timer);
      restartRotationRef.current = () => {};
      observer?.disconnect();
      root.removeEventListener('pointerenter', enter);
      root.removeEventListener('pointerleave', leave);
      root.removeEventListener('pointerdown', press);
      root.removeEventListener('focusin', focus);
      root.removeEventListener('focusout', blur);
      root.removeEventListener('scroll', restart, true);
      root.removeEventListener('wheel', restart);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
      document.removeEventListener('visibilitychange', restart);
      media.removeEventListener('change', motion);
    };
  }, [choose, count, rotationPaused]);

  useEffect(() => { restartRotationRef.current(); }, [selectedIndex]);
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); choose(selectedIndex + 1, 1); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); choose(selectedIndex - 1, -1); }
    else if (event.key === 'Home') { event.preventDefault(); choose(0); }
    else if (event.key === 'End') { event.preventDefault(); choose(count - 1); }
  };

  return <div ref={rootRef} className={`carousel ${className}`} {...props}>
    <div ref={trackRef} className="carousel-track project-gallery" data-project-gallery tabIndex={0}
      role="region" aria-roledescription="carousel" aria-label={props['aria-label']} onKeyDown={onKeyDown}>
      {Array.from({ length: copyCount }, (_, offset) => count - copyCount + offset).map(index => <CarouselItem key={`before-${index}`} aria-hidden="true" inert data-carousel-copy="true" data-carousel-index={index} data-active={selectedIndex === index}>{renderCopy(index)}</CarouselItem>)}
      {all.map((child, index) => cloneElement(child, { key: child.key ?? index, 'aria-label': `${labels[index]}, ${index + 1} of ${count}`, 'data-carousel-index': index, 'data-active': selectedIndex === index }))}
      {Array.from({ length: copyCount }, (_, index) => <CarouselItem key={`after-${index}`} aria-hidden="true" inert data-carousel-copy="true" data-carousel-index={index} data-active={selectedIndex === index}>{renderCopy(index)}</CarouselItem>)}
    </div>
    <div className="carousel-controls">
      <div className="carousel-dots" role="group" aria-label="Choose a project">
        {labels.map((label, index) => <button key={label} type="button" className="carousel-dot" aria-label={`Show ${label}`}
          aria-current={selectedIndex === index ? 'true' : undefined} onClick={() => choose(index)}><span /></button>)}
      </div>
      <Button variant="primary" size="small" iconOnly data-carousel-rotation
        leadingIcon={rotationPaused || reducedMotion ? PlayIcon : PauseIcon} className="carousel-rotation"
        disabled={reducedMotion} title={reducedMotion ? 'Automatic rotation is off for reduced motion' : undefined}
        aria-label={rotationPaused || reducedMotion ? 'Start automatic project rotation' : 'Pause automatic project rotation'}
        onClick={() => {
          interactionRef.current.allowControlFocus = rotationPaused;
          setRotationPaused(paused => !paused);
        }} />
    </div>
  </div>;
}
