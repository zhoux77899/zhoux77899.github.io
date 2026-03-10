import type {
  PersonalInfo,
  SocialLink,
  SkillCategory,
  Project,
  TravelItem,
  Experience,
} from "@/types";

export const personalInfo: PersonalInfo = {
  name: "开发者",
  title: "前端开发者 / 全栈工程师",
  bio: "专注于创造简洁、优雅且功能强大的数字体验。相信少即是多的设计哲学。",
  avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Dev",
  email: "hello@example.com",
  resumeUrl: "/assets/resume.pdf",
};

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com", icon: "Github" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
  { name: "Twitter", url: "https://twitter.com", icon: "Twitter" },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "前端开发",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vite"],
  },
  {
    id: "backend",
    label: "后端开发",
    skills: ["Node.js", "Python", "PostgreSQL", "REST API"],
  },
  {
    id: "tools",
    label: "工具",
    skills: ["Git", "Docker", "Figma", "VS Code"],
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "项目 A",
    description: "简洁的项目描述，展示技术栈与成果。",
    longDescription:
      "详细描述：使用 React 与 TypeScript 构建的现代 Web 应用，注重性能与可访问性。",
    image: "https://picsum.photos/800/450?random=1",
    tags: ["React", "TypeScript", "Tailwind"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "2",
    title: "项目 B",
    description: "另一个精彩项目的简短介绍。",
    longDescription: "项目 B 的完整说明与技术细节。",
    image: "https://picsum.photos/800/450?random=2",
    tags: ["Next.js", "Node.js"],
    githubUrl: "https://github.com",
  },
  {
    id: "3",
    title: "项目 C",
    description: "第三个项目简介。",
    image: "https://picsum.photos/800/450?random=3",
    tags: ["React", "HeroUI"],
    demoUrl: "https://example.com",
  },
];

export const travelItems: TravelItem[] = [
  {
    id: "1",
    title: "京都",
    location: "京都",
    country: "日本",
    description: "古老的寺庙与宁静的庭院",
    image: "https://picsum.photos/800/600?random=4",
    year: "2024",
  },
  {
    id: "2",
    title: "上海",
    location: "上海",
    country: "中国",
    description: "现代与传统交织的都市",
    image: "https://picsum.photos/800/600?random=5",
    year: "2024",
  },
  {
    id: "3",
    title: "杭州",
    location: "杭州",
    country: "中国",
    description: "西湖与科技园区",
    image: "https://picsum.photos/800/600?random=6",
    year: "2023",
  },
];

export const experiences: Experience[] = [
  {
    id: "1",
    title: "高级前端工程师",
    company: "某科技公司",
    period: "2022 - 至今",
    description: "负责公司核心产品的前端架构设计与开发，推动组件库与工程化建设。",
  },
  {
    id: "2",
    title: "前端工程师",
    company: "某互联网公司",
    period: "2020 - 2022",
    description: "参与多个业务线的前端开发，主导性能优化与可访问性改进。",
  },
];

export const travelStats = {
  countries: 12,
  cities: 36,
  moments: 128,
};
