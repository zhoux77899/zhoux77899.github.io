import { Github, Linkedin, Twitter } from "lucide-react";
import type { SocialLink } from "@/types";
import { socialLinks as defaultLinks } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
};

interface SocialLinksProps {
  links?: SocialLink[];
  className?: string;
}

export function SocialLinks({ links, className }: SocialLinksProps) {
  const data = links ?? defaultLinks;

  return (
    <div className={`flex gap-2 ${className ?? ""}`}>
      {data.map((link) => {
        const Icon = iconMap[link.icon] ?? Github;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className="rounded-full text-foreground hover:bg-surface inline-flex items-center justify-center min-w-10 w-10 h-10 transition-colors"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
