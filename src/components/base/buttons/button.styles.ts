/* BoardUI free source (MIT). See licenses/BoardUI-LICENSE.txt. */
import { sortCx } from "@/utils/cx";

export const buttonStyles = sortCx({
  base: [
    "inline-flex items-center justify-center gap-0.5 whitespace-nowrap overflow-hidden",
    "font-sans select-none cursor-pointer",
    "button-press-motion",
    "outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border-focus-ring",
    "disabled:cursor-not-allowed aria-disabled:cursor-not-allowed",
  ].join(" "),

  // Base shape per size (used when label is present OR medium icon-only).
  size: {
    medium: "h-9 rounded-2lg p-2 text-body-medium",
    small:  "h-8 rounded-lg px-2 py-1.5 text-body-medium",
    xs:     "h-6 rounded-sm px-2 text-caption-1-semibold",
  },

  // Icon-only override:
  //   Medium → keep p-2; w expands from content (8+20+8 = 36) → square.
  //   Small  → Figma forces 32×32 even though 8+18+8=34, so we hard-set size-8
  //            and zero the padding; the inner flex centers the 18px icon.
  //   Xs     → forces 24×24, content-centered — used for the calendar
  //            template's edit-icon buttons (timezone/participants/reminder).
  iconOnlySize: {
    medium: "",                // base size already produces 36×36 with a 20px icon
    small:  "size-8 p-0",      // hard 32×32, content-centered
    xs:     "size-6 p-0",      // hard 24×24, content-centered
  },

  icon: {
    medium: "size-5 shrink-0",        // 20px
    small:  "size-[18px] shrink-0",   // 18px
    xs:     "size-3.5 shrink-0",      // 14px
  },

  label: {
    medium: "inline-flex items-center justify-center px-1 shrink-0",    // px=4
    small:  "inline-flex items-center justify-center px-0.5 shrink-0",  // px=2
    xs:     "inline-flex items-center justify-center px-0.5 shrink-0",  // px=2
  },

  variant: {
    primary: [
      "bg-button-primary text-text-white shadow-xs",
      "disabled:text-button-primary-disabled-foreground disabled:shadow-none",
      "aria-disabled:text-button-primary-disabled-foreground aria-disabled:shadow-none",
    ].join(" "),
    danger: [
      "bg-button-danger text-text-white shadow-xs",
      "disabled:text-foreground-disabled-danger disabled:shadow-none",
      "aria-disabled:text-foreground-disabled-danger aria-disabled:shadow-none",
    ].join(" "),
    secondary: [
      "bg-background-primary-default text-text-primary",
      "border border-border-button-default shadow-xs",
      "hover:bg-background-primary-hover  hover:border-border-button-hover",
      "active:bg-background-primary-active active:border-border-button-active",
      "disabled:bg-background-primary-disabled disabled:border-border-button-default disabled:text-text-tertiary disabled:shadow-none",
      "aria-disabled:bg-background-primary-disabled aria-disabled:border-border-button-default aria-disabled:text-text-tertiary aria-disabled:shadow-none",
    ].join(" "),
    ghost: [
      "bg-button-ghost-background text-button-ghost-foreground",
      "hover:bg-button-ghost-hover active:bg-button-ghost-active",
      "disabled:bg-button-ghost-disabled disabled:text-button-ghost-disabled-foreground disabled:shadow-none",
      "aria-disabled:bg-button-ghost-disabled aria-disabled:text-button-ghost-disabled-foreground aria-disabled:shadow-none",
    ].join(" "),
  },
});
