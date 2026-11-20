import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { loadFigure } from '@/lib/hairline';
import type { HairlineHandle } from '@/lib/hairline';
interface HairlineFigureProps {
  name: string;
  label: string;
  eager?: boolean;
  className?: string;
}
export function HairlineFigure({ name, label, eager = false, className = '' }: HairlineFigureProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HairlineHandle | undefined>(undefined);
  const touchRef = useRef<{ id: number; x: number; y: number; moved: number; scrollLeft: number } | null>(null);
  const [loadedName, setLoadedName] = useState<string>();
  const ready = loadedName === name;
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const wrapper = host.parentElement;
    // Keep touch from driving the stage's hover handlers while the browser
    // decides whether this contact is a tap, a scroll, or a pinch.
    const isolateTouch = (event: PointerEvent) => {
      if (event.pointerType === 'touch') event.stopPropagation();
    };
    const hoverEvents = ['pointerenter', 'pointerdown', 'pointermove', 'pointerleave'] as const;
    for (const type of hoverEvents) wrapper?.addEventListener(type, isolateTouch, true);
    const cancelMultiTouch = (event: PointerEvent) => {
      if (event.pointerType === 'touch' && !event.isPrimary) touchRef.current = null;
    };
    window.addEventListener('pointerdown', cancelMultiTouch, true);
    let cancelled = false;
    let started = false;
    let handle: HairlineHandle | undefined;
    const start = () => {
      if (started) return;
      started = true;
      void loadFigure(name).then(({ engine, definition }) => {
        if (cancelled) return;
        const svg = engine.mk('svg', { viewBox: '0 0 400 320', 'aria-hidden': 'true' }, host);
        try {
          handle = definition.mount({ stage: host, svg, read: { textContent: 'rest' } }, definition.range[1]);
          handleRef.current = handle;
          setLoadedName(name);
        } catch {
          svg.remove();
        }
      }).catch(() => {
        // Keep the exported rest drawing when interactive code cannot load.
      });
    };
    const observer = !eager && typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) { start(); observer?.disconnect(); }
      }, { rootMargin: '320px' })
      : undefined;
    if (observer) observer.observe(host); else start();
    return () => {
      cancelled = true;
      for (const type of hoverEvents) wrapper?.removeEventListener(type, isolateTouch, true);
      window.removeEventListener('pointerdown', cancelMultiTouch, true);
      observer?.disconnect();
      handle?.destroy();
      handleRef.current = undefined;
      touchRef.current = null;
      host.replaceChildren();
    };
  }, [name, eager]);

  const startTouch = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch' || !event.isPrimary) return;
    touchRef.current = {
      id: event.pointerId, x: event.clientX, y: event.clientY, moved: 0,
      scrollLeft: event.currentTarget.closest<HTMLElement>('[data-project-gallery]')?.scrollLeft ?? 0,
    };
  };
  const moveTouch = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') return;
    const touch = touchRef.current;
    if (touch?.id === event.pointerId) touch.moved = Math.max(touch.moved, Math.hypot(event.clientX - touch.x, event.clientY - touch.y));
  };
  const endTouch = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') return;
    const touch = touchRef.current;
    touchRef.current = null;
    const gallery = event.currentTarget.closest<HTMLElement>('[data-project-gallery]');
    if (!touch || touch.id !== event.pointerId || touch.moved > 8
      || Math.hypot(event.clientX - touch.x, event.clientY - touch.y) > 8
      || Math.abs((gallery?.scrollLeft ?? 0) - touch.scrollLeft) >= 1) return;
    const rect = hostRef.current?.getBoundingClientRect();
    if (rect && rect.width > 0 && rect.height > 0) {
      handleRef.current?.activate?.([(event.clientX - rect.left) * 400 / rect.width, (event.clientY - rect.top) * 320 / rect.height]);
    }
  };
  return (
    <div className={`hairline-figure ${className}`} role="img" aria-label={label}
      onPointerDownCapture={startTouch} onPointerMoveCapture={moveTouch} onPointerUpCapture={endTouch}
      onPointerCancelCapture={(event) => { if (event.pointerType === 'touch') touchRef.current = null; }}>
      <div className={`hairline-rest ${ready ? 'hairline-rest-hidden' : ''}`} aria-hidden="true">
        <img className="hairline-preview-light" src={`${import.meta.env.BASE_URL}hairline/previews/${name}-light.svg`} alt="" loading={eager ? 'eager' : 'lazy'} width="400" height="320" />
        <img className="hairline-preview-dark" src={`${import.meta.env.BASE_URL}hairline/previews/${name}-dark.svg`} alt="" loading={eager ? 'eager' : 'lazy'} width="400" height="320" />
      </div>
      <div ref={hostRef} data-hairline={name} className="hairline-stage" aria-hidden="true" />
    </div>
  );
}
