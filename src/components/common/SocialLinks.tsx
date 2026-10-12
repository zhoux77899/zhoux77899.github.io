import { ButtonLink } from "@/components/base/buttons/button";
import { personalInfo } from "@/lib/data";
import { GitHubIcon } from "@/utils/icons";

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className = "" }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {personalInfo.socialLinks.map((link) => (
        <ButtonLink
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="small"
          leadingIcon={GitHubIcon}
          aria-label={link.name}
          className="size-11 rounded-xl p-0"
        />
      ))}
    </div>
  );
}