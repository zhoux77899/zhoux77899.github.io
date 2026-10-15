import { beforeEach, describe, expect, it, mock } from 'bun:test';
import { StrictMode } from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import type { HairlineDefinition } from '@/lib/hairline';

const pending: Array<(value: { engine: { mk: (tag: string, attrs: Record<string,string>, parent: Element) => SVGElement }; definition: HairlineDefinition }) => void> = [];
mock.module('@/lib/hairline', () => ({
  loadFigure: () => new Promise(resolve => pending.push(resolve)),
}));
const { HairlineFigure } = await import('./HairlineFigure');
const destroy = mock(() => {});
const activate = mock((point: [number, number] | null) => point);
const mount = mock(() => ({ set() {}, destroy, activate }));
function result() {
  return {
    engine: { mk: (tag: string, attrs: Record<string,string>, parent: Element) => {
      const svg=document.createElementNS('http://www.w3.org/2000/svg',tag);
      Object.entries(attrs).forEach(([name,value])=>svg.setAttribute(name,value));
      parent.append(svg); return svg;
    } },
    definition: { name:'explorer',means:'A test drawing.',range:[1,2,3] as [number,number,number],mount },
  };
}
beforeEach(() => { pending.length=0;mount.mockClear();destroy.mockClear();activate.mockClear(); });
describe('HairlineFigure lifecycle',()=>{
  it('ignores the abandoned StrictMode load and disposes the live drawing',async()=>{
    const view=render(<StrictMode><HairlineFigure name="explorer" label="Exploration box" eager /></StrictMode>);
    await act(async()=>{pending.forEach(resolve=>resolve(result()));});
    expect(mount).toHaveBeenCalledTimes(1);
    expect(view.container.querySelectorAll('svg')).toHaveLength(1);
    view.unmount();
    expect(destroy).toHaveBeenCalledTimes(1);
  });
  it('does not mount an illustration after its host has unmounted',async()=>{
    const view=render(<HairlineFigure name="explorer" label="Exploration box" eager />);
    view.unmount();
    await act(async()=>{pending.forEach(resolve=>resolve(result()));});
    expect(mount).not.toHaveBeenCalled();
  });
  it('keeps the drawing mounted across presentation and theme changes',async()=>{
    const view=render(<HairlineFigure name="explorer" label="Exploration box" eager />);
    await act(async()=>{pending.forEach(resolve=>resolve(result()));});
    document.documentElement.dataset.theme='dark';
    view.rerender(<HairlineFigure name="explorer" label="Exploration box" className="alternate" eager />);
    expect(mount).toHaveBeenCalledTimes(1);
    expect(view.container.querySelector('input')).toBeNull();
    expect(view.container.querySelector('button')).toBeNull();
    delete document.documentElement.dataset.theme;
  });
  it('activates a single touch tap in viewBox coordinates without blocking browser gestures', async () => {
    const view = render(<HairlineFigure name="cfgan" label="Reconstruction workbench" eager />);
    await act(async () => { pending.forEach(resolve => resolve(result())); });
    const wrapper = view.container.querySelector<HTMLElement>('.hairline-figure')!;
    const stage = view.container.querySelector<HTMLElement>('.hairline-stage')!;
    stage.getBoundingClientRect = () => ({ left: 20, top: 40, width: 200, height: 160 } as DOMRect);
    const down = new PointerEvent('pointerdown', { bubbles: true, cancelable: true, pointerType: 'touch', pointerId: 1, isPrimary: true, clientX: 70, clientY: 80 });
    fireEvent(wrapper, down);
    expect(down.defaultPrevented).toBe(false);
    fireEvent.pointerUp(wrapper, { pointerType: 'touch', pointerId: 1, isPrimary: true, clientX: 70, clientY: 80 });
    expect(activate).toHaveBeenLastCalledWith([100, 80]);
  });
  it('does not activate after a swipe, cancellation, gallery scrolling or a second finger', async () => {
    const view = render(<div data-project-gallery><HairlineFigure name="cfgan" label="Reconstruction workbench" eager /></div>);
    await act(async () => { pending.forEach(resolve => resolve(result())); });
    const wrapper = view.container.querySelector<HTMLElement>('.hairline-figure')!;
    const stage = view.container.querySelector<HTMLElement>('.hairline-stage')!;
    const gallery = view.container.querySelector<HTMLElement>('[data-project-gallery]')!;
    stage.getBoundingClientRect = () => ({ left: 0, top: 0, width: 400, height: 320 } as DOMRect);
    const start = () => fireEvent.pointerDown(wrapper, { pointerType: 'touch', pointerId: 1, isPrimary: true, clientX: 40, clientY: 50 });
    const end = () => fireEvent.pointerUp(wrapper, { pointerType: 'touch', pointerId: 1, isPrimary: true, clientX: 40, clientY: 50 });
    start();
    fireEvent.pointerMove(wrapper, { pointerType: 'touch', pointerId: 1, clientX: 80, clientY: 50 });
    end();
    start();
    fireEvent.pointerCancel(wrapper, { pointerType: 'touch', pointerId: 1 });
    end();
    start();
    gallery.scrollLeft = 20;
    end();
    start();
    fireEvent.pointerDown(wrapper, { pointerType: 'touch', pointerId: 2, isPrimary: false, clientX: 70, clientY: 50 });
    end();
    expect(activate.mock.calls.every(([point]) => point === null)).toBe(true);
  });
  it('keeps the static preview if mounting the interactive figure fails', async () => {
    const view = render(<HairlineFigure name="cfgan" label="Reconstruction workbench" eager />);
    const loaded = result();
    const failed = { ...loaded, definition: { ...loaded.definition, mount() { throw new Error('Mount failed'); } } };
    await act(async () => { pending.forEach(resolve => resolve(failed)); });
    expect(view.container.querySelector('svg')).toBeNull();
    expect(view.container.querySelector('.hairline-rest')).not.toHaveClass('hairline-rest-hidden');
    expect(view.container.querySelector('img')?.getAttribute('src')).toEndWith('hairline/previews/cfgan-light.svg');
  });
});
