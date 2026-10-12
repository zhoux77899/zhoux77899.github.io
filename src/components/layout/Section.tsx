import type { ReactNode } from "react";

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
  className = "",
  showPattern = true,
  patternOpacity = 0.2,
  decorativeElements = false,
}: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative scroll-mt-20 overflow-hidden bg-[var(--surface)] py-32 ${className}`}>
      {showPattern ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: patternOpacity,
            backgroundImage: "radial-gradient(circle at 2px 2px, var(--border) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      ) : null}

      {decorativeElements ? (
        <div aria-hidden="true" className="pointer-events-none">
          <div className="absolute top-20 left-10 hidden size-32 rounded-full opacity-10 lg:block" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }} />
          <div className="absolute right-10 bottom-20 hidden size-40 rounded-full opacity-10 lg:block" style={{ background: "radial-gradient(circle, var(--sage) 0%, transparent 70%)" }} />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
