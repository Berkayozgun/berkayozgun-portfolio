import React from "react";
import SlideUp from "./SlideUp";
import { BsGithub, BsArrowUpRightSquare } from "react-icons/bs";

const projects = [
  {
    name: "Notification Center Management Tool",
    description:
      "Internal software tool for monitoring ,creating, specifying and pushing notifications to Jotform users.",
    image: "/dashboard.png",
    github: "#",
    link: "#",
  },
  {
    name: "E-commerce Website Admin Panel",
    description:
      "Admin panel for e-commerce website. Developed with Next.js, TailwindCSS.",
    image: "/e-commerce-dashboard.png",
    github: "#",
    link: "#",
  },
  {
    name: "Parentwiser Commercial Website Project",
    description: "Company's website redesigned and developed with React.js.",
    image: "/parentwiser-landing-page.png",
    github: "#",
    link: "#",
  },
  {
    name: "Bus/Plane Ticket Booking System",
    description:
      "A ticket booking system for buses and planes. Developed with React.js, Node.js, Express.js, MongoDB.",
    image: "/flight-search-app.png",
    github: "#",
    link: "#",
  },
  {
    name: "Campfire Microblogging Platform",
    description:
      "Twitter-like social network web app. Developed with Vue.js, Flask and MongoDB.",
    image: "/campfire.png",
    github: "#",
    link: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section id='projects'>
      <h1 className='my-10 text-center font-bold text-4xl'>
        Projects
        <hr className='w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded'></hr>
      </h1>

      <div className='flex flex-col space-y-28'>
        {projects.map((project, idx) => {
          return (
            <div key={idx}>
              <SlideUp offset='-300px 0px -300px 0px'>
                <div className='flex flex-col animate-slideUpCubicBezier animation-delay-2 md:flex-row md:space-x-12'>
                  <div className=' md:w-1/2'>
                    <a href={project.link}>
                      <img
                        src={project.image}
                        alt=''
                        width={1000}
                        height={1000}
                        className='rounded-xl shadow-xl hover:opacity-70'
                      />
                    </a>
                  </div>
                  <div className='mt-8 md:w-1/2'>
                    <h1 className='text-4xl font-bold mb-6'>{project.name}</h1>
                    <p className='text-xl leading-7 mb-4 text-neutral-600 dark:text-neutral-400'>
                      {project.description}
                    </p>
                    <div className='flex flex-row align-bottom space-x-4'>
                      <a href={project.github} target='_blank' rel='noopener noreferrer'>
                        <BsGithub
                          size={30}
                          className='hover:-translate-y-1 transition-transform cursor-pointer'
                        />
                      </a>
                      <a href={project.link} target='_blank' rel='noopener noreferrer'>
                        <BsArrowUpRightSquare
                          size={30}
                          className='hover:-translate-y-1 transition-transform cursor-pointer'
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </SlideUp>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;
