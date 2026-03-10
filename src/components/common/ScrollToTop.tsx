import { Button } from "@heroui/react";
import { ArrowUp } from "lucide-react";
import { useScrollPastThreshold } from "@/hooks/useScrollPosition";

export function ScrollToTop() {
  const show = useScrollPastThreshold(400);

  if (!show) return null;

  return (
    <Button
      variant="secondary"
      isIconOnly
      className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg min-w-12 w-12 h-12 bg-surface border border-border"
      aria-label="返回顶部"
      onPress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
