import { HugeiconsIcon } from '@hugeicons/react';
import type { HugeiconsIconProps, IconSvgElement } from '@hugeicons/react';
import ArrowDownIconData from '@hugeicons/core-free-icons/ArrowDown01Icon';
import ArrowUpIconData from '@hugeicons/core-free-icons/ArrowUp01Icon';
import BriefcaseIconData from '@hugeicons/core-free-icons/Briefcase01Icon';
import CloseIconData from '@hugeicons/core-free-icons/Cancel01Icon';
import SystemIconData from '@hugeicons/core-free-icons/ComputerIcon';
import HeartIconData from '@hugeicons/core-free-icons/FavouriteIcon';
import GitHubIconData from '@hugeicons/core-free-icons/Github01Icon';
import ExternalLinkIconData from '@hugeicons/core-free-icons/LinkSquare01Icon';
import LocationIconData from '@hugeicons/core-free-icons/Location01Icon';
import MenuIconData from '@hugeicons/core-free-icons/Menu01Icon';
import MoonIconData from '@hugeicons/core-free-icons/Moon02Icon';
import EducationIconData from '@hugeicons/core-free-icons/Mortarboard01Icon';
import SparklesIconData from '@hugeicons/core-free-icons/SparklesIcon';
import SunIconData from '@hugeicons/core-free-icons/Sun03Icon';
import type { ComponentType, Ref } from 'react';

export type HugeiconProps = Omit<HugeiconsIconProps, 'icon'> & {
  ref?: Ref<SVGSVGElement>;
};

export type HugeiconComponent = ComponentType<HugeiconProps> & {
  rtlMirror: boolean;
};

interface HugeiconOptions {
  displayName?: string;
  rtlMirror?: boolean;
}

/** Bind icon data once, preserving the SVG props that BoardUI passes through. */
export function createHugeicon(
  icon: IconSvgElement,
  { displayName = 'Hugeicon', rtlMirror = false }: HugeiconOptions = {},
): HugeiconComponent {
  function BoundHugeicon({ ref, ...props }: HugeiconProps) {
    return <HugeiconsIcon {...props} icon={icon} ref={ref} />;
  }

  BoundHugeicon.displayName = displayName;
  return Object.assign(BoundHugeicon, { rtlMirror });
}

export const MenuIcon = createHugeicon(MenuIconData, { displayName: 'MenuIcon' });
export const CloseIcon = createHugeicon(CloseIconData, { displayName: 'CloseIcon' });
export const ArrowUpIcon = createHugeicon(ArrowUpIconData, { displayName: 'ArrowUpIcon' });
export const ArrowDownIcon = createHugeicon(ArrowDownIconData, { displayName: 'ArrowDownIcon' });
export const ExternalLinkIcon = createHugeicon(ExternalLinkIconData, { displayName: 'ExternalLinkIcon' });
export const GitHubIcon = createHugeicon(GitHubIconData, { displayName: 'GitHubIcon' });
export const SunIcon = createHugeicon(SunIconData, { displayName: 'SunIcon' });
export const MoonIcon = createHugeicon(MoonIconData, { displayName: 'MoonIcon' });
export const SystemIcon = createHugeicon(SystemIconData, { displayName: 'SystemIcon' });
export const LocationIcon = createHugeicon(LocationIconData, { displayName: 'LocationIcon' });
export const BriefcaseIcon = createHugeicon(BriefcaseIconData, { displayName: 'BriefcaseIcon' });
export const EducationIcon = createHugeicon(EducationIconData, { displayName: 'EducationIcon' });
export const HeartIcon = createHugeicon(HeartIconData, { displayName: 'HeartIcon' });
export const SparklesIcon = createHugeicon(SparklesIconData, { displayName: 'SparklesIcon' });
