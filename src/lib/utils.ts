import { type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ');
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
  });
}

export function getSkillCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    frontend: '前端开发',
    backend: '后端开发',
    tools: '工具',
    other: '其他',
  };
  return labels[category] || category;
}
