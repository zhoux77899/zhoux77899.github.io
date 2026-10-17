import type {
  Contribution,
  ExperienceItem,
  ExplorerDestination,
  PersonalInfo,
  Project,
  Publication,
  SectionId,
  Skill,
  SkillCategory,
  TravelItem,
} from '../types/index.ts';

export type RichTextPart =
  | { type: 'text'; text: string }
  | { type: 'link'; id: 'orcid'; text: string };

interface SectionCopy {
  title: string;
  description: string;
}

/** Complete contract shared by every locale and by the static metadata build. */
export interface SiteContent {
  metadata: {
    lang: string;
    title: string;
    description: string;
    author: string;
    keywords: string;
    socialTitle: string;
    socialDescription: string;
    url: string;
    image: string;
  };
  githubUrl: string;
  orcidUrl: string;
  personalInfo: PersonalInfo;
  publications: Publication[];
  skills: Skill[];
  projects: Project[];
  contributions: Contribution[];
  travelItems: TravelItem[];
  experienceItems: ExperienceItem[];
  skillCategories: Record<SkillCategory, string>;
  navigation: Record<SectionId, string>;
  explorer: {
    destinations: Record<ExplorerDestination, { label: string; object: string }>;
    groupLabel: string;
    illustrationLabel: string;
    previewIllustrationLabel: string;
    previewTitle: (theme: 'light' | 'dark') => string;
    hotspotLabel: (label: string, object: string) => string;
    open: string;
    close: string;
  };
  sections: {
    hero: {
      greeting: string;
      projectsAction: string;
      contactAction: string;
    };
    projects: SectionCopy & {
      galleryLabel: string;
      illustration: (title: string, description: string) => string;
      technologies: (title: string) => string;
    };
    contributions: {
      title: string;
      source: string;
      mergedRequests: (count: number) => string;
      moreRequests: (count: number) => string;
      featuredLabel: string;
      moreLabel: string;
    };
    skills: SectionCopy & {
      categoriesLabel: string;
      listLabel: (categoryLabel: string) => string;
    };
    experience: SectionCopy;
    publications: SectionCopy & {
      listLabel: string;
      doiLabel: (doi: string) => string;
      highlightedAuthor: string;
      authorsSeparator: string;
      citation: (volume: string, issue: string, pages: string) => string;
      source: RichTextPart[];
    };
    travel: SectionCopy & {
      yearRange: (first: number, last: number) => string;
    };
    contact: SectionCopy;
  };
  ui: {
    navigation: {
      mainLabel: string;
      mobileLabel: string;
      footerLabel: string;
      title: string;
      openMenu: string;
      closeMenu: string;
    };
    theme: {
      selectionLabel: string;
      light: string;
      dark: string;
      system: string;
    };
    backToTop: string;
    footer: {
      copyright: (year: number) => string;
      tagline: string;
    };
    carousel: {
      roleDescription: string;
      slideDescription: string;
      choose: string;
      show: (label: string) => string;
      position: (label: string, index: number, count: number) => string;
    };
  };
}
