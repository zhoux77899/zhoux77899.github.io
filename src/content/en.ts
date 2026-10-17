import type { Contribution, ExperienceItem, PersonalInfo, Project, Publication, Skill, TravelItem } from '../types/index.ts';
import type { SiteContent } from './types.ts';

// Edit all English site content here, including metadata and accessibility copy.
const githubUrl = 'https://github.com/zhoux77899';
const orcidUrl = 'https://orcid.org/0000-0003-3695-460X';
const name = 'zhoux77899';
const avatar = 'https://avatars.githubusercontent.com/u/33858552?v=4';
const siteTitle = `${name} | Projects, research & life`;

// Verified against ORCID and publisher metadata on 2026-10-16. DOI identity is case-insensitive.
const publications: Publication[] = [
  {
    doi: '10.3390/photonics13070649',
    title: 'Improving Precision in Extended-Range Three-Dimensional Single-Molecule Localization with Physics-Guided Deep Learning',
    authors: ['Xiang Zhou', 'Yuma Ito', 'Makio Tokunaga'],
    year: 2026,
    journal: 'Photonics',
    volume: '13',
    issue: '7',
    pages: '649',
  },
  {
    doi: '10.1364/ao.56.008040',
    title: 'Dynamic wavefront measurement with a pinhole linear polarizer point-diffraction interferometer',
    authors: ['Xiang Zhou', 'Renhui Guo', 'Wenhua Zhu', 'Donghui Zheng', 'Lei Chen'],
    year: 2017,
    journal: 'Applied Optics',
    volume: '56',
    issue: '29',
    pages: '8040–8047',
  },
];

const personalInfo: PersonalInfo = {
  name,
  title: 'AI Infrastructure & Agent Engineer',
  bio: "I work on LLM inference and agent systems, with a background in optics and life science. Here I share my projects, research, and a few places I've been.",
  footerBio: 'I work on LLM inference and agents. This is where I keep my side projects.',
  avatar,
  socialLinks: [
    { id: 'github', name: 'GitHub', url: githubUrl, handle: name, contactLabel: 'Connect on GitHub' },
    { id: 'x', name: 'X', url: 'https://x.com/miyoshichi', handle: '@miyoshichi', contactLabel: 'X' },
    { id: 'orcid', name: 'ORCID', url: orcidUrl, handle: '0000-0003-3695-460X', contactLabel: 'ORCID' },
  ],
};

const skills: Skill[] = [
  { id: 'vllm', name: 'vLLM', category: 'ai', projects: [], source: { name: 'vLLM Ascend contributions', url: '#vllm-ascend-work' } },
  { id: 'ascend-npu', name: 'Ascend NPU', category: 'ai', projects: [], source: { name: 'vLLM Ascend contributions', url: '#vllm-ascend-work' } },
  { id: 'pytorch', name: 'PyTorch', category: 'ai', projects: ['cfgan'] },
  { id: 'openai-api', name: 'OpenAI API', category: 'ai', projects: ['what-to-eat'] },
  { id: 'agent-skills', name: 'Agent skills', category: 'ai', projects: ['flawless'] },
  { id: 'http-sse', name: 'HTTP & SSE', category: 'ai', projects: ['kitsune-proxy'] },
  { id: 'python', name: 'Python', category: 'science', projects: ['cfgan', 'claude-code-insights', 'flawless'] },
  { id: 'numpy-scipy', name: 'NumPy & SciPy', category: 'science', projects: ['cfgan'] },
  { id: 'go', name: 'Go', category: 'systems', projects: ['kitsune-proxy'] },
  { id: 'cpp', name: 'C++', category: 'systems', projects: ['luma'] },
  { id: 'esp32-arduino', name: 'ESP32 & Arduino', category: 'systems', projects: ['luma'] },
  { id: 'platformio', name: 'PlatformIO', category: 'systems', projects: ['luma'] },
  { id: 'sdl2', name: 'SDL2', category: 'systems', projects: ['luma'] },
  { id: 'typescript', name: 'TypeScript', category: 'web', projects: ['claude-code-insights', 'what-to-eat', 'luma'] },
  { id: 'react', name: 'React', category: 'web', projects: ['claude-code-insights', 'what-to-eat', 'luma'] },
  { id: 'nextjs', name: 'Next.js', category: 'web', projects: ['what-to-eat'] },
  { id: 'postgres-drizzle', name: 'Postgres & Drizzle', category: 'web', projects: ['what-to-eat'] },
  { id: 'tailwind-css', name: 'Tailwind CSS', category: 'web', projects: ['claude-code-insights', 'what-to-eat', 'luma'] },
  { id: 'github-actions', name: 'GitHub Actions', category: 'tools', projects: ['cfgan', 'luma', 'claude-code-insights', 'kitsune-proxy'] },
  { id: 'cmake', name: 'CMake', category: 'tools', projects: ['luma'] },
  { id: 'vitest', name: 'Vitest', category: 'tools', projects: ['claude-code-insights', 'what-to-eat'] },
  { id: 'playwright', name: 'Playwright', category: 'tools', projects: ['what-to-eat'] },
];

