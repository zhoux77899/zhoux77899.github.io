import { useState } from "react";
import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import { ThemeToggle } from "@/components/common/ThemeToggle";
const navItems = [
  { id: "hero", label: "首页" },
  { id: "skills", label: "技能" },
  { id: "projects", label: "项目" },
  { id: "travel", label: "旅行" },
  { id: "experience", label: "经历" },
  { id: "contact", label: "联系" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur border-b border-border">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <a
          href="#hero"
          className="text-foreground font-semibold"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
            setMobileOpen(false);
          }}
        >
          Portfolio
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className="text-foreground hover:bg-surface"
              onPress={() => scrollToSection(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            isIconOnly
            className="md:hidden min-w-10 w-10 h-10"
            aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
            onPress={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="justify-start text-foreground"
                onPress={() => {
                  scrollToSection(item.id);
                  setMobileOpen(false);
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
