import { describe, expect, it } from 'bun:test';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { SegmentedControl, SegmentedControlItem } from './segmented-control';

describe('SegmentedControl integration', () => {
  it('forwards native refs and caller styles through the React Aria controls', () => {
    const groupRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLButtonElement>();
    const { container } = render(
      <SegmentedControl
        ref={groupRef}
        variant="plain"
        aria-label="Display mode"
        defaultSelectedKeys={new Set(['light'])}
        className="rounded-xl"
        style={{ minHeight: 42 }}
      >
        <SegmentedControlItem id="light" ref={itemRef}>Light</SegmentedControlItem>
        <SegmentedControlItem id="dark">Dark</SegmentedControlItem>
      </SegmentedControl>,
    );

    expect(groupRef.current).toBe(container.querySelector<HTMLDivElement>('[aria-label="Display mode"]'));
    expect(itemRef.current).toBe(container.querySelector<HTMLButtonElement>('button'));
    expect(groupRef.current?.className).toContain('rounded-xl');
    expect(groupRef.current?.style.minHeight).toBe('42px');
  });

  it('preserves callback-ref cleanup without rebinding it on a rerender', () => {
    let cleanups = 0;
    let bindings = 0;
    const ref = (node: HTMLDivElement | null) => {
      if (!node) return;
      bindings += 1;
      return () => { cleanups += 1; };
    };
    const control = (className: string) => (
      <SegmentedControl ref={ref} variant="plain" aria-label="Theme" className={className}>
        <SegmentedControlItem id="light">Light</SegmentedControlItem>
      </SegmentedControl>
    );
    const { rerender, unmount } = render(control('w-full'));
    rerender(control('w-auto'));

    expect(bindings).toBe(1);
    expect(cleanups).toBe(0);
    unmount();
    expect(cleanups).toBe(1);
  });
});
