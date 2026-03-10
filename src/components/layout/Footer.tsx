import { scrollToSection } from "@/lib/utils";
import { SocialLinks } from "@/components/common/SocialLinks";

const footerLinks = [
  { id: "projects", label: "项目" },
  { id: "experience", label: "经历" },
  { id: "contact", label: "联系" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-6">
            {footerLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                className="text-muted hover:text-foreground transition-colors text-sm"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <SocialLinks />
        </div>
        <p className="mt-8 text-center text-muted text-sm">
          © {year} Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
