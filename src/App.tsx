import { ThemeProvider } from '@/providers/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { Hero } from '@/components/sections/Hero';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Travel } from '@/components/sections/Travel';
import { Experience } from '@/components/sections/Experience';
import { Publications } from '@/components/sections/Publications';
import { Contact } from '@/components/sections/Contact';
import { MotionConfig } from 'motion/react';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { ExplorerProvider } from '@/providers/ExplorerProvider';
import { ExplorerDock } from '@/components/common/ExplorerDock';

function App() {
  const reduceMotion = useMotionPreference();
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion={reduceMotion ? 'always' : 'never'}>
        <ExplorerProvider>
        <div className="min-h-screen" style={{ backgroundColor: 'var(--surface)' }}>
          <Navbar />
          <main>
            <Hero />
            <Projects />
            <Skills />
            <Experience />
            <Publications />
            <Travel />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
          <ExplorerDock />
        </div>
        </ExplorerProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
