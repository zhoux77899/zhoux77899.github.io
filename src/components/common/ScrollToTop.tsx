import { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      size="sm"
      onPress={scrollToTop}
      className="fixed bottom-8 right-8 rounded-full w-12 h-12 p-0 min-w-0 shadow-lg z-50"
      style={{
        backgroundColor: 'var(--accent)',
        color: 'var(--accent-foreground)',
      }}
      aria-label="返回顶部"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
