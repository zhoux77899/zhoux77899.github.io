import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  showPattern?: boolean;
  patternOpacity?: number;
  decorativeElements?: boolean;
}

export function Section({
  id,
  children,
  className = '',
  showPattern = true,
  patternOpacity = 0.2,
  decorativeElements = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-32 relative overflow-hidden ${className}`}
      style={{ backgroundColor: 'var(--surface)' }}
    >
      {/* Background Pattern */}
      {showPattern && (
        <div
          className="absolute inset-0"
          style={{
            opacity: patternOpacity,
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--border) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {/* Decorative Elements */}
      {decorativeElements && (
        <>
          <div
            className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-10 hidden lg:block"
            style={{
              background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-20 right-10 w-40 h-40 rounded-full opacity-10 hidden lg:block"
            style={{
              background: 'radial-gradient(circle, var(--sage) 0%, transparent 70%)',
            }}
          />
        </>
      )}

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
}
