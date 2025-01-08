import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const ContactSection = () => {
  const contactLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Berkayozgun",
      icon: FaGithub,
      color: "hover:text-gray-800 dark:hover:text-white",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/berkayozgun/",
      icon: FaLinkedin,
      color: "hover:text-blue-600",
    },
    {
      name: "Email",
      url: "mailto:berkayozgun.work@gmail.com",
      icon: FaEnvelope,
      color: "hover:text-red-500",
    },
  ];

  return (
    <section id='contact' className='py-20 px-4 md:px-20'>
      <h2 className='text-4xl font-bold text-center mb-8'>
        Contact Me
        <hr className='w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded' />
      </h2>

      <div className='max-w-3xl mx-auto text-center'>
        <p className='text-lg text-gray-600 dark:text-gray-400 mb-8'>
          Feel free to reach out! I'm always open to discussing new projects,
          creative ideas, or opportunities to be part of your visions.
        </p>

        <div className='flex justify-center items-center space-x-8'>
          {contactLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              className={`group flex flex-col items-center space-y-2 transition-all duration-300 ${link.color}`}
            >
              <div
                className='p-4 rounded-full bg-gray-100 dark:bg-gray-800 
              group-hover:scale-110 transition-transform duration-300'
              >
                <link.icon className='text-2xl' />
              </div>
              <span className='text-sm font-medium'>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
