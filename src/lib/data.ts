import type { Project, TravelItem, ExperienceItem, Skill, PersonalInfo } from '@/types';

export const personalInfo: PersonalInfo = {
  name: 'Ruri',
  title: 'AI Infrastructure & Agent Engineer',
  bio: 'Building LLM inference infrastructure and AI agent systems. From optical engineering through life science research to AI — bridging disciplines to solve complex problems.',
  avatar: 'https://avatars.githubusercontent.com/u/33858552?v=4',
  email: '',
  location: '',
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/zhoux77899', icon: 'github' },
  ],
};

export const skills: Skill[] = [
  { name: 'PyTorch', category: 'other' },
  { name: 'LLM Inference', category: 'other' },
  { name: 'vLLM', category: 'other' },
  { name: 'GANs', category: 'other' },
  { name: 'Ascend NPU', category: 'other' },
  { name: 'Deep Learning', category: 'other' },
  { name: 'Python', category: 'backend' },
  { name: 'C++', category: 'backend' },
  { name: 'TypeScript', category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'SQL', category: 'backend' },
  { name: 'Redis', category: 'backend' },
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Git', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'Kubernetes', category: 'tools' },
  { name: 'CI/CD', category: 'tools' },
  { name: 'Linux', category: 'tools' },
];

export const projects: Project[] = [
  {
    id: '1075804899',
    title: 'CFGAN',
    description: 'CFGAN: Cross-Filter Generative Adversarial Network Framework for Microscopy Image Processing',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    tags: ['Python'],
    githubUrl: 'https://github.com/zhoux77899/CFGAN',
    stars: 1,
  },
  {
    id: '1002828735',
    title: 'vllm-ascend',
    description: 'Community maintained hardware plugin for vLLM on Ascend',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    tags: ['C++'],
    githubUrl: 'https://github.com/zhoux77899/vllm-ascend',
    stars: 2,
  },
  {
    id: '1137495162',
    title: 'claude-code-insights',
    description: 'A daily-updated collection of insights for the Claude Code ecosystem, automatically tracking the most popular and active Claude Code repositories.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    tags: ['TypeScript'],
    demoUrl: 'https://zhoux77899.github.io/claude-code-insights/',
    demoLabel: 'Explore Plugins',
    githubUrl: 'https://github.com/zhoux77899/claude-code-insights',
    stars: 0,
  },
];

export const travelItems: TravelItem[] = [
  {
    id: '1',
    location: 'South Island',
    country: 'New Zealand',
    description: 'Magnificent fjords and glaciers, a journey through the pristine wilderness of the southern hemisphere.',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80',
    year: '2025',
    flag: '��',
  },
  {
    id: '2',
    location: 'Kyushu',
    country: 'Japan',
    description: 'Geothermal wonders of hot springs and volcanoes, experiencing the charm of the Land of Fire.',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
    year: '2021',
    flag: '��',
  },
  {
    id: '3',
    location: 'Honshu',
    country: 'Japan',
    description: 'From ancient capitals to modern metropolis, memories of Japanese life across all four seasons.',
    image: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80',
    year: '2018-2022',
    flag: '��',
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
  countries: 2,
  cities: 15,
  moments: 64,
};

export function getSkillCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend & Systems',
    tools: 'DevOps & Tools',
    other: 'AI / ML',
  };
  return labels[category] || category;
}
