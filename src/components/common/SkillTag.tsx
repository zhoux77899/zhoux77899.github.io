import { Chip } from "@heroui/react";

interface SkillTagProps {
  name: string;
  className?: string;
}

export function SkillTag({ name, className }: SkillTagProps) {
  return (
    <Chip
      className={`bg-[var(--sage-soft)] text-[var(--sage-soft-foreground)] ${className ?? ""}`}
      variant="soft"
    >
      {name}
    </Chip>
  );
}
