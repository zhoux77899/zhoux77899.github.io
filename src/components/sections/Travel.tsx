import { useEffect, useRef, useState } from 'react';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { HairlineFigure } from '@/components/common/HairlineFigure';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Section } from '@/components/layout/Section';
import { useExplorer } from '@/hooks/useExplorer';
import { content, travelItems } from '@/content';
import type { TravelItem } from '@/types';
import { getNavigationOffset } from '@/lib/explorer';
import '@/styles/travel.css';

const legacyAnchors: Record<string, string[]> = {
  'new-zealand': ['travel-1'],
  japan: ['travel-2', 'travel-3'],
};

function countryYears(item: TravelItem) {
  if (item.year) return item.year;
  const years = item.records?.flatMap(record => record.year.match(/\d{4}/g) ?? []).map(Number);
  if (!years?.length) return undefined;
  const first = Math.min(...years);
  const last = Math.max(...years);
  return content.sections.travel.yearRange(first, last);
}

export function Travel() {
  const { selectedCountryId } = useExplorer();
  return (
    <Section id="travel" className="travel-section">
      <SectionHeader titleId="travel-title" title={content.sections.travel.title} description={content.sections.travel.description} />
      <div className="country-grid">
        {travelItems.map((item, index) => <AnimatedSection key={item.id} className="country-reveal" delay={index * 0.06}>
          <CountryCard item={item} selected={selectedCountryId === item.id} />
        </AnimatedSection>)}
      </div>
    </Section>
  );
}

function CountryCard({ item, selected }: { item: TravelItem; selected: boolean }) {
  const markerRef = useRef<HTMLSpanElement>(null);
  const [reading, setReading] = useState(false);
  useEffect(() => {
    const marker = markerRef.current;
    if (!marker || typeof IntersectionObserver === 'undefined') return;
    let observer: IntersectionObserver | undefined;
    let headerHeight = -1;
    let readingBottom = -1;
    const observe = () => {
      const nextHeight = getNavigationOffset('header');
      const nextBottom = Math.round(window.innerHeight * 0.18);
      if (observer && headerHeight === nextHeight && readingBottom === nextBottom) return;
      headerHeight = nextHeight;
      readingBottom = nextBottom;
      observer?.disconnect();
      observer = new IntersectionObserver(entries => {
        const entry = entries.at(-1);
        if (entry) setReading(entry.isIntersecting);
      }, { rootMargin: `-${headerHeight}px 0px -${readingBottom}px 0px`, threshold: 0 });
      observer.observe(marker);
    };
    observe();
    window.addEventListener('resize', observe);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', observe);
    };
  }, []);

  return <article className="country-card" data-country-id={item.id}
    data-selected={selected ? 'true' : undefined} aria-labelledby={`travel-${item.id}`}>
    {(legacyAnchors[item.id] ?? []).map(id => <span key={id} id={id} className="country-legacy-anchor" aria-hidden="true" />)}
    <HairlineFigure name={item.visualId} label={item.illustrationLabel} />
    <div className="country-copy" data-reading={reading ? 'true' : undefined}>
      <span ref={markerRef} className="country-reading-marker" aria-hidden="true" />
      <div className="country-heading">
        <h3 id={`travel-${item.id}`}>{item.country}</h3>
        {countryYears(item) && <span className="country-year">{countryYears(item)}</span>}
      </div>
      <p>{item.description}</p>
    </div>
  </article>;
}
