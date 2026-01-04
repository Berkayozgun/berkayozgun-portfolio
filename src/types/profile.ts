export interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    github: string;
    demo?: string;
    image: string;
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
    projects: Project[];
    experience: Experience[];
    education: Education[];
    certifications: Certification[];
    blog: BlogPost[];
}
