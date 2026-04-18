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
    id: '1075804899',
    title: 'CFGAN',
    description: 'CFGAN: Cross-Filter Generative Adversarial Network Framework for Microscopy Image Processing',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    tags: ['Python'],
    githubUrl: 'https://github.com/zhoux77899/CFGAN',
    stars: 1,
  },
  {
    id: '1002828735',
    title: 'vllm-ascend',
    description: 'Community maintained hardware plugin for vLLM on Ascend',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    tags: ['C++'],
    demoUrl: 'https://vllm-ascend.readthedocs.io',
    githubUrl: 'https://github.com/zhoux77899/vllm-ascend',
    stars: 2,
  },
  {
    id: '1137495162',
    title: 'claude-code-insights',
    description: 'A daily-updated collection of insights for the Claude Code ecosystem, automatically tracking the most popular and active Claude Code repositories.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    tags: ['TypeScript'],
    demoUrl: 'https://zhoux77899.github.io/claude-code-insights/',
    githubUrl: 'https://github.com/zhoux77899/claude-code-insights',
    stars: 0,
  },
];

export const travelItems: TravelItem[] = [
  {
    id: '1',
    location: 'Kyoto',
    country: 'Japan',
    description: 'Ancient temples and serene gardens, experiencing centuries of culture.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    year: '2024',
    flag: '🇯🇵',
  },
  {
    id: '2',
    location: 'Reykjavik',
    country: 'Iceland',
    description: 'Northern lights and fire-and-ice landscapes, exploring raw nature.',
    image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80',
    year: '2023',
    flag: '🇮🇸',
  },
  {
    id: '3',
    location: 'Santorini',
    country: 'Greece',
    description: 'White and blue architecture and Aegean sunsets, pure romance.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
    year: '2023',
    flag: '🇬🇷',
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    id: '1',
    title: 'AI Infrastructure & Agent Engineer',
    company: 'A leading technology company',
    period: '2023 - Present',
    description: 'Building LLM inference infrastructure and developing AI Agent systems; optimizing model serving performance and enabling intelligent automation workflows.',
    type: 'work',
  },
  {
    id: '2',
    title: 'Database Engineer',
    company: 'A global IT consulting firm',
    period: '2022 - 2023',
    description: 'Developed and maintained database systems for Japan-based clients; handled requirements analysis, SQL optimization, and cross-border project coordination.',
    type: 'work',
  },
  {
    id: '3',
    title: 'Ph.D. Life Science and Technology',
    company: 'Institute of Science Tokyo (Science Tokyo)',
    period: '2019 - 2022',
    description: 'Doctoral research in life science and technology at Science Tokyo.',
    type: 'education',
  },
  {
    id: '4',
    title: 'M.Eng. Optical Engineering',
    company: 'Nanjing University of Science and Technology',
    period: '2015 - 2018',
    description: 'Research in optical engineering; master\'s thesis focused on applied optics.',
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
