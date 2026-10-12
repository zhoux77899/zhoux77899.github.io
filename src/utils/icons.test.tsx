import { afterEach, describe, expect, it } from 'bun:test';
import ArrowLeft02Icon from '@hugeicons/core-free-icons/ArrowLeft02Icon';
import { cleanup, render } from '@testing-library/react';
import { createRef } from 'react';
import { IconButton } from '@/components/base/buttons/icon-button';
import { directionalIconClass } from '@/utils/directional-icon';
import { createHugeicon, GitHubIcon, MenuIcon } from '@/utils/icons';

const MirroredArrowIcon = createHugeicon(ArrowLeft02Icon, { rtlMirror: true });

afterEach(cleanup);

describe('Hugeicons adapters', () => {
  it('forwards SVG styling, dimensions, accessible attributes, and the SVG ref', () => {
    const ref = createRef<SVGSVGElement>();
    const { container } = render(
      <MenuIcon
        ref={ref}
        data-testid="menu-icon"
        className="size-5 text-current"
        style={{ color: 'rgb(120, 60, 30)' }}
        size={20}
        strokeWidth={1.75}
        aria-hidden="true"
      />,
    );

    const icon = container.querySelector<SVGSVGElement>('svg[data-testid="menu-icon"]');
    if (!icon) throw new Error('The icon adapter did not render an SVG.');
    expect(icon.tagName.toLowerCase()).toBe('svg');
    expect(ref.current).toBe(icon);
    expect(icon.getAttribute('class')).toBe('size-5 text-current');
    expect(icon.getAttribute('width')).toBe('20');
    expect(icon.getAttribute('height')).toBe('20');
    expect(icon.getAttribute('stroke-width')).toBe('1.75');
    expect(icon.getAttribute('aria-hidden')).toBe('true');
    expect(ref.current?.style.color).toBe('rgb(120, 60, 30)');
  });

  it('preserves an explicit accessible name without forcing the icon to be hidden', () => {
    const { getByLabelText } = render(<GitHubIcon aria-label="GitHub" size="18" />);
    const icon = getByLabelText('GitHub');

    expect(icon.getAttribute('aria-hidden')).toBeNull();
    expect(icon.getAttribute('width')).toBe('18');
    expect(icon.children.length).toBeGreaterThan(0);
  });

  it('renders through a BoardUI icon slot while keeping the native button ref', () => {
    const ref = createRef<HTMLButtonElement>();
    const { container } = render(
      <IconButton icon={MenuIcon} aria-label="Open menu" ref={ref} />,
    );
    const button = container.querySelector<HTMLButtonElement>('button[aria-label="Open menu"]');
    if (!button) throw new Error('The BoardUI icon slot did not render the labeled button.');

    expect(ref.current).toBe(button);
    expect(button.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
    expect(button.querySelector('svg')?.getAttribute('class')).toContain('size-5');
  });

  it('mirrors only explicitly marked navigation components', () => {
    expect(directionalIconClass(MirroredArrowIcon)).toBe('rtl:rotate-180');
    expect(directionalIconClass(MenuIcon)).toBeUndefined();
    expect(directionalIconClass(GitHubIcon)).toBeUndefined();
    expect(directionalIconClass(null)).toBeUndefined();
    expect(directionalIconClass('arrow')).toBeUndefined();
  });
});