const projects: Project[] = [
  {
    id: 'cfgan',
    title: 'CFGAN',
    description: 'Microscopy research tools built around a PyTorch GAN.',
    details: 'Includes a U-Net generator, a CNN discriminator, training logs, and tools for image denoising, 3D localization, and CRLB analysis.',
    tags: ['Python', 'PyTorch', 'Microscopy'],
    visualId: 'cfgan',
    links: [{ kind: 'source', name: 'Source', url: 'https://github.com/zhoux77899/cfgan' }],
  },
  {
    id: 'luma',
    title: 'LUMA',
    description: 'Multi-application firmware for the Cardputer ADV.',
    details: 'A launcher, settings, notes, and a 60 x 30 LED-cell canvas. The same C++ core runs in an SDL desktop preview.',
    tags: ['C++', 'ESP32-S3', 'PlatformIO'],
    visualId: 'cardputer',
    links: [
      { kind: 'website', name: 'Website', url: 'https://zhoux77899.github.io/luma/' },
      { kind: 'releases', name: 'Releases', url: 'https://github.com/zhoux77899/luma/releases' },
      { kind: 'source', name: 'Source', url: 'https://github.com/zhoux77899/luma' },
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
      { kind: 'website', name: 'Website', url: 'https://zhoux77899.github.io/claude-code-insights/' },
      { kind: 'source', name: 'Source', url: 'https://github.com/zhoux77899/claude-code-insights' },
    ],
  },
  {
    id: 'flawless',
    title: 'Flawless',
    description: 'A reusable README-writing skill for Claude Code and Codex.',
    details: 'Reads repository facts and picks guidance for the project type before drafting a README. Python helpers analyze the repo and validate the result.',
    tags: ['Agent skills', 'Python', 'Documentation'],
    visualId: 'folio',
    links: [{ kind: 'source', name: 'Source', url: 'https://github.com/zhoux77899/flawless' }],
  },
  {
    id: 'what-to-eat',
    title: 'What to Eat',
    description: "Meal ideas based on what's already in the fridge.",
    details: "A bilingual Next.js app with ingredient inventory, food preferences, and recommendation history. Users bring an OpenAI API key and review a dish's ingredient amounts before updating the fridge.",
    tags: ['Next.js', 'OpenAI API', 'Postgres'],
    visualId: 'fridge',
    links: [
      { kind: 'website', name: 'Website', url: 'https://what-to-eat-eta-three.vercel.app' },
      { kind: 'source', name: 'Source', url: 'https://github.com/zhoux77899/what-to-eat' },
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
      { kind: 'releases', name: 'Releases', url: 'https://github.com/zhoux77899/kitsune-proxy/releases' },
      { kind: 'source', name: 'Source', url: 'https://github.com/zhoux77899/kitsune-proxy' },
    ],
  },
];

