export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth" });
}
