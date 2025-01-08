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
  image: string;
  github: string;
  link: string;
}

import { IconType } from "react-icons";

export interface Skill {
  name: string;
  icon: IconType;
  category:
    | "Frontend"
    | "Backend"
    | "Database"
    | "Tools"
    | "Soft Skills"
    | "Languages"
    | "Mobile"
    | "Specialized";
}
