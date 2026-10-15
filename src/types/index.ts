export interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  tags: string[];
  visualId: string;
  links: ContentLink[];
}

export interface ContentLink {
  name: string;
  url: string;
}

export interface Contribution {
  title: string;
  description: string;
  links: ContentLink[];
}

export interface TravelItem {
  id: string;
  location: string;
  country: string;
  description: string;
  visualId: string;
  year?: string;
  flag: string;
  records?: { location: string; year: string }[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'education';
}

export type SkillCategory = 'ai' | 'science' | 'systems' | 'web' | 'tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  projects: string[];
  source?: ContentLink;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'external';
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  footerBio: string;
  avatar: string;
  socialLinks: SocialLink[];
}
