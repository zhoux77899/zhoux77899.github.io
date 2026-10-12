import { AnimatedSection } from './AnimatedSection';

interface SectionHeaderProps {
  titleId?: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  titleId,
  label,
  title,
  description,
  className = '',
}: SectionHeaderProps) {
  return (
    <AnimatedSection animation="fade-up" className={className}>
      <div className="text-center mb-16">
        <span
          className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
          style={{
            backgroundColor: 'var(--accent-soft)',
            color: 'var(--accent)',
          }}
        >
          {label}
        </span>
        <h2
          id={titleId}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          style={{ color: 'var(--foreground)' }}
        >
          {title}
        </h2>
        {description && (
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            {description}
          </p>
        )}
      </div>
    </AnimatedSection>
  );
}
