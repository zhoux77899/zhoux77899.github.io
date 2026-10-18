import { en } from './en.ts';
import type { SiteContent } from './types.ts';
import type { SkillCategory } from '../types/index.ts';

const locales = { en } satisfies Record<string, SiteContent>;

export type Locale = keyof typeof locales;
export type { RichTextPart, SiteContent } from './types.ts';
export const defaultLocale: Locale = 'en';

/** Locale selection is explicit; URL routing and language switching can be added later. */
export function getContent(locale: Locale = defaultLocale): SiteContent {
  return locales[locale];
}

export const content: SiteContent = getContent();

export const {
  githubUrl,
  orcidUrl,
  personalInfo,
  publications,
  skills,
  projects,
  contributions,
  travelItems,
  experienceItems,
} = content;

export function getSkillCategoryLabel(category: SkillCategory): string {
  return content.skillCategories[category];
}
