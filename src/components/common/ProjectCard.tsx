import { Button, Card, Chip } from "@heroui/react";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <Card className="w-full bg-surface overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-default overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      <Card.Header>
        <Card.Title className="text-foreground">{project.title}</Card.Title>
        <Card.Description className="text-muted line-clamp-2">
          {project.description}
        </Card.Description>
      </Card.Header>
      <Card.Footer className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Chip
            key={tag}
            size="sm"
            className="bg-[var(--sage-soft)] text-[var(--sage-soft-foreground)]"
            variant="soft"
          >
            {tag}
          </Chip>
        ))}
        <div className="flex gap-2 ml-auto">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Demo"
              className="inline-flex items-center justify-center min-w-8 h-8 rounded-md text-foreground hover:bg-default"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center justify-center min-w-8 h-8 rounded-md text-foreground hover:bg-default"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          <Button
            size="sm"
            className="bg-[var(--accent)] text-[var(--accent-foreground)]"
            onPress={() => onSelect?.(project)}
          >
            Details
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}
