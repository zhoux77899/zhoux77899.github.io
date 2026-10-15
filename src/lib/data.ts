import type { Contribution, ExperienceItem, PersonalInfo, Project, Skill, TravelItem } from '@/types';

export const githubUrl = 'https://github.com/zhoux77899';

export const personalInfo: PersonalInfo = {
  name: 'zhoux77899',
  title: 'AI Infrastructure & Agent Engineer',
  bio: "I work on LLM inference and agent systems, with a background in optics and life science research. Here you'll find my open-source projects and a few places I've been.",
  footerBio: 'I work on LLM inference and agents. This is where I keep my side projects.',
  avatar: 'https://avatars.githubusercontent.com/u/33858552?v=4',
  socialLinks: [
    { name: 'GitHub', url: githubUrl, icon: 'github' },
    { name: 'X', url: 'https://x.com/miyoshichi', icon: 'external' },
    { name: 'ORCID', url: 'https://orcid.org/0000-0003-3695-460X', icon: 'external' },
  ],
};

export const skills: Skill[] = [
  { name: 'vLLM', category: 'ai', projects: [], source: { name: 'vLLM Ascend contributions', url: '#vllm-ascend-work' } },
  { name: 'Ascend NPU', category: 'ai', projects: [], source: { name: 'vLLM Ascend contributions', url: '#vllm-ascend-work' } },
  { name: 'PyTorch', category: 'ai', projects: ['cfgan'] },
  { name: 'OpenAI API', category: 'ai', projects: ['what-to-eat'] },
  { name: 'Agent skills', category: 'ai', projects: ['flawless'] },
  { name: 'HTTP & SSE', category: 'ai', projects: ['kitsune-proxy'] },
  { name: 'Python', category: 'science', projects: ['cfgan', 'claude-code-insights', 'flawless'] },
  { name: 'NumPy & SciPy', category: 'science', projects: ['cfgan'] },
  { name: 'Go', category: 'systems', projects: ['kitsune-proxy'] },
  { name: 'C++', category: 'systems', projects: ['luma'] },
  { name: 'ESP32 & Arduino', category: 'systems', projects: ['luma'] },
  { name: 'PlatformIO', category: 'systems', projects: ['luma'] },
  { name: 'SDL2', category: 'systems', projects: ['luma'] },
  { name: 'TypeScript', category: 'web', projects: ['claude-code-insights', 'what-to-eat', 'luma'] },
  { name: 'React', category: 'web', projects: ['claude-code-insights', 'what-to-eat', 'luma'] },
  { name: 'Next.js', category: 'web', projects: ['what-to-eat'] },
  { name: 'Postgres & Drizzle', category: 'web', projects: ['what-to-eat'] },
  { name: 'Tailwind CSS', category: 'web', projects: ['claude-code-insights', 'what-to-eat', 'luma'] },
  { name: 'GitHub Actions', category: 'tools', projects: ['cfgan', 'luma', 'claude-code-insights', 'kitsune-proxy'] },
  { name: 'CMake', category: 'tools', projects: ['luma'] },
  { name: 'Vitest', category: 'tools', projects: ['claude-code-insights', 'what-to-eat'] },
  { name: 'Playwright', category: 'tools', projects: ['what-to-eat'] },
];

export const projects: Project[] = [
  {
    id: 'cfgan',
    title: 'CFGAN',
    description: 'Microscopy research tools built around a PyTorch GAN.',
    details: 'Includes a U-Net generator, a CNN discriminator, training logs, and tools for image denoising, 3D localization, and CRLB analysis.',
    tags: ['Python', 'PyTorch', 'Microscopy'],
    visualId: 'cfgan',
    links: [
      { name: 'Source', url: 'https://github.com/zhoux77899/cfgan' },
    ],
  },
  {
    id: 'luma',
    title: 'LUMA',
    description: 'Multi-application firmware for the Cardputer ADV.',
    details: 'A launcher, settings, notes, and a 60 x 30 LED-cell canvas. The same C++ core runs in an SDL desktop preview.',
    tags: ['C++', 'ESP32-S3', 'PlatformIO'],
    visualId: 'cardputer',
    links: [
      { name: 'User guide', url: 'https://zhoux77899.github.io/luma/' },
      { name: 'Releases', url: 'https://github.com/zhoux77899/luma/releases' },
      { name: 'Source', url: 'https://github.com/zhoux77899/luma' },
    ],
  },
  {
    id: 'claude-code-insights',
    title: 'Claude Code Insights',
    description: 'A daily index of Claude Code plugins, with rankings and star histories.',
    details: 'GitHub Actions collects repository metadata into JSON and Markdown reports. A React dashboard adds search, sorting, and trends from saved snapshots.',
    tags: ['TypeScript', 'React', 'Python'],
    visualId: 'index-box',
    links: [
      { name: 'Explore', url: 'https://zhoux77899.github.io/claude-code-insights/' },
      { name: 'Source', url: 'https://github.com/zhoux77899/claude-code-insights' },
    ],
  },
  {
    id: 'flawless',
    title: 'Flawless',
    description: 'A reusable README-writing skill for Claude Code and Codex.',
    details: 'Reads repository facts and picks guidance for the project type before drafting a README. Python helpers analyze the repo and validate the result.',
    tags: ['Agent skills', 'Python', 'Documentation'],
    visualId: 'folio',
    links: [
      { name: 'Source', url: 'https://github.com/zhoux77899/flawless' },
    ],
  },
  {
    id: 'what-to-eat',
    title: 'What to Eat',
    description: "Meal ideas based on what's already in the fridge.",
    details: "A bilingual Next.js app with ingredient inventory, food preferences, and recommendation history. Users bring an OpenAI API key and review a dish's ingredient amounts before updating the fridge.",
    tags: ['Next.js', 'OpenAI API', 'Postgres'],
    visualId: 'fridge',
    links: [
      { name: 'Website', url: 'https://what-to-eat-eta-three.vercel.app' },
      { name: 'Source', url: 'https://github.com/zhoux77899/what-to-eat' },
    ],
  },
  {
    id: 'kitsune-proxy',
    title: 'Kitsune Proxy',
    description: 'One local address for several model-provider APIs.',
    details: 'A Go tray app routes requests by model name, swaps upstream credentials, and forwards streamed responses. YAML changes can be reloaded from the tray.',
    tags: ['Go', 'HTTP & SSE', 'Desktop'],
    visualId: 'patch-panel',
    links: [
      { name: 'Releases', url: 'https://github.com/zhoux77899/kitsune-proxy/releases' },
      { name: 'Source', url: 'https://github.com/zhoux77899/kitsune-proxy' },
    ],
  },
];

