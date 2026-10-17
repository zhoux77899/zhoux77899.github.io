import { useEffect, useRef, useState } from 'react';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { HairlineFigure } from '@/components/common/HairlineFigure';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Section } from '@/components/layout/Section';
import { useExplorer } from '@/hooks/useExplorer';
import { travelItems } from '@/lib/data';
import type { TravelItem } from '@/types';
import { getNavigationOffset } from '@/lib/explorer';
import '@/styles/travel.css';

const legacyAnchors: Record<string, string[]> = {
  'new-zealand': ['travel-1'],
  japan: ['travel-2', 'travel-3'],
};

const illustrationLabels: Record<string, string> = {
  'new-zealand': 'A line-drawn New Zealand landscape with alpine ridges, a coastal road, and an SUV that follows the pointer.',
  japan: 'A line-drawn Japanese city and railway platform. A commuter electric train moves along the rails with the pointer.',
  china: 'A line-drawn Jiangnan garden with a tiled pavilion, moon gate, rocks, and a pond. Its lattice shutters open near the pointer.',
};

const countryCaptions: Record<string, string> = {
  'new-zealand': 'A bend in the road brings the sea back into view, with mountains still close at hand. Between fjords and glaciers, the drive leaves room to look around. Some places make a slower pace feel like the whole point.',
  japan: 'The rails draw a steady line through the city. Through the seasons, the platform keeps its everyday rhythm: a short wait, a train, the streets sliding past the window. There is room to notice ordinary life between one station and the next.',
  china: 'A garden asks for very little hurry. The path slips beneath tiled eaves and through a moon gate; water holds the shapes of roofs and rocks. An open lattice window gives the eye another way through, even when the feet have stopped.',
};

function countryYears(item: TravelItem) {
  if (item.year) return item.year;
  const years = item.records?.flatMap(record => record.year.match(/\d{4}/g) ?? []).map(Number);
  if (!years?.length) return undefined;
  const first = Math.min(...years);
  const last = Math.max(...years);
  return first === last ? String(first) : `${first}–${last}`;
}

export function Travel() {
  const { selectedCountryId } = useExplorer();
  return (
    <Section id="travel" className="travel-section">
      <SectionHeader titleId="travel-title" title="Away from the screen" description="Mountain roads, city railways, and quiet gardens." />
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
    <HairlineFigure name={item.visualId} label={illustrationLabels[item.id]} />
    <div className="country-copy" data-reading={reading ? 'true' : undefined}>
      <span ref={markerRef} className="country-reading-marker" aria-hidden="true" />
      <div className="country-heading">
        <h3 id={`travel-${item.id}`}>{item.country}</h3>
        {countryYears(item) && <span className="country-year">{countryYears(item)}</span>}
      </div>
      <p>{countryCaptions[item.id]}</p>
    </div>
  </article>;
}
