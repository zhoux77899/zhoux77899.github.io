interface SectionHeaderProps { titleId?: string; title: string; description?: string; }
export function SectionHeader({ titleId, title, description }: SectionHeaderProps) {
  return <div className="section-heading"><h2 id={titleId}>{title}</h2>{description ? <p>{description}</p> : null}</div>;
}
