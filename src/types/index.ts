export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  image: string;
  details?: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link: string;
  demo?: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  description: string;
}

export interface BlogPost {
  title: string;
  date: string;
  link: string;
}

export interface Theme {
  background: string;
  text: string;
  prompt: string;
  command: string;
  error: string;
}