export const contributions: Contribution[] = [
  {
    title: 'vLLM Ascend',
    description: 'Contributions to the community-maintained vLLM plugin for Ascend NPUs. My merged work includes W4A16 quantized MoE support, fused MoE operators, and multimodal encoder graph execution.',
    links: [
      { name: 'Upstream project', url: 'https://github.com/vllm-project/vllm-ascend' },
      { name: 'Qwen3 W4A8 quantization (v0.9.1) #1275', url: 'https://github.com/vllm-project/vllm-ascend/pull/1275' },
      { name: 'Sampling parameter fixes #1423', url: 'https://github.com/vllm-project/vllm-ascend/pull/1423' },
      { name: 'Qwen3 MoE quantized-weight loading (v0.9.1) #1832', url: 'https://github.com/vllm-project/vllm-ascend/pull/1832' },
      { name: 'Qwen3 W4A8 quantization (main) #2060', url: 'https://github.com/vllm-project/vllm-ascend/pull/2060' },
      { name: 'Qwen3 MoE quantized-weight loading (main) #2219', url: 'https://github.com/vllm-project/vllm-ascend/pull/2219' },
      { name: 'Fused MoE operators #2275', url: 'https://github.com/vllm-project/vllm-ascend/pull/2275' },
      { name: 'Attention weight prefetching #3146', url: 'https://github.com/vllm-project/vllm-ascend/pull/3146' },
      { name: 'W8A8 MTP prefetch assertion fix #3361', url: 'https://github.com/vllm-project/vllm-ascend/pull/3361' },
      { name: 'QKV weight prefetching with AddRmsNormQuant #3517', url: 'https://github.com/vllm-project/vllm-ascend/pull/3517' },
      { name: 'QKV weight prefetching (v0.11.0) #3649', url: 'https://github.com/vllm-project/vllm-ascend/pull/3649' },
      { name: 'Kimi-K2-Thinking W4A16 experts #4516', url: 'https://github.com/vllm-project/vllm-ascend/pull/4516' },
      { name: 'Encoder graph API #10712', url: 'https://github.com/vllm-project/vllm-ascend/pull/10712' },
      { name: 'ViT encoder graph padded-sequence fix #10824', url: 'https://github.com/vllm-project/vllm-ascend/pull/10824' },
      { name: 'Attention sequence handling #12084', url: 'https://github.com/vllm-project/vllm-ascend/pull/12084' },
      { name: 'Attention sequence handling (v0.24.0rc) #12409', url: 'https://github.com/vllm-project/vllm-ascend/pull/12409' },
    ],
  },
];

export const travelItems: TravelItem[] = [
  {
    id: 'new-zealand',
    location: 'South Island',
    country: 'New Zealand',
    description: 'Fjords, glaciers, and the wilderness of the South Island.',
    visualId: 'new-zealand',
    year: '2025',
    flag: '🇳🇿',
  },
  {
    id: 'japan',
    location: 'Honshu & Kyushu',
    country: 'Japan',
    description: 'Old capitals, modern cities, and four seasons of life in Japan. Hot springs and volcanoes in Kyushu.',
    visualId: 'japan',
    flag: '🇯🇵',
    records: [
      { location: 'Honshu', year: '2018–2022' },
      { location: 'Kyushu', year: '2021' },
    ],
  },
  {
    id: 'china',
    location: 'Suzhou & Nanjing',
    country: 'China',
    description: 'Jiangnan gardens: tiled pavilions, moon gates, and quiet water.',
    visualId: 'china',
    flag: '🇨🇳',
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    id: '1',
    title: 'AI Infrastructure & Agent Engineer',
    company: 'A leading technology company',
    period: '2023 - Present',
    description: 'Building LLM inference systems and agent tools, with work on model serving and automation.',
    type: 'work',
  },
  {
    id: '2',
    title: 'Database Engineer',
    company: 'A global IT consulting firm',
    period: '2022 - 2023',
    description: 'Built and maintained databases for clients in Japan, including requirements analysis, SQL tuning, and project coordination across borders.',
    type: 'work',
  },
  {
    id: '3',
    title: 'Ph.D. in Life Science and Technology',
    company: 'Institute of Science Tokyo (Science Tokyo)',
    period: '2019 - 2022',
    description: 'Doctoral research in life science and technology.',
    type: 'education',
  },
  {
    id: '4',
    title: 'M.Eng. in Optical Engineering',
    company: 'Nanjing University of Science and Technology',
    period: '2015 - 2018',
    description: "Research in optical engineering, with a master's thesis in applied optics.",
    type: 'education',
  },
];

export function getSkillCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    ai: 'AI infrastructure & agents',
    science: 'Scientific computing',
    systems: 'Systems & embedded',
    web: 'Web & data',
    tools: 'Development tools',
  };
  return labels[category] || category;
}
