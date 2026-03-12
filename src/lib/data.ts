import type { Project, TravelItem, ExperienceItem, Skill, PersonalInfo } from '@/types';

export const personalInfo: PersonalInfo = {
  name: 'Mingyuan Zhang',
  title: 'Full-stack Developer',
  bio: 'Passionate about technology, focused on creating clean and elegant digital experiences. 5+ years of full-stack development experience, skilled in React, Node.js and cloud-native technologies.',
  avatar: '/assets/images/profile/avatar.jpg',
  email: 'zhangmingyuan@example.com',
  location: 'Shanghai, China',
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com', icon: 'github' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
  ],
};

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Vue.js', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Framer Motion', category: 'frontend' },
  // Backend
  { name: 'Node.js', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'MongoDB', category: 'backend' },
  { name: 'GraphQL', category: 'backend' },
  { name: 'Redis', category: 'backend' },
  // Tools
  { name: 'Git', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'Kubernetes', category: 'tools' },
  { name: 'AWS', category: 'tools' },
  { name: 'CI/CD', category: 'tools' },
  { name: 'Figma', category: 'tools' },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'AI Task Management System',
    description: 'An AI-powered task management app with natural language input, smart categorization and automatic priority sorting.',
    image: '/assets/images/projects/project-1.jpg',
    tags: ['React', 'TypeScript', 'Node.js', 'OpenAI'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: '2',
    title: 'Real-time Collaborative Whiteboard',
    description: 'Online whiteboard with multi-user real-time collaboration, infinite canvas, drawing tools and version history.',
    image: '/assets/images/projects/project-2.jpg',
    tags: ['Next.js', 'Socket.io', 'Canvas API', 'PostgreSQL'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: '3',
    title: 'E-commerce Analytics Platform',
    description: 'Data analytics and visualization platform for e-commerce, with real-time monitoring and smart reporting.',
    image: '/assets/images/projects/project-3.jpg',
    tags: ['Vue.js', 'Python', 'D3.js', 'AWS'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: '4',
    title: 'Personal Knowledge Base',
    description: 'Markdown-based knowledge management with bi-directional links, graph view and full-text search.',
    image: '/assets/images/projects/project-4.jpg',
    tags: ['React', 'Electron', 'SQLite', 'Tailwind CSS'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: '5',
    title: 'Microservice API Gateway',
    description: 'High-performance API gateway with rate limiting, auth, request transformation and observability.',
    image: '/assets/images/projects/project-5.jpg',
    tags: ['Go', 'gRPC', 'Redis', 'Prometheus'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: '6',
    title: 'Mobile Social App',
    description: 'Cross-platform social app with instant messaging, feeds and location sharing.',
    image: '/assets/images/projects/project-6.jpg',
    tags: ['React Native', 'Firebase', 'TypeScript', 'Redux'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
];

export const travelItems: TravelItem[] = [
  {
    id: '1',
    location: 'Kyoto',
    country: 'Japan',
    description: 'Ancient temples and serene gardens, experiencing centuries of culture.',
    image: '/assets/images/travel/kyoto.jpg',
    year: '2024',
    flag: '🇯🇵',
  },
  {
    id: '2',
    location: 'Reykjavik',
    country: 'Iceland',
    description: 'Northern lights and fire-and-ice landscapes, exploring raw nature.',
    image: '/assets/images/travel/iceland.jpg',
    year: '2023',
    flag: '🇮🇸',
  },
  {
    id: '3',
    location: 'Santorini',
    country: 'Greece',
    description: 'White and blue architecture and Aegean sunsets, pure romance.',
    image: '/assets/images/travel/santorini.jpg',
    year: '2023',
    flag: '🇬🇷',
  },
  {
    id: '4',
    location: 'Queenstown',
    country: 'New Zealand',
    description: 'Adventure capital of the southern hemisphere, stunning lakes and mountains.',
    image: '/assets/images/travel/queenstown.jpg',
    year: '2022',
    flag: '🇳🇿',
  },
  {
    id: '5',
    location: 'Banff',
    country: 'Canada',
    description: 'Jewel of the Rockies, emerald lakes and snow-capped peaks.',
    image: '/assets/images/travel/banff.jpg',
    year: '2022',
    flag: '🇨🇦',
  },
  {
    id: '6',
    location: 'Bali',
    country: 'Indonesia',
    description: 'Tropical rainforests and beaches, a place for the soul.',
    image: '/assets/images/travel/bali.jpg',
    year: '2021',
    flag: '🇮🇩',
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'A leading tech company',
    period: '2022 - Present',
    description: 'Led frontend architecture and development for core products, delivered key projects and improved frontend performance by 40%.',
    type: 'work',
  },
  {
    id: '2',
    title: 'Full-stack Developer',
    company: 'A tech startup',
    period: '2020 - 2022',
    description: 'Built product from 0 to 1, owned tech stack and core features; user base grew 300%.',
    type: 'work',
  },
  {
    id: '3',
    title: 'M.S. Computer Science',
    company: 'A leading university',
    period: '2018 - 2020',
    description: 'Research in AI and HCI; published 2 papers at international conferences.',
    type: 'education',
  },
  {
    id: '4',
    title: 'B.S. Software Engineering',
    company: 'A top university',
    period: '2014 - 2018',
    description: 'Software engineering theory and practice; scholarships and programming competition awards.',
    type: 'education',
  },
];

export const travelStats = {
  countries: 12,
  cities: 36,
  moments: 128,
};

export function getSkillCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Tools',
    other: 'Other',
  };
  return labels[category] || category;
}
