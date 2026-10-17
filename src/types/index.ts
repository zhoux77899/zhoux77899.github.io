export type SectionId = 'hero' | 'projects' | 'skills' | 'experience' | 'publications' | 'travel' | 'contact';

export type ExplorerDestination = 'projects' | 'skills' | 'experience' | 'open-source' | 'travel' | 'contact';

export interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  tags: string[];
  visualId: string;
  links: ProjectLink[];
}

export interface ContentLink {
  name: string;
  url: string;
}

export interface ProjectLink extends ContentLink {
  kind: 'source' | 'releases' | 'website';
}

export interface Publication {
  doi: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  volume: string;
  issue: string;
  pages: string;
}

export interface Contribution {
  title: string;
  description: string;
  featuredPullRequests: number[];
  links: ContentLink[];
}

export interface TravelItem {
  id: string;
  location: string;
  country: string;
  description: string;
  illustrationLabel: string;
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
  id: string;
  name: string;
  category: SkillCategory;
  projects: string[];
  source?: ContentLink;
}

export interface SocialLink {
  id: 'github' | 'x' | 'orcid';
  name: string;
  url: string;
  handle: string;
  contactLabel: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  footerBio: string;
  avatar: string;
  socialLinks: SocialLink[];
}
