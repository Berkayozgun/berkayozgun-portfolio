import { useState, useEffect } from "react";
import SlideUp from "./SlideUp";
import { BsGithub, BsArrowUpRightSquare } from "react-icons/bs";
import { PROJECTS } from "../data/data.ts";
import ProjectsSkeleton from "./skeletons/ProjectSkeleton";

const ProjectCard = ({ project }) => {
  return (
    <div className='group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300'>
      <div className='aspect-video overflow-hidden'>
        <img
          src={project.image}
          alt={project.name}
          className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300'
        />
      </div>
      <div className='p-6'>
        <h3 className='text-2xl font-bold mb-2 text-gray-800 dark:text-white'>
          {project.name}
        </h3>
        <p className='text-gray-600 dark:text-gray-300 mb-4'>
          {project.description}
        </p>
        <div className='flex space-x-4'>
          <a
            href={project.github}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400'
          >
            <BsGithub size={20} />
            <span>Code</span>
          </a>
          <a
            href={project.link}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400'
          >
            <BsArrowUpRightSquare size={20} />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // API çağrısı simülasyonu
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setProjects(PROJECTS);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Daha kısa süre

    return () => clearTimeout(timer);
  }, []);

  if (error) return <div>Bir hata oluştu...</div>;
  if (isLoading) return <ProjectsSkeleton />;

  return (
    <section id='projects' className='py-20 px-4 md:px-20'>
      <h1 className='my-10 text-center font-bold text-4xl'>
        Projects
        <hr className='w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded'></hr>
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
