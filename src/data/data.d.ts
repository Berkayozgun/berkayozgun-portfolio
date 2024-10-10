export interface NavItem {
  page: string;
  label: string;
}

export interface Project {
  name: string;
  description: string;
  image: string;
  github: string;
  link: string;
}

export const NAV_ITEMS: NavItem[];
export const PROJECTS: Project[];
export const SKILLS: string[];