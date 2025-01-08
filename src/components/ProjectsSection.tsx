import { useState, useEffect } from "react";
import { PROJECTS } from "../data/data";
import ProjectsSkeleton from "./skeletons/ProjectsSkeleton";
import { Project } from "../types";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-300 dark:bg-gray-800'>
      <img
        src={project.image}
        alt={project.name}
        className='w-full h-48 object-cover'
      />
      <div className='p-6'>
        <h3 className='text-xl font-bold mb-2 text-gray-800 dark:text-white'>
          {project.name}
        </h3>
        <p className='text-gray-600 mb-4 dark:text-gray-400'>
          {project.description}
        </p>
        <div className='flex space-x-4'>
          <a
            href={project.github}
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'
          >
            GitHub
          </a>
          <a
            href={project.link}
            target='_blank'
            rel='noopener noreferrer'
            className='text-teal-500 hover:text-teal-600'
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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
