/* BoardUI free source (MIT). See licenses/BoardUI-LICENSE.txt. */
import { sortCx } from "@/utils/cx";

export const linkButtonStyles = sortCx({
  base: [
    "inline-flex items-center justify-center gap-1 whitespace-nowrap",
    "font-sans select-none cursor-pointer rounded-sm",
    "underline-offset-3 hover:underline",
    "transition-colors duration-150 ease-[ease]",
    "outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border-focus-ring",
    "disabled:cursor-not-allowed disabled:no-underline aria-disabled:cursor-not-allowed aria-disabled:no-underline",
  ].join(" "),

  size: {
    medium: "text-body-medium",
    small: "text-body-medium",
    xs: "text-caption-1-semibold",
  },

  icon: {
    medium: "size-5 shrink-0",
    small: "size-[18px] shrink-0",
    xs: "size-3.5 shrink-0",
  },

  variant: {
    // Hover keeps the resting color — the underline is the hover cue; only
    // the press darkens.
    primary: [
      "text-accent-600 active:text-accent-800",
      "disabled:text-text-tertiary aria-disabled:text-text-tertiary",
    ].join(" "),
    secondary: [
      "text-text-secondary active:text-text-primary",
      "disabled:text-text-tertiary aria-disabled:text-text-tertiary",
    ].join(" "),
  },
});
