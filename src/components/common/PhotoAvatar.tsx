import { useState } from "react";
import { Avatar } from "@/components/base/avatar/avatar";

interface PhotoAvatarProps {
  src: string;
  name: string;
  className?: string;
}

export function PhotoAvatar({ src, name, className }: PhotoAvatarProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const hasPhoto = Boolean(src) && failedSource !== src;

  return (
    <span onErrorCapture={() => setFailedSource(src)}>
      <Avatar
        src={hasPhoto ? src : undefined}
        alt={name}
        initials={name.slice(0, 1)}
        className={className}
        role={hasPhoto ? undefined : "img"}
        aria-label={hasPhoto ? undefined : name}
        style={hasPhoto ? undefined : { backgroundColor: "var(--accent)", color: "var(--accent-foreground)" }}
      />
    </span>
  );
}
