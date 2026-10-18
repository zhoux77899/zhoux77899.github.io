/* Adapted from BoardUI free source (MIT). See licenses/BoardUI-LICENSE.txt. */

/** Only navigation glyphs explicitly marked by the icon adapter mirror in RTL. */
export function directionalIconClass(icon: unknown): string | undefined {
  if (
    icon !== null &&
    (typeof icon === 'function' || typeof icon === 'object') &&
    'rtlMirror' in icon &&
    icon.rtlMirror === true
  ) {
    return 'rtl:rotate-180';
  }

  return undefined;
}
