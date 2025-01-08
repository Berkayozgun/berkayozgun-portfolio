import {
  FaReact,
  FaNodeJs,
  FaGit,
  FaPython,
  FaJava,
  FaVuejs,
  FaHtml5,
  FaCss3Alt,
  FaDocker,
  FaGithub,
  FaFigma,
  FaLinux,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiJavascript,
  SiCsharp,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiMui,
  SiIonic,
  SiFlask,
  SiExpress,
  SiPostman,
  SiVite,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { BiData } from "react-icons/bi";
import { IconType } from "react-icons";

interface Skill {
  name: string;
  icon: IconType;
  category: string;
}

export const NAV_ITEMS = [
  {
    label: "Home",
    page: "home",
  },
  {
    label: "About",
    page: "about",
  },
  {
    label: "Projects",
    page: "projects",
  },
  {
    label: "Certifications",
    page: "certifications",
  },
];

export const PROJECTS = [
  {
    name: "Career Recommendation System",
    description:
      "Graduation Project: Developed a machine learning project for analyzing CVs and recommending job postings based on qualifications and skills. Utilized natural language processing (NLP) techniques to match job requirements with candidate profiles.",
    image: "/career-recommendation-system.png",
    github: "#",
    link: "#",
  },
  {
    name: "Notification Center Management Tool",
    description:
      "Internal software tool for monitoring ,creating, specifying and pushing notifications to company's customers.",
    image: "/dashboard.png",
    github: "#",
    link: "#",
  },
  {
    name: "E-commerce Website Admin Panel",
    description:
      "Admin panel for e-commerce website. Developed with Next.js, TailwindCSS.",
    image: "/e-commerce-dashboard.png",
    github: "https://github.com/Berkayozgun/ecommerce-dashboard-v2",
    link: "https://ecommerce-dashboard-v2.vercel.app/",
  },
  {
    name: "Parentwiser Commercial Website Project",
    description: "Company's website redesigned and developed with React.js.",
    image: "/parentwiser-landing-page.png",
    github: "#",
    link: "#",
  },
  {
    name: "Bus Ticket Booking System",
    description:
      "A ticket booking system for buses. Developed with React.js, Node.js, Express.js, MongoDB, Redux-Toolkit, Bcrypt.",
    image: "/bus-ticket-booking-system.png",
    github: "https://github.com/Berkayozgun/ticket-app",
    link: "https://ticket-app-brown.vercel.app/",
  },
  {
    name: "Plane Ticket Booking System",
    description:
      "A ticket booking system for planes. Developed with React.js, Node.js, Express.js, MongoDB, Schiphol API.",
    image: "/flight-search-app.png",
    github: "https://github.com/Berkayozgun/flight-search-application",
    link: "https://flight-search-application-alpha.vercel.app/",
  },
  {
    name: "Campfire Microblogging Platform",
    description:
      "Twitter-like social network web app. Developed with Vue.js, Flask and MongoDB.",
    image: "/campfire.png",
    github: "https://github.com/Berkayozgun/campfire_microblog-backend",
    link: "#",
  },
  {
    name: "IWeather App",
    description:
      "Weather app that shows the current weather of the user's location. Developed with React.js.",
    image: "/weather-app.png",
    github: "https://github.com/Berkayozgun/iweather",
    link: "https://iweather-pearl.vercel.app/",
  },
  {
    name: "Portfolio Website",
    description:
      "My personal portfolio website. Developed with React.js, TailwindCSS.",
    image: "/portfolio-website.png",
    github: "https://github.com/Berkayozgun/berkayozgun-portfolio",
    link: "https://berkayozgun.vercel.app/",
  },
  {
    name: "Paradise Nursery",
    description:
      "Shopping website for plants. Developed with React.js, TailwindCSS, Redux-Toolkit.",
    image: "/paradise-nursery.png",
    github: "https://github.com/Berkayozgun/paradise-nursery",
    link: "https://paradise-nursery-one.vercel.app/",
  },
  {
    name: "Flavor Fusion",
    description:
      "Recipe sharing platform. Developed with React.js, TailwindCSS, Redux-Toolkit.",
    image: "/flavor-fusion.png",
    github: "https://github.com/Berkayozgun/flavor-fusion",
    link: "https://flavor-fusion-pi.vercel.app/",
  },
  {
    name: "Rising Dashboard",
    description:
      "Dashboard for monitoring company's performance. Developed with Next.js, TailwindCSS.",
    image: "/rising-dashboard.png",
    github: "https://github.com/Berkayozgun/rising-dashboard",
    link: "https://rising-dashboard-gules.vercel.app/",
  },
];

export const SKILLS: Skill[] = [
  // Programming Languages
  { name: "Python", icon: FaPython, category: "Languages" },
  { name: "JavaScript", icon: SiJavascript, category: "Languages" },
  { name: "TypeScript", icon: SiTypescript, category: "Languages" },
  { name: "C#", icon: SiCsharp, category: "Languages" },
  { name: "Java", icon: FaJava, category: "Languages" },

  // Frontend
  { name: "React", icon: FaReact, category: "Frontend" },
  { name: "Next.js", icon: SiNextdotjs, category: "Frontend" },
  { name: "Vue.js", icon: FaVuejs, category: "Frontend" },
  { name: "TailwindCSS", icon: SiTailwindcss, category: "Frontend" },
  { name: "Redux", icon: SiRedux, category: "Frontend" },
  { name: "HTML", icon: FaHtml5, category: "Frontend" },
  { name: "CSS", icon: FaCss3Alt, category: "Frontend" },
  { name: "Material UI", icon: SiMui, category: "Frontend" },

  // Mobile
  { name: "React Native", icon: FaReact, category: "Mobile" },
  { name: "Ionic", icon: SiIonic, category: "Mobile" },

  // Backend
  { name: "Flask", icon: SiFlask, category: "Backend" },
  { name: "Node.js", icon: FaNodeJs, category: "Backend" },
  { name: "Express.js", icon: SiExpress, category: "Backend" },
  { name: "RESTful APIs", icon: TbApi, category: "Backend" },

  // Database
  { name: "MongoDB", icon: SiMongodb, category: "Database" },
  { name: "SQL", icon: BiData, category: "Database" },
  { name: "DBMS", icon: BiData, category: "Database" },

  // Tools & Technologies
  { name: "Git", icon: FaGit, category: "Tools" },
  { name: "GitHub", icon: FaGithub, category: "Tools" },
  { name: "Docker", icon: FaDocker, category: "Tools" },
  { name: "Postman", icon: SiPostman, category: "Tools" },
  { name: "Figma", icon: FaFigma, category: "Tools" },
  { name: "Vite", icon: SiVite, category: "Tools" },
  { name: "Linux", icon: FaLinux, category: "Tools" },

  // Soft Skills kategorisini icon'suz bırakabiliriz ya da genel bir icon kullanabiliriz
  { name: "Problem Solving", icon: FaReact, category: "Soft Skills" },
  { name: "Team Collaboration", icon: FaReact, category: "Soft Skills" },
  { name: "Communication", icon: FaReact, category: "Soft Skills" },
  { name: "Adaptability", icon: FaReact, category: "Soft Skills" },
  { name: "Time Management", icon: FaReact, category: "Soft Skills" },
  { name: "Critical Thinking", icon: FaReact, category: "Soft Skills" },
  { name: "Creativity", icon: FaReact, category: "Soft Skills" },
  { name: "Attention to Detail", icon: FaReact, category: "Soft Skills" },

  // Additional Skills
  { name: "NLP", icon: FaPython, category: "Specialized" },
  {
    name: "Authentication & Authorization",
    icon: FaReact,
    category: "Specialized",
  },
  { name: "Cybersecurity Basics", icon: FaReact, category: "Specialized" },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Cloud Computing Engineer",
    issuer: "Alibaba Cloud Academy",
    date: "2024",
    credentialUrl:
      "https://www.linkedin.com/in/berkayozgun/details/certifications/",
    image:
      "https://media.licdn.com/dms/image/v2/D4D2DAQEBeWQn1SeBDw/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1728142734900?e=1736960400&v=beta&t=bWi-QT8Wseoas4CvPKnf5al2SP5d8ZeweP6SCYHS1R4",
    details: [
      "ECS",
      "VPC",
      "OSS",
      "RDS Fundamentals",
      "Model Studio",
      "Using Generative AI Ethically & Responsibly",
    ],
  },
  {
    name: "Developing Front End Apps with React",
    issuer: "IBM & edX",
    date: "2024",
    credentialUrl:
      "https://courses.edx.org/certificates/8fa878b6794249a983c7c877c6919ad8",
    image:
      "https://eu-central.storage.cloudconvert.com/tasks/25708ba4-a1f3-422a-899f-16c7b6858e7f/Ekran%20g%C3%B6r%C3%BCnt%C3%BCs%C3%BC_8-1-2025_19248_courses.edx.org.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=cloudconvert-production%2F20250108%2Ffra%2Fs3%2Faws4_request&X-Amz-Date=20250108T164949Z&X-Amz-Expires=86400&X-Amz-Signature=0d3b972e7b7720a579fbfa378eb5766bf5864de47249b9c8bfe30c397da9b5bc&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D%22Ekran%20g%C3%B6r%C3%BCnt%C3%BCs%C3%BC_8-1-2025_19248_courses.edx.org.png%22&response-content-type=image%2Fpng&x-id=GetObject",
  },
  {
    name: "Introduction to Python: Absolute Beginner",
    issuer: "Microsoft & edX",
    date: "2023",
    credentialUrl: "#",
    image:
      "https://eu-central.storage.cloudconvert.com/tasks/693d23f6-b938-4caf-bf72-2ed7ba623b96/Ekran%20g%C3%B6r%C3%BCnt%C3%BCs%C3%BC_8-1-2025_194626_courses.edx.org.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=cloudconvert-production%2F20250108%2Ffra%2Fs3%2Faws4_request&X-Amz-Date=20250108T165226Z&X-Amz-Expires=86400&X-Amz-Signature=5a4f97262badf60ba921457c1485be28dd547c8f0904bd10d339659eb567d2ae&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D%22Ekran%20g%C3%B6r%C3%BCnt%C3%BCs%C3%BC_8-1-2025_194626_courses.edx.org.png%22&response-content-type=image%2Fpng&x-id=GetObject",
  },
  {
    name: "GNÇYTNK'24 Development Program",
    issuer: "Turkcell",
    date: "2024",
    credentialUrl: "#",
    image:
      "https://media.licdn.com/dms/image/v2/D4D2DAQF_xNMCCqg5lg/profile-treasury-document-cover-images_480/profile-treasury-document-cover-images_480/0/1719438997745?e=1736960400&v=beta&t=6OAhvvQsbxtpcTsL40plClizRZgDjnf2Hs1U4Ed2yFg",
  },
  {
    name: "Responsive Web Design",
    issuer: "FreeCodeCamp",
    date: "2023",
    credentialUrl: "#",
    image:
      "https://eu-central.storage.cloudconvert.com/tasks/eb704f6f-b54b-499b-8996-3de806f9ba44/Ekran%20g%C3%B6r%C3%BCnt%C3%BCs%C3%BC_8-1-2025_194713_www.freecodecamp.org.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=cloudconvert-production%2F20250108%2Ffra%2Fs3%2Faws4_request&X-Amz-Date=20250108T165228Z&X-Amz-Expires=86400&X-Amz-Signature=28bad1a78f8a856ab90e2001eca74f5004e35c0683b19d6335571dce5da800d0&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D%22Ekran%20g%C3%B6r%C3%BCnt%C3%BCs%C3%BC_8-1-2025_194713_www.freecodecamp.org.png%22&response-content-type=image%2Fpng&x-id=GetObject",
  },
  {
    name: "Mobile Programming Training",
    issuer: "Ecodation",
    date: "2023",
    credentialUrl: "#",
    image:
      "https://eu-central.storage.cloudconvert.com/tasks/d7e6256f-0274-4ea6-9336-9369cccf573b/Ekran%20g%C3%B6r%C3%BCnt%C3%BCs%C3%BC_8-1-2025_19469_certificate.ecodation.com.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=cloudconvert-production%2F20250108%2Ffra%2Fs3%2Faws4_request&X-Amz-Date=20250108T165230Z&X-Amz-Expires=86400&X-Amz-Signature=6c6643534482d2a15f5e2f75fb70d5fce89714d0059466da7ef506643695b327&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D%22Ekran%20g%C3%B6r%C3%BCnt%C3%BCs%C3%BC_8-1-2025_19469_certificate.ecodation.com.png%22&response-content-type=image%2Fpng&x-id=GetObject",
  },
  {
    name: "Cyber Security 101",
    issuer: "Akbank & Microfon",
    date: "2023",
    credentialUrl:
      "https://akbank-genclik-akademisi.verified.cv/en/verify/24808205424999?ref=email",
    image:
      "https://media.licdn.com/dms/image/v2/D4D2DAQFJOVPGLeYxNA/profile-treasury-document-cover-images_480/profile-treasury-document-cover-images_480/0/1728633774509?e=1736960400&v=beta&t=IablzhMTC0jFgxoDWF1W6TQNQpuXW7v0OINpixvJumU",
  },
];