const contributions: Contribution[] = [
  {
    title: 'vLLM Ascend',
    description: 'Contributions to the community-maintained vLLM plugin for Ascend NPUs. My merged work includes W4A16 quantized MoE support, fused MoE operators, and multimodal encoder graph execution.',
    featuredPullRequests: [4516, 2275, 10712],
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

const travelItems: TravelItem[] = [
  {
    id: 'new-zealand',
    location: 'South Island',
    country: 'New Zealand',
    description: 'A bend in the road brings the sea back into view, with mountains still close at hand. Between fjords and glaciers, the drive leaves room to look around. Some places make a slower pace feel like the whole point.',
    illustrationLabel: 'A line-drawn New Zealand landscape with alpine ridges, a coastal road, and an SUV that follows the pointer.',
    visualId: 'new-zealand',
    year: '2025',
    flag: '🇳🇿',
  },
  {
    id: 'japan',
    location: 'Honshu & Kyushu',
    country: 'Japan',
    description: 'The rails draw a steady line through the city. Through the seasons, the platform keeps its everyday rhythm: a short wait, a train, the streets sliding past the window. There is room to notice ordinary life between one station and the next.',
    illustrationLabel: 'A line-drawn Japanese city and railway platform. A commuter electric train moves along the rails with the pointer.',
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
    description: 'A garden asks for very little hurry. The path slips beneath tiled eaves and through a moon gate; water holds the shapes of roofs and rocks. An open lattice window gives the eye another way through, even when the feet have stopped.',
    illustrationLabel: 'A line-drawn Jiangnan garden with a tiled pavilion, moon gate, rocks, and a pond. Its lattice shutters open near the pointer.',
    visualId: 'china',
    flag: '🇨🇳',
  },
];

const experienceItems: ExperienceItem[] = [
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

export const en = {
  metadata: {
    lang: 'en',
    title: siteTitle,
    description: "zhoux77899's personal site: AI, microscopy research, small devices, open-source tools, and travels.",
    author: name,
    keywords: 'zhoux77899, AI, Microscopy, Open Source, Python, Go, C++, TypeScript',
    socialTitle: siteTitle,
    socialDescription: 'AI, microscopy research, small devices, open-source tools, and travels.',
    url: 'https://zhoux77899.github.io/',
    image: avatar,
  },
  githubUrl,
  orcidUrl,
  personalInfo,
  publications,
  skills,
  projects,
  contributions,
  travelItems,
  experienceItems,
  skillCategories: {
    ai: 'AI infrastructure & agents',
    science: 'Scientific computing',
    systems: 'Systems & embedded',
    web: 'Web & data',
    tools: 'Development tools',
  },
  navigation: {
    hero: 'About',
    projects: 'Projects',
    skills: 'Stack',
    experience: 'Background',
    publications: 'Publications',
    travel: 'Elsewhere',
    contact: 'Contact',
  },
  explorer: {
    destinations: {
      projects: { label: 'Projects', object: 'Model workstation' },
      skills: { label: 'Stack', object: 'Portable terminal' },
      experience: { label: 'Background', object: 'Optical instrument' },
      'open-source': { label: 'Open source', object: 'Workshop folio' },
      travel: { label: 'Travel', object: 'Map and compass' },
      contact: { label: 'Contact', object: 'Connection panel' },
    },
    groupLabel: 'Explore the toolbox',
    illustrationLabel: 'An open precision case carrying a model workstation, terminal, optical instrument, folio, map and connection panel.',
    previewIllustrationLabel: 'An open precision case carrying six objects for projects, skills, background, open source, travel and contact',
    previewTitle: theme => `Precision exploration case — ${theme}`,
    hotspotLabel: (label, object) => `${label} — ${object}`,
    open: 'Explore',
    close: 'Close explorer',
  },
  sections: {
    hero: {
      greeting: "Hi there, I'm",
      projectsAction: 'Explore projects',
      contactAction: 'Get in touch',
    },
    projects: {
      title: 'Things I make',
      description: 'Research code, small devices, and tools I wanted to have. These are the projects pinned on my GitHub.',
      galleryLabel: 'Personal projects',
      illustration: (title, description) => `An interactive line illustration of ${title}: ${description}`,
      technologies: title => `${title} technologies`,
    },
    contributions: {
      title: 'Working in the open',
      source: 'Source',
      mergedRequests: count => `${count} merged pull ${count === 1 ? 'request' : 'requests'}`,
      moreRequests: count => `${count} more pull ${count === 1 ? 'request' : 'requests'}`,
      featuredLabel: 'Featured merged pull requests',
      moreLabel: 'More merged pull requests',
    },
    skills: {
      title: 'Tools I work with',
      description: 'From inference and agent tools to scientific computing, embedded devices, and the web.',
      categoriesLabel: 'Skill categories',
      listLabel: categoryLabel => `${categoryLabel} skills`,
    },
    experience: {
      title: 'A bit of background',
      description: 'Optical engineering, life science research, database work, and now AI infrastructure. Each has shaped the questions I like working on.',
    },
    publications: {
      title: 'Publications',
      description: 'Research in optical measurement and single-molecule microscopy.',
      listLabel: 'Research publications',
      doiLabel: doi => `DOI: ${doi}`,
      highlightedAuthor: 'Xiang Zhou',
      authorsSeparator: ', ',
      citation: (volume, issue, pages) => `${volume}(${issue}), ${pages}`,
      source: [
        { type: 'text', text: 'See my ' },
        { type: 'link', id: 'orcid', text: 'ORCID record' },
        { type: 'text', text: ' for publication details.' },
      ],
    },
    travel: {
      title: 'Away from the screen',
      description: 'Mountain roads, city railways, and quiet gardens.',
      yearRange: (first, last) => first === last ? String(first) : `${first}–${last}`,
    },
    contact: {
      title: 'Keep in touch',
      description: 'You can find my code on GitHub, reach me on X, or follow my research identity on ORCID.',
    },
  },
  ui: {
    navigation: {
      mainLabel: 'Main navigation',
      mobileLabel: 'Mobile navigation',
      footerLabel: 'Footer navigation',
      title: 'Navigation',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    theme: {
      selectionLabel: 'Theme selection',
      light: 'Light mode',
      dark: 'Dark mode',
      system: 'System theme',
    },
    backToTop: 'Back to top',
    footer: {
      copyright: year => `© ${year} `,
      tagline: 'A personal collection of work and interests.',
    },
    carousel: {
      roleDescription: 'carousel',
      slideDescription: 'slide',
      choose: 'Choose a project',
      show: label => `Show ${label}`,
      position: (label, index, count) => `${label}, ${index} of ${count}`,
    },
  },
} satisfies SiteContent;
