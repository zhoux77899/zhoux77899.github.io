import type { ReactNode } from 'react';
interface SectionProps { id: string; children: ReactNode; className?: string; }
export function Section({ id, children, className = '' }: SectionProps) {
  return <section id={id} aria-labelledby={`${id}-title`} className={`content-section scroll-mt-24 ${className}`}><div className="site-container">{children}</div></section>;
}
