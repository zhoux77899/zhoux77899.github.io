import { Card, Chip } from "@heroui/react";
import type { TravelItem } from "@/types";

interface TravelCardProps {
  item: TravelItem;
}

export function TravelCard({ item }: TravelCardProps) {
  return (
    <Card className="w-full bg-surface overflow-hidden group">
      <div className="overflow-hidden aspect-[4/3]">
        <img
          src={item.image}
          alt={item.location}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <Card.Header>
        <div className="flex items-center gap-2 mb-1">
          <Card.Title className="text-foreground">{item.location}</Card.Title>
        </div>
        <Card.Description className="text-muted">{item.description}</Card.Description>
      </Card.Header>
      <Card.Footer className="flex flex-wrap gap-2">
        <Chip
          size="sm"
          className="bg-[var(--sage-soft)] text-[var(--sage-soft-foreground)]"
          variant="soft"
        >
          {item.country}
        </Chip>
        <Chip
          size="sm"
          className="bg-[var(--sage-soft)] text-[var(--sage-soft-foreground)]"
          variant="soft"
        >
          {item.year}
        </Chip>
      </Card.Footer>
    </Card>
  );
}
