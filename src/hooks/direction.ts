/* Adapted from BoardUI free source (MIT). See licenses/BoardUI-LICENSE.txt. */
import { useLocale } from 'react-aria-components/I18nProvider';

export type Direction = 'ltr' | 'rtl';

/** Match React Aria's locale when measuring directional controls. */
export function useDirection(): Direction {
  return useLocale().direction;
}
