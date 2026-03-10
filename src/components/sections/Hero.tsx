import { Avatar, Button } from "@heroui/react";
import { scrollToSection } from "@/lib/utils";
import { personalInfo } from "@/lib/data";
import { SocialLinks } from "@/components/common/SocialLinks";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-20"
    >
      <div className="text-center max-w-2xl">
        <Avatar className="w-32 h-32 mx-auto mb-6 ring-4 ring-surface">
          <Avatar.Image src={personalInfo.avatar} alt={personalInfo.name} />
          <Avatar.Fallback className="bg-[var(--accent)] text-[var(--accent-foreground)] text-2xl">
            {personalInfo.name.slice(0, 2)}
          </Avatar.Fallback>
        </Avatar>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
          你好，我是 {personalInfo.name}
        </h1>
        <p className="text-[var(--accent)] text-xl font-medium mb-4">
          {personalInfo.title}
        </p>
        <p className="text-muted mb-8 leading-relaxed">
          {personalInfo.bio}
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <SocialLinks />
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            className="bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90"
            size="lg"
            onPress={() => scrollToSection("projects")}
          >
            查看作品
          </Button>
          <Button
            variant="outline"
            className="border-border text-foreground"
            size="lg"
            onPress={() => scrollToSection("contact")}
          >
            联系我
          </Button>
        </div>
      </div>
    </section>
  );
}
