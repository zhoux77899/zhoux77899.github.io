export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  stars?: number;
}

export interface TravelItem {
  id: string;
  location: string;
  country: string;
  description: string;
  image: string;
  year: string;
  flag: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'education';
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  location: string;
  socialLinks: SocialLink[];
}
