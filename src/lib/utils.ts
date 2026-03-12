import { type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ');
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
}

export function getSkillCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Tools',
    other: 'Other',
  };
  return labels[category] || category;
}
