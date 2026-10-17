import type { ReactNode } from 'react';
interface SectionProps { id: string; children: ReactNode; className?: string; contained?: boolean; }
export function Section({ id, children, className = '', contained = true }: SectionProps) {
  return <section id={id} aria-labelledby={`${id}-title`} className={`content-section ${className}`}>{contained ? <div className="site-container">{children}</div> : children}</section>;
}
