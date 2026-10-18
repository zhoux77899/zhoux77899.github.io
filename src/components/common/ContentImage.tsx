import { useState } from "react";

interface ContentImageProps {
  src: string;
  alt: string;
  fallback: string;
}

export function ContentImage({ src, alt, fallback }: ContentImageProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);

  if (!src || failedSource === src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full items-center justify-center bg-[var(--sage-soft)] font-display text-5xl font-bold text-[var(--sage-soft-foreground)]"
      >
        <span aria-hidden="true">{fallback}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={800}
      height={450}
      loading="lazy"
      decoding="async"
      onError={() => setFailedSource(src)}
      className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
    />
  );
}