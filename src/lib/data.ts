import type { Project, TravelItem, ExperienceItem, Skill, PersonalInfo } from '@/types';

export const personalInfo: PersonalInfo = {
  name: 'Ruri',
  title: 'Developer at Huawei',
  bio: 'Developer at Huawei. Public repos on GitHub.',
  avatar: 'https://avatars.githubusercontent.com/u/33858552?v=4',
  email: '',
  location: '',
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/zhoux77899', icon: 'github' },
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
    id: '1137495162',
    title: 'claude-code-insights',
    description: 'A daily-updated collection of insights for the Claude Code ecosystem, automatically tracking the most popular and active Claude Code repositories.',
    image: '',
    tags: ['TypeScript', 'claude-code', 'claude-code-plugin', 'claude-plugins'],
    demoUrl: 'https://zhoux77899.github.io/claude-code-insights/',
    githubUrl: 'https://github.com/zhoux77899/claude-code-insights',
    stars: 0,
  },
  {
    id: '1175085692',
    title: 'zhoux77899.github.io',
    description: 'Personal portfolio site.',
    image: '',
    tags: [],
    githubUrl: 'https://github.com/zhoux77899/zhoux77899.github.io',
    stars: 0,
  },
  {
    id: '1002828735',
    title: 'vllm-ascend',
    description: 'Community maintained hardware plugin for vLLM on Ascend',
    image: '',
    tags: ['C++'],
    demoUrl: 'https://vllm-ascend.readthedocs.io',
    githubUrl: 'https://github.com/zhoux77899/vllm-ascend',
    stars: 2,
  },
  {
    id: '1075804899',
    title: 'CFGAN',
    description: 'CFGAN: Cross-Filter Generative Adversarial Network Framework for Microscopy Image Processing',
    image: '',
    tags: ['Python'],
    githubUrl: 'https://github.com/zhoux77899/CFGAN',
    stars: 1,
  },
  {
    id: '235524794',
    title: 'WFS-Receiver',
    description: 'A modified Thorlabs wavefront sensor data receiver.',
    image: '',
    tags: ['C'],
    githubUrl: 'https://github.com/zhoux77899/WFS-Receiver',
    stars: 1,
  },
  {
    id: '232763574',
    title: 'Wavefront-Data-Transfer',
    description: 'Transfer Thorlabs wavefront sensor data to Holoeye PLUTO spatial light modulator',
    image: '',
    tags: ['Python'],
    githubUrl: 'https://github.com/zhoux77899/Wavefront-Data-Transfer',
    stars: 0,
  },
  {
    id: '661',
    title: 'maple-font',
    description: 'Maple Mono: Open source monospace font with round corner, ligatures and Nerd-Font for IDE and terminal.',
    image: '',
    tags: ['Python'],
    demoUrl: 'https://font.subf.dev',
    githubUrl: 'https://github.com/zhoux77899/maple-font',
    stars: 0,
  },
  {
    id: '267023866',
    title: 'SimLight',
    description: 'A tool helping for optical simulation.',
    image: '',
    tags: ['Python'],
    githubUrl: 'https://github.com/zhoux77899/SimLight',
    stars: 0,
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
