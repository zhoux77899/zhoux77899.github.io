import { useEffect, useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent } from 'react';
import { explorerDestinations, loadExplorer } from '@/lib/anatomy';
import type { ExplorerAsset, ExplorerDestination } from '@/lib/anatomy';
import { explorerHotspots } from '@/lib/anatomy/hotspots';
import { followLift, TOUR_WAIT_MS, tourDestination } from '@/lib/anatomy/motion';
import { content } from '@/content';
import '@/styles/anatomy.css';

interface AnatomyExplorerProps {
  activeDestination: ExplorerDestination | null;
  className?: string;
  compactFrame?: boolean;
}
interface ExplorerController {
  preview(destination: ExplorerDestination | null): void;
  takeOver(): void;
  release(): void;
  update(destination: ExplorerDestination | null): void;
}

export function AnatomyExplorer({ activeDestination, className = '', compactFrame = false }: AnatomyExplorerProps) {
  const [asset, setAsset] = useState<ExplorerAsset>();
  const preview = useRef<ExplorerDestination | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const art = useRef<SVGGElement>(null);
  const controller = useRef<ExplorerController | null>(null);
  const active = useRef(activeDestination);

  useEffect(() => {
    active.current = activeDestination;
    controller.current?.update(activeDestination);
  }, [activeDestination]);

  useEffect(() => {
    let cancelled = false;
    void loadExplorer().then(value => {
      if (!cancelled) setAsset(value);
    }).catch(() => {
      // The static drawing and its six real navigation hotspots remain usable.
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const node = root.current;
    const group = art.current;
    if (!node || !group || !asset) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const entries = asset.items.map(item => ({ item, node: group.querySelector<SVGGElement>(`[data-item="${item.id}"]`) }));
    const lift = new Map<ExplorerDestination, number>(asset.modules.map(item => [item.id, 0]));
    let current: ExplorerDestination | null = active.current;
    let hovered: ExplorerDestination | null = preview.current;
    let frame = 0;
    let timer = 0;
    let last = 0;
    let visible = typeof IntersectionObserver === 'undefined';
    let held = hovered !== null || node.contains(document.activeElement);
    let touring = false;
    let started = 0;
    let previousOrder = entries.map(entry => entry.item.id).join('|');
    let disposed = false;
    const canRun = () => visible && !document.hidden && !disposed;
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
    };
    const clearTourTimer = () => {
      window.clearTimeout(timer);
      timer = 0;
    };
    const paint = (target: ExplorerDestination | null, dt: number, reduced = media.matches) => {
      let moving = false;
      for (const m of asset.modules) {
        const was = lift.get(m.id) ?? 0;
        const next = followLift(was, m.id === target ? 1 : 0, dt, reduced);
        lift.set(m.id, next);
        moving = moving || next !== (m.id === target ? 1 : 0);
      }
      for (const { item, node: part } of entries) {
        if (!part) continue;
        const amount = item.piece === 'stand' ? 0 : lift.get(item.piece) ?? 0;
        if (amount) part.setAttribute('transform', `translate(${item.offset[0] * amount} ${item.offset[1] * amount})`);
        else part.removeAttribute('transform');
        if (item.piece === target) part.dataset.on = '';
        else delete part.dataset.on;
      }
      const sorted = entries.slice().sort((a, b) =>
        a.item.key + a.item.lift * (lift.get(a.item.piece as ExplorerDestination) ?? 0)
        - b.item.key - b.item.lift * (lift.get(b.item.piece as ExplorerDestination) ?? 0));
      const order = sorted.map(entry => entry.item.id).join('|');
      if (order !== previousOrder) {
        const fragment = document.createDocumentFragment();
        sorted.forEach(entry => { if (entry.node) fragment.append(entry.node); });
        group.append(fragment);
        previousOrder = order;
      }
      node.dataset.preview = target ?? '';
      node.dataset.touring = touring ? 'true' : 'false';
      return moving;
    };
    const tick = (now: number) => {
      frame = 0;
      if (!canRun()) { last = 0; return; }
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;
      const target = touring && !media.matches ? tourDestination(now - started) : hovered ?? current;
      const moving = paint(target, dt);
      if (moving || (touring && !media.matches)) frame = requestAnimationFrame(tick);
      else last = 0;
    };
    const wake = () => {
      if (!canRun()) return;
      if (media.matches) { stop(); paint(hovered ?? current, 0, true); return; }
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const scheduleTour = () => {
      clearTourTimer();
      if (!canRun() || held || media.matches) return;
      timer = window.setTimeout(() => {
        if (!canRun() || held || media.matches) return;
        touring = true;
        started = performance.now();
        wake();
      }, TOUR_WAIT_MS);
    };
    const takeOver = () => {
      held = true;
      touring = false;
      node.dataset.touring = 'false';
      clearTourTimer();
      wake();
    };
    const release = () => {
      held = false;
      hovered = null;
      wake();
      scheduleTour();
    };
    controller.current = {
      takeOver, release,
      preview(destination) { takeOver(); hovered = destination; wake(); },
      update(destination) { current = destination; touring = false; wake(); if (!held) scheduleTour(); },
    };
    const observer = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(changes => {
        const newest = changes.at(-1);
        if (!newest) return;
        visible = newest.isIntersecting;
        if (canRun()) { wake(); scheduleTour(); }
        else { touring = false; stop(); clearTourTimer(); }
      }, { rootMargin: '120px 0px' })
      : undefined;
    observer?.observe(node);
    const visibility = () => {
      if (canRun()) { wake(); scheduleTour(); }
      else { touring = false; stop(); clearTourTimer(); }
    };
    const stillness = () => {
      touring = false;
      stop();
      clearTourTimer();
      if (media.matches) paint(hovered ?? current, 0, true);
      else { wake(); scheduleTour(); }
    };
    document.addEventListener('visibilitychange', visibility);
    media.addEventListener('change', stillness);
    paint(hovered ?? current, 0, true);
    if (canRun()) scheduleTour();
    return () => {
      disposed = true;
      stop();
      clearTourTimer();
      observer?.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      media.removeEventListener('change', stillness);
      controller.current = null;
    };
  }, [asset]);

  const previewTo = (destination: ExplorerDestination | null) => {
    preview.current = destination;
    controller.current?.preview(destination);
  };
  const leave = () => {
    if (root.current?.contains(document.activeElement)) return;
    preview.current = null;
    controller.current?.release();
  };
  const blur = (event: FocusEvent<HTMLDivElement>) => {
    if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
    preview.current = null;
    controller.current?.release();
  };
  const keydown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    const links = Array.from(root.current?.querySelectorAll<HTMLAnchorElement>('.anatomy-hotspot-link') ?? []);
    const index = links.indexOf(event.currentTarget);
    if (event.key === 'Escape') { preview.current = null; controller.current?.preview(null); return; }
    let next: number | undefined;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % links.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + links.length - 1) % links.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = links.length - 1;
    else if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click(); }
    if (next !== undefined) { event.preventDefault(); links[next]?.focus(); }
  };
  const frame = asset ?? explorerHotspots;
  // The cover removes only empty projection margins. Solids and motion keep their
  // audited coordinates; hotspots and fallback images use the same crop.
  const viewport = compactFrame ? { x: 75, y: 65, width: 650, height: 520 }
    : { x: 0, y: 0, width: frame.width, height: frame.height };
  const hotspots = explorerDestinations.map(destination => {
    const { x, y, rx, ry } = asset?.modules.find(item => item.id === destination.id)
      ?? explorerHotspots.modules.find(item => item.id === destination.id)!;
    return { ...destination, x, y, rx, ry };
  });
  return (
    <div ref={root} className={`anatomy-explorer ${compactFrame ? 'anatomy-explorer-cover' : ''} ${className}`} onBlur={blur}>
      <div className="anatomy-explorer-stage" role="group" aria-label={content.explorer.groupLabel} onPointerEnter={() => controller.current?.takeOver()} onPointerLeave={leave} onPointerUp={event => {
        if (event.pointerType === 'touch') { preview.current = null; controller.current?.release(); }
      }} onPointerCancel={() => { preview.current = null; controller.current?.release(); }}>
        <img className={`anatomy-explorer-preview anatomy-explorer-preview-light ${asset ? 'anatomy-explorer-preview-hidden' : ''}`} src={`${import.meta.env.BASE_URL}anatomy/explorer-light.svg`} alt="" aria-hidden="true" width="800" height="640" fetchPriority="high" />
        <img className={`anatomy-explorer-preview anatomy-explorer-preview-dark ${asset ? 'anatomy-explorer-preview-hidden' : ''}`} src={`${import.meta.env.BASE_URL}anatomy/explorer-dark.svg`} alt="" aria-hidden="true" width="800" height="640" />
        <svg viewBox={`${viewport.x} ${viewport.y} ${viewport.width} ${viewport.height}`} role="img" aria-label={content.explorer.illustrationLabel}>
          <g ref={art} aria-hidden="true" dangerouslySetInnerHTML={{ __html: asset?.body ?? '' }} />
        </svg>
        {hotspots.map(item => <a key={item.id} className="anatomy-hotspot-link" data-hotspot={item.id} href={item.href} aria-label={content.explorer.hotspotLabel(item.label, item.object)}
          aria-current={activeDestination === item.id ? 'location' : undefined}
          style={{ left: `${(item.x - viewport.x) / viewport.width * 100}%`, top: `${(item.y - viewport.y) / viewport.height * 100}%`, width: `${item.rx * 2 / viewport.width * 100}%`, height: `${item.ry * 2 / viewport.height * 100}%` }}
          onFocus={() => previewTo(item.id)} onKeyDown={keydown}
          onPointerEnter={() => previewTo(item.id)} onPointerLeave={leave} onPointerDown={() => previewTo(item.id)}>
          <span className="anatomy-hotspot-label" aria-hidden="true">{item.label}</span>
        </a>)}
      </div>
    </div>
  );
}
