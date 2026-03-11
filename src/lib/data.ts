import type { Project, TravelItem, ExperienceItem, Skill, PersonalInfo } from '@/types';

export const personalInfo: PersonalInfo = {
  name: '张明远',
  title: '全栈开发工程师',
  bio: '热爱技术，专注于创造简洁优雅的数字体验。拥有5年全栈开发经验，擅长 React、Node.js 和云原生技术。',
  avatar: '/assets/images/profile/avatar.jpg',
  email: 'zhangmingyuan@example.com',
  location: '中国 · 上海',
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
    title: '智能任务管理系统',
    description: '一个基于 AI 的任务管理应用，支持自然语言输入、智能分类和自动优先级排序。',
    image: '/assets/images/projects/project-1.jpg',
    tags: ['React', 'TypeScript', 'Node.js', 'OpenAI'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: '2',
    title: '实时协作白板',
    description: '支持多人实时协作的在线白板工具，具有无限画布、多种绘图工具和版本历史功能。',
    image: '/assets/images/projects/project-2.jpg',
    tags: ['Next.js', 'Socket.io', 'Canvas API', 'PostgreSQL'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: '3',
    title: '电商数据分析平台',
    description: '为电商企业提供的数据分析和可视化平台，支持实时数据监控和智能报表生成。',
    image: '/assets/images/projects/project-3.jpg',
    tags: ['Vue.js', 'Python', 'D3.js', 'AWS'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: '4',
    title: '个人知识库系统',
    description: '基于 Markdown 的知识管理系统，支持双向链接、图谱视图和全文搜索。',
    image: '/assets/images/projects/project-4.jpg',
    tags: ['React', 'Electron', 'SQLite', 'Tailwind CSS'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: '5',
    title: '微服务网关',
    description: '高性能 API 网关，支持流量控制、认证授权、请求转换和可观测性。',
    image: '/assets/images/projects/project-5.jpg',
    tags: ['Go', 'gRPC', 'Redis', 'Prometheus'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: '6',
    title: '移动端社交应用',
    description: '跨平台社交应用，具有即时通讯、动态发布和位置分享功能。',
    image: '/assets/images/projects/project-6.jpg',
    tags: ['React Native', 'Firebase', 'TypeScript', 'Redux'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
];

export const travelItems: TravelItem[] = [
  {
    id: '1',
    location: '京都',
    country: '日本',
    description: '古老的寺庙与宁静的庭院，感受千年文化的沉淀。',
    image: '/assets/images/travel/kyoto.jpg',
    year: '2024',
    flag: '🇯🇵',
  },
  {
    id: '2',
    location: '雷克雅未克',
    country: '冰岛',
    description: '极光下的冰与火之歌，探索大自然的鬼斧神工。',
    image: '/assets/images/travel/iceland.jpg',
    year: '2023',
    flag: '🇮🇸',
  },
  {
    id: '3',
    location: '圣托里尼',
    country: '希腊',
    description: '蓝白相间的建筑与爱琴海的日落，浪漫至极。',
    image: '/assets/images/travel/santorini.jpg',
    year: '2023',
    flag: '🇬🇷',
  },
  {
    id: '4',
    location: '皇后镇',
    country: '新西兰',
    description: '南半球的冒险之都，壮丽的湖光山色。',
    image: '/assets/images/travel/queenstown.jpg',
    year: '2022',
    flag: '🇳🇿',
  },
  {
    id: '5',
    location: '班夫',
    country: '加拿大',
    description: '落基山脉的明珠，碧绿的湖水与雪山。',
    image: '/assets/images/travel/banff.jpg',
    year: '2022',
    flag: '🇨🇦',
  },
  {
    id: '6',
    location: '巴厘岛',
    country: '印度尼西亚',
    description: '热带雨林与海滩的完美结合，心灵的栖息地。',
    image: '/assets/images/travel/bali.jpg',
    year: '2021',
    flag: '🇮🇩',
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    id: '1',
    title: '高级前端工程师',
    company: '某知名科技公司',
    period: '2022 - 至今',
    description: '负责公司核心产品的前端架构设计和开发，带领团队完成多个重要项目，优化前端性能提升 40%。',
    type: 'work',
  },
  {
    id: '2',
    title: '全栈开发工程师',
    company: '某互联网创业公司',
    period: '2020 - 2022',
    description: '参与产品从 0 到 1 的开发过程，负责前后端技术选型和核心功能实现，产品用户增长 300%。',
    type: 'work',
  },
  {
    id: '3',
    title: '计算机科学硕士',
    company: '某知名大学',
    period: '2018 - 2020',
    description: '专注于人工智能和人机交互方向的研究，发表 2 篇国际会议论文。',
    type: 'education',
  },
  {
    id: '4',
    title: '软件工程学士',
    company: '某重点大学',
    period: '2014 - 2018',
    description: '系统学习软件工程理论和实践，多次获得奖学金和编程竞赛奖项。',
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
    frontend: '前端开发',
    backend: '后端开发',
    tools: '工具',
    other: '其他',
  };
  return labels[category] || category;
}
