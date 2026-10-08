export type Locale = 'en' | 'tr';

export interface ProjectMetric {
    label: string;
    value: string;
}

export interface ProjectLinks {
    github?: string | null;
    live?: string | null;
    status?: string;
}

export interface Project {
    id: number | string;
    title: string;
    subtitle?: string;
    category?: string;
    year?: string;
    isFeatured?: boolean;
    summary?: string;
    description: string;
    metrics?: ProjectMetric[];
    techStack?: string[];
    tags?: string[];
    highlights?: string[];
    privacyNotice?: string;
    github?: string | null;
    demo?: string | null;
    image?: string;
    links?: ProjectLinks;
}

export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
}

export interface Education {
    school: string;
    degree: string;
    date: string;
    description: string;
}

export interface Certification {
    name: string;
    issuer: string;
    date: string;
}

export interface BlogPost {
    title: string;
    description: string;
    date: string;
    readTime: string;
    link: string;
    image: string;
}

export interface SkillCategory {
    category: string;
    technologies: string[];
}

export interface ProfileData {
    hero: {
        title: string;
        subtitle: string;
        description: string;
        cta: string;
    };
    about: {
        title: string;
        description: string;
    };
    skills: SkillCategory[];
    projects: Project[];
    experience: Experience[];
    education: Education[];
    certifications: Certification[];
    blog: BlogPost[];
}
