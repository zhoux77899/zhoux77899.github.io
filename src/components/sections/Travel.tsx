import { travelItems, travelStats } from "@/lib/data";
import { TravelCard } from "@/components/common/TravelCard";
import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/common/AnimatedSection";

export function Travel() {
  return (
    <AnimatedSection id="travel" className="py-16 sm:py-24 bg-background">
      <Container>
        <h2 className="text-3xl font-bold text-foreground mb-4">旅行足迹</h2>
        <p className="text-muted mb-12">
          已探索 {travelStats.countries} 个国家 · {travelStats.cities} 个城市 · 收藏{" "}
          {travelStats.moments} 个瞬间
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelItems.map((item) => (
            <TravelCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
