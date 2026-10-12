import { Chip } from "@/components/base/badges/chip";
import { StaggerContainer, StaggerItem } from "@/components/common/AnimatedSection";
import { ContentImage } from "@/components/common/ContentImage";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Section } from "@/components/layout/Section";
import { travelItems, travelStats } from "@/lib/data";
import { LocationIcon } from "@/utils/icons";

export function Travel() {
  return (
    <Section id="travel">
      <SectionHeader titleId="travel-title" label="Adventures" title="Travel" description={`${travelStats.countries} countries · ${travelStats.cities} cities · ${travelStats.moments} moments`} />
      <StaggerContainer className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1} threshold={0.05}>
        {travelItems.map((item) => (
          <StaggerItem key={item.id} animation="fade-up">
            <article aria-labelledby={`travel-${item.id}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] transition-transform duration-300 motion-safe:hover:-translate-y-2">
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <ContentImage src={item.image} alt={`${item.location}, ${item.country}`} fallback={item.flag} />
                <span className="absolute top-4 right-4 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-[var(--accent-foreground)]">{item.year}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-lg bg-[var(--accent-soft)] p-1.5">
                    <LocationIcon className="size-4 text-[var(--accent)]" aria-hidden="true" />
                  </span>
                  <h3 id={`travel-${item.id}`} className="font-display text-xl font-semibold text-[var(--foreground)]">{item.location}</h3>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>
                <div className="mt-auto flex gap-2">
                  <Chip variant="caption" color="lime" className="border border-[var(--sage)] bg-transparent text-[var(--sage)]">{item.country}</Chip>
                </div>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
