import { ThemeProvider } from '@/providers/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { Hero } from '@/components/sections/Hero';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Travel } from '@/components/sections/Travel';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';
import { MotionConfig } from 'motion/react';
import { useMotionPreference } from '@/hooks/useMotionPreference';

function App() {
  const reduceMotion = useMotionPreference();
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion={reduceMotion ? 'always' : 'never'}>
        <div className="min-h-screen" style={{ backgroundColor: 'var(--surface)' }}>
          <Navbar />
          <main>
            <Hero />
            <Skills />
            <Projects />
            <Travel />
            <Experience />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
